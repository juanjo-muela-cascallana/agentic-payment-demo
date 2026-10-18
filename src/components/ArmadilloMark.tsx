import React from 'react';

export type ArmadilloMarkVariant = 'blue' | 'sky' | 'white' | 'ink';

interface ArmadilloMarkProps extends React.SVGProps<SVGSVGElement> {
  variant?: ArmadilloMarkVariant;
  size?: number | string;
  className?: string;
}

export const ArmadilloMark: React.FC<ArmadilloMarkProps> = ({
  variant = 'blue',
  size = 32,
  className = '',
  style,
  ...props
}) => {
  // Brand color mapping according to specs
  const getColor = () => {
    switch (variant) {
      case 'sky':
        return '#4CC3FF'; // Signal Sky
      case 'white':
        return '#FFFFFF';
      case 'ink':
        return '#0B1433'; // Deep Ink
      case 'blue':
      default:
        return '#1F4FE0'; // Armadillo Blue
    }
  };

  const fillColor = getColor();

  return (
    <svg
      viewBox="0 0 1000 640"
      width={size}
      style={{
        aspectRatio: '1000/640',
        height: typeof size === 'number' ? (size * 640) / 1000 : undefined,
        ...style,
      }}
      fill={fillColor}
      xmlns="http://www.w3.org/2000/svg"
      className={`shrink-0 ${className}`}
      aria-label="armadillo logo"
      {...props}
    >
      {/* 
        High-fidelity armadillo mark vectorized according to brand specs:
        Alert right-facing profile, arched segmented armor shell bands, 
        pointed snout, dual upright ears, and sweeping tail.
      */}
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M480,18 C300,18 135,115 55,270 C28,322 16,380 20,442 C22,475 35,502 60,518 C78,530 105,532 135,528 C160,524 175,506 182,482 C192,448 208,418 230,392 C255,420 282,460 295,505 C305,538 322,544 358,544 C390,544 415,530 422,502 C430,470 425,438 410,412 C440,418 472,428 505,442 C540,458 578,482 602,512 C614,528 630,544 656,544 C688,544 712,530 722,500 C732,468 732,438 720,410 C755,392 795,385 835,390 C855,392 882,408 905,430 C935,460 962,492 982,510 C990,518 998,510 994,500 C980,465 955,422 935,385 C915,350 890,320 870,290 C882,260 892,225 892,190 C892,168 878,155 860,165 C842,175 828,205 818,238 C805,215 788,198 768,188 C750,178 738,188 742,208 C748,238 760,268 775,296 C740,305 705,325 675,355 C640,290 595,225 540,172 C505,138 465,110 420,90 C400,80 395,68 410,58 C432,42 458,28 480,18 Z M455,75 C512,130 560,200 592,275 C540,285 490,300 445,328 C415,248 375,178 322,122 C362,100 408,82 455,75 Z M300,140 C350,195 385,262 410,340 C370,360 335,385 305,418 C280,350 250,290 208,240 C235,200 265,168 300,140 Z M185,260 C222,308 248,365 268,430 C238,458 215,492 200,530 C165,510 135,480 115,440 C95,400 90,355 98,310 C120,288 150,270 185,260 Z M830,345 C838,345 845,352 842,360 C838,370 825,378 815,375 C808,372 805,362 812,354 C816,348 822,345 830,345 Z"
      />
    </svg>
  );
};

interface ArmadilloLogoProps {
  variant?: 'light' | 'dark' | 'brand';
  size?: 'sm' | 'md' | 'lg';
  showTagline?: boolean;
  className?: string;
}

export const ArmadilloLogo: React.FC<ArmadilloLogoProps> = ({
  variant = 'light',
  size = 'md',
  showTagline = false,
  className = '',
}) => {
  // Specs:
  // On White / Ice (variant: 'light'): Symbol in Armadillo Blue (#1F4FE0), Wordmark in Deep Ink (#0B1433)
  // On Deep Ink (variant: 'dark'): Symbol in Signal Sky (#4CC3FF), Wordmark in White (#FFFFFF)
  // On Armadillo Blue (variant: 'brand'): Symbol in White (#FFFFFF), Wordmark in White (#FFFFFF)

  const markVariant: ArmadilloMarkVariant =
    variant === 'dark' ? 'sky' : variant === 'brand' ? 'white' : 'blue';

  const wordmarkColor =
    variant === 'dark' || variant === 'brand' ? 'text-white' : 'text-[#0B1433]';

  const markSize = size === 'sm' ? 24 : size === 'lg' ? 44 : 32;
  const textSize = size === 'sm' ? 'text-base' : size === 'lg' ? 'text-2xl' : 'text-lg';

  return (
    <div className={`inline-flex items-center gap-2.5 select-none ${className}`}>
      <ArmadilloMark variant={markVariant} size={markSize} />
      <div className="flex flex-col">
        <span
          className={`font-heading font-bold lowercase tracking-[-0.035em] leading-none ${wordmarkColor} ${textSize}`}
          style={{ fontFamily: "'Sora', sans-serif" }}
        >
          armadillo
        </span>
        {showTagline && (
          <span
            className={`text-[9px] uppercase tracking-[0.14em] font-mono mt-0.5 ${
              variant === 'light' ? 'text-[#51607F]' : 'text-neutral-300'
            }`}
          >
            The Trust Layer for AI Payments
          </span>
        )}
      </div>
    </div>
  );
};
