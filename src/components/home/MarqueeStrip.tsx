import React from 'react';

export const MarqueeStrip: React.FC = () => {
  const items = [
    'SKIN FADE',
    'BEARD SCULPT',
    'ROYAL SHAVE',
    'HAIR COLOUR',
    'KERATIN',
    'GROOM PACKAGES',
    'HOT TOWEL',
    'HEAD MASSAGE',
  ];

  return (
    <section
      id="marquee-strip"
      className="bg-[#0A0908] border-y border-white/10 py-6 overflow-hidden select-none group"
      aria-label="Services Ticker"
    >
      <div className="flex w-max space-x-8 animate-marquee group-hover:[animation-play-state:paused]">
        {/* Render items twice for infinite loop */}
        {[...items, ...items, ...items].map((text, idx) => (
          <div key={idx} className="flex items-center space-x-8">
            <span className="font-bold text-xl sm:text-2xl tracking-wider text-[#F4EFE8]/90 whitespace-nowrap">
              {text}
            </span>
            <span className="w-2 h-2 rounded-full bg-[#C9A24B] flex-shrink-0" />
          </div>
        ))}
      </div>
    </section>
  );
};
