import React, { useState } from 'react';
import { WalletState, ConnectedSubAgent } from '../types/custodia';
import { 
  Power, 
  Sliders, 
  Terminal, 
  Copy, 
  CheckCircle2,
  Globe
} from 'lucide-react';
import { Language, Translations } from '../i18n/translations';
import { SubAgentsWindow } from './SubAgentsWindow';

interface SettingsViewProps {
  wallet: WalletState;
  onUpdateAutoLimit: (limit: number) => void;
  onToggleKillSwitch: () => void;
  currentLanguage: Language;
  onSelectLanguage: (lang: Language) => void;
  subAgents: ConnectedSubAgent[];
  onToggleAgent: (agentId: 'gemini' | 'openai' | 'claude') => void;
  t: Translations;
}

export const SettingsView: React.FC<SettingsViewProps> = ({
  wallet,
  onUpdateAutoLimit,
  onToggleKillSwitch,
  currentLanguage,
  onSelectLanguage,
  subAgents,
  onToggleAgent,
  t,
}) => {
  const [copied, setCopied] = useState(false);
  const [autoLimit, setAutoLimit] = useState<number>(wallet.autoApproveLimit);

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Number(e.target.value);
    setAutoLimit(val);
    onUpdateAutoLimit(val);
  };

  const handlePresetClick = (val: number) => {
    setAutoLimit(val);
    onUpdateAutoLimit(val);
  };

  const copyMcpConfig = () => {
    const config = JSON.stringify({
      mcpServers: {
        armadillo: {
          url: "https://agent.armadillo.latam/mcp/sse",
          headers: {
            "Authorization": "Bearer arma_sec_live_99421"
          }
        }
      }
    }, null, 2);

    navigator.clipboard.writeText(config);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-5 pb-6">
      <header className="pt-1">
        <span className="text-[10px] font-mono uppercase tracking-[0.14em] text-[#51607F] font-semibold block mb-0.5">
          {t.settingsHeaderSubtitle}
        </span>
        <h1 className="text-xl font-bold font-heading tracking-tight text-[#0B1433]">
          {t.settingsHeaderTitle}
        </h1>
      </header>

      {/* Language Switcher Card */}
      <div className="border border-[#DCE6FF] rounded-2xl bg-white p-5 space-y-3 shadow-xs">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-[#DCE6FF]/60 flex items-center justify-center text-[#1F4FE0]">
              <Globe className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm font-bold font-heading text-[#0B1433]">
                {t.languageSectionTitle}
              </h2>
              <p className="text-[11px] text-[#51607F]">
                {t.languageSectionSubtitle}
              </p>
            </div>
          </div>
        </div>

        {/* Language segmented toggle */}
        <div className="grid grid-cols-2 gap-2 pt-1">
          <button
            type="button"
            onClick={() => onSelectLanguage('es')}
            className={`py-2 px-3 text-xs rounded-xl font-medium border flex items-center justify-center gap-2 transition-all cursor-pointer ${
              currentLanguage === 'es'
                ? 'bg-[#1F4FE0] text-white border-[#1F4FE0] shadow-xs font-semibold'
                : 'bg-white text-[#51607F] border-[#DCE6FF] hover:bg-[#F4F7FF]'
            }`}
          >
            <span className="text-sm">🇵🇪</span>
            <span>Español (Perú / LATAM)</span>
          </button>

          <button
            type="button"
            onClick={() => onSelectLanguage('en')}
            className={`py-2 px-3 text-xs rounded-xl font-medium border flex items-center justify-center gap-2 transition-all cursor-pointer ${
              currentLanguage === 'en'
                ? 'bg-[#1F4FE0] text-white border-[#1F4FE0] shadow-xs font-semibold'
                : 'bg-white text-[#51607F] border-[#DCE6FF] hover:bg-[#F4F7FF]'
            }`}
          >
            <span className="text-sm">🇺🇸</span>
            <span>English</span>
          </button>
        </div>
      </div>

      {/* Connected Sub-Agents Window (Gemini, OpenAI, Claude) */}
      <SubAgentsWindow
        agents={subAgents}
        onToggleAgent={onToggleAgent}
        language={currentLanguage}
        t={t}
      />

      {/* Emergency Kill Switch */}
      <div className={`border rounded-2xl p-5 space-y-3 transition-colors ${
        wallet.killSwitchActive 
          ? 'bg-[#FFF5F5] border-[#D83A3A]/40' 
          : 'bg-white border-[#DCE6FF]'
      }`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${
              wallet.killSwitchActive ? 'bg-[#D83A3A] text-white' : 'bg-[#DCE6FF]/60 text-[#0B1433]'
            }`}>
              <Power className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm font-bold font-heading text-[#0B1433]">
                {t.killSwitchTitle}
              </h2>
              <p className="text-[11px] text-[#51607F]">
                {t.killSwitchSubtitle}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onToggleKillSwitch}
            className={`px-3 py-1.5 text-xs font-semibold rounded-xl transition-all cursor-pointer shadow-xs ${
              wallet.killSwitchActive
                ? 'bg-[#D83A3A] text-white hover:bg-[#c42e2e]'
                : 'bg-[#0B1433] text-white hover:bg-[#1a254c]'
            }`}
          >
            {wallet.killSwitchActive ? t.turnOffFreeze : t.activateFreeze}
          </button>
        </div>

        <p className="text-xs text-[#51607F] leading-relaxed">
          {wallet.killSwitchActive
            ? t.killSwitchWarningActive
            : t.killSwitchWarningInactive}
        </p>
      </div>

      {/* Spending Limits Slider */}
      <div className="border border-[#DCE6FF] rounded-2xl bg-white p-5 space-y-4 shadow-xs">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-[#DCE6FF]/60 flex items-center justify-center text-[#1F4FE0]">
            <Sliders className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-sm font-bold font-heading text-[#0B1433]">
              {t.spendingGuardrailsTitle}
            </h2>
            <p className="text-[11px] text-[#51607F]">
              {t.spendingGuardrailsSubtitle}
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <div className="flex items-baseline justify-between mb-2">
              <label htmlFor="auto-approve-slider" className="text-xs font-semibold text-[#0B1433]">
                {t.autoApproveSliderLabel}
              </label>
              <div className="text-right">
                <span className="text-xl font-mono font-bold font-heading text-[#1F4FE0]">
                  ${autoLimit.toFixed(2)}
                </span>
                <span className="text-xs font-normal text-[#51607F] font-mono ml-1">
                  USD
                </span>
              </div>
            </div>

            {/* Slider */}
            <div className="space-y-1.5">
              <input
                id="auto-approve-slider"
                type="range"
                min="0"
                max="300"
                step="5"
                value={autoLimit}
                onChange={handleSliderChange}
                className="w-full h-2 bg-[#DCE6FF] rounded-lg appearance-none cursor-pointer accent-[#1F4FE0] focus:outline-none focus:ring-2 focus:ring-[#1F4FE0]/30"
              />
              <div className="flex justify-between text-[10px] font-mono text-[#51607F] px-0.5">
                <span>$0 ({t.alwaysAskPreset})</span>
                <span>$75</span>
                <span>$150</span>
                <span>$225</span>
                <span>$300</span>
              </div>
            </div>

            {/* Quick Presets */}
            <div className="grid grid-cols-4 gap-1.5 mt-3">
              {[0, 25, 50, 100].map((preset) => (
                <button
                  key={preset}
                  type="button"
                  onClick={() => handlePresetClick(preset)}
                  className={`py-1.5 text-xs font-mono rounded-lg border transition-all cursor-pointer ${
                    autoLimit === preset
                      ? 'bg-[#1F4FE0] text-white border-[#1F4FE0] font-semibold shadow-xs'
                      : 'bg-white text-[#0B1433] border-[#DCE6FF] hover:bg-[#F4F7FF]'
                  }`}
                >
                  {preset === 0 ? t.alwaysAskPreset : `$${preset}`}
                </button>
              ))}
            </div>

            {/* Contextual description */}
            <p className="text-[11px] text-[#51607F] mt-3 leading-relaxed">
              {autoLimit === 0 ? (
                <span className="text-[#E58A00] font-medium">
                  {t.zeroAutoApproveNotice}
                </span>
              ) : (
                <>
                  {currentLanguage === 'es' ? (
                    <>
                      Las compras ≤ <span className="font-mono font-medium text-[#0B1433]">${autoLimit.toFixed(2)}</span> {t.sliderContextNotice}
                    </>
                  ) : (
                    <>
                      Purchases ≤ <span className="font-mono font-medium text-[#0B1433]">${autoLimit.toFixed(2)}</span> {t.sliderContextNotice}
                    </>
                  )}
                </>
              )}
            </p>
          </div>
        </div>
      </div>

      {/* AI MCP Protocol Connector (Phase 2 Readiness) */}
      <div className="border border-[#DCE6FF] rounded-2xl bg-white p-5 space-y-3 shadow-xs">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-[#0B1433] flex items-center justify-center text-[#4CC3FF]">
              <Terminal className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm font-bold font-heading text-[#0B1433]">
                {t.mcpTitle}
              </h2>
              <p className="text-[11px] text-[#51607F]">
                {t.mcpSubtitle}
              </p>
            </div>
          </div>
          <span className="text-[10px] font-mono text-[#1F4FE0] bg-[#DCE6FF] border border-[#1F4FE0]/20 px-2 py-0.5 rounded-full font-semibold">
            {t.readyBadge}
          </span>
        </div>

        <p className="text-xs text-[#51607F] leading-relaxed">
          {t.mcpIntro}
        </p>

        {/* MCP Tools list */}
        <div className="space-y-2 text-xs">
          <div className="p-3 rounded-xl bg-[#F4F7FF] border border-[#DCE6FF] font-mono text-[11px] space-y-1">
            <div className="flex items-center justify-between text-[#0B1433] font-semibold">
              <span className="text-[#1F4FE0]">{t.tool1Title}</span>
              <span className="text-[10px] text-[#51607F] font-sans">{t.tool1Badge}</span>
            </div>
            <p className="text-[#51607F] text-[10px] font-sans">
              {t.tool1Desc}
            </p>
          </div>

          <div className="p-3 rounded-xl bg-[#F4F7FF] border border-[#DCE6FF] font-mono text-[11px] space-y-1">
            <div className="flex items-center justify-between text-[#0B1433] font-semibold">
              <span className="text-[#1F4FE0]">{t.tool2Title}</span>
              <span className="text-[10px] text-[#51607F] font-sans">{t.tool2Badge}</span>
            </div>
            <p className="text-[#51607F] text-[10px] font-sans">
              {t.tool2Desc}
            </p>
          </div>

          <div className="p-3 rounded-xl bg-[#F4F7FF] border border-[#DCE6FF] font-mono text-[11px] space-y-1">
            <div className="flex items-center justify-between text-[#0B1433] font-semibold">
              <span className="text-[#1F4FE0]">{t.tool3Title}</span>
              <span className="text-[10px] text-[#51607F] font-sans">{t.tool3Badge}</span>
            </div>
            <p className="text-[#51607F] text-[10px] font-sans">
              {t.tool3Desc}
            </p>
          </div>

          <div className="p-3 rounded-xl bg-[#F4F7FF] border border-[#DCE6FF] font-mono text-[11px] space-y-1">
            <div className="flex items-center justify-between text-[#0B1433] font-semibold">
              <span className="text-[#1F4FE0]">{t.tool4Title}</span>
              <span className="text-[10px] text-[#51607F] font-sans">{t.tool4Badge}</span>
            </div>
            <p className="text-[#51607F] text-[10px] font-sans">
              {t.tool4Desc}
            </p>
          </div>
        </div>

        {/* Copy MCP snippet button in Frost / Armadillo Blue */}
        <div className="pt-1">
          <button
            type="button"
            onClick={copyMcpConfig}
            className="w-full py-2.5 px-3 text-xs font-mono text-[#0B1433] bg-[#DCE6FF] hover:bg-[#c9d9ff] border border-[#DCE6FF] rounded-xl flex items-center justify-center gap-1.5 transition-all cursor-pointer font-medium"
          >
            {copied ? (
              <>
                <CheckCircle2 className="w-3.5 h-3.5 text-[#1E9E6A]" />
                <span>{t.copiedMcpBtn}</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-[#1F4FE0]" />
                <span>{t.copyMcpBtn}</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
