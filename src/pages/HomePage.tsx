import React, { useEffect } from 'react';
import { Hero } from '../components/home/Hero';
import { MarqueeStrip } from '../components/home/MarqueeStrip';
import { AboutStrip } from '../components/home/AboutStrip';
import { FeaturedServices } from '../components/home/FeaturedServices';
import { PrintedPriceList } from '../components/home/PrintedPriceList';
import { MeetBarbers } from '../components/home/MeetBarbers';
import { BeforeAfterSlider } from '../components/home/BeforeAfterSlider';
import { HorizontalGalleryPreview } from '../components/home/HorizontalGalleryPreview';
import { RealReviews } from '../components/home/RealReviews';
import { FaqSection } from '../components/home/FaqSection';
import { BookingCtaBand } from '../components/home/BookingCtaBand';

export const HomePage: React.FC = () => {
  useEffect(() => {
    document.title =
      "Jerry Hair Saloon | Premium Men's Salon & Grooming Lounge in Allama Iqbal Town, Lahore";
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="w-full">
      {/* 03 Hero */}
      <Hero />

      {/* 04 Marquee strip */}
      <MarqueeStrip />

      {/* 05 About strip */}
      <AboutStrip />

      {/* 06 Services Cards */}
      <FeaturedServices />

      {/* 07 Price list section (cream background) */}
      <PrintedPriceList />

      {/* 08 Meet the Barbers */}
      <MeetBarbers />

      {/* 09 Before / After Slider */}
      <BeforeAfterSlider />

      {/* 10 Gallery preview */}
      <HorizontalGalleryPreview />

      {/* 11 Real Reviews */}
      <RealReviews />

      {/* 12 FAQ accordion */}
      <FaqSection />

      {/* 13 Booking CTA band */}
      <BookingCtaBand />
    </div>
  );
};

