import React, { useState, useEffect } from 'react';
import { 
  INITIAL_WALLET, 
  INITIAL_TRANSACTIONS, 
  INITIAL_USER,
  INITIAL_SUB_AGENTS
} from './data/initialData';
import { Transaction, WalletState, UserProfile, ConnectedSubAgent } from './types/custodia';
import { BottomNav, NavTab } from './components/BottomNav';
import { WalletView } from './components/WalletView';
import { ProfileView } from './components/ProfileView';
import { SettingsView } from './components/SettingsView';
import { TransactionDetailModal } from './components/TransactionDetailModal';
import { TopUpModal } from './components/TopUpModal';
import { SimulateRequestModal } from './components/SimulateRequestModal';
import { Language, translations } from './i18n/translations';

export default function App() {
  const [currentTab, setCurrentTab] = useState<NavTab>('wallet');
  const [language, setLanguage] = useState<Language>('es');
  const [wallet, setWallet] = useState<WalletState>(INITIAL_WALLET);
  const [transactions, setTransactions] = useState<Transaction[]>(INITIAL_TRANSACTIONS);
  const [user, setUser] = useState<UserProfile>(INITIAL_USER);
  const [subAgents, setSubAgents] = useState<ConnectedSubAgent[]>(INITIAL_SUB_AGENTS);

  // Active translation dictionary
  const t = translations[language];

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  // Toggle MCP connection for specific sub-agent
  const handleToggleSubAgent = (agentId: 'gemini' | 'openai' | 'claude') => {
    setSubAgents((prev) =>
      prev.map((agent) =>
        agent.id === agentId ? { ...agent, enabled: !agent.enabled } : agent
      )
    );
  };

  // Modals
  const [selectedTx, setSelectedTx] = useState<Transaction | null>(null);
  const [isTopUpOpen, setIsTopUpOpen] = useState(false);
  const [isSimulateOpen, setIsSimulateOpen] = useState(false);

  // Deposit funds handler
  const handleAddFunds = (amount: number, method: string) => {
    setWallet((prev) => ({
      ...prev,
      balance: prev.balance + amount,
    }));

    const depositTx: Transaction = {
      id: `tx_${Date.now()}`,
      type: 'top_up',
      merchantName: language === 'es' ? `Depósito vía ${method.toUpperCase()}` : `Deposit via ${method.toUpperCase()}`,
      itemSummary: language === 'es' ? `Recarga de saldo (${method.toUpperCase()})` : `Prefunded reload (${method.toUpperCase()})`,
      amount,
      currency: wallet.currency,
      timestamp: language === 'es' ? 'Ahora' : 'Just now',
      status: 'COMPLETED',
      explanation: language === 'es' ? 'Fondos acreditados al libro de saldo Armadillo.' : 'Funds credited to prefunded wallet ledger.',
      claimStatus: 'none',
    };

    setTransactions((prev) => [depositTx, ...prev]);
  };

  // Agent request handler
  const handleProcessAgentRequest = (tx: Transaction) => {
    // If kill switch is active, automatically reject
    if (wallet.killSwitchActive && tx.type === 'purchase') {
      const blockedTx: Transaction = {
        ...tx,
        status: 'REJECTED',
        riskReasons: [language === 'es' ? 'El Interruptor de Parada está activo en ajustes' : 'Emergency Kill Switch is currently active in user settings'],
        explanation: language === 'es' ? 'Bloqueado porque el usuario pausó los pagos de agentes.' : 'Blocked because user paused all AI agent payments.',
        scopedCredential: undefined,
      };
      setTransactions((prev) => [blockedTx, ...prev]);
      return;
    }

    // If approved, deduct balance
    if (tx.status === 'APPROVED') {
      setWallet((prev) => ({
        ...prev,
        balance: Math.max(0, prev.balance - tx.amount),
        spentThisMonth: (prev.spentThisMonth ?? 0) + tx.amount,
      }));
    }

    setTransactions((prev) => [tx, ...prev]);
  };

  // Approve a pending high-value transaction
  const handleApprovePending = (txId: string) => {
    setTransactions((prev) =>
      prev.map((tx) => {
        if (tx.id === txId) {
          const approvedTx: Transaction = {
            ...tx,
            status: 'APPROVED',
            mandateId: `mnd_faceid_${Date.now().toString().slice(-4)}`,
            insuranceStatus: 'covered',
            explanation: language === 'es' 
              ? 'Aprobado por el usuario mediante mandato biométrico. Cobertura Armadillo activa.' 
              : 'Approved by user via biometric mandate. Armadillo coverage active.',
            scopedCredential: {
              type: 'virtual_card',
              cardNumberMasked: '•••• ' + Math.floor(1000 + Math.random() * 9000),
              merchantLock: tx.merchantDomain || 'approved-merchant.com',
              maxAmount: tx.amount * 1.05,
              expiresAt: language === 'es' ? '30 minutos desde emisión' : '30 minutes from issue',
            },
          };

          // Deduct from balance
          setWallet((w) => ({
            ...w,
            balance: Math.max(0, w.balance - tx.amount),
            spentThisMonth: (w.spentThisMonth ?? 0) + tx.amount,
          }));

          return approvedTx;
        }
        return tx;
      })
    );
  };

  // Reject a pending transaction
  const handleRejectPending = (txId: string) => {
    setTransactions((prev) =>
      prev.map((tx) => {
        if (tx.id === txId) {
          return {
            ...tx,
            status: 'REJECTED',
            explanation: language === 'es' 
              ? 'Rechazado por el usuario. Tarjeta virtual cancelada.' 
              : 'Decline requested by user. Virtual card revoked.',
          };
        }
        return tx;
      })
    );
  };

  // Claim handler
  const handleFileClaim = (txId: string) => {
    setTransactions((prev) =>
      prev.map((tx) => (tx.id === txId ? { ...tx, claimStatus: 'filed' } : tx))
    );
    if (selectedTx && selectedTx.id === txId) {
      setSelectedTx((prev) => (prev ? { ...prev, claimStatus: 'filed' } : null));
    }
  };

  // Cancel/withdraw claim handler
  const handleCancelClaim = (txId: string) => {
    setTransactions((prev) =>
      prev.map((tx) => (tx.id === txId ? { ...tx, claimStatus: 'none' } : tx))
    );
    if (selectedTx && selectedTx.id === txId) {
      setSelectedTx((prev) => (prev ? { ...prev, claimStatus: 'none' } : null));
    }
  };

  // Update auto limit
  const handleUpdateAutoLimit = (limit: number) => {
    setWallet((prev) => ({ ...prev, autoApproveLimit: limit }));
  };

  // Toggle kill switch
  const handleToggleKillSwitch = () => {
    setWallet((prev) => ({ ...prev, killSwitchActive: !prev.killSwitchActive }));
  };

  const pendingCount = transactions.filter((tItem) => tItem.status === 'PENDING_USER').length;

  return (
    <div className="min-h-screen bg-[#F4F7FF] flex justify-center text-[#0B1433] font-sans selection:bg-[#DCE6FF] selection:text-[#0B1433]">
      {/* Mobile-centric Frame (Max-w-md on desktop for realistic app feel) */}
      <div className="w-full max-w-md bg-white min-h-screen flex flex-col border-x border-[#DCE6FF] shadow-sm relative">
        {/* Main Content Area */}
        <main className="flex-1 p-5 pb-24 overflow-y-auto">
          {currentTab === 'wallet' && (
            <WalletView
              wallet={wallet}
              transactions={transactions}
              onOpenTopUp={() => setIsTopUpOpen(true)}
              onOpenSimulate={() => setIsSimulateOpen(true)}
              onSelectTransaction={(tx) => setSelectedTx(tx)}
              onApprovePending={handleApprovePending}
              onRejectPending={handleRejectPending}
              t={t}
            />
          )}

          {currentTab === 'profile' && (
            <ProfileView user={user} wallet={wallet} t={t} />
          )}

          {currentTab === 'settings' && (
            <SettingsView
              wallet={wallet}
              onUpdateAutoLimit={handleUpdateAutoLimit}
              onToggleKillSwitch={handleToggleKillSwitch}
              currentLanguage={language}
              onSelectLanguage={(lang) => setLanguage(lang)}
              subAgents={subAgents}
              onToggleAgent={handleToggleSubAgent}
              t={t}
            />
          )}
        </main>

        {/* Bottom Navigation */}
        <BottomNav
          currentTab={currentTab}
          onSelectTab={(tab) => setCurrentTab(tab)}
          pendingCount={pendingCount}
          t={t}
        />

        {/* Modals & Sheets */}
        {selectedTx && (
          <TransactionDetailModal
            key={selectedTx.id}
            transaction={selectedTx}
            onClose={() => setSelectedTx(null)}
            onFileClaim={handleFileClaim}
            onCancelClaim={handleCancelClaim}
            t={t}
          />
        )}

        <TopUpModal
          isOpen={isTopUpOpen}
          onClose={() => setIsTopUpOpen(false)}
          onAddFunds={handleAddFunds}
          t={t}
        />

        <SimulateRequestModal
          isOpen={isSimulateOpen}
          onClose={() => setIsSimulateOpen(false)}
          onProcessRequest={handleProcessAgentRequest}
          currentBalance={wallet.balance}
          autoApproveLimit={wallet.autoApproveLimit}
          subAgents={subAgents}
          t={t}
        />
      </div>
    </div>
  );
}
