export type TransactionStatus = 
  | 'APPROVED' 
  | 'PENDING_USER' 
  | 'REJECTED' 
  | 'SETTLED' 
  | 'COMPLETED';

export type TransactionType = 'purchase' | 'top_up' | 'refund';

export interface ScopedCredential {
  type: 'virtual_card';
  cardNumberMasked: string;
  merchantLock: string;
  maxAmount: number;
  expiresAt: string;
}

export interface ConnectedSubAgent {
  id: 'gemini' | 'openai' | 'claude';
  name: string;
  provider: string;
  modelDefault: string;
  descriptionEn: string;
  descriptionEs: string;
  enabled: boolean;
  endpoint: string;
  protocol: string;
  mcpTools: string[];
  lastActive: string;
  totalTransactionsApproved: number;
  totalSpent: number;
  scopes: string[];
}

export interface Transaction {
  id: string;
  type: TransactionType;
  merchantName: string;
  merchantDomain?: string;
  itemSummary: string;
  amount: number;
  currency: 'USD' | 'MXN';
  timestamp: string;
  status: TransactionStatus;
  
  // Agent context (MCP)
  agent?: {
    platform: string;
    model?: string;
    sessionId?: string;
  };
  userInstruction?: string;
  agentReasoning?: string;
  alternativesConsidered?: Array<{ merchant: string; total: number }>;
  
  // Review & Insurance Engine
  riskScore?: number; // 0 - 100
  riskReasons?: string[];
  coverageId?: string;
  insuranceStatus?: 'covered' | 'not_covered' | 'pending';
  mandateId?: string;
  explanation?: string;
  
  // Single-use credential issued
  scopedCredential?: ScopedCredential;
  
  // Claim
  claimStatus?: 'none' | 'filed' | 'approved' | 'settled';
}

export interface WalletState {
  balance: number;
  currency: 'USD' | 'MXN';
  heldAmount: number; // Funds currently reserved for active virtual credentials
  autoApproveLimit: number;
  monthlyCap?: number;
  spentThisMonth?: number;
  killSwitchActive: boolean;
  connectedAgent: {
    name: string;
    platform: string;
    status: 'connected' | 'disconnected';
    connectorVersion: string;
    endpoint: string;
  };
}

export interface UserProfile {
  name: string;
  email: string;
  location: string;
  kycStatus: 'verified' | 'pending' | 'unverified';
  memberSince: string;
  insurancePolicyId: string;
  policyName: string;
  coveragePerPurchaseLimit: number;
}
