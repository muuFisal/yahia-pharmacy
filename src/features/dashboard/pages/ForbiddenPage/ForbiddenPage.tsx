import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/Button/Button';

export const ForbiddenPage: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="min-h-[400px] flex flex-col items-center justify-center text-center p-6">
      <div className="w-16 h-16 rounded-full bg-red-100 dark:bg-red-950/50 flex items-center justify-center text-red-600 dark:text-red-400 mb-4 shadow-lg shadow-red-500/10">
        <span className="material-symbols-outlined text-3xl">lock</span>
      </div>
      <h1 className="text-2xl font-bold text-on-surface mb-2">403 — {t('common:forbidden.title', 'غير مصرح بالدخول')}</h1>
      <p className="text-sm text-on-surface-variant max-w-md mb-6">
        {t('common:forbidden.desc', 'عذراً، ليس لديك الصلاحيات الكافية للوصول إلى هذه الصفحة.')}
      </p>
      <Link to="/admin/dashboard">
        <Button variant="primary">
          <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
          <span>{t('common:forbidden.backToDashboard', 'العودة للوحة التحكم')}</span>
        </Button>
      </Link>
    </div>
  );
};

export default ForbiddenPage;
