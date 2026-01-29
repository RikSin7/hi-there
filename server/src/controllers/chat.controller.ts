import { asyncHandler } from "../utils/asyncHandler.utility.js";
import type { Request, Response } from "express";
import { ConversationModel } from "../models/conversation.model.js";
import { MessageModel } from "../models/message.model.js";

export const getChats = asyncHandler(async (req: Request, res: Response) => {
    const userId = req.user!._id;

    const conversations = await ConversationModel.find({
        participants: userId,
    })
        .sort({ updatedAt: -1 })
        .populate("participants", "name avatar");

    // Always return array — never null
    if (!conversations.length) {
        return res.status(200).json({
            success: true,
            data: [],
        });
    }

    const chatsWithLastMessage = await Promise.all(
        conversations.map(async (conv) => {
            const otherUser = conv.participants.find(
                (p: any) => p._id.toString() !== userId.toString()
            );

            // 🔒 HARD GUARANTEE
            if (!otherUser) return null;

            const lastMessage = await MessageModel.findOne({
                conversationId: conv._id,
            })
                .sort({ createdAt: -1 })
                .select("message createdAt senderId");

            return {
                _id: conv._id,
                user: otherUser, //ALWAYS present
                updatedAt: conv.updatedAt,
                lastMessage,
            };
        })
    );

    res.status(200).json({
        success: true,
        data: chatsWithLastMessage.filter(Boolean), // remove invalid chats
    });
});
