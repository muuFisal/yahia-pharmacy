import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useDashboard } from '../context/DashboardContext';
import { useBranding } from '@/hooks/useBranding';
import { cn } from '@/lib/cn';

export const DashboardSidebar: React.FC = () => {
  const { t } = useTranslation();
  const { isCollapsed, setIsCollapsed, isMobileOpen, setIsMobileOpen } = useDashboard();
  const { brandName, settings } = useBranding();

  const navItems = [
    {
      to: '/admin/dashboard',
      label: t('dashboard:nav.overview', 'نظرة عامة'),
      icon: 'dashboard',
      end: true,
    },
  ];

  const sidebarContent = (
    <div className="flex flex-col h-full bg-surface dark:bg-slate-900 border-e border-outline-variant/10 transition-colors duration-300">
      {/* Brand Header */}
      <div className="h-16 flex items-center justify-between px-4 border-b border-outline-variant/10">
        <Link to="/admin/dashboard" className="flex items-center gap-2 min-w-0">
          {settings?.logo ? (
            <img src={settings.logo} alt={brandName} className="h-8 w-auto object-contain shrink-0" />
          ) : (
            <div className="w-8 h-8 rounded-xl bg-primary text-white flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-[18px]">deployed_code</span>
            </div>
          )}
          {!isCollapsed && (
            <span className="font-bold text-on-surface truncate text-base">
              {brandName}
            </span>
          )}
        </Link>
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="hidden lg:flex w-8 h-8 rounded-lg hover:bg-surface-container-high dark:hover:bg-slate-800 items-center justify-center text-on-surface-variant transition-colors"
          title={isCollapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
        >
          <span className="material-symbols-outlined text-[20px]">
            {isCollapsed ? 'menu_open' : 'menu'}
          </span>
        </button>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 overflow-y-auto p-3 space-y-1">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.end}
            onClick={() => setIsMobileOpen(false)}
            className={({ isActive }) =>
              cn(
                'flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200',
                isActive
                  ? 'bg-primary text-white shadow-md shadow-primary/25'
                  : 'text-on-surface-variant hover:bg-surface-container-high dark:hover:bg-slate-800 hover:text-on-surface'
              )
            }
            title={isCollapsed ? item.label : undefined}
          >
            <span className="material-symbols-outlined text-[20px] shrink-0">
              {item.icon}
            </span>
            {!isCollapsed && <span className="truncate">{item.label}</span>}
          </NavLink>
        ))}
      </nav>

      {/* Back to Website Link */}
      <div className="p-3 border-t border-outline-variant/10">
        <Link
          to="/"
          className="flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-medium text-on-surface-variant hover:bg-surface-container-high dark:hover:bg-slate-800 hover:text-primary transition-colors"
        >
          <span className="material-symbols-outlined text-[18px]">storefront</span>
          {!isCollapsed && <span>{t('dashboard:nav.viewSite', 'زيارة الموقع العام')}</span>}
        </Link>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside
        className={cn(
          'hidden lg:block h-screen transition-all duration-300 z-30 shrink-0',
          isCollapsed ? 'w-16' : 'w-64'
        )}
      >
        {sidebarContent}
      </aside>

      {/* Mobile Drawer */}
      {isMobileOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setIsMobileOpen(false)}
          />
          <div className="relative w-64 max-w-[80vw] h-full shadow-2xl z-10 animate-slide-in">
            {sidebarContent}
          </div>
        </div>
      )}
    </>
  );
};

export default DashboardSidebar;
