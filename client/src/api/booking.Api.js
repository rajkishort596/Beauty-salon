import axios from "../utils/axious.js";

// Create Booking
export const createBooking = async (data) => {
  const res = axios.post("users/appointment", data);
  return res;
};

// Fetch All Bookings (Admin)
export const fetchBookings = async () => {
  const res = axios.get("/admin/bookings");
  return res;
};

//  Fetch Available Time Slots
export const fetchAvailableSlots = async (
  specialistId,
  bookingDate,
  serviceName
) => {
  const res = await axios.get(`/users/appointment/available-slots`, {
    params: {
      specialistId,
      bookingDate,
      serviceName,
    },
  });
  return res;
};
