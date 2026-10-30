import React from 'react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showTagline?: boolean;
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({ 
  size = 'md', 
  showTagline = false,
  className = '' 
}) => {
  const sizeMap = {
    sm: { icon: 24, text: 'text-base', sub: 'text-[9px]' },
    md: { icon: 32, text: 'text-xl', sub: 'text-[10px]' },
    lg: { icon: 44, text: 'text-2xl', sub: 'text-xs' },
    xl: { icon: 58, text: 'text-3xl', sub: 'text-sm' },
  };

  const { icon, text, sub } = sizeMap[size];

  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      {/* Agricultural Leaf + Digital Connection Node SVG */}
      <div 
        className="relative flex items-center justify-center shrink-0 rounded-xl bg-gradient-to-br from-[#16834B] to-[#0f5c34] p-1.5 shadow-sm text-white"
        style={{ width: icon + 8, height: icon + 8 }}
      >
        <svg
          viewBox="0 0 40 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
        >
          {/* Digital Network Nodes & Connection Arcs */}
          <circle cx="9" cy="29" r="2.5" fill="#F4A62A" />
          <circle cx="31" cy="29" r="2.5" fill="#F4A62A" />
          <circle cx="20" cy="8" r="2.8" fill="#F4A62A" />
          
          {/* Connecting digital bridge arcs */}
          <path
            d="M10 27 C 14 20, 16 16, 18 10"
            stroke="#F4A62A"
            strokeWidth="1.6"
            strokeDasharray="2 1.5"
            strokeLinecap="round"
          />
          <path
            d="M30 27 C 26 20, 24 16, 22 10"
            stroke="#F4A62A"
            strokeWidth="1.6"
            strokeDasharray="2 1.5"
            strokeLinecap="round"
          />

          {/* Left Sprouting Leaf (Primary Green Tone) */}
          <path
            d="M20 33 C 12 30, 10 20, 14 13 C 18 15, 20 22, 20 33 Z"
            fill="#F7F8F4"
            fillOpacity="0.95"
          />
          {/* Right Sprouting Leaf with Golden Harvest Accent */}
          <path
            d="M20 33 C 28 30, 30 20, 26 13 C 22 15, 20 22, 20 33 Z"
            fill="#F4A62A"
          />

          {/* Center Sprout Stem & Leaf Vein */}
          <path
            d="M20 34 V 11"
            stroke="#16834B"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
        </svg>
      </div>

      <div className="flex flex-col">
        <div className={`font-bold tracking-tight text-[#252B27] flex items-center leading-none ${text}`}>
          <span>HACK</span>
          <span className="text-[#16834B] ml-0.5">AGRI</span>
          <span className="text-[#F4A62A]">FEST</span>
        </div>
        {showTagline && (
          <span className={`text-stone-500 font-medium tracking-tight mt-1 ${sub}`}>
            Connecting Farmers Directly to Buyers
          </span>
        )}
      </div>
    </div>
  );
};
