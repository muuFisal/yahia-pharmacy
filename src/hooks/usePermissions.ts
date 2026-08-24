import { useCallback, useMemo } from 'react';
import { useDashboard } from '@/features/dashboard/context/DashboardContext';

/**
 * Hook for checking the current admin user's roles and permissions.
 *
 * Must be used inside a `<DashboardContext.Provider>`.
 *
 * @example
 * const { hasPermission, hasRole } = usePermissions();
 * if (hasPermission('dashboard.orders.view')) { ... }
 */
export const usePermissions = () => {
  const { userPermissions, userRoles } = useDashboard();

  /**
   * Check whether the current user has a specific permission.
   * Passing `null` always returns `true` (unrestricted page).
   */
  const hasPermission = useCallback((permission: string | null): boolean => {
    if (permission === null) return true;
    return userPermissions.includes(permission);
  }, [userPermissions]);

  /**
   * Check whether the current user has at least one of the given permissions.
   */
  const hasAnyPermission = useCallback((permissions: string[]): boolean => {
    return permissions.some((p) => userPermissions.includes(p));
  }, [userPermissions]);

  /**
   * Check whether the current user has a specific role.
   */
  const hasRole = useCallback((role: string): boolean => {
    return userRoles.includes(role);
  }, [userRoles]);

  return useMemo(() => ({
    hasPermission,
    hasAnyPermission,
    hasRole,
    userPermissions,
    userRoles,
  }), [hasPermission, hasAnyPermission, hasRole, userPermissions, userRoles]);
};
