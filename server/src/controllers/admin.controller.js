import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { generateAccessAndRefereshTokens } from "../utils/generateToken.js";
import { Booking } from "../models/booking.model.js";
import { Service } from "../models/service.model.js";
import { Review } from "../models/review.model.js";

const loginAdmin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  console.log(email);

  if (!email || !password) {
    throw new ApiError(400, "Email and Password are required");
  }

  const user = await User.findOne({
    email,
  });

  if (!user || user.role !== "admin") {
    throw new ApiError(404, "Admin does not exist");
  }

  const isPasswordValid = await user.isPasswordCorrect(password);

  if (!isPasswordValid) {
    throw new ApiError(401, "Invalid credentials");
  }

  const { accessToken, refreshToken } = await generateAccessAndRefereshTokens(
    user._id
  );

  const loggedInAdmin = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .cookie("adminAccessToken", accessToken, options)
    .cookie("adminRefreshToken", refreshToken, options)
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
  await User.findByIdAndUpdate(req.admin._id, {
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

export { loginAdmin, logoutAdmin, getAdminStats, getMeAdmin };
