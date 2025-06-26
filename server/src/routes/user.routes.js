import { Router } from "express";
import { upload } from "../middlewares/multer.middleware.js";
import {
  forgotPassword,
  getMeUser,
  loginUser,
  logoutUser,
  registerUser,
  resetPassword,
} from "../controllers/user.controller.js";
import { verifyUserJWT } from "../middlewares/auth.middleware.js";
import {
  bookAppointment,
  getAvailaibleSlots,
} from "../controllers/booking.controller.js";
import { refreshUserAccessToken } from "../utils/refreshToken.js";
const router = Router();

router.route("/register").post(upload.single("avatar"), registerUser);
router.route("/login").post(loginUser);
router.route("/forgot-password").post(forgotPassword);
router.route("/reset-password").post(resetPassword);
router.route("/refresh-token").post(refreshUserAccessToken);
//Secured Routes
router.route("/me").get(verifyUserJWT, getMeUser);
router.route("/logout").post(verifyUserJWT, logoutUser);
router.route("/appointment").post(verifyUserJWT, bookAppointment);
router.route("/appointment/available-slots").get(getAvailaibleSlots);

export default router;
