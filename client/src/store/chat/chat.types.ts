// Redux state
export interface ChatState {
    // Chat list (/chats)
    chats: ChatPreview[];
    loadingChats: boolean;
    chatsError: string | null;

    // Messages keyed by otherUserId
    messagesByUserId: Record<string, Message[]>;
    loadingByUserId: Record<string, boolean>;
    errorByUserId: Record<string, string | null>;

    // UI state
    activeUserId: string | null;
}


// User info shown in chat context
export type ChatUser = {
    _id: string;
    name: string;
    avatar: string;
};

// Single message
export type Message = {
    _id: string;
    sender: ChatUser;
    receiverId: string;
    message: string;
    createdAt: string;
};

// Chat preview (from GET /chats)
export type ChatPreview = {
    _id: string; // conversationId
    user: ChatUser; // other participant
    lastMessage?: {
        message: string;
        createdAt: string;
        senderId: string;
    };
    updatedAt: string;
};

// Cursor-based messages response
export type MessagesResponse = {
    data: Message[];
    nextCursor: string | null;
};

export type FetchMessagesPayload = {
    otherUserId: string;
    cursor?: string;
};

export type FetchMessagesResult = {
    otherUserId: string;
    messages: Message[];
    nextCursor: string | null;
};
