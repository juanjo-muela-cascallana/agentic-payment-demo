import React from 'react';
import { UserProfile, WalletState } from '../types/custodia';
import { 
  ShieldCheck, 
  Bot, 
  FileCheck, 
  MapPin 
} from 'lucide-react';
import { Translations } from '../i18n/translations';
import { ArmadilloMark } from './ArmadilloMark';
import { ArmadilloTrustBadge } from './ArmadilloBadge';

interface ProfileViewProps {
  user: UserProfile;
  wallet: WalletState;
  t: Translations;
}

export const ProfileView: React.FC<ProfileViewProps> = ({ user, wallet, t }) => {
  const initials = user.name
    .split(' ')
    .filter(Boolean)
    .map((p) => p[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();

  return (
    <div className="space-y-5 pb-6">
      <header className="pt-1">
        <span className="text-[10px] font-mono uppercase tracking-[0.14em] text-[#51607F] font-semibold block mb-0.5">
          {t.profileHeaderSubtitle}
        </span>
        <h1 className="text-xl font-bold font-heading tracking-tight text-[#0B1433]">
          {t.profileHeaderTitle}
        </h1>
      </header>

      {/* User Card */}
      <div className="border border-[#DCE6FF] rounded-2xl bg-white p-5 space-y-4 shadow-xs">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-[#0B1433] text-white flex items-center justify-center font-bold font-heading text-base border border-[#1F4FE0]/30 shadow-xs">
            <span className="text-[#4CC3FF]">{initials}</span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base font-bold font-heading text-[#0B1433]">{user.name}</h2>
              <span className="text-[10px] font-mono text-[#1E9E6A] bg-[#E8F8F2] border border-[#1E9E6A]/20 px-2 py-0.5 rounded-full font-medium flex items-center gap-1">
                <ShieldCheck className="w-3 h-3 text-[#1E9E6A]" /> {t.kycVerifiedBadge}
              </span>
            </div>
            <p className="text-xs text-[#51607F] flex items-center gap-1 mt-0.5">
              <MapPin className="w-3.5 h-3.5 text-[#1F4FE0]" /> {user.location}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 pt-3 border-t border-[#DCE6FF] text-xs text-[#51607F]">
          <div>
            <span className="text-[#51607F] block text-[10px] uppercase font-mono">{t.emailLabel}</span>
            <span className="font-medium text-[#0B1433]">{user.email}</span>
          </div>
          <div>
            <span className="text-[#51607F] block text-[10px] uppercase font-mono">{t.memberSinceLabel}</span>
            <span className="font-medium text-[#0B1433]">{user.memberSince}</span>
          </div>
        </div>
      </div>

      {/* Connected AI Agent (MCP) */}
      <div className="border border-[#DCE6FF] rounded-2xl bg-white p-5 space-y-3 shadow-xs">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-[#DCE6FF]/60 flex items-center justify-center text-[#1F4FE0]">
              <Bot className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-xs font-bold font-heading text-[#0B1433]">
                {t.connectedAgentTitle}
              </h3>
              <p className="text-[11px] text-[#51607F]">
                {t.connectedAgentSubtitle}
              </p>
            </div>
          </div>
          <span className="text-[10px] font-mono text-[#1E9E6A] bg-[#E8F8F2] border border-[#1E9E6A]/20 px-2 py-0.5 rounded-full font-medium">
            {t.connectedBadge}
          </span>
        </div>

        <div className="bg-[#F4F7FF] p-3 rounded-xl border border-[#DCE6FF] text-xs space-y-2">
          <div className="flex items-center justify-between text-[#51607F]">
            <span>{t.protocolLabel}</span>
            <span className="font-mono text-[#0B1433] font-medium">Model Context Protocol (MCP v0.1)</span>
          </div>
          <div className="flex items-center justify-between text-[#51607F]">
            <span>{t.permissionsLabel}</span>
            <span className="font-mono text-[#1F4FE0]">request_payment · get_status</span>
          </div>
          <div className="flex items-center justify-between text-[#51607F]">
            <span>{t.credentialModeLabel}</span>
            <span className="text-[#0B1433] font-medium">Single-use scoped virtual tokens</span>
          </div>
        </div>
      </div>

      {/* Insurance Underwriting Status */}
      <div className="border border-[#DCE6FF] rounded-2xl bg-white p-5 space-y-3.5 shadow-xs">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-[#0B1433] flex items-center justify-center">
              <ArmadilloMark variant="sky" size={18} />
            </div>
            <div>
              <h3 className="text-xs font-bold font-heading text-[#0B1433]">
                {t.insurancePolicyTitle}
              </h3>
              <p className="text-[11px] text-[#51607F]">
                {user.policyName}
              </p>
            </div>
          </div>
          <ArmadilloTrustBadge />
        </div>

        <div className="text-xs text-[#51607F] space-y-2.5">
          <p className="leading-relaxed">
            {t.insuranceExplanation}
          </p>
          <div className="grid grid-cols-2 gap-2 bg-[#F4F7FF] p-3 rounded-xl border border-[#DCE6FF] font-mono text-[11px]">
            <div>
              <span className="text-[#51607F] block text-[10px]">{t.policyNumberLabel}</span>
              <span className="text-[#0B1433] font-semibold">{user.insurancePolicyId}</span>
            </div>
            <div>
              <span className="text-[#51607F] block text-[10px]">{t.maxCoverageLabel}</span>
              <span className="text-[#1F4FE0] font-semibold">${user.coveragePerPurchaseLimit.toFixed(2)} USD</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
