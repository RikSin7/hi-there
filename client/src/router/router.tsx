import { createBrowserRouter, Navigate } from 'react-router-dom';
import { lazy, Suspense, type ReactNode } from 'react';

// Import route wrappers
import { ProtectedRoute, PublicRoute, PermissionGuard } from '@/components/auth';
import { AuthLayout, ChatLayout } from '@/components/layouts';
import { PERMISSIONS } from '@/config/permissions';

// ============================================================================
// LAZY LOADED PAGES
// ============================================================================
// All pages are lazy loaded for optimal performance
const LoginPage = lazy(() =>
  import('@/pages').then((module) => ({ default: module.LoginPage }))
);

const RegisterPage = lazy(() =>
  import('@/pages').then((module) => ({ default: module.RegisterPage }))
);

const ChatsPage = lazy(() =>
  import('@/pages').then((module) => ({ default: module.ChatsPage }))
);

const GroupsPage = lazy(() =>
  import('@/pages').then((module) => ({ default: module.GroupsPage }))
);

const SettingsPage = lazy(() =>
  import('@/pages').then((module) => ({ default: module.SettingsPage }))
);

const NotFoundPage = lazy(() =>
  import('@/pages').then((module) => ({ default: module.NotFoundPage }))
);

// ============================================================================
// LOADING FALLBACK COMPONENT
// ============================================================================
const LoadingFallback = () => (
  <div className="flex items-center justify-center min-h-screen bg-gray-900">
    <div className="flex flex-col items-center space-y-4">
      <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      <p className="text-gray-400">Loading...</p>
    </div>
  </div>
);

// ============================================================================
// SUSPENSE WRAPPER
// ============================================================================
// Wraps lazy-loaded components in Suspense boundary
const SuspenseWrapper = ({ children }: { children: ReactNode }) => (
  <Suspense fallback={<LoadingFallback />}>{children}</Suspense>
);

// ============================================================================
// ROUTER CONFIGURATION
// ============================================================================
export const router = createBrowserRouter([
  // ========================================================================
  // ROOT REDIRECT
  // ========================================================================
  {
    path: '/',
    element: <Navigate to="/chats" replace />,
  },

  // ========================================================================
  // PUBLIC ROUTES (Auth Layout)
  // ========================================================================
  {
    element: (
      <PublicRoute>
        <AuthLayout />
      </PublicRoute>
    ),
    children: [
      {
        path: '/login',
        element: (
          <SuspenseWrapper>
            <LoginPage />
          </SuspenseWrapper>
        ),
      },
      {
        path: '/register',
        element: <SuspenseWrapper><RegisterPage /></SuspenseWrapper>,
      },
      // {
      //   path: '/forgot-password',
      //   element: <SuspenseWrapper><ForgotPasswordPage /></SuspenseWrapper>,
      // },
    ],
  },

  // ========================================================================
  // PROTECTED ROUTES (Chat Layout)
  // ========================================================================
  {
    element: (
      <ProtectedRoute>
        <ChatLayout />
      </ProtectedRoute>
    ),
    children: [
      // ----------------------------------------------------------------------
      // Chats - Main messaging interface
      // ----------------------------------------------------------------------
      {
        path: '/chats',
        element: (
          <SuspenseWrapper>
            <PermissionGuard requiredPermissions={[PERMISSIONS.chat.view]}>
              <ChatsPage />
            </PermissionGuard>
          </SuspenseWrapper>
        ),
      },

      // ----------------------------------------------------------------------
      // Groups - Requires groups.view permission
      // ----------------------------------------------------------------------
      {
        path: '/groups',
        element: (
          <SuspenseWrapper>
            <PermissionGuard requiredPermissions={[PERMISSIONS.groups.view]}>
              <GroupsPage />
            </PermissionGuard>
          </SuspenseWrapper>
        ),
      },

      // ----------------------------------------------------------------------
      // Settings - Requires settings.viewProfile permission
      // ----------------------------------------------------------------------
      {
        path: '/settings',
        element: (
          <SuspenseWrapper>
            <PermissionGuard requiredPermissions={[PERMISSIONS.settings.viewProfile]}>
              <SettingsPage />
            </PermissionGuard>
          </SuspenseWrapper>
        ),
      },

      // ----------------------------------------------------------------------
      // Example: Admin Route (Multiple permissions - ANY)
      // ----------------------------------------------------------------------
      // {
      //   path: '/admin',
      //   element: (
      //     <SuspenseWrapper>
      //       <PermissionGuard
      //         requiredPermissions={[
      //           PERMISSIONS.admin.viewDashboard,
      //           PERMISSIONS.admin.manageUsers,
      //         ]}
      //         requireAll={false} // User needs ANY of these permissions
      //       >
      //         <AdminPage />
      //       </PermissionGuard>
      //     </SuspenseWrapper>
      //   ),
      // },

      // ----------------------------------------------------------------------
      // Example: Super Admin Route (Multiple permissions - ALL)
      // ----------------------------------------------------------------------
      // {
      //   path: '/super-admin',
      //   element: (
      //     <SuspenseWrapper>
      //       <PermissionGuard
      //         requiredPermissions={[
      //           PERMISSIONS.admin.viewDashboard,
      //           PERMISSIONS.admin.manageUsers,
      //           PERMISSIONS.admin.systemSettings,
      //         ]}
      //         requireAll={true} // User needs ALL of these permissions
      //         showForbidden={true} // Show 403 page instead of redirecting
      //       >
      //         <SuperAdminPage />
      //       </PermissionGuard>
      //     </SuspenseWrapper>
      //   ),
      // },
    ],
  },

  // ========================================================================
  // 404 NOT FOUND (Catch all)
  // ========================================================================
  {
    path: '*',
    element: (
      <SuspenseWrapper>
        <NotFoundPage />
      </SuspenseWrapper>
    ),
  },
]);

export default router;
