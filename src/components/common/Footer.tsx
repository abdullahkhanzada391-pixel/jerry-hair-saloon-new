import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Clock, Instagram, Facebook, MessageCircle } from 'lucide-react';
import { SALON_INFO } from '../../config/salonInfo';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Services', path: '/services' },
    { name: 'Price Card', path: '/pricing' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Our Barbers', path: '/about#barbers' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <footer className="bg-[#C9A24B] text-[#121110] relative overflow-hidden transition-colors">
      <div
        className="max-w-7xl mx-auto px-6 lg:px-8 pt-16 pb-8"
        style={{ paddingBottom: 'calc(2rem + env(safe-area-inset-bottom, 0px))' }}
      >
        {/* Responsive Grid: Mobile stacked (Brand -> Explore -> Contact) / Tablet 2-col / Desktop 3-col (5-3-4) */}
        <div className="grid grid-cols-1 md:grid-cols-2 md:gap-x-8 md:gap-y-10 lg:grid-cols-12 lg:gap-12 items-start">

          {/* 1. BRAND BLOCK: Full width mobile, spans 2 cols on tablet, 5 cols on desktop */}
          <div className="md:col-span-2 lg:col-span-5 space-y-4">
            {/* Logo: Always left-aligned */}
            <Link
              to="/"
              className="inline-flex items-center gap-3 group select-none text-left"
              aria-label="Jerry Hair Saloon Home"
            >
              <div className="w-10 h-10 lg:w-11 lg:h-11 rounded-xl bg-[#121110] border border-[#121110] flex items-center justify-center p-1 shadow-sm group-hover:scale-105 transition-transform duration-300 flex-shrink-0">
                <img
                  src="/beard-logo-transparent.png"
                  alt="Jerry Hair Saloon Beard Mascot"
                  className="w-full h-full object-contain filter drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)]"
                  width="40"
                  height="40"
                />
              </div>
              <div className="flex flex-col text-left">
                <span className="font-extrabold text-2xl tracking-tight text-[#121110] leading-none">
                  JERRY
                </span>
                <span className="text-[13px] font-bold tracking-editorial text-[#121110]/70 uppercase mt-1 leading-none">
                  HAIR SALOON
                </span>
              </div>
            </Link>

            {/* Tagline: Full width on mobile, max 40ch so it breaks into short clean lines */}
            <p className="text-base text-[#121110]/85 leading-relaxed max-w-[40ch] text-left">
              Sharp cuts &amp; clean fades in Allama Iqbal Town, Lahore — since 2016.
            </p>

            {/* Social Icons: 16px gap above (mt-4), 8px gap between (gap-2), 40px touch circles */}
            <div className="flex items-center gap-2 pt-1 text-left">
              <a
                href={SALON_INFO.socials.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Jerry Hair Saloon Instagram"
                className="w-10 h-10 rounded-full border border-[#121110]/30 text-[#121110] hover:bg-[#121110] hover:text-[#C9A24B] flex items-center justify-center transition-all duration-300 active:scale-95"
              >
                <Instagram className="w-4 h-4" />
              </a>

              <a
                href={SALON_INFO.socials.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Jerry Hair Saloon Facebook"
                className="w-10 h-10 rounded-full border border-[#121110]/30 text-[#121110] hover:bg-[#121110] hover:text-[#C9A24B] flex items-center justify-center transition-all duration-300 active:scale-95"
              >
                <Facebook className="w-4 h-4 fill-current" />
              </a>

              <a
                href={`https://wa.me/${SALON_INFO.whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Jerry Hair Saloon WhatsApp"
                className="w-10 h-10 rounded-full border border-[#121110]/30 text-[#121110] hover:bg-[#121110] hover:text-[#C9A24B] flex items-center justify-center transition-all duration-300 active:scale-95"
              >
                <MessageCircle className="w-4 h-4 fill-current" />
              </a>
            </div>
          </div>

          {/* 2. EXPLORE BLOCK: Full width mobile with 1px top divider & 32px gap, 1 col tablet, 3 cols desktop */}
          <div className="border-t border-[#121110]/20 pt-8 mt-8 md:border-t-0 md:pt-0 md:mt-0 md:col-span-1 lg:col-span-3">
            <h3 className="text-[13px] font-extrabold uppercase tracking-editorial text-[#121110] mb-4 text-left">
              EXPLORE
            </h3>
            {/* Mobile: 2-column grid; Tablet & Desktop: single vertical column */}
            <ul className="grid grid-cols-2 gap-x-6 md:grid-cols-1 md:gap-x-0 md:space-y-1 text-left">
              {navLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="min-h-[40px] flex items-center text-base font-medium text-[#121110]/85 hover:text-[#121110] hover:underline underline-offset-4 transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* 3. CONTACT BLOCK: Full width mobile with 1px top divider & 32px gap, 1 col tablet, 4 cols desktop */}
          <div className="border-t border-[#121110]/20 pt-8 mt-8 md:border-t-0 md:pt-0 md:mt-0 md:col-span-1 lg:col-span-4">
            <h3 className="text-[13px] font-extrabold uppercase tracking-editorial text-[#121110] mb-4 text-left">
              CONTACT
            </h3>
            <div className="space-y-4 text-left">
              {/* Address: 40px fixed icon slot, max 2 clean lines */}
              <div className="flex items-start">
                <div className="w-10 flex-shrink-0 flex items-center justify-start pt-0.5">
                  <MapPin className="w-5 h-5 text-[#121110]" />
                </div>
                <div className="text-base text-[#121110]/85 leading-snug">
                  <div>Neelum Block, Allama Iqbal Town, Lahore</div>
                  <div className="text-sm text-[#121110]/70">near Moon Market</div>
                </div>
              </div>

              {/* Phone: 40px fixed icon slot, tappable, nowrap */}
              <div className="flex items-center min-h-[40px]">
                <div className="w-10 flex-shrink-0 flex items-center justify-start">
                  <Phone className="w-5 h-5 text-[#121110]" />
                </div>
                <a
                  href={`tel:${SALON_INFO.phoneClean}`}
                  className="text-base font-semibold text-[#121110] hover:underline underline-offset-4 whitespace-nowrap transition-all"
                >
                  {SALON_INFO.phone}
                </a>
              </div>

              {/* Email: 40px fixed icon slot, tappable, break-all for narrow screens */}
              <div className="flex items-center min-h-[40px]">
                <div className="w-10 flex-shrink-0 flex items-center justify-start">
                  <Mail className="w-5 h-5 text-[#121110]" />
                </div>
                <a
                  href={`mailto:${SALON_INFO.email}`}
                  className="text-base text-[#121110]/85 hover:text-[#121110] hover:underline underline-offset-4 break-all transition-all"
                >
                  {SALON_INFO.email}
                </a>
              </div>

              {/* Opening Line: 40px fixed icon slot, wraps cleanly after "·" */}
              <div className="flex items-start">
                <div className="w-10 flex-shrink-0 flex items-center justify-start pt-0.5">
                  <Clock className="w-5 h-5 text-[#121110]" />
                </div>
                <div className="text-base text-[#121110]/85 leading-snug font-medium">
                  <span>Open daily 11 AM – 11 PM</span>
                  <span className="mx-1.5 opacity-60">·</span>
                  <span className="inline-block">Fri: Jummah break 1 – 3 PM</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 4. BOTTOM BAR: 1px divider, 32px space above (mt-8), safe-area compliant */}
        <div className="border-t border-[#121110]/20 mt-8 pt-6 flex flex-col md:flex-row md:items-center md:justify-between gap-2 text-sm text-[#121110]/75 text-left">
          <div className="text-left">
            © {currentYear} Jerry Hair Saloon. All rights reserved.
          </div>
          <button
            onClick={scrollToTop}
            className="font-bold text-[#121110] hover:underline underline-offset-4 text-left min-h-[40px] flex items-center transition-all cursor-pointer"
            aria-label="Back to top of page"
          >
            Back to top ↑
          </button>
        </div>
      </div>
    </footer>
  );
};
