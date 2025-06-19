import { Booking } from "../models/booking.model.js";
import { Service } from "../models/service.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Specialist } from "../models/specialist.model.js";

const bookAppointment = asyncHandler(async (req, res) => {
  const userId = req.user?._id;

  if (!userId) {
    throw new ApiError(
      401,
      "Unauthorized. Please login to book an appointment."
    );
  }
  const { service, bookingDate, timeSlot, specialist } = req.body;
  if (!service || !bookingDate || !timeSlot) {
    throw new ApiError(
      400,
      "Service, specialist, booking date, and time slot are required"
    );
  }
  const fetchedService = await Service.findOne({ name: service });
  const fetchedSpecialist = await Specialist.findOne({ name: specialist });

  if (!fetchedService) {
    throw new ApiError(404, "Service not found");
  }
  if (!fetchedSpecialist) {
    throw new ApiError(404, "Specialist not found");
  }
  const booking = await Booking.create({
    user: userId,
    service: fetchedService._id,
    specialist: fetchedSpecialist._id,
    bookingDate,
    timeSlot,
  });

  return res
    .status(201)
    .json(new ApiResponse(201, booking, "Appointment booked successfully"));
});

const getAllBookings = asyncHandler(async (req, res) => {
  const limit = parseInt(req.query.limit) || 0;

  const bookings = await Booking.find()
    .populate("user", "fullName email phone")
    .populate("service", "name description price")
    .populate("specialist", "name expertise")
    .sort({ createdAt: -1 }) // newest first
    .limit(limit);
  res
    .status(200)
    .json(new ApiResponse(200, bookings, "Booking fetched Successfully"));
});

const updateBookingStatus = asyncHandler(async (req, res) => {
  const bookingId = req.params.id;
  const { status } = req.body;

  if (!status) {
    throw new ApiError(400, "Status is required to update booking");
  }

  const validStatuses = ["pending", "confirmed", "cancelled", "completed"];
  if (!validStatuses.includes(status)) {
    throw new ApiError(400, "Invalid status");
  }

  const updatedBooking = await Booking.findByIdAndUpdate(
    bookingId,
    { status },
    { new: true }
  )
    .populate("user", "fullName email phone")
    .populate("service", "name description price");

  if (!updatedBooking) {
    throw new ApiError(404, "Appointment not found");
  }

  res
    .status(200)
    .json(new ApiResponse(200, updatedBooking, "Appointment status updated"));
});

const deleteBooking = asyncHandler(async (req, res) => {
  const bookingId = req.params.id;

  const deletedBooking = await Booking.findByIdAndDelete(bookingId);

  if (!deletedBooking) {
    throw new ApiError(404, "Appointment not found");
  }

  res
    .status(200)
    .json(new ApiResponse(200, null, "Appointment deleted successfully"));
});

function generateTimeSlots(start, end, interval = 30) {
  const slots = [];
  let [startHour, startMin] = start.split(":").map(Number);
  let [endHour, endMin] = end.split(":").map(Number);

  const startDate = new Date();
  startDate.setHours(startHour, startMin, 0, 0);
  const endDate = new Date();
  endDate.setHours(endHour, endMin, 0, 0);

  while (startDate < endDate) {
    const time = startDate.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
    slots.push(time);
    startDate.setMinutes(startDate.getMinutes() + interval);
  }

  return slots;
}

const getAvailaibleSlots = asyncHandler(async (req, res) => {
  // const specialistId =
  //   req.params.specialistId || req.query.specialistId || req.body.specialistId;
  // const bookingDate =
  //   req.params.bookingDate || req.query.bookingDate || req.body.bookingDate;
  // const serviceName =
  //   req.params.serviceName || req.query.serviceName || req.body.serviceName;

  const { specialistId, bookingDate, serviceName } = req.query;

  if (!specialistId || !bookingDate || !serviceName) {
    throw new ApiError(
      400,
      "Specialist ID, booking date, and service are required"
    );
  }

  const specialist = await Specialist.findById(specialistId);
  if (!specialist) {
    throw new ApiError(404, "Specialist not found");
  }

  const service = await Service.findOne({ name: serviceName });
  if (!service) {
    throw new ApiError(404, "Service not found");
  }

  const weekday = new Date(bookingDate).toLocaleString("en-US", {
    weekday: "long",
  });

  if (!specialist.availableDays.includes(weekday)) {
    throw new ApiError(400, `Specialist is not available on ${weekday}`);
  }

  // Use service.duration as interval (default to 30 if not present)
  const interval = service.duration || 30;

  const slots = generateTimeSlots(
    specialist.availableFrom,
    specialist.availableTo,
    interval
  );

  const bookedAppointments = await Booking.find({
    specialist: specialistId,
    bookingDate: new Date(bookingDate),
  }).select("timeSlot");

  const bookedTimes = bookedAppointments.map((appt) => appt.timeSlot);

  const availableSlots = slots.filter((slot) => !bookedTimes.includes(slot));

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        availableSlots,
        "Available slots fetched successfully"
      )
    );
});

export {
  bookAppointment,
  getAllBookings,
  updateBookingStatus,
  deleteBooking,
  getAvailaibleSlots,
};
