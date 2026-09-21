import React from 'react';
import {
  HeroSection,
  CategoriesSection,
  OffersSection,
  ProductsSection,
  PrescriptionBanner,
  AboutUsSection,
  TrustFeatures
} from '../../components';

export const HomePage: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* 1. Hero Welcome Section */}
      <HeroSection />

      {/* 2. Pharmacy Categories Section (Horizontal Scrollable) */}
      <CategoriesSection />

      {/* 3. Special Offers & Discounts Section (Horizontal Scrollable) */}
      <OffersSection />

      {/* 4. Instant Prescription Upload via WhatsApp Banner */}
      <PrescriptionBanner />

      {/* 5. Regular Pharmacy & Health Products Section (Horizontal Scrollable) */}
      <ProductsSection />

      {/* 6. About Yahia Pharmacy Section (Side Image + Title + Description) */}
      <AboutUsSection />

      {/* 7. Pharmacy Trust & Quality Pillars */}
      <TrustFeatures />
    </div>
  );
};

export default HomePage;
