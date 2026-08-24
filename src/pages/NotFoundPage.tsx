import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

export const NotFoundPage: React.FC = () => {
  const { t, i18n } = useTranslation('common');
  const navigate = useNavigate();
  const isRTL = i18n.language === 'ar';

  return (
    <div className="min-h-screen w-screen flex flex-col items-center justify-center bg-gradient-to-br from-surface to-surface-container-low dark:from-slate-950 dark:to-slate-900 px-6 py-12 relative overflow-hidden transition-colors duration-300">
      {/* Dynamic Glowing Blobs in Background */}
      <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-primary/10 dark:bg-primary/5 rounded-full blur-3xl animate-pulse pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-indigo-600/10 dark:bg-indigo-600/5 rounded-full blur-3xl animate-pulse pointer-events-none" />

      {/* Main Glassmorphic Container Card */}
      <div className="max-w-lg w-full bg-white/70 dark:bg-slate-900/60 backdrop-blur-xl border border-outline-variant/10 dark:border-slate-800/80 shadow-2xl rounded-3xl p-10 flex flex-col items-center text-center relative z-10">
        
        {/* Animated Floating 404/Error Graphic */}
        <div className="relative mb-8 select-none">
          <div className="text-[120px] font-black text-transparent bg-clip-text bg-gradient-to-br from-primary to-primary-container dark:from-primary-container dark:to-primary leading-none tracking-tighter opacity-90 drop-shadow-md select-none animate-bounce" style={{ animationDuration: '3s' }}>
            {t('errors.notFound.code')}
          </div>
          {/* Floating Icon */}
          <div className="absolute -top-4 -right-4 w-12 h-12 bg-primary/10 dark:bg-primary/20 text-primary dark:text-primary-container rounded-full border border-primary/20 flex items-center justify-center shadow-lg animate-pulse">
            <span className="material-symbols-outlined text-[24px]">explore_off</span>
          </div>
        </div>

        {/* Content Title */}
        <h2 className="font-display-lg text-headline-md font-extrabold text-on-surface dark:text-white leading-tight">
          {t('errors.notFound.title')}
        </h2>

        {/* Content Description */}
        <p className="text-sm text-on-surface-variant dark:text-slate-400 mt-4 mb-8 leading-relaxed max-w-sm font-medium">
          {t('errors.notFound.subtitle')}
        </p>

        {/* Action Button */}
        <button
          onClick={() => navigate('/')}
          className="w-full flex items-center justify-center gap-2 px-6 py-3.5 bg-gradient-to-r from-primary to-primary-container active:scale-[0.98] text-white font-bold text-sm rounded-2xl shadow-lg shadow-primary/25 cursor-pointer transition-all duration-200"
        >
          <span className="material-symbols-outlined text-[20px]">
            {isRTL ? 'arrow_forward' : 'arrow_back'}
          </span>
          {t('errors.notFound.backButton')}
        </button>
      </div>

      {/* Decorative Brand Footer */}
      <div className="absolute bottom-6 text-center z-10">
        <p className="text-xs text-on-surface-variant dark:text-slate-500 font-semibold tracking-wider uppercase opacity-50">
          {t('appName')}
        </p>
      </div>
    </div>
  );
};

export default NotFoundPage;
