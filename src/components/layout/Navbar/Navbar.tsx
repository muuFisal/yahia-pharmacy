import React, { useState, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { Link, useLocation } from 'react-router-dom';
import NavLinks from './NavLinks';
import ThemeSwitcher from './ThemeSwitcher';
import LanguageSwitcher from './LanguageSwitcher';
import { useBranding } from '../../../hooks/useBranding';
import { useLanguage } from '../../../hooks/useLanguage';

export const Navbar: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { brandName, settings } = useBranding();
  const { language } = useLanguage();
  const isArabic = language === 'ar';

  const logoSrc = settings?.logo || '/logo-icon.png';

  // Close mobile menu on route change
  useEffect(() => {
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
          <Link to="/" onClick={closeMobileMenu} title={brandName} className="flex items-center gap-2 max-w-[75%] min-w-0">
            <img
              src={logoSrc}
              alt={brandName}
              className="h-8 w-auto object-contain shrink-0"
              onError={(e) => {
                (e.target as HTMLImageElement).src = '/logo-icon.png';
              }}
            />
            <div className="flex flex-col text-start truncate">
              <span className="text-base font-black text-primary dark:text-primary-container font-primary truncate leading-tight">
                {brandName}
              </span>
              <span className="text-[10px] text-on-surface-variant font-medium leading-tight">
                {isArabic ? 'د/ يوسف يحيى' : 'Dr/ Youssif Yahia'}
              </span>
            </div>
          </Link>
          <button
            onClick={closeMobileMenu}
            className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-surface-container-high dark:hover:bg-surface-container transition-colors text-on-surface-variant active:scale-90"
            aria-label="Close Menu"
          >
            <span className="material-symbols-outlined text-[24px]">close</span>
          </button>
        </div>

        {/* Navigation Links */}
        <div className="px-3 py-3">
          <NavLinks
            className="flex-col items-stretch gap-0.5 w-full"
            onLinkClick={closeMobileMenu}
            isMobile
          />
        </div>

        {/* Mobile Actions Drawer Footer */}
        <div className="px-4 py-3 border-t border-outline-variant/10 flex items-center justify-between bg-surface-container-low dark:bg-slate-800/40">
          <span className="text-xs font-semibold text-on-surface-variant">
            {isArabic ? 'اللغة والمظهر:' : 'Language & Theme:'}
          </span>
          <div className="flex items-center gap-2">
            <LanguageSwitcher />
            <ThemeSwitcher />
          </div>
        </div>

        <div className="h-2" />
      </div>
    </div>,
    document.body
  );

  return (
    <>
      <header className="bg-surface/80 dark:bg-surface/85 backdrop-blur-xl docked full-width z-40 shadow-sm border-b border-outline-variant/10 transition-colors">
        <nav className="flex justify-between items-center w-full px-4 md:px-margin-desktop py-2.5 md:py-3 max-w-container-max mx-auto gap-2">
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

          {/* Brand Logo & Name */}
          <div className="flex items-center gap-2 shrink-0 min-w-0">
            <Link to="/" title={brandName} className="flex items-center gap-2 sm:gap-2.5 min-w-0 group">
              <img
                src={logoSrc}
                alt={brandName}
                className="h-8 sm:h-9 md:h-10 w-auto object-contain shrink-0 transition-transform duration-300 group-hover:scale-105"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = '/logo-icon.png';
                }}
              />
              <div className="flex flex-col text-start">
                <span className="text-base sm:text-lg md:text-xl font-black text-primary dark:text-primary-container whitespace-nowrap font-primary leading-tight">
                  {brandName}
                </span>
                <span className="text-[10px] sm:text-xs text-on-surface-variant font-medium leading-tight">
                  {isArabic ? 'د/ يوسف يحيى' : 'Dr/ Youssif Yahia'}
                </span>
              </div>
            </Link>
          </div>

          {/* Center: Navigation Links (Desktop) */}
          <div className="hidden lg:flex items-center gap-8 flex-1 justify-center">
            <NavLinks />
          </div>

          {/* End Actions */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            <LanguageSwitcher />
            <ThemeSwitcher />
          </div>
        </nav>
      </header>

      {mobileMenuPortal}
    </>
  );
};

export default Navbar;
