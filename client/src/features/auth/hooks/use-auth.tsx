import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import type { SignupPayload } from '@/store/auth/auth.types';

// Types
export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  permissions: string[];
  role: 'admin' | 'moderator' | 'user';
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<any>;
  signup: (payload: SignupPayload) => Promise<any>;
  logout: () => Promise<void>;
  hasPermission: (permission: string) => boolean;
  hasAnyPermission: (permissions: string[]) => boolean;
  hasAllPermissions: (permissions: string[]) => boolean;
}

// Create context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Provider props
interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check if user is already logged in on mount
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { getToken } = await import('@/utils/token');
        // Check for stored auth token
        const token = getToken();
        
        if (token) {
          // In production, validate token with backend
          // For now, we'll use mock data
          const storedUser = localStorage.getItem('user');
          if (storedUser) {
            setUser(JSON.parse(storedUser));
          }
        }
      } catch (error) {
        console.error('Auth check failed:', error);
        // Clear invalid auth data
        const { removeToken } = await import('@/utils/token');
        removeToken();
        localStorage.removeItem('user');
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (username: string, password: string) => {
    try {
      setIsLoading(true);
      
      // Import existing auth service
      const { AuthService } =  await import('@/services');
      const { setToken } = await import('@/utils/token');
      
      // Call backend API using existing service
      const response = await AuthService.login({ username, password });
      
      // Map backend user to frontend User type
      const backendUser = response.data;
      const mappedUser: User = {
        id: backendUser._id,
        name: backendUser.name,
        email: backendUser.email || '',
        avatar: backendUser.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(backendUser.name)}`,
        permissions: [
          'chat.view',
          'chat.create',
          'messages.send',
          'groups.view',
          'settings.view_profile',
          'settings.edit_profile',
        ],
        role: backendUser.role,
      };

      // Store access token and user using existing utilities
      setToken(response.accessToken);
      localStorage.setItem('user', JSON.stringify(mappedUser));
      
      setUser(mappedUser);
      return { success: true };
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (payload: SignupPayload) => {
    try {
      setIsLoading(true);
      const { AuthService } = await import('@/services');
      const { setToken } = await import('@/utils/token');
      
      const response = await AuthService.signup(payload);
      
      // Map backend user to frontend User type
      const backendUser = response.data;
      const mappedUser: User = {
        id: backendUser._id,
        name: backendUser.name,
        email: backendUser.email || '',
        avatar: backendUser.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(backendUser.name)}`,
        permissions: [
          'chat.view',
          'chat.create',
          'messages.send',
          'groups.view',
          'settings.view_profile',
          'settings.edit_profile',
        ],
        role: backendUser.role,
      };

      // Store access token and user using existing utilities
      setToken(response.accessToken);
      localStorage.setItem('user', JSON.stringify(mappedUser));
      
      setUser(mappedUser);
      return { success: true };
    } catch (error) {
      console.error('Signup error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      // Clear auth data
      const { removeToken } = await import('@/utils/token');
      removeToken();
      localStorage.removeItem('user');
      
      setUser(null);
      
      // Also call backend logout if needed
      const { AuthService } = await import('@/services');
      try {
        await AuthService.logout();
      } catch (e) {
        // Ignore backend logout errors, just clear local state
      }
    } catch (error) {
      console.error('Logout failed:', error);
      throw error;
    }
  };

  const hasPermission = (permission: string): boolean => {
    if (!user) return false;
    return user.permissions.includes(permission);
  };

  const hasAnyPermission = (permissions: string[]): boolean => {
    if (!user) return false;
    return permissions.some(permission => user.permissions.includes(permission));
  };

  const hasAllPermissions = (permissions: string[]): boolean => {
    if (!user) return false;
    return permissions.every(permission => user.permissions.includes(permission));
  };

  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    signup,
    logout,
    hasPermission,
    hasAnyPermission,
    hasAllPermissions,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Custom hook to use auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
