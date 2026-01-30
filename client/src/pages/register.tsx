import { RegisterForm } from '@/features/auth';

/**
 * RegisterPage - Public registration page
 * Wrapped in PublicRoute to prevent access when already authenticated
 */
export const RegisterPage = () => {
  return <RegisterForm />;
};
