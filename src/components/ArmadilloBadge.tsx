import React from 'react';
import { ArmadilloMark } from './ArmadilloMark';

interface ArmadilloLiveIndicatorProps {
  active?: boolean;
  className?: string;
  size?: 'sm' | 'md';
}

/**
 * Brand Spec Section 5:
 * Live indicator ("armadillo on"): 8 px Signal Sky dot with a soft 30% halo, next to a mono label.
 */
export const ArmadilloLiveIndicator: React.FC<ArmadilloLiveIndicatorProps> = ({
  active = true,
  className = '',
  size = 'md',
}) => {
  return (
    <div
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border select-none transition-colors ${
        active
          ? 'bg-[#0B1433] text-white border-[#0B1433]/80 shadow-2xs'
          : 'bg-[#F4F7FF] text-[#51607F] border-[#DCE6FF]'
      } ${className}`}
    >
      <span className="relative flex h-2 w-2 items-center justify-center">
        {active && (
          <span
            className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#4CC3FF] opacity-75"
            style={{ animationDuration: '2.5s' }}
          />
        )}
        <span
          className={`relative inline-flex rounded-full h-2 w-2 ${
            active ? 'bg-[#4CC3FF]' : 'bg-[#51607F]'
          }`}
          style={
            active
              ? { boxShadow: '0 0 6px rgba(76, 195, 255, 0.75)' }
              : undefined
          }
        />
      </span>
      <span
        className={`font-mono uppercase tracking-[0.14em] font-medium leading-none ${
          size === 'sm' ? 'text-[9px]' : 'text-[10px]'
        } ${active ? 'text-white' : 'text-[#51607F]'}`}
      >
        armadillo on
      </span>
    </div>
  );
};

interface ArmadilloTrustBadgeProps {
  className?: string;
}

/**
 * Brand Spec Section 5:
 * Trust badge: "Protected by armadillo": Deep Ink pill, Signal Sky symbol, white text.
 */
export const ArmadilloTrustBadge: React.FC<ArmadilloTrustBadgeProps> = ({
  className = '',
}) => {
  return (
    <div
      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0B1433] text-white border border-[#1F4FE0]/30 shadow-xs select-none ${className}`}
    >
      <ArmadilloMark variant="sky" size={16} />
      <span className="text-[11px] font-medium font-sans text-neutral-100">
        Protected by <span className="font-heading font-bold lowercase tracking-[-0.035em] text-white">armadillo</span>
      </span>
    </div>
  );
};
