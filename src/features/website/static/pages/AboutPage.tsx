import React from 'react';
import { AboutUsSection } from '../../components/sections/AboutUsSection';
import { TrustFeatures } from '../../components/sections/TrustFeatures';
import { PrescriptionBanner } from '../../components/sections/PrescriptionBanner';

export const AboutPage: React.FC = () => {
  return (
    <div className="py-4 space-y-6">
      <AboutUsSection />
      <TrustFeatures />
      <PrescriptionBanner />
    </div>
  );
};

export default AboutPage;
