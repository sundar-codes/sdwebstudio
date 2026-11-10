import React from 'react';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean;
}

export const Logo: React.FC<LogoProps> = ({ className = '', size = 'md', showText = false }) => {
  // Dimensions for mark
  const sizeMap = {
    sm: 'w-7 h-7',
    md: 'w-9 h-9',
    lg: 'w-14 h-14',
    xl: 'w-20 h-20',
  };

  return (
    <div className={`inline-flex items-center gap-3 select-none ${className}`}>
      <div className={`relative ${sizeMap[size]} shrink-0 flex items-center justify-center`}>
        <svg
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full transform-gpu transition-transform duration-300 group-hover:scale-105"
          aria-hidden="true"
        >
          {/* Serif S in Lavender */}
          <text
            x="34"
            y="52"
            fontFamily="'Playfair Display', Georgia, serif"
            fontSize="54"
            fontWeight="500"
            fill="#9986B3"
            textAnchor="middle"
            className="transition-colors duration-300"
          >
            S
          </text>

          {/* Crisp Diagonal Slash */}
          <line
            x1="24"
            y1="64"
            x2="70"
            y2="18"
            stroke="rgba(253, 252, 251, 0.4)"
            strokeWidth="2.2"
            strokeLinecap="round"
          />

          {/* Serif D in Gold */}
          <text
            x="64"
            y="76"
            fontFamily="'Playfair Display', Georgia, serif"
            fontSize="54"
            fontWeight="500"
            fill="#C2A878"
            textAnchor="middle"
            className="transition-colors duration-300"
          >
            D
          </text>
        </svg>
      </div>

      {showText && (
        <div className="flex flex-col leading-none">
          <span className="font-serif text-sm tracking-widest text-[#FDFCFB] font-semibold">
            SD WEB STUDIO
          </span>
          <span className="text-[9px] font-sans tracking-[0.25em] text-[#9CA3AF] uppercase mt-0.5">
            Coimbatore
          </span>
        </div>
      )}
    </div>
  );
};
