import { LoginForm } from '@/features/auth';

/**
 * LoginPage - Public login page
 * Wrapped in PublicRoute to prevent access when already authenticated
 */
export const LoginPage = () => {
  return <LoginForm />;
};
