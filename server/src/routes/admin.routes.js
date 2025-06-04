import { Router } from "express";
import { loginUser, logoutUser } from "../controllers/user.controller.js";
import { verifyJWT, isAdmin } from "../middlewares/auth.middleware.js";
import { getAllBookings } from "../controllers/admin.controller.js";
const router = Router();

router.route("/login").post(loginUser);
//Secured Routes
router.route("/logout").post(verifyJWT, isAdmin, logoutUser);
router.route("/bookings").get(verifyJWT, isAdmin, getAllBookings);

export default router;
