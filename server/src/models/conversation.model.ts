import mongoose from "mongoose";
import type { ConversationDocument } from "../types/model.types.js";

const ConversationSchema = new mongoose.Schema<ConversationDocument>(
    {
        participants: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
                required: true,
            },
        ],
    },
    { timestamps: true }
);

export const ConversationModel = mongoose.model<ConversationDocument>(
    "Conversation",
    ConversationSchema.index({ participants: 1 })
);
