import React from 'react';
import { cn } from '../../../lib/cn';

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'primary' | 'secondary' | 'error' | 'success' | 'surface';
  children: React.ReactNode;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  className,
  variant = 'primary',
  ...props
}) => {
  const styles = {
    primary: 'bg-primary-fixed text-on-primary-fixed',
    secondary: 'bg-secondary-container text-on-secondary-container',
    error: 'bg-error/10 text-error',
    success: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400',
    surface: 'bg-surface-container-high text-on-surface-variant'
  };

  return (
    <span
      className={cn(
        'inline-flex items-center px-3 py-1 rounded-full font-label-md text-caption font-semibold shadow-sm',
        styles[variant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
};
export default Badge;
