import React, { useEffect, useState, useCallback, useRef } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from './Navbar/Navbar';
import Footer from './Footer/Footer';
import AnnouncementBar from './AnnouncementBar';
import ScrollToTop from '../shared/ScrollToTop';
import FloatingWhatsAppButton from '../shared/FloatingWhatsAppButton';
import RouteTranslationBoundary from './RouteTranslationBoundary';

export const MainLayout: React.FC = () => {
  const { pathname } = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const prevPathRef = useRef(pathname);

  useEffect(() => {
    if (prevPathRef.current !== pathname) {
      window.scrollTo(0, 0);
      prevPathRef.current = pathname;
    }
  }, [pathname]);

  const handleScroll = useCallback(() => {
    setIsScrolled(window.scrollY > 10);
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Sticky wrapper: Announcement Bar + Navbar stay together */}
      <div className="sticky top-0 z-50 w-full">
        <div
          className={`transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] ${
            isScrolled
              ? 'scrolled-floating-header mx-3 sm:mx-4 md:mx-6 lg:mx-8 mt-2 rounded-2xl shadow-2xl shadow-black/10 dark:shadow-black/30 ring-1 ring-black/[0.04] dark:ring-white/[0.06]'
              : 'mx-0 mt-0 rounded-none shadow-none ring-0'
          }`}
        >
          <AnnouncementBar />
          <Navbar />
        </div>
      </div>
      <main className="flex-grow">
        <RouteTranslationBoundary>
          <Outlet />
        </RouteTranslationBoundary>
      </main>
      <Footer />
      <ScrollToTop />
      <FloatingWhatsAppButton />
    </div>
  );
};
export default MainLayout;
