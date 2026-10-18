import React, { useState } from 'react';
import { ConnectedSubAgent } from '../types/custodia';
import { 
  ChevronDown, 
  ChevronUp, 
  Sparkles, 
  Cpu, 
  Bot, 
  Check, 
  Copy, 
  CheckCircle2, 
  ExternalLink, 
  Shield, 
  Radio,
  SlidersHorizontal,
  Activity
} from 'lucide-react';
import { Language, Translations } from '../i18n/translations';

interface SubAgentsWindowProps {
  agents: ConnectedSubAgent[];
  onToggleAgent: (agentId: 'gemini' | 'openai' | 'claude') => void;
  language: Language;
  t: Translations;
}

export const SubAgentsWindow: React.FC<SubAgentsWindowProps> = ({
  agents,
  onToggleAgent,
  language,
  t,
}) => {
  // State for which dropdown is open (can have one or multiple open)
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [copiedEndpoint, setCopiedEndpoint] = useState<string | null>(null);
  const [pingingId, setPingingId] = useState<string | null>(null);
  const [pingSuccessId, setPingSuccessId] = useState<string | null>(null);

  const toggleDropdown = (id: string) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  const handleCopy = (endpoint: string, id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(endpoint);
    setCopiedEndpoint(id);
    setTimeout(() => setCopiedEndpoint(null), 1800);
  };

  const handlePing = (id: string) => {
    setPingingId(id);
    setPingSuccessId(null);
    setTimeout(() => {
      setPingingId(null);
      setPingSuccessId(id);
      setTimeout(() => setPingSuccessId(null), 3000);
    }, 450);
  };

  // Helper icons and styles per agent
  const getAgentVisuals = (id: string) => {
    switch (id) {
      case 'gemini':
        return {
          icon: <Sparkles className="w-4 h-4 text-[#1F4FE0]" />,
          badgeBg: 'bg-[#DCE6FF] text-[#1F4FE0] border-[#1F4FE0]/30',
          accentBorder: 'border-[#1F4FE0]/30',
          tag: 'Google',
        };
      case 'openai':
        return {
          icon: <Cpu className="w-4 h-4 text-[#0B1433]" />,
          badgeBg: 'bg-[#F4F7FF] text-[#0B1433] border-[#DCE6FF]',
          accentBorder: 'border-[#DCE6FF]',
          tag: 'OpenAI',
        };
      case 'claude':
      default:
        return {
          icon: <Bot className="w-4 h-4 text-[#1F4FE0]" />,
          badgeBg: 'bg-[#DCE6FF] text-[#0B1433] border-[#1F4FE0]/30',
          accentBorder: 'border-[#1F4FE0]/30',
          tag: 'Anthropic',
        };
    }
  };

  const activeCount = agents.filter((a) => a.enabled).length;

  return (
    <div className="border border-[#DCE6FF] rounded-2xl bg-white p-5 space-y-4 shadow-xs">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-[#DCE6FF]/60 flex items-center justify-center text-[#1F4FE0]">
            <SlidersHorizontal className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-sm font-bold font-heading text-[#0B1433]">
                {t.subAgentsTitle}
              </h2>
              <span className="text-[10px] font-mono text-[#1F4FE0] bg-[#DCE6FF] px-2 py-0.5 rounded-full font-semibold">
                {activeCount}/{agents.length} {t.connectedAgentsBadge}
              </span>
            </div>
            <p className="text-[11px] text-[#51607F]">
              {t.subAgentsSubtitle}
            </p>
          </div>
        </div>
      </div>

      {/* Agents Collapsible Dropdowns List */}
      <div className="space-y-2.5 pt-1">
        {agents.map((agent) => {
          const isExpanded = expandedId === agent.id;
          const visuals = getAgentVisuals(agent.id);

          return (
            <div
              key={agent.id}
              className={`border rounded-xl transition-all overflow-hidden ${
                agent.enabled ? 'border-[#DCE6FF] bg-white' : 'border-[#DCE6FF]/60 bg-[#F4F7FF]/70 opacity-90'
              }`}
            >
              {/* Collapsed Header / Dropdown Trigger */}
              <div 
                onClick={() => toggleDropdown(agent.id)}
                className="w-full p-3.5 flex items-center justify-between gap-3 text-left cursor-pointer hover:bg-[#F4F7FF]/80 transition-colors select-none"
              >
                <div className="flex items-center gap-3 min-w-0 flex-1">
                  {/* Icon */}
                  <div className="w-8 h-8 rounded-xl bg-[#DCE6FF]/50 flex items-center justify-center shrink-0 border border-[#DCE6FF]">
                    {visuals.icon}
                  </div>

                  {/* Name & Quick Status */}
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-semibold text-[#0B1433] truncate">
                        {agent.name}
                      </span>
                      <span className={`text-[10px] font-mono px-1.5 py-0.2 rounded border ${visuals.badgeBg}`}>
                        {visuals.tag}
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5 text-[10px] text-[#51607F] mt-0.5">
                      <span className={`inline-block w-1.5 h-1.5 rounded-full ${
                        agent.enabled ? 'bg-[#1E9E6A]' : 'bg-[#51607F]'
                      }`} />
                      <span>{agent.enabled ? t.mcpActive : t.mcpDeactivated}</span>
                      <span>·</span>
                      <span className="font-mono text-[#51607F]">{agent.modelDefault}</span>
                    </div>
                  </div>
                </div>

                {/* Switch & Dropdown Chevron */}
                <div className="flex items-center gap-3 shrink-0">
                  {/* MCP Activation Switch */}
                  <label 
                    onClick={(e) => e.stopPropagation()} 
                    className="relative inline-flex items-center cursor-pointer"
                    title={agent.enabled ? "Deactivate MCP Connection" : "Activate MCP Connection"}
                  >
                    <input
                      type="checkbox"
                      checked={agent.enabled}
                      onChange={() => onToggleAgent(agent.id)}
                      className="sr-only peer"
                    />
                    <div className="w-8 h-4.5 bg-[#DCE6FF] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-neutral-300 after:border after:rounded-full after:h-3.5 after:w-3.5 after:transition-all peer-checked:bg-[#1F4FE0]" />
                  </label>

                  {/* Dropdown Icon */}
                  <div className="text-[#51607F] hover:text-[#0B1433]">
                    {isExpanded ? (
                      <ChevronUp className="w-4 h-4" />
                    ) : (
                      <ChevronDown className="w-4 h-4" />
                    )}
                  </div>
                </div>
              </div>

              {/* Expanded Dropdown Window Content */}
              {isExpanded && (
                <div className="p-4 pt-0 border-t border-[#DCE6FF] bg-[#F4F7FF]/50 space-y-3.5 text-xs animate-in fade-in duration-150">
                  {/* Description */}
                  <p className="text-xs text-[#51607F] leading-relaxed pt-3">
                    {language === 'es' ? agent.descriptionEs : agent.descriptionEn}
                  </p>

                  {/* MCP Server Endpoint */}
                  <div className="bg-white p-3 rounded-xl border border-[#DCE6FF] space-y-1">
                    <span className="text-[10px] uppercase font-mono text-[#51607F] block">
                      {t.mcpEndpointLabel}
                    </span>
                    <div className="flex items-center justify-between gap-2 font-mono text-[11px] text-[#0B1433]">
                      <span className="truncate">{agent.endpoint}</span>
                      <button
                        type="button"
                        onClick={(e) => handleCopy(agent.endpoint, agent.id, e)}
                        className="p-1 text-[#51607F] hover:text-[#0B1433] shrink-0 cursor-pointer"
                        title="Copy endpoint"
                      >
                        {copiedEndpoint === agent.id ? (
                          <Check className="w-3.5 h-3.5 text-[#1E9E6A]" />
                        ) : (
                          <Copy className="w-3.5 h-3.5 text-[#1F4FE0]" />
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Tool Capabilities */}
                  <div className="space-y-1.5">
                    <span className="text-[10px] uppercase font-mono text-[#51607F] block">
                      {t.mcpToolsLabel}
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {agent.mcpTools.map((tool) => (
                        <span
                          key={tool}
                          className="px-2 py-0.5 rounded-lg bg-[#DCE6FF]/60 text-[10px] font-mono text-[#0B1433] border border-[#DCE6FF]"
                        >
                          {tool}()
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Stats Grid */}
                  <div className="grid grid-cols-2 gap-2 pt-1">
                    <div className="bg-white p-2.5 rounded-xl border border-[#DCE6FF]">
                      <span className="text-[10px] font-mono text-[#51607F] block">
                        {t.transactionsApprovedLabel}
                      </span>
                      <span className="text-sm font-semibold font-mono font-heading text-[#0B1433]">
                        {agent.totalTransactionsApproved}
                      </span>
                    </div>
                    <div className="bg-white p-2.5 rounded-xl border border-[#DCE6FF]">
                      <span className="text-[10px] font-mono text-[#51607F] block">
                        {t.totalSpentLabel}
                      </span>
                      <span className="text-sm font-semibold font-mono font-heading text-[#1F4FE0]">
                        ${agent.totalSpent.toFixed(2)} USD
                      </span>
                    </div>
                  </div>

                  {/* Scopes */}
                  <div className="space-y-1">
                    <span className="text-[10px] font-mono text-[#51607F] block">
                      {t.scopesAllowedLabel}
                    </span>
                    <div className="flex flex-wrap gap-1 text-[11px] text-[#51607F]">
                      {agent.scopes.map((s) => (
                        <span key={s} className="bg-white px-2 py-0.5 rounded-md border border-[#DCE6FF] text-[10px] font-mono text-[#0B1433]">
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Ping Test Button */}
                  <div className="pt-1">
                    <button
                      type="button"
                      disabled={!agent.enabled || pingingId === agent.id}
                      onClick={() => handlePing(agent.id)}
                      className={`w-full py-2 px-3 text-xs font-semibold rounded-xl border transition-all flex items-center justify-center gap-1.5 ${
                        !agent.enabled
                          ? 'bg-[#F4F7FF] text-[#51607F] border-[#DCE6FF] cursor-not-allowed opacity-60'
                          : pingSuccessId === agent.id
                          ? 'bg-[#E8F8F2] text-[#1E9E6A] border-[#1E9E6A]/30 font-semibold'
                          : 'bg-[#DCE6FF] text-[#0B1433] border-[#DCE6FF] hover:bg-[#c9d9ff] cursor-pointer shadow-2xs'
                      }`}
                    >
                      {pingingId === agent.id ? (
                        <>
                          <Activity className="w-3.5 h-3.5 animate-spin text-[#1F4FE0]" />
                          <span>Testing MCP connection...</span>
                        </>
                      ) : pingSuccessId === agent.id ? (
                        <>
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#1E9E6A]" />
                          <span>{t.pingSuccess}</span>
                        </>
                      ) : (
                        <>
                          <Radio className="w-3.5 h-3.5 text-[#1F4FE0]" />
                          <span>{t.testPingBtn}</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
