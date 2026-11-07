import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Home } from 'lucide-react';
import { BrandBadge } from '../components/common/BrandBadge';

export const NotFoundPage: React.FC = () => {
  useEffect(() => {
    document.title = 'Page Not Found (404) | Jerry Hair Saloon — Allama Iqbal Town, Lahore';
  }, []);

  return (
    <div className="min-h-[70vh] flex items-center justify-center bg-[#121110] text-[#F4EFE8] py-16 px-6 lg:px-8">
      <div className="max-w-xl mx-auto text-center flex flex-col items-center">
        {/* Eyebrow */}
        <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full border border-white/10 text-[13px] font-bold tracking-editorial uppercase text-[#C9A24B] mb-6">
          <BrandBadge size="sm" />
          <span>Error 404 · Page Not Found</span>
        </div>

        {/* H1 Heading */}
        <h1 className="font-page-h1 text-[#F4EFE8] mb-4">
          Looks like this chair is empty.
        </h1>

        {/* One line of existing-style text */}
        <p className="font-body-lg text-[#F4EFE8]/70 max-w-[65ch] mb-12">
          The page you are looking for doesn't exist or has moved. Head back home or book your next chair.
        </p>

        {/* Two existing-style buttons linking to Home (/) and Book (/book) */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
          <Link
            to="/book"
            className="w-full sm:w-auto h-[52px] px-8 bg-[#C9A24B] hover:bg-[#DEBA67] text-[#121110] font-bold text-base tracking-wide rounded-full shadow-[0_4px_20px_rgba(201,162,75,0.25)] flex items-center justify-center gap-3 transition-all duration-300 select-none"
          >
            <Calendar className="w-5 h-5 text-[#121110]" />
            <span>Book a Chair</span>
          </Link>

          <Link
            to="/"
            className="w-full sm:w-auto h-[52px] px-8 bg-transparent hover:bg-white/5 border border-white/20 hover:border-[#C9A24B] text-[#F4EFE8] font-bold text-base tracking-wide rounded-full transition-all duration-300 flex items-center justify-center gap-3 select-none"
          >
            <Home className="w-5 h-5" />
            <span>Back to Home</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

