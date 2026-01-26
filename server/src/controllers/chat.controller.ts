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

    if (!conversations) {
        return res.status(200).json({
            success: true,
            message: "No conversations yet",
            data: [],
        });
    }

    //format conversations
    const formattedChats = conversations.map((conv) => {
        const otherUser = conv.participants.find(
            (p: any) => p._id.toString() !== userId.toString()
        );

        return {
            _id: conv._id,
            user: otherUser,
            updatedAt: conv.updatedAt,
        };
    });

    const chatsWithLastMessage = await Promise.all(
        formattedChats.map(async (chat) => {
            const lastMessage = await MessageModel.findOne({
                conversationId: chat._id,
            })
                .sort({ createdAt: -1 })
                .select("message createdAt senderId");

            return {
                ...chat,
                lastMessage,
            };
        })
    );

    res.status(200).json({
        success: true,
        data: chatsWithLastMessage,
    });
});
