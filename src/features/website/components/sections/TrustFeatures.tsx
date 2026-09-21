import React from 'react';
import { useTranslation } from 'react-i18next';
import { Container } from '@/components/ui/Container/Container';
import { Card } from '@/components/ui/Card/Card';

export const TrustFeatures: React.FC = () => {
  const { t } = useTranslation('home');

  const features = [
    {
      icon: 'local_shipping',
      title: t('trust.deliveryTitle'),
      desc: t('trust.deliveryDesc')
    },
    {
      icon: 'verified_user',
      title: t('trust.authenticTitle'),
      desc: t('trust.authenticDesc')
    },
    {
      icon: 'support_agent',
      title: t('trust.pharmacistsTitle'),
      desc: t('trust.pharmacistsDesc')
    },
    {
      icon: 'chat',
      title: t('trust.whatsappTitle'),
      desc: t('trust.whatsappDesc')
    }
  ];

  return (
    <section className="py-10 md:py-14 bg-surface dark:bg-slate-900/50">
      <Container>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {features.map((feat, index) => (
            <Card
              key={index}
              hoverEffect
              className="p-5 flex flex-col items-start text-start gap-3 bg-surface/60 dark:bg-slate-900/60 border border-outline-variant/20 hover:border-primary/30"
            >
              <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary dark:text-primary-container flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-2xl">{feat.icon}</span>
              </div>
              <h3 className="font-bold text-base text-on-surface">{feat.title}</h3>
              <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed">{feat.desc}</p>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default TrustFeatures;
