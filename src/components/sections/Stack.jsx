import { Section, SectionHeading } from '../ui/Section';
import { stackGroups } from '../../data/stack';

const TONE = {
  volt: 'bg-volt',
  pulse: 'bg-pulse',
  faint: 'bg-line-strong',
};

/**
 * Stack e ferramentas.
 *
 * Sem grade de logotipos: cada ferramenta aparece como um nó rotulado pelo
 * papel que cumpre na operação. O nome da marca importa menos do que a resposta
 * a "e isso serve para quê?" — e a leitura por papel é o que um cliente
 * realmente usa para avaliar.
 */
export function Stack() {
  return (
    <Section id="stack" label="stack">
      <div className="shell">
        <SectionHeading
          eyebrow="Stack"
          title="As ferramentas, e o que cada uma resolve."
        />

        <div className="mt-16 space-y-14 md:mt-20 md:space-y-16">
          {stackGroups.map((group, gi) => (
            <div key={group.group} data-reveal style={{ '--reveal-delay': `${gi * 90}ms` }}>
              <div className="flex items-center gap-4">
                <span aria-hidden="true" className={`h-1.5 w-1.5 rotate-45 ${TONE[group.tone]}`} />
                <h3 className="eyebrow text-muted">{group.group}</h3>
                <span aria-hidden="true" className="h-px flex-1 bg-line" />
              </div>

              <ul className="mt-7 grid gap-x-8 gap-y-7 sm:grid-cols-2 lg:grid-cols-3">
                {group.items.map((item) => (
                  <li key={item.name} className="group border-t border-line pt-4 transition-colors hover:border-line-strong">
                    <p className="font-mono text-[13px] tracking-[0.02em] text-paper">{item.name}</p>
                    <p className="mt-1.5 text-[13.5px] leading-relaxed text-faint transition-colors group-hover:text-muted">
                      {item.role}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
