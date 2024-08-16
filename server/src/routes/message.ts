import express from "express";
import { Request, Response } from "express";
import { sendMessage } from "../controller/message";
import { protectRoute } from "../middleware/protectRoute";

const router = express.Router();
router.post("/send/:id",protectRoute, sendMessage);

export default router;
