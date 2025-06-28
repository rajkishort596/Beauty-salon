import axios from "axios";
import store from "../app/store.js"; // adjust path based on your setup
import { logout as userLogout } from "../features/auth/userAuthSlice.js";
import { logout as adminLogout } from "../features/auth/adminAuthSlice.js";

const axiosInstance = axios.create({
  baseURL: "http://localhost:8000/api/v1",
  withCredentials: true,
});

const AUTH_WHITELIST = [
  "/users/login",
  "/users/register",
  "/users/forgot-password",
  "/users/reset-password",
  "/users/refresh-token",
  "/admin/login",
  "/admin/discounts",
  "/admin/refresh-token",
  "/otp/send-otp",
  "/otp/verify-otp",
  "/services", // public GET
  "/specialists", // public GET
  "/reviews", // public GET
  "discounts",
  "/contact-info",
  // add more if you add more public/auth routes in the future
];

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Allow retry only if NOT already retried, and not in whitelist
    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry &&
      !AUTH_WHITELIST.some((path) => originalRequest.url.includes(path))
    ) {
      originalRequest._retry = true;

      try {
        const isAdminRoute = originalRequest.url.startsWith("/admin");
        const refreshEndpoint = isAdminRoute
          ? "/admin/refresh-token"
          : "/users/refresh-token";

        await axiosInstance.post(refreshEndpoint);

        // Retry original request after refresh success
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        console.error("Refresh token failed:", refreshError);

        // Dispatch logout
        if (originalRequest.url.startsWith("/admin")) {
          store.dispatch(adminLogout());
        } else {
          store.dispatch(userLogout());
        }

        // 🚫 Avoid reload loop by not redirecting from interceptor
        // Allow component to handle it instead
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
