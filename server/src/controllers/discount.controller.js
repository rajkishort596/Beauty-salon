import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Discount } from "../models/discount.model.js";
import {
  deleteImageFromCloudinary,
  uploadOnCloudinary,
} from "../utils/cloudinary.js";

// @desc Create Discount
const createDiscount = asyncHandler(async (req, res) => {
  const { title, description, percentage, category, validFrom, validTill } =
    req.body;

  if (!title || !percentage || !category || category.length === 0) {
    throw new ApiError(400, "Title, percentage, and category are required.");
  }

  const imageLocalPath = req.file?.path;
  if (!imageLocalPath) {
    throw new ApiError(400, "Image file is required");
  }

  const image = await uploadOnCloudinary(imageLocalPath);
  if (!image) {
    throw new ApiError(400, "Image upload failed");
  }

  const newDiscount = await Discount.create({
    title,
    description,
    percentage,
    category,
    image: {
      url: image.url,
      publicId: image.public_id,
    },
    validFrom,
    validTill,
  });

  return res
    .status(201)
    .json(new ApiResponse(201, newDiscount, "Discount created successfully."));
});

// @desc Update Discount
const updateDiscount = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { title, description, percentage, category, validFrom, validTill } =
    req.body;

  if (!title || !percentage || !category || category.length === 0) {
    throw new ApiError(400, "Title, percentage, and category are required.");
  }

  // console.log(id);
  const existingDiscount = await Discount.findById(id);
  if (!existingDiscount) {
    throw new ApiError(404, "Discount not found");
  }

  let updatedImage = existingDiscount.image;

  if (req.file?.path) {
    const newImage = await uploadOnCloudinary(req.file.path);

    if (!newImage) {
      throw new ApiError(400, "Image upload failed");
    }

    if (existingDiscount.image?.publicId) {
      await deleteImageFromCloudinary(existingDiscount.image.publicId);
    }

    updatedImage = {
      url: newImage.url,
      publicId: newImage.public_id,
    };
  }

  const updatedDiscount = await Discount.findByIdAndUpdate(
    id,
    {
      $set: {
        title,
        percentage,
        category,
        description,
        validFrom,
        validTill,
        image: updatedImage,
      },
    },
    { new: true }
  );

  return res
    .status(200)
    .json(
      new ApiResponse(200, updatedDiscount, "Discount updated successfully")
    );
});

// @desc Get All Discounts
const getAllDiscounts = asyncHandler(async (req, res) => {
  const discounts = await Discount.find().sort({ validFrom: -1 });

  return res
    .status(200)
    .json(new ApiResponse(200, discounts, "Fetched all discounts"));
});

// @desc Delete Discount
const deleteDiscount = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const discount = await Discount.findByIdAndDelete(id);
  if (!discount) {
    throw new ApiError(404, "Discount not found");
  }

  if (discount.image?.publicId) {
    await deleteImageFromCloudinary(discount.image.publicId);
  }

  return res
    .status(200)
    .json(new ApiResponse(200, null, "Discount deleted successfully"));
});

export { createDiscount, updateDiscount, getAllDiscounts, deleteDiscount };
