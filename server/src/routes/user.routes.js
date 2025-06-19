import { Router } from "express";
import { upload } from "../middlewares/multer.middleware.js";
import {
  loginUser,
  logoutUser,
  registerUser,
} from "../controllers/user.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import {
  bookAppointment,
  getAvailaibleSlots,
} from "../controllers/booking.controller.js";
const router = Router();

router.route("/register").post(upload.single("avatar"), registerUser);
router.route("/login").post(loginUser);
//Secured Routes
router.route("/logout").post(verifyJWT, logoutUser);
router.route("/appointment").post(verifyJWT, bookAppointment);
router.route("/appointment/available-slots").get(getAvailaibleSlots);

export default router;
