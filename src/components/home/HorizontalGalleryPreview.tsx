import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { GALLERY_PHOTOS } from '../../config/salonInfo';
import { BrandBadge } from '../common/BrandBadge';

gsap.registerPlugin(ScrollTrigger);

export const HorizontalGalleryPreview: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  // Take 8 photos for the preview
  const previewPhotos = GALLERY_PHOTOS.slice(0, 8);

  useEffect(() => {
    // Only apply GSAP pinned horizontal scroll on desktop screens >= 1024px
    const mm = gsap.matchMedia();

    mm.add('(min-width: 1024px)', () => {
      if (!sectionRef.current || !trackRef.current) return;

      const track = trackRef.current;
      const totalWidth = track.scrollWidth - window.innerWidth + 120;

      const tween = gsap.to(track, {
        x: -totalWidth,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          pin: true,
          scrub: 1,
          start: 'top top',
          end: () => `+=${totalWidth}`,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      return () => {
        tween.kill();
      };
    });

    return () => mm.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-16 md:py-24 lg:py-28 lg:h-screen bg-[#121110] relative overflow-hidden flex flex-col justify-center border-b border-white/10"
    >
      {/* Top Header inside pinned section */}
      <div className="max-w-7xl w-full mx-auto px-6 lg:px-8 mb-8 flex items-end justify-between">
        <div>
          <div className="flex items-center gap-2.5 mb-4">
            <BrandBadge size="sm" />
            <span className="text-[13px] font-bold tracking-editorial uppercase text-[#C9A24B]">
              The Lookbook
            </span>
          </div>
          <h2 className="font-section-h2 text-[#F4EFE8]">
            Recent Chair Work
          </h2>
        </div>

        <Link
          to="/gallery"
          className="hidden sm:inline-flex items-center gap-3 text-sm font-bold tracking-wide uppercase text-[#C9A24B] hover:text-[#DEBA67] group transition-colors"
        >
          <span>View All Photos</span>
          <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>

      {/* Horizontal Scroll Track */}
      <div
        ref={trackRef}
        className="flex items-center space-x-6 lg:space-x-8 px-6 lg:px-8 overflow-x-auto lg:overflow-visible scrollbar-none pb-4 lg:pb-0"
      >
        {previewPhotos.map((photo, idx) => (
          <div
            key={photo.id}
            className="flex-shrink-0 w-72 sm:w-80 md:w-96 group relative bg-[#181715] rounded-2xl overflow-hidden border border-white/10"
          >
            <div className="relative h-96 sm:h-[420px] overflow-hidden bg-[#0A0908]">
              <img
                src={photo.image}
                alt={photo.title}
                className="w-full h-full object-cover filter contrast-[1.08] transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#121110] via-black/20 to-transparent opacity-90 group-hover:opacity-75 transition-opacity" />

              <div className="absolute top-4 left-4 bg-[#121110]/80 backdrop-blur-sm border border-white/10 px-3 py-1 text-[13px] font-bold uppercase text-[#C9A24B] rounded-full">
                0{idx + 1}
              </div>

              {photo.barberCredit && (
                <div className="absolute top-4 right-4 bg-[#121110]/80 backdrop-blur-sm border border-white/10 px-3 py-1 text-[13px] font-semibold text-white/80 rounded-full">
                  By {photo.barberCredit}
                </div>
              )}

              {/* Photo Caption Overlay */}
              <div className="absolute bottom-0 inset-x-0 p-6">
                <span className="text-[13px] font-bold uppercase tracking-editorial text-[#C9A24B] block mb-1">
                  {photo.category}
                </span>
                <h3 className="font-h4 text-[#F4EFE8] leading-snug">
                  {photo.title}
                </h3>
                <p className="text-sm text-[#F4EFE8]/70 mt-1 line-clamp-2">
                  {photo.caption}
                </p>
              </div>
            </div>
          </div>
        ))}

        {/* End Card Linking to Full Gallery */}
        <div className="flex-shrink-0 w-72 sm:w-80 h-96 sm:h-[420px] bg-[#1A1916] border border-[#C9A24B]/30 rounded-2xl flex flex-col items-center justify-center p-8 text-center group">
          <div className="w-16 h-16 rounded-2xl bg-[#121110] border border-[#C9A24B]/50 flex items-center justify-center p-2 mb-6 group-hover:scale-105 transition-transform shadow-[0_0_20px_rgba(201,162,75,0.2)]">
            <img
              src="/beard-logo-transparent.png"
              alt="Jerry Hair Saloon Lookbook"
              className="w-full h-full object-contain filter drop-shadow-[0_1px_3px_rgba(0,0,0,0.6)]"
              width="48"
              height="48"
            />
          </div>
          <h3 className="font-h3 text-[#F4EFE8] mb-2">
            See the Full Lookbook
          </h3>
          <p className="text-sm text-[#F4EFE8]/70 mb-8 max-w-[28ch]">
            Filter by Skin Fades, Beard Designs, Dulha Grooming & Salon Interior.
          </p>
          <Link
            to="/gallery"
            className="h-[52px] px-8 bg-[#C9A24B] hover:bg-[#DEBA67] text-[#121110] font-bold text-base tracking-wide rounded-full transition-all duration-300 flex items-center justify-center"
          >
            Open Full Gallery
          </Link>
        </div>
      </div>

      {/* Mobile-only Link Below Track */}
      <div className="mt-8 px-6 text-center sm:hidden">
        <Link
          to="/gallery"
          className="inline-flex items-center gap-3 text-sm font-bold tracking-wide uppercase text-[#C9A24B]"
        >
          <span>View All 12 Gallery Photos</span>
          <ArrowRight className="w-5 h-5" />
        </Link>
      </div>
    </section>
  );
};
