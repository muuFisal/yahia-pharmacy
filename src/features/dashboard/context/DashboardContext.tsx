import React, { createContext, useContext } from 'react';

export interface AdminProfile {
  nameAr: string;
  nameEn: string;
  roleAr: string;
  roleEn: string;
  avatar: string;
  email: string;
  phone: string;
}

export interface DashboardContextType {
  isCollapsed: boolean;
  setIsCollapsed: (v: boolean) => void;
  isMobileOpen: boolean;
  setIsMobileOpen: (v: boolean) => void;
  adminProfile: AdminProfile;
  setAdminProfile: React.Dispatch<React.SetStateAction<AdminProfile>>;
  /** Permission strings from the backend (e.g. "dashboard.orders.view") */
  userPermissions: string[];
  /** Role strings from the backend (e.g. "tenant_owner") */
  userRoles: string[];
  /** Function to fetch and reload fresh user permissions and profile from backend */
  refreshPermissions: () => Promise<void>;
}

export const DashboardContext = createContext<DashboardContextType | undefined>(undefined);

export const useDashboard = () => {
  const context = useContext(DashboardContext);
  if (!context) {
    throw new Error('useDashboard must be used within DashboardProvider');
  }
  return context;
};
