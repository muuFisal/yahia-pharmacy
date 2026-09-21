import React from 'react';
import { useTranslation } from 'react-i18next';
import { Card } from '@/components/ui/Card/Card';
import { Button } from '@/components/ui/Button/Button';
import { cn } from '@/lib/cn';
import { WhatsAppIcon } from '@/components/shared/WhatsAppIcon';
import { createWhatsAppOrderUrl } from '../../utils/whatsapp';
import type { PharmacyProduct } from '../../data/pharmacyData';

export interface ProductCardProps {
  product: PharmacyProduct;
  onOrder?: (product: PharmacyProduct) => void;
  className?: string;
  whatsappPhone?: string;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onOrder,
  className,
  whatsappPhone,
}) => {
  const { t, i18n } = useTranslation('products');
  const isEn = i18n.language === 'en';

  const hasDiscount = Boolean(product.originalPrice && product.originalPrice > product.price);
  
  const discountPercent =
    product.discountPercentage ||
    (hasDiscount && product.originalPrice
      ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
      : null);

  const displayName = isEn && (product as unknown as { nameEn?: string }).nameEn
    ? (product as unknown as { nameEn: string }).nameEn
    : product.name;

  const displayDescription = isEn && (product as unknown as { descriptionEn?: string }).descriptionEn
    ? (product as unknown as { descriptionEn: string }).descriptionEn
    : product.description;

  const displayCategory = isEn && (product as unknown as { categoryEn?: string }).categoryEn
    ? (product as unknown as { categoryEn: string }).categoryEn
    : product.category;

  const handleWhatsAppOrder = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onOrder) {
      onOrder(product);
      return;
    }

    const orderUrl = createWhatsAppOrderUrl({
      productName: displayName,
      price: product.price,
      originalPrice: product.originalPrice,
      category: displayCategory,
      productId: product.id,
      phone: whatsappPhone,
    });

    window.open(orderUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <Card
      hoverEffect
      className={cn(
        'group w-full h-full min-w-0 max-w-full flex flex-col justify-between select-none relative overflow-hidden p-3.5 sm:p-4 rounded-2xl',
        'bg-surface dark:bg-slate-900 border border-outline-variant/30 hover:border-primary/50 dark:hover:border-primary/50 transition-all duration-300',
        'shadow-sm hover:shadow-xl hover:shadow-primary/5',
        className
      )}
    >
      {/* Top Floating Discount Badge ONLY (if discount exists) */}
      {discountPercent ? (
        <div className="absolute top-3 start-3 z-10">
          <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-error text-white shadow-md shadow-error/30 flex items-center gap-1">
            <span className="material-symbols-outlined text-[14px]">local_fire_department</span>
            <span>
              {isEn ? `${discountPercent}% ${t('discountOff')}` : `${t('discountOff')} ${discountPercent}%`}
            </span>
          </span>
        </div>
      ) : null}

      {/* Product Image Frame */}
      <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden bg-slate-50 dark:bg-slate-800/60 mb-3 flex items-center justify-center p-2">
        <img
          src={product.image}
          alt={displayName}
          className="w-full h-full object-cover rounded-xl transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
          onError={(e) => {
            (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=600&q=80';
          }}
        />
      </div>

      {/* Product Information */}
      <div className="flex flex-col flex-grow justify-between gap-3 text-start min-w-0">
        <div>
          {/* Brand & Category + Rating */}
          <div className="flex items-center justify-between gap-2 mb-1.5 min-w-0">
            <span className="text-xs font-semibold text-primary dark:text-primary-container truncate max-w-[62%]">
              {product.brand || displayCategory}
            </span>
            {product.rating && (
              <div className="flex items-center gap-1 text-xs text-amber-500 font-bold shrink-0">
                <span
                  className="material-symbols-outlined text-[15px] fill-current"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  star
                </span>
                <span>{product.rating}</span>
                {product.reviewCount && (
                  <span className="text-[10px] text-on-surface-variant font-normal">
                    ({product.reviewCount})
                  </span>
                )}
              </div>
            )}
          </div>

          {/* Product Title */}
          <h3 className="font-bold text-on-surface text-sm sm:text-base leading-snug line-clamp-2 min-h-[2.5rem] group-hover:text-primary transition-colors">
            {displayName}
          </h3>

          {/* Description */}
          {displayDescription && (
            <p className="text-xs text-on-surface-variant line-clamp-2 mt-1 leading-relaxed">
              {displayDescription}
            </p>
          )}
        </div>

        {/* Price and Order CTA Area */}
        <div className="pt-3 border-t border-outline-variant/15 flex flex-col gap-2.5 min-w-0">
          <div className="flex items-baseline justify-between gap-2 min-w-0">
            <div className="flex items-baseline gap-1.5 min-w-0">
              <span className="text-lg sm:text-xl md:text-2xl font-black text-on-surface font-primary">
                {product.price}
              </span>
              <span className="text-xs font-bold text-on-surface-variant">
                {t('currency')}
              </span>

              {product.originalPrice && product.originalPrice > product.price && (
                <span className="text-xs text-on-surface-variant/60 line-through ms-1.5">
                  {product.originalPrice} {t('currency')}
                </span>
              )}
            </div>

            <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1 shrink-0">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block" />
              {t('inStock')}
            </span>
          </div>

          {/* WhatsApp Direct Order Button matching brand logo colors */}
          <Button
            size="md"
            onClick={handleWhatsAppOrder}
            className="w-full group bg-primary hover:bg-primary-container text-white shadow-md shadow-primary/20 hover:shadow-lg hover:shadow-primary/30 py-2.5 px-3 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all duration-300 active:scale-[0.98]"
          >
            <WhatsAppIcon className="w-4 h-4 sm:w-5 sm:h-5 shrink-0" />
            <span className="truncate">{hasDiscount ? t('orderOfferWhatsApp') : t('orderWhatsApp')}</span>
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default ProductCard;
