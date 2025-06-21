import axios from "../utils/axious.js";

// Fetch all services
export const fetchAllServices = async () => {
  const res = axios.get("/services");
  return res;
};

// Delete a service by ID
export const deleteService = async (id) => {
  const res = await axios.delete(`/admin/services/${id}`);
  return res.data.data;
};

// Update a service by ID
export const updateService = async (id, data) => {
  const res = await axios.patch(`/admin/services/${id}`, data);
  return res.data.data;
};

// Create a new service
export const createService = async (data) => {
  const res = await axios.post("/admin/services/", data);
  return res.data.data;
};
