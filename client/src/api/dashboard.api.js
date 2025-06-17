// src/api/dashboard.api.js
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
