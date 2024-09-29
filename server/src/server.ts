import express, { Request, Response } from "express";
import dotenv from "dotenv";
import messageRouter from "./routes/message";
import authRouter from "./routes/auth";
import cors from "cors";
import cookieParser from "cookie-parser";
dotenv.config();

import jwt from "jsonwebtoken";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    credentials: true, // This allows cookies to be sent/received
  })
);
app.use(cookieParser());

const PORT = process.env.PORT || 8000;

app.get("/", (req: Request, res: Response) => {
  res.send("Hello, TypeScript with Express!");
});

app.get("/setcookie", (req: Request, res: Response) => {
  const token = jwt.sign({ id: "madf" }, process.env.JWT_SECRET as string, {
    expiresIn: "30d",
  });

  res.cookie("token", token, {
    sameSite: "lax", // Controls how cookies are sent across sites (adjust this if necessary)
  });
  res.send(token);

  const cookie = req.cookies;
  console.log(cookie);
  //return token;
});

app.get("/getcookie", (req: Request, res: Response) => {
  const cookie = req.cookies;
  console.log(cookie);
  res.send(cookie);
});

app.use("/message", messageRouter);
app.use("/auth", authRouter);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
