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
  sale_off: Boolean;
}

// Product type model
export interface IProductType extends Document {
  name: String;
}

// Sale-off product model
export interface ISaleOffProduct extends Document {
  product: mongoose.Schema.Types.ObjectId;
  percent: Number;
  startSale: Date;
  endSale: Date;
}

// User model
export interface IUser extends Document {
  fullname: String;
  phone: String;
  email: String;
  address: String;
  dateOfBirth: Date;
  password: String;
}