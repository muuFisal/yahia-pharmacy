import React from 'react';
import { useTranslation } from 'react-i18next';
import { Container } from '@/components/ui/Container/Container';
import { Button } from '@/components/ui/Button/Button';
import { Card } from '@/components/ui/Card/Card';
import { Badge } from '@/components/ui/Badge/Badge';
import { PHARMACY_ABOUT_DATA } from '../../data/pharmacyData';
import { WhatsAppIcon } from '@/components/shared/WhatsAppIcon';
import { createConsultationWhatsAppUrl } from '../../utils/whatsapp';

export const AboutUsSection: React.FC = () => {
  const { t, i18n } = useTranslation('home');
  const isEn = i18n.language === 'en';

  const handleConsultClick = () => {
    const url = createConsultationWhatsAppUrl();
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const title = isEn ? PHARMACY_ABOUT_DATA.titleEn : PHARMACY_ABOUT_DATA.title;
  const subtitle = isEn ? PHARMACY_ABOUT_DATA.subtitleEn : PHARMACY_ABOUT_DATA.subtitle;
  const description = isEn ? PHARMACY_ABOUT_DATA.descriptionEn : PHARMACY_ABOUT_DATA.description;

  return (
    <section id="about-us" className="py-14 md:py-24 bg-surface-container-low/40 dark:bg-slate-900/40 border-t border-outline-variant/15 relative overflow-hidden">
      {/* Subtle Background Glow */}
      <div className="absolute top-1/2 -start-20 w-80 h-80 bg-primary/5 rounded-full blur-3xl pointer-events-none" />

      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Image Side (5 cols on lg) */}
          <div className="lg:col-span-5 order-2 lg:order-1 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Main Image Container */}
              <div className="rounded-[32px] overflow-hidden shadow-2xl border-4 border-white dark:border-slate-800 relative group">
                <img
                  src={PHARMACY_ABOUT_DATA.image}
                  alt="Yahia Pharmacy Store & Team"
                  className="w-full h-[380px] sm:h-[450px] object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

                {/* Floating Experience Badge */}
                <div className="absolute bottom-5 start-5 end-5 p-4 rounded-2xl bg-surface/95 dark:bg-slate-900/95 backdrop-blur-md border border-white/20 shadow-xl flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-xl bg-primary text-white flex items-center justify-center font-black text-base shadow-md shadow-primary/30">
                      {t('about.years')}
                    </div>
                    <div className="text-start">
                      <h4 className="font-bold text-sm text-on-surface">{t('about.yearsTitle')}</h4>
                      <p className="text-xs text-on-surface-variant">{t('about.yearsSubtitle')}</p>
                    </div>
                  </div>
                  <Badge variant="primary" className="text-xs px-2.5 py-1">
                    {t('about.pharmacyBrand')}
                  </Badge>
                </div>
              </div>

              {/* Floating Decorative Pill */}
              <div className="absolute -top-3 -end-3 bg-secondary-container text-on-secondary-container rounded-2xl px-4 py-2.5 shadow-lg font-bold text-xs items-center gap-2 border border-secondary/20 hidden sm:flex">
                <span className="material-symbols-outlined text-[18px]">verified_user</span>
                <span>{t('about.authenticBadge')}</span>
              </div>
            </div>
          </div>

          {/* Text & Content Side (7 cols on lg) */}
          <div className="lg:col-span-7 order-1 lg:order-2 flex flex-col gap-6 text-start">
            {/* Pill Header */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-primary/10 text-primary border border-primary/20 text-xs font-bold self-start">
              <span className="material-symbols-outlined text-[16px]">local_pharmacy</span>
              <span>{t('about.pill')}</span>
            </div>

            {/* Title & Subtitle */}
            <div className="space-y-3">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-on-surface leading-tight font-primary">
                {title}
              </h2>
              <p className="text-base sm:text-lg text-primary dark:text-primary-container font-semibold">
                {subtitle}
              </p>
            </div>

            {/* Description */}
            <p className="text-sm sm:text-base text-on-surface-variant leading-relaxed">
              {description}
            </p>

            {/* Key Points Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
              {PHARMACY_ABOUT_DATA.features.map((feat, idx) => {
                const featTitle = isEn && feat.titleEn ? feat.titleEn : feat.title;
                const featDesc = isEn && feat.descEn ? feat.descEn : feat.desc;
                return (
                  <Card
                    key={idx}
                    className="p-3.5 flex items-start gap-3 bg-surface/80 dark:bg-slate-900/60 border border-outline-variant/20 shadow-none hover:border-primary/30 transition-colors"
                  >
                    <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                      <span className="material-symbols-outlined text-[20px]">{feat.icon}</span>
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-on-surface">{featTitle}</h4>
                      <p className="text-xs text-on-surface-variant leading-normal mt-0.5">{featDesc}</p>
                    </div>
                  </Card>
                );
              })}
            </div>

            {/* CTA Button */}
            <div className="pt-2">
              <Button
                size="lg"
                onClick={handleConsultClick}
                className="bg-primary hover:bg-primary-container text-white border-0 shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/35 gap-2.5 font-bold transition-all duration-300 hover:scale-[1.02] group"
              >
                <WhatsAppIcon className="w-5 h-5" />
                <span>{t('about.ctaConsult')}</span>
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default AboutUsSection;
