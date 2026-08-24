import React, { useState, useRef, useEffect } from 'react';
import { cn } from '../../../lib/cn';

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  options: Array<{ value: string; label: string }>;
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, label, error, options = [], value, onChange, disabled, name, ...props }, ref) => {
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    // Track chosen option
    const selectedOption = options.find((opt) => String(opt.value) === String(value)) || options[0];

    // Close on click outside
    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
          setIsOpen(false);
        }
      };
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, []);

    const handleSelect = (val: string) => {
      if (disabled) return;
      setIsOpen(false);

      if (onChange) {
        // Construct a synthetic change event to maintain complete compatibility with typical form libraries
        const syntheticEvent = {
          target: {
            name: name || '',
            value: val,
          },
        } as React.ChangeEvent<HTMLSelectElement>;
        onChange(syntheticEvent);
      }
    };

    return (
      <div className="w-full flex flex-col gap-1.5 group/select relative" ref={containerRef}>
        {label && (
          <label className="font-label-md text-label-md text-on-surface-variant font-bold block">
            {label}
          </label>
        )}

        {/* Off-screen native select to support ref forwarding, keyboard accessibility and form compliance */}
        <select
          ref={ref}
          name={name}
          value={value}
          onChange={onChange}
          disabled={disabled}
          className="sr-only"
          tabIndex={-1}
          {...props}
        >
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>

        {/* Custom Premium Dropdown Button */}
        <div className="relative w-full">
          <button
            type="button"
            disabled={disabled}
            onClick={() => setIsOpen(!isOpen)}
            className={cn(
              'w-full flex items-center justify-between px-4 py-3 rounded-2xl border text-xs font-bold transition-all duration-300 select-none bg-white/70 dark:bg-slate-900/40 backdrop-blur-md text-on-surface',
              isOpen
                ? 'border-primary dark:border-primary-container ring-4 ring-primary/10 dark:ring-primary-container/10 shadow-sm'
                : 'border-slate-200 dark:border-slate-800 text-on-surface-variant hover:border-primary/30 dark:hover:border-primary-container/30',
              disabled && 'opacity-50 cursor-not-allowed bg-slate-100 dark:bg-slate-800/50',
              error && 'border-error focus:ring-error',
              className
            )}
          >
            <span className="truncate text-right rtl:text-right ltr:text-left flex-grow">
              {selectedOption ? selectedOption.label : ''}
            </span>
            <span
              className={cn(
                'material-symbols-outlined text-[18px] text-on-surface-variant/60 transition-transform duration-300 shrink-0 ltr:ml-2 rtl:mr-2',
                isOpen && 'rotate-180 text-primary dark:text-primary-container'
              )}
            >
              expand_more
            </span>
          </button>

          {/* Premium Dropdown Options Menu */}
          {isOpen && !disabled && (
            <div className="absolute top-[calc(100%+6px)] left-0 right-0 z-50 w-full max-h-60 overflow-y-auto rounded-2xl border border-slate-200 dark:border-slate-800/80 bg-white/95 dark:bg-slate-900/95 shadow-[0_12px_30px_rgba(0,0,0,0.08)] dark:shadow-[0_12px_30px_rgba(0,0,0,0.4)] backdrop-blur-lg py-1.5 scrollbar-thin scrollbar-thumb-slate-200 dark:scrollbar-thumb-slate-800 animate-in fade-in duration-200">
              {options.map((opt) => {
                const isSelected = String(opt.value) === String(value);
                return (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => handleSelect(opt.value)}
                    className={cn(
                      'w-full px-4 py-2.5 text-right rtl:text-right ltr:text-left text-xs font-bold transition-all duration-150 flex items-center justify-between',
                      isSelected
                        ? 'bg-primary/8 dark:bg-primary-container/15 text-primary dark:text-primary-container font-extrabold'
                        : 'text-on-surface-variant hover:bg-slate-50 dark:hover:bg-slate-800/50 hover:text-primary dark:hover:text-primary-container'
                    )}
                  >
                    <span className="truncate">{opt.label}</span>
                    {isSelected && (
                      <span className="material-symbols-outlined text-[14px] text-primary dark:text-primary-container font-bold shrink-0">
                        done
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {error && (
          <span className="text-caption font-caption text-error">
            {error}
          </span>
        )}
      </div>
    );
  }
);

Select.displayName = 'Select';
export default Select;
