import React, { useRef, useState, useEffect, useCallback } from 'react';
import { cn } from '@/lib/cn';

interface HorizontalScrollContainerProps {
  children: React.ReactNode;
  className?: string;
  itemGap?: 'sm' | 'md' | 'lg';
  showControls?: boolean;
  controlsPosition?: 'top' | 'sides';
  scrollAmount?: number;
}

export const HorizontalScrollContainer: React.FC<HorizontalScrollContainerProps> = ({
  children,
  className,
  itemGap = 'md',
  showControls = true,
  controlsPosition = 'sides',
  scrollAmount = 340
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(true);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeftState, setScrollLeftState] = useState(0);

  const checkScrollability = useCallback(() => {
    const el = containerRef.current;
    if (!el) return;

    const { scrollLeft, scrollWidth, clientWidth } = el;
    const maxScroll = scrollWidth - clientWidth;
    const isRtl = document.documentElement.dir === 'rtl';

    if (isRtl) {
      // In RTL, scrollLeft can be negative or positive depending on browser implementation
      const absScroll = Math.abs(scrollLeft);
      setCanScrollPrev(absScroll > 10);
      setCanScrollNext(absScroll < maxScroll - 10);
    } else {
      setCanScrollPrev(scrollLeft > 10);
      setCanScrollNext(scrollLeft < maxScroll - 10);
    }
  }, []);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    checkScrollability();
    el.addEventListener('scroll', checkScrollability, { passive: true });
    window.addEventListener('resize', checkScrollability);

    return () => {
      el.removeEventListener('scroll', checkScrollability);
      window.removeEventListener('resize', checkScrollability);
    };
  }, [checkScrollability, children]);

  const handleScroll = (direction: 'next' | 'prev') => {
    const el = containerRef.current;
    if (!el) return;

    const isRtl = document.documentElement.dir === 'rtl';
    const multiplier = direction === 'next' ? 1 : -1;
    // In RTL, moving forward in list (next) scrolls to the left (negative in some browsers, positive in others)
    const sign = isRtl ? -multiplier : multiplier;

    el.scrollBy({
      left: sign * scrollAmount,
      behavior: 'smooth'
    });
  };

  // Drag to scroll for desktop mouse users
  const handleMouseDown = (e: React.MouseEvent) => {
    const el = containerRef.current;
    if (!el) return;
    setIsDragging(true);
    setStartX(e.pageX - el.offsetLeft);
    setScrollLeftState(el.scrollLeft);
  };

  const handleMouseLeaveOrUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    const el = containerRef.current;
    if (!el) return;
    e.preventDefault();
    const x = e.pageX - el.offsetLeft;
    const walk = (x - startX) * 1.5;
    el.scrollLeft = scrollLeftState - walk;
  };

  const gapClasses = {
    sm: 'gap-3 sm:gap-4',
    md: 'gap-4 sm:gap-6',
    lg: 'gap-6 sm:gap-8'
  };

  return (
    <div className="relative group/scroll-container w-full">
      {/* Side Scroll Buttons */}
      {showControls && controlsPosition === 'sides' && (
        <>
          {/* Previous Button (Right side in RTL, Left in LTR) */}
          <button
            type="button"
            onClick={() => handleScroll('prev')}
            disabled={!canScrollPrev}
            aria-label="Previous items"
            className={cn(
              'absolute top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full flex items-center justify-center transition-all duration-300 shadow-xl border backdrop-blur-md active:scale-90',
              'start-0 sm:-start-4',
              'bg-surface/90 dark:bg-slate-900/90 text-on-surface border-outline-variant/30 hover:bg-primary hover:text-white dark:hover:bg-primary',
              'disabled:opacity-0 disabled:pointer-events-none opacity-90 sm:opacity-0 sm:group-hover/scroll-container:opacity-100'
            )}
          >
            <span className="material-symbols-outlined text-[24px] rtl:rotate-180">
              chevron_left
            </span>
          </button>

          {/* Next Button (Left side in RTL, Right in LTR) */}
          <button
            type="button"
            onClick={() => handleScroll('next')}
            disabled={!canScrollNext}
            aria-label="Next items"
            className={cn(
              'absolute top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full flex items-center justify-center transition-all duration-300 shadow-xl border backdrop-blur-md active:scale-90',
              'end-0 sm:-end-4',
              'bg-surface/90 dark:bg-slate-900/90 text-on-surface border-outline-variant/30 hover:bg-primary hover:text-white dark:hover:bg-primary',
              'disabled:opacity-0 disabled:pointer-events-none opacity-90 sm:opacity-0 sm:group-hover/scroll-container:opacity-100'
            )}
          >
            <span className="material-symbols-outlined text-[24px] rtl:rotate-180">
              chevron_right
            </span>
          </button>
        </>
      )}

      {/* Horizontal Scroll Area */}
      <div
        ref={containerRef}
        onMouseDown={handleMouseDown}
        onMouseLeave={handleMouseLeaveOrUp}
        onMouseUp={handleMouseLeaveOrUp}
        onMouseMove={handleMouseMove}
        className={cn(
          'flex items-stretch overflow-x-auto scroll-smooth py-4 px-1',
          'cursor-grab active:cursor-grabbing select-none',
          '[&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]',
          gapClasses[itemGap],
          className
        )}
      >
        {children}
      </div>
    </div>
  );
};

export default HorizontalScrollContainer;
