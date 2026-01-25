import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const authMiddleware = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    const token = authHeader.split(" ")[1];

    const secret = process.env.JWT_ACCESS_SECRET;
    if (!token || !secret) {
        throw new Error("JWT_ACCESS_SECRET not defined");
    }

    const decoded = jwt.verify(token, secret) as { _id: string };

    req.user = decoded;
    next();
};
