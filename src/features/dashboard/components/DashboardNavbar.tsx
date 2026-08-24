import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useDashboard } from '../context/DashboardContext';
import ThemeSwitcher from '@/components/layout/Navbar/ThemeSwitcher';
import { DashboardAuthService } from '@/services/dashboard-auth.service';
import { useToast } from '@/hooks/useToast';
import LanguageSwitcher from '@/components/layout/Navbar/LanguageSwitcher';

export const DashboardNavbar: React.FC = () => {
  const { t } = useTranslation();
  const { isMobileOpen, setIsMobileOpen, adminProfile } = useDashboard();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await DashboardAuthService.logout();
      showToast(t('auth:logout.success', 'تم تسجيل الخروج بنجاح'), 'info');
      navigate('/admin/login', { replace: true });
    } catch (e) {
      console.error(e);
      navigate('/admin/login', { replace: true });
    }
  };

  return (
    <header className="h-16 bg-surface dark:bg-slate-900 border-b border-outline-variant/10 px-4 md:px-6 flex items-center justify-between shrink-0 transition-colors duration-300">
      {/* Start: Mobile Hamburger */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          className="lg:hidden w-10 h-10 rounded-xl hover:bg-surface-container-high dark:hover:bg-slate-800 flex items-center justify-center text-on-surface-variant"
          aria-label="Toggle Navigation Menu"
        >
          <span className="material-symbols-outlined text-[24px]">menu</span>
        </button>
        <span className="font-bold text-on-surface text-sm sm:text-base hidden sm:inline">
          {t('dashboard:title', 'لوحة الإدارة')}
        </span>
      </div>

      {/* End: Language, Theme, User profile & Logout */}
      <div className="flex items-center gap-2 sm:gap-3">
        <LanguageSwitcher />
        <ThemeSwitcher />

        <div className="h-6 w-[1px] bg-outline-variant/20 mx-1" />

        {/* Admin Profile Info */}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full overflow-hidden border border-primary/20 shrink-0">
            <img
              src={adminProfile?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'}
              alt={adminProfile?.nameAr}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="hidden md:flex flex-col text-right rtl:text-right ltr:text-left">
            <span className="text-xs font-bold text-on-surface leading-tight">
              {adminProfile?.nameAr || 'Admin'}
            </span>
            <span className="text-[10px] text-on-surface-variant leading-none">
              {adminProfile?.roleAr || 'Administrator'}
            </span>
          </div>
        </div>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="w-9 h-9 rounded-xl text-error hover:bg-error/10 flex items-center justify-center transition-colors"
          title={t('auth:logout.submit', 'تسجيل الخروج')}
        >
          <span className="material-symbols-outlined text-[20px]">logout</span>
        </button>
      </div>
    </header>
  );
};

export default DashboardNavbar;
