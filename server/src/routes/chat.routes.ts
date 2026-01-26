import express from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { getChats } from "../controllers/chat.controller.js";

const router = express.Router();

router.get("/", authMiddleware, getChats);

export default router;
