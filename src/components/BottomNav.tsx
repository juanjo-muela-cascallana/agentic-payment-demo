import React from 'react';
import { Wallet, User, Settings } from 'lucide-react';
import { Translations } from '../i18n/translations';

export type NavTab = 'wallet' | 'profile' | 'settings';

interface BottomNavProps {
  currentTab: NavTab;
  onSelectTab: (tab: NavTab) => void;
  pendingCount?: number;
  t: Translations;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  currentTab,
  onSelectTab,
  pendingCount = 0,
  t,
}) => {
  return (
    <nav
      aria-label="Bottom Navigation"
      className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-[#DCE6FF] shadow-xs"
    >
      <div className="max-w-md mx-auto grid grid-cols-3 h-16 items-center px-4">
        {/* Wallet Tab */}
        <button
          type="button"
          onClick={() => onSelectTab('wallet')}
          className={`flex flex-col items-center justify-center py-1.5 transition-colors cursor-pointer ${
            currentTab === 'wallet'
              ? 'text-[#1F4FE0] font-semibold'
              : 'text-[#51607F] hover:text-[#0B1433]'
          }`}
        >
          <div className="relative">
            <div
              className={`p-1 rounded-xl transition-colors ${
                currentTab === 'wallet' ? 'bg-[#DCE6FF]/60 text-[#1F4FE0]' : ''
              }`}
            >
              <Wallet className="w-5 h-5 stroke-[2]" />
            </div>
            {pendingCount > 0 && (
              <span className="absolute -top-0.5 -right-1 flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#E58A00] opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#E58A00]" />
              </span>
            )}
          </div>
          <span className="text-[11px] mt-0.5 tracking-tight font-medium">{t.navWallet}</span>
        </button>

        {/* Profile Tab */}
        <button
          type="button"
          onClick={() => onSelectTab('profile')}
          className={`flex flex-col items-center justify-center py-1.5 transition-colors cursor-pointer ${
            currentTab === 'profile'
              ? 'text-[#1F4FE0] font-semibold'
              : 'text-[#51607F] hover:text-[#0B1433]'
          }`}
        >
          <div
            className={`p-1 rounded-xl transition-colors ${
              currentTab === 'profile' ? 'bg-[#DCE6FF]/60 text-[#1F4FE0]' : ''
            }`}
          >
            <User className="w-5 h-5 stroke-[2]" />
          </div>
          <span className="text-[11px] mt-0.5 tracking-tight font-medium">{t.navProfile}</span>
        </button>

        {/* Settings Tab */}
        <button
          type="button"
          onClick={() => onSelectTab('settings')}
          className={`flex flex-col items-center justify-center py-1.5 transition-colors cursor-pointer ${
            currentTab === 'settings'
              ? 'text-[#1F4FE0] font-semibold'
              : 'text-[#51607F] hover:text-[#0B1433]'
          }`}
        >
          <div
            className={`p-1 rounded-xl transition-colors ${
              currentTab === 'settings' ? 'bg-[#DCE6FF]/60 text-[#1F4FE0]' : ''
            }`}
          >
            <Settings className="w-5 h-5 stroke-[2]" />
          </div>
          <span className="text-[11px] mt-0.5 tracking-tight font-medium">{t.navSettings}</span>
        </button>
      </div>
    </nav>
  );
};
