import React from 'react';
import { cn } from '../../../lib/cn';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'icon';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  className,
  variant = 'primary',
  size = 'md',
  isLoading,
  disabled,
  ...props
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-label-md rounded-xl transition-all duration-300 ease-out active:scale-95 disabled:opacity-50 disabled:pointer-events-none disabled:active:scale-100 disabled:-translate-y-0 select-none';
  
  const variants = {
    primary: 'bg-gradient-to-r from-primary to-primary-container dark:from-primary-container dark:to-primary text-white border-t border-white/15 shadow-md shadow-primary/15 dark:shadow-primary-container/10 hover:shadow-lg hover:shadow-primary/25 dark:hover:shadow-primary-container/15 hover:-translate-y-0.5 active:translate-y-0',
    secondary: 'bg-primary/8 dark:bg-primary-container/15 text-primary dark:text-primary-container border border-primary/10 dark:border-primary-container/20 hover:bg-primary/15 dark:hover:bg-primary-container/25 hover:-translate-y-0.5 active:translate-y-0',
    outline: 'border border-slate-200 dark:border-slate-800 bg-white/40 dark:bg-slate-900/40 text-on-surface backdrop-blur-sm hover:bg-slate-50 dark:hover:bg-slate-800 hover:border-primary/45 dark:hover:border-primary/45 hover:-translate-y-0.5 active:translate-y-0',
    ghost: 'text-on-surface-variant hover:bg-surface-container-high dark:hover:bg-slate-850 hover:text-on-surface',
    icon: 'p-2 rounded-full hover:bg-surface-container-high dark:hover:bg-slate-850 text-on-surface-variant hover:text-on-surface active:scale-90',
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-caption rounded-lg',
    md: 'px-6 py-3 text-label-md',
    lg: 'px-8 py-4 text-headline-md rounded-2xl',
  };

  return (
    <button
      className={cn(
        baseStyles,
        variant !== 'icon' && sizes[size],
        variants[variant],
        className
      )}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <span className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin mr-2 rtl:ml-2" />
      ) : null}
      {children}
    </button>
  );
};
export default Button;
