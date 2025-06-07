import { Router } from "express";
import { logoutUser } from "../controllers/user.controller.js";
import { verifyJWT, isAdmin } from "../middlewares/auth.middleware.js";
import { loginAdmin } from "../controllers/admin.controller.js";
import serviceAdminRouter from "./service.admin.routes.js";

import { getAllBookings } from "../controllers/booking.controller.js";
const router = Router();

router.route("/login").post(loginAdmin);
//Secured Routes
router.route("/logout").post(verifyJWT, isAdmin, logoutUser);
router.route("/bookings").get(verifyJWT, isAdmin, getAllBookings);

router.use("/services", verifyJWT, isAdmin, serviceAdminRouter);

export default router;
