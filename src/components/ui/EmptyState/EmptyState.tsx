import React from 'react';
import { cn } from '../../../lib/cn';

interface EmptyStateProps {
  title: string;
  description: string;
  icon?: string;
  children?: React.ReactNode;
  className?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title,
  description,
  icon = 'inbox',
  children,
  className
}) => {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center text-center p-12 bg-surface-container-low dark:bg-surface-container/30 border border-outline-variant/30 rounded-3xl relative overflow-hidden',
        className
      )}
    >
      <div className="w-20 h-20 bg-primary-container/20 rounded-2xl flex items-center justify-center mb-6">
        <span className="material-symbols-outlined text-primary text-5xl">{icon}</span>
      </div>
      <h3 className="font-headline-md text-headline-md text-on-surface mb-2">{title}</h3>
      <p className="font-body-md text-body-md text-on-surface-variant max-w-sm mb-6">
        {description}
      </p>
      {children && <div className="flex gap-4">{children}</div>}
    </div>
  );
};
export default EmptyState;
