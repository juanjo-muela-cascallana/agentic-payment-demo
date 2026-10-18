export type Language = 'en' | 'es';

export interface Translations {
  // Navigation
  navWallet: string;
  navProfile: string;
  navSettings: string;

  // Header & Wallet
  insuredWalletBadge: string;
  prefundedBalance: string;
  insuredBadge: string;
  addFundsButton: string;
  autoApprovedSub: string;
  monthlyLimitSub: string;
  simulateRequestBtn: string;
  killSwitchActiveTitle: string;
  killSwitchActiveDesc: string;

  // Transactions list
  transactionsTitle: string;
  filterAll: string;
  filterApproved: string;
  filterBlocked: string;
  noTransactions: string;
  depositLabel: string;
  blockedLabel: string;
  needsApprovalLabel: string;
  insuredLabel: string;

  // Pending approval banner
  authRequired: string;
  exceedsAutoCap: string;
  claudeRequest: string;
  reasoningLabel: string;
  eligibleInsurance: string;
  reviewFullAudit: string;
  declineBtn: string;
  approveMandateBtn: string;

  // Transaction details modal
  txDetailsTitle: string;
  settledAndInsured: string;
  approvedAndInsured: string;
  blockedByArmadillo: string;
  requiresUserApproval: string;
  agentContextTitle: string;
  userPromptLabel: string;
  agentReasoningLabel: string;
  alternativesChecked: string;
  reviewEngineTitle: string;
  riskScoreLabel: string;
  scopedCredentialTitle: string;
  merchantLockLabel: string;
  authorizedMaxLabel: string;
  cardScopeNotice: string;
  insuranceGuaranteeTitle: string;
  insuranceDescription: string;
  claimSubmittedNotice: string;
  fileClaimBtn: string;
  cancelClaimBtn: string;
  confirmClaimTitle: string;
  confirmClaimDesc: string;
  confirmClaimBtn: string;
  cancelBtn: string;
  claimStatusActive: string;
  claimStatusNone: string;
  claimUnderReviewBadge: string;
  doneBtn: string;
  txIdLabel: string;
  mandateLabel: string;

  // Top Up Modal
  topUpTitle: string;
  topUpNotice: string;
  depositAmountLabel: string;
  railsAdapterLabel: string;
  yapeTitle: string;
  yapeDesc: string;
  bcpTitle: string;
  bcpDesc: string;
  speiTitle: string;
  speiDesc: string;
  pixTitle: string;
  pixDesc: string;
  cardTitle: string;
  cardDesc: string;
  depositSubmitBtn: string;
  depositSuccessTitle: string;
  depositSuccessDesc: string;

  // Simulate modal
  simulateTitle: string;
  simulateSubtitle: string;
  simulateInstructions: string;
  scenario1Title: string;
  scenario1Badge: string;
  scenario1Desc: string;
  scenario2Title: string;
  scenario2Badge: string;
  scenario2Desc: string;
  scenario3Title: string;
  scenario3Badge: string;
  scenario3Desc: string;
  scenarioCustomTitle: string;
  scenarioCustomDesc: string;
  merchantInputLabel: string;
  amountInputLabel: string;
  instructionInputLabel: string;
  dispatchBtn: string;

  // Profile View
  profileHeaderSubtitle: string;
  profileHeaderTitle: string;
  kycVerifiedBadge: string;
  emailLabel: string;
  memberSinceLabel: string;
  connectedAgentTitle: string;
  connectedAgentSubtitle: string;
  connectedBadge: string;
  protocolLabel: string;
  permissionsLabel: string;
  credentialModeLabel: string;
  insurancePolicyTitle: string;
  activeBadge: string;
  insuranceExplanation: string;
  policyNumberLabel: string;
  maxCoverageLabel: string;

  // Settings View
  settingsHeaderSubtitle: string;
  settingsHeaderTitle: string;
  languageSectionTitle: string;
  languageSectionSubtitle: string;
  killSwitchTitle: string;
  killSwitchSubtitle: string;
  turnOffFreeze: string;
  activateFreeze: string;
  killSwitchWarningActive: string;
  killSwitchWarningInactive: string;
  spendingGuardrailsTitle: string;
  spendingGuardrailsSubtitle: string;
  autoApproveSliderLabel: string;
  alwaysAskPreset: string;
  zeroAutoApproveNotice: string;
  sliderContextNotice: string;
  monthlyTotalCapLabel: string;
  mcpTitle: string;
  mcpSubtitle: string;
  readyBadge: string;
  mcpIntro: string;
  tool1Title: string;
  tool1Badge: string;
  tool1Desc: string;
  tool2Title: string;
  tool2Badge: string;
  tool2Desc: string;
  tool3Title: string;
  tool3Badge: string;
  tool3Desc: string;
  tool4Title: string;
  tool4Badge: string;
  tool4Desc: string;
  copyMcpBtn: string;
  copiedMcpBtn: string;

  // Connected Sub-Agents section
  subAgentsTitle: string;
  subAgentsSubtitle: string;
  connectedAgentsBadge: string;
  mcpActive: string;
  mcpDeactivated: string;
  mcpEndpointLabel: string;
  mcpToolsLabel: string;
  defaultModelLabel: string;
  lastActiveLabel: string;
  transactionsApprovedLabel: string;
  totalSpentLabel: string;
  scopesAllowedLabel: string;
  testPingBtn: string;
  pingSuccess: string;
  toggleMcpLabel: string;
  allAgentsDeactivatedNotice: string;
}

export const translations: Record<Language, Translations> = {
  en: {
    navWallet: 'Wallet',
    navProfile: 'Profile',
    navSettings: 'Settings',

    insuredWalletBadge: 'Insured AI Wallet',
    prefundedBalance: 'Prefunded Balance',
    insuredBadge: 'Insured',
    addFundsButton: 'Add Funds to Wallet',
    autoApprovedSub: 'auto-approved',
    monthlyLimitSub: 'Monthly limit',
    simulateRequestBtn: 'Simulate Request',
    killSwitchActiveTitle: 'Kill Switch Activated',
    killSwitchActiveDesc: 'All Claude agent payment requests are blocked.',

    transactionsTitle: 'Transactions',
    filterAll: 'All',
    filterApproved: 'Approved',
    filterBlocked: 'Blocked',
    noTransactions: 'No transactions found in this category.',
    depositLabel: 'Deposit',
    blockedLabel: 'Blocked',
    needsApprovalLabel: 'Needs Approval',
    insuredLabel: 'Insured',

    authRequired: 'Authorization Required',
    exceedsAutoCap: 'Exceeds auto-cap',
    claudeRequest: 'Claude Request:',
    reasoningLabel: 'Reasoning:',
    eligibleInsurance: 'Eligible for Armadillo Insurance',
    reviewFullAudit: 'Review Full Audit',
    declineBtn: 'Decline',
    approveMandateBtn: 'Approve (Mandate)',

    txDetailsTitle: 'Transaction Details',
    settledAndInsured: 'Settled & Insured',
    approvedAndInsured: 'Approved & Insured',
    blockedByArmadillo: 'Blocked by Armadillo',
    requiresUserApproval: 'Requires User Approval',
    agentContextTitle: 'Agent Purchase Context (Claude MCP)',
    userPromptLabel: 'User prompt instruction:',
    agentReasoningLabel: 'Agent reported reasoning:',
    alternativesChecked: 'Alternatives checked:',
    reviewEngineTitle: 'Armadillo Review Engine',
    riskScoreLabel: 'Risk Score:',
    scopedCredentialTitle: 'Scoped Single-Use Credential',
    merchantLockLabel: 'MERCHANT LOCK',
    authorizedMaxLabel: 'AUTHORIZED MAX',
    cardScopeNotice: 'Card token strictly limited to this domain. Expired automatically after checkout.',
    insuranceGuaranteeTitle: 'Insurance Policy Guarantee',
    insuranceDescription: 'This transaction was underwritten by Armadillo Insurance Partner. If the item is defective, misrepresented, or the agent committed an error, your wallet is 100% reimbursed.',
    claimSubmittedNotice: 'Claim submitted to insurer. Audit evidence bundle dispatched for review.',
    fileClaimBtn: 'File Insurance Claim',
    cancelClaimBtn: 'Withdraw / Cancel Claim',
    confirmClaimTitle: 'File an Insurance Claim',
    confirmClaimDesc: 'Only submit a claim if there is an issue with this order (such as non-delivery, agent error, or defective merchandise). Regular insured purchases do not require filing a claim.',
    confirmClaimBtn: 'Submit Claim to Insurer',
    cancelBtn: 'Cancel',
    claimStatusActive: 'Claim Under Review with Insurer',
    claimStatusNone: 'Active Protection · No claim filed',
    claimUnderReviewBadge: 'Claim Filed',
    doneBtn: 'Done',
    txIdLabel: 'TX-ID',
    mandateLabel: 'Mandate',

    topUpTitle: 'Add Funds to Wallet',
    topUpNotice: 'Prefunded balance is the only money your connected AI agents (Claude) are allowed to access.',
    depositAmountLabel: 'Deposit Amount (USD)',
    railsAdapterLabel: 'Payment Rail Adapter (Peru / LATAM)',
    yapeTitle: 'Yape / Plin',
    yapeDesc: 'Peru (Instant QR / Phone)',
    bcpTitle: 'BCP Transfer',
    bcpDesc: 'Peru (CCI Interbank)',
    speiTitle: 'SPEI Transfer',
    speiDesc: 'Mexico (Instant)',
    pixTitle: 'Pix Rails',
    pixDesc: 'Brazil (Instant)',
    cardTitle: 'Debit / Card',
    cardDesc: 'Visa / Mastercard',
    depositSubmitBtn: 'Deposit Funds to Armadillo Ledger',
    depositSuccessTitle: 'Deposit Credited',
    depositSuccessDesc: 'added to prefunded balance',

    simulateTitle: 'Simulate Claude Payment Request',
    simulateSubtitle: 'Test MCP connector tool: request_payment()',
    simulateInstructions: "Choose a demo scenario from the spec deck to simulate how Armadillo's review engine handles agent requests:",
    scenario1Title: 'Scenario 1: Auto-Approved Purchase',
    scenario1Badge: '≤ $50 cap',
    scenario1Desc: 'Claude reorders specialty coffee beans. Below auto-approve threshold, instantly approved & insured.',
    scenario2Title: 'Scenario 2: Requires User Approval',
    scenario2Badge: '> $50 cap',
    scenario2Desc: 'Claude finds a flight to Cusco (LA 2041). Exceeds auto threshold, sends push notification for user mandate.',
    scenario3Title: 'Scenario 3: Risky / Malicious Deal Blocked',
    scenario3Badge: 'Risk Score 92/100',
    scenario3Desc: 'Suspicious site with domain created 7 days ago and hidden injection. Blocked before any card is generated.',
    scenarioCustomTitle: 'Custom Agent Purchase Test',
    scenarioCustomDesc: 'Set custom merchant and amount',
    merchantInputLabel: 'Merchant',
    amountInputLabel: 'Amount ($ USD)',
    instructionInputLabel: 'User Instruction',
    dispatchBtn: 'Dispatch Payment Request to Armadillo',

    profileHeaderSubtitle: 'Account & Coverage',
    profileHeaderTitle: 'User Profile',
    kycVerifiedBadge: 'KYC Verified',
    emailLabel: 'Email',
    memberSinceLabel: 'Member Since',
    connectedAgentTitle: 'Connected Agent Platform',
    connectedAgentSubtitle: 'Anthropic Claude (MCP Connector)',
    connectedBadge: 'Connected',
    protocolLabel: 'Protocol:',
    permissionsLabel: 'Active Permissions:',
    credentialModeLabel: 'Credential Mode:',
    insurancePolicyTitle: 'Insurance Guarantee Policy',
    activeBadge: 'Active',
    insuranceExplanation: 'Every approved agent transaction receives a tamper-evident Coverage ID. Purchases are protected against merchant fraud, delivery failure, and unauthorized agent drift.',
    policyNumberLabel: 'POLICY NUMBER',
    maxCoverageLabel: 'MAX COVERAGE / TX',

    settingsHeaderSubtitle: 'Controls & Protocol',
    settingsHeaderTitle: 'Settings & Policies',
    languageSectionTitle: 'Language / Idioma',
    languageSectionSubtitle: 'Select preferred app language',
    killSwitchTitle: 'Agent Kill Switch',
    killSwitchSubtitle: 'Instantly freeze all AI agent spending',
    turnOffFreeze: 'Turn Off (Unfreeze)',
    activateFreeze: 'Activate Freeze',
    killSwitchWarningActive: 'Warning: All payment requests from Claude will be automatically rejected until you disable the kill switch.',
    killSwitchWarningInactive: 'If activated, Armadillo will immediately reject every purchase request from connected AI agents without charging your wallet.',
    spendingGuardrailsTitle: 'Spending Guardrails',
    spendingGuardrailsSubtitle: 'Thresholds for auto-approving agent checkouts',
    autoApproveSliderLabel: 'Auto-Approve Transaction Cap',
    alwaysAskPreset: 'Always Ask',
    zeroAutoApproveNotice: 'Zero auto-approval: Every single purchase Claude attempts will pause and require your biometric mandate.',
    sliderContextNotice: 'are approved and insured in <2s. Anything higher pauses and requests mobile confirmation.',
    monthlyTotalCapLabel: 'Monthly Total Spending Cap:',
    mcpTitle: 'Claude MCP Server Connector',
    mcpSubtitle: 'Prepared for Phase 2 live agent integration',
    readyBadge: 'Ready',
    mcpIntro: 'Armadillo runs an official Model Context Protocol (MCP) server. When Claude connects, it exposes 4 core tools:',
    tool1Title: '1. request_payment()',
    tool1Badge: 'Core Hook',
    tool1Desc: 'Claude submits purchase items, amount, domain, user instruction, and reasoning before any checkout.',
    tool2Title: '2. get_payment_status()',
    tool2Badge: 'Polling / Webhook',
    tool2Desc: "Retrieves the user's biometric decision for pending high-value orders.",
    tool3Title: '3. confirm_purchase()',
    tool3Badge: 'Receipt Log',
    tool3Desc: 'Claude passes the final merchant order confirmation ID to seal the insurance coverage policy.',
    tool4Title: '4. get_wallet_limits()',
    tool4Badge: 'Budget Planner',
    tool4Desc: 'Allows Claude to check remaining monthly budget and allowed categories before searching.',
    copyMcpBtn: 'Copy Claude Desktop / MCP Configuration',
    copiedMcpBtn: 'Copied Claude MCP Stanza',

    subAgentsTitle: 'Connected Sub-Agents',
    subAgentsSubtitle: 'Manage MCP connections and credentials for each AI platform',
    connectedAgentsBadge: 'Connected',
    mcpActive: 'Active · MCP Connected',
    mcpDeactivated: 'Disabled · MCP Disconnected',
    mcpEndpointLabel: 'MCP Server Endpoint:',
    mcpToolsLabel: 'Authorized MCP Tools:',
    defaultModelLabel: 'Default Model:',
    lastActiveLabel: 'Last Active:',
    transactionsApprovedLabel: 'Transactions Approved:',
    totalSpentLabel: 'Total Approved Spend:',
    scopesAllowedLabel: 'Permitted Shopping Categories:',
    testPingBtn: 'Ping MCP Connection',
    pingSuccess: 'MCP Handshake Verified (24ms)',
    toggleMcpLabel: 'MCP Connection',
    allAgentsDeactivatedNotice: 'All AI agent connections are currently disabled.',
  },
  es: {
    navWallet: 'Billetera',
    navProfile: 'Perfil',
    navSettings: 'Ajustes',

    insuredWalletBadge: 'Billetera IA Asegurada',
    prefundedBalance: 'Saldo Prefinanciado',
    insuredBadge: 'Asegurado',
    addFundsButton: 'Recargar Saldo',
    autoApprovedSub: 'auto-aprobado',
    monthlyLimitSub: 'Límite mensual',
    simulateRequestBtn: 'Simular Solicitud',
    killSwitchActiveTitle: 'Interruptor de Parada Activo',
    killSwitchActiveDesc: 'Todas las solicitudes de pago del agente Claude están bloqueadas.',

    transactionsTitle: 'Transacciones',
    filterAll: 'Todas',
    filterApproved: 'Aprobadas',
    filterBlocked: 'Bloqueadas',
    noTransactions: 'No se encontraron transacciones en esta categoría.',
    depositLabel: 'Depósito',
    blockedLabel: 'Bloqueado',
    needsApprovalLabel: 'Requiere Aprobación',
    insuredLabel: 'Asegurado',

    authRequired: 'Autorización Requerida',
    exceedsAutoCap: 'Supera límite automático',
    claudeRequest: 'Solicitud de Claude:',
    reasoningLabel: 'Razonamiento:',
    eligibleInsurance: 'Elegible para Seguro Armadillo',
    reviewFullAudit: 'Ver Auditoría Completa',
    declineBtn: 'Rechazar',
    approveMandateBtn: 'Aprobar (Mandato)',

    txDetailsTitle: 'Detalle de la Transacción',
    settledAndInsured: 'Liquidado y Asegurado',
    approvedAndInsured: 'Aprobado y Asegurado',
    blockedByArmadillo: 'Bloqueado por Armadillo',
    requiresUserApproval: 'Requiere Aprobación de Usuario',
    agentContextTitle: 'Contexto de Compra del Agente (Claude MCP)',
    userPromptLabel: 'Instrucción dada por el usuario:',
    agentReasoningLabel: 'Razonamiento reportado por el agente:',
    alternativesChecked: 'Alternativas comparadas:',
    reviewEngineTitle: 'Motor de Revisión Armadillo',
    riskScoreLabel: 'Puntuación de Riesgo:',
    scopedCredentialTitle: 'Credencial Virtual de Uso Único',
    merchantLockLabel: 'BLOQUEO POR COMERCIO',
    authorizedMaxLabel: 'MÁXIMO AUTORIZADO',
    cardScopeNotice: 'Token de tarjeta limitado estrictamente a este comercio. Expira automáticamente tras la compra.',
    insuranceGuaranteeTitle: 'Garantía de Póliza de Seguro',
    insuranceDescription: 'Esta transacción fue suscrita por la aseguradora aliada de Armadillo. Si el producto tiene defectos, no coincide con lo pedido o el agente comete un error, tu dinero es 100% reembolsado.',
    claimSubmittedNotice: 'Reclamo enviado a la aseguradora. El expediente de auditoría fue remitido para revisión.',
    fileClaimBtn: 'Presentar Reclamo de Seguro',
    cancelClaimBtn: 'Retirar / Cancelar Reclamo',
    confirmClaimTitle: 'Presentar un Reclamo de Seguro',
    confirmClaimDesc: 'Solo envía un reclamo si hubo algún problema con esta orden (ej. producto no entregado, error de compra del agente o mercancía defectuosa). Las compras aseguradas habituales no requieren presentar reclamo.',
    confirmClaimBtn: 'Enviar Reclamo a la Aseguradora',
    cancelBtn: 'Cancelar',
    claimStatusActive: 'Reclamo en Trámite con la Aseguradora',
    claimStatusNone: 'Protección Activa · Sin reclamo presentado',
    claimUnderReviewBadge: 'Reclamo Presentado',
    doneBtn: 'Cerrar',
    txIdLabel: 'ID-TX',
    mandateLabel: 'Mandato',

    topUpTitle: 'Recargar Saldo a la Billetera',
    topUpNotice: 'El saldo prefinanciado es el único dinero al que los agentes de IA (Claude) tienen permiso de acceder.',
    depositAmountLabel: 'Monto a Depositar (USD)',
    railsAdapterLabel: 'Pasarela de Pago (Perú / LATAM)',
    yapeTitle: 'Yape / Plin',
    yapeDesc: 'Perú (Instantáneo QR / Celular)',
    bcpTitle: 'Transferencia BCP',
    bcpDesc: 'Perú (Interbancario CCI)',
    speiTitle: 'Transferencia SPEI',
    speiDesc: 'México (Instantáneo)',
    pixTitle: 'Red Pix',
    pixDesc: 'Brasil (Instantáneo)',
    cardTitle: 'Débito / Tarjeta',
    cardDesc: 'Visa / Mastercard',
    depositSubmitBtn: 'Acreditar Fondos en el Libro Armadillo',
    depositSuccessTitle: 'Depósito Acreditado',
    depositSuccessDesc: 'agregado a tu saldo prefinanciado',

    simulateTitle: 'Simular Solicitud de Pago Claude',
    simulateSubtitle: 'Probar herramienta de conector MCP: request_payment()',
    simulateInstructions: 'Elige un escenario de demostración para probar cómo el motor de revisión de Armadillo procesa compras:',
    scenario1Title: 'Escenario 1: Compra Auto-Aprobada',
    scenario1Badge: '≤ $50 límite',
    scenario1Desc: 'Claude vuelve a pedir café en grano habitual. Al estar bajo el tope, se aprueba y asegura al instante.',
    scenario2Title: 'Escenario 2: Requiere Aprobación de Usuario',
    scenario2Badge: '> $50 límite',
    scenario2Desc: 'Claude encuentra un vuelo a Cusco (LA 2041). Al superar el tope automático, envía notificación para mandato del usuario.',
    scenario3Title: 'Escenario 3: Oferta Riesgosa / Fraude Bloqueado',
    scenario3Badge: 'Puntaje de Riesgo 92/100',
    scenario3Desc: 'Sitio sospechoso creado hace 7 días con inyección de prompts. Bloqueado antes de generar tarjeta virtual.',
    scenarioCustomTitle: 'Prueba Personalizada de Agente',
    scenarioCustomDesc: 'Configurar comercio y monto personalizado',
    merchantInputLabel: 'Comercio',
    amountInputLabel: 'Monto ($ USD)',
    instructionInputLabel: 'Instrucción del Usuario',
    dispatchBtn: 'Enviar Solicitud de Pago a Armadillo',

    profileHeaderSubtitle: 'Cuenta y Cobertura',
    profileHeaderTitle: 'Perfil de Usuario',
    kycVerifiedBadge: 'Identidad Verificada (KYC)',
    emailLabel: 'Correo Electrónico',
    memberSinceLabel: 'Miembro Desde',
    connectedAgentTitle: 'Plataforma de Agente Conectada',
    connectedAgentSubtitle: 'Anthropic Claude (Conector MCP)',
    connectedBadge: 'Conectado',
    protocolLabel: 'Protocolo:',
    permissionsLabel: 'Permisos Activos:',
    credentialModeLabel: 'Modo de Credencial:',
    insurancePolicyTitle: 'Póliza de Garantía de Seguro',
    activeBadge: 'Vigente',
    insuranceExplanation: 'Cada transacción aprobada del agente recibe un ID de Cobertura infalsificable. Tus compras están protegidas contra fraudes del comercio, fallas de entrega y desvíos del agente.',
    policyNumberLabel: 'NÚMERO DE PÓLIZA',
    maxCoverageLabel: 'COBERTURA MÁXIMA / TX',

    settingsHeaderSubtitle: 'Controles y Protocolo',
    settingsHeaderTitle: 'Ajustes y Políticas',
    languageSectionTitle: 'Idioma / Language',
    languageSectionSubtitle: 'Selecciona tu idioma preferido',
    killSwitchTitle: 'Interruptor de Parada (Kill Switch)',
    killSwitchSubtitle: 'Congelar de inmediato todo el gasto de agentes de IA',
    turnOffFreeze: 'Desactivar Parada (Descongelar)',
    activateFreeze: 'Activar Parada de Emergencia',
    killSwitchWarningActive: 'Aviso: Todas las solicitudes de pago de Claude serán rechazadas automáticamente hasta que desactives la parada.',
    killSwitchWarningInactive: 'Si se activa, Armadillo rechazará inmediatamente cualquier intento de compra de agentes sin tocar tus fondos.',
    spendingGuardrailsTitle: 'Límites de Gasto (Guardrails)',
    spendingGuardrailsSubtitle: 'Topes para la auto-aprobación de compras de agentes',
    autoApproveSliderLabel: 'Tope de Transacción Auto-Aprobada',
    alwaysAskPreset: 'Consultar Siempre',
    zeroAutoApproveNotice: 'Auto-aprobación en cero: Cada compra que intente Claude requerirá tu mandato biométrico.',
    sliderContextNotice: 'se aprueban y aseguran en menos de 2 segundos. Cualquier monto superior solicita confirmación en tu móvil.',
    monthlyTotalCapLabel: 'Tope de Gasto Mensual Total:',
    mcpTitle: 'Conector de Servidor Claude MCP',
    mcpSubtitle: 'Preparado para la integración con Claude en Fase 2',
    readyBadge: 'Listo',
    mcpIntro: 'Armadillo opera un servidor oficial de Model Context Protocol (MCP). Al conectarse, Claude dispone de 4 herramientas:',
    tool1Title: '1. request_payment()',
    tool1Badge: 'Herramienta Central',
    tool1Desc: 'Claude envía artículos, monto, dominio, instrucción y razonamiento antes del checkout.',
    tool2Title: '2. get_payment_status()',
    tool2Badge: 'Consulta / Webhook',
    tool2Desc: 'Recibe la decisión biométrica del usuario para compras de alto valor.',
    tool3Title: '3. confirm_purchase()',
    tool3Badge: 'Registro de Recibo',
    tool3Desc: 'Claude remite el ID de confirmación del comercio para sellar la póliza de seguro.',
    tool4Title: '4. get_wallet_limits()',
    tool4Badge: 'Planificador',
    tool4Desc: 'Permite a Claude consultar el saldo disponible y categorías autorizadas antes de buscar.',
    copyMcpBtn: 'Copiar Configuración Claude Desktop / MCP',
    copiedMcpBtn: 'Configuración MCP Copiada',

    subAgentsTitle: 'Sub-Agentes Conectados',
    subAgentsSubtitle: 'Gestiona conexiones MCP y permisos para cada plataforma de IA',
    connectedAgentsBadge: 'Conectados',
    mcpActive: 'Activo · MCP Conectado',
    mcpDeactivated: 'Desactivado · MCP Desconectado',
    mcpEndpointLabel: 'Punto de Enlace Servidor MCP:',
    mcpToolsLabel: 'Herramientas MCP Autorizadas:',
    defaultModelLabel: 'Modelo Predeterminado:',
    lastActiveLabel: 'Última Actividad:',
    transactionsApprovedLabel: 'Transacciones Aprobadas:',
    totalSpentLabel: 'Gasto Total Aprobado:',
    scopesAllowedLabel: 'Categorías de Compra Permitidas:',
    testPingBtn: 'Probar Conexión MCP',
    pingSuccess: 'Conexión MCP Verificada (24ms)',
    toggleMcpLabel: 'Conexión MCP',
    allAgentsDeactivatedNotice: 'Todas las conexiones de agentes están desactivadas actualmente.',
  },
};
