import React, { useState, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import NavLinks from './NavLinks';
import ThemeSwitcher from './ThemeSwitcher';
import LanguageSwitcher from './LanguageSwitcher';
import UserMenu from './UserMenu';
import { useBranding } from '../../../hooks/useBranding';
import { useAuth } from '../../../hooks/useAuth';

export const Navbar: React.FC = () => {
  const { t } = useTranslation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { brandName, settings } = useBranding();
  const { user, isAuthenticated } = useAuth();

  // Close mobile menu on route change
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const closeMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(false);
  }, []);

  // Mobile menu portal content
  const mobileMenuPortal = createPortal(
    <div
      className={`lg:hidden fixed inset-0 z-[9999] transition-opacity duration-300 ${
        isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
      }`}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40 dark:bg-black/60 backdrop-blur-sm"
        onClick={closeMobileMenu}
        onTouchMove={(e) => e.preventDefault()}
      />

      {/* Slide-down panel */}
      <div
        className={`absolute top-0 left-0 right-0 bg-surface dark:bg-slate-900 shadow-2xl transition-transform duration-300 ease-out max-h-[85vh] overflow-y-auto overscroll-contain ${
          isMobileMenuOpen ? 'translate-y-0' : '-translate-y-full'
        }`}
      >
        {/* Top bar inside drawer */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-outline-variant/10">
          <Link to="/" onClick={closeMobileMenu} title={brandName} className="flex items-center gap-1.5 max-w-[75%] min-w-0">
            {settings?.logo && (
              <img src={settings.logo} alt={brandName} className="h-7 w-auto object-contain shrink-0" />
            )}
            <span className="text-lg font-bold text-primary dark:text-primary-container font-primary truncate">
              {brandName}
            </span>
            {!settings?.logo && (
              <div className="w-7 h-7 bg-primary rounded-lg flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-white text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                  deployed_code
                </span>
              </div>
            )}
          </Link>
          <button
            onClick={closeMobileMenu}
            className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-surface-container-high dark:hover:bg-surface-container transition-colors text-on-surface-variant active:scale-90"
            aria-label="Close Menu"
          >
            <span className="material-symbols-outlined text-[24px]">close</span>
          </button>
        </div>

        {/* User info section (if logged in) */}
        {isAuthenticated && user && (
          <div className="px-5 py-4 border-b border-outline-variant/10 bg-surface-container-low/50 dark:bg-slate-800/30">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-full border-2 border-primary/20 overflow-hidden shrink-0 shadow-sm">
                <img
                  alt="User Avatar"
                  className="w-full h-full object-cover"
                  src={user.image || 'https://avatar.iran.liara.run/public/boy'}
                />
              </div>
              <div className="min-w-0">
                <p className="font-semibold text-on-surface text-sm truncate">
                  {user.name}
                </p>
                <p className="text-xs text-on-surface-variant truncate">{user.email || user.phone}</p>
              </div>
            </div>
          </div>
        )}

        {/* Navigation Links */}
        <div className="px-3 py-3">
          <NavLinks
            className="flex-col items-stretch gap-0.5 w-full"
            onLinkClick={closeMobileMenu}
            isMobile
          />
        </div>

        {/* Auth buttons (if not logged in) */}
        {!isAuthenticated && (
          <>
            <div className="mx-5 border-t border-outline-variant/10" />
            <div className="px-5 py-4">
              <div className="flex gap-3">
                <Link
                  to="/login"
                  onClick={closeMobileMenu}
                  className="flex-1 py-2.5 rounded-xl border-2 border-primary text-primary text-sm font-bold text-center hover:bg-primary hover:text-white transition-all duration-200 active:scale-[0.98]"
                >
                  {t('auth:login.submit')}
                </Link>
                <Link
                  to="/register"
                  onClick={closeMobileMenu}
                  className="flex-1 py-2.5 rounded-xl bg-primary text-white text-sm font-bold text-center hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/20 transition-all duration-200 active:scale-[0.98]"
                >
                  {t('auth:register.submit')}
                </Link>
              </div>
            </div>
          </>
        )}

        <div className="h-4" />
      </div>
    </div>,
    document.body
  );

  return (
    <>
      <header className="bg-surface/80 dark:bg-surface/85 backdrop-blur-xl docked full-width z-40 shadow-sm border-b border-outline-variant/10 transition-colors">
        <nav className="flex justify-between items-center w-full px-4 md:px-margin-desktop py-3 md:py-4 max-w-container-max mx-auto gap-2">
          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="w-10 h-10 flex lg:hidden items-center justify-center rounded-full hover:bg-surface-container-high dark:hover:bg-surface-container transition-colors text-on-surface-variant active:scale-90 shrink-0 order-first"
            aria-label="Toggle Mobile Menu"
          >
            <span className="material-symbols-outlined text-[24px] transition-transform duration-200">
              {isMobileMenuOpen ? 'close' : 'menu'}
            </span>
          </button>

          {/* Brand Logo */}
          <div className="flex items-center gap-2 shrink-0 min-w-0">
            <Link to="/" title={brandName} className="flex items-center gap-1.5 sm:gap-2 min-w-0">
              {settings?.logo && (
                <img src={settings.logo} alt={brandName} className="h-8 sm:h-9 w-auto object-contain shrink-0" />
              )}
              <span className={`text-lg sm:text-xl md:text-2xl font-bold text-primary dark:text-primary-container whitespace-nowrap font-primary ${settings?.logo ? 'hidden sm:inline' : 'truncate'}`}>
                {brandName}
              </span>
              {!settings?.logo && (
                <div className="w-7 h-7 sm:w-8 sm:h-8 bg-primary rounded-lg flex items-center justify-center shadow-md shadow-primary/20 shrink-0">
                  <span className="material-symbols-outlined text-white text-[18px] sm:text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                    deployed_code
                  </span>
                </div>
              )}
            </Link>
          </div>

          {/* Center: Navigation Links (Desktop) */}
          <div className="hidden lg:flex items-center gap-8 flex-1 justify-center">
            <NavLinks />
          </div>

          {/* End Actions */}
          <div className="flex items-center gap-1 sm:gap-2">
            <LanguageSwitcher />
            <ThemeSwitcher />

            {isAuthenticated ? (
              <UserMenu />
            ) : (
              <div className="hidden sm:flex items-center gap-2">
                <Link
                  to="/login"
                  className="px-3 sm:px-4 py-1.5 rounded-full border border-primary text-primary text-xs sm:text-sm font-semibold hover:bg-primary hover:text-white transition-all duration-200 active:scale-95 cursor-pointer whitespace-nowrap"
                >
                  {t('auth:login.submit')}
                </Link>
                <Link
                  to="/register"
                  className="px-3 sm:px-4 py-1.5 rounded-full bg-primary text-white text-xs sm:text-sm font-semibold hover:bg-primary/95 hover:shadow-lg hover:shadow-primary/20 transition-all duration-200 active:scale-95 cursor-pointer whitespace-nowrap"
                >
                  {t('auth:register.submit')}
                </Link>
              </div>
            )}
          </div>
        </nav>
      </header>

      {mobileMenuPortal}
    </>
  );
};
export default Navbar;
