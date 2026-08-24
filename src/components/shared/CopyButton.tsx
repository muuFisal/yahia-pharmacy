import React, { useState } from 'react';
import { useToast } from '@/hooks/useToast';

interface CopyButtonProps {
  text: string;
  toastMessage?: string;
  label?: string;
  copiedLabel?: string;
  className?: string;
  iconSize?: number;
  variant?: 'inline' | 'button' | 'icon';
}

export const CopyButton: React.FC<CopyButtonProps> = ({
  text,
  toastMessage,
  label,
  copiedLabel = 'تم النسخ!',
  className = '',
  iconSize = 14,
  variant = 'inline',
}) => {
  const { showToast } = useToast();
  const [copied, setCopied] = useState(false);

  const handleCopy = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!text) return;

    navigator.clipboard.writeText(text);
    if (toastMessage) {
      showToast(toastMessage, 'success');
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (variant === 'icon') {
    return (
      <button
        type="button"
        onClick={handleCopy}
        className={`w-8 h-8 rounded-lg border transition-all duration-200 flex items-center justify-center active:scale-95 ${
          copied
            ? 'border-emerald-500/40 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
            : 'border-slate-200 dark:border-slate-800 text-on-surface-variant hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-primary'
        } ${className}`}
        aria-label="Copy"
      >
        <span
          className="material-symbols-outlined transition-transform duration-200"
          style={{ fontSize: `${iconSize}px` }}
        >
          {copied ? 'check' : 'content_copy'}
        </span>
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={handleCopy}
      className={`transition-all duration-200 flex items-center gap-1.5 select-none active:scale-95 ${
        copied
          ? 'text-emerald-600 dark:text-emerald-400 font-bold'
          : 'text-on-surface-variant hover:text-primary font-semibold'
      } ${className}`}
    >
      <span
        className={`material-symbols-outlined transition-all duration-200 ${
          copied ? 'text-emerald-500 scale-110 font-bold' : ''
        }`}
        style={{ fontSize: `${iconSize}px` }}
      >
        {copied ? 'check' : 'content_copy'}
      </span>
      {label && <span>{copied ? copiedLabel : label}</span>}
    </button>
  );
};

export default CopyButton;
