import React from 'react';
import { useLanguage } from '../../../hooks/useLanguage';
import { cn } from '../../../lib/cn';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
}

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  className
}) => {
  const { dir } = useLanguage();
  const prevIcon = dir === 'rtl' ? 'chevron_right' : 'chevron_left';
  const nextIcon = dir === 'rtl' ? 'chevron_left' : 'chevron_right';

  if (totalPages <= 1) return null;

  // Generate page numbers with smart ellipsis truncation
  const getPageNumbers = () => {
    const siblingCount = 1; // Show 1 sibling on each side of current page
    const totalPageNumbers = siblingCount * 2 + 5; // First + Last + Current + 2 siblings + 2 ellipses

    if (totalPages <= totalPageNumbers) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
    const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPages);

    const shouldShowLeftDots = leftSiblingIndex > 2;
    const shouldShowRightDots = rightSiblingIndex < totalPages - 1;

    if (!shouldShowLeftDots && shouldShowRightDots) {
      const leftItemCount = 3 + 2 * siblingCount;
      const leftRange = Array.from({ length: leftItemCount }, (_, i) => i + 1);
      return [...leftRange, '...', totalPages];
    }

    if (shouldShowLeftDots && !shouldShowRightDots) {
      const rightItemCount = 3 + 2 * siblingCount;
      const rightRange = Array.from({ length: rightItemCount }, (_, i) => totalPages - rightItemCount + i + 1);
      return [1, '...', ...rightRange];
    }

    if (shouldShowLeftDots && shouldShowRightDots) {
      const middleRange = Array.from(
        { length: rightSiblingIndex - leftSiblingIndex + 1 },
        (_, i) => leftSiblingIndex + i
      );
      return [1, '...', ...middleRange, '...', totalPages];
    }

    return [];
  };

  const pages = getPageNumbers();

  return (
    <nav className={cn('flex flex-wrap items-center justify-center gap-1 sm:gap-1.5 py-2 max-w-full', className)}>
      {/* Previous button */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-surface border border-outline-variant/20 flex items-center justify-center text-on-surface-variant hover:bg-primary/5 hover:border-primary/30 hover:text-primary transition-all duration-200 disabled:opacity-30 disabled:pointer-events-none active:scale-95 cursor-pointer shadow-sm flex-shrink-0"
        title={dir === 'rtl' ? 'الصفحة السابقة' : 'Previous page'}
      >
        <span className="material-symbols-outlined text-[16px] sm:text-[18px]">{prevIcon}</span>
      </button>

      {/* Pages */}
      {pages.map((page, index) => {
        if (page === '...') {
          return (
            <span
              key={`ellipsis-${index}`}
              className="w-7 h-8 sm:w-9 sm:h-9 flex items-center justify-center text-on-surface-variant/40 text-[10px] sm:text-xs font-semibold select-none flex-shrink-0"
            >
              •••
            </span>
          );
        }

        const isCurrent = currentPage === page;
        return (
          <button
            key={`page-${page}`}
            onClick={() => onPageChange(page as number)}
            className={cn(
              'w-8 h-8 sm:w-9 sm:h-9 rounded-xl font-bold text-[11px] sm:text-xs transition-all duration-200 select-none active:scale-95 cursor-pointer border flex-shrink-0',
              isCurrent
                ? 'bg-primary text-white border-primary shadow-sm shadow-primary/20 scale-105 font-extrabold'
                : 'bg-surface border-outline-variant/20 text-on-surface-variant hover:bg-primary/5 hover:border-primary/20 hover:text-primary'
            )}
          >
            {page}
          </button>
        );
      })}

      {/* Next button */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-surface border border-outline-variant/20 flex items-center justify-center text-on-surface-variant hover:bg-primary/5 hover:border-primary/30 hover:text-primary transition-all duration-200 disabled:opacity-30 disabled:pointer-events-none active:scale-95 cursor-pointer shadow-sm flex-shrink-0"
        title={dir === 'rtl' ? 'الصفحة التالية' : 'Next page'}
      >
        <span className="material-symbols-outlined text-[16px] sm:text-[18px]">{nextIcon}</span>
      </button>
    </nav>
  );
};

export default Pagination;
