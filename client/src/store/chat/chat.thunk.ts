import { createAsyncThunk } from "@reduxjs/toolkit";
import { ChatService } from "../../services";
import {
    type FetchMessagesResult,
    type ChatPreview,
    type FetchMessagesPayload,
    type Message,
    type MessagesResponse,
} from "./chat.types";

// Fetch chat list
export const fetchChatsThunk = createAsyncThunk<
    ChatPreview[],
    void,
    { rejectValue: string }
>("chat/fetchChats", async (_, { rejectWithValue }) => {
    try {
        const res = await ChatService.getChats();
        return res.data;
    } catch {
        return rejectWithValue("Failed to fetch chats");
    }
});

// Fetch messages (cursor based)
export const fetchMessagesThunk = createAsyncThunk<
    FetchMessagesResult,
    FetchMessagesPayload,
    { rejectValue: string }
>(
    "chat/fetchMessages",
    async ({ otherUserId, cursor }, { rejectWithValue }) => {
        try {
            const res: MessagesResponse = await ChatService.getMessages(
                otherUserId,
                cursor
            );

            return {
                otherUserId,
                messages: res.data,
                nextCursor: res.nextCursor,
            };
        } catch {
            return rejectWithValue("Failed to fetch messages");
        }
    }
);


// Send message
export const sendMessageThunk = createAsyncThunk<
    Message,
    { receiverId: string; message: string },
    { rejectValue: string }
>("chat/sendMessage", async ({ receiverId, message }, { rejectWithValue }) => {
    try {
        const res = await ChatService.sendMessage(receiverId, message);
        return res.data;
    } catch {
        return rejectWithValue("Failed to send message");
    }
});
