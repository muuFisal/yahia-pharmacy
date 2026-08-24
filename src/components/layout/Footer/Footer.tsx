import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useBranding } from '../../../hooks/useBranding';
import { formatWhatsappUrl } from '../../../utils/html';

export const Footer: React.FC = () => {
  const { t } = useTranslation();
  const { brandName, settings } = useBranding();
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
    <footer className="bg-surface-container-highest dark:bg-slate-950 full-width pt-10 pb-4 mt-16 border-t border-slate-200 dark:border-slate-800/60 text-on-surface transition-colors duration-300">
      {/* 4-Column Balanced Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto text-right rtl:text-right ltr:text-left">
        {/* Column 1: Brand & Slogan */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2">
            {settings?.logo ? (
              <img src={settings.logo} alt={brandName} className="h-8 w-auto object-contain" />
            ) : (
              <>
                <div className="w-8 h-8 bg-primary rounded-xl flex items-center justify-center shadow-md shadow-primary/20 shrink-0">
                  <span className="material-symbols-outlined text-white text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                    deployed_code
                  </span>
                </div>
                <span className="font-headline-md text-headline-md font-bold text-on-surface">
                  {brandName}
                </span>
              </>
            )}
          </div>
          <p className="text-on-surface-variant font-body-md text-sm leading-relaxed max-w-xs">
            {t('footer.desc', 'منصة متكاملة ومصممة بأحدث التقنيات لتقديم أفضل تجربة للمستخدم.')}
          </p>
        </div>

        {/* Column 2: Quick Links */}
        <div className="flex flex-col gap-3">
          <h4 className="font-label-md text-label-md text-on-surface font-bold pb-2 relative inline-block">
            {t('footer.links', 'روابط سريعة')}
            <span className="absolute bottom-0 right-0 ltr:right-auto ltr:left-0 w-8 h-0.5 bg-primary rounded-full block" />
          </h4>
          <div className="flex flex-col gap-2.5 mt-2">
            <Link to="/" className="text-on-surface-variant hover:text-primary dark:hover:text-primary-container transition-colors font-body-md text-sm flex items-center gap-1.5 hover:translate-x-[-4px] ltr:hover:translate-x-[4px] duration-200">
              <span className="material-symbols-outlined text-[14px]">arrow_back</span>
              {t('nav.home', 'الرئيسية')}
            </Link>
            <Link to="/about" className="text-on-surface-variant hover:text-primary dark:hover:text-primary-container transition-colors font-body-md text-sm flex items-center gap-1.5 hover:translate-x-[-4px] ltr:hover:translate-x-[4px] duration-200">
              <span className="material-symbols-outlined text-[14px]">arrow_back</span>
              {t('nav.about', 'من نحن')}
            </Link>
            <Link to="/contact" className="text-on-surface-variant hover:text-primary dark:hover:text-primary-container transition-colors font-body-md text-sm flex items-center gap-1.5 hover:translate-x-[-4px] ltr:hover:translate-x-[4px] duration-200">
              <span className="material-symbols-outlined text-[14px]">arrow_back</span>
              {t('nav.contact', 'تواصل معنا')}
            </Link>
            <Link to="/admin/login" className="text-on-surface-variant hover:text-primary dark:hover:text-primary-container transition-colors font-body-md text-sm flex items-center gap-1.5 hover:translate-x-[-4px] ltr:hover:translate-x-[4px] duration-200">
              <span className="material-symbols-outlined text-[14px]">dashboard</span>
              {t('dashboard:title', 'لوحة التحكم')}
            </Link>
          </div>
        </div>

        {/* Column 3: Support Links */}
        <div className="flex flex-col gap-3">
          <h4 className="font-label-md text-label-md text-on-surface font-bold pb-2 relative inline-block">
            {t('footer.support', 'الدعم والمساعدة')}
            <span className="absolute bottom-0 right-0 ltr:right-auto ltr:left-0 w-8 h-0.5 bg-primary rounded-full block" />
          </h4>
          <div className="flex flex-col gap-2.5 mt-2">
            <Link to="/about" className="text-on-surface-variant hover:text-primary dark:hover:text-primary-container transition-colors font-body-md text-sm flex items-center gap-1.5 hover:translate-x-[-4px] ltr:hover:translate-x-[4px] duration-200">
              <span className="material-symbols-outlined text-[14px]">arrow_back</span>
              {t('nav.about', 'عن التطبيق')}
            </Link>
            <Link to="/contact" className="text-on-surface-variant hover:text-primary dark:hover:text-primary-container transition-colors font-body-md text-sm flex items-center gap-1.5 hover:translate-x-[-4px] ltr:hover:translate-x-[4px] duration-200">
              <span className="material-symbols-outlined text-[14px]">arrow_back</span>
              {t('nav.contact', 'مركز المساعدة')}
            </Link>
          </div>
        </div>

        {/* Column 4: Contact Us & Social Media */}
        <div className="flex flex-col gap-3">
          <h4 className="font-label-md text-label-md text-on-surface font-bold pb-2 relative inline-block">
            {t('footer.contact', 'معلومات التواصل')}
            <span className="absolute bottom-0 right-0 ltr:right-auto ltr:left-0 w-8 h-0.5 bg-primary rounded-full block" />
          </h4>
          <div className="flex flex-col gap-4 mt-2">
            <a 
              href={`mailto:${settings?.contactEmail || 'support@example.com'}`} 
              className="text-on-surface-variant hover:text-primary dark:hover:text-primary-container transition-colors font-body-md text-sm flex items-center gap-2 hover:underline"
            >
              <span className="material-symbols-outlined text-primary text-[18px]">mail</span>
              {settings?.contactEmail || 'support@example.com'}
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
            <div className="flex flex-col gap-3">
              <span className="text-xs font-semibold text-on-surface-variant tracking-wide uppercase">
                {t('footer.followUs', 'تابعنا على')}
              </span>
              <div className="flex gap-3 flex-wrap justify-start">
                {facebookUrl && facebookUrl !== '#' && (
                  <a
                    href={facebookUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group w-10 h-10 rounded-xl bg-slate-200/80 dark:bg-white/[0.06] hover:bg-[#1877f2] flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 hover:shadow-[0_0_20px_rgba(24,119,242,0.4)] text-slate-500 dark:text-slate-500 hover:text-white"
                    aria-label="Facebook"
                  >
                    <svg className="w-[18px] h-[18px] transition-transform duration-300 group-hover:scale-110" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                    </svg>
                  </a>
                )}

                {whatsappUrl && whatsappUrl !== '#' && (
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group w-10 h-10 rounded-xl bg-slate-200/80 dark:bg-white/[0.06] hover:bg-[#25d366] flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 hover:shadow-[0_0_20px_rgba(37,211,102,0.4)] text-slate-500 dark:text-slate-500 hover:text-white"
                    aria-label="WhatsApp"
                  >
                    <svg className="w-[18px] h-[18px] transition-transform duration-300 group-hover:scale-110" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.37 9.864-9.799.002-2.63-1.023-5.101-2.885-6.966a9.9 9.9 0 0 0-6.98-2.879c-5.443 0-9.866 4.372-9.87 9.802 0 1.77.46 3.5 1.332 5.024L1.758 22.26l6.634-1.734c.002-.001.002-.001.003-.001zm11.535-6.844c-.303-.15-1.79-.884-2.067-.984-.278-.1-.48-.15-.68.15-.2.3-.777.984-.95 1.184-.173.2-.347.225-.65.075-.303-.15-1.28-.472-2.438-1.503-.9-.8-1.507-1.79-1.684-2.09-.177-.3-.02-.463.13-.613.137-.133.303-.35.454-.525.152-.175.202-.3.303-.5.101-.2.05-.375-.025-.525-.075-.15-.68-1.64-.93-2.245-.244-.59-.49-.51-.68-.52-.176-.01-.377-.01-.578-.01-.2 0-.526.075-.801.375-.276.3-1.05 1.025-1.05 2.5s1.07 2.9 1.22 3.1c.15.2 2.105 3.215 5.099 4.51.712.308 1.27.493 1.704.63.715.227 1.365.195 1.88.118.574-.085 1.79-.73 2.042-1.435.252-.705.252-1.31.177-1.435-.075-.125-.278-.2-.581-.35z" />
                    </svg>
                  </a>
                )}

                {instagramUrl && instagramUrl !== '#' && (
                  <a
                    href={instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group w-10 h-10 rounded-xl bg-slate-200/80 dark:bg-white/[0.06] hover:bg-gradient-to-br hover:from-[#f9ce34] hover:via-[#ee2a7b] hover:to-[#6228d7] flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 hover:shadow-[0_0_20px_rgba(225,48,108,0.4)] text-slate-500 dark:text-slate-500 hover:text-white"
                    aria-label="Instagram"
                  >
                    <svg className="w-[18px] h-[18px] transition-transform duration-300 group-hover:scale-110" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12.315 2c2.43 0 2.784.01 3.71.054 2.604.12 3.883 1.354 4.002 3.958.045.928.054 1.28.054 3.71 0 2.43-.01 2.78-.054 3.71-.119 2.607-1.398 3.882-4.002 4.002-.926.044-1.279.054-3.71.054-2.43 0-2.78-.01-3.71-.054-2.607-.12-3.882-1.398-4.002-4.002-.044-.928-.054-1.28-.054-3.71 0-2.43.01-2.78.054-3.71.12-2.604 1.397-3.883 4.002-4.002.925-.045 1.279-.054 3.71-.054zM12 5.902c-3.369 0-6.098 2.729-6.098 6.098 0 3.369 2.729 6.098 6.098 6.098 3.369 0 6.098-2.729 6.098-6.098 0-3.369-2.73-6.098-6.098-6.098zm0 9.996c-2.152 0-3.898-1.746-3.898-3.898 0-2.152 1.746-3.898 3.898-3.898 2.152 0 3.898 1.746 3.898 3.898 0 2.152-1.746 3.898-3.898 3.898zm6.405-11.751a1.21 1.21 0 100-2.42 1.21 1.21 0 000 2.42z" />
                    </svg>
                  </a>
                )}

                {/* TikTok */}
                {tiktokUrl && tiktokUrl !== '#' && (
                  <a
                    href={tiktokUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group w-10 h-10 rounded-xl bg-slate-200/80 dark:bg-white/[0.06] hover:bg-black flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 hover:shadow-[0_0_20px_rgba(0,0,0,0.4)] text-slate-500 dark:text-slate-500 hover:text-white"
                    aria-label="TikTok"
                  >
                    <svg className="w-[18px] h-[18px] transition-transform duration-300 group-hover:scale-110" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.02 1.59 4.23.95.84 2.17 1.34 3.44 1.48v3.91c-1.36-.08-2.68-.58-3.78-1.42-.51-.37-.96-.82-1.32-1.34v7.7c-.07 1.83-.81 3.56-2.07 4.82-1.49 1.49-3.59 2.27-5.7 2.1-2.14-.14-4.08-1.29-5.18-3.14-1.25-2.06-1.22-4.69.07-6.72 1.13-1.88 3.12-3.05 5.31-3.14V12.3c-1.34.05-2.58.74-3.32 1.87-.86 1.29-.86 2.98 0 4.27.75 1.13 2.01 1.81 3.36 1.84 1.36-.01 2.61-.71 3.32-1.87.52-.79.75-1.74.68-2.69V.02z"/>
                    </svg>
                  </a>
                )}

                {xUrl && xUrl !== '#' && (
                  <a
                    href={xUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group w-10 h-10 rounded-xl bg-slate-200/80 dark:bg-white/[0.06] hover:bg-[#1b1b24] flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 hover:shadow-[0_0_20px_rgba(27,27,36,0.4)] text-slate-500 dark:text-slate-500 hover:text-white"
                    aria-label="X / Twitter"
                  >
                    <svg className="w-[16px] h-[16px] transition-transform duration-300 group-hover:scale-110" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                    </svg>
                  </a>
                )}

                {linkedinUrl && linkedinUrl !== '#' && (
                  <a
                    href={linkedinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group w-10 h-10 rounded-xl bg-slate-200/80 dark:bg-white/[0.06] hover:bg-[#0a66c2] flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 hover:shadow-[0_0_20px_rgba(10,102,194,0.4)] text-slate-500 dark:text-slate-500 hover:text-white"
                    aria-label="LinkedIn"
                  >
                    <svg className="w-[18px] h-[18px] transition-transform duration-300 group-hover:scale-110" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  </a>
                )}

                {youtubeUrl && youtubeUrl !== '#' && (
                  <a
                    href={youtubeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group w-10 h-10 rounded-xl bg-slate-200/80 dark:bg-white/[0.06] hover:bg-[#ff0000] flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 hover:shadow-[0_0_20px_rgba(255,0,0,0.35)] text-slate-500 dark:text-slate-500 hover:text-white"
                    aria-label="YouTube"
                  >
                    <svg className="w-[18px] h-[18px] transition-transform duration-300 group-hover:scale-110" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19.812 5.418c.861.23 1.538.907 1.768 1.768C22 8.68 22 12 22 12s0 3.32-.42 4.814c-.23.861-.907 1.538-1.768 1.768C18.32 19 12 19 12 19s-6.32 0-7.812-.418c-.861-.23-1.538-.907-1.768-1.768C2 15.32 2 12 2 12s0-3.32.42-4.814c.23-.861.907-1.538 1.768-1.768C5.68 5 12 5 12 5s6.32 0 7.812.418zM9.75 8.25v7.5L15.25 12 9.75 8.25z" />
                    </svg>
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Bottom Bar */}
      <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop mt-4 pt-3 border-t border-slate-200 dark:border-slate-800/50 flex flex-col md:flex-row justify-between items-center gap-2 text-center">
        <p className="text-on-surface-variant font-body-md text-xs">
          {t('footer.rights', 'جميع الحقوق محفوظة © 2026')}
        </p>
        <p className="text-on-surface-variant font-body-md text-xs">
          {t('footer.developedBy', 'تم التطوير بواسطة')}{' '}
          <a
            href="#"
            rel="noopener noreferrer"
            className="font-medium text-primary dark:text-primary-container hover:text-primary-container dark:hover:text-primary transition-colors underline decoration-dotted text-xs"
          >
            M.F
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
