import axios from "axios";

const BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:8080/api";

const client = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // Enable sending cookies with requests
});

// Flag to prevent multiple simultaneous refresh attempts
let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });

  failedQueue = [];
};

// No need to attach token manually - cookies are sent automatically
client.interceptors.request.use((config) => {
  // Cookies (including accessToken) are automatically sent with withCredentials: true
  // No need to manually set Authorization header
  return config;
});

// Handle response errors (like expired tokens) with automatic refresh
client.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // If error is 401 and we haven't tried to refresh yet
    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        // If already refreshing, queue this request
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then(() => {
            return client(originalRequest);
          })
          .catch((err) => {
            return Promise.reject(err);
          });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        console.log("Access token expired, attempting to refresh...");

        // Try to refresh the token using the httpOnly cookie
        await axios.post(
          `${BASE_URL}/auth/refresh`,
          {},
          { withCredentials: true }
        );

        console.log("Token refreshed successfully");
        processQueue(null);
        isRefreshing = false;

        // Retry the original request (new cookie will be sent automatically)
        return client(originalRequest);
      } catch (refreshError) {
        console.error("Token refresh failed:", refreshError);
        processQueue(refreshError, null);
        isRefreshing = false;

        // Clear user data and redirect to login
        localStorage.removeItem("user");
        localStorage.removeItem("userEmail");
        localStorage.removeItem("userName");

        // Redirect to login if not already there
        if (!window.location.pathname.includes("/auth")) {
          window.location.href = "/admin/auth";
        }

        return Promise.reject(refreshError);
      }
    }

    // For other errors or if refresh also failed
    if (error.response?.status === 401) {
      console.error("Unauthorized - Token may be invalid or expired");
      localStorage.removeItem("user");
      localStorage.removeItem("userEmail");
      localStorage.removeItem("userName");

      if (!window.location.pathname.includes("/auth")) {
        window.location.href = "/admin/auth";
      }
    }

    return Promise.reject(error);
  }
);

const auth = {
  async register(payload) {
    const res = await client.post("/auth/register", payload);
    const d = res.data.data ? res.data.data : res.data;

    // Store only user data, token is in httpOnly cookie
    if (d.user) {
      localStorage.setItem("user", JSON.stringify(d.user));
      localStorage.setItem("userEmail", d.user.email || "");
      localStorage.setItem("userName", d.user.name || "");
    }

    return d;
  },
  async login(payload) {
    const res = await client.post("/auth/login", payload);
    const d = res.data.data ? res.data.data : res.data;

    // Store only user data, token is in httpOnly cookie
    if (d.user) {
      localStorage.setItem("user", JSON.stringify(d.user));
      localStorage.setItem("userEmail", d.user.email || "");
      localStorage.setItem("userName", d.user.name || "");
    }

    return d;
  },
  async me() {
    const res = await client.get("/auth/me");
    const d = res.data.data ? res.data.data : res.data;
    if (d.user) {
      localStorage.setItem("user", JSON.stringify(d.user));
    }
    return d;
  },
  async refresh() {
    const res = await client.post("/auth/refresh");
    return res.data;
  },
  async logout() {
    try {
      await client.post("/auth/logout");
    } catch (e) {
      // ignore server errors on logout
    }
    // Clear user data (token cookies are cleared by server)
    localStorage.removeItem("user");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("userName");
  },
  isAuthenticated() {
    // Check if user data exists (token is in cookie)
    return !!localStorage.getItem("user");
  },
  getUser() {
    try {
      return JSON.parse(localStorage.getItem("user"));
    } catch {
      return null;
    }
  },
};

const articles = {
  async fetchAll({ page = 1, limit = 100 } = {}) {
    const res = await client.get(`/articles?page=${page}&limit=${limit}`);
    console.log("Fetch All Articles Response:", res.data);
    // Handle different response structures
    if (res.data.data) {
      // If data is nested in data.data
      const result = res.data.data;
      // If it's an object with items array
      if (result.items && Array.isArray(result.items)) return result.items;
      // If it's an object with articles array
      if (result.articles && Array.isArray(result.articles))
        return result.articles;
      // If it's directly an array
      if (Array.isArray(result)) return result;
      return result;
    }
    // If data is at top level
    if (res.data.items && Array.isArray(res.data.items)) return res.data.items;
    if (res.data.articles && Array.isArray(res.data.articles))
      return res.data.articles;
    if (Array.isArray(res.data)) return res.data;
    return res.data;
  },
  async fetchById(id) {
    const res = await client.get(`/articles/${id}`);
    console.log("Fetch Article By ID Response:", res.data);
    // Handle different response structures
    if (res.data.article) return res.data.article;
    if (res.data.data) return res.data.data;
    return res.data;
  },
  async fetchMyArticles({ page = 1, limit = 10 } = {}) {
    const res = await client.get(
      `/articles/my/articles?page=${page}&limit=${limit}`
    );
    return res.data.data ? res.data.data : res.data;
  },
  async create(payload) {
    // payload expected as JSON (no images)
    const res = await client.post(`/articles`, payload);
    return res.data.data ? res.data.data : res.data;
  },
  async update(id, payload) {
    const res = await client.patch(`/articles/${id}`, payload);
    return res.data.data ? res.data.data : res.data;
  },
  async remove(id) {
    const res = await client.delete(`/articles/${id}`);
    return res.data.data ? res.data.data : res.data;
  },
};

export { client, auth, articles };
