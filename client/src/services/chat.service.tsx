import api from './api';

export interface Chat {
  _id: string;
  participants: string[];
  lastMessage?: {
    senderId: string;
    content: string;
    createdAt: string;
  };
  createdAt: string;
  updatedAt: string;
}

export const chatService = {
  // Get all chats for current user
  getChats: async (): Promise<{ success: boolean; data: Chat[] }> => {
    const response = await api.get('/chats');
    return response.data;
  },
};

export default chatService;
