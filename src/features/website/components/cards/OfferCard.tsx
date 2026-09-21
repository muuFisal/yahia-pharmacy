import React from 'react';
import { ProductCard, type ProductCardProps } from './ProductCard';
import type { PharmacyProduct } from '../../data/pharmacyData';
import { cn } from '@/lib/cn';

export interface OfferCardProps extends Omit<ProductCardProps, 'product'> {
  offer: PharmacyProduct;
}

export const OfferCard: React.FC<OfferCardProps> = ({ offer, className, ...props }) => {
  return (
    <ProductCard
      product={offer}
      className={cn('shrink-0 w-[265px] sm:w-[285px] md:w-[305px]', className)}
      {...props}
    />
  );
};

export default OfferCard;
