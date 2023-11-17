import mongoose from "mongoose";
import { IProduct } from "../interfaces/model";

const ProductSchema = new mongoose.Schema<IProduct>(
  {
    name: {
      type: String,
      min: [1, "Must be at least 1, got {VALUE}"],
      max: 255,
      required: true,
    },
    type: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ProductType",
      required: true,
    },
    description: {
      type: String,
      min: [1, "Must be at least 1, got {VALUE}"],
      max: 255,
      required: true,
    },
    image_path: {
      type: String,
    },
    size: {
      type: [String],
      required: true,
    },
    purchase_price: {
      type: Number,
      min: [1, "Must be at least 1, got {VALUE}"],
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    sold_quantity: {
      type: Number,
      default: 0,
    },
    stars: {
      type: [Number],
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Product", ProductSchema);
