import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import {
  deleteImageFromCloudinary,
  uploadOnCloudinary,
} from "../utils/cloudinary.js";
import { Specialist } from "../models/specialist.model.js";

const createSpecialist = asyncHandler(async (req, res) => {
  const { name, email, expertise, availableDays, availableFrom, availableTo } =
    req.body;
  if (
    !name ||
    !email ||
    !expertise ||
    !availableDays ||
    !availableFrom ||
    !availableTo
  ) {
    throw new ApiError(400, "All fields are required");
  }
  const existingSpecialist = await Specialist.findOne({ email });
  if (existingSpecialist) {
    throw new ApiError(400, "Specialist already exists with this email");
  }
  const imageLocalPath = req.file?.path;
  if (!imageLocalPath) {
    throw new ApiError(400, "Image file is required");
  }
  const image = await uploadOnCloudinary(imageLocalPath);
  if (!image) {
    throw new ApiError(400, "Image file is required");
  }
  const specialist = await Specialist.create({
    name,
    email,
    image: {
      url: image.url,
      publicId: image.public_id,
    },
    expertise,
    availableDays,
    availableFrom,
    availableTo,
  });
  return res
    .status(201)
    .json(new ApiResponse(200, specialist, "Specialist created successfully"));
});

const getAllSpecialists = asyncHandler(async (req, res) => {
  const specialists = await Specialist.find().populate("expertise", "name");
  if (!specialists || specialists.length === 0) {
    throw new ApiError(404, "No specialists found");
  }
  return res
    .status(200)
    .json(
      new ApiResponse(200, specialists, "All Specialist fetched Successfully")
    );
});

const updateSpecialist = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { name, email, expertise, availableDays, availableFrom, availableTo } =
    req.body;

  // Validate input fields
  if (
    !name ||
    !email ||
    !expertise ||
    !availableDays ||
    !availableFrom ||
    !availableTo
  ) {
    throw new ApiError(400, "All fields are required");
  }

  const existingSpecialist = await Specialist.findById(id);
  if (!existingSpecialist) {
    throw new ApiError(404, "Specialist not found");
  }

  let ImageToBeUpdated = existingSpecialist.image;

  // If new image provided, upload and delete old one
  if (req.file?.path) {
    const specialistImageLocalPath = req.file.path;

    const image = await uploadOnCloudinary(specialistImageLocalPath);
    if (!image) {
      throw new ApiError(400, "Image upload failed");
    }

    // Delete old image from Cloudinary
    if (existingSpecialist.image?.publicId) {
      await deleteImageFromCloudinary(existingSpecialist.image.publicId);
    }

    ImageToBeUpdated = {
      url: image.url,
      publicId: image.public_id,
    };
  }

  // Update the specialist
  const updatedSpecialist = await Specialist.findByIdAndUpdate(
    id,
    {
      $set: {
        name,
        email,
        expertise,
        availableDays,
        availableFrom,
        availableTo,
        image: ImageToBeUpdated,
      },
    },
    { new: true }
  );

  return res
    .status(200)
    .json(
      new ApiResponse(200, updatedSpecialist, "Specialist updated successfully")
    );
});

const deleteSpecialist = asyncHandler(async (req, res) => {
  const { id } = req.params;

  // Delete the specialist from the database
  const deletedSpecialist = await Specialist.findByIdAndDelete(id);

  if (!deletedSpecialist) {
    throw new ApiError(404, "Specialist not found");
  }

  // Delete the image from Cloudinary
  if (deletedSpecialist.image?.publicId) {
    await deleteImageFromCloudinary(deletedSpecialist.image.publicId);
  }

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Specialist deleted successfully"));
});

export {
  createSpecialist,
  getAllSpecialists,
  updateSpecialist,
  deleteSpecialist,
};
