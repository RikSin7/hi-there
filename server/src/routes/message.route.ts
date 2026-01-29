import express from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { deleteMessage, getMessages, sendMessage } from "../controllers/message.controller.js";

const router = express.Router();

router.post("/send/:receiverId", authMiddleware, sendMessage);
router.get("/with/:otherUserId", authMiddleware, getMessages);
router.delete("/delete/:messageId", authMiddleware, deleteMessage);

export default router;
