import { useEffect, useId, useMemo, useRef, useState } from 'react';
import { computeLayout, buildTimeline } from './layout';
import { useMediaQuery, useReducedMotion } from '../../hooks/useMediaQuery';
import './graph.css';

/**
 * Grafo de workflow em execução.
 *
 * Não é uma ilustração de automação: é uma automação rodando. Um pacote sai do
 * gatilho, percorre cada aresta desenhando a corrente, e cada nó que recebe o
 * pacote imprime a saída daquela etapa. O mesmo componente serve o hero (em
 * loop, sem controle) e a seção de demonstração (com botão de reprodução).
 *
 * Decisões que valem explicação:
 *
 * - O laço de animação escreve direto no DOM (stroke-dashoffset e transform do
 *   pacote). O React só re-renderiza nas trocas de etapa — poucas vezes por
 *   segundo, não 60.
 * - A animação pausa quando o grafo sai da tela. Um hero animando fora do
 *   viewport é bateria queimada à toa.
 * - Com `prefers-reduced-motion`, nada anima: o grafo renderiza o estado final
 *   completo, que é um diagrama legível do fluxo inteiro.
 */
export function WorkflowGraph({
  flow,
  autoPlay = true,
  loop = true,
  playSignal = 0,
  speed = 1,
  description,
  className = '',
}) {
  const gradientId = useId();
  const narrow = !useMediaQuery('(min-width: 768px)');
  const reduced = useReducedMotion();

  const layout = useMemo(() => computeLayout(flow, narrow), [flow, narrow]);
  const timeline = useMemo(() => buildTimeline(flow), [flow]);

  const wrapRef = useRef(null);
  const edgeRefs = useRef([]);
  const packetRef = useRef(null);
  const doneRef = useRef(new Set());

  const [onScreen, setOnScreen] = useState(false);
  const [lit, setLit] = useState(() => new Set([flow.nodes[0]?.id]));
  const [doneEdges, setDoneEdges] = useState(() => new Set());

  doneRef.current = doneEdges;

  /* Visibilidade contínua: liga e desliga o laço conforme o grafo entra e sai. */
  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return undefined;

    if (!('IntersectionObserver' in window)) {
      setOnScreen(true);
      return undefined;
    }

    const io = new IntersectionObserver(([entry]) => setOnScreen(entry.isIntersecting), {
      threshold: 0.15,
    });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const running = onScreen && (autoPlay || playSignal > 0);

  /* Estado final estático quando o usuário pediu menos movimento. */
  useEffect(() => {
    if (!reduced) return;
    setLit(new Set(flow.nodes.map((n) => n.id)));
    setDoneEdges(new Set(flow.edges.map((_, i) => i)));
  }, [reduced, flow]);

  /* Laço de execução. */
  useEffect(() => {
    if (reduced || !running) return undefined;

    let frame;
    let stepIndex = 0;
    let stepStart = performance.now();

    const resetEdges = () => {
      edgeRefs.current.forEach((path) => {
        if (!path) return;
        const len = path.getTotalLength();
        path.style.strokeDasharray = `${len}`;
        path.style.strokeDashoffset = `${len}`;
      });
      if (packetRef.current) packetRef.current.style.opacity = '0';
    };

    const restart = () => {
      stepIndex = 0;
      resetEdges();
      setLit(new Set([flow.nodes[0]?.id]));
      setDoneEdges(new Set());
    };

    restart();

    const tick = (now) => {
      const step = timeline[stepIndex];
      if (!step) return;

      const duration = Math.max(1, step.ms / speed);
      const t = Math.min(1, (now - stepStart) / duration);

      if (step.type === 'travel') {
        const path = edgeRefs.current[step.edge];
        const packet = packetRef.current;
        if (path) {
          const len = path.getTotalLength();
          path.style.strokeDasharray = `${len}`;
          path.style.strokeDashoffset = `${len * (1 - t)}`;
          if (packet) {
            const point = path.getPointAtLength(len * t);
            packet.setAttribute('transform', `translate(${point.x} ${point.y})`);
            packet.style.opacity = '1';
          }
        }
      }

      if (t >= 1) {
        if (step.type === 'travel') {
          const targetId = flow.edges[step.edge]?.[1];
          setDoneEdges((prev) => new Set(prev).add(step.edge));
          if (targetId) setLit((prev) => new Set(prev).add(targetId));
          if (packetRef.current) packetRef.current.style.opacity = '0';
        }

        stepIndex += 1;
        stepStart = now;

        if (stepIndex >= timeline.length) {
          if (!loop) return; // termina no estado completo
          restart();
          stepStart = now;
        }
      }

      frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [reduced, running, playSignal, timeline, flow, loop, speed]);

  /* O layout muda no resize e os comprimentos de path mudam junto. Reaplica o
     traçado das arestas já percorridas para nenhuma delas ficar pela metade. */
  useEffect(() => {
    if (reduced) return;
    edgeRefs.current.forEach((path, i) => {
      if (!path) return;
      const len = path.getTotalLength();
      path.style.strokeDasharray = `${len}`;
      path.style.strokeDashoffset = doneRef.current.has(i) ? '0' : `${len}`;
    });
  }, [layout, reduced]);

  const nodeSteps = flow.nodes.map((n) => `${n.label}: ${n.log}`).join('; ');

  return (
    <div ref={wrapRef} className={className}>
      <svg
        className={`graph ${reduced ? 'is-static' : ''}`}
        viewBox={`0 0 ${layout.width} ${layout.height}`}
        role="img"
        aria-label={description || `Fluxo de automação. Etapas: ${nodeSteps}.`}
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <linearGradient id={gradientId} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="var(--color-pulse)" />
            <stop offset="100%" stopColor="var(--color-volt)" />
          </linearGradient>
        </defs>

        <g>
          {layout.edges.map((edge, i) => (
            <g key={`${edge.from}-${edge.to}-${i}`}>
              <path className="graph-edge" d={edge.d} />
              <path
                className="graph-edge-live"
                d={edge.d}
                stroke={`url(#${gradientId})`}
                ref={(el) => {
                  edgeRefs.current[i] = el;
                }}
              />
              {edge.meta?.label && (
                <text className="graph-edge-label" x={edge.mid.x} y={edge.mid.y - 9}>
                  {edge.meta.label}
                </text>
              )}
            </g>
          ))}
        </g>

        {/* Pacote acima das arestas e abaixo dos nós: ele "entra" no nó. */}
        <g className="graph-packet" ref={packetRef}>
          <circle className="graph-packet-halo" r="11" />
          <circle className="graph-packet-core" r="3.5" />
        </g>

        <g>
          {layout.nodeList.map((n) => (
            <GraphNode key={n.node.id} item={n} lit={lit.has(n.node.id)} />
          ))}
        </g>
      </svg>
    </div>
  );
}

function GraphNode({ item, lit }) {
  const { node, x, y, w, h } = item;
  return (
    <g className={`graph-node${lit ? ' is-lit' : ''}`} data-kind={node.kind}>
      <rect x={x} y={y} width={w} height={h} rx="10" />
      <circle className="graph-node-dot" cx={x + 15} cy={y + h / 2} r="3.5" />
      <text className="graph-node-label" x={x + 29} y={y + h / 2 + 1}>
        {node.label}
      </text>
      {node.log && (
        <text className="graph-node-log" x={x + 2} y={y + h + 19}>
          {node.log}
        </text>
      )}
    </g>
  );
}
