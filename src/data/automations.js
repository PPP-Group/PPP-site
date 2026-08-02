/**
 * Grafos de automação e mini-cases.
 *
 * `nodes` usa coordenadas num espaço 0-100 (x) por 0-100 (y). O componente de
 * grafo converte para o viewBox e reposiciona em coluna no mobile, então as
 * posições aqui descrevem intenção de leitura, não pixels.
 *
 * `log` é a saída que o nó imprime quando o pacote chega nele — é o que faz o
 * grafo parecer uma execução real em vez de uma ilustração.
 */

export const heroFlow = {
  id: 'hero',
  nodes: [
    { id: 'hook', label: 'webhook', kind: 'trigger', x: 4, y: 52, log: 'lead recebido' },
    { id: 'qual', label: 'ia · qualificar', kind: 'ai', x: 27, y: 22, log: 'score 87 · quente' },
    { id: 'voice', label: 'voice ai', kind: 'ai', x: 51, y: 60, log: 'atendida · 00:41' },
    { id: 'cal', label: 'agenda', kind: 'action', x: 74, y: 26, log: 'ter 14:30 confirmado' },
    { id: 'crm', label: 'crm', kind: 'sink', x: 93, y: 58, log: 'negócio criado' },
  ],
  edges: [
    ['hook', 'qual'],
    ['qual', 'voice'],
    ['voice', 'cal'],
    ['cal', 'crm'],
  ],
};

/**
 * Grafo da seção de demonstração: mais largo, com uma ramificação condicional
 * que mostra o caminho do lead frio. É o mesmo motor do hero, com controle.
 */
export const demoFlow = {
  id: 'demo',
  nodes: [
    { id: 'form', label: 'formulário', kind: 'trigger', x: 5, y: 50, log: 'POST /lead · 200' },
    { id: 'enrich', label: 'enriquecer', kind: 'action', x: 24, y: 50, log: 'empresa · porte · cargo' },
    { id: 'score', label: 'ia · classificar', kind: 'ai', x: 43, y: 50, log: 'intenção: alta' },
    { id: 'hot', label: 'voice ai', kind: 'ai', x: 63, y: 22, log: 'ligou em 3 min' },
    { id: 'cold', label: 'nutrição', kind: 'action', x: 63, y: 78, log: 'sequência de 7 dias' },
    { id: 'book', label: 'agendamento', kind: 'action', x: 82, y: 22, log: 'slot reservado' },
    { id: 'crm', label: 'pipeline', kind: 'sink', x: 95, y: 50, log: 'estágio: reunião' },
  ],
  edges: [
    ['form', 'enrich'],
    ['enrich', 'score'],
    ['score', 'hot', { label: 'quente' }],
    ['score', 'cold', { label: 'frio' }],
    ['hot', 'book'],
    ['book', 'crm'],
    ['cold', 'crm'],
  ],
};

/**
 * Mini-cases de automação. Estrutura problema -> solução -> resultado.
 * Resultados são placeholders até a PPP confirmar números reais.
 */
export const automationCases = [
  {
    id: 'resposta',
    kicker: 'GoHighLevel · Voice AI',
    title: 'O lead que ligava e ninguém atendia',
    problem:
      'Ligações fora do horário comercial caíam na caixa postal. O lead não deixava recado, procurava o concorrente e a empresa nem sabia que ele existiu.',
    solution:
      'Missed call text back dispara uma mensagem em segundos. Quando o lead responde, um agente de IA assume, qualifica e, se houver intenção de compra, a Voice AI liga de volta, consulta a agenda em tempo real e confirma o horário na própria chamada. Sentimento negativo ou limite de mensagens escala para um humano.',
    result: [
      { value: '[MÉTRICA A DEFINIR]', label: 'ligações perdidas recuperadas' },
      { value: '[MÉTRICA A DEFINIR]', label: 'tempo até o primeiro contato' },
    ],
  },
  {
    id: 'integracao',
    kicker: 'n8n · integrações',
    title: 'Três sistemas, nenhuma conversa',
    problem:
      'CRM, ERP e a planilha do financeiro guardavam versões diferentes do mesmo cliente. Fechar o mês significava conferir tudo à mão.',
    solution:
      'Fluxos no n8n sincronizam os três sentidos: cada mudança relevante vira um evento, passa por transformação e enriquecimento, e grava num banco único que alimenta o painel. Erro de API entra em retry com log, não em silêncio.',
    result: [
      { value: '[MÉTRICA A DEFINIR]', label: 'horas manuais por mês' },
      { value: '[MÉTRICA A DEFINIR]', label: 'divergências de cadastro' },
    ],
  },
  {
    id: 'retencao',
    kicker: 'GoHighLevel · pipeline',
    title: 'Proposta enviada, silêncio total',
    problem:
      'Propostas ficavam paradas no pipeline sem que ninguém percebesse. O vendedor só olhava quando lembrava.',
    solution:
      'Regra de tempo no estágio dispara a recuperação: sequência multicanal por e-mail, SMS e WhatsApp com conteúdo diferente a cada tentativa, tarefa para o vendedor quando há reengajamento, e movimentação automática do negócio conforme a resposta.',
    result: [
      { value: '[MÉTRICA A DEFINIR]', label: 'propostas reaquecidas' },
      { value: '[MÉTRICA A DEFINIR]', label: 'ciclo médio de venda' },
    ],
  },
];
