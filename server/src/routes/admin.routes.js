import { Router } from "express";
import { logoutUser } from "../controllers/user.controller.js";
import { verifyJWT, isAdmin } from "../middlewares/auth.middleware.js";
import { getAllBookings, loginAdmin } from "../controllers/admin.controller.js";
import {
  createService,
  deleteService,
  getAllServices,
  updateService,
  updateServiceImage,
} from "../controllers/service.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
const router = Router();

router.route("/login").post(loginAdmin);
//Secured Routes
router.route("/logout").post(verifyJWT, isAdmin, logoutUser);
router.route("/bookings").get(verifyJWT, isAdmin, getAllBookings);
router
  .route("/services")
  .post(verifyJWT, isAdmin, upload.single("image"), createService);
router.route("/services").get(verifyJWT, isAdmin, getAllServices);
router.route("/services/:serviceId").patch(verifyJWT, isAdmin, updateService);
router.route("/services/:serviceId").delete(verifyJWT, isAdmin, deleteService);
router
  .route("/services/:serviceId/image")
  .patch(verifyJWT, isAdmin, upload.single("image"), updateServiceImage);

export default router;
