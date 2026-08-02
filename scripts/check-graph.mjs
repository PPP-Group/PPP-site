/**
 * Checagem de geometria do grafo de workflow — `npm run check`.
 *
 * O grafo é o elemento-assinatura do site e suas posições vêm dos dados. Um
 * rótulo mais longo ou um nó novo em src/data/automations.js pode empurrar uma
 * caixa para fora da moldura ou fazer dois nós se sobreporem, e isso não
 * aparece num teste de unidade de componente — aparece na tela, torto.
 *
 * Este script roda o mesmo `computeLayout` que o componente usa, nos dois modos
 * (horizontal e empilhado), e falha se a composição quebrar.
 */
import { computeLayout, buildTimeline } from '../src/components/graph/layout.js';
import { heroFlow, demoFlow } from '../src/data/automations.js';

let falhas = 0;
const check = (nome, ok, detalhe = '') => {
  if (!ok) falhas++;
  console.log(`${ok ? 'ok   ' : 'FALHA'} ${nome}${detalhe ? ' — ' + detalhe : ''}`);
};

const rects = (l) => l.nodeList.map((n) => ({ id: n.node.id, x: n.x, y: n.y, w: n.w, h: n.h }));
const overlap = (a, b) => a.x < b.x + b.w && b.x < a.x + a.w && a.y < b.y + b.h && b.y < a.y + a.h;

const flows = [
  ['heroFlow', heroFlow],
  ['demoFlow', demoFlow],
];

for (const [nome, flow] of flows) {
  for (const stack of [false, true]) {
    const label = `${nome} / ${stack ? 'stack' : 'flow'}`;
    const l = computeLayout(flow, stack);
    const rs = rects(l);

    check(`${label}: todos os nós presentes`, rs.length === flow.nodes.length);
    check(
      `${label}: todas as arestas resolvidas`,
      l.edges.length === flow.edges.length,
      `${l.edges.length}/${flow.edges.length}`,
    );
    check(
      `${label}: nós dentro da moldura`,
      rs.every((r) => r.x >= 0 && r.y >= 0 && r.x + r.w <= l.width && r.y + r.h <= l.height),
      rs
        .filter((r) => r.x + r.w > l.width || r.y + r.h > l.height)
        .map((r) => r.id)
        .join(',') || 'ok',
    );

    const colisoes = [];
    for (let i = 0; i < rs.length; i++)
      for (let j = i + 1; j < rs.length; j++)
        if (overlap(rs[i], rs[j])) colisoes.push(`${rs[i].id}~${rs[j].id}`);
    check(`${label}: nenhum nó sobreposto`, colisoes.length === 0, colisoes.join(' '));

    check(
      `${label}: paths bem formados`,
      l.edges.every((e) => /^M [\d.-]+ [\d.-]+ C /.test(e.d) && Number.isFinite(e.mid.x)),
    );

    // O log é impresso 19px abaixo da base do nó; precisa caber.
    check(
      `${label}: sobra espaço para o log`,
      rs.every((r) => r.y + r.h + 22 <= l.height),
    );
  }
}

for (const [nome, flow] of flows) {
  const t = buildTimeline(flow);
  const viagens = t.filter((s) => s.type === 'travel').map((s) => s.edge);
  check(
    `${nome}: roteiro percorre cada aresta uma vez`,
    viagens.length === flow.edges.length && new Set(viagens).size === flow.edges.length,
  );
  check(
    `${nome}: todo nó recebe o pacote, exceto o gatilho`,
    new Set(flow.edges.map((e) => e[1])).size === flow.nodes.length - 1,
  );
  const dur = t.reduce((a, s) => a + s.ms, 0);
  console.log(`     ${nome}: ciclo completo em ${(dur / 1000).toFixed(1)}s`);
}

console.log(falhas === 0 ? '\nTodas as checagens passaram.' : `\n${falhas} falha(s).`);
process.exit(falhas === 0 ? 0 : 1);
