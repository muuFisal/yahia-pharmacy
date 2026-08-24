import React from 'react';
import { Navigate } from 'react-router-dom';
import { DashboardAuthService } from '../../../services/dashboard-auth.service';

interface RequireGuestProps {
  children?: React.ReactNode;
}

export const RequireGuest: React.FC<RequireGuestProps> = ({ children }) => {
  const isAuthenticated = DashboardAuthService.isAuthenticated();

  if (isAuthenticated) {
    return <Navigate to="/admin/dashboard" replace />;
  }

  return <>{children}</>;
};

export default RequireGuest;
