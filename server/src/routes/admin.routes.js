import { Router } from "express";
import { verifyAdminJWT } from "../middlewares/auth.middleware.js";
import {
  getAdminStats,
  getMeAdmin,
  loginAdmin,
  logoutAdmin,
} from "../controllers/admin.controller.js";
import serviceAdminRouter from "./service.admin.routes.js";
import bookingRouter from "./booking.routes.js";
import SpecialistAdminRouter from "./specialist.admin.routes.js";
import { approveReview } from "../controllers/review.controller.js";
const router = Router();

router.route("/login").post(loginAdmin);
//Secured Routes
router.route("/me").get(verifyAdminJWT, getMeAdmin);
router.route("/logout").post(verifyAdminJWT, logoutAdmin);
router.route("/stats").get(verifyAdminJWT, getAdminStats);
router.route("/reviews/:reviewId/approve").patch(verifyAdminJWT, approveReview);

router.use("/bookings", verifyAdminJWT, bookingRouter);
router.use("/services", verifyAdminJWT, serviceAdminRouter);
router.use("/specialists", verifyAdminJWT, SpecialistAdminRouter);

export default router;
