import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { X, Calendar, Eye } from 'lucide-react';
import { GALLERY_PHOTOS } from '../config/salonInfo';
import { GalleryPhoto } from '../types';
import { BrandBadge } from '../components/common/BrandBadge';

export const GalleryPage: React.FC = () => {
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'haircuts' | 'beards' | 'salon' | 'dulha'>('all');
  const [activePhoto, setActivePhoto] = useState<GalleryPhoto | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    document.title =
      "Lookbook & Chair Work Gallery | Jerry Hair Saloon, Allama Iqbal Town, Lahore";

    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute(
        'content',
        'Real client cuts and chair work from Jerry Hair Saloon in Allama Iqbal Town, Lahore. Explore skin fades, beard sculpts, tapers, and dulha grooms.'
      );
    }
  }, []);

  const filterTabs = [
    { id: 'all', label: 'All Photos' },
    { id: 'haircuts', label: 'Skin Fades & Cuts' },
    { id: 'beards', label: 'Beard Sculpting' },
    { id: 'salon', label: 'Shop & Interior' },
    { id: 'dulha', label: 'Dulha Grooming' },
  ];

  const filteredPhotos = GALLERY_PHOTOS.filter((photo) => {
    if (selectedFilter === 'all') return true;
    return photo.category === selectedFilter;
  });

  const handleBookLook = (photo: GalleryPhoto) => {
    setActivePhoto(null);
    let srv = 'signature-haircut';
    if (photo.category === 'haircuts') srv = 'skin-fade';
    if (photo.category === 'beards') srv = 'beard-trim-shape';
    if (photo.category === 'dulha') srv = 'dulha-groom-package';

    let barber: string | undefined = undefined;
    if (photo.barberCredit?.toLowerCase().includes('ali')) barber = 'ali-raza';
    if (photo.barberCredit?.toLowerCase().includes('jerry')) barber = 'jerry';
    if (photo.barberCredit?.toLowerCase().includes('usman')) barber = 'usman-tariq';
    if (photo.barberCredit?.toLowerCase().includes('bilal')) barber = 'bilal-ahmed';

    const url = barber
      ? `/book?service=${encodeURIComponent(srv)}&barber=${encodeURIComponent(barber)}`
      : `/book?service=${encodeURIComponent(srv)}`;
    navigate(url);
  };

  return (
    <div className="py-16 md:py-24 lg:py-28 bg-[#121110] text-[#F4EFE8]">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 mb-12">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full border border-white/10 text-[13px] font-bold tracking-editorial uppercase text-[#C9A24B] mb-4">
            <BrandBadge size="sm" />
            <span>Real Shop Portfolio</span>
          </div>
          <h1 className="font-page-h1 text-[#F4EFE8] mb-4">
            The Lookbook
          </h1>
          <p className="font-body-lg text-[#F4EFE8]/70 max-w-[65ch] leading-relaxed mb-8">
            Real cuts, real Lahore clients, real chair lighting. No filtered stock composites. Click any photograph to view details or book that exact style.
          </p>
        </div>

        {/* Working Category Filter (8px / gap-2 between pills) */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 scrollbar-none border-b border-white/10">
          {filterTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setSelectedFilter(tab.id as typeof selectedFilter)}
              className={`h-10 px-5 rounded-full text-sm font-semibold tracking-wide whitespace-nowrap transition-all duration-300 ${
                selectedFilter === tab.id
                  ? 'bg-[#C9A24B] text-[#121110] font-bold'
                  : 'bg-[#181715] text-[#F4EFE8]/70 hover:text-[#F4EFE8] hover:bg-[#201F1C]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Photos (gap-6 lg:gap-8) */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {filteredPhotos.map((photo, idx) => (
            <motion.div
              key={photo.id}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.35, delay: idx * 0.04 }}
              onClick={() => setActivePhoto(photo)}
              className="group relative bg-[#181715] border border-white/10 rounded-2xl overflow-hidden cursor-pointer shadow-xl hover:border-[#C9A24B]/40 hover:-translate-y-1 transition-all duration-300 ease-out"
            >
              <div className="relative h-80 sm:h-96 overflow-hidden bg-[#0A0908]">
                <img
                  src={photo.image}
                  alt={photo.title}
                  className="w-full h-full object-cover filter contrast-[1.06] group-hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#121110] via-black/20 to-transparent opacity-85 group-hover:opacity-60 transition-opacity" />

                {/* Corner Category Tag */}
                <div className="absolute top-4 left-4 bg-[#121110]/90 backdrop-blur-sm px-3 py-1 text-[13px] font-bold uppercase tracking-editorial text-[#C9A24B] border border-white/10 rounded-full">
                  {photo.category}
                </div>

                {photo.barberCredit && (
                  <div className="absolute top-4 right-4 bg-[#121110]/90 backdrop-blur-sm px-3 py-1 text-[13px] font-semibold text-white/80 rounded-full border border-white/10">
                    By {photo.barberCredit}
                  </div>
                )}

                {/* Hover Eye Indicator */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="w-12 h-12 rounded-full bg-[#121110]/90 border border-[#C9A24B] text-[#C9A24B] flex items-center justify-center">
                    <Eye className="w-5 h-5" />
                  </div>
                </div>

                {/* Bottom Caption */}
                <div className="absolute bottom-0 inset-x-0 p-6">
                  <h3 className="font-h4 text-[#F4EFE8]">
                    {photo.title}
                  </h3>
                  <p className="text-sm text-[#F4EFE8]/70 mt-1 line-clamp-1">
                    {photo.caption}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {activePhoto && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActivePhoto(null)}
              className="fixed inset-0 bg-black/90 backdrop-blur-md"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative max-w-4xl w-full bg-[#181715] border border-white/15 rounded-2xl overflow-hidden z-10 my-auto shadow-2xl"
            >
              <button
                onClick={() => setActivePhoto(null)}
                className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-black/60 text-white hover:text-[#C9A24B] flex items-center justify-center transition-colors"
                aria-label="Close Lightbox"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="grid grid-cols-1 md:grid-cols-12 max-h-[85vh] overflow-y-auto">
                <div className="md:col-span-7 bg-black flex items-center justify-center">
                  <img
                    src={activePhoto.image}
                    alt={activePhoto.title}
                    className="w-full h-full max-h-[70vh] object-contain"
                  />
                </div>

                <div className="md:col-span-5 p-6 lg:p-8 flex flex-col justify-between space-y-6">
                  <div>
                    <span className="text-[13px] font-bold uppercase tracking-editorial text-[#C9A24B]">
                      {activePhoto.category}
                    </span>
                    <h2 className="text-2xl font-bold mt-2 text-[#F4EFE8]">
                      {activePhoto.title}
                    </h2>

                    {activePhoto.barberCredit && (
                      <div className="mt-2 text-sm text-[#F4EFE8]/70">
                        Crafted by: <span className="text-[#C9A24B] font-bold">{activePhoto.barberCredit}</span>
                      </div>
                    )}

                    <p className="font-body text-sm text-[#F4EFE8]/70 leading-relaxed mt-4">
                      {activePhoto.caption}
                    </p>
                  </div>

                  <div className="pt-6 border-t border-white/10 space-y-3">
                    <button
                      onClick={() => handleBookLook(activePhoto)}
                      className="w-full h-[52px] px-8 bg-[#C9A24B] hover:bg-[#DEBA67] text-[#121110] font-bold text-base tracking-wide rounded-full transition-all duration-300 flex items-center justify-center gap-3"
                    >
                      <Calendar className="w-5 h-5" />
                      <span>Book This Look</span>
                    </button>

                    <div className="text-center text-[13px] text-white/55">
                      Jerry Hair Saloon · Neelum Block, Iqbal Town
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
