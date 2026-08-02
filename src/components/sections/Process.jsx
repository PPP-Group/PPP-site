import { Section, SectionHeading } from '../ui/Section';
import { processSteps } from '../../data/process';

/**
 * Como trabalhamos.
 *
 * Aqui a numeração se justifica: a ordem carrega informação — não se
 * implementa antes de desenhar, nem se desenha antes de diagnosticar. O trilho
 * se desenha no sentido da leitura quando a seção entra na tela, e cada etapa
 * declara o que entrega de concreto ao terminar.
 */
export function Process() {
  return (
    <Section id="processo" label="processo" tone="raised">
      <div className="shell">
        <SectionHeading
          eyebrow="Como trabalhamos"
          title="Diagnóstico antes de ferramenta."
          lead="Automatizar um processo quebrado só faz ele quebrar mais rápido. Por isso a primeira entrega nunca é um fluxo — é o mapa do que já existe."
        />

        <div className="timeline relative mt-16 md:mt-24" data-reveal="trigger">
          {/* Trilho horizontal (desktop) */}
          <div aria-hidden="true" className="absolute inset-x-0 top-[13px] hidden md:block">
            <div className="h-px w-full bg-line" />
            <div
              className="timeline-rail-fill absolute inset-x-0 top-0 h-px"
              style={{ background: 'var(--current)' }}
            />
          </div>

          {/* Trilho vertical (mobile) */}
          <div aria-hidden="true" className="absolute bottom-0 left-[6px] top-2 w-px md:hidden">
            <div className="h-full w-px bg-line" />
            <div
              data-axis="y"
              className="timeline-rail-fill absolute inset-y-0 left-0 w-px"
              style={{ background: 'var(--current)' }}
            />
          </div>

          <ol className="grid gap-12 md:grid-cols-4 md:gap-8">
            {processSteps.map((step, i) => (
              <li
                key={step.n}
                className="timeline-step relative pl-9 md:pl-0"
                style={{ '--step-delay': `${250 + i * 130}ms` }}
              >
                <span
                  aria-hidden="true"
                  className="absolute left-0 top-2 h-[13px] w-[13px] rotate-45 border border-volt bg-ink-050 md:left-auto md:top-[7px]"
                />
                <div className="md:pt-12">
                  <div className="flex items-baseline gap-3">
                    <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-volt">
                      {step.n}
                    </span>
                    <span className="font-mono text-[10.5px] uppercase tracking-[0.12em] text-faint">
                      {step.duration}
                    </span>
                  </div>
                  <h3 className="display mt-3 text-2xl text-paper">{step.title}</h3>
                  <p className="mt-3.5 text-[15px] leading-relaxed text-muted">{step.body}</p>
                  <p className="mt-5 border-t border-line pt-4 text-[13px] leading-relaxed text-faint">
                    <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted">
                      Entrega ·{' '}
                    </span>
                    {step.output}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </Section>
  );
}
