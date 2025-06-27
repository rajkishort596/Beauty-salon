import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { generateAccessAndRefereshTokens } from "../utils/generateToken.js";
import { Booking } from "../models/booking.model.js";
import { Service } from "../models/service.model.js";
import { Review } from "../models/review.model.js";
import {
  deleteImageFromCloudinary,
  uploadOnCloudinary,
} from "../utils/cloudinary.js";
import { Admin } from "../models/admin.model.js";

const loginAdmin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  console.log(email);

  if (!email || !password) {
    throw new ApiError(400, "Email and Password are required");
  }

  const admin = await Admin.findOne({
    email,
  });

  if (!admin) {
    throw new ApiError(404, "Admin does not exist");
  }

  const isPasswordValid = await admin.isPasswordCorrect(password);

  if (!isPasswordValid) {
    throw new ApiError(401, "Invalid credentials");
  }

  const { accessToken, refreshToken } = await generateAccessAndRefereshTokens(
    admin._id,
    Admin
  );

  const loggedInAdmin = await Admin.findById(admin._id).select(
    "-password -refreshToken"
  );

  const options = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
    maxAge: 24 * 60 * 60 * 1000,
  };

  return res
    .status(200)
    .cookie("adminAccessToken", accessToken, options)
    .cookie("adminRefreshToken", refreshToken, {
      ...options,
      maxAge: 10 * 24 * 60 * 60 * 1000,
    })
    .json(
      new ApiResponse(
        200,
        {
          user: loggedInAdmin,
          accessToken,
          refreshToken,
        },
        "Admin logged In Successfully"
      )
    );
});

const logoutAdmin = asyncHandler(async (req, res) => {
  await Admin.findByIdAndUpdate(req.admin._id, {
    $unset: { refreshToken: 1 },
  });
  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .clearCookie("adminAccessToken", options)
    .clearCookie("adminRefreshToken", options)
    .status(200)
    .json(new ApiResponse(200, {}, "Admin logged out"));
});

const getAdminStats = asyncHandler(async (req, res) => {
  const totalBookings = await Booking.countDocuments();
  const totalServices = await Service.countDocuments();
  const totalReviews = await Review.countDocuments();
  const totalUsers = await User.countDocuments({ role: "user" });

  const stats = {
    totalBookings,
    totalServices,
    totalReviews,
    totalUsers,
  };

  return res
    .status(200)
    .json(new ApiResponse(200, stats, "Admin statistics fetched successfully"));
});
const getMeAdmin = asyncHandler(async (req, res) => {
  // req.admin is attached by verifyAdminJWT
  return res
    .status(200)
    .json(
      new ApiResponse(200, req.admin, "Admin details fetched successfully")
    );
});

const updateAdminProfile = asyncHandler(async (req, res) => {
  const {
    fullName,
    phone,
    email,
    secondaryPhone,
    latitude,
    longitude,
    address,
  } = req.body;

  const avatarImageLocalPath = req.file?.path;

  if (
    !fullName &&
    !phone &&
    !email &&
    !secondaryPhone &&
    !latitude &&
    !longitude &&
    !address
  ) {
    throw new ApiError(400, "All Fields are required");
  }

  const existedAdmin = await Admin.findById(req.admin._id);

  if (!existedAdmin) {
    throw new ApiError(404, "Admin not found");
  }

  let avatarToBeUpdated = existedAdmin.avatar;
  let locationToBeUpdated = existedAdmin.location;

  // If new avatar provided, upload and delete old one
  if (avatarImageLocalPath) {
    const image = await uploadOnCloudinary(avatarImageLocalPath);
    if (!image) {
      throw new ApiError(400, "Image upload failed");
    }

    // Delete old image from Cloudinary
    if (existedAdmin.avatar?.publicId) {
      await deleteImageFromCloudinary(existedAdmin.avatar.publicId);
    }

    avatarToBeUpdated = {
      url: image.url,
      publicId: image.public_id,
    };
  }

  if (latitude && longitude) {
    locationToBeUpdated = {
      lat: latitude,
      lng: longitude,
    };
  }
  // console.log(latitude, longitude);
  const updatedAdmin = await Admin.findByIdAndUpdate(
    req.admin._id,
    {
      $set: {
        fullName,
        phone,
        secondaryPhone,
        address,
        location: locationToBeUpdated,
        avatar: avatarToBeUpdated,
      },
    },
    { new: true, runValidators: true, select: "-password -refreshToken" }
  );

  return res
    .status(200)
    .json(
      new ApiResponse(200, updatedAdmin, "Admin profile updated successfully")
    );
});

const changePassword = asyncHandler(async (req, res) => {
  const { currentPassword, newPassword } = req.body;

  if (!currentPassword || !newPassword) {
    throw new ApiError(400, "Current and new password are required");
  }

  const admin = await Admin.findById(req.admin._id);

  if (!admin) {
    throw new ApiError(404, "Admin not found");
  }

  const isPasswordValid = await admin.isPasswordCorrect(currentPassword);

  if (!isPasswordValid) {
    throw new ApiError(401, "Current password is incorrect");
  }

  admin.password = newPassword;
  await admin.save();

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Password changed successfully"));
});

export {
  loginAdmin,
  logoutAdmin,
  getAdminStats,
  getMeAdmin,
  updateAdminProfile,
  changePassword,
};
