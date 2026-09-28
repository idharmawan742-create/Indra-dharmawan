import React from 'react';

interface BptiLogoProps {
  variant?: 'light-bg' | 'dark-bg' | 'header';
  className?: string;
  showSubtitle?: boolean;
}

export const BptiLogo: React.FC<BptiLogoProps> = ({
  variant = 'light-bg',
  className = '',
  showSubtitle = true
}) => {
  const isDarkBg = variant === 'dark-bg';
  const isHeader = variant === 'header';

  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      {/* Visual BPTI Badge/Emblem */}
      <div className={`relative flex items-center justify-center font-black tracking-tighter italic ${
        isHeader ? 'px-2 py-1' : 'px-3 py-1.5'
      }`}>
        <svg
          viewBox="0 0 160 50"
          className={isHeader ? 'h-9 w-auto' : 'h-11 w-auto'}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="bptiGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#4ADE80" />
              <stop offset="45%" stopColor="#22C55E" />
              <stop offset="100%" stopColor="#15803D" />
            </linearGradient>
            <linearGradient id="bptiBlueGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#0284C7" />
              <stop offset="100%" stopColor="#0369A1" />
            </linearGradient>
          </defs>

          {/* Letter B */}
          <text
            x="4"
            y="38"
            fontFamily="system-ui, -apple-system, sans-serif"
            fontWeight="900"
            fontStyle="italic"
            fontSize="44"
            fill="url(#bptiGradient)"
            letterSpacing="-2"
          >
            B
          </text>
          {/* Letter P */}
          <text
            x="38"
            y="38"
            fontFamily="system-ui, -apple-system, sans-serif"
            fontWeight="900"
            fontStyle="italic"
            fontSize="44"
            fill="url(#bptiGradient)"
            letterSpacing="-2"
          >
            P
          </text>
          {/* Letter T */}
          <text
            x="72"
            y="38"
            fontFamily="system-ui, -apple-system, sans-serif"
            fontWeight="900"
            fontStyle="italic"
            fontSize="44"
            fill="url(#bptiGradient)"
            letterSpacing="-2"
          >
            T
          </text>
          {/* Letter I */}
          <text
            x="105"
            y="38"
            fontFamily="system-ui, -apple-system, sans-serif"
            fontWeight="900"
            fontStyle="italic"
            fontSize="44"
            fill="url(#bptiGradient)"
            letterSpacing="-2"
          >
            I
          </text>

          {/* Sleek dynamic curve line underneath */}
          <path
            d="M 8 45 C 45 42, 85 42, 125 45"
            stroke="url(#bptiBlueGrad)"
            strokeWidth="3.5"
            strokeLinecap="round"
          />
        </svg>
      </div>

      {/* Typography Label */}
      {showSubtitle && (
        <div className="flex flex-col text-left leading-tight">
          <span className={`font-bold tracking-tight ${
            isDarkBg ? 'text-white text-lg' : isHeader ? 'text-white text-lg' : 'text-slate-900 text-lg'
          }`}>
            BPTI UHAMKA
          </span>
          <span className={`text-[10.5px] font-medium leading-none ${
            isDarkBg ? 'text-blue-100' : isHeader ? 'text-blue-100' : 'text-slate-500'
          }`}>
            Badan Pengembangan Teknologi Informasi Uhamka
          </span>
        </div>
      )}
    </div>
  );
};
