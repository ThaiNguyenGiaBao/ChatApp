import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { Response } from "express";
dotenv.config();

export const generateToken = (id: string, res: Response) => {
  const token = jwt.sign({ id }, process.env.JWT_SECRET as string, {
    expiresIn: "30d",
  });
  res.cookie("token", token, {
    secure: false, // Use 'true' if you're on HTTPS, otherwise 'false' for development
    sameSite: "lax", // Controls how cookies are sent across sites (adjust this if necessary)
  });

  

  return token;
};
