import { Section, SectionHeading } from '../ui/Section';
import { axes, brand } from '../../data/site';

/**
 * Sobre a PPP — os dois eixos de atuação.
 *
 * Os eixos são paralelos, não sequenciais, então não recebem numeração: a
 * ordem entre eles não carrega informação. O que carrega é a convergência —
 * o gráfico abaixo mostra as duas frentes virando uma entrega só, que é
 * literalmente o diferencial descrito no texto.
 */
export function About() {
  return (
    <Section id="sobre" label="sobre" tone="raised">
      <div className="shell">
        <SectionHeading
          eyebrow="Sobre a PPP"
          title="Duas frentes que a maioria contrata em lugares diferentes."
          lead={brand.short}
        />

        <div className="mt-16 grid gap-px overflow-hidden rounded-2xl border border-line bg-line md:mt-20 md:grid-cols-2">
          {axes.map((axis, i) => (
            <article
              key={axis.key}
              className="relative bg-ink-100 p-8 md:p-11"
              data-reveal
              style={{ '--reveal-delay': `${i * 110}ms` }}
            >
              <span
                aria-hidden="true"
                className={`absolute left-0 top-0 h-full w-px ${i === 0 ? 'bg-volt/60' : 'bg-pulse/60'}`}
              />
              <p className="eyebrow">{i === 0 ? 'eixo · relacionamento' : 'eixo · produto'}</p>
              <h3 className="display mt-5 text-2xl leading-tight text-paper md:text-[1.75rem]">
                {axis.label}
              </h3>
              <p className="mt-5 text-base leading-relaxed text-muted md:text-lg">{axis.body}</p>
              <ul className="mt-7 flex flex-wrap gap-2">
                {axis.tools.map((tool) => (
                  <li
                    key={tool}
                    className="rounded-full border border-line-strong px-3 py-1.5 font-mono text-[10.5px] uppercase tracking-[0.1em] text-faint"
                  >
                    {tool}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>

        {/* Convergência: as duas frentes desembocam numa entrega só. */}
        <div className="mt-14 grid items-center gap-10 md:mt-16 md:grid-cols-12">
          <div className="md:col-span-5" data-reveal="left">
            <svg
              viewBox="0 0 320 120"
              className="w-full max-w-[320px]"
              role="img"
              aria-label="Duas linhas, automação e produto digital, convergindo numa única entrega."
            >
              <path
                d="M4 24 C 90 24, 120 60, 210 60"
                fill="none"
                stroke="var(--color-volt)"
                strokeWidth="1.6"
                opacity="0.75"
              />
              <path
                d="M4 96 C 90 96, 120 60, 210 60"
                fill="none"
                stroke="var(--color-pulse)"
                strokeWidth="1.6"
                opacity="0.75"
              />
              <path d="M210 60 H 300" fill="none" stroke="var(--color-paper)" strokeWidth="1.8" />
              <circle cx="4" cy="24" r="3.5" fill="var(--color-volt)" />
              <circle cx="4" cy="96" r="3.5" fill="var(--color-pulse)" />
              <rect
                x="292"
                y="52"
                width="16"
                height="16"
                rx="4.5"
                fill="var(--color-ink-200)"
                stroke="var(--color-paper)"
                strokeWidth="1.4"
              />
              <text x="16" y="16" className="fill-faint font-mono" style={{ fontSize: 10, letterSpacing: '0.1em' }}>
                automação
              </text>
              <text x="16" y="114" className="fill-faint font-mono" style={{ fontSize: 10, letterSpacing: '0.1em' }}>
                produto
              </text>
            </svg>
          </div>

          <div className="md:col-span-7" data-reveal>
            <p className="text-xl leading-snug text-paper md:text-2xl">
              Automação sem produto digital vira remendo. Produto sem automação vira trabalho
              manual. A PPP entrega os dois lados{' '}
              <span className="text-volt">e o visual que amarra os dois</span> — por isso ninguém
              precisa traduzir o escopo de um fornecedor para o outro.
            </p>
          </div>
        </div>
      </div>
    </Section>
  );
}
