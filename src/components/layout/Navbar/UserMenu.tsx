import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../../hooks/useAuth';

export const UserMenu: React.FC = () => {
  const { t } = useTranslation();
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = async () => {
    setIsOpen(false);
    try {
      await logout();
      navigate('/');
    } catch (e) {
      console.error('Logout failed:', e);
    }
  };

  if (!user) return null;

  const defaultAvatar = user.gender === 'female'
    ? 'https://avatar.iran.liara.run/public/girl'
    : 'https://avatar.iran.liara.run/public/boy';
  const avatarSrc = user.image || defaultAvatar;

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-2 py-1 rounded-full hover:bg-surface-container-high dark:hover:bg-surface-container transition-all active:scale-95 cursor-pointer text-right ltr:text-left select-none group"
        aria-label="User profile menu"
      >
        <div className="w-9 h-9 rounded-full border-2 border-primary/20 overflow-hidden shrink-0">
          <img
            alt="Student Avatar"
            className="w-full h-full object-cover"
            src={avatarSrc}
          />
        </div>
        <div className="hidden sm:flex flex-col text-right rtl:text-right ltr:text-left justify-center">
          <span className="text-xs font-semibold text-on-surface leading-tight">
            {user.name}
          </span>
          <span className="text-[10px] text-on-surface-variant leading-none font-medium">
            {t('student')}
          </span>
        </div>
        <span className={`material-symbols-outlined text-[18px] text-on-surface-variant transition-transform duration-300 ${isOpen ? 'rotate-180' : 'group-hover:translate-y-0.5'}`}>
          expand_more
        </span>
      </button>

      {isOpen && (
        <div className="absolute ltr:right-0 rtl:left-0 mt-3 w-56 glass-card rounded-2xl py-2 shadow-2xl z-50 animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="px-4 py-3 border-b border-outline-variant/30 flex items-center gap-3">
            <div className="w-10 h-10 rounded-full overflow-hidden shrink-0">
              <img
                alt="Student Avatar"
                className="w-full h-full object-cover"
                src={avatarSrc}
              />
            </div>
            <div className="overflow-hidden">
              <h4 className="font-label-md text-on-surface truncate">{user.name}</h4>
              <p className="text-[11px] text-on-surface-variant truncate">{user.email || user.phone}</p>
            </div>
          </div>

          <div className="p-1.5 flex flex-col gap-0.5">
            <Link
              to="/profile"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-3 px-3 py-2 rounded-xl text-body-md hover:bg-surface-container-high hover:text-primary transition-colors"
            >
              <span className="material-symbols-outlined text-[20px]">person</span>
              <span>{t('nav.profile')}</span>
            </Link>

            <Link
              to="/orders"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-3 px-3 py-2 rounded-xl text-body-md hover:bg-surface-container-high hover:text-primary transition-colors"
            >
              <span className="material-symbols-outlined text-[20px]">inventory_2</span>
              <span>{t('nav.orders')}</span>
            </Link>

            <Link
              to="/purchased-codes"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-3 px-3 py-2 rounded-xl text-body-md hover:bg-surface-container-high hover:text-primary transition-colors"
            >
              <span className="material-symbols-outlined text-[20px]">qr_code_2</span>
              <span>{t('nav.myCodes')}</span>
            </Link>
          </div>

          <div className="border-t border-outline-variant/30 p-1.5 mt-1.5">
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-body-md text-error hover:bg-error/10 transition-colors text-right rtl:text-right"
            >
              <span className="material-symbols-outlined text-[20px]">logout</span>
              <span>{t('logout')}</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
export default UserMenu;
