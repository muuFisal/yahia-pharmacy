import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { cn } from '@/lib/cn';
import type { PharmacyCategory } from '../../data/pharmacyData';

export interface CategoryCardProps {
  category: PharmacyCategory;
  onClick?: (category: PharmacyCategory) => void;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const CategoryCard: React.FC<CategoryCardProps> = ({
  category,
  onClick,
  className,
  size = 'md'
}) => {
  const navigate = useNavigate();
  const { i18n } = useTranslation();
  const isEn = i18n.language === 'en';
  const displayName = isEn ? (category.nameEn || category.name) : category.name;

  const handleClick = () => {
    if (onClick) {
      onClick(category);
    } else {
      navigate('/products');
    }
  };

  const sizeClasses = {
    sm: {
      wrapper: 'w-20 sm:w-24',
      circle: 'w-16 h-16 sm:w-20 sm:h-20',
      text: 'text-xs',
      iconSize: 'text-[14px]',
      badgeSize: 'w-6 h-6'
    },
    md: {
      wrapper: 'w-28 sm:w-32 md:w-36',
      circle: 'w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32',
      text: 'text-xs sm:text-sm md:text-base',
      iconSize: 'text-[16px]',
      badgeSize: 'w-7 h-7'
    },
    lg: {
      wrapper: 'w-36 sm:w-40 md:w-44',
      circle: 'w-32 h-32 sm:w-36 sm:h-36 md:w-40 md:h-40',
      text: 'text-sm sm:text-base',
      iconSize: 'text-[18px]',
      badgeSize: 'w-8 h-8'
    }
  };

  const currentSize = sizeClasses[size];

  return (
    <div
      onClick={handleClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          handleClick();
        }
      }}
      className={cn(
        'group flex flex-col items-center text-center cursor-pointer shrink-0 select-none transition-all duration-300',
        currentSize.wrapper,
        className
      )}
    >
      {/* Circular Image Container */}
      <div className="relative">
        <div
          className={cn(
            'rounded-full p-1 border-2 border-outline-variant/30 group-hover:border-primary group-hover:scale-105 transition-all duration-300 shadow-sm group-hover:shadow-xl group-hover:shadow-primary/20',
            'bg-surface dark:bg-slate-900',
            currentSize.circle
          )}
        >
          {/* Inner Circular Image Frame */}
          <div className="w-full h-full rounded-full overflow-hidden bg-primary/5 relative">
            <img
              src={category.image}
              alt={displayName}
              className="w-full h-full object-cover rounded-full transition-transform duration-500 group-hover:scale-115"
              loading="lazy"
            />
            {/* Subtle overlay shine on hover */}
            <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/10 transition-colors duration-300 rounded-full" />
          </div>
        </div>

        {/* Small floating icon pill */}
        {category.iconName && (
          <div
            className={cn(
              'absolute bottom-0 start-1/2 -translate-x-1/2 rounded-full bg-surface dark:bg-slate-900 text-primary dark:text-primary-container border border-outline-variant/30 shadow-md flex items-center justify-center transition-transform duration-300 group-hover:scale-110 group-hover:bg-primary group-hover:text-white',
              currentSize.badgeSize
            )}
          >
            <span className={cn('material-symbols-outlined', currentSize.iconSize)}>
              {category.iconName}
            </span>
          </div>
        )}
      </div>

      {/* Category Name Only Underneath */}
      <h3
        className={cn(
          'font-bold text-on-surface group-hover:text-primary transition-colors mt-2.5 line-clamp-2 leading-tight',
          currentSize.text
        )}
      >
        {displayName}
      </h3>
    </div>
  );
};

export default CategoryCard;
