// Services barrel export - consolidated
export { api } from './api/axiosInstance';
export * as AuthService from './auth.service';
export * as UserService from './user.service';
export * as ChatService from './chat.service';

// Export endpoints
export * from './api/endpoints';

// Re-export types from store
export type { LoginPayload, SignupPayload, AuthResponse, RefreshResponse } from '../store/auth/auth.types';
