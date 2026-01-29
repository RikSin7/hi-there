import express from "express";
import { getOtherProfiles, getProfile } from "../controllers/user.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = express.Router();


router.get("/me", authMiddleware, getProfile);
router.get("/others", authMiddleware, getOtherProfiles);

export default router;
