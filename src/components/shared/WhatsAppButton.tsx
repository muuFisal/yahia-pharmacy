import React from 'react';
import { WhatsAppIcon } from './WhatsAppIcon';
import { cn } from '@/lib/cn';

export interface WhatsAppButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'surface' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  iconPosition?: 'start' | 'end';
}

export const WhatsAppButton: React.FC<WhatsAppButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  iconPosition = 'start',
  className,
  onClick,
  ...props
}) => {
  const sizeClasses = {
    sm: 'px-3 py-1.5 text-xs rounded-lg gap-1.5',
    md: 'px-4 py-2.5 text-sm rounded-xl gap-2',
    lg: 'px-6 py-3 text-base rounded-2xl gap-2.5',
  };

  const variantClasses = {
    // Pharmacy Red from Yahia Logo
    primary:
      'bg-primary hover:bg-primary-container text-white border-0 shadow-md shadow-primary/20 hover:shadow-lg hover:shadow-primary/30',
    // Yahia Navy Blue from Yahia Logo
    secondary:
      'bg-secondary hover:bg-secondary-container text-white border-0 shadow-md shadow-secondary/20 hover:shadow-lg hover:shadow-secondary/30',
    // Surface White / Dark Surface for high contrast (e.g. on colored banners)
    surface:
      'bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 text-on-surface border border-outline-variant/30 shadow-md hover:shadow-xl hover:text-primary',
    // Clean Outline
    outline:
      'bg-transparent hover:bg-primary/5 text-primary border border-primary/30 hover:border-primary',
  };

  const iconSizes = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
  };

  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'group inline-flex items-center justify-center font-bold font-primary transition-all duration-300 active:scale-[0.98] select-none cursor-pointer',
        sizeClasses[size],
        variantClasses[variant],
        className
      )}
      {...props}
    >
      {iconPosition === 'start' && <WhatsAppIcon className={iconSizes[size]} />}
      <span>{children}</span>
      {iconPosition === 'end' && <WhatsAppIcon className={iconSizes[size]} />}
    </button>
  );
};

export default WhatsAppButton;
