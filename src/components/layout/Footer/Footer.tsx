import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useBranding } from '../../../hooks/useBranding';
import { useLanguage } from '../../../hooks/useLanguage';
import { formatWhatsappUrl } from '../../../utils/html';

export const Footer: React.FC = () => {
  const { t } = useTranslation();
  const { brandName, settings } = useBranding();
  const { language } = useLanguage();
  const isArabic = language === 'ar';

  const logoSrc = settings?.logo || '/logo-icon.png';

  const socialLinks = settings?.socialLinks;
  const facebookUrl = settings ? socialLinks?.facebook : '#';
  const whatsappRaw = settings ? socialLinks?.whatsapp : '#';
  const whatsappUrl = formatWhatsappUrl(whatsappRaw);
  const instagramUrl = settings ? socialLinks?.instagram : '#';
  const youtubeUrl = settings ? socialLinks?.youtube : '#';
  const tiktokUrl = settings ? socialLinks?.tiktok : null;
  const xUrl = settings ? socialLinks?.xUrl : '#';
  const linkedinUrl = settings ? socialLinks?.linkedin : null;

  return (
    <footer className="bg-surface-container-highest dark:bg-slate-950 full-width pt-12 pb-6 mt-16 border-t border-slate-200 dark:border-slate-800/60 text-on-surface transition-colors duration-300">
      {/* 4-Column Balanced Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto text-start">
        {/* Column 1: Brand & Slogan */}
        <div className="flex flex-col gap-4">
          <Link to="/" className="flex items-center gap-2.5 group">
            <img
              src={logoSrc}
              alt={brandName}
              className="h-10 w-auto object-contain shrink-0 transition-transform duration-300 group-hover:scale-105"
              onError={(e) => {
                (e.target as HTMLImageElement).src = '/logo-icon.png';
              }}
            />
            <div className="flex flex-col text-start">
              <span className="font-bold text-lg text-primary dark:text-primary-container leading-tight font-primary">
                {brandName}
              </span>
              <span className="text-[11px] text-on-surface-variant font-medium leading-tight">
                {isArabic ? 'د/ يوسف يحيى' : 'Dr/ Youssif Yahia'}
              </span>
            </div>
          </Link>
          <p className="text-on-surface-variant font-body-md text-sm leading-relaxed max-w-xs">
            {t('footer.desc')}
          </p>
        </div>

        {/* Column 2: Quick Links */}
        <div className="flex flex-col gap-3">
          <h4 className="font-label-md text-label-md text-on-surface font-bold pb-2 relative inline-block">
            {t('footer.links')}
            <span className="absolute bottom-0 start-0 w-8 h-0.5 bg-primary rounded-full block" />
          </h4>
          <div className="flex flex-col gap-2.5 mt-2">
            <Link to="/" className="text-on-surface-variant hover:text-primary dark:hover:text-primary-container transition-all font-body-md text-sm flex items-center gap-1.5 hover:translate-x-1 rtl:hover:-translate-x-1 duration-200">
              <span className="material-symbols-outlined text-[16px] rtl:rotate-180 text-primary shrink-0">chevron_right</span>
              {t('nav.home')}
            </Link>
            <Link to="/products" className="text-on-surface-variant hover:text-primary dark:hover:text-primary-container transition-all font-body-md text-sm flex items-center gap-1.5 hover:translate-x-1 rtl:hover:-translate-x-1 duration-200">
              <span className="material-symbols-outlined text-[16px] rtl:rotate-180 text-primary shrink-0">chevron_right</span>
              {t('nav.products')}
            </Link>
            <Link to="/about" className="text-on-surface-variant hover:text-primary dark:hover:text-primary-container transition-all font-body-md text-sm flex items-center gap-1.5 hover:translate-x-1 rtl:hover:-translate-x-1 duration-200">
              <span className="material-symbols-outlined text-[16px] rtl:rotate-180 text-primary shrink-0">chevron_right</span>
              {t('nav.about')}
            </Link>
            <Link to="/contact" className="text-on-surface-variant hover:text-primary dark:hover:text-primary-container transition-all font-body-md text-sm flex items-center gap-1.5 hover:translate-x-1 rtl:hover:-translate-x-1 duration-200">
              <span className="material-symbols-outlined text-[16px] rtl:rotate-180 text-primary shrink-0">chevron_right</span>
              {t('nav.contact')}
            </Link>
            <Link to="/admin/login" className="text-on-surface-variant hover:text-primary dark:hover:text-primary-container transition-all font-body-md text-sm flex items-center gap-1.5 hover:translate-x-1 rtl:hover:-translate-x-1 duration-200">
              <span className="material-symbols-outlined text-[16px] text-primary shrink-0">dashboard</span>
              {t('nav.dashboard')}
            </Link>
          </div>
        </div>

        {/* Column 3: Support Links */}
        <div className="flex flex-col gap-3">
          <h4 className="font-label-md text-label-md text-on-surface font-bold pb-2 relative inline-block">
            {t('footer.support')}
            <span className="absolute bottom-0 start-0 w-8 h-0.5 bg-primary rounded-full block" />
          </h4>
          <div className="flex flex-col gap-2.5 mt-2">
            <Link to="/about" className="text-on-surface-variant hover:text-primary dark:hover:text-primary-container transition-all font-body-md text-sm flex items-center gap-1.5 hover:translate-x-1 rtl:hover:-translate-x-1 duration-200">
              <span className="material-symbols-outlined text-[16px] rtl:rotate-180 text-primary shrink-0">chevron_right</span>
              {t('footer.aboutApp')}
            </Link>
            <Link to="/contact" className="text-on-surface-variant hover:text-primary dark:hover:text-primary-container transition-all font-body-md text-sm flex items-center gap-1.5 hover:translate-x-1 rtl:hover:-translate-x-1 duration-200">
              <span className="material-symbols-outlined text-[16px] rtl:rotate-180 text-primary shrink-0">chevron_right</span>
              {t('footer.helpCenter')}
            </Link>
          </div>
        </div>

        {/* Column 4: Contact Us & Social Media */}
        <div className="flex flex-col gap-3">
          <h4 className="font-label-md text-label-md text-on-surface font-bold pb-2 relative inline-block">
            {t('footer.contact')}
            <span className="absolute bottom-0 start-0 w-8 h-0.5 bg-primary rounded-full block" />
          </h4>
          <div className="flex flex-col gap-4 mt-2">
            <a 
              href={`mailto:${settings?.contactEmail || 'dr.youssif.yahia@gmail.com'}`} 
              className="text-on-surface-variant hover:text-primary dark:hover:text-primary-container transition-colors font-body-md text-sm flex items-center gap-2 hover:underline"
            >
              <span className="material-symbols-outlined text-primary text-[18px]">mail</span>
              {settings?.contactEmail || 'dr.youssif.yahia@gmail.com'}
            </a>
            {settings?.contactPhone && (
              <a 
                href={`tel:${settings.contactPhone}`} 
                className="text-on-surface-variant hover:text-primary dark:hover:text-primary-container transition-colors font-body-md text-sm flex items-center gap-2 hover:underline"
              >
                <span className="material-symbols-outlined text-primary text-[18px]">phone</span>
                {settings.contactPhone}
              </a>
            )}
            
            {/* Rich Social Media Links */}
            <div className="flex flex-col gap-2.5 pt-1">
              <span className="text-xs font-semibold text-on-surface-variant tracking-wide uppercase">
                {t('footer.followUs')}
              </span>
              <div className="flex gap-2.5 flex-wrap justify-start">
                {facebookUrl && facebookUrl !== '#' && (
                  <a
                    href={facebookUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 rounded-xl bg-slate-200/80 dark:bg-white/[0.06] hover:bg-[#1877f2] flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 text-slate-600 dark:text-slate-400 hover:text-white"
                    aria-label="Facebook"
                  >
                    <svg className="w-[18px] h-[18px]" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"/>
                    </svg>
                  </a>
                )}

                {whatsappUrl && whatsappUrl !== '#' && (
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 rounded-xl bg-slate-200/80 dark:bg-white/[0.06] hover:bg-[#25d366] flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 text-slate-600 dark:text-slate-400 hover:text-white"
                    aria-label="WhatsApp"
                  >
                    <svg className="w-[18px] h-[18px]" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.37 9.864-9.799.002-2.63-1.023-5.101-2.885-6.966a9.9 9.9 0 0 0-6.98-2.879c-5.443 0-9.866 4.372-9.87 9.802 0 1.77.46 3.5 1.332 5.024L1.758 22.26l6.634-1.734c.002-.001.002-.001.003-.001zm11.535-6.844c-.303-.15-1.79-.884-2.067-.984-.278-.1-.48-.15-.68.15-.2.3-.777.984-.95 1.184-.173.2-.347.225-.65.075-.303-.15-1.28-.472-2.438-1.503-.9-.8-1.507-1.79-1.684-2.09-.177-.3-.02-.463.13-.613.137-.133.303-.35.454-.525.152-.175.202-.3.303-.5.101-.2.05-.375-.025-.525-.075-.15-.68-1.64-.93-2.245-.244-.59-.49-.51-.68-.52-.176-.01-.377-.01-.578-.01-.2 0-.526.075-.801.375-.276.3-1.05 1.025-1.05 2.5s1.07 2.9 1.22 3.1c.15.2 2.105 3.215 5.099 4.51.712.308 1.27.493 1.704.63.715.227 1.365.195 1.88.118.574-.085 1.79-.73 2.042-1.435.252-.705.252-1.31.177-1.435-.075-.125-.278-.2-.581-.35z" />
                    </svg>
                  </a>
                )}

                {instagramUrl && instagramUrl !== '#' && (
                  <a
                    href={instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 rounded-xl bg-slate-200/80 dark:bg-white/[0.06] hover:bg-[#e4405f] flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 text-slate-600 dark:text-slate-400 hover:text-white"
                    aria-label="Instagram"
                  >
                    <svg className="w-[18px] h-[18px]" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                  </a>
                )}

                {youtubeUrl && youtubeUrl !== '#' && (
                  <a
                    href={youtubeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 rounded-xl bg-slate-200/80 dark:bg-white/[0.06] hover:bg-[#ff0000] flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 text-slate-600 dark:text-slate-400 hover:text-white"
                    aria-label="YouTube"
                  >
                    <svg className="w-[18px] h-[18px]" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19.812 5.418c.861.23 1.538.907 1.768 1.768C22 8.68 22 12 22 12s0 3.32-.42 4.814c-.23.861-.907 1.538-1.768 1.768C18.32 19 12 19 12 19s-6.32 0-7.812-.418c-.861-.23-1.538-.907-1.768-1.768C2 15.32 2 12 2 12s0-3.32.42-4.814c.23-.861.907-1.538 1.768-1.768C5.68 5 12 5 12 5s6.32 0 7.812.418zM9.75 8.25v7.5L15.25 12 9.75 8.25z" />
                    </svg>
                  </a>
                )}

                {tiktokUrl && tiktokUrl !== '#' && (
                  <a
                    href={tiktokUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 rounded-xl bg-slate-200/80 dark:bg-white/[0.06] hover:bg-black flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 text-slate-600 dark:text-slate-400 hover:text-white"
                    aria-label="TikTok"
                  >
                    <span className="material-symbols-outlined text-[18px]">music_note</span>
                  </a>
                )}

                {xUrl && xUrl !== '#' && (
                  <a
                    href={xUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 rounded-xl bg-slate-200/80 dark:bg-white/[0.06] hover:bg-black flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 text-slate-600 dark:text-slate-400 hover:text-white"
                    aria-label="X"
                  >
                    <span className="text-xs font-black">𝕏</span>
                  </a>
                )}

                {linkedinUrl && linkedinUrl !== '#' && (
                  <a
                    href={linkedinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 rounded-xl bg-slate-200/80 dark:bg-white/[0.06] hover:bg-[#0a66c2] flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 text-slate-600 dark:text-slate-400 hover:text-white"
                    aria-label="LinkedIn"
                  >
                    <span className="text-xs font-black">in</span>
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Bottom Bar */}
      <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop mt-8 pt-4 border-t border-slate-200 dark:border-slate-800/50 flex flex-col sm:flex-row justify-between items-center gap-2 text-center">
        <p className="text-on-surface-variant font-body-md text-xs">
          {t('footer.rights')}
        </p>
        <p className="text-on-surface-variant font-body-md text-xs">
          {t('footer.developedBy')}{' '}
          <span className="font-semibold text-primary dark:text-primary-container">
            Yahia Pharmacy Team
          </span>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
