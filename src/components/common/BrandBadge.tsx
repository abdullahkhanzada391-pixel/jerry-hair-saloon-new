import React from 'react';

interface BrandBadgeProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const BrandBadge: React.FC<BrandBadgeProps> = ({ size = 'sm', className = '' }) => {
  const sizeClasses = {
    sm: 'w-5 h-5 p-0.5 rounded-md',
    md: 'w-6 h-6 p-0.5 rounded-md',
    lg: 'w-10 h-10 p-1 rounded-xl',
  }[size];

  return (
    <div
      className={`inline-flex items-center justify-center bg-[#1A1917] border border-[#C9A24B]/40 shadow-sm flex-shrink-0 select-none overflow-hidden ${sizeClasses} ${className}`}
      aria-hidden="true"
    >
      <img
        src="/beard-logo-transparent.png"
        alt="Jerry Hair Saloon Logo"
        className="w-full h-full object-contain filter drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)]"
        width={size === 'lg' ? 40 : size === 'md' ? 24 : 20}
        height={size === 'lg' ? 40 : size === 'md' ? 24 : 20}
      />
    </div>
  );
};

