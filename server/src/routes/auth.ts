import express from "express";
import { Request, Response } from "express";
import { signup, signin, signout, findMe } from "../controller/auth";
import { protectRoute } from "../middleware/protectRoute";
import prisma from "../db/prisma";

const router = express.Router();

router.post("/signup", signup);

router.post("/signin", signin);

router.post("/signout", signout);

router.get("/me", protectRoute, findMe);

router.get("/test", async (req: Request, res: Response) => {
  // Get all data from User table

  try {
    const users = await prisma.user.findMany();
    return res.status(200).json(users);
  } catch (error: any) {
    console.log(error.message);
  }
});

export default router;
