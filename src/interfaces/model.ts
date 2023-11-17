import mongoose from "mongoose";
import { Document } from "mongoose";

// Product model
export interface IProduct extends Document {
  name: String;
  type: mongoose.Schema.Types.ObjectId;
  description: String;
  image_path: String;
  size: Array<String>;
  purchase_price: Number;
  price: Number;
  sold_quantity: Number;
  stars: Array<Number>;
}

// Product type model
export interface IProductType extends Document {
  name: String;
}