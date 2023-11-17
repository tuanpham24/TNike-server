import { Response } from "express";

// function handle success response
export const resSuccess = async (res: Response, message: String, data: any) => {
  return res.status(200).json({ message, ...data });
};

// function handle error response
export const resError = async (
  res: Response,
  message: String,
  code: Number
) => {
  return res.status(400).json({ code, message });
};
