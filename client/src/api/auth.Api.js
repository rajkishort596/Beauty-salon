import axios from "../utils/axious.js";

export const login = async (userData) => {
  const res = await axios.post("/users/login", userData);
  return res;
};
export const loginAdmin = async (userData) => {
  const res = await axios.post("/admin/login", userData);
  return res;
};

export const signup = async (userData) => {
  const res = await axios.post("/users/register", userData);
  return res;
};
export const logout = async () => {
  const res = await axios.post("/users/logout");
  return res;
};
export const logoutAdmin = async () => {
  const res = await axios.post("/admin/logout");
  return res;
};

export const fetchUserProfile = async () => {
  const res = await axios.get("/users/me");
  return res;
};

export const fetchAdminProfile = async () => {
  const res = await axios.get("/admin/me");
  return res;
};

export const updateAdminProfile = async (data) => {
  const res = await axios.patch("/admin/update", data);
  return res.data.data;
};

export const changePassword = async ({ currentPassword, newPassword }) => {
  const res = await axios.post("/admin/change-password", {
    currentPassword,
    newPassword,
  });
  return res.data;
};
export const forgotPassword = async (email) => {
  const res = await axios.post("/users/forgot-password", { email });
  return res.data;
};

export const resetPassword = async ({ token, password }) => {
  const res = await axios.post("/users/reset-password", { token, password });
  return res.data;
};

export const sendOtp = async (email) => {
  return axios.post("/otp/send-otp", { email });
};

export const verifyOtp = async (email, otp) => {
  return axios.post("/otp/verify-otp", { email, otp });
};
