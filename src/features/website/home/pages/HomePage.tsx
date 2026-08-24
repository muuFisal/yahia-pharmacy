import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useBranding } from '@/hooks/useBranding';
import { Button } from '@/components/ui/Button/Button';
import { Card } from '@/components/ui/Card/Card';

export const HomePage: React.FC = () => {
  const { t } = useTranslation();
  const { brandName } = useBranding();

  const features = [
    {
      icon: 'palette',
      title: t('home.features.theme.title', 'تصميم متكامل وثيمات قابلة للتخصيص'),
      desc: t('home.features.theme.desc', 'ألوان، خطوط، وأنماط CSS Variables موحدة وقابلة للتغيير من ملف واحد أو لوحة التحكم مباشرة.'),
    },
    {
      icon: 'security',
      title: t('home.features.security.title', 'نظام صلاحيات وحماية متقدم'),
      desc: t('home.features.security.desc', 'صلاحيات دقيقة RBAC، وتخزين مشفر AES، وتأمين للروابط والصفحات الحساسة.'),
    },
    {
      icon: 'speed',
      title: t('home.features.perf.title', 'أداء فائق وسرعة تحميل'),
      desc: t('home.features.perf.desc', 'تقسيم تلقائي للكود Code-splitting وLazy Loading لكل الصفحات لتجربة تصفح سلسة وسريعة.'),
    },
    {
      icon: 'language',
      title: t('home.features.i18n.title', 'دعم كامل للغتين العربية والإنجليزية'),
      desc: t('home.features.i18n.desc', 'نظام ترجمة متقدم مع دعم كامل لاتجاه RTL و LTR وتغيير فوري للغة بدون إعادة تحميل.'),
    },
    {
      icon: 'dashboard',
      title: t('home.features.dashboard.title', 'لوحة تحكم إدارية احترافية'),
      desc: t('home.features.dashboard.desc', 'لوحة إدارة متجاوبة بوضع نهاري وليلي مع إمكانية تصغير وتوسيع القائمة الجانبية.'),
    },
    {
      icon: 'api',
      title: t('home.features.api.title', 'بنية API و Axios متطورة'),
      desc: t('home.features.api.desc', 'اعتراض تلقائي للطلبات، معالجة الأخطاء والتنبهيات، وإدارة الكاش المتقدمة.'),
    },
  ];

  return (
    <div className="flex flex-col min-h-[calc(100vh-140px)]">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-20 md:pt-20 md:pb-28 bg-gradient-to-b from-primary/5 via-transparent to-transparent">
        <div className="max-w-container-max mx-auto px-4 md:px-margin-desktop text-center flex flex-col items-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-6 border border-primary/20 animate-fade-in-up">
            <span className="material-symbols-outlined text-[18px]">verified</span>
            <span>{t('home.hero.badge', 'React Base Project 1.0')}</span>
          </div>

          {/* Title */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold font-primary tracking-tight text-on-surface max-w-3xl leading-tight mb-6">
            {t('home.hero.title', 'أساس احترافي متكامل لبناء مشاريع React الحديثة')}
          </h1>

          {/* Subtitle */}
          <p className="text-lg sm:text-xl text-on-surface-variant max-w-2xl leading-relaxed mb-8">
            {t('home.hero.subtitle', `تم بناء هذا القالب ليوفر لك هيكل عملي ونظيف مستوحى من أفضل الممارسات وتصميم ${brandName} الجذاب.`)}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link to="/admin/login">
              <Button size="lg" className="shadow-lg shadow-primary/25">
                <span className="material-symbols-outlined text-[20px]">dashboard</span>
                <span>{t('home.hero.ctaDashboard', 'لوحة التحكم الإدارية')}</span>
              </Button>
            </Link>
            <Link to="/about">
              <Button size="lg" variant="outline">
                <span className="material-symbols-outlined text-[20px]">info</span>
                <span>{t('home.hero.ctaAbout', 'تعرف على القالب')}</span>
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16 md:py-24 bg-surface-container-low/50 dark:bg-slate-900/30">
        <div className="max-w-container-max mx-auto px-4 md:px-margin-desktop">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-on-surface mb-4">
              {t('home.features.sectionTitle', 'كل ما تحتاجه للبدء في مشروعك القادم')}
            </h2>
            <p className="text-on-surface-variant">
              {t('home.features.sectionSubtitle', 'مكونات جاهزة، إدارة حالة متكاملة، ونظام تصميم موحد يوفر عليك مئات الساعات.')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, idx) => (
              <Card key={idx} className="p-6 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mb-4">
                  <span className="material-symbols-outlined text-2xl">{feature.icon}</span>
                </div>
                <h3 className="text-lg font-bold text-on-surface mb-2">{feature.title}</h3>
                <p className="text-sm text-on-surface-variant leading-relaxed">{feature.desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
