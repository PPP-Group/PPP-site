/**
 * Conteúdo institucional e dados de contato.
 *
 * Tudo marcado com [A DEFINIR] precisa ser substituído pela PPP antes do deploy.
 * Os textos institucionais (manifesto, eixos, serviços) já são conteúdo final.
 */

export const brand = {
  name: 'PPP',
  tagline: 'Operação digital de ponta a ponta',
  short:
    'Empresa de tecnologia especializada em soluções digitais para aquisição, atendimento e retenção de clientes.',
};

export const manifesto = {
  /* Quebra em linhas é intencional: o hero compõe o título linha a linha. */
  lines: ['Estruturamos a', 'operação digital', 'de ponta a ponta'],
  body:
    'CRM e automação de atendimento e vendas, integração entre sistemas, e o site, plataforma ou app que a operação precisa — com o design por trás de tudo isso.',
};

export const axes = [
  {
    key: 'automacao',
    label: 'Automação comercial e de relacionamento',
    body:
      'Funil de vendas, CRM, atendimento automatizado por texto e voz, e integração entre as ferramentas que a operação já usa.',
    tools: ['GoHighLevel', 'n8n'],
  },
  {
    key: 'produto',
    label: 'Produto digital',
    body:
      'Sites, sistemas web, plataformas SaaS, aplicativos — e o design visual que sustenta tudo isso.',
    tools: ['React', 'Supabase', 'Flutter', 'Motion'],
  },
];

/**
 * Roteiro dor -> solução. Usado na seção de serviços como entrada de leitura:
 * o visitante se reconhece na dor antes de ler a capacidade técnica.
 */
export const painPoints = [
  {
    pain: 'Perde lead porque ninguém responde rápido',
    fix: 'Follow-up automático e IA de atendimento e voz no GHL',
    service: 'ghl',
  },
  {
    pain: 'Os sistemas não conversam entre si',
    fix: 'Integrações e orquestração de processos com n8n',
    service: 'n8n',
  },
  {
    pain: 'Falta o site, o sistema ou o app da operação',
    fix: 'Desenvolvimento web, plataforma ou aplicativo sob medida',
    service: 'dev',
  },
  {
    pain: 'A comunicação visual não acompanha o que a empresa entrega',
    fix: 'Motion design, identidade e material de campanha',
    service: 'motion',
  },
];

export const principles = [
  {
    title: 'Diagnóstico antes de ferramenta',
    body:
      'Mapeamos o processo que já existe antes de propor qualquer automação. Automatizar um processo quebrado só quebra mais rápido.',
  },
  {
    title: 'A operação fica com você',
    body:
      'Repassamos o que foi construído para a sua equipe: treinamento, documentação e acesso. Você não fica dependente de nós para operar.',
  },
  {
    title: 'Uma frente só não resolve',
    body:
      'Automação sem produto digital vira remendo; produto sem automação vira trabalho manual. Entregamos os dois lados e o visual que amarra.',
  },
  {
    title: 'Manutenção é parte do serviço',
    body:
      'Fluxo de automação não é entrega única. Acompanhamos execução, tratamos erro e ajustamos conforme a operação muda.',
  },
];

export const navigation = [
  { label: 'Sobre', href: '#sobre' },
  { label: 'Serviços', href: '#servicos' },
  { label: 'Processo', href: '#processo' },
  { label: 'Portfólio', href: '#portfolio' },
  { label: 'Automação', href: '#automacao' },
];

/**
 * TODO: substituir pelos canais reais da PPP antes de publicar.
 * `href: null` faz o componente renderizar o item como texto inerte em vez de
 * um link quebrado.
 */
export const contact = {
  email: '[A DEFINIR]@ppp.com.br',
  emailHref: null,
  whatsapp: '[A DEFINIR]',
  whatsappHref: null,
  location: 'Brasil · atendimento remoto',
  socials: [
    { label: 'Instagram', href: null, handle: '@[A DEFINIR]' },
    { label: 'LinkedIn', href: null, handle: '/company/[A DEFINIR]' },
    { label: 'GitHub', href: null, handle: '/[A DEFINIR]' },
  ],
};

/**
 * Métricas do hero. Os números são placeholders — o rótulo abaixo de cada um
 * deixa isso explícito na própria interface até a PPP confirmar os reais.
 */
export const metrics = [
  { value: 40, suffix: '+', label: 'automações entregues', placeholder: true },
  { value: 12, suffix: 'k', label: 'horas manuais economizadas', placeholder: true },
  { value: 25, suffix: '+', label: 'projetos digitais', placeholder: true },
  { value: 4, suffix: 'min', label: 'tempo médio de primeira resposta', placeholder: true },
];
