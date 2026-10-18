import React, { useState } from 'react';
import { X, ArrowDownLeft, CheckCircle2 } from 'lucide-react';
import { Translations } from '../i18n/translations';

interface TopUpModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddFunds: (amount: number, method: string) => void;
  t: Translations;
}

export const TopUpModal: React.FC<TopUpModalProps> = ({
  isOpen,
  onClose,
  onAddFunds,
  t,
}) => {
  const [amountStr, setAmountStr] = useState('100');
  const [method, setMethod] = useState<'yape' | 'bcp' | 'card'>('yape');
  const [success, setSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const val = parseFloat(amountStr);
    if (!isNaN(val) && val > 0) {
      setSuccess(true);
      setTimeout(() => {
        onAddFunds(val, method);
        setSuccess(false);
        onClose();
      }, 700);
    }
  };

  const presetAmounts = [50, 100, 250, 500];

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-[#0B1433]/70 backdrop-blur-xs">
      <div className="w-full max-w-md bg-white rounded-t-2xl sm:rounded-2xl border border-[#DCE6FF] shadow-2xl overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-150">
        <div className="px-5 py-4 border-b border-[#DCE6FF] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-[#DCE6FF]/60 flex items-center justify-center text-[#1F4FE0]">
              <ArrowDownLeft className="w-4 h-4" />
            </div>
            <h2 className="text-sm font-bold font-heading text-[#0B1433]">
              {t.topUpTitle}
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-[#51607F] hover:text-[#0B1433] hover:bg-[#F4F7FF] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {success ? (
          <div className="p-8 text-center space-y-2">
            <CheckCircle2 className="w-10 h-10 text-[#1E9E6A] mx-auto" />
            <p className="text-sm font-bold font-heading text-[#0B1433]">{t.depositSuccessTitle}</p>
            <p className="text-xs text-[#51607F] font-mono">
              +${parseFloat(amountStr).toFixed(2)} USD {t.depositSuccessDesc}
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-5 space-y-4">
            <p className="text-xs text-[#51607F] leading-relaxed">
              {t.topUpNotice}
            </p>

            <div>
              <label className="block text-xs font-semibold text-[#0B1433] mb-1">
                {t.depositAmountLabel}
              </label>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#51607F] font-mono text-base font-semibold">
                  $
                </span>
                <input
                  type="number"
                  min="10"
                  step="5"
                  value={amountStr}
                  onChange={(e) => setAmountStr(e.target.value)}
                  className="w-full pl-8 pr-4 py-2.5 bg-[#F4F7FF] border border-[#DCE6FF] rounded-xl text-xl font-mono font-bold text-[#0B1433] focus:outline-none focus:ring-2 focus:ring-[#1F4FE0]/30"
                  required
                />
              </div>

              {/* Presets */}
              <div className="grid grid-cols-4 gap-2 mt-2.5">
                {presetAmounts.map((amt) => (
                  <button
                    key={amt}
                    type="button"
                    onClick={() => setAmountStr(amt.toString())}
                    className={`py-1.5 text-xs font-mono font-semibold rounded-lg border transition-all cursor-pointer ${
                      amountStr === amt.toString()
                        ? 'bg-[#1F4FE0] text-white border-[#1F4FE0] shadow-xs'
                        : 'bg-white text-[#0B1433] border-[#DCE6FF] hover:bg-[#F4F7FF]'
                    }`}
                  >
                    +${amt}
                  </button>
                ))}
              </div>
            </div>

            {/* Rails Adapter Selection */}
            <div>
              <label className="block text-xs font-semibold text-[#0B1433] mb-1">
                {t.railsAdapterLabel}
              </label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setMethod('yape')}
                  className={`p-2.5 text-left border rounded-xl text-xs transition-all cursor-pointer ${
                    method === 'yape'
                      ? 'border-[#1F4FE0] bg-[#DCE6FF]/40 text-[#0B1433] shadow-xs'
                      : 'border-[#DCE6FF] text-[#51607F] hover:bg-[#F4F7FF]'
                  }`}
                >
                  <span className="font-bold font-heading block text-[#0B1433]">{t.yapeTitle}</span>
                  <span className="text-[10px] text-[#51607F] font-mono">{t.yapeDesc}</span>
                </button>
                <button
                  type="button"
                  onClick={() => setMethod('bcp')}
                  className={`p-2.5 text-left border rounded-xl text-xs transition-all cursor-pointer ${
                    method === 'bcp'
                      ? 'border-[#1F4FE0] bg-[#DCE6FF]/40 text-[#0B1433] shadow-xs'
                      : 'border-[#DCE6FF] text-[#51607F] hover:bg-[#F4F7FF]'
                  }`}
                >
                  <span className="font-bold font-heading block text-[#0B1433]">{t.bcpTitle}</span>
                  <span className="text-[10px] text-[#51607F] font-mono">{t.bcpDesc}</span>
                </button>
                <button
                  type="button"
                  onClick={() => setMethod('card')}
                  className={`p-2.5 text-left border rounded-xl text-xs transition-all cursor-pointer ${
                    method === 'card'
                      ? 'border-[#1F4FE0] bg-[#DCE6FF]/40 text-[#0B1433] shadow-xs'
                      : 'border-[#DCE6FF] text-[#51607F] hover:bg-[#F4F7FF]'
                  }`}
                >
                  <span className="font-bold font-heading block text-[#0B1433]">{t.cardTitle}</span>
                  <span className="text-[10px] text-[#51607F] font-mono">{t.cardDesc}</span>
                </button>
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-2.5 text-xs font-semibold bg-[#1F4FE0] hover:bg-[#183fc0] text-white rounded-xl transition-all cursor-pointer shadow-xs active:scale-[0.99]"
              >
                {t.depositSubmitBtn}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
