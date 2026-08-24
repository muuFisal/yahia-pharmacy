import React, { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { cn } from '../../../lib/cn';

export interface DatePickerProps {
  value: string; // YYYY-MM-DD
  onChange: (val: string) => void;
  label?: string;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
  error?: string;
  icon?: string | React.ReactNode;
}

export const DatePicker: React.FC<DatePickerProps> = ({
  value,
  onChange,
  label,
  placeholder = 'YYYY-MM-DD',
  className,
  disabled,
  error,
  icon,
}) => {
  const { t, i18n } = useTranslation('dashboard');
  const isAr = i18n.language === 'ar';
  const containerRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);

  const today = new Date();
  
  // Parse initial date
  const parsedDate = value ? new Date(value) : null;
  const initialYear = parsedDate && !isNaN(parsedDate.getTime()) ? parsedDate.getFullYear() : today.getFullYear();
  const initialMonth = parsedDate && !isNaN(parsedDate.getTime()) ? parsedDate.getMonth() : today.getMonth();

  const [viewYear, setViewYear] = useState(initialYear);
  const [viewMonth, setViewMonth] = useState(initialMonth);
  const [prevValue, setPrevValue] = useState(value);

  // Adjust state during render when prop changes (avoids cascading renders in useEffect)
  if (value !== prevValue) {
    setPrevValue(value);
    if (value) {
      const d = new Date(value);
      if (!isNaN(d.getTime())) {
        setViewYear(d.getFullYear());
        setViewMonth(d.getMonth());
      }
    }
  }

  // Close calendar on click outside
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

  // Names of Months and Weekdays
  const monthsAr = [
    'يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو',
    'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر'
  ];
  const monthsEn = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  const weekdaysAr = ['ح', 'ن', 'ث', 'ر', 'خ', 'ج', 'س'];
  const weekdaysEn = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

  const months = isAr ? monthsAr : monthsEn;
  const weekdays = isAr ? weekdaysAr : weekdaysEn;

  // Calendar Calculation Helpers
  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
  const firstDayIndex = new Date(viewYear, viewMonth, 1).getDay(); // 0 for Sunday
  
  const prevMonthIndex = viewMonth === 0 ? 11 : viewMonth - 1;
  const prevYear = viewMonth === 0 ? viewYear - 1 : viewYear;
  const daysInPrevMonth = new Date(prevYear, prevMonthIndex + 1, 0).getDate();

  const nextMonthIndex = viewMonth === 11 ? 0 : viewMonth + 1;
  const nextYear = viewMonth === 11 ? viewYear + 1 : viewYear;

  const prevMonthDays = Array.from(
    { length: firstDayIndex },
    (_, i) => daysInPrevMonth - firstDayIndex + i + 1
  );
  
  const currentMonthDays = Array.from(
    { length: daysInMonth },
    (_, i) => i + 1
  );

  const totalCellsUsed = prevMonthDays.length + currentMonthDays.length;
  const nextMonthDaysCount = totalCellsUsed <= 35 ? 35 - totalCellsUsed : 42 - totalCellsUsed;
  const nextMonthDays = Array.from(
    { length: nextMonthDaysCount },
    (_, i) => i + 1
  );

  const handlePrevMonth = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (viewMonth === 0) {
      setViewMonth(11);
      setViewYear((prev) => prev - 1);
    } else {
      setViewMonth((prev) => prev - 1);
    }
  };

  const handleNextMonth = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (viewMonth === 11) {
      setViewMonth(0);
      setViewYear((prev) => prev + 1);
    } else {
      setViewMonth((prev) => prev + 1);
    }
  };

  const handleDateClick = (year: number, month: number, day: number) => {
    if (disabled) return;
    const formattedDate = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    onChange(formattedDate);
    setIsOpen(false);
  };

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    onChange('');
    setIsOpen(false);
  };

  const handleToday = (e: React.MouseEvent) => {
    e.stopPropagation();
    const formattedToday = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
    onChange(formattedToday);
    setIsOpen(false);
  };

  const selectedYear = parsedDate ? parsedDate.getFullYear() : null;
  const selectedMonth = parsedDate ? parsedDate.getMonth() : null;
  const selectedDay = parsedDate ? parsedDate.getDate() : null;

  return (
    <div className="w-full flex flex-col gap-1 relative" ref={containerRef}>
      {label && (
        <label className="text-xs font-bold text-on-surface-variant px-1 select-none">
          {label}
        </label>
      )}

      <div className="relative w-full">
        {/* Date Trigger Button */}
        <button
          type="button"
          disabled={disabled}
          onClick={() => setIsOpen(!isOpen)}
          className={cn(
            'w-full flex items-center justify-between px-3 py-2.5 rounded-xl border text-[11px] font-bold transition-all duration-300 select-none bg-white/70 dark:bg-slate-900/40 backdrop-blur-md text-on-surface',
            isOpen
              ? 'border-primary dark:border-primary-container ring-4 ring-primary/10 dark:ring-primary-container/10 shadow-sm'
              : 'border-slate-200 dark:border-slate-800 text-on-surface-variant hover:border-primary/30 dark:hover:border-primary-container/30',
            disabled && 'opacity-50 cursor-not-allowed bg-slate-100 dark:bg-slate-800/50',
            error && 'border-error focus:ring-error',
            className
          )}
        >
          <div className="flex items-center gap-2 truncate">
            {icon && (
              <span className="material-symbols-outlined text-[16px] text-on-surface-variant/60 flex items-center justify-center shrink-0">
                {icon}
              </span>
            )}
            <span className={cn('truncate', !value && 'text-on-surface-variant/40 font-semibold')}>
              {value || placeholder}
            </span>
          </div>
          <span className="material-symbols-outlined text-[16px] text-on-surface-variant/60 shrink-0">
            calendar_today
          </span>
        </button>

        {/* Premium Styled Calendar Popover */}
        {isOpen && !disabled && (
          <div className="absolute top-[calc(100%+6px)] left-0 right-0 z-50 min-w-[270px] max-w-[320px] mx-auto rounded-2xl border border-slate-200 dark:border-slate-800/80 bg-white/95 dark:bg-slate-900/95 shadow-[0_12px_30px_rgba(0,0,0,0.08)] dark:shadow-[0_12px_30px_rgba(0,0,0,0.4)] backdrop-blur-lg p-4 animate-in fade-in duration-200 font-sans">
            {/* Header: Month/Year navigation */}
            <div className="flex items-center justify-between mb-3">
              <button
                type="button"
                onClick={handlePrevMonth}
                className="w-7 h-7 rounded-lg border border-slate-150 dark:border-slate-800 text-on-surface hover:bg-slate-50 dark:hover:bg-slate-850 flex items-center justify-center transition-colors cursor-pointer"
              >
                <span className="material-symbols-outlined text-[16px] font-bold rtl:rotate-180">
                  chevron_left
                </span>
              </button>
              
              <span className="text-xs font-extrabold text-on-surface select-none">
                {months[viewMonth]} {viewYear}
              </span>

              <button
                type="button"
                onClick={handleNextMonth}
                className="w-7 h-7 rounded-lg border border-slate-150 dark:border-slate-800 text-on-surface hover:bg-slate-50 dark:hover:bg-slate-850 flex items-center justify-center transition-colors cursor-pointer"
              >
                <span className="material-symbols-outlined text-[16px] font-bold rtl:rotate-180">
                  chevron_right
                </span>
              </button>
            </div>

            {/* Weekdays header */}
            <div className="grid grid-cols-7 gap-1 text-center text-[10px] font-extrabold text-on-surface-variant/60 mb-2 border-b border-slate-100 dark:border-slate-800 pb-1">
              {weekdays.map((day, idx) => (
                <div key={idx} className="py-1">
                  {day}
                </div>
              ))}
            </div>

            {/* Days grid */}
            <div className="grid grid-cols-7 gap-1 text-center text-[11px]">
              {/* Previous Month Days */}
              {prevMonthDays.map((day) => (
                <button
                  key={`prev-${day}`}
                  type="button"
                  onClick={() => handleDateClick(prevYear, prevMonthIndex, day)}
                  className="text-on-surface-variant/30 hover:text-on-surface-variant/50 font-semibold py-1.5 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 text-center transition-all duration-150 cursor-pointer"
                >
                  {day}
                </button>
              ))}

              {/* Current Month Days */}
              {currentMonthDays.map((day) => {
                const isSelected = selectedYear === viewYear && selectedMonth === viewMonth && selectedDay === day;
                const isToday = today.getFullYear() === viewYear && today.getMonth() === viewMonth && today.getDate() === day;
                return (
                  <button
                    key={`curr-${day}`}
                    type="button"
                    onClick={() => handleDateClick(viewYear, viewMonth, day)}
                    className={cn(
                      'font-bold py-1.5 rounded-lg text-center transition-all duration-150 cursor-pointer',
                      isSelected
                        ? 'bg-primary text-on-primary shadow-sm shadow-primary/20 scale-105 font-extrabold'
                        : 'text-on-surface hover:bg-primary/5 hover:text-primary',
                      isToday && !isSelected && 'border border-primary/30 text-primary bg-primary/4'
                    )}
                  >
                    {day}
                  </button>
                );
              })}

              {/* Next Month Days */}
              {nextMonthDays.map((day) => (
                <button
                  key={`next-${day}`}
                  type="button"
                  onClick={() => handleDateClick(nextYear, nextMonthIndex, day)}
                  className="text-on-surface-variant/30 hover:text-on-surface-variant/50 font-semibold py-1.5 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 text-center transition-all duration-150 cursor-pointer"
                >
                  {day}
                </button>
              ))}
            </div>

            {/* Footer Buttons */}
            <div className="flex items-center justify-between border-t border-slate-100 dark:border-slate-800/80 pt-2 mt-2 gap-2">
              <button
                type="button"
                onClick={handleClear}
                className="px-2.5 py-1 text-[10px] font-extrabold text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/20 rounded-lg transition-colors cursor-pointer"
              >
                {t('common.clear') || 'Clear'}
              </button>
              <button
                type="button"
                onClick={handleToday}
                className="px-2.5 py-1 text-[10px] font-extrabold text-primary hover:bg-primary/5 rounded-lg transition-colors cursor-pointer"
              >
                {t('common.today') || 'Today'}
              </button>
            </div>
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
};
