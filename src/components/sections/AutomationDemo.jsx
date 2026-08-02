import { lazy, Suspense, useState } from 'react';
import { Section, SectionHeading } from '../ui/Section';
import { WorkflowGraph } from '../graph/WorkflowGraph';
import { demoFlow, automationCases } from '../../data/automations';

/* Igual ao portfólio: o modal só chega quando alguém pede um case. */
const CaseModal = lazy(() =>
  import('../automation/CaseModal').then((m) => ({ default: m.CaseModal })),
);

/**
 * Demonstração de automação.
 *
 * O mesmo motor do hero, agora sob controle: o fluxo roda uma vez ao entrar na
 * tela e o visitante pode reproduzir de novo. A ramificação (lead quente vs.
 * frio) é o ponto — é o que separa uma automação de um disparo em massa.
 */
export function AutomationDemo() {
  const [playSignal, setPlaySignal] = useState(0);
  const [openCase, setOpenCase] = useState(null);

  return (
    <Section id="automacao" label="automação" tone="raised">
      <div className="shell">
        <SectionHeading
          eyebrow="Demonstração"
          title="Um lead entrando, do formulário ao pipeline."
          lead="Cada nó imprime a saída da própria etapa. Onde o fluxo se divide, é uma condição decidindo — não uma régua de disparo igual para todo mundo."
        />

        {/* Painel de canvas: moldura, barra de ferramentas e o grafo. */}
        <div className="mt-14 overflow-hidden rounded-2xl border border-line bg-ink-000 md:mt-16" data-reveal="scale">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line px-4 py-3 md:px-6">
            <p className="eyebrow flex items-center gap-2.5">
              <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-ok" />
              fluxo · captação e qualificação
            </p>
            <button
              type="button"
              onClick={() => setPlaySignal((n) => n + 1)}
              className="group inline-flex h-9 items-center gap-2.5 rounded-full border border-line-strong px-4 font-mono text-[11px] uppercase tracking-[0.1em] text-paper transition-colors hover:border-volt/60 hover:text-volt"
              data-cursor
            >
              <svg viewBox="0 0 12 12" className="h-2.5 w-2.5" fill="currentColor" aria-hidden="true">
                <path d="M2 1.5v9l8-4.5-8-4.5z" />
              </svg>
              Reproduzir
            </button>
          </div>

          <div className="canvas-grid px-3 py-8 md:px-8 md:py-12">
            <WorkflowGraph
              flow={demoFlow}
              autoPlay
              loop={false}
              playSignal={playSignal}
              description="Um lead preenche o formulário, é enriquecido e classificado por IA. Se a intenção é alta, a Voice AI liga e agenda; se é baixa, entra numa sequência de nutrição. Os dois caminhos terminam no pipeline."
            />
          </div>
        </div>

        {/* Mini-cases */}
        <div className="mt-20 md:mt-24">
          <p className="eyebrow mb-8" data-reveal>
            Três problemas que resolvemos assim
          </p>

          <div className="grid gap-5 md:grid-cols-3">
            {automationCases.map((item, i) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setOpenCase(item)}
                className="group flex h-full flex-col rounded-xl border border-line bg-ink-100 p-7 text-left transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1 hover:border-line-strong"
                data-reveal
                data-cursor
                data-cursor-label="abrir case"
                style={{ '--reveal-delay': `${i * 90}ms` }}
              >
                <span className="eyebrow text-volt">{item.kicker}</span>
                <span className="display mt-4 block text-xl leading-tight text-paper">
                  {item.title}
                </span>
                <span className="mt-4 block flex-1 text-[14.5px] leading-relaxed text-muted">
                  {item.problem}
                </span>
                <span className="mt-6 flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.1em] text-faint transition-colors group-hover:text-paper">
                  Ver como resolvemos
                  <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">
                    →
                  </span>
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {openCase && (
        <Suspense fallback={null}>
          <CaseModal item={openCase} open onClose={() => setOpenCase(null)} />
        </Suspense>
      )}
    </Section>
  );
}
