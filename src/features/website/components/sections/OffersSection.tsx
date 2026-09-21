import React from 'react';
import { useTranslation } from 'react-i18next';
import { Container } from '@/components/ui/Container/Container';
import { SectionHeader } from '@/components/ui/SectionHeader/SectionHeader';
import { Badge } from '@/components/ui/Badge/Badge';
import { HorizontalScrollContainer } from '../common/HorizontalScrollContainer';
import { OfferCard } from '../cards/OfferCard';
import { PHARMACY_OFFERS, type PharmacyProduct } from '../../data/pharmacyData';

interface OffersSectionProps {
  offers?: PharmacyProduct[];
  onOrder?: (offer: PharmacyProduct) => void;
  className?: string;
}

export const OffersSection: React.FC<OffersSectionProps> = ({
  offers = PHARMACY_OFFERS,
  onOrder,
  className
}) => {
  const { t } = useTranslation('home');

  return (
    <section className={`py-12 md:py-18 bg-gradient-to-b from-secondary/5 via-surface to-transparent border-y border-outline-variant/15 ${className || ''}`}>
      <Container>
        {/* Section Header */}
        <SectionHeader
          title={t('offers.title')}
          subtitle={t('offers.subtitle')}
          action={
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="px-3 py-1 text-xs font-black shadow-sm animate-pulse">
                🔥 {t('offers.discountBadge')}
              </Badge>
            </div>
          }
        />

        {/* Horizontal Scrollable Offers Container */}
        <HorizontalScrollContainer itemGap="md" scrollAmount={360}>
          {offers.map((offer) => (
            <OfferCard
              key={offer.id}
              offer={offer}
              onOrder={onOrder}
            />
          ))}
        </HorizontalScrollContainer>
      </Container>
    </section>
  );
};

export default OffersSection;
