import { asyncHandler } from "../utils/asyncHandler.utility.js";
import type { Request, Response } from "express";
import { errorHandler } from "../utils/errorHandler.utility.js";
import { ConversationModel } from "../models/conversation.model.js";
import { MessageModel } from "../models/message.model.js";
import { nextTick } from "node:process";

export const sendMessage = asyncHandler(async (req: Request, res: Response) => {
    const senderId = req.user!._id;
    const { receiverId } = req.params as { receiverId: string };
    const { message } = req.body;

    if (!message || !message.trim())
        throw new errorHandler("Message cannot be empty", 400);
    if (!receiverId) throw new errorHandler("Receiver ID is required", 400);

    //Find or create conversation model
    let conversation = await ConversationModel.findOne({
        participants: { $all: [senderId, receiverId] },
    });

    if (!conversation) {
        conversation = await ConversationModel.create({
            participants: [senderId, receiverId],
        });
    }

    //Create message model
    const newMessage = await MessageModel.create({
        conversationId: conversation._id,
        senderId,
        receiverId,
        message: message.trim(),
    });

    //socket.io ....

    res.status(201).json({
        success: true,
        data: newMessage,
    });
});

export const getMessages = asyncHandler(async (req: Request, res: Response) => {
    const userId = req.user!._id;
    const { otherUserId } = req.params;

    if (!otherUserId) {
        throw new errorHandler("Other user ID is required", 400);
    }

    const limit = parseInt(req.query.limit as string) || 20;
    const cursor = req.query.cursor as string | undefined;

    const conversation = await ConversationModel.findOne({
        participants: { $all: [userId, otherUserId] },
    });

    if (!conversation) {
        return res.status(200).json({
            success: true,
            data: [],
            nextCursor: null,
        });
    }

    const query: any = { conversationId: conversation._id };

    if (cursor) {
        query.createdAt = { $lt: new Date(cursor) };
    }

    let messages = await MessageModel.find(query)
        .sort({ createdAt: -1 })
        .limit(limit)
        .populate("senderId", "name avatar");

    messages = messages.reverse();

    const nextCursor = messages.length > 0 ? messages[0]!.createdAt : null;

    res.status(200).json({
        success: true,
        data: messages.map((msg) => ({
            _id: msg._id,
            sender: msg.senderId,
            receiverId: msg.receiverId,
            message: msg.message,
            createdAt: msg.createdAt,
        })),
        nextCursor,
    });
});

export const deleteMessage = asyncHandler(
    async (req: Request, res: Response) => {
        const { messageId } = req.params;
        await MessageModel.findByIdAndDelete(messageId);
        res.status(200).json({
            success: true,
        });
    }
);
