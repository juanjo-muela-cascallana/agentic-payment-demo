import React, { useState } from 'react';
import { X, Play, Bot, AlertTriangle, ShieldCheck, ShieldAlert, Sparkles, Cpu } from 'lucide-react';
import { Transaction, ConnectedSubAgent } from '../types/custodia';
import { Translations } from '../i18n/translations';

interface SimulateRequestModalProps {
  isOpen: boolean;
  onClose: () => void;
  onProcessRequest: (tx: Transaction) => void;
  currentBalance: number;
  autoApproveLimit: number;
  subAgents: ConnectedSubAgent[];
  t: Translations;
}

export const SimulateRequestModal: React.FC<SimulateRequestModalProps> = ({
  isOpen,
  onClose,
  onProcessRequest,
  currentBalance,
  autoApproveLimit,
  subAgents,
  t,
}) => {
  const [scenario, setScenario] = useState<'coffee' | 'flight' | 'scam' | 'custom'>('coffee');
  const [selectedAgentId, setSelectedAgentId] = useState<'gemini' | 'openai' | 'claude'>('gemini');
  
  // Custom fields
  const [customMerchant, setCustomMerchant] = useState('Rappi Lima');
  const [customAmount, setCustomAmount] = useState('28.50');
  const [customInstruction, setCustomInstruction] = useState('Order lunch ceviche clásico');

  if (!isOpen) return null;

  const currentAgent = subAgents.find((a) => a.id === selectedAgentId) || subAgents[0];
  const isAgentDeactivated = currentAgent ? !currentAgent.enabled : false;

  const handleRunSimulation = () => {
    let newTx: Transaction;
    const timeStr = 'Just now';

    if (scenario === 'coffee') {
      newTx = {
        id: `tx_${Date.now()}`,
        type: 'purchase',
        merchantName: 'Origen Tostadores Miraflores',
        merchantDomain: 'origentostadores.pe',
        itemSummary: 'Cusco Quillabamba 500g Whole Beans',
        amount: 22.00,
        currency: 'USD',
        timestamp: timeStr,
        status: isAgentDeactivated ? 'REJECTED' : 'APPROVED',
        agent: {
          platform: currentAgent.name,
          model: currentAgent.modelDefault,
          sessionId: `mcp_${currentAgent.id}_test`
        },
        userInstruction: 'Order cold brew beans under $30',
        agentReasoning: isAgentDeactivated 
          ? `Connection to ${currentAgent.name} is deactivated in settings.`
          : 'Selected verified specialty roaster with immediate dispatch. Amount $22 is below auto threshold.',
        riskScore: isAgentDeactivated ? 99 : 6,
        riskReasons: isAgentDeactivated 
          ? [`MCP Connection for ${currentAgent.name} is disabled by user`]
          : ['Verified merchant', 'Price within 5% of historical benchmark', 'Clean intent match'],
        coverageId: isAgentDeactivated ? undefined : `cov_${Math.floor(100 + Math.random() * 900)}_pe`,
        insuranceStatus: isAgentDeactivated ? 'not_covered' : 'covered',
        mandateId: isAgentDeactivated ? undefined : `mnd_auto_${Math.floor(1000 + Math.random() * 9000)}`,
        explanation: isAgentDeactivated 
          ? `Blocked: ${currentAgent.name} MCP connection is turned off.`
          : `Amount $22.00 is under $${autoApproveLimit} auto-approve limit. Issued single-use virtual card.`,
        scopedCredential: !isAgentDeactivated ? {
          type: 'virtual_card',
          cardNumberMasked: '•••• 7719',
          merchantLock: 'origentostadores.pe',
          maxAmount: 24.00,
          expiresAt: '20 minutes from issue',
        } : undefined,
        claimStatus: 'none',
      };
    } else if (scenario === 'flight') {
      newTx = {
        id: `tx_${Date.now()}`,
        type: 'purchase',
        merchantName: 'LATAM Airlines Perú',
        merchantDomain: 'latamairlines.com',
        itemSummary: 'Round-trip LIM to CUZ (Economy Light)',
        amount: 179.00,
        currency: 'USD',
        timestamp: timeStr,
        status: isAgentDeactivated ? 'REJECTED' : 'PENDING_USER',
        agent: {
          platform: currentAgent.name,
          model: currentAgent.modelDefault,
        },
        userInstruction: 'Book me a weekend flight from Lima to Cusco under $200',
        agentReasoning: isAgentDeactivated
          ? `Connection to ${currentAgent.name} is deactivated.`
          : 'Found flight LA 2041 for $179. Exceeds auto-approve cap ($50.00), user authorization required.',
        riskScore: isAgentDeactivated ? 99 : 24,
        riskReasons: isAgentDeactivated
          ? [`MCP Connection for ${currentAgent.name} is disabled by user`]
          : ['Official airline portal', 'Price verified against IATA tariffs'],
        coverageId: isAgentDeactivated ? undefined : `cov_${Math.floor(100 + Math.random() * 900)}_pe`,
        insuranceStatus: isAgentDeactivated ? 'not_covered' : 'pending',
        explanation: isAgentDeactivated
          ? `Blocked: ${currentAgent.name} MCP connection is turned off.`
          : 'Hold placed on wallet pending user biometric sign-off.',
        claimStatus: 'none',
      };
    } else if (scenario === 'scam') {
      newTx = {
        id: `tx_${Date.now()}`,
        type: 'purchase',
        merchantName: 'FlashDeals-Global-Store',
        merchantDomain: 'flashdeals-direct82.biz',
        itemSummary: 'Sony WH-1000XM5 Headphones (Unopened)',
        amount: 145.00,
        currency: 'USD',
        timestamp: timeStr,
        status: 'REJECTED',
        agent: {
          platform: currentAgent.name,
          model: currentAgent.modelDefault,
        },
        userInstruction: 'Find best price for Sony noise cancelling headphones',
        agentReasoning: 'Site offered 65% markdown compared to official retailers.',
        riskScore: 92,
        riskReasons: [
          'Domain registered less than 7 days ago',
          'Price 65% below MSRP reference',
          'Website contains hidden prompt injection script',
          'Unregistered checkout redirect'
        ],
        insuranceStatus: 'not_covered',
        explanation: 'Blocked by Armadillo Review Engine before card generation. No funds charged.',
        claimStatus: 'none',
      };
    } else {
      const amt = parseFloat(customAmount) || 25.00;
      const willApprove = !isAgentDeactivated && amt <= autoApproveLimit && amt <= currentBalance;
      newTx = {
        id: `tx_${Date.now()}`,
        type: 'purchase',
        merchantName: customMerchant,
        merchantDomain: `${customMerchant.toLowerCase().replace(/\s+/g, '')}.com`,
        itemSummary: customInstruction,
        amount: amt,
        currency: 'USD',
        timestamp: timeStr,
        status: isAgentDeactivated ? 'REJECTED' : (willApprove ? 'APPROVED' : 'PENDING_USER'),
        agent: {
          platform: currentAgent.name,
          model: currentAgent.modelDefault,
        },
        userInstruction: customInstruction,
        agentReasoning: `Agent evaluated purchase at ${customMerchant}.`,
        riskScore: isAgentDeactivated ? 99 : (willApprove ? 15 : 45),
        riskReasons: isAgentDeactivated ? [`MCP Connection for ${currentAgent.name} is disabled`] : undefined,
        coverageId: isAgentDeactivated ? undefined : `cov_${Math.floor(100 + Math.random() * 900)}_custom`,
        insuranceStatus: isAgentDeactivated ? 'not_covered' : 'covered',
        explanation: isAgentDeactivated
          ? `Blocked: ${currentAgent.name} MCP connection is turned off.`
          : (willApprove
            ? `Within $${autoApproveLimit} limit. Approved and insured.`
            : `Amount exceeds $${autoApproveLimit} limit. Mandate approval required.`),
        scopedCredential: willApprove ? {
          type: 'virtual_card',
          cardNumberMasked: '•••• 3391',
          merchantLock: `${customMerchant.toLowerCase().replace(/\s+/g, '')}.com`,
          maxAmount: amt * 1.05,
          expiresAt: '30 minutes from issue',
        } : undefined,
        claimStatus: 'none',
      };
    }

    onProcessRequest(newTx);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-neutral-900/60 backdrop-blur-xs">
      <div className="w-full max-w-md bg-white rounded-t-2xl sm:rounded-2xl border border-neutral-200 shadow-xl overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-150">
        <div className="px-5 py-4 border-b border-neutral-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-md bg-neutral-100 flex items-center justify-center text-neutral-800">
              <Bot className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm font-semibold text-neutral-900">
                {t.simulateTitle}
              </h2>
              <p className="text-[11px] text-neutral-500">
                {t.simulateSubtitle}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-md text-neutral-400 hover:text-neutral-700 hover:bg-neutral-100 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-5 space-y-4">
          {/* Sub-Agent Selector */}
          <div>
            <label className="text-[11px] font-medium text-neutral-600 block mb-1.5">
              Select Initiating Sub-Agent:
            </label>
            <div className="grid grid-cols-3 gap-1.5">
              {subAgents.map((ag) => (
                <button
                  key={ag.id}
                  type="button"
                  onClick={() => setSelectedAgentId(ag.id)}
                  className={`py-1.5 px-2 rounded-lg border text-xs font-medium flex items-center justify-center gap-1.5 transition-colors cursor-pointer ${
                    selectedAgentId === ag.id
                      ? 'bg-neutral-900 text-white border-neutral-900 shadow-xs'
                      : 'bg-white text-neutral-700 border-neutral-200 hover:bg-neutral-50'
                  }`}
                >
                  {ag.id === 'gemini' && <Sparkles className="w-3 h-3 text-blue-400" />}
                  {ag.id === 'openai' && <Cpu className="w-3 h-3 text-emerald-400" />}
                  {ag.id === 'claude' && <Bot className="w-3 h-3 text-amber-400" />}
                  <span className="truncate">{ag.id === 'gemini' ? 'Gemini' : ag.id === 'openai' ? 'OpenAI' : 'Claude'}</span>
                  {!ag.enabled && (
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-500 shrink-0" title="Disabled" />
                  )}
                </button>
              ))}
            </div>

            {isAgentDeactivated && (
              <div className="mt-2 p-2 bg-rose-50 border border-rose-200 rounded-lg text-[11px] text-rose-800 flex items-center gap-1.5">
                <AlertTriangle className="w-3.5 h-3.5 text-rose-600 shrink-0" />
                <span>Notice: MCP connection for {currentAgent.name} is switched OFF in Settings.</span>
              </div>
            )}
          </div>

          <p className="text-xs text-neutral-600">
            {t.simulateInstructions}
          </p>

          <div className="space-y-2">
            {/* Scenario 1 */}
            <button
              type="button"
              onClick={() => setScenario('coffee')}
              className={`w-full text-left p-3 rounded-lg border transition-colors cursor-pointer ${
                scenario === 'coffee'
                  ? 'border-neutral-900 bg-neutral-50'
                  : 'border-neutral-200 hover:bg-neutral-50/60'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-neutral-900">
                  {t.scenario1Title}
                </span>
                <span className="text-[10px] font-mono text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">
                  $22.00 ({t.scenario1Badge})
                </span>
              </div>
              <p className="text-xs text-neutral-500 mt-1">
                {t.scenario1Desc}
              </p>
            </button>

            {/* Scenario 2 */}
            <button
              type="button"
              onClick={() => setScenario('flight')}
              className={`w-full text-left p-3 rounded-lg border transition-colors cursor-pointer ${
                scenario === 'flight'
                  ? 'border-neutral-900 bg-neutral-50'
                  : 'border-neutral-200 hover:bg-neutral-50/60'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-neutral-900">
                  {t.scenario2Title}
                </span>
                <span className="text-[10px] font-mono text-amber-700 bg-amber-50 px-1.5 py-0.5 rounded border border-amber-200">
                  $389.00 ({t.scenario2Badge})
                </span>
              </div>
              <p className="text-xs text-neutral-500 mt-1">
                {t.scenario2Desc}
              </p>
            </button>

            {/* Scenario 3 */}
            <button
              type="button"
              onClick={() => setScenario('scam')}
              className={`w-full text-left p-3 rounded-lg border transition-colors cursor-pointer ${
                scenario === 'scam'
                  ? 'border-neutral-900 bg-neutral-50'
                  : 'border-neutral-200 hover:bg-neutral-50/60'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-neutral-900">
                  {t.scenario3Title}
                </span>
                <span className="text-[10px] font-mono text-rose-700 bg-rose-50 px-1.5 py-0.5 rounded border border-rose-200">
                  {t.scenario3Badge}
                </span>
              </div>
              <p className="text-xs text-neutral-500 mt-1">
                {t.scenario3Desc}
              </p>
            </button>

            {/* Custom */}
            <button
              type="button"
              onClick={() => setScenario('custom')}
              className={`w-full text-left p-3 rounded-lg border transition-colors cursor-pointer ${
                scenario === 'custom'
                  ? 'border-neutral-900 bg-neutral-50'
                  : 'border-neutral-200 hover:bg-neutral-50/60'
              }`}
            >
              <span className="text-xs font-semibold text-neutral-900">
                {t.scenarioCustomTitle}
              </span>
              <p className="text-xs text-neutral-500 mt-0.5">
                {t.scenarioCustomDesc}
              </p>
            </button>
          </div>

          {scenario === 'custom' && (
            <div className="space-y-2 pt-2 border-t border-neutral-100">
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-[11px] text-neutral-600 block mb-1">{t.merchantInputLabel}</label>
                  <input
                    type="text"
                    value={customMerchant}
                    onChange={(e) => setCustomMerchant(e.target.value)}
                    className="w-full text-xs px-2.5 py-1.5 border border-neutral-300 rounded bg-neutral-50"
                  />
                </div>
                <div>
                  <label className="text-[11px] text-neutral-600 block mb-1">{t.amountInputLabel}</label>
                  <input
                    type="number"
                    value={customAmount}
                    onChange={(e) => setCustomAmount(e.target.value)}
                    className="w-full text-xs px-2.5 py-1.5 border border-neutral-300 rounded bg-neutral-50 font-mono"
                  />
                </div>
              </div>
              <div>
                <label className="text-[11px] text-neutral-600 block mb-1">{t.instructionInputLabel}</label>
                <input
                  type="text"
                  value={customInstruction}
                  onChange={(e) => setCustomInstruction(e.target.value)}
                  className="w-full text-xs px-2.5 py-1.5 border border-neutral-300 rounded bg-neutral-50"
                />
              </div>
            </div>
          )}

          <div className="pt-2">
            <button
              type="button"
              onClick={handleRunSimulation}
              className="w-full py-2.5 text-xs font-medium bg-neutral-900 text-white rounded-lg hover:bg-neutral-800 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              {t.dispatchBtn}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
