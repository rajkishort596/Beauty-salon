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
  "/admin/refresh-token",
  "/otp/send-otp",
  "/otp/verify-otp",
  "/services", // public GET
  "/specialists", // public GET
  "/reviews", // public GET
  // add more if you add more public/auth routes in the future
];

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // If 401 and not retried before and not whitelisted
    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry &&
      !AUTH_WHITELIST.some((path) => originalRequest.url.includes(path))
    ) {
      originalRequest._retry = true;

      try {
        // Refresh token for admin or user
        if (originalRequest.url.startsWith("/admin")) {
          await axiosInstance.post("/admin/refresh-token");
        } else {
          await axiosInstance.post("/users/refresh-token");
        }

        return axiosInstance(originalRequest);
      } catch (refreshError) {
        console.error("Refresh token failed:", refreshError);

        // ✅ Logout user/admin and redirect
        if (originalRequest.url.startsWith("/admin")) {
          store.dispatch(adminLogout());
        } else {
          store.dispatch(userLogout());
        }

        // Optional: redirect to login
        window.location.href = originalRequest.url.startsWith("/admin")
          ? "/admin/login"
          : "/login";

        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
