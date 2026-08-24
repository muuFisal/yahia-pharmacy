import React from 'react';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { cn } from '../../../lib/cn';

interface NavLinksProps {
  className?: string;
  onLinkClick?: () => void;
  isMobile?: boolean;
}

export const NavLinks: React.FC<NavLinksProps> = ({ className, onLinkClick, isMobile }) => {
  const { t } = useTranslation();

  const links = [
    { to: '/', label: t('nav.home'), icon: 'home' },
    { to: '/about', label: t('nav.about'), icon: 'info' },
    { to: '/contact', label: t('nav.contact'), icon: 'mail' },
  ];

  return (
    <div className={cn('flex items-center gap-8', className)}>
      {links.map((link) => (
        <NavLink
          key={link.to}
          to={link.to}
          end={link.to === '/'}
          onClick={onLinkClick}
          className={({ isActive }) =>
            isMobile
              ? cn(
                  'flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200',
                  isActive
                    ? 'bg-primary/10 text-primary font-bold dark:bg-primary/15'
                    : 'text-on-surface-variant hover:bg-surface-container-high dark:hover:bg-surface-container hover:text-on-surface'
                )
              : cn(
                  'font-body-md text-body-md transition-colors pb-1 border-b-2 border-transparent hover:text-primary',
                  isActive
                    ? 'text-primary font-bold border-primary'
                    : 'text-on-surface-variant'
                )
          }
        >
          {isMobile && (
            <span
              className="material-symbols-outlined text-[20px]"
              style={{ fontVariationSettings: "'FILL' 0" }}
            >
              {link.icon}
            </span>
          )}
          {link.label}
        </NavLink>
      ))}
    </div>
  );
};
export default NavLinks;
