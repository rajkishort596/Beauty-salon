import { Router } from "express";

const router = Router();
import {
  createReview,
  getAllReviews,
  updateReview,
  deleteReview,
} from "../controllers/review.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

router.route("/:serviceId").post(verifyJWT, createReview);
router.route("/").get(getAllReviews);
router.route("/:reviewId").put(verifyJWT, updateReview);
router.route("/:reviewId").delete(verifyJWT, deleteReview);

export default router;
