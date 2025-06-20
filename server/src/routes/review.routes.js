import { Router } from "express";

const router = Router();
import {
  createReview,
  getAllReviews,
  updateReview,
  deleteReview,
} from "../controllers/review.controller.js";
import { verifyUserJWT } from "../middlewares/auth.middleware.js";

router.route("/:serviceId").post(verifyUserJWT, createReview);
router.route("/").get(getAllReviews);
router.route("/:reviewId").put(verifyUserJWT, updateReview);
router.route("/:reviewId").delete(verifyUserJWT, deleteReview);

export default router;
