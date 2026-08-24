import React from 'react';
import { useTranslation } from 'react-i18next';
import { Card } from '@/components/ui/Card/Card';
import { useDashboard } from '../../context/DashboardContext';

export const DashboardOverview: React.FC = () => {
  const { t } = useTranslation();
  const { adminProfile } = useDashboard();

  const stats = [
    {
      title: t('dashboard:stats.users', 'إجمالي المستخدمين'),
      value: '1,248',
      change: '+12%',
      isPositive: true,
      icon: 'group',
      color: 'bg-blue-500/10 text-blue-600 dark:text-blue-400',
    },
    {
      title: t('dashboard:stats.visits', 'الزيارات اليومية'),
      value: '8,430',
      change: '+25%',
      isPositive: true,
      icon: 'trending_up',
      color: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400',
    },
    {
      title: t('dashboard:stats.activeSessions', 'الجلسات النشطة'),
      value: '312',
      change: '-4%',
      isPositive: false,
      icon: 'devices',
      color: 'bg-amber-500/10 text-amber-600 dark:text-amber-400',
    },
    {
      title: t('dashboard:stats.conversion', 'معدل التحويل'),
      value: '4.8%',
      change: '+0.6%',
      isPositive: true,
      icon: 'insights',
      color: 'bg-purple-500/10 text-purple-600 dark:text-purple-400',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-6 rounded-2xl bg-gradient-to-r from-primary to-primary/80 text-white shadow-xl shadow-primary/20">
        <div>
          <h1 className="text-2xl font-bold font-primary mb-1">
            {t('dashboard:welcome', 'مرحباً،')} {adminProfile?.nameAr || 'Admin'} 👋
          </h1>
          <p className="text-white/80 text-sm">
            {t('dashboard:welcomeSubtitle', 'إليك ملخص أداء النظام والإحصائيات الحالية.')}
          </p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {stats.map((stat, idx) => (
          <Card key={idx} className="p-5 flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-on-surface-variant mb-1">{stat.title}</p>
              <h3 className="text-2xl font-bold text-on-surface mb-1">{stat.value}</h3>
              <div className="flex items-center gap-1 text-xs">
                <span className={stat.isPositive ? 'text-emerald-600 dark:text-emerald-400 font-bold' : 'text-red-600 dark:text-red-400 font-bold'}>
                  {stat.change}
                </span>
                <span className="text-on-surface-variant/70">{t('dashboard:stats.vsLastMonth', 'مقارنة بالشهر السابق')}</span>
              </div>
            </div>
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 ${stat.color}`}>
              <span className="material-symbols-outlined text-[24px]">{stat.icon}</span>
            </div>
          </Card>
        ))}
      </div>

      {/* Placeholder Content Section */}
      <Card className="p-6">
        <h3 className="text-lg font-bold text-on-surface mb-4">
          {t('dashboard:overview.sectionTitle', 'النشاط الأخير')}
        </h3>
        <div className="flex flex-col items-center justify-center py-12 text-center text-on-surface-variant">
          <div className="w-16 h-16 rounded-full bg-surface-container-high flex items-center justify-center mb-3 text-on-surface-variant">
            <span className="material-symbols-outlined text-3xl">query_stats</span>
          </div>
          <p className="font-medium text-on-surface">{t('dashboard:overview.readyMessage', 'اللوحة جاهزة لإضافة وحداتك البرمجية')}</p>
          <p className="text-xs text-on-surface-variant max-w-sm mt-1">
            {t('dashboard:overview.readyDesc', 'يمكنك بسهولة إضافة الجداول والرسوم البيانية وتوسيع أقسام لوحة التحكم.')}
          </p>
        </div>
      </Card>
    </div>
  );
};

export default DashboardOverview;
