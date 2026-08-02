/**
 * Os quatro serviços centrais.
 *
 * `capabilities` é curado, não exaustivo: cada item precisa ser algo que o
 * visitante consiga reconhecer como resposta a um problema dele.
 * `signature` alimenta a ilustração de nós de cada card.
 */

export const services = [
  {
    id: 'ghl',
    index: 'ghl',
    title: 'Automação e CRM',
    subtitle: 'GoHighLevel',
    lead:
      'A operação comercial inteira dentro de um CRM que responde sozinho — inclusive por voz.',
    capabilities: [
      'Pipelines de vendas, tags, campos personalizados e segmentação',
      'Workflows multicanal por e-mail, SMS, WhatsApp e voz, com gatilhos e condições',
      'Sequências de follow-up, recuperação de lead parado e missed call text back',
      'Agentes de IA de atendimento e vendas em chat, SMS e WhatsApp',
      'Voice AI que atende a ligação, qualifica o lead, consulta a agenda em tempo real e confirma o agendamento na própria chamada',
      'Escalonamento para humano por limite de mensagens ou sentimento negativo',
      'Modo SaaS com sub-contas white-label, área de membros, cursos e comunidades',
      'Dashboards de pipeline, conversão e atribuição de receita',
    ],
    /* Nós exibidos na miniatura do card. */
    signature: ['lead', 'ia', 'voz', 'agenda'],
  },
  {
    id: 'n8n',
    index: 'n8n',
    title: 'Processos e integrações',
    subtitle: 'n8n',
    lead:
      'Para quando os sistemas existem, funcionam, e simplesmente não conversam entre si.',
    capabilities: [
      'Orquestração de workflows com triggers, lógica condicional e processamento em lote',
      'Integração por API com qualquer serviço HTTP — OAuth2, API Key ou Basic Auth',
      'Sincronização de dados entre sistemas: CRM, banco de dados e dashboard de métricas',
      'Transformação e enriquecimento de dados entre formatos diferentes',
      'Agentes de IA autônomos decidindo dentro do fluxo, com etapas divididas entre agentes',
      'Infraestrutura self-hosted ou em nuvem, com controle de logs e autenticação',
    ],
    signature: ['api', 'switch', 'db', 'log'],
  },
  {
    id: 'dev',
    index: 'dev',
    title: 'Sites, plataformas e software',
    subtitle: 'React · Supabase · Flutter',
    lead:
      'O produto digital que a operação precisa, construído para receber automação desde o primeiro dia.',
    capabilities: [
      'Sites institucionais e landing pages com SEO',
      'Sistemas web sob medida em React, JavaScript e TypeScript',
      'Plataformas SaaS e dashboards conectados a banco de dados, alimentados por automações',
      'Aplicativos mobile multiplataforma com autenticação, dados em tempo real e chat',
      'Processo com Git e GitHub, Gitflow e deploy em nuvem',
    ],
    signature: ['ui', 'api', 'db', 'deploy'],
  },
  {
    id: 'motion',
    index: 'motion',
    title: 'Motion design e produção visual',
    subtitle: 'Identidade e movimento',
    lead:
      'O que a empresa entrega e o que ela parece entregar precisam ser a mesma coisa.',
    capabilities: [
      'Motion graphics para redes sociais e vídeos institucionais ou explicativos',
      'Identidade visual e logotipos',
      'Materiais de marketing digital: banners, posts e peças de campanha',
      'Apoio visual para funis e landing pages',
    ],
    signature: ['brief', 'board', 'anim', 'export'],
  },
];

/** Frentes complementares — menores, mas decisivas na hora de fechar. */
export const supportServices = [
  {
    title: 'Consultoria em automação',
    body: 'Diagnóstico do processo atual e desenho da automação ideal antes de qualquer implementação.',
  },
  {
    title: 'Treinamento e repasse técnico',
    body: 'Sua equipe aprende a operar, ajustar e estender o que foi construído.',
  },
  {
    title: 'Suporte e manutenção',
    body: 'Acompanhamento de execuções, tratamento de erros e evolução contínua dos fluxos.',
  },
];
