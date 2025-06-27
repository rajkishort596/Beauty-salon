// models/Specialist.js
import mongoose, { Schema } from "mongoose";

const specialistSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
    },
    phone: {
      type: String,
      required: [true, "Phone number is required"],
      unique: true,
    },
    image: {
      url: {
        type: String,
        required: true,
      },
      publicId: {
        type: String,
        required: true,
      },
    },
    expertise: [
      {
        type: Schema.Types.ObjectId,
        ref: "Service",
        required: true,
      },
    ], // e.g., [Haircut, Facial]
    availableDays: {
      type: [String], // e.g., ["Monday", "Wednesday"]
      required: true,
    },
    availableFrom: {
      type: String, // e.g., "09:00"
      required: true,
    },
    availableTo: {
      type: String, // e.g., "17:00"
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Specialist = mongoose.model("Specialist", specialistSchema);
