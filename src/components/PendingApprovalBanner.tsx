import React from 'react';
import { Transaction } from '../types/custodia';
import { Shield, ExternalLink } from 'lucide-react';
import { Translations } from '../i18n/translations';
import { ArmadilloLiveIndicator } from './ArmadilloBadge';

interface PendingApprovalBannerProps {
  pendingTx: Transaction;
  onApprove: (txId: string) => void;
  onReject: (txId: string) => void;
  onViewDetails: (tx: Transaction) => void;
  t: Translations;
}

export const PendingApprovalBanner: React.FC<PendingApprovalBannerProps> = ({
  pendingTx,
  onApprove,
  onReject,
  onViewDetails,
  t,
}) => {
  return (
    <div className="bg-white border border-[#DCE6FF] rounded-2xl p-5 space-y-3.5 shadow-sm">
      {/* Header Eyebrow & Live Indicator */}
      <div className="flex items-center justify-between">
        <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-[#51607F] font-semibold">
          AGENT REQUEST
        </span>
        <ArmadilloLiveIndicator active={true} size="sm" />
      </div>

      {/* Main Big Amount */}
      <div className="flex items-baseline justify-between gap-2">
        <div className="font-heading font-bold text-3xl sm:text-4xl text-[#0B1433] tracking-tight tabular-nums">
          ${pendingTx.amount.toFixed(2)}{' '}
          <span className="text-xs font-mono font-normal text-[#51607F]">
            {pendingTx.currency}
          </span>
        </div>
        <span className="text-[10px] font-mono text-[#E58A00] bg-[#FFF8E6] border border-[#E58A00]/30 px-2 py-0.5 rounded-full font-medium">
          {t.authRequired}
        </span>
      </div>

      {/* Purchase Context */}
      <p className="text-xs text-[#0B1433] leading-relaxed">
        {pendingTx.userInstruction ? (
          <>
            Your AI agent requests authorization for{' '}
            <strong className="font-semibold text-[#0B1433]">{pendingTx.itemSummary}</strong> at{' '}
            <strong className="font-semibold text-[#1F4FE0]">{pendingTx.merchantName}</strong>.
          </>
        ) : (
          <>
            Purchase authorization requested at{' '}
            <strong className="font-semibold text-[#0B1433]">{pendingTx.merchantName}</strong> for{' '}
            <span className="text-[#51607F]">{pendingTx.itemSummary}</span>.
          </>
        )}
      </p>

      {/* Scoped Mandate Notice Line in Mono */}
      <div className="pt-1 border-t border-[#DCE6FF] flex items-center justify-between text-[11px] font-mono text-[#51607F]">
        <span>single-use virtual card · domain locked · expires 30 min</span>
        <button
          type="button"
          onClick={() => onViewDetails(pendingTx)}
          className="text-[#1F4FE0] hover:text-[#183fc0] font-medium flex items-center gap-1 cursor-pointer underline decoration-dotted"
        >
          <span>{t.reviewFullAudit}</span>
          <ExternalLink className="w-3 h-3" />
        </button>
      </div>

      {/* Action Buttons: Primary (Armadillo Blue) + Secondary (Frost) */}
      <div className="grid grid-cols-2 gap-3 pt-1">
        <button
          type="button"
          onClick={() => onApprove(pendingTx.id)}
          className="py-2.5 px-4 text-xs font-semibold text-white bg-[#1F4FE0] hover:bg-[#183fc0] rounded-xl transition-all shadow-xs cursor-pointer active:scale-[0.99] flex items-center justify-center gap-1.5"
        >
          <Shield className="w-3.5 h-3.5" />
          <span>{t.approveMandateBtn}</span>
        </button>
        <button
          type="button"
          onClick={() => onReject(pendingTx.id)}
          className="py-2.5 px-4 text-xs font-semibold text-[#0B1433] bg-[#DCE6FF] hover:bg-[#c9d9ff] rounded-xl transition-all cursor-pointer active:scale-[0.99] flex items-center justify-center gap-1"
        >
          <span>{t.declineBtn}</span>
        </button>
      </div>
    </div>
  );
};

