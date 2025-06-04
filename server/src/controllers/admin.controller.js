import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import { Booking } from "../models/booking.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const generateAccessAndRefereshTokens = async (userId) => {
  try {
    const user = await User.findById(userId);
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(
      500,
      "Something went wrong while generating referesh and access token"
    );
  }
};

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
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
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

const getAllBookings = asyncHandler(async (req, res) => {
  const bookings = await Booking.find()
    .populate("userId", "fullName email phone")
    .populate("serviceId", "name description price");
  if (!bookings || bookings.length === 0) {
    throw new ApiError(404, "No bookings found");
  }
  res
    .status(200)
    .json(new ApiResponse(200, bookings, "Booking fetched Successfully"));
});

export { getAllBookings, loginAdmin };
