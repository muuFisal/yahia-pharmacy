import React from 'react';
import { Card } from '@/components/ui';

interface ThemeSwitcherProps {
  isAmber: boolean;
  isIndigo: boolean;
  applyPreset: (preset: 'indigo' | 'amber') => void;
  navigate: (path: string) => void;
  t: (key: string) => string;
}

export const ThemeSwitcher: React.FC<ThemeSwitcherProps> = ({
  isAmber,
  isIndigo,
  applyPreset,
  navigate,
  t,
}) => {
  return (
    <Card className="p-6 bg-surface border border-outline-variant/10 shadow-sm flex flex-col gap-5">
      <div>
        <h3 className="font-display-lg text-headline-md font-bold text-on-surface flex items-center gap-2">
          <span className="material-symbols-outlined text-primary">palette</span>
          {t('overview.identityTitle')}
        </h3>
        <p className="text-xs text-on-surface-variant font-medium mt-1">
          {t('overview.currentColors')}
        </p>
      </div>

      {/* Custom Interactive Presets */}
      <div className="flex gap-3">
        {/* Amber Button */}
        <button
          type="button"
          onClick={() => applyPreset('amber')}
          className={`flex-1 py-3 px-4 rounded-xl text-xs font-bold transition-all duration-300 border flex items-center justify-center gap-2 active:scale-95 cursor-pointer ${
            isAmber
              ? 'bg-amber-500 text-white border-transparent shadow-md shadow-amber-500/20'
              : 'bg-surface border-outline-variant/30 text-on-surface hover:bg-slate-50 dark:hover:bg-slate-800'
          }`}
        >
          <span className="w-3.5 h-3.5 rounded-full bg-amber-500 border border-white/20"></span>
          Amber
        </button>

        {/* Indigo Button */}
        <button
          type="button"
          onClick={() => applyPreset('indigo')}
          className={`flex-1 py-3 px-4 rounded-xl text-xs font-bold transition-all duration-300 border flex items-center justify-center gap-2 active:scale-95 cursor-pointer ${
            isIndigo
              ? 'bg-primary text-white border-transparent shadow-md shadow-primary/20'
              : 'bg-surface border-outline-variant/30 text-on-surface hover:bg-slate-50 dark:hover:bg-slate-800'
          }`}
        >
          <span className="w-3.5 h-3.5 rounded-full bg-[#3525cd] border border-white/20"></span>
          Indigo
        </button>
      </div>

      {/* Go to Settings Theme Customization */}
      <button
        type="button"
        onClick={() => navigate('/admin/dashboard/settings')}
        className="w-full py-3.5 rounded-xl border border-dashed border-outline-variant/70 text-on-surface-variant hover:text-primary hover:border-primary/50 text-xs font-bold flex items-center justify-center gap-2 transition-all duration-200 cursor-pointer active:scale-98"
      >
        <span className="material-symbols-outlined text-[16px]">palette</span>
        {t('overview.editTheme')}
      </button>
    </Card>
  );
};

export default ThemeSwitcher;
