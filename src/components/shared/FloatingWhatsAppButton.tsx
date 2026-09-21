import React from 'react';
import { useTranslation } from 'react-i18next';
import { WhatsAppIcon } from './WhatsAppIcon';
import { createConsultationWhatsAppUrl } from '@/features/website/utils/whatsapp';

export const FloatingWhatsAppButton: React.FC = () => {
  const { i18n } = useTranslation();
  const isRtl = i18n.language === 'ar';
  const isEn = i18n.language === 'en';

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const url = createConsultationWhatsAppUrl();
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const label = isEn ? 'Chat with Pharmacist' : 'تحدث مع الصيدلي';

  return (
    <div
      className={`fixed bottom-6 ${
        isRtl ? 'right-6' : 'left-6'
      } z-50 flex items-center group`}
    >
      <button
        onClick={handleClick}
        className="flex items-center gap-2.5 px-3.5 py-2.5 sm:px-4 sm:py-3 rounded-full bg-primary hover:bg-primary-container text-white shadow-xl shadow-primary/30 hover:shadow-2xl hover:shadow-primary/40 border-2 border-white/30 dark:border-white/10 transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer select-none"
        aria-label={label}
        title={label}
      >
        <div className="relative flex items-center justify-center">
          <WhatsAppIcon className="w-6 h-6 sm:w-7 sm:h-7 shrink-0 drop-shadow-sm" />
          <span className="absolute -top-1 -end-1 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-white dark:border-slate-900 animate-ping" />
        </div>
        <span className="text-xs sm:text-sm font-bold font-primary hidden md:inline-block pe-1">
          {label}
        </span>
      </button>
    </div>
  );
};

export default FloatingWhatsAppButton;
