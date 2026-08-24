import React from 'react';
import { useTranslation } from 'react-i18next';
import { Modal } from '../Modal/Modal';
import { Button } from '../Button/Button';

export interface ConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  type?: 'danger' | 'warning' | 'info' | 'success';
  isLoading?: boolean;
}

export const ConfirmModal: React.FC<ConfirmModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText,
  cancelText,
  type = 'danger',
  isLoading = false,
}) => {
  const { t } = useTranslation('dashboard');

  const icons = {
    danger: {
      symbol: 'delete_forever',
      colorClass: 'text-error bg-error/10 dark:bg-error/20',
    },
    warning: {
      symbol: 'warning',
      colorClass: 'text-amber-600 bg-amber-500/10 dark:text-amber-400 dark:bg-amber-500/20',
    },
    info: {
      symbol: 'info',
      colorClass: 'text-primary bg-primary/8 dark:text-primary-container dark:bg-primary-container/20',
    },
    success: {
      symbol: 'check_circle',
      colorClass: 'text-green-600 bg-green-500/10 dark:text-green-400 dark:bg-green-500/20',
    },
  };

  const currentType = icons[type];

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="" className="max-w-md">
      <div className="flex flex-col items-center text-center gap-5 mt-2 animate-in fade-in zoom-in-95 duration-200">
        {/* Type Icon Circle */}
        <div className={`w-14 h-14 rounded-full flex items-center justify-center ${currentType.colorClass}`}>
          <span className="material-symbols-outlined text-[32px]">{currentType.symbol}</span>
        </div>

        {/* Title & Description */}
        <div className="flex flex-col gap-2">
          <h3 className="font-bold text-lg text-on-surface">
            {title}
          </h3>
          <p className="text-xs text-on-surface-variant font-medium leading-relaxed max-w-xs">
            {message}
          </p>
        </div>

        {/* Buttons */}
        <div className="flex items-center justify-center gap-3 mt-4 w-full border-t border-outline-variant/10 pt-4">
          <Button
            type="button"
            onClick={onClose}
            variant="secondary"
            className="flex-1 py-2.5 rounded-xl font-bold text-xs"
            disabled={isLoading}
          >
            {cancelText || t('branches.cancel')}
          </Button>
          <Button
            type="button"
            onClick={onConfirm}
            variant={type === 'danger' ? undefined : 'primary'}
            className={type === 'danger' ? 'flex-1 py-2.5 rounded-xl font-bold text-xs bg-error hover:bg-error/90 text-white shadow-md shadow-error/15 active:scale-95 focus:ring-error' : 'flex-1 py-2.5 rounded-xl font-bold text-xs'}
            isLoading={isLoading}
          >
            {confirmText || t('branches.confirm')}
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default ConfirmModal;
