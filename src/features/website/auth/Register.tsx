import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Card } from '@/components/ui/Card/Card';
import { Input } from '@/components/ui/Input/Input';
import { Button } from '@/components/ui/Button/Button';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/useToast';

export const Register: React.FC = () => {
  const { t } = useTranslation();
  const { register } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await register(formData);
      showToast(t('auth:register.success'), 'success');
      navigate('/login');
    } catch (err: unknown) {
      console.error(err);
      showToast(t('auth:register.failed'), 'error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-200px)] flex items-center justify-center px-4 py-12">
      <Card className="w-full max-w-md p-8">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-on-surface mb-2">
            {t('auth:register.title')}
          </h1>
          <p className="text-sm text-on-surface-variant">
            {t('auth:register.subtitle')}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-on-surface mb-1.5">
              {t('auth:register.fieldName')}
            </label>
            <Input
              required
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="محمد أحمد"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-on-surface mb-1.5">
              {t('auth:register.fieldEmail')}
            </label>
            <Input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="example@mail.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-on-surface mb-1.5">
              {t('auth:register.fieldPhone')}
            </label>
            <Input
              required
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              placeholder="01xxxxxxxxx"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-on-surface mb-1.5">
              {t('auth:register.fieldPassword')}
            </label>
            <Input
              required
              type="password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              placeholder="••••••••"
            />
          </div>

          <Button type="submit" disabled={isLoading} className="w-full mt-6">
            {isLoading ? t('common:loading') : t('auth:register.submit')}
          </Button>
        </form>

        <div className="mt-6 text-center text-sm text-on-surface-variant">
          {t('auth:register.hasAccount')}{' '}
          <Link to="/login" className="text-primary font-bold hover:underline">
            {t('auth:login.submit')}
          </Link>
        </div>
      </Card>
    </div>
  );
};

export default Register;
