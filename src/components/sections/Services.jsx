import { useId, useState } from 'react';
import { Section, SectionHeading } from '../ui/Section';
import { services, supportServices } from '../../data/services';
import { painPoints } from '../../data/site';

/**
 * Serviços — os quatro pilares.
 *
 * Não é uma grade de quatro cards: é uma lista de linhas largas que abrem no
 * lugar. A entrada da seção é o roteiro dor → solução, porque o visitante
 * reconhece o próprio problema antes de reconhecer o nome da ferramenta —
 * clicar numa dor abre exatamente o pilar que a resolve.
 */
export function Services() {
  const [openId, setOpenId] = useState(services[0].id);

  return (
    <Section id="servicos" label="serviços">
      <div className="shell">
        <SectionHeading
          eyebrow="Serviços"
          title="Quatro frentes. Uma operação só."
          lead="Comece pelo problema que você reconhece — cada um leva direto à frente que resolve."
        />

        {/* Roteiro dor -> solução */}
        <ul className="mt-14 grid gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-2">
          {painPoints.map((item, i) => (
            <li key={item.service} data-reveal style={{ '--reveal-delay': `${i * 70}ms` }}>
              <button
                type="button"
                onClick={() => setOpenId(item.service)}
                className="group flex h-full w-full flex-col items-start gap-2 bg-ink-050 p-6 text-left transition-colors hover:bg-ink-200"
                data-cursor
                data-cursor-label="abrir"
              >
                <span className="text-base leading-snug text-paper md:text-lg">
                  “{item.pain}?”
                </span>
                <span className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.1em] text-faint transition-colors group-hover:text-volt">
                  <span aria-hidden="true">→</span>
                  {item.fix}
                </span>
              </button>
            </li>
          ))}
        </ul>

        {/* Os quatro pilares */}
        <div className="mt-20 border-t border-line md:mt-24">
          {services.map((service) => (
            <ServiceRow
              key={service.id}
              service={service}
              open={openId === service.id}
              onToggle={() => setOpenId((current) => (current === service.id ? null : service.id))}
            />
          ))}
        </div>

        {/* Frentes complementares */}
        <div className="mt-20 md:mt-24">
          <p className="eyebrow mb-8" data-reveal>
            Também faz parte
          </p>
          <div className="grid gap-8 md:grid-cols-3">
            {supportServices.map((item, i) => (
              <div
                key={item.title}
                className="border-t border-line pt-6"
                data-reveal
                style={{ '--reveal-delay': `${i * 80}ms` }}
              >
                <h3 className="display text-lg text-paper">{item.title}</h3>
                <p className="mt-3 text-[15px] leading-relaxed text-muted">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}

function ServiceRow({ service, open, onToggle }) {
  const panelId = useId();
  const buttonId = useId();

  return (
    <article className="border-b border-line" data-reveal>
      <h3>
        <button
          id={buttonId}
          type="button"
          onClick={onToggle}
          aria-expanded={open}
          aria-controls={panelId}
          className="group grid w-full grid-cols-[auto_1fr_auto] items-start gap-x-5 py-8 text-left md:grid-cols-[7rem_1fr_auto] md:gap-x-10 md:py-10"
          data-cursor
          data-cursor-label={open ? 'fechar' : 'abrir'}
        >
          <span
            className={`font-mono text-[11px] uppercase tracking-[0.16em] transition-colors md:pt-2 ${
              open ? 'text-volt' : 'text-faint group-hover:text-muted'
            }`}
          >
            {service.index}
          </span>

          <span className="min-w-0">
            <span className="display block text-2xl leading-tight text-paper transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1 md:text-4xl">
              {service.title}
            </span>
            <span className="mt-2 block font-mono text-[11.5px] uppercase tracking-[0.12em] text-faint">
              {service.subtitle}
            </span>
            <span className="mt-4 block max-w-2xl text-[15px] leading-relaxed text-muted md:text-base">
              {service.lead}
            </span>
          </span>

          <span
            aria-hidden="true"
            className={`mt-1.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border transition-all duration-400 md:mt-2 ${
              open ? 'rotate-45 border-volt text-volt' : 'border-line-strong text-muted group-hover:border-muted'
            }`}
          >
            <svg viewBox="0 0 14 14" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M7 1v12M1 7h12" />
            </svg>
          </span>
        </button>
      </h3>

      {/* Expansão em CSS puro: a grade anima de 0fr para 1fr, que é a única
          forma de transicionar "altura automática" sem medir nada em JS —
          e sem carregar uma biblioteca de animação só por causa disto. */}
      <div
        id={panelId}
        role="region"
        aria-labelledby={buttonId}
        className="accordion-panel"
        data-open={open ? 'true' : 'false'}
        /* `inert` tira o painel fechado da ordem de tabulação e do leitor de
           tela sem `display: none`, que impediria a transição de altura.
           String vazia em vez de booleano por causa do React 18. */
        inert={open ? undefined : ''}
      >
        <div className="min-h-0 overflow-hidden">
          <div className="grid gap-10 pb-12 md:grid-cols-[7rem_1fr] md:gap-x-10">
            <div className="hidden md:block">
              <SignatureNodes ids={service.signature} />
            </div>
            <ul className="grid gap-x-10 gap-y-3.5 sm:grid-cols-2">
              {service.capabilities.map((capability) => (
                <li key={capability} className="flex gap-3 text-[15px] leading-relaxed text-muted">
                  <span
                    aria-hidden="true"
                    className="mt-2 h-1 w-1 shrink-0 rotate-45 bg-line-strong"
                  />
                  {capability}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </article>
  );
}

/** Miniatura de fluxo: os nós característicos do serviço, empilhados. */
function SignatureNodes({ ids }) {
  return (
    <ul className="flex flex-col gap-0" aria-hidden="true">
      {ids.map((id, i) => (
        <li key={id} className="flex flex-col">
          <span className="inline-flex w-fit rounded-md border border-line-strong bg-ink-200 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.08em] text-faint">
            {id}
          </span>
          {i < ids.length - 1 && <span className="ml-3 h-4 w-px bg-line-strong" />}
        </li>
      ))}
    </ul>
  );
}
