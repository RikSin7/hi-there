import { api } from "./api/axiosInstance";
import { CHAT } from "./api/endpoints";

export const getChats = async () => {
    const { data } = await api.get(CHAT.GET_CHATS);
    return data;
};

export const getMessages = async (otherUserId: string) => {
    const { data } = await api.get(CHAT.GET_MESSAGES(otherUserId));
    return data;
};

export const sendMessage = async (receiverId: string, message: string) => {
    const { data } = await api.post(CHAT.SEND_MESSAGE(receiverId), { message });
    return data;
};