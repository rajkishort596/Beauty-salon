import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { Booking } from "../models/booking.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const getAllBookings = asyncHandler(async (req, res) => {
  const bookings = await Booking.find()
    .populate("userId", "fullName email phone")
    .populate("serviceId", "name description price");
  if (!bookings || bookings.length === 0) {
    throw new ApiError(404, "No bookings found");
  }
  res
    .status(200)
    .json(
      new ApiResponse(
        200,
        bookings,
        "Booking fetched Successfully",
        (success = true)
      )
    );
});

export { getAllBookings };
