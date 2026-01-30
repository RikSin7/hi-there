import api from './api';

export interface UserProfile {
  _id: string;
  name: string;
  username: string;
  email: string;
  gender: string;
  role: string;
}

export const userService = {
  // Get current user profile
  getProfile: async (): Promise<{ success: boolean; data: UserProfile }> => {
    const response = await api.get('/user/me');
    return response.data;
  },

  // Get other users (for chat list)
  getOtherUsers: async (): Promise<{ success: boolean; data: UserProfile[] }> => {
    const response = await api.get('/user/others');
    return response.data;
  },
};

export default userService;
