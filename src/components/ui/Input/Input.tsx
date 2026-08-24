import React, { useState } from 'react';
import { cn } from '../../../lib/cn';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement & HTMLTextAreaElement> {
  label?: string;
  error?: string;
  icon?: string | React.ReactNode;
  onClear?: () => void;
  textarea?: boolean;
  rows?: number;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = 'text', label, error, icon, onClear, textarea, rows, ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false);
    const isPasswordType = type === 'password';
    const inputType = isPasswordType && showPassword ? 'text' : type;

    return (
      <div className="w-full flex flex-col gap-1.5 group/input">
        {label && (
          <label className="font-label-md text-label-md text-on-surface-variant">
            {label}
          </label>
        )}
        <div className="relative">
          {textarea ? (
            <textarea
              className={cn(
                'w-full bg-white/60 dark:bg-slate-950/60 backdrop-blur-sm text-on-surface border border-slate-200 dark:border-slate-800/85 rounded-xl px-4 py-3 font-body-md focus:outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all duration-300 ease-out resize-y',
                error && 'border-error focus:ring-error',
                className
              )}
              rows={rows}
              ref={ref as unknown as React.Ref<HTMLTextAreaElement>}
              {...(props as unknown as React.TextareaHTMLAttributes<HTMLTextAreaElement>)}
            />
          ) : (
            <input
              type={inputType}
              className={cn(
                'w-full bg-white/60 dark:bg-slate-950/60 backdrop-blur-sm text-on-surface border border-slate-200 dark:border-slate-800/85 rounded-xl px-4 py-3 font-body-md focus:outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all duration-300 ease-out',
                icon && 'pl-10 rtl:pl-4 rtl:pr-10',
                (isPasswordType || (onClear && props.value)) && 'pr-10 rtl:pl-10 rtl:pr-4',
                error && 'border-error focus:ring-error',
                className
              )}
              ref={ref}
              {...props}
            />
          )}
          {!textarea && icon && (
            <span className="absolute top-1/2 -translate-y-1/2 text-on-surface-variant/60 group-focus-within:text-primary left-3 rtl:left-auto rtl:right-3 transition-colors duration-300 flex items-center justify-center pointer-events-none">
              {typeof icon === 'string' ? (
                <span className="material-symbols-outlined text-[20px]">{icon}</span>
              ) : (
                icon
              )}
            </span>
          )}
          {!textarea && isPasswordType && (
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              aria-label={showPassword ? 'Hide password' : 'Show password'}
              className="absolute top-1/2 -translate-y-1/2 text-on-surface-variant/60 hover:text-primary active:scale-95 transition-all duration-200 cursor-pointer select-none right-3 rtl:right-auto rtl:left-3 flex items-center justify-center h-8 w-8 rounded-full hover:bg-black/5 dark:hover:bg-white/5"
            >
              {showPassword ? (
                <svg className="w-5 h-5 stroke-current" fill="none" strokeWidth="1.8" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                </svg>
              ) : (
                <svg className="w-5 h-5 stroke-current" fill="none" strokeWidth="1.8" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              )}
            </button>
          )}
          {!textarea && !isPasswordType && onClear && props.value && (
            <button
              type="button"
              onClick={onClear}
              className="absolute top-1/2 -translate-y-1/2 text-on-surface-variant/60 hover:text-primary active:scale-95 transition-all duration-200 cursor-pointer select-none text-[20px] right-3 rtl:right-auto rtl:left-3 flex items-center justify-center h-8 w-8 rounded-full hover:bg-black/5 dark:hover:bg-white/5"
            >
              <span className="material-symbols-outlined text-[20px]">close</span>
            </button>
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
Input.displayName = 'Input';
export default Input;
