import express from "express";
import { Request, Response } from "express";
import {
  sendMessage,
  getMessages,
  getConversations,
} from "../controller/message";
import { protectRoute } from "../middleware/protectRoute";

const router = express.Router();
router.get("/", (req: Request, res: Response) => {
  const token = req.cookies.token;
  res.send(token);
});
router.post("/send/:id", protectRoute, sendMessage);
router.get("/conversations",protectRoute, getConversations);
router.get("/:id", protectRoute, getMessages);

export default router;
