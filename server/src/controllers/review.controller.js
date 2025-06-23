import { Service } from "../models/service.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Review } from "../models/review.model.js";

const createReview = asyncHandler(async (req, res) => {
  const userId = req.user?._id;

  if (!userId) {
    throw new ApiError(401, "Unauthorized. Please login to create a review.");
  }

  const { service, rating, comment } = req.body;

  if (!service || !rating || !comment) {
    throw new ApiError(400, "Service, rating, and comment are required");
  }

  const fetchedService = await Service.findById(service);

  if (!fetchedService) {
    throw new ApiError(404, "Service not found");
  }

  const review = await Review.create({
    user: userId,
    service: fetchedService._id,
    rating,
    comment,
  });

  return res
    .status(201)
    .json(new ApiResponse(201, review, "Review created successfully"));
});
const getAllReviews = asyncHandler(async (req, res) => {
  const reviews = await Review.find()
    .populate("user", "fullName email avatar")
    .populate("service", "name description price");

  if (!reviews || reviews.length === 0) {
    throw new ApiError(404, "No reviews found");
  }

  res
    .status(200)
    .json(new ApiResponse(200, reviews, "Reviews fetched successfully"));
});

const updateReview = asyncHandler(async (req, res) => {
  const { reviewId } = req.params;
  const { rating, comment } = req.body;

  if (!rating || !comment) {
    throw new ApiError(400, "Rating and comment are required");
  }

  const review = await Review.findById(reviewId);

  if (!review) {
    throw new ApiError(404, "Review not found");
  }

  review.rating = rating;
  review.comment = comment;

  await review.save();

  res
    .status(200)
    .json(new ApiResponse(200, review, "Review updated successfully"));
});
const deleteReview = asyncHandler(async (req, res) => {
  const { reviewId } = req.params;
  const review = await Review.findByIdAndDelete(reviewId);
  if (!review) {
    throw new ApiError(404, "No reviews found");
  }

  res.status(200).json(new ApiResponse(200, "Review deleted successfully"));
});

const approveReview = asyncHandler(async (req, res) => {
  const { reviewId } = req.params;

  const review = await Review.findById(reviewId);

  if (!review) {
    throw new ApiError(404, "Review not found");
  }

  review.status = "Approved";
  await review.save();

  res
    .status(200)
    .json(new ApiResponse(200, review, "Review approved successfully"));
});

export {
  createReview,
  getAllReviews,
  updateReview,
  deleteReview,
  approveReview,
};
