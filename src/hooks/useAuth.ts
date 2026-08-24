import { useContext } from 'react';
import { AuthContext, type AuthContextType } from '@/app/context';

/**
 * Hook to access auth state and actions.
 *
 * @example
 * ```tsx
 * const { user, isAuthenticated, login, logout } = useAuth();
 * ```
 */
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

