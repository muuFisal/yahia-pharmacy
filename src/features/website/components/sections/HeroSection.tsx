import React from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/Button/Button';
import { Badge } from '@/components/ui/Badge/Badge';
import { Container } from '@/components/ui/Container/Container';
import { WhatsAppIcon } from '@/components/shared/WhatsAppIcon';
import { createPrescriptionWhatsAppUrl, createConsultationWhatsAppUrl } from '../../utils/whatsapp';

export const HeroSection: React.FC = () => {
  const { t } = useTranslation('home');

  const handlePrescriptionClick = () => {
    const url = createPrescriptionWhatsAppUrl();
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleConsultationClick = () => {
    const url = createConsultationWhatsAppUrl();
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <section className="relative overflow-hidden pt-8 pb-14 md:pt-14 md:pb-20 bg-gradient-to-b from-primary/5 via-surface to-transparent">
      {/* Decorative Glow Elements */}
      <div className="absolute top-10 start-1/4 w-72 h-72 bg-primary/10 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-10 end-1/4 w-80 h-80 bg-secondary/10 rounded-full blur-3xl pointer-events-none -z-10" />

      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Text Content & Quick Actions (7 cols) */}
          <div className="lg:col-span-7 flex flex-col items-start text-start gap-5">
            {/* Top Pill Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 text-xs sm:text-sm font-bold animate-fade-in-up">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
              <span>{t('hero.badge')}</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-black text-on-surface leading-tight tracking-tight font-primary">
              {t('hero.titleLine1')} <br />
              <span className="text-primary dark:text-primary-container">{t('hero.titleLine2')}</span>
            </h1>

            {/* Description */}
            <p className="text-base sm:text-lg text-on-surface-variant max-w-xl leading-relaxed">
              {t('hero.subtitle')}
            </p>

            {/* Hero Quick CTA Buttons */}
            <div className="flex flex-wrap items-center gap-3.5 pt-2 w-full sm:w-auto">
              <Button
                size="lg"
                onClick={handlePrescriptionClick}
                className="bg-primary hover:bg-primary-container text-white border-0 shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/35 gap-2.5 font-bold flex-1 sm:flex-initial group"
              >
                <WhatsAppIcon className="w-5 h-5 sm:w-6 sm:h-6" />
                <span>{t('hero.ctaPrescription')}</span>
              </Button>

              <Button
                size="lg"
                variant="outline"
                onClick={handleConsultationClick}
                className="gap-2 font-bold flex-1 sm:flex-initial border-primary/30 text-primary dark:text-primary-container hover:bg-primary/5"
              >
                <span className="material-symbols-outlined text-[20px]">support_agent</span>
                <span>{t('hero.ctaConsultation')}</span>
              </Button>
            </div>

            {/* Fast Highlights Badges */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 pt-4 border-t border-outline-variant/20 w-full">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-xl sm:text-2xl shrink-0">
                  electric_moped
                </span>
                <div className="flex flex-col">
                  <span className="font-bold text-xs sm:text-sm text-on-surface">{t('hero.fastDelivery')}</span>
                  <span className="text-[10px] sm:text-xs text-on-surface-variant">{t('hero.toDoorstep')}</span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-xl sm:text-2xl shrink-0">
                  verified
                </span>
                <div className="flex flex-col">
                  <span className="font-bold text-xs sm:text-sm text-on-surface">{t('hero.authenticMeds')}</span>
                  <span className="text-[10px] sm:text-xs text-on-surface-variant">{t('hero.licensed')}</span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-xl sm:text-2xl shrink-0">
                  schedule
                </span>
                <div className="flex flex-col">
                  <span className="font-bold text-xs sm:text-sm text-on-surface">{t('hero.service247')}</span>
                  <span className="text-[10px] sm:text-xs text-on-surface-variant">{t('hero.allWeek')}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Hero Visual Card / Presentation (5 cols) */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Main Visual Image Frame */}
              <div className="rounded-[32px] overflow-hidden shadow-2xl border-4 border-white dark:border-slate-800 bg-surface relative">
                <img
                  src="https://images.unsplash.com/photo-1576602976047-174e57a47881?auto=format&fit=crop&w=800&q=80"
                  alt="Yahia Pharmacy Pharmacist"
                  className="w-full h-[360px] sm:h-[420px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                {/* Floating prescription bottom card */}
                <div className="absolute bottom-4 inset-x-4 p-4 rounded-2xl bg-surface/90 dark:bg-slate-900/90 backdrop-blur-md border border-white/20 shadow-lg text-start flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-emerald-500 text-white flex items-center justify-center shrink-0">
                      <span className="material-symbols-outlined text-[22px]">medical_services</span>
                    </div>
                    <div>
                      <p className="font-bold text-xs sm:text-sm text-on-surface">{t('hero.quickPrescriptionCard')}</p>
                      <p className="text-[11px] text-on-surface-variant">{t('hero.quickPrescriptionDesc')}</p>
                    </div>
                  </div>
                  <Badge variant="success" className="text-[10px] py-1 px-2.5 shrink-0">
                    {t('hero.availableNow')}
                  </Badge>
                </div>
              </div>

              {/* Floating Top Badge */}
              <div className="absolute -top-4 -start-4 bg-surface dark:bg-slate-900 border border-outline-variant/30 rounded-2xl p-3 shadow-xl items-center gap-2.5 backdrop-blur-sm hidden sm:flex">
                <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                  <span className="material-symbols-outlined text-[22px]">thumb_up</span>
                </div>
                <div className="text-start">
                  <div className="font-extrabold text-sm text-on-surface">{t('hero.trustedClients')}</div>
                  <div className="text-[11px] text-on-surface-variant">{t('hero.trustedClientsLabel')}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default HeroSection;
