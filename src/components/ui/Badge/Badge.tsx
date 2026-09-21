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
    primary: 'bg-primary/10 text-primary dark:bg-primary/20 dark:text-primary border border-primary/20',
    secondary: 'bg-secondary/10 text-secondary dark:bg-secondary/20 dark:text-secondary border border-secondary/20',
    error: 'bg-error/10 text-error dark:bg-error/20 dark:text-error border border-error/20',
    success: 'bg-primary/10 text-primary dark:bg-primary/20 dark:text-primary border border-primary/20',
    surface: 'bg-surface-variant text-on-surface-variant border border-outline-variant/30',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold shadow-sm',
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
