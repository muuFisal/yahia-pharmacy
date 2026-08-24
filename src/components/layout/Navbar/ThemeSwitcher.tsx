import React from 'react';
import { useTheme } from '../../../hooks/useTheme';
import { useTranslation } from 'react-i18next';

export const ThemeSwitcher: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const { t } = useTranslation();

  return (
    <button
      onClick={toggleTheme}
      className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-surface-container-high dark:hover:bg-surface-container transition-all active:scale-90 text-on-surface-variant hover:text-on-surface"
      title={theme === 'light' ? t('theme.dark') : t('theme.light')}
      aria-label="Toggle Theme"
    >
      <span className="material-symbols-outlined text-[22px]">
        {theme === 'light' ? 'dark_mode' : 'light_mode'}
      </span>
    </button>
  );
};
export default ThemeSwitcher;
