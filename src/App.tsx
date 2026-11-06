import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';

import { BookingProvider } from './context/BookingContext';
import { useSmoothScroll } from './hooks/useSmoothScroll';
import { Preloader } from './components/common/Preloader';
import { NoiseOverlay } from './components/common/NoiseOverlay';
import { Navbar } from './components/common/Navbar';
import { Footer } from './components/common/Footer';
import { BookingModal } from './components/booking/BookingModal';

// Code-split routes for optimal performance
const HomePage = lazy(() => import('./pages/HomePage').then((m) => ({ default: m.HomePage })));
const ServicesPage = lazy(() => import('./pages/ServicesPage').then((m) => ({ default: m.ServicesPage })));
const PricingPage = lazy(() => import('./pages/PricingPage').then((m) => ({ default: m.PricingPage })));
const GalleryPage = lazy(() => import('./pages/GalleryPage').then((m) => ({ default: m.GalleryPage })));
const AboutPage = lazy(() => import('./pages/AboutPage').then((m) => ({ default: m.AboutPage })));
const ContactPage = lazy(() => import('./pages/ContactPage').then((m) => ({ default: m.ContactPage })));

const RouteLoadingFallback: React.FC = () => (
  <div className="min-h-[60vh] flex items-center justify-center bg-[#121110]">
    <div className="w-8 h-8 rounded-full border-2 border-[#C9A24B]/20 border-t-[#C9A24B] animate-spin" />
  </div>
);

const AnimatedRoutes: React.FC = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <motion.main
        key={location.pathname}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -12 }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className="flex-1 w-full"
      >
        <Suspense fallback={<RouteLoadingFallback />}>
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<HomePage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/pricing" element={<PricingPage />} />
            <Route path="/gallery" element={<GalleryPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="*" element={<HomePage />} />
          </Routes>
        </Suspense>
      </motion.main>
    </AnimatePresence>
  );
};

const AppContent: React.FC = () => {
  // Initialize Lenis smooth scroll
  useSmoothScroll();

  return (
    <div className="min-h-screen flex flex-col bg-[#121110] text-[#F4EFE8] font-sans antialiased relative selection:bg-[#C9A24B] selection:text-[#121110]">
      {/* 1.2s Editorial Curtain Preloader */}
      <Preloader />

      {/* Subtle Grain Texture Overlay */}
      <NoiseOverlay />

      {/* Sticky Navbar */}
      <Navbar />

      {/* Page Content with Code-Split Routes and Framer Motion transitions */}
      <AnimatedRoutes />

      {/* 14 Footer: Maps, Timings, Jummah Notice, Socials */}
      <Footer />

      {/* Universal Booking Modal */}
      <BookingModal />
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <Router>
      <BookingProvider>
        <AppContent />
      </BookingProvider>
    </Router>
  );
};

export default App;
