import { Navigate } from 'react-router-dom';
import { useAuth } from '@/features/auth';

interface PermissionGuardProps {
  children: React.ReactNode;
  requiredPermissions?: string[];
  requireAll?: boolean; // If true, user must have ALL permissions. If false, ANY permission is sufficient
  fallbackPath?: string; // Where to redirect if permission check fails
  showForbidden?: boolean; // If true, shows a 403 page instead of redirecting
}

/**
 * PermissionGuard - Granular permission-based route protection
 * 
 * Checks if the authenticated user has the required permissions.
 * More specific than ProtectedRoute - used for role/permission-based access control.
 * 
 * @example
 * <PermissionGuard requiredPermissions={[PERMISSIONS.admin.viewDashboard]}>
 *   <AdminDashboard />
 * </PermissionGuard>
 */
export const PermissionGuard = ({
  children,
  requiredPermissions = [],
  requireAll = false,
  fallbackPath = '/chats',
  showForbidden = false,
}: PermissionGuardProps) => {
  const { isAuthenticated, isLoading, hasAnyPermission, hasAllPermissions } = useAuth();

  // Show loading state
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-gray-400">Checking permissions...</p>
        </div>
      </div>
    );
  }

  // Not authenticated - redirect to login
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // No specific permissions required - just needs to be authenticated
  if (requiredPermissions.length === 0) {
    return <>{children}</>;
  }

  // Check permissions
  const hasPermission = requireAll
    ? hasAllPermissions(requiredPermissions)
    : hasAnyPermission(requiredPermissions);

  // User doesn't have required permissions
  if (!hasPermission) {
    if (showForbidden) {
      return (
        <div className="flex items-center justify-center min-h-screen bg-gray-900">
          <div className="max-w-md p-8 bg-gray-800 rounded-lg shadow-xl text-center">
            <div className="mb-4">
              <svg
                className="w-20 h-20 mx-auto text-red-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">403</h1>
            <h2 className="text-xl font-semibold text-gray-300 mb-4">Access Forbidden</h2>
            <p className="text-gray-400 mb-6">
              You don't have permission to access this resource.
            </p>
            <button
              onClick={() => window.history.back()}
              className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
            >
              Go Back
            </button>
          </div>
        </div>
      );
    }

    // Redirect to fallback path
    return <Navigate to={fallbackPath} replace />;
  }

  // User has required permissions
  return <>{children}</>;
};
