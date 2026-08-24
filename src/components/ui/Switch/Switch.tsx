import React from 'react';
import { cn } from '../../../lib/cn';

export interface SwitchProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  description?: string;
  disabled?: boolean;
  className?: string;
  standalone?: boolean;
}

export const Switch: React.FC<SwitchProps> = ({
  checked,
  onChange,
  label,
  description,
  disabled = false,
  className,
  standalone = false,
}) => {
  const handleToggle = () => {
    if (disabled) return;
    onChange(!checked);
  };

  const switchButton = (
    <button
      type="button"
      disabled={disabled}
      onClick={handleToggle}
      className={cn(
        'w-12 h-7 rounded-full transition-colors duration-300 relative focus:outline-none shrink-0',
        disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer',
        checked ? 'bg-primary' : 'bg-slate-300 dark:bg-slate-700',
        standalone && className
      )}
    >
      <span
        className={cn(
          'absolute top-1 left-1 w-5 h-5 rounded-full bg-white transition-transform duration-300 shadow-sm',
          checked ? 'translate-x-5' : 'translate-x-0'
        )}
      />
    </button>
  );

  if (standalone) {
    return switchButton;
  }

  return (
    <div
      className={cn(
        'flex items-center justify-between p-4 rounded-2xl bg-slate-50/50 dark:bg-slate-800/10 border border-outline-variant/10 transition-all duration-300',
        disabled && 'opacity-50 pointer-events-none',
        className
      )}
    >
      {(label || description) && (
        <div className="flex flex-col text-right rtl:text-right ltr:text-left">
          {label && (
            <label className="text-xs font-bold text-on-surface block select-none cursor-pointer" onClick={handleToggle}>
              {label}
            </label>
          )}
          {description && (
            <span className="text-[10px] text-on-surface-variant mt-0.5 font-medium select-none">
              {description}
            </span>
          )}
        </div>
      )}

      {switchButton}
    </div>
  );
};

export default Switch;
