import mongoose, { Schema } from "mongoose";

const serviceSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
    },
    duration: {
      type: Number, // in minutes
      required: true,
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
    category: {
      type: String,
      enum: [
        "Make up",
        "Hair styling",
        "Nail care",
        "consmetology",
        "SPA procedures",
      ],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Service = mongoose.model("Service", serviceSchema);
