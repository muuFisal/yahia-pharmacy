import React, { useEffect } from 'react';
import { cn } from '../../../lib/cn';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  className?: string;
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  className
}) => {
  // Prevent background scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-inverse-surface/40 backdrop-blur-sm transition-opacity duration-300"
        onClick={onClose}
      />
      {/* Content box */}
      <div
        className={cn(
          'relative bg-surface-container-lowest dark:bg-slate-900 text-on-surface rounded-[32px] p-8 max-w-md w-full shadow-2xl scale-100 opacity-100 transition-all duration-300 z-10 border border-slate-200/60 dark:border-slate-800/85 max-h-[90vh] flex flex-col',
          className
        )}
      >
        {/* Close Button Top-End corner */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 rtl:right-auto rtl:left-6 w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-250 dark:hover:bg-slate-700 flex items-center justify-center transition-all duration-200 text-on-surface-variant hover:text-on-surface z-20 active:scale-90"
        >
          <span className="material-symbols-outlined text-sm">close</span>
        </button>

        {title && (
          <h3 className="font-headline-xl text-headline-xl mb-6 pr-8 rtl:pr-0 rtl:pl-8 text-on-surface shrink-0">
            {title}
          </h3>
        )}

        <div className="mt-2 overflow-y-auto pr-1 rtl:pl-1 flex-grow min-h-0">{children}</div>
      </div>
    </div>
  );
};
export default Modal;
