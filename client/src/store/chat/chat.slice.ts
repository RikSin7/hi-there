import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { ChatState } from "./chat.types";
import { fetchChatsThunk, fetchMessagesThunk } from "./chat.thunk";

const initialState: ChatState = {
    chats: [],

    // key = otherUserId
    messagesByUserId: {},
    loadingByUserId: {},
    errorByUserId: {},

    activeUserId: null,

    loadingChats: false,
    chatsError: null,
};

const chatSlice = createSlice({
    name: "chat",
    initialState,
    reducers: {
        setActiveUser(state, action: PayloadAction<string>) {
            state.activeUserId = action.payload;
        },
        clearChatState() {
            return initialState;
        },
    },
    extraReducers: (builder) => {
        builder
            /* ===================== CHATS LIST ===================== */
            .addCase(fetchChatsThunk.pending, (state) => {
                state.loadingChats = true;
                state.chatsError = null;
            })
            .addCase(fetchChatsThunk.fulfilled, (state, action) => {
                state.loadingChats = false;
                state.chats = action.payload;
            })
            .addCase(fetchChatsThunk.rejected, (state, action) => {
                state.loadingChats = false;
                state.chatsError = action.payload as string;
            })

            /* ===================== FETCH MESSAGES ===================== */
            .addCase(fetchMessagesThunk.pending, (state, action) => {
                const { otherUserId } = action.meta.arg;
                state.loadingByUserId[otherUserId] = true;
                state.errorByUserId[otherUserId] = null;
            })
            .addCase(fetchMessagesThunk.fulfilled, (state, action) => {
                const { otherUserId, messages } = action.payload;
                state.loadingByUserId[otherUserId] = false;
                state.messagesByUserId[otherUserId] = messages;
            })
            .addCase(fetchMessagesThunk.rejected, (state, action) => {
                const { otherUserId } = action.meta.arg;
                state.loadingByUserId[otherUserId] = false;
                state.errorByUserId[otherUserId] =
                    (action.payload as string) || "Failed to fetch messages";
            });
    },
});

export const { setActiveUser, clearChatState } = chatSlice.actions;
export default chatSlice.reducer;
