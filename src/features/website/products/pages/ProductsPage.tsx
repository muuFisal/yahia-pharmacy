import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Container } from '@/components/ui/Container/Container';
import { Button } from '@/components/ui/Button/Button';
import { Card } from '@/components/ui/Card/Card';
import { Badge } from '@/components/ui/Badge/Badge';
import { Input } from '@/components/ui/Input/Input';
import { ProductCard } from '../../components/cards/ProductCard';
import { WhatsAppIcon } from '@/components/shared/WhatsAppIcon';
import { createPrescriptionWhatsAppUrl } from '../../utils/whatsapp';
import {
  PHARMACY_REGULAR_PRODUCTS,
  PHARMACY_OFFERS,
  PHARMACY_CATEGORIES
} from '../../data/pharmacyData';
import { cn } from '@/lib/cn';

type SortOption = 'popular' | 'price-asc' | 'price-desc' | 'rating';

export const ProductsPage: React.FC = () => {
  const { t, i18n } = useTranslation('products');
  const isEn = i18n.language === 'en';

  // Combine regular products and offer products for full catalog
  const allCatalogProducts = useMemo(() => {
    return [...PHARMACY_OFFERS, ...PHARMACY_REGULAR_PRODUCTS];
  }, []);

  // Filter States
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedDosageForm, setSelectedDosageForm] = useState<string>('all');
  const [selectedPrescription, setSelectedPrescription] = useState<'all' | 'otc' | 'rx'>('all');
  const [selectedTargetGroup, setSelectedTargetGroup] = useState<string>('all');
  const [onlyOffers, setOnlyOffers] = useState<boolean>(false);
  const [maxPrice, setMaxPrice] = useState<number>(1500);
  const [sortBy, setSortBy] = useState<SortOption>('popular');

  // Mobile Filter Drawer Toggle
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  // Lock body scroll when mobile filter drawer is open
  React.useEffect(() => {
    if (isMobileFilterOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileFilterOpen]);

  // Dosage Forms List
  const dosageForms = [
    'أقراص وكبسولات',
    'شراب وسوائل',
    'كريم ومرهم',
    'قطرات وبخاخ',
    'أجهزة ومستلزمات',
    'مكملات غذائية'
  ];

  // Target Groups List
  const targetGroups = ['الجميع', 'كبار', 'أطفال', 'رضع'];

  // Reset all filters
  const handleResetFilters = () => {
    setSearchTerm('');
    setSelectedCategory('all');
    setSelectedDosageForm('all');
    setSelectedPrescription('all');
    setSelectedTargetGroup('all');
    setOnlyOffers(false);
    setMaxPrice(1500);
    setSortBy('popular');
  };

  // Check active filter count
  const activeFiltersCount = useMemo(() => {
    let count = 0;
    if (searchTerm) count++;
    if (selectedCategory !== 'all') count++;
    if (selectedDosageForm !== 'all') count++;
    if (selectedPrescription !== 'all') count++;
    if (selectedTargetGroup !== 'all') count++;
    if (onlyOffers) count++;
    if (maxPrice < 1500) count++;
    return count;
  }, [
    searchTerm,
    selectedCategory,
    selectedDosageForm,
    selectedPrescription,
    selectedTargetGroup,
    onlyOffers,
    maxPrice
  ]);

  // Filter and Sort Logic
  const filteredProducts = useMemo(() => {
    return allCatalogProducts
      .filter((item) => {
        // 1. Search filter
        if (searchTerm.trim()) {
          const query = searchTerm.toLowerCase().trim();
          const matchName = item.name.toLowerCase().includes(query);
          const matchBrand = item.brand?.toLowerCase().includes(query);
          const matchCategory = item.category.toLowerCase().includes(query);
          const matchIngredient = item.activeIngredient?.toLowerCase().includes(query);
          if (!matchName && !matchBrand && !matchCategory && !matchIngredient) {
            return false;
          }
        }

        // 2. Category filter
        if (selectedCategory !== 'all' && item.category !== selectedCategory) {
          return false;
        }

        // 3. Dosage form filter
        if (selectedDosageForm !== 'all' && item.dosageForm !== selectedDosageForm) {
          return false;
        }

        // 4. Prescription filter
        if (selectedPrescription === 'otc' && item.requiresPrescription === true) {
          return false;
        }
        if (selectedPrescription === 'rx' && item.requiresPrescription !== true) {
          return false;
        }

        // 5. Target group filter
        if (
          selectedTargetGroup !== 'all' &&
          item.targetGroup &&
          item.targetGroup !== selectedTargetGroup &&
          item.targetGroup !== 'الجميع'
        ) {
          return false;
        }

        // 6. Only offers
        if (onlyOffers && !item.originalPrice) {
          return false;
        }

        // 7. Max price filter
        if (item.price > maxPrice) {
          return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price-asc') return a.price - b.price;
        if (sortBy === 'price-desc') return b.price - a.price;
        if (sortBy === 'rating') return (b.rating || 0) - (a.rating || 0);
        // Default: popular
        return (b.reviewCount || 0) - (a.reviewCount || 0);
      });
  }, [
    allCatalogProducts,
    searchTerm,
    selectedCategory,
    selectedDosageForm,
    selectedPrescription,
    selectedTargetGroup,
    onlyOffers,
    maxPrice,
    sortBy
  ]);

  // Render Sidebar / Drawer Filter Controls
  const renderSidebarFilters = () => (
    <div className="flex flex-col gap-5 text-start">
      {/* Search Input in Filters */}
      <div className="space-y-2">
        <label className="text-xs font-bold text-on-surface uppercase tracking-wider flex items-center gap-1.5">
          <span className="material-symbols-outlined text-[16px] text-primary">search</span>
          {t('filters.searchLabel')}
        </label>
        <div className="relative">
          <Input
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder={t('searchPlaceholder')}
            className="text-xs sm:text-sm pe-8"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="absolute end-2.5 top-1/2 -translate-y-1/2 text-on-surface-variant hover:text-on-surface p-1"
            >
              <span className="material-symbols-outlined text-[16px]">close</span>
            </button>
          )}
        </div>
      </div>

      {/* 1. Prescription Type Filter (Rx vs OTC) */}
      <div className="space-y-2.5 pt-3 border-t border-outline-variant/15">
        <label className="text-xs font-bold text-on-surface uppercase tracking-wider flex items-center gap-1.5">
          <span className="material-symbols-outlined text-[16px] text-primary">clinical_notes</span>
          {t('filters.prescription')}
        </label>
        <div className="grid grid-cols-3 gap-1.5 p-1 bg-surface-container-high/40 rounded-xl">
          <button
            onClick={() => setSelectedPrescription('all')}
            className={cn(
              'py-1.5 text-xs font-bold rounded-lg transition-all',
              selectedPrescription === 'all'
                ? 'bg-surface dark:bg-slate-800 text-primary shadow-sm'
                : 'text-on-surface-variant hover:text-on-surface'
            )}
          >
            {t('filters.all')}
          </button>
          <button
            onClick={() => setSelectedPrescription('otc')}
            className={cn(
              'py-1.5 text-xs font-bold rounded-lg transition-all',
              selectedPrescription === 'otc'
                ? 'bg-surface dark:bg-slate-800 text-primary shadow-sm'
                : 'text-on-surface-variant hover:text-on-surface'
            )}
          >
            {t('filters.otc')}
          </button>
          <button
            onClick={() => setSelectedPrescription('rx')}
            className={cn(
              'py-1.5 text-xs font-bold rounded-lg transition-all',
              selectedPrescription === 'rx'
                ? 'bg-surface dark:bg-slate-800 text-primary shadow-sm'
                : 'text-on-surface-variant hover:text-on-surface'
            )}
          >
            {t('filters.rx')}
          </button>
        </div>
      </div>

      {/* 2. Dosage Form Filter */}
      <div className="space-y-2.5 pt-3 border-t border-outline-variant/15">
        <label className="text-xs font-bold text-on-surface uppercase tracking-wider flex items-center justify-between">
          <span>{t('filters.dosageForm')}</span>
          {selectedDosageForm !== 'all' && (
            <button
              onClick={() => setSelectedDosageForm('all')}
              className="text-[11px] text-primary hover:underline font-normal"
            >
              {t('filters.all')}
            </button>
          )}
        </label>
        <div className="flex flex-wrap gap-1.5">
          <button
            onClick={() => setSelectedDosageForm('all')}
            className={cn(
              'px-2.5 py-1 rounded-lg text-xs font-medium transition-colors border',
              selectedDosageForm === 'all'
                ? 'bg-primary text-white border-primary font-bold'
                : 'bg-surface dark:bg-slate-800 text-on-surface-variant border-outline-variant/20 hover:border-primary/40'
            )}
          >
            {t('filters.all')}
          </button>
          {dosageForms.map((form) => {
            const formLabel = t(`dosageForms.${form}`, form);
            return (
              <button
                key={form}
                onClick={() => setSelectedDosageForm(form)}
                className={cn(
                  'px-2.5 py-1 rounded-lg text-xs font-medium transition-colors border',
                  selectedDosageForm === form
                    ? 'bg-primary text-white border-primary font-bold'
                    : 'bg-surface dark:bg-slate-800 text-on-surface-variant border-outline-variant/20 hover:border-primary/40'
                )}
              >
                {formLabel}
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. Target Group Filter */}
      <div className="space-y-2.5 pt-3 border-t border-outline-variant/15">
        <label className="text-xs font-bold text-on-surface uppercase tracking-wider">
          {t('filters.targetGroup')}
        </label>
        <div className="flex flex-wrap gap-1.5">
          {['الكل', ...targetGroups].map((grp) => {
            const val = grp === 'الكل' ? 'all' : grp;
            const label = grp === 'الكل' ? t('filters.all') : t(`targetGroups.${grp}`, grp);
            return (
              <button
                key={grp}
                onClick={() => setSelectedTargetGroup(val)}
                className={cn(
                  'px-3 py-1 rounded-lg text-xs font-medium transition-colors border',
                  selectedTargetGroup === val
                    ? 'bg-primary text-white border-primary font-bold'
                    : 'bg-surface dark:bg-slate-800 text-on-surface-variant border-outline-variant/20 hover:border-primary/40'
                )}
              >
                {label}
              </button>
            );
          })}
        </div>
      </div>

      {/* 4. Offers Only Checkbox */}
      <div className="pt-3 border-t border-outline-variant/15">
        <label className="flex items-center gap-2.5 cursor-pointer select-none">
          <input
            type="checkbox"
            checked={onlyOffers}
            onChange={(e) => setOnlyOffers(e.target.checked)}
            className="w-4 h-4 rounded text-primary focus:ring-primary border-outline-variant"
          />
          <span className="text-xs sm:text-sm font-bold text-on-surface flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[18px] text-red-500">local_fire_department</span>
            {t('filters.onlyOffers')}
          </span>
        </label>
      </div>

      {/* 5. Max Price Range Slider */}
      <div className="space-y-2.5 pt-3 border-t border-outline-variant/15">
        <div className="flex items-center justify-between text-xs font-bold text-on-surface">
          <span>{t('filters.maxPrice')}</span>
          <span className="text-primary font-black">{maxPrice} {t('currency')}</span>
        </div>
        <input
          type="range"
          min="40"
          max="1500"
          step="10"
          value={maxPrice}
          onChange={(e) => setMaxPrice(Number(e.target.value))}
          className="w-full accent-primary cursor-pointer"
        />
        <div className="flex justify-between text-[10px] text-on-surface-variant">
          <span>40 {t('currency')}</span>
          <span>1500 {t('currency')}</span>
        </div>
      </div>

      {/* Reset Filters Button */}
      {activeFiltersCount > 0 && (
        <Button
          variant="outline"
          onClick={handleResetFilters}
          className="w-full gap-2 text-xs py-2 mt-1 text-error border-error/20 hover:bg-error/10 hover:border-error"
        >
          <span className="material-symbols-outlined text-[16px]">restart_alt</span>
          {t('filters.reset')} ({activeFiltersCount})
        </Button>
      )}
    </div>
  );

  return (
    <div className="min-h-screen py-6 md:py-10 bg-background text-on-surface">
      <Container className="max-w-[1400px]">
        {/* Breadcrumb & Top Page Title */}
        <div className="mb-6 text-start">
          <div className="flex items-center gap-2 text-xs text-on-surface-variant mb-2">
            <Link to="/" className="hover:text-primary transition-colors">
              {isEn ? 'Home' : 'الرئيسية'}
            </Link>
            <span>/</span>
            <span className="text-primary font-bold">{t('title')}</span>
          </div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-black font-primary text-on-surface mb-2">
                {t('title')} 💊
              </h1>
              <p className="text-xs sm:text-sm text-on-surface-variant max-w-2xl leading-relaxed">
                {t('subtitle')}
              </p>
            </div>

            {/* Quick WhatsApp Prescription Button */}
            <Button
              size="sm"
              onClick={() => {
                const url = createPrescriptionWhatsAppUrl();
                window.open(url, '_blank', 'noopener,noreferrer');
              }}
              className="bg-primary hover:bg-primary-container text-white shadow-md shadow-primary/20 hover:shadow-lg hover:shadow-primary/30 gap-2 text-xs font-bold shrink-0 transition-all duration-300 group"
            >
              <WhatsAppIcon className="w-4 h-4" />
              <span>{t('prescriptionCta')}</span>
            </Button>
          </div>
        </div>

        {/* ── Horizontal Categories Bar ── */}
        <div className="mb-6 bg-surface dark:bg-slate-900 border border-outline-variant/20 rounded-2xl p-2.5 sm:p-3 shadow-sm">
          <div className="flex items-center justify-between gap-2 mb-2 px-1">
            <span className="text-xs font-bold text-on-surface flex items-center gap-1.5">
              <span className="material-symbols-outlined text-primary text-[18px]">category</span>
              {t('filters.category')}
            </span>
            {selectedCategory !== 'all' && (
              <button
                onClick={() => setSelectedCategory('all')}
                className="text-[11px] text-primary hover:underline font-bold"
              >
                {t('filters.all')} ({allCatalogProducts.length})
              </button>
            )}
          </div>

          {/* Horizontal Scrollable Row for Categories */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1.5 pt-0.5 px-0.5 select-none [&::-webkit-scrollbar]:h-1.5 [&::-webkit-scrollbar-thumb]:bg-outline-variant/30 [&::-webkit-scrollbar-thumb]:rounded-full">
            {/* All Categories Pill */}
            <button
              onClick={() => setSelectedCategory('all')}
              className={cn(
                'flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all duration-200 shrink-0 cursor-pointer',
                selectedCategory === 'all'
                  ? 'bg-primary text-white shadow-md shadow-primary/25 scale-[1.02]'
                  : 'bg-surface-container-high/60 dark:bg-slate-800 text-on-surface-variant hover:bg-primary/10 hover:text-primary'
              )}
            >
              <span className="material-symbols-outlined text-[18px]">grid_view</span>
              <span>{t('filters.all')}</span>
              <span className={cn(
                'px-1.5 py-0.2 rounded-md text-[11px]',
                selectedCategory === 'all' ? 'bg-white/20 text-white' : 'bg-black/5 dark:bg-white/10'
              )}>
                {allCatalogProducts.length}
              </span>
            </button>

            {/* Category Pills */}
            {PHARMACY_CATEGORIES.map((cat) => {
              const count = allCatalogProducts.filter((p) => p.category === cat.name).length;
              const isSelected = selectedCategory === cat.name;
              const catName = isEn ? (cat.nameEn || cat.name) : cat.name;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.name)}
                  className={cn(
                    'flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all duration-200 shrink-0 cursor-pointer border',
                    isSelected
                      ? 'bg-primary text-white border-primary shadow-md shadow-primary/25 scale-[1.02]'
                      : 'bg-surface-container-low/80 dark:bg-slate-800/80 text-on-surface-variant border-outline-variant/20 hover:border-primary/40 hover:text-primary hover:bg-primary/5'
                  )}
                >
                  <span className="material-symbols-outlined text-[18px]">{cat.iconName}</span>
                  <span>{catName}</span>
                  <span className={cn(
                    'px-1.5 py-0.2 rounded-md text-[11px]',
                    isSelected ? 'bg-white/20 text-white' : 'bg-black/5 dark:bg-white/10 text-on-surface-variant'
                  )}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Main Content Layout (Sidebar Filters + Products Grid) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
          {/* Desktop Filter Sidebar (3 cols) */}
          <aside className="hidden lg:block lg:col-span-3 sticky top-24 min-w-0">
            <Card className="p-5 bg-surface dark:bg-slate-900 border border-outline-variant/30 shadow-sm">
              <div className="flex items-center justify-between pb-3 mb-4 border-b border-outline-variant/15">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary text-[20px]">tune</span>
                  <h3 className="font-bold text-sm text-on-surface">{t('filters.title')}</h3>
                </div>
                {activeFiltersCount > 0 && (
                  <Badge variant="primary" className="text-[10px] px-2 py-0.5">
                    {activeFiltersCount} {t('filters.activeFilters')}
                  </Badge>
                )}
              </div>
              {renderSidebarFilters()}
            </Card>
          </aside>

          {/* Mobile Filter Button & Products Listing (9 cols) */}
          <main className="lg:col-span-9 flex flex-col gap-6 min-w-0">
            {/* Top Bar: Active count, Sort Dropdown & Mobile Filter Button */}
            <div className="flex flex-wrap items-center justify-between gap-3 p-3.5 rounded-2xl bg-surface dark:bg-slate-900 border border-outline-variant/20">
              {/* Left/Start: Total Results count & Active Category info */}
              <div className="flex items-center gap-2 text-xs sm:text-sm font-bold text-on-surface">
                <span>{t('results')}:</span>
                <span className="px-2.5 py-0.5 rounded-lg bg-primary/10 text-primary font-black">
                  {filteredProducts.length} {t('itemsFound')}
                </span>
                {selectedCategory !== 'all' && (
                  <span className="text-xs text-on-surface-variant font-normal hidden sm:inline">
                    ({isEn ? 'In: ' : 'في قسم: '}<strong className="text-on-surface font-bold">
                      {isEn ? (PHARMACY_CATEGORIES.find(c => c.name === selectedCategory)?.nameEn || selectedCategory) : selectedCategory}
                    </strong>)
                  </span>
                )}
              </div>

              {/* Right/End: Sort & Mobile Filter Toggle */}
              <div className="flex items-center gap-2.5 flex-1 justify-end">
                {/* Sort dropdown */}
                <div className="flex items-center gap-1.5">
                  <span className="text-xs text-on-surface-variant hidden sm:inline">{t('sort.label')}:</span>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as SortOption)}
                    className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-surface-container-high/60 dark:bg-slate-800 text-on-surface border border-outline-variant/30 focus:outline-none focus:border-primary cursor-pointer"
                  >
                    <option value="popular">{t('sort.popular')}</option>
                    <option value="price-asc">{t('sort.priceAsc')}</option>
                    <option value="price-desc">{t('sort.priceDesc')}</option>
                    <option value="rating">{t('sort.rating')}</option>
                  </select>
                </div>

                {/* Mobile Filter Open Button */}
                <button
                  type="button"
                  onClick={() => setIsMobileFilterOpen(true)}
                  className="lg:hidden flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-primary text-white text-xs font-bold shadow-md shadow-primary/20"
                >
                  <span className="material-symbols-outlined text-[16px]">tune</span>
                  <span>{t('filters.title')}</span>
                  {activeFiltersCount > 0 && (
                    <span className="w-4 h-4 rounded-full bg-white text-primary text-[10px] flex items-center justify-center font-black">
                      {activeFiltersCount}
                    </span>
                  )}
                </button>
              </div>
            </div>

            {/* Products Grid */}
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-5 lg:gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} className="w-full h-full" />
                ))}
              </div>
            ) : (
              /* Empty State when no products match */
              <Card className="p-12 text-center flex flex-col items-center justify-center gap-4 bg-surface dark:bg-slate-900 border-dashed">
                <div className="w-16 h-16 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                  <span className="material-symbols-outlined text-3xl">search_off</span>
                </div>
                <div className="space-y-1">
                  <h3 className="text-lg font-bold text-on-surface">{t('empty.title')}</h3>
                  <p className="text-xs sm:text-sm text-on-surface-variant max-w-md">
                    {t('empty.desc')}
                  </p>
                </div>
                <Button onClick={handleResetFilters} variant="primary" size="sm" className="gap-2 mt-2">
                  <span className="material-symbols-outlined text-[18px]">restart_alt</span>
                  <span>{t('empty.action')}</span>
                </Button>
              </Card>
            )}
          </main>
        </div>

        {/* Mobile Filter Drawer / Backdrop */}
        {isMobileFilterOpen && (
          <div className="lg:hidden fixed inset-0 z-[9999] flex justify-end">
            <div
              className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
              onClick={() => setIsMobileFilterOpen(false)}
            />
            <div className="relative w-full max-w-sm h-full bg-surface dark:bg-slate-900 shadow-2xl p-6 overflow-y-auto flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-4 mb-4 border-b border-outline-variant/15">
                  <div className="flex items-center gap-2 font-bold text-base text-on-surface">
                    <span className="material-symbols-outlined text-primary">tune</span>
                    <span>{t('filters.title')}</span>
                  </div>
                  <button
                    onClick={() => setIsMobileFilterOpen(false)}
                    className="p-1 rounded-lg text-on-surface-variant hover:bg-surface-container-high"
                  >
                    <span className="material-symbols-outlined text-[20px]">close</span>
                  </button>
                </div>

                {renderSidebarFilters()}
              </div>

              <div className="pt-6 border-t border-outline-variant/15 mt-6">
                <Button
                  onClick={() => setIsMobileFilterOpen(false)}
                  className="w-full font-bold"
                >
                  {t('filters.apply')} ({filteredProducts.length})
                </Button>
              </div>
            </div>
          </div>
        )}
      </Container>
    </div>
  );
};

export default ProductsPage;
