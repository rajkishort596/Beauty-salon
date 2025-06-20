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
