
import api from './api';

export interface Message {
  _id: string;
  senderId: string;
  receiverId: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}

export const messageService = {
  // Send message to a user
  sendMessage: async (receiverId: string, content: string): Promise<{ success: boolean; data: Message }> => {
    const response = await api.post(`/message/send/${receiverId}`, { content });
    return response.data;
  },

  // Get messages with a specific user
  getMessages: async (otherUserId: string): Promise<{ success: boolean; data: Message[] }> => {
    const response = await api.get(`/message/with/${otherUserId}`);
    return response.data;
  },

  // Delete a message
  deleteMessage: async (messageId: string): Promise<{ success: boolean }> => {
    const response = await api.delete(`/message/delete/${messageId}`);
    return response.data;
  },
};

export default messageService;
