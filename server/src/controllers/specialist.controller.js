import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import {
  deleteImageFromCloudinary,
  uploadOnCloudinary,
} from "../utils/cloudinary.js";
import { Specialist } from "../models/specialist.model.js";
import { Service } from "../models/service.model.js";

const createSpecialist = asyncHandler(async (req, res) => {
  const {
    name,
    email,
    expertise,
    availableDays,
    availableFrom,
    availableTo,
    phone,
  } = req.body;

  if (
    !name ||
    !email ||
    !expertise ||
    !availableDays ||
    !availableFrom ||
    !availableTo ||
    !phone
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
    throw new ApiError(400, "Image upload failed");
  }

  // Ensure all expertise IDs are valid Service IDs
  const expertiseArray = Array.isArray(expertise) ? expertise : [expertise];
  const validServices = await Service.find({ _id: { $in: expertiseArray } });

  if (validServices.length !== expertiseArray.length) {
    throw new ApiError(400, "Some selected specialties are invalid");
  }

  const specialist = await Specialist.create({
    name,
    email,
    phone,
    availableFrom,
    availableTo,
    availableDays,
    expertise: expertiseArray,
    image: {
      url: image.url,
      publicId: image.public_id,
    },
  });

  return res
    .status(201)
    .json(new ApiResponse(201, specialist, "Specialist created successfully"));
});

const getAllSpecialists = asyncHandler(async (req, res) => {
  const specialists = await Specialist.find().populate({
    path: "expertise",
    select: "name _id", // Include name and optionally _id
  });

  if (!specialists || specialists.length === 0) {
    throw new ApiError(404, "No specialists found");
  }

  return res
    .status(200)
    .json(
      new ApiResponse(200, specialists, "All specialists fetched successfully")
    );
});

const updateSpecialist = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const {
    name,
    email,
    expertise,
    availableDays,
    availableFrom,
    availableTo,
    phone,
  } = req.body;

  if (
    !name ||
    !email ||
    !expertise ||
    !availableDays ||
    !availableFrom ||
    !availableTo ||
    !phone
  ) {
    throw new ApiError(400, "All fields are required");
  }

  const existingSpecialist = await Specialist.findById(id);
  if (!existingSpecialist) {
    throw new ApiError(404, "Specialist not found");
  }

  // Validate expertise
  const expertiseArray = Array.isArray(expertise) ? expertise : [expertise];
  const validServices = await Service.find({ _id: { $in: expertiseArray } });

  if (validServices.length !== expertiseArray.length) {
    throw new ApiError(400, "Some selected specialties are invalid");
  }

  let updatedImage = existingSpecialist.image;

  if (req.file?.path) {
    const newImage = await uploadOnCloudinary(req.file.path);

    if (!newImage) {
      throw new ApiError(400, "Image upload failed");
    }

    if (existingSpecialist.image?.publicId) {
      await deleteImageFromCloudinary(existingSpecialist.image.publicId);
    }

    updatedImage = {
      url: newImage.url,
      publicId: newImage.public_id,
    };
  }

  const updatedSpecialist = await Specialist.findByIdAndUpdate(
    id,
    {
      $set: {
        name,
        email,
        phone,
        availableFrom,
        availableTo,
        availableDays,
        expertise: expertiseArray,
        image: updatedImage,
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

  const deletedSpecialist = await Specialist.findByIdAndDelete(id);
  if (!deletedSpecialist) {
    throw new ApiError(404, "Specialist not found");
  }

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
