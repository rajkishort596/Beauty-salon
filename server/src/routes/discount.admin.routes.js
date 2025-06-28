import { Router } from "express";
import {
  createDiscount,
  deleteDiscount,
  getAllDiscounts,
  updateDiscount,
} from "../controllers/discount.controller.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = Router();

router.route("/").get(getAllDiscounts);
router.route("/").post(upload.single("image"), createDiscount);
router.route("/:id").patch(upload.single("image"), updateDiscount);
router.route("/:id").delete(deleteDiscount);

export default router;
