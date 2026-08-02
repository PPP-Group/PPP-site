import { useRef } from 'react';
import { Button, ArrowRight } from '../ui/Button';
import { contact } from '../../data/site';
import { useParallax } from '../../hooks/useMotionPrimitives';
import { useReducedMotion } from '../../hooks/useMediaQuery';

/**
 * CTA final.
 *
 * O único lugar do site inteiro onde o magenta aparece. Ele foi guardado por
 * nove seções exatamente para que aqui signifique "é aqui que se decide".
 */
export function FinalCta() {
  const glowRef = useRef(null);
  const reduced = useReducedMotion();

  useParallax(glowRef, { amplitude: 36, disabled: reduced });

  return (
    <section
      id="contato"
      data-spine-node="contato"
      data-spine-label="contato"
      aria-label="Fale com a PPP"
      className="relative overflow-hidden border-t border-line py-28 md:py-40"
    >
      <div
        ref={glowRef}
        aria-hidden="true"
        className="parallax pointer-events-none absolute -top-40 left-1/2 h-[520px] w-[900px] max-w-[130vw] -translate-x-1/2 opacity-[0.16] blur-[80px]"
        style={{ background: 'var(--current-flare)' }}
      />
      <div aria-hidden="true" className="canvas-grid pointer-events-none absolute inset-0 opacity-40" />

      <div className="shell relative">
        <div className="max-w-4xl">
          <p className="eyebrow" data-reveal>
            Próximo passo
          </p>
          <h2 className="display display-xl mt-6 text-paper" data-reveal>
            Conta o processo.
            <br />
            A gente devolve o mapa.
          </h2>
          <p className="mt-8 max-w-2xl text-lg leading-relaxed text-muted md:text-xl" data-reveal>
            O primeiro encontro é um diagnóstico: onde o lead entra, quem responde, o que ainda é
            feito à mão. Você sai com o desenho da automação — mesmo que decida construir sozinho.
          </p>

          <div className="mt-11 flex flex-wrap items-center gap-3" data-reveal>
            <Button
              as="a"
              href={contact.emailHref || '#contato'}
              variant="flare"
              size="lg"
              data-cursor
            >
              Agendar diagnóstico
              <ArrowRight />
            </Button>
            <Button as="a" href="#portfolio" variant="ghost" size="lg" data-cursor>
              Ver portfólio
            </Button>
          </div>

          {/* TODO: preencher os canais reais em src/data/site.js */}
          <dl className="mt-16 grid gap-x-10 gap-y-6 border-t border-line pt-8 sm:grid-cols-3" data-reveal>
            <div>
              <dt className="eyebrow">E-mail</dt>
              <dd className="mt-2 text-[15px] text-paper">{contact.email}</dd>
            </div>
            <div>
              <dt className="eyebrow">WhatsApp</dt>
              <dd className="mt-2 text-[15px] text-paper">{contact.whatsapp}</dd>
            </div>
            <div>
              <dt className="eyebrow">Atendimento</dt>
              <dd className="mt-2 text-[15px] text-paper">{contact.location}</dd>
            </div>
          </dl>
        </div>
      </div>
    </section>
  );
}
