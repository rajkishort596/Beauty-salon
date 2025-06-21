import axios from "../utils/axious.js";

export const fetchSpecialists = async () => {
  const res = axios.get("/specialists");
  return res;
};

// Create a new specialist
export const createSpecialist = async (data) => {
  const res = await axios.post(`/admin/specialists`, data);
  return res.data.data;
};

// Update a specialist
export const updateSpecialist = async (id, data) => {
  const res = await axios.put(`/admin/specialists/${id}`, data);
  return res.data.data;
};

export const deleteSpecialist = async (id) => {
  const res = axios.delete(`/admin/specialists/${id}`);
  return res;
};
