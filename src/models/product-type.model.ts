import mongoose from "mongoose";
import { IProductType } from "../interfaces/model";

const ProductTypeSchema = new mongoose.Schema<IProductType>(
  {
    name: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("ProductType", ProductTypeSchema);
