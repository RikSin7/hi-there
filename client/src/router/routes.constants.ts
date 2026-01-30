/**
 * Route Constants
 * Centralized route paths for the application
 */

export const ROUTES = {
  // Root
  ROOT: '/',
  
  // Public Routes
  SIGNIN: '/signin',
  SIGNUP: '/signup',
  
  // Protected Routes
  HOME: '/home',
  CHAT: '/chat/:userId',
  
  // System Routes
  NOT_FOUND: '*',
} as const;

/**
 * Helper function to generate chat route with userId
 */
export const getChatRoute = (userId: string) => `/chat/${userId}`;

/**
 * Route types for type safety
 */
export type AppRoutes = typeof ROUTES[keyof typeof ROUTES];
