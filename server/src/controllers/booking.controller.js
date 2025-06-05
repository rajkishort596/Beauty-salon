import { Booking } from "../models/booking.model.js";
import { Service } from "../models/service.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const bookAppointment = asyncHandler(async (req, res) => {
  const userId = req.user?._id;

  if (!userId) {
    throw new ApiError(
      401,
      "Unauthorized. Please login to book an appointment."
    );
  }
  const { service, bookingDate, timeSlot } = req.body;
  if (!service || !bookingDate || !timeSlot) {
    throw new ApiError(
      400,
      "Service, booking date, and time slot are required"
    );
  }
  const fetchedService = await Service.findOne({ name: service });

  if (!fetchedService) {
    throw new ApiError(404, "Service not found");
  }
  const booking = await Booking.create({
    user: userId,
    service: fetchedService._id,
    bookingDate,
    timeSlot,
  });

  return res
    .status(201)
    .json(new ApiResponse(201, booking, "Appointment booked successfully"));
});

const getAllBookings = asyncHandler(async (req, res) => {
  const bookings = await Booking.find()
    .populate("user", "fullName email phone")
    .populate("service", "name description price");
  if (!bookings || bookings.length === 0) {
    throw new ApiError(404, "No bookings found");
  }
  res
    .status(200)
    .json(new ApiResponse(200, bookings, "Booking fetched Successfully"));
});

export { bookAppointment, getAllBookings };
