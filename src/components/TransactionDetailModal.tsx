import React, { useState } from 'react';
import { Transaction } from '../types/custodia';
import { 
  X, 
  ShieldCheck, 
  ShieldAlert, 
  CreditCard, 
  Bot, 
  FileText, 
  CheckCircle2, 
  AlertCircle,
  RotateCcw
} from 'lucide-react';
import { Translations } from '../i18n/translations';
import { ArmadilloMark } from './ArmadilloMark';

interface TransactionDetailModalProps {
  transaction: Transaction | null;
  onClose: () => void;
  onFileClaim?: (txId: string) => void;
  onCancelClaim?: (txId: string) => void;
  t: Translations;
}

export const TransactionDetailModal: React.FC<TransactionDetailModalProps> = ({
  transaction,
  onClose,
  onFileClaim,
  onCancelClaim,
  t,
}) => {
  const [showConfirmClaim, setShowConfirmClaim] = useState(false);

  if (!transaction) return null;

  const isDeposit = transaction.type === 'top_up';
  const isRejected = transaction.status === 'REJECTED';
  const isApproved = transaction.status === 'APPROVED' || transaction.status === 'SETTLED' || transaction.status === 'COMPLETED';
  const isClaimFiled = transaction.claimStatus === 'filed';

  const handleConfirmClaim = () => {
    setShowConfirmClaim(false);
    if (onFileClaim) {
      onFileClaim(transaction.id);
    }
  };

  const handleCancelClaim = () => {
    if (onCancelClaim) {
      onCancelClaim(transaction.id);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-[#0B1433]/70 backdrop-blur-xs">
      <div 
        className="w-full max-w-md bg-white rounded-t-2xl sm:rounded-2xl border border-[#DCE6FF] shadow-2xl max-h-[90vh] flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-150"
      >
        {/* Header */}
        <div className="px-5 py-4 border-b border-[#DCE6FF] flex items-center justify-between bg-white">
          <div>
            <span className="text-[10px] uppercase tracking-[0.14em] text-[#51607F] font-mono font-semibold">
              {t.txDetailsTitle}
            </span>
            <h2 className="text-base font-bold font-heading text-[#0B1433]">
              {transaction.merchantName}
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-[#51607F] hover:text-[#0B1433] hover:bg-[#F4F7FF] transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content body */}
        <div className="p-5 overflow-y-auto space-y-4 text-sm">
          {/* Main Amount & Status */}
          <div className="text-center py-2 border-b border-[#DCE6FF] pb-4">
            <div className="text-3xl font-bold font-heading text-[#0B1433] font-mono tabular-nums tracking-tight">
              {isDeposit ? '+' : '-'}${transaction.amount.toFixed(2)}{' '}
              <span className="text-xs font-normal text-[#51607F] font-mono">
                {transaction.currency}
              </span>
            </div>
            <p className="text-xs text-[#51607F] mt-1">{transaction.itemSummary}</p>
            
            <div className="mt-3 flex items-center justify-center gap-1.5">
              {isApproved && (
                <span className="inline-flex items-center gap-1 text-xs font-medium text-[#1E9E6A] bg-[#E8F8F2] border border-[#1E9E6A]/20 px-2.5 py-0.5 rounded-full">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  {transaction.status === 'SETTLED' ? t.settledAndInsured : t.approvedAndInsured}
                </span>
              )}
              {isRejected && (
                <span className="inline-flex items-center gap-1 text-xs font-medium text-[#D83A3A] bg-[#FEECEC] border border-[#D83A3A]/20 px-2.5 py-0.5 rounded-full">
                  <ShieldAlert className="w-3.5 h-3.5" />
                  {t.blockedByArmadillo}
                </span>
              )}
              {transaction.status === 'PENDING_USER' && (
                <span className="inline-flex items-center gap-1 text-xs font-medium text-[#E58A00] bg-[#FFF8E6] border border-[#E58A00]/25 px-2.5 py-0.5 rounded-full">
                  <AlertCircle className="w-3.5 h-3.5" />
                  {t.requiresUserApproval}
                </span>
              )}
              <span className="text-xs text-[#DCE6FF]">·</span>
              <span className="text-xs text-[#51607F]">{transaction.timestamp}</span>
            </div>
          </div>

          {/* User Instruction & Agent Context */}
          {transaction.userInstruction && (
            <div className="space-y-2 bg-[#F4F7FF] p-3.5 rounded-xl border border-[#DCE6FF]">
              <div className="flex items-center gap-1.5 text-xs font-bold font-heading text-[#0B1433]">
                <Bot className="w-3.5 h-3.5 text-[#1F4FE0]" />
                <span>{t.agentContextTitle}</span>
              </div>
              <div className="text-xs space-y-1.5">
                <div>
                  <span className="text-[#51607F] block text-[10px] font-mono">{t.userPromptLabel}</span>
                  <span className="text-[#0B1433] font-medium italic">
                    "{transaction.userInstruction}"
                  </span>
                </div>
                {transaction.agentReasoning && (
                  <div>
                    <span className="text-[#51607F] block text-[10px] font-mono">{t.agentReasoningLabel}</span>
                    <span className="text-[#51607F]">{transaction.agentReasoning}</span>
                  </div>
                )}
                {transaction.alternativesConsidered && transaction.alternativesConsidered.length > 0 && (
                  <div className="pt-1 text-[11px] text-[#51607F]">
                    <span>{t.alternativesChecked} </span>
                    {transaction.alternativesConsidered.map((alt, i) => (
                      <span key={i} className="inline-block mr-2 font-mono text-[#0B1433]">
                        {alt.merchant}: ${alt.total.toFixed(2)}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Armadillo Review Engine Decision */}
          {transaction.riskScore !== undefined && (
            <div className="space-y-2 border border-[#DCE6FF] rounded-xl p-3.5 bg-white">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold font-heading text-[#0B1433]">{t.reviewEngineTitle}</span>
                <span className={`font-mono font-medium ${
                  transaction.riskScore < 30 ? 'text-[#1E9E6A]' : 'text-[#D83A3A]'
                }`}>
                  {t.riskScoreLabel} {transaction.riskScore} / 100
                </span>
              </div>
              
              {transaction.explanation && (
                <p className="text-xs text-[#51607F] leading-relaxed">
                  {transaction.explanation}
                </p>
              )}

              {transaction.riskReasons && transaction.riskReasons.length > 0 && (
                <ul className="text-xs space-y-1 text-[#51607F] pt-1">
                  {transaction.riskReasons.map((reason, idx) => (
                    <li key={idx} className="flex items-start gap-1.5">
                      <span className="text-[#1F4FE0] mt-0.5">•</span>
                      <span>{reason}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}

          {/* Scoped Payment Credential (Virtual Card - Deep Ink with Signal Sky logo) */}
          {transaction.scopedCredential && (
            <div className="space-y-2 border border-[#1F4FE0]/30 rounded-2xl p-4 bg-[#0B1433] text-white shadow-xs">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-semibold text-neutral-200">
                  <ArmadilloMark variant="sky" size={18} />
                  <span>{t.scopedCredentialTitle}</span>
                </div>
                <span className="text-[11px] font-mono text-[#4CC3FF]">
                  {transaction.scopedCredential.cardNumberMasked}
                </span>
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs pt-1 text-neutral-300">
                <div>
                  <span className="text-[#8FA8FF] text-[10px] uppercase font-mono block">{t.merchantLockLabel}</span>
                  <span className="font-mono text-xs text-white">
                    {transaction.scopedCredential.merchantLock}
                  </span>
                </div>
                <div>
                  <span className="text-[#8FA8FF] text-[10px] uppercase font-mono block">{t.authorizedMaxLabel}</span>
                  <span className="font-mono text-xs text-white">
                    ${transaction.scopedCredential.maxAmount.toFixed(2)}
                  </span>
                </div>
              </div>
              <p className="text-[10px] text-[#8FA8FF] pt-1.5 border-t border-white/10 font-mono">
                {t.cardScopeNotice}
              </p>
            </div>
          )}

          {/* Insurance Coverage & Claim */}
          {transaction.coverageId && (
            <div className="bg-[#F4F7FF] border border-[#DCE6FF] rounded-2xl p-4 space-y-2.5">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold font-heading text-[#0B1433]">{t.insuranceGuaranteeTitle}</span>
                <span className="font-mono text-[11px] text-[#1F4FE0] font-medium">
                  ID: {transaction.coverageId}
                </span>
              </div>
              <p className="text-xs text-[#51607F] leading-relaxed">
                {t.insuranceDescription}
              </p>

              {/* Status Indicator */}
              {isClaimFiled ? (
                <div className="space-y-2 pt-1 border-t border-[#DCE6FF]">
                  <div className="flex items-center gap-2 text-xs text-[#E58A00] bg-[#FFF8E6] border border-[#E58A00]/30 p-3 rounded-xl">
                    <CheckCircle2 className="w-4 h-4 text-[#E58A00] shrink-0" />
                    <div>
                      <span className="font-semibold block">{t.claimStatusActive}</span>
                      <span className="text-[11px] text-[#0B1433]">{t.claimSubmittedNotice}</span>
                      <span className="text-[10px] font-mono text-[#51607F] block mt-0.5">
                        Ref: CLM-{transaction.id.replace('tx_', '')}-{transaction.coverageId}
                      </span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={handleCancelClaim}
                    className="w-full py-2 px-3 text-xs font-semibold text-[#0B1433] bg-white border border-[#DCE6FF] rounded-xl hover:bg-[#F4F7FF] transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-2xs"
                  >
                    <RotateCcw className="w-3.5 h-3.5 text-[#51607F]" />
                    {t.cancelClaimBtn}
                  </button>
                </div>
              ) : showConfirmClaim ? (
                <div className="p-3.5 bg-white border border-[#E58A00]/50 rounded-xl space-y-2 text-xs animate-in fade-in duration-100 shadow-xs">
                  <div className="flex items-center gap-1.5 text-[#0B1433] font-bold font-heading">
                    <AlertCircle className="w-3.5 h-3.5 text-[#E58A00]" />
                    <span>{t.confirmClaimTitle}</span>
                  </div>
                  <p className="text-[11px] text-[#51607F] leading-relaxed">
                    {t.confirmClaimDesc}
                  </p>
                  <div className="grid grid-cols-2 gap-2 pt-1">
                    <button
                      type="button"
                      onClick={() => setShowConfirmClaim(false)}
                      className="py-2 px-2 text-xs font-semibold text-[#0B1433] bg-[#DCE6FF] hover:bg-[#c9d9ff] rounded-xl transition-all cursor-pointer"
                    >
                      {t.cancelBtn}
                    </button>
                    <button
                      type="button"
                      onClick={handleConfirmClaim}
                      className="py-2 px-2 text-xs font-semibold text-white bg-[#1F4FE0] hover:bg-[#183fc0] rounded-xl transition-all cursor-pointer shadow-xs"
                    >
                      {t.confirmClaimBtn}
                    </button>
                  </div>
                </div>
              ) : (
                <div className="pt-1 border-t border-[#DCE6FF] space-y-2">
                  <div className="flex items-center justify-between text-xs text-[#51607F]">
                    <span className="inline-flex items-center gap-1 text-[11px] text-[#1E9E6A] bg-[#E8F8F2] border border-[#1E9E6A]/20 px-2.5 py-0.5 rounded-full font-medium">
                      <ShieldCheck className="w-3.5 h-3.5 text-[#1E9E6A]" />
                      {t.claimStatusNone}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setShowConfirmClaim(true)}
                    className="w-full py-2.5 px-3 text-xs font-semibold text-[#0B1433] bg-white border border-[#DCE6FF] rounded-xl hover:bg-[#DCE6FF]/50 transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-2xs"
                  >
                    <FileText className="w-3.5 h-3.5 text-[#1F4FE0]" />
                    {t.fileClaimBtn}
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Ledger Record Metadata */}
          <div className="pt-2 text-[11px] text-[#51607F] border-t border-[#DCE6FF] flex items-center justify-between font-mono">
            <span>{t.txIdLabel}: {transaction.id}</span>
            {transaction.mandateId && <span>{t.mandateLabel}: {transaction.mandateId}</span>}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-[#DCE6FF] bg-[#F4F7FF]/50">
          <button
            type="button"
            onClick={onClose}
            className="w-full py-2.5 text-xs font-semibold bg-[#1F4FE0] hover:bg-[#183fc0] text-white rounded-xl transition-all cursor-pointer shadow-xs active:scale-[0.99]"
          >
            {t.doneBtn}
          </button>
        </div>
      </div>
    </div>
  );
};
