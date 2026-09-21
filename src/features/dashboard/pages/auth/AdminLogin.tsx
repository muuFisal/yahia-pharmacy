import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Card } from '@/components/ui/Card/Card';
import { Input } from '@/components/ui/Input/Input';
import { Button } from '@/components/ui/Button/Button';
import { DashboardAuthService } from '@/services/dashboard-auth.service';
import { useToast } from '@/hooks/useToast';
import { useBranding } from '@/hooks/useBranding';
import ThemeSwitcher from '@/components/layout/Navbar/ThemeSwitcher';
import LanguageSwitcher from '@/components/layout/Navbar/LanguageSwitcher';

export const AdminLogin: React.FC = () => {
  const { t } = useTranslation(['dashboard', 'common']);
  const { brandName, settings } = useBranding();
  const { showToast } = useToast();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await DashboardAuthService.login(formData);
      showToast(t('dashboard:login.success', 'مرحباً بك في لوحة التحكم'), 'success');
      navigate('/admin/dashboard', { replace: true });
    } catch (err: unknown) {
      console.error(err);
      showToast(t('dashboard:login.failed', 'فشل تسجيل الدخول، تأكد من صحة البريد وكلمة المرور'), 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickFill = () => {
    setFormData({
      email: 'admin@example.com',
      password: 'password123',
    });
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center bg-surface-container-lowest dark:bg-slate-950 p-4 transition-colors duration-300 overflow-hidden">
      {/* Decorative ambient background blobs */}
      <div className="absolute top-[-10%] right-[-5%] w-[450px] h-[450px] bg-primary/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-5%] w-[450px] h-[450px] bg-secondary/10 dark:bg-primary/5 rounded-full blur-3xl pointer-events-none" />

      {/* Top Header Actions Bar */}
      <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10 max-w-5xl mx-auto">
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-surface/80 dark:bg-slate-900/80 backdrop-blur-md border border-outline-variant/10 text-xs sm:text-sm font-medium text-on-surface-variant hover:text-primary transition-all active:scale-95 shadow-sm"
        >
          <span className="material-symbols-outlined text-[18px]">arrow_back</span>
          <span>{t('dashboard:nav.viewSite', 'زيارة الموقع العام')}</span>
        </Link>

        <div className="flex items-center gap-1 sm:gap-2 bg-surface/80 dark:bg-slate-900/80 backdrop-blur-md p-1 rounded-2xl border border-outline-variant/10 shadow-sm">
          <LanguageSwitcher />
          <ThemeSwitcher />
        </div>
      </div>

      {/* Main Login Card */}
      <Card className="w-full max-w-md p-8 shadow-2xl border border-outline-variant/10 bg-surface/90 dark:bg-slate-900/90 backdrop-blur-xl relative z-10 animate-fade-in-up">
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-2xl bg-white dark:bg-slate-800 p-2 border border-outline-variant/20 flex items-center justify-center mx-auto mb-4 shadow-lg shadow-primary/15">
            <img
              src={settings?.logo || '/logo-icon.png'}
              alt={brandName}
              className="w-12 h-12 object-contain"
              onError={(e) => {
                (e.target as HTMLImageElement).src = '/logo-icon.png';
              }}
            />
          </div>
          <h1 className="text-2xl font-bold font-primary text-on-surface mb-2">
            {t('dashboard:login.title', 'تسجيل دخول الإدارة')}
          </h1>
          <p className="text-xs text-on-surface-variant">
            {brandName} — {t('dashboard:login.subtitle', 'لوحة التحكم المركزية')}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-on-surface mb-1.5">
              {t('dashboard:login.email', 'البريد الإلكتروني')}
            </label>
            <Input
              required
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="admin@domain.com"
              className="w-full"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-on-surface mb-1.5">
              {t('dashboard:login.password', 'كلمة المرور')}
            </label>
            <Input
              required
              type="password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              placeholder="••••••••"
              className="w-full"
            />
          </div>

          <Button type="submit" disabled={isLoading} className="w-full mt-6 shadow-lg shadow-primary/20">
            {isLoading ? (
              <span className="flex items-center gap-2 justify-center">
                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>{t('common:loading', 'جاري التحقق...')}</span>
              </span>
            ) : (
              t('dashboard:login.submit', 'دخول لوحة التحكم')
            )}
          </Button>

          {/* Quick autofill helper in development */}
          <div className="pt-3 border-t border-outline-variant/10 text-center">
            <button
              type="button"
              onClick={handleQuickFill}
              className="text-xs text-primary dark:text-primary-container hover:underline transition-colors"
            >
              ملء بيانات تجريبية (Demo Login)
            </button>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default AdminLogin;
