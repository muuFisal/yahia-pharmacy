import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Card } from '@/components/ui/Card/Card';
import { Input } from '@/components/ui/Input/Input';
import { Button } from '@/components/ui/Button/Button';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/useToast';

export const Login: React.FC = () => {
  const { t } = useTranslation();
  const { login } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ login: '', password: '' });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await login(formData);
      showToast(t('auth:login.success'), 'success');
      navigate('/');
    } catch (err: unknown) {
      console.error(err);
      showToast(t('auth:login.failed'), 'error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-200px)] flex items-center justify-center px-4 py-12">
      <Card className="w-full max-w-md p-8">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-on-surface mb-2">
            {t('auth:login.title')}
          </h1>
          <p className="text-sm text-on-surface-variant">
            {t('auth:login.subtitle')}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-on-surface mb-1.5">
              {t('auth:login.fieldEmailOrPhone')}
            </label>
            <Input
              required
              type="text"
              value={formData.login}
              onChange={(e) => setFormData({ ...formData, login: e.target.value })}
              placeholder="example@mail.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-on-surface mb-1.5">
              {t('auth:login.fieldPassword')}
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
            {isLoading ? t('common:loading') : t('auth:login.submit')}
          </Button>
        </form>

        <div className="mt-6 text-center text-sm text-on-surface-variant">
          {t('auth:login.noAccount')}{' '}
          <Link to="/register" className="text-primary font-bold hover:underline">
            {t('auth:register.submit')}
          </Link>
        </div>
      </Card>
    </div>
  );
};

export default Login;
