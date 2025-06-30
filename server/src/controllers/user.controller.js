import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { generateAccessAndRefereshTokens } from "../utils/generateToken.js";
import { sendEmail } from "../utils/sendEmail.js";
import jwt from "jsonwebtoken";

const registerUser = asyncHandler(async (req, res) => {
  const { fullName, email, password, phone } = req.body;
  if (!fullName || !email || !password || !phone) {
    throw new ApiError(400, "All fields are required");
  }

  let user = await User.findOne({ email });

  if (!user) {
    throw new ApiError(400, "Please verify your email first");
  }

  if (user.verified) {
    throw new ApiError(400, "User already exists with this email");
  }

  const avatarLocalPath = req.file?.path;
  if (!avatarLocalPath) throw new ApiError(400, "Avatar file is required");

  const avatar = await uploadOnCloudinary(avatarLocalPath);
  if (!avatar) throw new ApiError(400, "Avatar upload failed");

  user.fullName = fullName;
  user.password = password;
  user.phone = phone;
  user.avatar = {
    url: avatar.url,
    publicId: avatar.public_id,
  };
  user.verified = true;
  user.otp = undefined;
  user.otpExpiry = undefined;

  await user.save();

  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  await sendEmail(
    user.email,
    "Registration Successful",
    `
      <div style="font-family: Arial, sans-serif; color: #222;">
        <h2>Welcome to Beauty Salon!</h2>
        <p>Hello ${user.fullName || ""},</p>
        <p>Your registration was successful. You can now log in and enjoy our services.</p>
        <p>If you have any questions, feel free to contact our support team.</p>
        <p style="margin-top:32px;font-size:12px;color:#888;">Thank you for joining us!</p>
      </div>
    `
  );

  return res
    .status(201)
    .json(new ApiResponse(200, createdUser, "User registered successfully"));
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new ApiError(400, "Email and Password are required");
  }

  const user = await User.findOne({
    email,
  });

  if (!user) {
    throw new ApiError(404, "User does not exist");
  }

  const isPasswordValid = await user.isPasswordCorrect(password);

  if (!isPasswordValid) {
    throw new ApiError(401, "Invalid user credentials");
  }

  const { accessToken, refreshToken } = await generateAccessAndRefereshTokens(
    user._id
  );

  const loggedInUser = await User.findById(user._id).select(
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
    .cookie("userAccessToken", accessToken, options)
    .cookie("userRefreshToken", refreshToken, {
      ...options,
      maxAge: 10 * 24 * 60 * 60 * 1000,
    })
    .json(
      new ApiResponse(
        200,
        {
          user: loggedInUser,
          accessToken,
          refreshToken,
        },
        "User logged In Successfully"
      )
    );
});

const logoutUser = asyncHandler(async (req, res) => {
  await User.findByIdAndUpdate(
    req.user._id,
    {
      $unset: {
        refreshToken: 1, // this removes the field from document
      },
    },
    {
      new: true,
    }
  );

  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .clearCookie("userAccessToken", options)
    .clearCookie("userRefreshToken", options)
    .json(new ApiResponse(200, {}, "User logged Out"));
});
const getMeUser = asyncHandler(async (req, res) => {
  // req.user is attached by verifyUserJWT
  return res
    .status(200)
    .json(new ApiResponse(200, req.user, "User details fetched successfully"));
});

const forgotPassword = asyncHandler(async (req, res) => {
  const { email } = req.body;

  if (!email) throw new ApiError(400, "Email is required");

  const user = await User.findOne({ email });
  if (!user) throw new ApiError(404, "User with this email does not exist");

  // Generate JWT reset token
  const resetToken = user.generatePasswordResetToken();
  const resetUrl = `${process.env.CORS_ORIGIN}/reset-password/${resetToken}`;

  await sendEmail(
    user.email,
    "Password Reset",
    `
      <div style="font-family: Arial, sans-serif; color: #222;">
        <h2>Password Reset Request</h2>
        <p>Hello ${user.fullName || ""},</p>
        <p>We received a request to reset your password. Click the button below to reset it:</p>
        <a href="${resetUrl}" style="display:inline-block;padding:12px 24px;background:#1976d2;color:#fff;text-decoration:none;border-radius:4px;font-weight:bold;">Reset Password</a>
        <p>If you did not request this, please ignore this email.</p>
        <p style="margin-top:32px;font-size:12px;color:#888;">If the button doesn't work, copy and paste this link into your browser:<br>${resetUrl}</p>
      </div>
    `
  );

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { resetUrl },
        "Password reset link sent to your email"
      )
    );
});

const resetPassword = asyncHandler(async (req, res) => {
  const { token, password } = req.body;

  if (!token || !password) {
    throw new ApiError(400, "Token and new password are required");
  }

  let payload;
  try {
    payload = jwt.verify(token, process.env.RESET_PASSWORD_SECRET);
  } catch (err) {
    throw new ApiError(400, "Invalid or expired reset token");
  }

  const user = await User.findById(payload._id);
  if (!user) {
    throw new ApiError(404, "User not found");
  }

  user.password = password;
  await user.save();

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Password reset successful"));
});

export {
  registerUser,
  loginUser,
  logoutUser,
  getMeUser,
  forgotPassword,
  resetPassword,
};
