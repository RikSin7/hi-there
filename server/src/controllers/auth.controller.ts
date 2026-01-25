import { UserModel } from "../models/user.model.js";
import { asyncHandler } from "../utils/asyncHandler.utility.js";
import bcrypt from "bcrypt";

import type { Request, Response } from "express";

import jwt from "jsonwebtoken";
import {
    generateAccessToken,
    generateRefreshToken,
} from "../utils/tokenGenerators.js";
import { toUserDTO } from "../utils/user.dto.js";
import { errorHandler } from "../utils/errorHandler.utility.js";

//signup
export const signup = asyncHandler(async (req: Request, res: Response) => {
    const { name, username, email, password, gender } = req.body;
    if (!name || !username || !password || !gender)
        throw new errorHandler("All fields are required", 400);

    if (password.length < 8)
        throw new errorHandler("Password must be at least 8 characters", 400);

    const existingUser = await UserModel.findOne({ username });
    if (existingUser) throw new errorHandler("Username already taken", 409);

    const existingEmail = await UserModel.findOne({ email });
    if (existingEmail) throw new errorHandler("Email already taken", 409);

    const hashedPassword = await bcrypt.hash(password, 10);

    // create user
    const user = await UserModel.create({
        name,
        username,
        email,
        password: hashedPassword,
        gender,
        role: "user",
    });

    //generate tokens
    const accessToken = generateAccessToken(user._id.toString());
    const refreshToken = generateRefreshToken(user._id.toString());

    // store refresh token in cookie
    res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(201).json({
        success: true,
        message: "User created successfully",
        user: toUserDTO(user),
        accessToken,
    });
});

//login
export const login = asyncHandler(async (req: Request, res: Response) => {
    const { username, password } = req.body;

    if (!username || !password)
        throw new errorHandler("Invalid credentials", 400);

    const user = await UserModel.findOne({ username }).select("+password");
    if (!user) {
        throw new errorHandler("Invalid credentials", 401);
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) throw new errorHandler("Invalid credentials", 401);

    const accessToken = generateAccessToken(user._id.toString());
    const refreshToken = generateRefreshToken(user._id.toString());

    res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(200).json({
        success: true,
        message: "Login successful",
        user: toUserDTO(user),
        accessToken,
    });
});

//refresh
export const refresh = asyncHandler(async (req: Request, res: Response) => {
    // get refresh token from cookie
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) throw new errorHandler("Unauthorized", 401);

    // verify refresh token
    let payload;
    try {
        payload = jwt.verify(
            refreshToken,
            process.env.JWT_REFRESH_SECRET as string
        ) as { id: string };
    } catch {
        throw new errorHandler("Invalid refresh token", 401);
    }

    // generate new access token
    const newAccessToken = generateAccessToken(payload.id);
    res.status(200).json({
        success: true,
        message: "Token refreshed successfully",
        accessToken: newAccessToken,
    });
});

//logout
export const logout = asyncHandler(async (_req: Request, res: Response) => {
    res.clearCookie("refreshToken");
    res.json({ success: true, message: "Logout successful" });
});
