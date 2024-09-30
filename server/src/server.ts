import express, { Request, Response } from "express";
import dotenv from "dotenv";
import messageRouter from "./routes/message";
import authRouter from "./routes/auth";
import cors from "cors";
import cookieParser from "cookie-parser";
dotenv.config();
import { server, io, app } from "./socket/index";

import jwt from "jsonwebtoken";

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "http://localhost:5173", // URL of the react app
    credentials: true, // This allows cookies to be sent/received
  })
);
app.use(cookieParser());

const PORT = process.env.PORT || 8000;

app.get("/", (req: Request, res: Response) => {
  res.send("Hello, TypeScript with Express!");
});

app.use("/message", messageRouter);
app.use("/auth", authRouter);

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
