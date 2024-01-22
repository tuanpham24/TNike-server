import { Request, Response, NextFunction } from "express";
import * as jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
import { resSuccess, resError } from "../services/response-handlers";

export const verifyToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = <string>req.headers["Authorization"];
    const secretKey: jwt.Secret | undefined =
      process.env.SECRET_KEY || "secret_default";

    if (!token) {
      return resError(res, "Access denied", 401);
    }

    let jwtPayload = <any>jwt.verify(token, secretKey);
    res.locals.jwtPayload = jwtPayload.userId;
    next();
  } catch (error) {
    return resError(res, "Internal server error", 401);
  }
};
