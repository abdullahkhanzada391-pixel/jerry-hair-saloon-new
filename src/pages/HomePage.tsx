import React, { useEffect } from 'react';
import { Hero } from '../components/home/Hero';
import { MarqueeStrip } from '../components/home/MarqueeStrip';
import { HorizontalGalleryPreview } from '../components/home/HorizontalGalleryPreview';
import { RealReviews } from '../components/home/RealReviews';
import { BookingCtaBand } from '../components/home/BookingCtaBand';

export const HomePage: React.FC = () => {
  useEffect(() => {
    document.title =
      "Jerry Hair Saloon | Premium Men's Salon & Grooming Lounge in Allama Iqbal Town, Lahore";
    
    // Set meta description
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute(
        'content',
        'Jerry Hair Saloon: Premium men’s barbershop on Neelum Block main road, Allama Iqbal Town, Lahore. Precision cuts, skin fades, beard sculpting, and hot towel shaves since 2016.'
      );
    }
  }, []);

  return (
    <div className="w-full">
      {/* 01 Hero */}
      <Hero />

      {/* 02 Marquee strip */}
      <MarqueeStrip />

      {/* 03 Gallery preview */}
      <HorizontalGalleryPreview />

      {/* 04 Real Reviews */}
      <RealReviews />

      {/* 05 Booking CTA band */}
      <BookingCtaBand />
    </div>
  );
};
