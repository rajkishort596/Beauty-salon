import { Router } from "express";
import {
  createService,
  deleteService,
  getAllServices,
  updateService,
  updateServiceImage,
} from "../controllers/service.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
const router = Router();
//Admin only secured routes
router.route("/").get(getAllServices);
router.route("/").post(upload.single("image"), createService);
router.route("/:serviceId").patch(updateService);
router.route("/:serviceId").delete(deleteService);
router
  .route("/:serviceId/image")
  .patch(upload.single("image"), updateServiceImage);

export default router;
