import mongoose from "mongoose";
import { ISaleOffProduct } from "../interfaces/model";

const SaleOffProductSchema = new mongoose.Schema<ISaleOffProduct>(
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    percent: {
      type: Number,
      min: [1, "Must be at least 1, got {VALUE}"],
      max: 100,
      required: true,
    },
    startSale: {
      type: Date,
      equired: true,
    },
    endSale: {
      type: Date,
      equired: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("SaleOffProduct", SaleOffProductSchema);
