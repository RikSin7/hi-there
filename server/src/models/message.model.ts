import mongoose from "mongoose";
import type { MessageDocument } from "../types/model.types.js";

const MessageSchema = new mongoose.Schema<MessageDocument>(
    {
        conversationId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Conversation",
            required: true,
            index: true, // IMPORTANT for performance
        },
        senderId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        receiverId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        message: {
            type: String,
            required: true,
            trim: true,
        },
    },
    { timestamps: true }
);

export const MessageModel = mongoose.model<MessageDocument>(
    "Message",
    MessageSchema
);
