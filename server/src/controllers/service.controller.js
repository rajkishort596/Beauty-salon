import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Service } from "../models/service.model.js";
import {
  deleteImageFromCloudinary,
  uploadOnCloudinary,
} from "../utils/cloudinary.js";

const createService = asyncHandler(async (req, res) => {
  const { name, description, price, duration, category } = req.body;

  if (!name || !description || !price || !duration || !category) {
    throw new ApiError(400, "All fields are required");
  }

  const serviceImageLocalPath = req.file?.path;
  if (!serviceImageLocalPath) {
    throw new ApiError(400, "Image file is required");
  }

  const image = await uploadOnCloudinary(serviceImageLocalPath);

  if (!image) {
    throw new ApiError(400, "Image upload failed");
  }

  const service = await Service.create({
    name,
    description,
    price,
    duration,
    category,
    image: {
      url: image.url,
      publicId: image.public_id,
    },
  });

  return res
    .status(201)
    .json(new ApiResponse(200, service, "Service created successfully"));
});

const getAllServices = asyncHandler(async (req, res) => {
  const services = await Service.find();

  if (!services || services.length === 0) {
    throw new ApiError(404, "No services found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, services, "All services fetched successfully"));
});

const updateService = asyncHandler(async (req, res) => {
  const { serviceId } = req.params;
  const { name, description, price, duration, category } = req.body;
  const serviceImageLocalPath = req.file?.path;

  if (!name || !description || !price || !duration || !category) {
    throw new ApiError(400, "All fields are required");
  }

  // Find the existing service
  const service = await Service.findById(serviceId);
  if (!service) {
    throw new ApiError(404, "Service not found");
  }

  // Update image if a new file is provided
  if (serviceImageLocalPath) {
    const image = await uploadOnCloudinary(serviceImageLocalPath);
    if (!image) {
      throw new ApiError(400, "Image upload failed");
    }
    // Delete old image from Cloudinary
    if (service.image?.publicId) {
      await deleteImageFromCloudinary(service.image.publicId);
    }
    service.image = {
      url: image.url,
      publicId: image.public_id,
    };
  }

  // Update other fields
  service.name = name;
  service.description = description;
  service.price = price;
  service.duration = duration;
  service.category = category;

  await service.save();

  return res
    .status(200)
    .json(new ApiResponse(200, service, "Service updated successfully"));
});

const deleteService = asyncHandler(async (req, res) => {
  const { serviceId } = req.params;

  const service = await Service.findByIdAndDelete(serviceId);

  if (!service) {
    throw new ApiError(404, "Service not found");
  }
  //Todo: Delete image from cloudinary
  await deleteImageFromCloudinary(service.image.publicId);

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Service deleted successfully"));
});
export { createService, getAllServices, updateService, deleteService };
