/**
 * O processo é uma sequência real — a ordem carrega informação (não dá para
 * implementar antes de desenhar), então aqui a numeração é justificada.
 * A duração é indicativa e deve ser confirmada pela PPP.
 */

export const processSteps = [
  {
    n: '01',
    title: 'Diagnóstico',
    duration: '[PRAZO A DEFINIR]',
    body:
      'Mapeamos o processo como ele funciona hoje: por onde o lead entra, quem responde, o que é feito à mão e onde a informação se perde.',
    output: 'Mapa do processo atual e lista de gargalos priorizada',
  },
  {
    n: '02',
    title: 'Desenho',
    duration: '[PRAZO A DEFINIR]',
    body:
      'Desenhamos o fluxo alvo antes de tocar em qualquer ferramenta: gatilhos, condições, pontos de escalonamento para humano e o que cada sistema precisa saber.',
    output: 'Diagrama do fluxo, escopo do produto digital e critérios de aceite',
  },
  {
    n: '03',
    title: 'Implementação',
    duration: '[PRAZO A DEFINIR]',
    body:
      'Construção em ciclos com entrega visível: automações no GHL e no n8n, e o site, plataforma ou app que a operação precisa. Cada ciclo vai para teste real.',
    output: 'Fluxos publicados, produto em ambiente de homologação',
  },
  {
    n: '04',
    title: 'Repasse e manutenção',
    duration: 'contínuo',
    body:
      'Treinamos a sua equipe para operar e ajustar o que foi construído, e seguimos acompanhando execuções, tratando erros e evoluindo os fluxos.',
    output: 'Documentação, treinamento e acompanhamento contínuo',
  },
];
