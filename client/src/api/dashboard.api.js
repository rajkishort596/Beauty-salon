import axios from "../utils/axious.js";

export const fetchDashboardStats = async () => {
  try {
    const response = await axios.get("/admin/stats");
    return response.data.data;
  } catch (error) {
    console.error("Failed to fetch dashboard stats:", error);
    throw error;
  }
};

export const fetchRecentAppointments = async () => {
  try {
    const response = await axios.get("/admin/bookings?limit=5");
    return response.data.data;
  } catch (error) {
    console.error("Failed to fetch recent appointments:", error);
    throw error;
  }
};
export const fetchAllAppointments = async () => {
  try {
    const response = await axios.get("/admin/bookings");
    return response.data.data;
  } catch (error) {
    console.error("Failed to fetch all appointments:", error);
    throw error;
  }
};

export const changeStatus = async (id, status) => {
  const response = await axios.patch(`admin/bookings/${id}/status`, { status });
  return response.data;
};

export const deleteAppointment = async (id) => {
  const response = await axios.delete(`admin/bookings/${id}`);
  return response.data;
};
