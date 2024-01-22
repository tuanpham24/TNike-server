import mongoose from "mongoose";
import { IUser } from "../interfaces/model";

const UserSchema = new mongoose.Schema<IUser>({
  fullname: {
    type: String,
    min: [1, "Must be at least 1, got {VALUE}"],
    max: 255,
    required: true,
  },
  phone: {
    type: String,
    max: 10,
    required: true,
  },
  email: {
    type: String,
    min: [1, "Must be at least 1, got {VALUE}"],
    max: 255,
    required: true,
  },
  address: {
    type: String,
    min: [1, "Must be at least 1, got {VALUE}"],
    max: 255,
    required: true,
  },
  dateOfBirth: {
    type: Date,
  },
  password: {
    type: String,
    required: true,
  },
});

export default mongoose.model("User", UserSchema);
