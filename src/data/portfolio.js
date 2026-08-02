/**
 * PORTFÓLIO — TODOS OS PROJETOS ABAIXO SÃO EXEMPLOS ESTRUTURAIS.
 *
 * Nenhum nome de cliente real é usado: as entradas descrevem o *tipo* de
 * projeto. A PPP substitui título, resumo, stack, capa e URL pelos cases
 * definitivos antes de publicar.
 *
 * Campos:
 *   liveUrl     URL carregada no <iframe> do modal. `null` = sem preview
 *               embutido; o modal já abre no fallback visual.
 *   embeddable  `false` quando o domínio recusa embed (X-Frame-Options ou
 *               CSP frame-ancestors). O navegador NÃO permite descobrir isso
 *               pelo cliente em outra origem — veja o comentário longo em
 *               ProjectModal.jsx. Então quem sabe é você: marque `false` e o
 *               modal abre direto na capa, sem piscar um frame vazio.
 *               Para descobrir, inspecione os cabeçalhos da resposta:
 *               `curl -sI <url>` e procure x-frame-options / content-security-policy.
 *   externalUrl destino do botão "abrir em nova aba". `null` desabilita.
 *   cover       imagem de capa em /public/portfolio/. Se o arquivo não
 *               existir, o card cai num placeholder gráfico procedural.
 *   results     métricas do case — placeholders até aprovação.
 */

export const projects = [
  {
    id: 'gestao-academia',
    /* TODO: substituir por case real do cliente */
    title: 'Plataforma de gestão para academia',
    category: 'Plataforma SaaS',
    year: '[ANO]',
    summary:
      'Painel de alunos, planos e frequência, com o comercial alimentado por automação de recuperação de matrícula.',
    description:
      'Sistema web onde a recepção acompanha matrículas ativas, inadimplência e frequência em tempo real. O cadastro de aluno dispara um fluxo que sincroniza o CRM, agenda a avaliação física e devolve o status para o painel — sem ninguém digitar duas vezes.',
    stack: ['React', 'Supabase', 'n8n', 'GoHighLevel'],
    liveUrl: '/preview/plataforma-academia.html',
    embeddable: true,
    externalUrl: null,
    cover: '/portfolio/gestao-academia.webp',
    accent: 'pulse',
    results: [
      { value: '[MÉTRICA A DEFINIR]', label: 'redução no tempo de matrícula' },
      { value: '[MÉTRICA A DEFINIR]', label: 'recuperação de inadimplência' },
    ],
  },
  {
    id: 'site-engenharia',
    /* TODO: substituir por case real do cliente */
    title: 'Site institucional para engenharia',
    category: 'Site institucional',
    year: '[ANO]',
    summary: 'Apresentação de obras e serviços com captação qualificada direto no CRM.',
    description:
      'Site de apresentação com portfólio de obras, páginas de serviço otimizadas para busca e formulário que entrega o lead já classificado por tipo de obra e porte no pipeline certo do CRM.',
    stack: ['React', 'Vite', 'GoHighLevel'],
    liveUrl: '/preview/site-engenharia.html',
    embeddable: true,
    externalUrl: null,
    cover: '/portfolio/site-engenharia.webp',
    accent: 'volt',
    results: [
      { value: '[MÉTRICA A DEFINIR]', label: 'aumento em leads qualificados' },
      { value: '[MÉTRICA A DEFINIR]', label: 'nota de performance' },
    ],
  },
  {
    id: 'marketplace-servicos',
    /* TODO: substituir por case real do cliente */
    title: 'App de marketplace de serviços',
    category: 'App mobile',
    year: '[ANO]',
    summary:
      'Aplicativo multiplataforma conectando prestadores e clientes, com chat em tempo real.',
    description:
      'App para iOS e Android com cadastro e verificação de prestador, busca por categoria e localização, chat em tempo real e histórico de contratações. Notificações e follow-up pós-serviço saem de um fluxo automatizado.',
    stack: ['Flutter', 'Firebase', 'n8n'],
    liveUrl: null, // app nativo: não há URL para embutir
    embeddable: true, // sem efeito enquanto liveUrl for null
    externalUrl: null,
    // Slot vazio: sem arquivo, o card desenha o wireframe de celular. Basta
    // apontar para /portfolio/<arquivo>.webp quando o print real existir.
    cover: null,
    accent: 'flare',
    results: [
      { value: '[MÉTRICA A DEFINIR]', label: 'prestadores cadastrados' },
      { value: '[MÉTRICA A DEFINIR]', label: 'tempo até primeira contratação' },
    ],
  },
  {
    id: 'lp-clinica',
    /* TODO: substituir por case real do cliente */
    title: 'Landing page de captação para clínica',
    category: 'Landing page',
    year: '[ANO]',
    summary: 'Página de campanha com agendamento confirmado por IA de voz.',
    description:
      'Landing de campanha paga integrada ao GHL. O lead que preenche o formulário recebe uma ligação da Voice AI em poucos minutos, que qualifica, consulta a agenda e confirma o horário ainda na chamada.',
    stack: ['GoHighLevel', 'Voice AI', 'Motion'],
    liveUrl: null,
    embeddable: true, // sem efeito enquanto liveUrl for null
    externalUrl: null,
    cover: null, // slot vazio — ver nota no projeto acima
    accent: 'volt',
    results: [
      { value: '[MÉTRICA A DEFINIR]', label: 'taxa de agendamento' },
      { value: '[MÉTRICA A DEFINIR]', label: 'custo por agendamento' },
    ],
  },
  {
    id: 'dashboard-receita',
    /* TODO: substituir por case real do cliente */
    title: 'Dashboard de atribuição de receita',
    category: 'Dashboard interno',
    year: '[ANO]',
    summary: 'Painel que junta CRM, tráfego pago e faturamento numa fonte só de verdade.',
    description:
      'Fluxos no n8n coletam dados de CRM, plataformas de anúncio e financeiro, normalizam e gravam num banco único. O painel mostra origem do lead, estágio do pipeline e receita atribuída sem exportação manual de planilha.',
    stack: ['n8n', 'Supabase', 'React'],
    liveUrl: null,
    embeddable: true, // sem efeito enquanto liveUrl for null
    externalUrl: null,
    cover: null, // slot vazio — ver nota no projeto "App de marketplace"
    accent: 'pulse',
    results: [
      { value: '[MÉTRICA A DEFINIR]', label: 'horas de planilha eliminadas' },
      { value: '[MÉTRICA A DEFINIR]', label: 'fontes de dados unificadas' },
    ],
  },
  {
    id: 'area-membros',
    /* TODO: substituir por case real do cliente */
    title: 'Área de membros e curso online',
    category: 'Plataforma de conteúdo',
    year: '[ANO]',
    summary: 'Curso, comunidade e liberação de acesso automática após a compra.',
    description:
      'Área de membros com trilha de aulas, progresso e comunidade. A compra libera o acesso, matricula na turma e inicia a sequência de onboarding automaticamente — nenhum passo manual entre pagar e assistir.',
    stack: ['GoHighLevel', 'n8n', 'Motion'],
    liveUrl: null,
    embeddable: true, // sem efeito enquanto liveUrl for null
    externalUrl: null,
    cover: null, // slot vazio — ver nota no projeto "App de marketplace"
    accent: 'pulse',
    results: [
      { value: '[MÉTRICA A DEFINIR]', label: 'conclusão do onboarding' },
      { value: '[MÉTRICA A DEFINIR]', label: 'tempo de liberação de acesso' },
    ],
  },
];
