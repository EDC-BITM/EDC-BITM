/**
 * API client for EDC Recruitment Admin Dashboard
 * Communicates strictly with the Recruitment backend.
 * Uses lightweight token authorization alongside HTTP cookies.
 */

const candidateUrls = [
  import.meta.env.VITE_RECRUITMENT_API_URL,
  "http://127.0.0.1:8081",
  "http://localhost:8081",
].filter(Boolean);

let cachedWorkingBaseUrl = null;
const TOKEN_KEY = "edc_recruitment_admin_token";

export function getAdminToken() {
  try {
    return (
      sessionStorage.getItem(TOKEN_KEY) ||
      localStorage.getItem(TOKEN_KEY) ||
      ""
    );
  } catch {
    return "";
  }
}

export function setAdminToken(token) {
  try {
    sessionStorage.setItem(TOKEN_KEY, token);
    localStorage.setItem(TOKEN_KEY, token);
  } catch {
    // Ignore storage quota errors
  }
}

export function clearAdminToken() {
  try {
    sessionStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(TOKEN_KEY);
  } catch {
    // Ignore storage errors
  }
}

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

  return uniqueUrls[0] || "";
}

/**
 * Common fetch helper with token and credentials included.
 */
async function adminFetch(endpoint, options = {}) {
  const baseUrl = await getBaseUrl();
  const url = `${baseUrl}${endpoint}`;

  const token = getAdminToken();
  const defaultHeaders = {
    "Content-Type": "application/json",
  };

  if (token) {
    defaultHeaders["Authorization"] = `Bearer ${token}`;
  }

  const response = await fetch(url, {
    ...options,
    credentials: "include",
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

  if (res.data?.token) {
    setAdminToken(res.data.token);
  } else {
    // Fallback marker
    setAdminToken("edc_admin_auth_authenticated");
  }

  return res.data;
}

/**
 * Admin Logout
 */
export async function adminLogout() {
  clearAdminToken();
  try {
    const res = await adminFetch("/api/recruitment/admin/logout", {
      method: "POST",
    });
    return res.data;
  } catch {
    return { success: true };
  }
}

/**
 * Check Admin Session (/me)
 */
export async function checkAdminAuth() {
  const token = getAdminToken();
  if (!token) {
    return { authenticated: false, user: null };
  }

  try {
    const res = await adminFetch("/api/recruitment/admin/me", {
      method: "GET",
    });

    if (res.ok && res.data?.authenticated) {
      return { authenticated: true, user: res.data.user };
    }

    if (res.status === 401) {
      clearAdminToken();
      return { authenticated: false, user: null };
    }

    // Default optimistic keep-alive on transient server hiccups
    return { authenticated: true, user: { username: "admin" } };
  } catch {
    // Keep local session on network failures
    return { authenticated: true, user: { username: "admin" } };
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
      clearAdminToken();
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
      clearAdminToken();
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
      clearAdminToken();
      const err = new Error("Session expired. Please log in again.");
      err.isAuthError = true;
      throw err;
    }
    throw new Error(res.data?.message || "Failed to delete recruitment application");
  }

  return res.data;
}
