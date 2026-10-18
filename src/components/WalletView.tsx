import React, { useState } from 'react';
import { Transaction, WalletState } from '../types/custodia';
import { 
  Plus, 
  Bot, 
  ArrowUpRight, 
  ArrowDownLeft, 
  ShieldCheck, 
  ShieldAlert, 
  AlertTriangle,
  FileText
} from 'lucide-react';
import { PendingApprovalBanner } from './PendingApprovalBanner';
import { Translations } from '../i18n/translations';
import { ArmadilloLogo } from './ArmadilloMark';
import { ArmadilloLiveIndicator, ArmadilloTrustBadge } from './ArmadilloBadge';

interface WalletViewProps {
  wallet: WalletState;
  transactions: Transaction[];
  onOpenTopUp: () => void;
  onOpenSimulate: () => void;
  onSelectTransaction: (tx: Transaction) => void;
  onApprovePending: (txId: string) => void;
  onRejectPending: (txId: string) => void;
  t: Translations;
}

export const WalletView: React.FC<WalletViewProps> = ({
  wallet,
  transactions,
  onOpenTopUp,
  onOpenSimulate,
  onSelectTransaction,
  onApprovePending,
  onRejectPending,
  t,
}) => {
  const [filter, setFilter] = useState<'all' | 'approved' | 'blocked'>('all');

  const pendingTxs = transactions.filter((tItem) => tItem.status === 'PENDING_USER');

  const filteredTransactions = transactions.filter((tx) => {
    if (filter === 'approved') {
      return tx.status === 'APPROVED' || tx.status === 'SETTLED' || tx.status === 'COMPLETED';
    }
    if (filter === 'blocked') {
      return tx.status === 'REJECTED';
    }
    return true;
  });

  return (
    <div className="space-y-5 pb-6">
      {/* Top Header with Armadillo Brand Identity */}
      <header className="flex items-center justify-between pt-1">
        <div>
          <span className="text-[10px] font-mono uppercase tracking-[0.14em] text-[#51607F] font-semibold block mb-0.5">
            {t.insuredWalletBadge}
          </span>
          <ArmadilloLogo variant="light" size="md" />
        </div>

        <div className="flex items-center gap-2">
          <ArmadilloLiveIndicator active={!wallet.killSwitchActive} size="sm" />
          <button
            type="button"
            onClick={onOpenSimulate}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-[#0B1433] bg-[#DCE6FF] hover:bg-[#c9d9ff] rounded-xl transition-all cursor-pointer shadow-2xs border border-[#DCE6FF]"
            title="Simulate incoming AI purchase request"
          >
            <Bot className="w-3.5 h-3.5 text-[#1F4FE0]" />
            <span>{t.simulateRequestBtn}</span>
          </button>
        </div>
      </header>

      {/* Kill Switch Warning if active */}
      {wallet.killSwitchActive && (
        <div className="bg-[#FFF5F5] border border-[#D83A3A]/30 rounded-2xl p-4 flex items-center justify-between text-xs text-[#D83A3A] shadow-xs">
          <div className="flex items-center gap-2.5">
            <AlertTriangle className="w-4 h-4 text-[#D83A3A] shrink-0" />
            <div>
              <span className="font-semibold font-heading block">{t.killSwitchActiveTitle}</span>
              <span className="text-[#D83A3A]/85 text-[11px]">{t.killSwitchActiveDesc}</span>
            </div>
          </div>
        </div>
      )}

      {/* Wallet Balance Card (Deep Ink + Armadillo Brand System) */}
      <div className="bg-[#0B1433] text-white rounded-2xl p-5 shadow-sm space-y-4 border border-[#1F4FE0]/20 relative overflow-hidden">
        {/* Subtle decorative brand glow in corner */}
        <div className="absolute -top-12 -right-12 w-32 h-32 rounded-full bg-[#1F4FE0]/15 blur-2xl pointer-events-none" />

        <div className="flex items-center justify-between text-xs relative z-10">
          <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-[#8FA8FF] font-medium">
            {t.prefundedBalance}
          </span>
          <ArmadilloTrustBadge />
        </div>

        <div className="relative z-10">
          <div className="text-3xl sm:text-4xl font-bold font-heading text-white tracking-tight tabular-nums flex items-baseline gap-1.5">
            <span>${wallet.balance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
            <span className="text-xs font-mono font-medium text-[#8FA8FF]">
              {wallet.currency}
            </span>
          </div>

          <div className="flex items-center gap-2 text-[11px] text-neutral-300 mt-2 font-mono">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#4CC3FF]" />
            <span>≤ ${wallet.autoApproveLimit.toFixed(2)} {t.autoApprovedSub}</span>
          </div>
        </div>

        {/* Action Button: Primary CTA in Armadillo Blue */}
        <div className="pt-2 border-t border-[#1F4FE0]/20 relative z-10">
          <button
            type="button"
            onClick={onOpenTopUp}
            className="w-full py-2.5 px-4 rounded-xl text-xs font-semibold bg-[#1F4FE0] text-white hover:bg-[#183fc0] active:scale-[0.99] flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-xs"
          >
            <Plus className="w-4 h-4" />
            <span>{t.addFundsButton}</span>
          </button>
        </div>
      </div>

      {/* Pending Authorizations Banner (If any) */}
      {pendingTxs.length > 0 && (
        <div className="space-y-3">
          {pendingTxs.map((tx) => (
            <PendingApprovalBanner
              key={tx.id}
              pendingTx={tx}
              onApprove={onApprovePending}
              onReject={onRejectPending}
              onViewDetails={onSelectTransaction}
              t={t}
            />
          ))}
        </div>
      )}

      {/* Transactions Section */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-bold font-heading text-[#0B1433]">
            {t.transactionsTitle}
          </h2>

          {/* Filter Pills with Frost / Deep Ink Brand Tokens */}
          <div className="flex items-center gap-1 p-1 bg-[#DCE6FF]/50 rounded-xl text-xs border border-[#DCE6FF]">
            <button
              type="button"
              onClick={() => setFilter('all')}
              className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer text-[11px] font-medium ${
                filter === 'all'
                  ? 'bg-[#0B1433] text-white font-semibold shadow-xs'
                  : 'text-[#51607F] hover:text-[#0B1433]'
              }`}
            >
              {t.filterAll}
            </button>
            <button
              type="button"
              onClick={() => setFilter('approved')}
              className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer text-[11px] font-medium ${
                filter === 'approved'
                  ? 'bg-[#0B1433] text-white font-semibold shadow-xs'
                  : 'text-[#51607F] hover:text-[#0B1433]'
              }`}
            >
              {t.filterApproved}
            </button>
            <button
              type="button"
              onClick={() => setFilter('blocked')}
              className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer text-[11px] font-medium ${
                filter === 'blocked'
                  ? 'bg-[#0B1433] text-white font-semibold shadow-xs'
                  : 'text-[#51607F] hover:text-[#0B1433]'
              }`}
            >
              {t.filterBlocked}
            </button>
          </div>
        </div>

        {/* List of Transactions */}
        <div className="border border-[#DCE6FF] rounded-2xl bg-white divide-y divide-[#F4F7FF] overflow-hidden shadow-xs">
          {filteredTransactions.length === 0 ? (
            <div className="p-8 text-center text-xs text-[#51607F]">
              {t.noTransactions}
            </div>
          ) : (
            filteredTransactions.map((tx) => {
              const isDeposit = tx.type === 'top_up';
              const isRejected = tx.status === 'REJECTED';
              const isPending = tx.status === 'PENDING_USER';

              return (
                <button
                  key={tx.id}
                  type="button"
                  onClick={() => onSelectTransaction(tx)}
                  className="w-full p-4 flex items-center justify-between text-left hover:bg-[#F4F7FF]/70 transition-colors group cursor-pointer"
                >
                  <div className="flex items-center gap-3 min-w-0 pr-2">
                    {/* Icon with Brand Status Colors */}
                    <div
                      className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 border ${
                        isDeposit
                          ? 'bg-[#DCE6FF] border-[#DCE6FF] text-[#1F4FE0]'
                          : isRejected
                          ? 'bg-[#FEECEC] border-[#D83A3A]/20 text-[#D83A3A]'
                          : isPending
                          ? 'bg-[#FFF8E6] border-[#E58A00]/25 text-[#E58A00]'
                          : 'bg-[#E8F8F2] border-[#1E9E6A]/20 text-[#1E9E6A]'
                      }`}
                    >
                      {isDeposit ? (
                        <ArrowDownLeft className="w-4 h-4" />
                      ) : isRejected ? (
                        <ShieldAlert className="w-4 h-4" />
                      ) : isPending ? (
                        <AlertTriangle className="w-4 h-4" />
                      ) : (
                        <ArrowUpRight className="w-4 h-4" />
                      )}
                    </div>

                    {/* Merchant & Context */}
                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs font-semibold text-[#0B1433] truncate">
                          {tx.merchantName}
                        </span>
                      </div>
                      <p className="text-[11px] text-[#51607F] truncate">
                        {tx.itemSummary}
                      </p>
                      <div className="flex items-center gap-1.5 text-[10px] text-[#51607F] mt-0.5 font-sans">
                        <span>{tx.timestamp}</span>
                        <span>·</span>
                        {isRejected ? (
                          <span className="text-[#D83A3A] font-medium">{t.blockedLabel}</span>
                        ) : isPending ? (
                          <span className="text-[#E58A00] font-medium">{t.needsApprovalLabel}</span>
                        ) : isDeposit ? (
                          <span className="text-[#1F4FE0] font-medium">{t.depositLabel}</span>
                        ) : tx.claimStatus === 'filed' ? (
                          <span className="text-[#E58A00] font-medium flex items-center gap-0.5">
                            <FileText className="w-2.5 h-2.5 text-[#E58A00]" /> {t.claimUnderReviewBadge}
                          </span>
                        ) : (
                          <span className="text-[#1E9E6A] font-medium flex items-center gap-0.5">
                            <ShieldCheck className="w-2.5 h-2.5" /> {t.insuredLabel}
                          </span>
                        )}
                        {tx.agent && (
                          <>
                            <span>·</span>
                            <span className="font-mono text-[9px] uppercase tracking-wider text-[#51607F]">
                              {tx.agent.platform?.replace('Commerce Assistant', '').replace('Agent', '').trim() || 'Agent'}
                            </span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Right side Amount */}
                  <div className="text-right shrink-0">
                    <div
                      className={`text-xs font-semibold font-mono tabular-nums ${
                        isDeposit
                          ? 'text-[#1E9E6A]'
                          : isRejected
                          ? 'text-[#51607F] line-through'
                          : 'text-[#0B1433]'
                      }`}
                    >
                      {isDeposit ? '+' : '-'}${tx.amount.toFixed(2)}
                    </div>
                    <div className="text-[10px] text-[#51607F] font-mono">
                      {tx.currency}
                    </div>
                  </div>
                </button>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};

