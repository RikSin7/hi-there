import type { Request, Response, NextFunction } from "express";
import { errorHandler } from "../utils/errorHandler.utility.js";

const errorMiddleware = (
    err: unknown,
    _req: Request,
    res: Response,
    _next: NextFunction
) => {
    // Default values
    let statusCode = 500;
    let message = "Internal Server Error";

    // If it's our custom error
    if (err instanceof errorHandler) {
        statusCode = err.statusCode;
        message = err.message;
    }

    // Mongoose bad ObjectId
    if ((err as any)?.name === "CastError") {
        statusCode = 400;
        message = "Invalid ID format";
    }

    // Mongoose duplicate key
    if ((err as any)?.code === 11000) {
        statusCode = 409;
        message = "Duplicate field value";
    }

    // JWT errors
    if ((err as any)?.name === "JsonWebTokenError") {
        statusCode = 401;
        message = "Invalid token";
    }

    if ((err as any)?.name === "TokenExpiredError") {
        statusCode = 401;
        message = "Token expired";
    }

    // Log error in development
    if (process.env.NODE_ENV !== "production") {
        console.error(err);
    }

    res.status(statusCode).json({
        success: false,
        message,
    });
};

export default errorMiddleware;
