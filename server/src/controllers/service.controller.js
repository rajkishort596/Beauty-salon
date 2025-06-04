import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Service } from "../models/service.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

const createService = asyncHandler(async (req, res) => {
  const { name, description, price, duration } = req.body;

  if (!name || !description || !price || !duration) {
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
    image: image.url,
  });

  return res
    .status(201)
    .json(new ApiResponse(200, service, "Service created successfully"));
});

const getAllServices = asyncHandler(async (req, res) => {
  const services = await Service.find();
  return res
    .status(200)
    .json(new ApiResponse(200, services, "All services fetched successfully"));
});

const updateService = asyncHandler(async (req, res) => {
  const { serviceId } = req.params;
  const { name, description, price, duration } = req.body;

  if (!name || !description || !price || !duration) {
    throw new ApiError(400, "All fields are required");
  }

  const service = await Service.findByIdAndUpdate(
    serviceId,
    {
      $set: {
        name,
        description,
        price,
        duration,
      },
    },
    { new: true }
  );

  if (!service) {
    throw new ApiError(404, "Service not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, service, "Service updated successfully"));
});

const updateServiceImage = asyncHandler(async (req, res) => {
  const { serviceId } = req.params;
  const serviceImageLocalPath = req.file?.path;

  if (!serviceImageLocalPath) {
    throw new ApiError(400, "Image file is required");
  }

  const image = await uploadOnCloudinary(serviceImageLocalPath);

  if (!image) {
    throw new ApiError(400, "Image upload failed");
  }
  //TODO: Delete old image from cloudinary

  const service = await Service.findByIdAndUpdate(
    serviceId,
    { image: image.url },
    { new: true }
  );

  if (!service) {
    throw new ApiError(404, "Service not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, service, "Service image updated successfully"));
});

const deleteService = asyncHandler(async (req, res) => {
  const { serviceId } = req.params;

  const service = await Service.findByIdAndDelete(serviceId);

  if (!service) {
    throw new ApiError(404, "Service not found");
  }
  //Todo: Delete image from cloudinary
  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Service deleted successfully"));
});
export {
  createService,
  getAllServices,
  updateService,
  updateServiceImage,
  deleteService,
};
