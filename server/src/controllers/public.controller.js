import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Admin } from "../models/admin.model.js";

const getContactInfo = asyncHandler(async (req, res) => {
  const admin = await Admin.findOne({ verified: true }).select(
    "email phone secondaryPhone address location"
  );
  if (!admin) throw new ApiError(404, "Admin contact info not found");

  const contactInfo = {
    email: admin.email,
    phone: admin.phone,
    secondaryPhone: admin.secondaryPhone,
    address: admin.address,
    location: admin.location,
  };
  return res
    .status(200)
    .json(new ApiResponse(200, contactInfo, "Contact info fetched"));
});

export { getContactInfo };
