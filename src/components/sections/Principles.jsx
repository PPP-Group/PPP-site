import { Section, SectionHeading } from '../ui/Section';
import { principles } from '../../data/site';

/**
 * Princípios de trabalho.
 *
 * Ocupa o lugar de "prova social" enquanto não há depoimentos aprovados. São
 * afirmações verificáveis sobre como a PPP trabalha, não adjetivos —
 * "a operação fica com você" é uma promessa que se cobra depois.
 */
export function Principles() {
  return (
    <Section id="principios" label="princípios" tone="raised">
      <div className="shell">
        <SectionHeading
          eyebrow="Como pensamos"
          title="Quatro compromissos que valem mais que um depoimento."
        />

        <div className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-line bg-line md:mt-16 md:grid-cols-2">
          {principles.map((item, i) => (
            <article
              key={item.title}
              className="bg-ink-050 p-8 md:p-11"
              data-reveal
              style={{ '--reveal-delay': `${i * 80}ms` }}
            >
              <h3 className="display text-xl leading-tight text-paper md:text-2xl">{item.title}</h3>
              <p className="mt-4 text-[15px] leading-relaxed text-muted md:text-base">{item.body}</p>
            </article>
          ))}
        </div>

        {/* TODO: quando houver depoimentos aprovados, substituir ou complementar esta seção */}
      </div>
    </Section>
  );
}
