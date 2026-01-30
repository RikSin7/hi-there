import { Navigate } from 'react-router-dom';
import { useAuth } from '@/features/auth';

interface PublicRouteProps {
  children: React.ReactNode;
}

/**
 * PublicRoute - Wrapper component for public routes (login, register, etc.)
 * 
 * Prevents authenticated users from accessing public auth pages.
 * Redirects already logged-in users to the dashboard/home.
 */
export const PublicRoute = ({ children }: PublicRouteProps) => {
  const { isAuthenticated, isLoading } = useAuth();

  // Show loading state while checking authentication
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-gray-400">Loading...</p>
        </div>
      </div>
    );
  }

  // Redirect to dashboard if already authenticated
  if (isAuthenticated) {
    return <Navigate to="/chats" replace />;
  }

  // User is not authenticated, show public content (login, register, etc.)
  return <>{children}</>;
};
