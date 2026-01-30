import api from './api';

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface SignupData {
  name: string;
  username: string;
  email: string;
  password: string;
  gender: 'male' | 'female' | 'other';
}

export interface AuthResponse {
  success: boolean;
  data: {
    _id: string;
    name: string;
    username: string;
    email: string;
    gender: string;
    role: string;
  };
  accessToken: string;
}

export const authService = {
  // Login
  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    const response = await api.post('/auth/login', credentials);
    return response.data;
  },

  // Signup
  signup: async (data: SignupData): Promise<AuthResponse> => {
    const response = await api.post('/auth/signup', data);
    return response.data;
  },

  // Logout
  logout: async (): Promise<void> => {
    await api.post('/auth/logout');
  },

  // Refresh token
  refreshToken: async (): Promise<{ success: boolean; accessToken: string }> => {
    const response = await api.get('/auth/refresh');
    return response.data;
  },
};

export default authService;
