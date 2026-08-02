import { useCallback, useEffect, useState } from 'react';
import { scrollToTarget } from '../../lib/scroll';
import { useMediaQuery, useReducedMotion } from '../../hooks/useMediaQuery';

/**
 * Espinha de workflow — a vista de longe do mesmo grafo do hero.
 *
 * Cada seção da página é um nó; a rolagem é o pacote percorrendo a aresta. É
 * ao mesmo tempo indicador de progresso e navegação: clicar num nó leva à
 * seção correspondente.
 *
 * A parte acesa não é calculada em JS a cada frame. Existem duas camadas
 * idênticas — uma apagada e uma acesa — e a acesa é recortada por
 * `clip-path` em função de `--scroll-progress`. O único trabalho por frame é a
 * escrita dessa variável, que já acontece uma vez para a página inteira.
 */
export function WorkflowSpine() {
  const wide = useMediaQuery('(min-width: 1280px)');
  const reduced = useReducedMotion();
  const [nodes, setNodes] = useState([]);

  const measure = useCallback(() => {
    const sections = [...document.querySelectorAll('[data-spine-node]')];
    const range = document.documentElement.scrollHeight - window.innerHeight;
    if (range <= 0) {
      setNodes([]);
      return;
    }

    const headerOffset =
      (parseInt(getComputedStyle(document.documentElement).getPropertyValue('--header-h'), 10) ||
        72) + 12;

    setNodes(
      sections.map((el) => {
        const top = el.getBoundingClientRect().top + window.scrollY - headerOffset;
        return {
          id: el.id,
          label: el.getAttribute('data-spine-label') || el.id,
          /* Posição = o valor de progresso em que esta seção chega ao topo.
             Assim o nó acende exatamente quando você chega nela. */
          at: Math.min(1, Math.max(0, top / range)),
        };
      }),
    );
  }, []);

  useEffect(() => {
    if (!wide) return undefined;

    measure();

    // Fontes e imagens mudam a altura do documento depois do primeiro layout.
    const ro = new ResizeObserver(measure);
    ro.observe(document.body);
    window.addEventListener('resize', measure);
    document.fonts?.ready?.then(measure).catch(() => {});

    return () => {
      ro.disconnect();
      window.removeEventListener('resize', measure);
    };
  }, [wide, measure]);

  if (!wide || nodes.length === 0) return null;

  const rail = (lit) => (
    <div
      className="absolute inset-0"
      style={
        lit
          ? {
              // Recorta de baixo para cima conforme o progresso avança.
              clipPath: 'inset(0 0 calc(100% - var(--scroll-progress, 0) * 100%) 0)',
            }
          : undefined
      }
      aria-hidden="true"
    >
      <div
        className={`absolute left-1/2 top-0 h-full w-px -translate-x-1/2 ${
          lit ? '' : 'bg-line'
        }`}
        style={lit ? { background: 'var(--current)' } : undefined}
      />
      {nodes.map((node) => (
        <span
          key={node.id}
          className={`absolute left-1/2 h-[7px] w-[7px] -translate-x-1/2 -translate-y-1/2 rotate-45 ${
            lit ? 'bg-volt' : 'bg-line-strong'
          }`}
          style={{ top: `${node.at * 100}%` }}
        />
      ))}
    </div>
  );

  return (
    <nav
      aria-label="Progresso e navegação por seções"
      className="pointer-events-none fixed left-[max(1.75rem,calc((100vw-var(--shell))/4))] top-[18vh] z-40 hidden h-[64vh] w-6 xl:block"
    >
      <div className="relative h-full">
        {rail(false)}
        {!reduced && rail(true)}

        {/* Alvos clicáveis por cima das duas camadas. */}
        {nodes.map((node) => (
          <button
            key={node.id}
            type="button"
            onClick={() => scrollToTarget(`#${node.id}`)}
            className="group pointer-events-auto absolute left-1/2 flex h-6 w-6 -translate-x-1/2 -translate-y-1/2 items-center justify-center"
            style={{ top: `${node.at * 100}%` }}
          >
            <span className="sr-only">Ir para {node.label}</span>
            <span
              aria-hidden="true"
              className="absolute left-6 whitespace-nowrap font-mono text-[10px] uppercase tracking-[0.14em] text-faint opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100"
            >
              {node.label}
            </span>
          </button>
        ))}
      </div>
    </nav>
  );
}
