import { UserModel } from "../models/user.model.js";
import { asyncHandler } from "../utils/asyncHandler.utility.js";
import type { Request, Response } from "express";
import { toUserDTO } from "../utils/user.dto.js";
import { errorHandler } from "../utils/errorHandler.utility.js";

export const getProfile = asyncHandler(async (req: Request, res: Response) => {
    const userId = req.user!._id;

    const user = await UserModel.findById(userId).select("-password");

    if (!user) throw new errorHandler("User not found", 404);

    res.status(200).json({
        success: true,
        message: "Profile fetched successfully",
        user: toUserDTO(user),
    });
});

export const getOtherProfiles = asyncHandler(
    async (req: Request, res: Response) => {
        const users = await UserModel.find({
            _id: { $ne: req.user!._id },
        }).sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            message: "Profiles fetched successfully",
            users: users.map((user) => toUserDTO(user)),
        });
    }
);
