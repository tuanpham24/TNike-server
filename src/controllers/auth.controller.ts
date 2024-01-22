import { Request, Response, NextFunction } from "express";
import User from "../models/user.model";
import dotenv from "dotenv";
dotenv.config();
import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";
import { resSuccess, resError } from "../services/response-handlers";
import { isValidateEmail } from "../utils/validation";

class AuthController {
  /**
   * @method POST
   * @path /api/auth/register
   * @description Function handle user register
   * @param {*} req
   * @param {*} res
   * @param {*} next
   * @returns
   */

  async register(req: Request, res: Response, next: NextFunction) {
    const { fullname, phone, email, address, dateOfBirth, password } = req.body;

    if (!(fullname && phone && email && address && dateOfBirth && password)) {
      return resError(res, "Please fill all fields", 400);
    }

    if (!isValidateEmail(email)) {
      return resError(res, "Email is invalid", 400);
    }

    const emailExisted = await User.findOne({ email });
    if (emailExisted) {
      return resError(res, "Email is existed", 400);
    }

    try {
      const saltRounds = await bcrypt.genSalt(10);
      const hashedPwd = await bcrypt.hash(password, saltRounds);
      const newUser = new User({
        fullname,
        phone,
        email,
        address,
        dateOfBirth,
        password: hashedPwd,
      });

      await newUser.save();

      // create token
      const accessToken = jwt.sign(
        { userId: newUser._id },
        process.env.SECRET_KEY || "",
        { expiresIn: process.env.EXPIRES_IN }
      );

      return resSuccess(res, "Register successfully!", { accessToken });
    } catch (error) {
      return resError(res, "Internal server error", 500);
    }
  }

  /**
   * @method POST
   * @path /api/auth/login
   * @description Function handle user login
   * @param {*} req
   * @param {*} res
   * @param {*} next
   * @returns
   */
  async login(req: Request, res: Response, next: NextFunction) {
    const { email, password } = req.body;

    if (!(email && password)) {
      return resError(res, "Please fill all fields", 400);
    }

    if (!isValidateEmail(email)) {
      return resError(res, "Email is invalid", 400);
    }

    try {
      const user = await User.findOne({ email: email });
      if (!user) {
        return resError(res, "Email or Password is not correct", 400);
      }

      const passwordCheck = await bcrypt.compare(
        password,
        user.password.toString()
      );
      if (!passwordCheck) {
        return resError(res, "Email or Password is not correct", 400);
      }

      // create token
      const accessToken = jwt.sign(
        { userId: user._id },
        process.env.SECRET_KEY || "",
        { expiresIn: process.env.EXPIRES_IN }
      );

      return resSuccess(res, "Login successfully", { accessToken });
    } catch (error) {
      return resError(res, "Internal server error", 500);
    }
  }
}

export default new AuthController();
