import { Router } from "express";
import { logoutUser } from "../controllers/user.controller.js";
import { verifyJWT, isAdmin } from "../middlewares/auth.middleware.js";
import { getAdminStats, loginAdmin } from "../controllers/admin.controller.js";
import serviceAdminRouter from "./service.admin.routes.js";
import bookingRouter from "./booking.routes.js";
import SpecialistAdminRouter from "./specialist.admin.routes.js";
const router = Router();

router.route("/login").post(loginAdmin);
//Secured Routes
router.route("/logout").post(verifyJWT, isAdmin, logoutUser);
router.route("/stats").get(verifyJWT, isAdmin, getAdminStats);

router.use("/bookings", verifyJWT, isAdmin, bookingRouter);
router.use("/services", verifyJWT, isAdmin, serviceAdminRouter);
router.use("/specialists", verifyJWT, isAdmin, SpecialistAdminRouter);

export default router;
