import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../../hooks/useLanguage';
import { cn } from '../../../lib/cn';

export interface BreadcrumbItem {
  label: string;
  path?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
}

export const Breadcrumb: React.FC<BreadcrumbProps> = ({ items, className }) => {
  const { dir } = useLanguage();
  const chevron = dir === 'rtl' ? 'chevron_left' : 'chevron_right';

  return (
    <nav
      aria-label="Breadcrumb"
      className={cn(
        'flex items-center gap-2 text-on-surface-variant overflow-x-auto no-scrollbar whitespace-nowrap py-2',
        className
      )}
    >
      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        return (
          <React.Fragment key={index}>
            {index > 0 && (
              <span className="material-symbols-outlined text-sm shrink-0">
                {chevron}
              </span>
            )}
            {isLast || !item.path ? (
              <span className="font-label-md text-label-md text-primary font-bold">
                {item.label}
              </span>
            ) : (
              <Link
                to={item.path}
                className="font-label-md text-label-md hover:text-primary transition-colors text-on-surface-variant"
              >
                {item.label}
              </Link>
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
};
export default Breadcrumb;
