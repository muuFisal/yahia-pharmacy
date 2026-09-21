import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import DashboardSidebar from '@/features/dashboard/components/DashboardSidebar';
import DashboardNavbar from '@/features/dashboard/components/DashboardNavbar';
import { type AdminProfile, DashboardContext } from '@/features/dashboard/context/DashboardContext';
import { DashboardAuthService } from '@/services/dashboard-auth.service';
import { secureStorage } from '@/utils/secureStorage';
import RouteTranslationBoundary from '@/components/layout/RouteTranslationBoundary';

export const DashboardLayout: React.FC = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const mainRef = useRef<HTMLDivElement>(null);
  const prevPathRef = useRef(pathname);

  const [authorized] = useState(() => DashboardAuthService.isAuthenticated());

  // Permissions & Roles — initialized from cached user, refreshed by getMe()
  const storedUser = DashboardAuthService.getStoredUser();
  const [userPermissions, setUserPermissions] = useState<string[]>(
    () => storedUser?.permissions ?? [],
  );
  const [userRoles, setUserRoles] = useState<string[]>(
    () => storedUser?.roles ?? [],
  );

  // Shared Layout States
  const [isCollapsed, setIsCollapsed] = useState(() => {
    return localStorage.getItem('adminSidebarCollapsed') === 'true';
  });
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  // Admin Profile State synced with LocalStorage and cached API User
  const [adminProfile, setAdminProfile] = useState<AdminProfile>(() => {
    const saved = secureStorage.getItem<AdminProfile>('adminProfile');
    if (saved) {
      return saved;
    }
    const apiUser = DashboardAuthService.getStoredUser();
    if (apiUser) {
      const primaryRole = apiUser.roles[0] || 'admin';
      const roleMap: Record<string, { ar: string; en: string }> = {
        admin: { ar: 'مدير النظام', en: 'System Admin' },
        manager: { ar: 'مدير الصيدلية', en: 'Pharmacy Manager' },
        pharmacist: { ar: 'صيدلي', en: 'Pharmacist' },
        staff: { ar: 'موظف', en: 'Staff' },
        tenant_owner: { ar: 'مدير النظام', en: 'System Admin' },
        tenant_manager: { ar: 'مدير الصيدلية', en: 'Pharmacy Manager' },
      };
      const resolvedRole = roleMap[primaryRole] || { ar: primaryRole, en: primaryRole };

      return {
        nameAr: apiUser.name,
        nameEn: apiUser.name,
        roleAr: resolvedRole.ar,
        roleEn: resolvedRole.en,
        avatar: apiUser.image || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        email: apiUser.email,
        phone: apiUser.phone || '',
      };
    }
    return {
      nameAr: 'أحمد السعدني',
      nameEn: 'Ahmed El-Saadani',
      roleAr: 'مدير النظام',
      roleEn: 'System Admin',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      email: 'admin@example.com',
      phone: '01012345678'
    };
  });

  const refreshPermissions = useCallback(async () => {
    const freshUser = await DashboardAuthService.getMe();
    const primaryRole = freshUser.roles[0] || 'admin';
    const roleMap: Record<string, { ar: string; en: string }> = {
      admin: { ar: 'مدير النظام', en: 'System Admin' },
      manager: { ar: 'مدير الصيدلية', en: 'Pharmacy Manager' },
      pharmacist: { ar: 'صيدلي', en: 'Pharmacist' },
      staff: { ar: 'موظف', en: 'Staff' },
      tenant_owner: { ar: 'مدير النظام', en: 'System Admin' },
      tenant_manager: { ar: 'مدير الصيدلية', en: 'Pharmacy Manager' },
    };
    const resolvedRole = roleMap[primaryRole] || { ar: primaryRole, en: primaryRole };

    setAdminProfile({
      nameAr: freshUser.name,
      nameEn: freshUser.name,
      roleAr: resolvedRole.ar,
      roleEn: resolvedRole.en,
      avatar: freshUser.image || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      email: freshUser.email,
      phone: freshUser.phone || '',
    });

    setUserPermissions(freshUser.permissions ?? []);
    setUserRoles(freshUser.roles ?? []);
  }, []);

  useEffect(() => {
    if (!DashboardAuthService.isAuthenticated()) {
      navigate('/admin/login', { replace: true });
    } else {
      const fetchProfile = async () => {
        try {
          await refreshPermissions();
        } catch (err) {
          console.error('[DashboardLayout] Failed to load fresh admin profile', err);
        }
      };
      fetchProfile();
    }
  }, [navigate, refreshPermissions]);

  useEffect(() => {
    localStorage.setItem('adminSidebarCollapsed', String(isCollapsed));
  }, [isCollapsed]);

  useEffect(() => {
    secureStorage.setItem('adminProfile', adminProfile);
  }, [adminProfile]);

  useEffect(() => {
    if (mainRef.current) {
      mainRef.current.scrollTop = 0;
    }
    if (prevPathRef.current !== pathname) {
      prevPathRef.current = pathname;
      setIsMobileOpen(false); // Close mobile drawer when path changes
    }
  }, [pathname]);

  if (!authorized) {
    return (
      <div className="h-screen w-screen flex items-center justify-center bg-background">
        <div className="w-10 h-10 border-[3px] border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <DashboardContext.Provider
      value={{
        isCollapsed,
        setIsCollapsed,
        isMobileOpen,
        setIsMobileOpen,
        adminProfile,
        setAdminProfile,
        userPermissions,
        userRoles,
        refreshPermissions,
      }}
    >
      <div className="flex h-screen w-screen overflow-hidden bg-background transition-colors duration-300">
        {/* Sidebar Layout */}
        <DashboardSidebar />

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Navbar */}
          <DashboardNavbar />

          {/* Content Body */}
          <main
            ref={mainRef}
            className="flex-grow overflow-y-auto p-8 bg-surface-container-low dark:bg-slate-950/30 transition-colors duration-300"
          >
            <RouteTranslationBoundary>
              <Outlet />
            </RouteTranslationBoundary>
          </main>
        </div>
      </div>
    </DashboardContext.Provider>
  );
};

export default DashboardLayout;
