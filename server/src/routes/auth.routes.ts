import express from "express";
import { login, signup, refresh, logout } from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/login", login);
router.post("/signup", signup);
router.get("/refresh", refresh);
router.post("/logout", logout);

export default router;