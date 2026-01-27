export const AUTH = {
    LOGIN: "/auth/login",
    SIGNUP: "/auth/signup",
    REFRESH: "/auth/refresh",
    LOGOUT: "/auth/logout",
};

export const CHAT = {
    GET_CHATS: "/chats",
    GET_MESSAGES: (otherUserId: string) => `/message/with/${otherUserId}`,
    SEND_MESSAGE: (receiverId: string) => `/message/send/${receiverId}`,
};

export const USER = {
    ME: "/user/me",
    OTHERS: "/user/others",
};