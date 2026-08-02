/**
 * Cálculo de layout do grafo de workflow.
 *
 * As posições vêm dos dados num espaço 0-100 que descreve *intenção de
 * leitura*. Aqui elas viram coordenadas do viewBox, em dois modos:
 *
 *   flow   horizontal, como o canvas de um editor de automação (>= 768px)
 *   stack  coluna vertical, um nó por linha (mobile)
 *
 * O modo stack não é o horizontal encolhido: um grafo de 7 nós espremido em
 * 360px vira ruído. Ele reordena o fluxo em leitura de cima para baixo e
 * mantém só a topologia que importa — quem vem depois de quem.
 */

const NODE_H = 44;
const CHAR_W = 7.9;
const PAD_X = 30;

/* 52px de folga: 29 à esquerda para o ponto de status, 23 à direita de respiro. */
function nodeWidth(label) {
  return Math.max(116, Math.round(label.length * CHAR_W + 52));
}

function flowLayout(flow) {
  const width = 1000;
  const height = 340;
  const innerW = width - PAD_X * 2;
  const innerH = height - 96; // respiro para o log impresso abaixo do último nó

  const nodes = new Map();
  for (const node of flow.nodes) {
    const w = nodeWidth(node.label);
    // x é o centro desejado; o box é centralizado nele e depois preso à moldura.
    const cx = PAD_X + (node.x / 100) * innerW;
    const cy = 52 + (node.y / 100) * innerH;
    const x = Math.min(Math.max(cx - w / 2, 8), width - w - 8);
    nodes.set(node.id, { node, x, y: cy - NODE_H / 2, w, h: NODE_H, cx: x + w / 2, cy });
  }
  return { width, height, nodes, mode: 'flow' };
}

function stackLayout(flow) {
  /* Estreito de propósito: quanto menor o viewBox, menor o fator de escala
     até a largura real do celular — e maior o texto renderizado. A 420 os
     rótulos caíam para ~10px efetivos. */
  const width = 360;
  const rowH = 92;
  const height = flow.nodes.length * rowH + 40;

  const nodes = new Map();
  flow.nodes.forEach((node, i) => {
    const w = Math.min(nodeWidth(node.label), width - 110);
    // Alternância leve de recuo: mantém a sensação de canvas sem virar zigue-zague.
    const x = 46 + (i % 2) * 40;
    const y = 24 + i * rowH;
    nodes.set(node.id, { node, x, y, w, h: NODE_H, cx: x + w / 2, cy: y + NODE_H / 2 });
  });
  return { width, height, nodes, mode: 'stack' };
}

/** Ponto médio de uma cúbica em t=0.5 — usado para ancorar o rótulo do ramo. */
function cubicMid(p0, p1, p2, p3) {
  return {
    x: (p0[0] + 3 * p1[0] + 3 * p2[0] + p3[0]) / 8,
    y: (p0[1] + 3 * p1[1] + 3 * p2[1] + p3[1]) / 8,
  };
}

/** Bezier horizontal: sai pela direita do nó de origem, entra pela esquerda do destino. */
function horizontalPath(a, b) {
  const p0 = [a.x + a.w, a.cy];
  const p3 = [b.x, b.cy];
  const dx = Math.max(34, (p3[0] - p0[0]) * 0.5);
  const p1 = [p0[0] + dx, p0[1]];
  const p2 = [p3[0] - dx, p3[1]];
  return {
    d: `M ${p0[0]} ${p0[1]} C ${p1[0]} ${p1[1]}, ${p2[0]} ${p2[1]}, ${p3[0]} ${p3[1]}`,
    mid: cubicMid(p0, p1, p2, p3),
  };
}

/** Bezier vertical: desce pela base do nó de origem até o topo do destino. */
function verticalPath(a, b) {
  const p0 = [a.cx, a.y + a.h];
  const p3 = [b.cx, b.y];
  const dy = Math.max(22, (p3[1] - p0[1]) * 0.55);
  const p1 = [p0[0], p0[1] + dy];
  const p2 = [p3[0], p3[1] - dy];
  return {
    d: `M ${p0[0]} ${p0[1]} C ${p1[0]} ${p1[1]}, ${p2[0]} ${p2[1]}, ${p3[0]} ${p3[1]}`,
    mid: cubicMid(p0, p1, p2, p3),
  };
}

export function computeLayout(flow, narrow) {
  const base = narrow ? stackLayout(flow) : flowLayout(flow);

  const edges = flow.edges
    .map(([fromId, toId, meta]) => {
      const a = base.nodes.get(fromId);
      const b = base.nodes.get(toId);
      if (!a || !b) return null; // aresta órfã nos dados: ignora em vez de quebrar
      const geom = base.mode === 'stack' ? verticalPath(a, b) : horizontalPath(a, b);
      return { from: fromId, to: toId, meta: meta || null, d: geom.d, mid: geom.mid };
    })
    .filter(Boolean);

  return { ...base, edges, nodeList: [...base.nodes.values()] };
}

/**
 * Roteiro da execução, derivado das arestas.
 *
 * Ramificações (um nó com duas saídas) não são "teleporte": os nós já
 * percorridos continuam acesos, então as duas pernas ficam visíveis como dois
 * caminhos que rodaram — que é exatamente o que acontece num switch.
 */
export function buildTimeline(flow, { dwell = 620, travel = 760, hold = 1500 } = {}) {
  const steps = [];
  flow.edges.forEach((_, i) => {
    steps.push({ type: 'dwell', edge: i, ms: dwell });
    steps.push({ type: 'travel', edge: i, ms: travel });
  });
  steps.push({ type: 'hold', ms: hold });
  return steps;
}
