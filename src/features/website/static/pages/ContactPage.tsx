import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Card } from '@/components/ui/Card/Card';
import { Input } from '@/components/ui/Input/Input';
import { Button } from '@/components/ui/Button/Button';
import { WhatsAppIcon } from '@/components/shared/WhatsAppIcon';
import { useToast } from '@/hooks/useToast';
import { createConsultationWhatsAppUrl } from '../../utils/whatsapp';

export const ContactPage: React.FC = () => {
  const { t } = useTranslation('static');
  const { showToast } = useToast();
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      showToast(t('contact.success'), 'success');
      setFormData({ name: '', email: '', message: '' });
    }, 800);
  };

  const handleWhatsAppContact = () => {
    const url = createConsultationWhatsAppUrl();
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-12 md:py-16">
      <div className="text-center mb-8">
        <h1 className="text-3xl sm:text-4xl font-black text-on-surface mb-3 font-primary">
          {t('contact.title')}
        </h1>
        <p className="text-sm sm:text-base text-on-surface-variant max-w-xl mx-auto">
          {t('contact.subtitle')}
        </p>
      </div>

      {/* Direct WhatsApp Instant Contact Card */}
      <div className="mb-8 p-6 rounded-2xl bg-gradient-to-r from-primary/10 via-primary/5 to-transparent border border-primary/20 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-white dark:bg-slate-800 shadow-md flex items-center justify-center shrink-0 border border-primary/10">
            <WhatsAppIcon className="w-7 h-7" />
          </div>
          <div>
            <h3 className="font-bold text-base text-on-surface">
              {t('contact.whatsappCardTitle')}
            </h3>
            <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed">
              {t('contact.whatsappCardSubtitle')}
            </p>
          </div>
        </div>

        <Button
          onClick={handleWhatsAppContact}
          size="md"
          className="bg-primary hover:bg-primary-container text-white shadow-md shadow-primary/20 hover:shadow-lg hover:shadow-primary/30 gap-2 font-bold shrink-0 w-full sm:w-auto group"
        >
          <WhatsAppIcon className="w-5 h-5" />
          <span>{t('contact.whatsappButton')}</span>
        </Button>
      </div>

      <Card className="p-6 sm:p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-on-surface mb-2">
              {t('contact.name')}
            </label>
            <Input
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder={t('contact.namePlaceholder')}
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-on-surface mb-2">
              {t('contact.email')}
            </label>
            <Input
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="example@mail.com"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-on-surface mb-2">
              {t('contact.message')}
            </label>
            <textarea
              required
              rows={4}
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              placeholder={t('contact.messagePlaceholder')}
              className="w-full px-4 py-3 rounded-xl bg-surface-container-high border border-outline-variant/30 text-on-surface placeholder:text-on-surface-variant/50 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
            />
          </div>

          <Button type="submit" disabled={isSubmitting} className="w-full">
            {isSubmitting ? t('common:loading') : t('contact.submit')}
          </Button>
        </form>
      </Card>
    </div>
  );
};

export default ContactPage;
