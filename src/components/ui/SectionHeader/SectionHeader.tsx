import React from 'react';
import { cn } from '../../../lib/cn';

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
  className?: string;
  centered?: boolean;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  subtitle,
  action,
  className,
  centered = false
}) => {
  return (
    <div
      className={cn(
        'flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10 w-full',
        centered && 'text-center md:text-center md:items-center md:justify-center flex-col',
        className
      )}
    >
      <div className={cn('flex flex-col gap-2', centered && 'items-center')}>
        <div className="flex items-center gap-3">
          {!centered && <div className="w-2 h-8 bg-secondary rounded-full shrink-0" />}
          <h2 className="font-headline-xl text-headline-xl text-on-surface">{title}</h2>
        </div>
        {subtitle && (
          <p className="font-body-md text-body-md text-on-surface-variant max-w-2xl">
            {subtitle}
          </p>
        )}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
};
export default SectionHeader;
