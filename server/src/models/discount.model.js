import mongoose, { Schema } from "mongoose";

const discountSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,

  percentage: {
    type: Number,
    required: true,
    min: 1,
    max: 100,
  },
  category: [
    {
      type: String,
      enum: [
        "Make up",
        "Hair styling",
        "Nail care",
        "cosmetology",
        "SPA procedures",
      ],
      required: true,
    },
  ],
  image: {
    url: String,
    publicId: String,
  },

  validFrom: Date,
  validTill: Date,

  isActive: {
    type: Boolean,
    default: true,
  },
});

export const Discount = mongoose.model("Discount", discountSchema);
