import React from 'react';
import { cn } from '../../../lib/cn';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  variant?: 'default' | 'glass' | 'outline';
  hoverEffect?: boolean;
}

export const Card: React.FC<CardProps> = ({
  children,
  className,
  variant = 'default',
  hoverEffect = false,
  ...props
}) => {
  return (
    <div
      className={cn(
        'rounded-[24px] overflow-hidden transition-all duration-300',
        variant === 'default' && 'bg-surface border border-outline-variant shadow-sm dark:bg-slate-900/60 dark:border-slate-800/80',
        variant === 'glass' && 'glass-card',
        variant === 'outline' && 'border-2 border-dashed border-outline-variant bg-surface-container-lowest',
        hoverEffect && 'hover:shadow-xl hover:-translate-y-1 dark:hover:shadow-[0_12px_30px_rgba(0,0,0,0.5),0_0_20px_rgba(195,192,255,0.08)] dark:hover:border-primary/30',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};
export default Card;
