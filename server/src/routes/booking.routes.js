import { Router } from "express";
import {
  deleteBooking,
  getAllBookings,
  updateBookingStatus,
} from "../controllers/booking.controller.js";

const router = Router();
//Admin only secured routes
router.route("/").get(getAllBookings);
router.route("/:id/status").patch(updateBookingStatus);
router.route("/:id").delete(deleteBooking);

export default router;
