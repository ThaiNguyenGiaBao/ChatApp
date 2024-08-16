import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import prisma from "../db/prisma";

interface decodeToken extends JwtPayload {
  id: string;
}

declare global {
  namespace Express {
    export interface Request {
      user: {
        id: string;
      };
    }
  }
}

export const protectRoute = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const decodeId: { id: string } = jwt.verify(
    token,
    process.env.JWT_SECRET!
  ) as decodeToken;
  console.log(decodeId.id);
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: decodeId.id,
      },
    });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }
    req.user = { id: user.id };
    next();
  } catch (error: any) {
    return res.status(401).json({ message: error.message });
  }
};
