import express, { Request, Response } from "express";
import dotenv from "dotenv";
import messageRouter from "./routes/message";
import authRouter from "./routes/auth";
import cors from "cors";
import cookieParser from "cookie-parser";
dotenv.config();


const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(cookieParser());

const PORT = process.env.PORT || 8000;

app.get("/", (req: Request, res: Response) => {
  res.send("Hello, TypeScript with Express!");
});



app.use("/message", messageRouter);
app.use("/auth", authRouter);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
