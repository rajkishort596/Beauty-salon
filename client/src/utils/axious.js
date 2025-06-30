import axios from "axios";
import store from "../app/store.js";
import { logout as userLogout } from "../features/auth/userAuthSlice.js";
import { logout as adminLogout } from "../features/auth/adminAuthSlice.js";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
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
  "/services",
  "/specialists",
  "/reviews",
  "/discounts",
  "/contact-info",
];

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Retry only if NOT already retried, and not in whitelist
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

        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
