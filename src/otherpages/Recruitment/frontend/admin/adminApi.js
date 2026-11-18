/**
 * API client for EDC Recruitment Admin Dashboard
 * Communicates strictly with the Recruitment backend and uses HTTP-only session cookies.
 */

const candidateUrls = [
  import.meta.env.VITE_RECRUITMENT_API_URL,
  "http://127.0.0.1:8081",
  "http://localhost:8081",
].filter(Boolean);

let cachedWorkingBaseUrl = null;

/**
 * Tries contacting candidate backend URLs to find a reachable one.
 */
async function getBaseUrl() {
  if (cachedWorkingBaseUrl) {
    return cachedWorkingBaseUrl;
  }

  const uniqueUrls = [...new Set(candidateUrls)];

  for (const url of uniqueUrls) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 2000);
      const res = await fetch(`${url}/health`, {
        method: "GET",
        signal: controller.signal,
      });
      clearTimeout(timeoutId);
      if (res.ok) {
        cachedWorkingBaseUrl = url;
        return url;
      }
    } catch {
      // Continue to next candidate
    }
  }

  // Fallback to first available or relative path
  return uniqueUrls[0] || "";
}

/**
 * Common fetch helper with credentials included for HTTP-only cookies.
 */
async function adminFetch(endpoint, options = {}) {
  const baseUrl = await getBaseUrl();
  const url = `${baseUrl}${endpoint}`;

  const defaultHeaders = {
    "Content-Type": "application/json",
  };

  const response = await fetch(url, {
    ...options,
    credentials: "include", // Essential for HTTP-only cookies
    headers: {
      ...defaultHeaders,
      ...options.headers,
    },
  });

  const data = await response.json().catch(() => null);

  return {
    ok: response.ok,
    status: response.status,
    data,
  };
}

/**
 * Admin Login
 */
export async function adminLogin(username, password) {
  const res = await adminFetch("/api/recruitment/admin/login", {
    method: "POST",
    body: JSON.stringify({ username, password }),
  });

  if (!res.ok) {
    throw new Error(res.data?.message || "Invalid username or password");
  }

  return res.data;
}

/**
 * Admin Logout
 */
export async function adminLogout() {
  const res = await adminFetch("/api/recruitment/admin/logout", {
    method: "POST",
  });

  return res.data;
}

/**
 * Check Admin Session (/me)
 */
export async function checkAdminAuth() {
  try {
    const res = await adminFetch("/api/recruitment/admin/me", {
      method: "GET",
    });

    if (res.ok && res.data?.authenticated) {
      return { authenticated: true, user: res.data.user };
    }
    return { authenticated: false, user: null };
  } catch {
    return { authenticated: false, user: null };
  }
}

/**
 * Fetch All Applications with optional search & filters
 */
export async function fetchRecruitmentApplications({ search, branch, subTeam } = {}) {
  const params = new URLSearchParams();

  if (search && search.trim()) {
    params.set("search", search.trim());
  }
  if (branch && branch !== "all") {
    params.set("branch", branch.trim());
  }
  if (subTeam && subTeam !== "all") {
    params.set("subTeam", subTeam.trim());
  }

  const queryString = params.toString() ? `?${params.toString()}` : "";
  const res = await adminFetch(`/api/recruitment/admin/applications${queryString}`, {
    method: "GET",
  });

  if (!res.ok) {
    if (res.status === 401) {
      const err = new Error("Session expired. Please log in again.");
      err.isAuthError = true;
      throw err;
    }
    throw new Error(res.data?.message || "Failed to load recruitment applications");
  }

  return res.data;
}

/**
 * Fetch a single application by ID
 */
export async function fetchApplicationById(id) {
  const res = await adminFetch(`/api/recruitment/admin/applications/${id}`, {
    method: "GET",
  });

  if (!res.ok) {
    if (res.status === 401) {
      const err = new Error("Session expired. Please log in again.");
      err.isAuthError = true;
      throw err;
    }
    throw new Error(res.data?.message || "Failed to retrieve recruitment application");
  }

  return res.data.application;
}

/**
 * Permanently delete a recruitment application
 */
export async function deleteRecruitmentApplication(id) {
  const res = await adminFetch(`/api/recruitment/admin/applications/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) {
    if (res.status === 401) {
      const err = new Error("Session expired. Please log in again.");
      err.isAuthError = true;
      throw err;
    }
    throw new Error(res.data?.message || "Failed to delete recruitment application");
  }

  return res.data;
}
