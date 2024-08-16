import { Request, Response } from "express";
import prisma from "../db/prisma";
import bcrypt from "bcrypt";
import { generateToken } from "../utils/generateToken";
import exp from "constants";

type User = {
  username: string;
  email: string;
  password: string;
  gender: string;
  profilePic: string;
};

export const signup = async (req: Request, res: Response) => {
  const { username, email, password, comfirmPassword, gender } = req.body;
  console.log(req.body);
  if (!username || !email || !password || !comfirmPassword || !gender) {
    return res.status(400).json({ message: "All fields are required" });
  }
  if (password !== comfirmPassword) {
    return res.status(400).json({ message: "Password do not match" });
  }
  try {
    const user = await prisma.user.findUnique({
      where: {
        email,
        username,
      },
    });
    if (user) {
      return res.status(400).json({ message: "User already exist" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const boyPic =
      "https://avatar.iran.liara.run/public/boy?username=" + username;
    const girlPic =
      "https://avatar.iran.liara.run/public/girl?username=" + username;

    const newUser = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
        profilePic: gender === "male" ? boyPic : girlPic,
        gender,
      },
    });

    generateToken(newUser.id, res);

    return res.status(201).json({
      id: newUser.id,
      username: newUser.username,
      email: newUser.email,
      profilePic: newUser.profilePic,
    });
  } catch (error: any) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

export const signin = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }
  try {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Incorrect password" });
    }

    generateToken(user.id, res);

    return res.status(200).json({
      id: user.id,
      username: user.username,
      email: user.email,
      profilePic: user.profilePic,
    });
  } catch (error: any) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

export const signout = async (req: Request, res: Response) => {
  try {
    res.clearCookie("token");
    return res.status(200).json({ message: "Signout successfully" });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

export const findMe = async (req: Request, res: Response) => {
  try {
    const user = await prisma.user.findFirst({
      where: {
        id: req.user.id,
      },
      
    });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }
    return res.status(200).json({
      id: user.id,
      username: user.username,
      email: user.email,
      profilePic: user.profilePic,
    });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};
