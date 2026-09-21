import React from 'react';
import { useLanguage } from '@/hooks/useLanguage';
import { useBranding } from '@/hooks/useBranding';

export const LoadingScreen: React.FC = () => {
  const { language } = useLanguage();
  const { brandName, settings } = useBranding();

  return (
    <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-slate-50/90 dark:bg-slate-950/95 backdrop-blur-xl transition-all duration-500">
      {/* CSS Styles for custom premium loading animations */}
      <style>{`
        @keyframes pulse-glowing {
          0%, 100% {
            transform: scale(1);
            filter: drop-shadow(0 0 15px rgba(var(--primary-rgb, 53, 37, 205), 0.2));
          }
          50% {
            transform: scale(1.05);
            filter: drop-shadow(0 0 30px rgba(var(--primary-rgb, 53, 37, 205), 0.5));
          }
        }
        @keyframes orbit-cw {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes orbit-ccw {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(-360deg); }
        }
        @keyframes pulse-text {
          0%, 100% { opacity: 0.6; }
          50% { opacity: 1; }
        }
        .animate-pulse-glowing {
          animation: pulse-glowing 2.5s infinite ease-in-out;
        }
        .animate-orbit-cw {
          animation: orbit-cw 3s infinite linear;
        }
        .animate-orbit-ccw {
          animation: orbit-ccw 2s infinite linear;
        }
        .animate-pulse-text {
          animation: pulse-text 1.5s infinite ease-in-out;
        }
      `}</style>

      {/* Main Loader Container */}
      <div className="relative flex items-center justify-center w-56 h-56">
        {/* Outer Ring (Clockwise) */}
        <div className="absolute w-48 h-48 rounded-full border-t-2 border-b-2 border-primary/30 dark:border-primary-container/20 animate-orbit-cw"></div>

        {/* Inner Ring (Counter-Clockwise) */}
        <div className="absolute w-40 h-40 rounded-full border-r-2 border-l-2 border-primary dark:border-primary-container animate-orbit-ccw"></div>

        {/* Center Logo Box */}
        <div className="absolute w-28 h-28 bg-white dark:bg-slate-900 rounded-3xl flex flex-col items-center justify-center shadow-2xl shadow-primary/20 border border-primary/10 animate-pulse-glowing p-2">
          <img
            src={settings?.logo || '/logo-icon.png'}
            alt={brandName}
            className="w-20 h-20 object-contain"
            onError={(e) => {
              (e.target as HTMLImageElement).src = '/logo-icon.png';
            }}
          />
        </div>
      </div>

      {/* Brand Title and Subtitle */}
      <div className="mt-6 text-center flex flex-col gap-2">
        <h2 className="text-headline-md font-display font-bold text-on-surface tracking-wide font-primary">
          {brandName}
        </h2>
        <p className="text-sm font-medium text-primary dark:text-primary-container animate-pulse-text">
          {language === 'ar' ? 'صيدلية يحيى .. جاري تحضير الخدمات...' : 'Yahia Pharmacy .. Preparing healthcare services...'}
        </p>
      </div>

      {/* Progress Dots */}
      <div className="flex gap-1.5 mt-8">
        <span className="w-2.5 h-2.5 rounded-full bg-primary animate-bounce [animation-delay:-0.3s]"></span>
        <span className="w-2.5 h-2.5 rounded-full bg-primary/70 animate-bounce [animation-delay:-0.15s]"></span>
        <span className="w-2.5 h-2.5 rounded-full bg-primary/40 animate-bounce"></span>
      </div>
    </div>
  );
};

export default LoadingScreen;
