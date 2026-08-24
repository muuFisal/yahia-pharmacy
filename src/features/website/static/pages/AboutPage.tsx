import React from 'react';
import { useTranslation } from 'react-i18next';
import { Card } from '@/components/ui/Card/Card';

export const AboutPage: React.FC = () => {
  const { t } = useTranslation('static');

  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h1 className="text-3xl sm:text-4xl font-bold text-on-surface mb-4">
          {t('about.title')}
        </h1>
        <p className="text-on-surface-variant max-w-xl mx-auto">
          {t('about.subtitle')}
        </p>
      </div>

      <Card className="p-8 space-y-6">
        <h2 className="text-xl font-bold text-on-surface">
          {t('about.heading')}
        </h2>
        <p className="text-on-surface-variant leading-relaxed">
          {t('about.text1')}
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
          <div className="p-4 rounded-xl bg-surface-container-high/50 border border-outline-variant/10">
            <h3 className="font-bold text-on-surface mb-1">Architecture</h3>
            <p className="text-xs text-on-surface-variant">Feature-based layout separating website and dashboard modules.</p>
          </div>
          <div className="p-4 rounded-xl bg-surface-container-high/50 border border-outline-variant/10">
            <h3 className="font-bold text-on-surface mb-1">State & Providers</h3>
            <p className="text-xs text-on-surface-variant">Context-based state management for Theme, Language, Font, and Branding.</p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default AboutPage;
