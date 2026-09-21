import React from 'react';
import { useTranslation } from 'react-i18next';
import { Container } from '@/components/ui/Container/Container';
import { Button } from '@/components/ui/Button/Button';
import { WhatsAppIcon } from '@/components/shared/WhatsAppIcon';
import { createPrescriptionWhatsAppUrl } from '../../utils/whatsapp';

export const PrescriptionBanner: React.FC = () => {
  const { t } = useTranslation('home');

  const handleSendPrescription = () => {
    const url = createPrescriptionWhatsAppUrl();
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <section className="py-8 md:py-12">
      <Container>
        <div className="relative rounded-[32px] overflow-hidden bg-gradient-to-r from-primary to-primary-container text-white p-6 sm:p-10 md:p-12 shadow-xl shadow-primary/20">
          {/* Decorative Patterns */}
          <div className="absolute top-0 end-0 w-80 h-80 bg-white/10 rounded-full blur-2xl pointer-events-none -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 start-0 w-60 h-60 bg-black/10 rounded-full blur-xl pointer-events-none translate-y-1/2 -translate-x-1/2" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Text details (8 cols) */}
            <div className="lg:col-span-8 flex flex-col gap-3 text-start">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 backdrop-blur-md text-white text-xs font-bold self-start border border-white/20">
                <span className="material-symbols-outlined text-[16px]">receipt_long</span>
                <span>{t('prescription.pill')}</span>
              </div>

              <h3 className="text-2xl sm:text-3xl md:text-4xl font-extrabold leading-tight">
                {t('prescription.title')}
              </h3>

              <p className="text-sm sm:text-base text-white/90 max-w-2xl leading-relaxed">
                {t('prescription.subtitle')}
              </p>

              <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm text-white/80 pt-2 font-medium">
                <span className="flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[18px]">check_circle</span>
                  {t('prescription.check1')}
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[18px]">check_circle</span>
                  {t('prescription.check2')}
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[18px]">check_circle</span>
                  {t('prescription.check3')}
                </span>
              </div>
            </div>

            {/* CTA Button (4 cols) */}
            <div className="lg:col-span-4 flex flex-col items-start lg:items-end justify-center">
              <Button
                size="lg"
                onClick={handleSendPrescription}
                className="bg-white hover:bg-slate-50 text-slate-900 border-0 shadow-2xl shadow-black/20 hover:scale-105 transition-all duration-300 gap-2.5 font-bold text-base w-full sm:w-auto group"
              >
                <WhatsAppIcon className="w-6 h-6" />
                <span>{t('prescription.cta')}</span>
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default PrescriptionBanner;
