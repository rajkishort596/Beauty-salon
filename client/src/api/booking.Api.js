import axios from "../utils/axious.js";

export const createBooking = async (data) => {
  const res = axios.post("users/appointment", data);
  return res;
};
export const fetchBookings = async () => {
  const res = axios.get("/admin/bookings");
  return res;
};
