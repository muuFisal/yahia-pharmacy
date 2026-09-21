import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Container } from '@/components/ui/Container/Container';
import { SectionHeader } from '@/components/ui/SectionHeader/SectionHeader';
import { Button } from '@/components/ui/Button/Button';
import { HorizontalScrollContainer } from '../common/HorizontalScrollContainer';
import { CategoryCard } from '../cards/CategoryCard';
import { PHARMACY_CATEGORIES, type PharmacyCategory } from '../../data/pharmacyData';

interface CategoriesSectionProps {
  categories?: PharmacyCategory[];
  onCategorySelect?: (category: PharmacyCategory) => void;
  className?: string;
}

export const CategoriesSection: React.FC<CategoriesSectionProps> = ({
  categories = PHARMACY_CATEGORIES,
  onCategorySelect,
  className
}) => {
  const navigate = useNavigate();
  const { t } = useTranslation('home');

  const handleSelect = (category: PharmacyCategory) => {
    if (onCategorySelect) {
      onCategorySelect(category);
    } else {
      navigate('/products');
    }
  };

  return (
    <section className={`py-10 md:py-16 ${className || ''}`}>
      <Container>
        {/* Section Header */}
        <SectionHeader
          title={t('categories.title')}
          subtitle={t('categories.subtitle')}
          action={
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigate('/products')}
              className="gap-2 text-xs sm:text-sm font-bold hover:border-primary hover:text-primary dark:hover:border-primary"
            >
              <span>{t('categories.allCategories')}</span>
              <span className="material-symbols-outlined text-[18px] rtl:rotate-180">
                arrow_forward
              </span>
            </Button>
          }
        />

        {/* Horizontal Scrollable Circular Categories */}
        <div className="py-2">
          <HorizontalScrollContainer itemGap="lg" scrollAmount={300}>
            {categories.map((category) => (
              <CategoryCard
                key={category.id}
                category={category}
                onClick={handleSelect}
              />
            ))}
          </HorizontalScrollContainer>
        </div>
      </Container>
    </section>
  );
};

export default CategoriesSection;
