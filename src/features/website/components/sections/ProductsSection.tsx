import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Container } from '@/components/ui/Container/Container';
import { SectionHeader } from '@/components/ui/SectionHeader/SectionHeader';
import { Button } from '@/components/ui/Button/Button';
import { HorizontalScrollContainer } from '../common/HorizontalScrollContainer';
import { ProductCard } from '../cards/ProductCard';
import { PHARMACY_REGULAR_PRODUCTS, type PharmacyProduct } from '../../data/pharmacyData';

interface ProductsSectionProps {
  products?: PharmacyProduct[];
  onOrder?: (product: PharmacyProduct) => void;
  className?: string;
  limit?: number;
}

export const ProductsSection: React.FC<ProductsSectionProps> = ({
  products = PHARMACY_REGULAR_PRODUCTS,
  onOrder,
  className,
  limit = 10
}) => {
  const { t } = useTranslation('home');
  const displayedProducts = products.slice(0, limit);

  return (
    <section className={`py-12 md:py-18 ${className || ''}`}>
      <Container>
        {/* Section Header with direct link to the full Products page */}
        <SectionHeader
          title={t('products.title')}
          subtitle={t('products.subtitle')}
          action={
            <Link to="/products">
              <Button
                variant="outline"
                size="sm"
                className="gap-2 font-bold text-xs sm:text-sm hover:border-primary hover:text-primary dark:hover:border-primary"
              >
                <span>{t('products.viewAll')}</span>
                <span className="material-symbols-outlined text-[18px] rtl:rotate-180">
                  arrow_forward
                </span>
              </Button>
            </Link>
          }
        />

        {/* Horizontal Scrollable Products Container */}
        <HorizontalScrollContainer itemGap="md" scrollAmount={320}>
          {displayedProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              className="shrink-0 w-[265px] sm:w-[285px] md:w-[305px]"
              onOrder={onOrder}
            />
          ))}
        </HorizontalScrollContainer>
      </Container>
    </section>
  );
};

export default ProductsSection;
