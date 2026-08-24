import React from 'react';
import { Navigate } from 'react-router-dom';
import { usePermissions } from '../../../hooks/usePermissions';

interface RequirePermissionProps {
  children?: React.ReactNode;
  permission: string | string[] | null;
}

export const RequirePermission: React.FC<RequirePermissionProps> = ({ children, permission }) => {
  const { hasPermission, hasAnyPermission } = usePermissions();

  const isAllowed = (() => {
    if (permission === null) return true;
    if (Array.isArray(permission)) {
      return hasAnyPermission(permission);
    }
    return hasPermission(permission);
  })();

  if (!isAllowed) {
    // Redirect to 403 Forbidden page within the dashboard
    return <Navigate to="/admin/dashboard/forbidden" replace />;
  }

  return <>{children}</>;
};

export default RequirePermission;
