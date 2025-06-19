import { Router } from "express";
import {
  createSpecialist,
  getAllSpecialists,
  updateSpecialist,
  deleteSpecialist,
} from "../controllers/specialist.controller.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = Router();
//Admin only secured routes
router.route("/").post(upload.single("image"), createSpecialist);
router.route("/").get(getAllSpecialists);
router.route("/:id").patch(upload.single("image"), updateSpecialist);
router.route("/:id").delete(deleteSpecialist);

export default router;
