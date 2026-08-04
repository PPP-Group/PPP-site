import { useCallback, useEffect, useRef } from 'react';
import { useReducedMotion } from '../../hooks/useMediaQuery';
import './laptop.css';

/* TODO: números ilustrativos até a PPP confirmar dados reais.
   O painel é decorativo (o bloco inteiro é role="img"), então isto não é
   copy de produção — mas troque quando houver um print real do dashboard. */
const PANEL = {
  total: '1.284',
  totalLabel: 'execuções hoje',
  spark: [38, 56, 44, 71, 52, 83, 96],
  log: [
    ['webhook · lead', '200 · 84ms'],
    ['ia · qualificar', 'score 87'],
    ['voice ai', '00:41'],
    ['agenda', 'confirmado'],
  ],
};

/* Limites de rotação. O eixo Y é livre — dar a volta completa é metade da
   graça. O X fica preso para o notebook nunca virar de barriga para cima. */
const RX_MIN = -26;
const RX_MAX = 16;

/* Cantos. A região do canto é um quarto de cilindro que as arestas retas não
   alcançam, e planos empilhados na profundidade não a fecham: duas fatias
   separadas por Δz se afastam Δz · tan(ângulo) na tela, e a base deitada a 76°
   multiplica isso por quatro — dava para ver através do canto.

   Aqui o canto é geometria de verdade: facetas planas giradas em torno do eixo
   do próprio canto, cada uma com a profundidade inteira do corpo. Quatro por
   canto (22,5° cada) deixam um degrau de 0,02 × raio, invisível, e fecham o
   corpo em qualquer ângulo. */
const CORNER_FACETS = 4;
const CORNER_STEP = 90 / CORNER_FACETS;

/* Azimute inicial de cada canto, com +X à direita e +Y para baixo (convenção
   do CSS), girando de +X para +Y. */
const CORNER_BASE = { tl: 180, tr: 270, br: 0, bl: 90 };

const SHELL = Object.entries(CORNER_BASE).flatMap(([corner, base]) =>
  Array.from({ length: CORNER_FACETS }, (_, k) => ({
    id: `${corner}${k}`,
    corner,
    angle: base + CORNER_STEP * (k + 0.5),
  })),
);

/* Quanto o ponteiro sozinho inclina o objeto, sem arrastar. */
const FOLLOW_RY = 13;
const FOLLOW_RX = 7;

/**
 * Notebook 3D com um painel de execuções na tela.
 *
 * Duas formas de mexer, sem conflito entre elas:
 *
 *   arrastar   controle direto. O ângulo obtido é mantido ao soltar — quem
 *              girou o objeto espera que ele fique onde parou.
 *   passar o   inclinação sutil aplicada COMO DESVIO sobre o ângulo atual,
 *   mouse      não como posição absoluta. Por isso continua funcionando
 *              depois de o usuário ter girado o notebook para onde quis.
 *
 * A pose inicial vive no CSS (`--lp-rx` / `--lp-ry`), então o notebook já
 * aparece no ângulo certo antes de qualquer JavaScript rodar.
 */
export function Laptop3D({ className = '' }) {
  const sceneRef = useRef(null);
  const bodyRef = useRef(null);
  const reduced = useReducedMotion();

  /* Todo o estado da animação vive em ref: 60 renders por segundo do React
     para girar um objeto seria desperdício puro. */
  const state = useRef({
    rx: -7,
    ry: -21,
    baseRx: -7,
    baseRy: -21,
    followRx: 0,
    followRy: 0,
    dragging: false,
    lastX: 0,
    lastY: 0,
  });

  const clamp = (v, min, max) => Math.min(max, Math.max(min, v));

  const onPointerDown = useCallback((event) => {
    // Só botão principal; deixa o menu de contexto e o meio em paz.
    if (event.button !== 0) return;
    const s = state.current;
    s.dragging = true;
    s.lastX = event.clientX;
    s.lastY = event.clientY;
    s.followRx = 0;
    s.followRy = 0;
    // Captura para o giro continuar mesmo com o cursor fora do notebook.
    // Pode lançar se o ponteiro já não estiver ativo — e falhar aqui não
    // justifica derrubar o arrasto.
    try {
      event.currentTarget.setPointerCapture(event.pointerId);
    } catch {
      /* segue sem captura: o arrasto ainda funciona sobre o próprio elemento */
    }
  }, []);

  const onPointerMove = useCallback((event) => {
    const s = state.current;
    if (!s.dragging) return;
    const dx = event.clientX - s.lastX;
    const dy = event.clientY - s.lastY;
    s.lastX = event.clientX;
    s.lastY = event.clientY;

    s.baseRy += dx * 0.45;
    s.baseRx = clamp(s.baseRx - dy * 0.3, RX_MIN, RX_MAX);
  }, []);

  const endDrag = useCallback((event) => {
    const s = state.current;
    if (!s.dragging) return;
    s.dragging = false;
    try {
      event.currentTarget.releasePointerCapture(event.pointerId);
    } catch {
      /* nada a liberar */
    }
  }, []);

  /* Inclinação ao passar o mouse pela área do hero, sem arrastar. */
  useEffect(() => {
    if (reduced) return undefined;
    const scene = sceneRef.current;
    if (!scene) return undefined;

    const onMove = (event) => {
      const s = state.current;
      if (s.dragging) return;
      const rect = scene.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;
      s.followRy = clamp(x, -1.5, 1.5) * FOLLOW_RY;
      s.followRx = clamp(-y, -1.5, 1.5) * FOLLOW_RX;
    };

    const onLeave = () => {
      const s = state.current;
      s.followRy = 0;
      s.followRx = 0;
    };

    // Ouve na janela: a inclinação responde ao mouse em qualquer ponto do
    // hero, não só sobre o notebook. É o que faz o objeto parecer vivo.
    window.addEventListener('pointermove', onMove, { passive: true });
    document.addEventListener('pointerleave', onLeave);
    return () => {
      window.removeEventListener('pointermove', onMove);
      document.removeEventListener('pointerleave', onLeave);
    };
  }, [reduced]);

  /* Laço de suavização. Escreve custom properties, nunca estado do React. */
  useEffect(() => {
    const body = bodyRef.current;
    const scene = sceneRef.current;
    if (!body || !scene) return undefined;

    let frame;
    let onScreen = true;

    const io =
      'IntersectionObserver' in window
        ? new IntersectionObserver(([e]) => {
            onScreen = e.isIntersecting;
          })
        : null;
    io?.observe(scene);

    const tick = () => {
      const s = state.current;

      if (onScreen) {
        const targetRx = clamp(s.baseRx + s.followRx, RX_MIN - 6, RX_MAX + 6);
        const targetRy = s.baseRy + s.followRy;

        // Arrastando, responde na hora; solto, chega com peso.
        const k = s.dragging ? 0.55 : 0.09;
        s.rx += (targetRx - s.rx) * k;
        s.ry += (targetRy - s.ry) * k;

        body.style.setProperty('--lp-rx', `${s.rx.toFixed(2)}deg`);
        body.style.setProperty('--lp-ry', `${s.ry.toFixed(2)}deg`);

        /* Reflexo em função do ângulo: some quando a tela encara o
           observador e cresce quando ela vira de lado. */
        const glare = 0.12 + Math.abs(Math.sin((s.ry * Math.PI) / 180)) * 0.5;
        scene.style.setProperty('--lp-glare', glare.toFixed(3));
      }

      frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(frame);
      io?.disconnect();
    };
  }, []);

  return (
    <div
      ref={sceneRef}
      className={`lp-scene ${className}`}
      role="img"
      aria-label="Notebook exibindo um painel de execuções de automação: total do dia, histórico recente e o status de cada etapa do fluxo."
    >
      <div className="lp-shadow" aria-hidden="true" />

      <div className="lp-float">
        <div
          ref={bodyRef}
          className="lp-body"
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={endDrag}
          onPointerCancel={endDrag}
        >
          {/* Tampa: caixa de seis faces. */}
          <div className="lp-lid">
            <div className="lp-lid-front">
              <span className="lp-cam" />
              <div className="lp-screen">
                <div className="lp-bar">
                  <div className="lp-dots">
                    <i />
                    <i />
                    <i />
                  </div>
                  <span>execuções</span>
                </div>

                <div className="lp-top">
                  <div className="lp-metric">
                    <b>{PANEL.total}</b>
                    <span>{PANEL.totalLabel}</span>
                  </div>
                  <div className="lp-spark">
                    {PANEL.spark.map((h, i) => (
                      <i key={i} style={{ height: `${h}%` }} />
                    ))}
                  </div>
                </div>

                <div className="lp-log">
                  {PANEL.log.map(([label, value]) => (
                    <div key={label}>
                      <i />
                      {label}
                      <em>{value}</em>
                    </div>
                  ))}
                </div>
              </div>
              <span className="lp-chin">PPP</span>
            </div>

            <div className="lp-lid-cover">
              {/* A marca de três nós, gravada na capa. */}
              <svg className="lp-lid-mark" viewBox="0 0 40 14" fill="none" aria-hidden="true">
                <path d="M9 7h8M23 7h8" stroke="#4a4a68" strokeWidth="1.2" />
                <rect x="1" y="3" width="8" height="8" rx="2.4" stroke="#4a4a68" strokeWidth="1.3" />
                <rect x="15" y="3" width="8" height="8" rx="2.4" stroke="#4a4a68" strokeWidth="1.3" />
                <rect x="29" y="3" width="8" height="8" rx="2.4" stroke="#4a4a68" strokeWidth="1.3" />
              </svg>
            </div>

            {SHELL.map(({ id, corner, angle }) => (
              <span
                key={id}
                className={`lp-corner lp-corner-${corner}`}
                style={{ '--a': `${angle}deg` }}
              />
            ))}

            <span className="lp-face lp-face-t" />
            <span className="lp-face lp-face-b" />
            <span className="lp-face lp-face-l" />
            <span className="lp-face lp-face-r" />
          </div>

          {/* Base: mesma caixa de seis faces, mais grossa. */}
          <div className="lp-deck">
            <div className="lp-deck-top">
              <div className="lp-keys">
                {[14, 14, 13, 11].map((n, row) => (
                  <div className="lp-keyrow" key={row}>
                    {Array.from({ length: n }, (_, i) => (
                      <span key={i} className="lp-key" />
                    ))}
                  </div>
                ))}
                <div className="lp-keyrow">
                  <span className="lp-key" />
                  <span className="lp-key wide" />
                  <span className="lp-key" />
                </div>
              </div>
              <div className="lp-pad" />
            </div>

            <div className="lp-deck-bottom">
              <span className="lp-vent" />
              <span className="lp-foot" />
              <span className="lp-foot" />
              <span className="lp-foot" />
              <span className="lp-foot" />
            </div>

            {SHELL.map(({ id, corner, angle }) => (
              <span
                key={id}
                className={`lp-corner lp-corner-${corner}`}
                style={{ '--a': `${angle}deg` }}
              />
            ))}

            <span className="lp-face lp-face-t" />
            <span className="lp-face lp-face-b" />
            <span className="lp-face lp-face-l" />
            <span className="lp-face lp-face-r" />
          </div>
        </div>
      </div>
    </div>
  );
}
