import { Router } from "express";
import { verifyAdminJWT } from "../middlewares/auth.middleware.js";
import {
  changePassword,
  getAdminStats,
  getMeAdmin,
  loginAdmin,
  logoutAdmin,
  updateAdminProfile,
} from "../controllers/admin.controller.js";
import serviceAdminRouter from "./service.admin.routes.js";
import bookingRouter from "./booking.routes.js";
import SpecialistAdminRouter from "./specialist.admin.routes.js";
import { approveReview } from "../controllers/review.controller.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = Router();

router.route("/login").post(loginAdmin);
//Secured Routes
router.route("/me").get(verifyAdminJWT, getMeAdmin);
router
  .route("/update")
  .patch(verifyAdminJWT, upload.single("avatar"), updateAdminProfile);
router.route("/change-password").post(verifyAdminJWT, changePassword);
router.route("/logout").post(verifyAdminJWT, logoutAdmin);
router.route("/stats").get(verifyAdminJWT, getAdminStats);
router.route("/reviews/:reviewId/approve").patch(verifyAdminJWT, approveReview);

router.use("/bookings", verifyAdminJWT, bookingRouter);
router.use("/services", verifyAdminJWT, serviceAdminRouter);
router.use("/specialists", verifyAdminJWT, SpecialistAdminRouter);

export default router;
