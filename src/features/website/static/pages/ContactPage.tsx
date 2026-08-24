import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Card } from '@/components/ui/Card/Card';
import { Input } from '@/components/ui/Input/Input';
import { Button } from '@/components/ui/Button/Button';
import { useToast } from '@/hooks/useToast';

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

  return (
    <div className="max-w-3xl mx-auto px-4 py-16">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold text-on-surface mb-3">
          {t('contact.title')}
        </h1>
        <p className="text-on-surface-variant">
          {t('contact.subtitle')}
        </p>
      </div>

      <Card className="p-8">
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
