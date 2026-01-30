import { lazy, Suspense } from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';
import { ROUTES } from './routes.constants';

// Layouts (not lazy loaded - needed immediately)
import App from '../App';
import AppLayout from '../layouts/AppLayout';
import AuthLayout from '../layouts/AuthLayout';

// Guards
import PublicRoute from './PublicRoute';
import ProtectedRoute from './ProtectedRoute';

// Lazy-loaded pages
const Login = lazy(() => import('../pages/auth/Login'));
const Signup = lazy(() => import('../pages/auth/Signup'));
const Home = lazy(() => import('../pages/home/Home'));
const Chat = lazy(() => import('../pages/chat/Chat'));
const NotFound = lazy(() => import('../pages/system/NotFound'));

// Loading fallback component
const PageLoader = () => (
  <div className="flex items-center justify-center min-h-screen bg-black">
    <div className="flex flex-col items-center gap-4">
      <div className="w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin" />
      <p className="text-white text-sm">Loading...</p>
    </div>
  </div>
);

// Wrapper for lazy-loaded components
const LazyWrapper = ({ children }: { children: React.ReactNode }) => (
  <Suspense fallback={<PageLoader />}>{children}</Suspense>
);

/**
 * Router Configuration
 * Uses object-based routing with lazy loading
 */
export const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      // Root redirect
      {
        path: ROUTES.ROOT,
        element: <Navigate to={ROUTES.SIGNIN} replace />,
      },

      // 🔓 Public Routes (redirect to home if authenticated)
      {
        element: <PublicRoute />,
        children: [
          {
            element: <AuthLayout />,
            children: [
              {
                path: ROUTES.SIGNIN,
                element: (
                  <LazyWrapper>
                    <Login />
                  </LazyWrapper>
                ),
              },
              {
                path: ROUTES.SIGNUP,
                element: (
                  <LazyWrapper>
                    <Signup />
                  </LazyWrapper>
                ),
              },
            ],
          },
        ],
      },

      // 🔐 Protected Routes (require authentication)
      {
        element: <ProtectedRoute />,
        children: [
          {
            element: <AppLayout />,
            children: [
              {
                path: ROUTES.HOME,
                element: (
                  <LazyWrapper>
                    <Home />
                  </LazyWrapper>
                ),
              },
              {
                path: ROUTES.CHAT,
                element: (
                  <LazyWrapper>
                    <Chat />
                  </LazyWrapper>
                ),
              },
            ],
          },
        ],
      },

      // 404 Not Found
      {
        path: ROUTES.NOT_FOUND,
        element: (
          <LazyWrapper>
            <NotFound />
          </LazyWrapper>
        ),
      },
    ],
  },
]);
