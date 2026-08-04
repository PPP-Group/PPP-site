import { useRef } from 'react';
import { WorkflowGraph } from '../graph/WorkflowGraph';
import { Laptop3D } from '../hero/Laptop3D';
import { Button, ArrowRight } from '../ui/Button';
import { Counter } from '../ui/Counter';
import { manifesto, metrics } from '../../data/site';
import { heroFlow } from '../../data/automations';
import { useParallax } from '../../hooks/useMotionPrimitives';
import { useReducedMotion } from '../../hooks/useMediaQuery';

/**
 * Hero.
 *
 * A tese da página: o site não descreve automação, ele executa uma. O título
 * ocupa a esquerda em três linhas; o parágrafo e os CTAs são empurrados para a
 * direita, criando a assimetria. Abaixo, o grafo atravessa a tela inteira,
 * sangrando pelas bordas — você está vendo um pedaço de um canvas maior.
 */
export function Hero() {
  const gridRef = useRef(null);
  const reduced = useReducedMotion();

  useParallax(gridRef, { amplitude: 46, disabled: reduced });

  return (
    <section id="topo" data-spine-node="topo" data-spine-label="início" className="relative overflow-hidden pt-[var(--header-h)]">
      {/* Malha de canvas ao fundo, em parallax lento. */}
      <div
        ref={gridRef}
        aria-hidden="true"
        className="parallax canvas-grid pointer-events-none absolute inset-x-0 -top-24 h-[130%] opacity-70"
      />
      {/* Vinheta: escurece as bordas para o texto nunca competir com a malha. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_80%_at_50%_0%,transparent_35%,var(--color-ink-000)_100%)]"
      />

      <div className="shell relative pt-16 md:pt-24 lg:pt-28">
        <p className="eyebrow flex items-center gap-2.5" data-reveal>
          <span className="relative flex h-1.5 w-1.5">
            {!reduced && (
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-ok opacity-60" />
            )}
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-ok" />
          </span>
          Execução ao vivo · fluxo de captação
        </p>

        {/*
          O parágrafo e os CTAs viviam na coluna da direita, empurrados para
          baixo — era a assimetria possível quando não havia nada ali. Com o
          notebook ocupando a direita, o contrapeso passou a ser ele, e o texto
          volta para debaixo do título, que é onde se lê naturalmente.
        */}
        <div className="mt-8 grid gap-x-12 gap-y-14 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-7">
            <h1 className="display display-xl text-paper" data-reveal>
              {manifesto.lines.map((line, i) => (
                <span key={line} className="block" style={{ '--reveal-delay': `${i * 90}ms` }}>
                  {line}
                </span>
              ))}
            </h1>

            <p
              className="mt-8 max-w-xl text-lg leading-relaxed text-muted md:text-xl"
              data-reveal
            >
              {manifesto.body}
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-3" data-reveal>
              <Button as="a" href="#contato" variant="primary" size="lg" data-cursor>
                Falar com a equipe
                <ArrowRight />
              </Button>
              <Button as="a" href="#portfolio" variant="ghost" size="lg" data-cursor>
                Ver portfólio
              </Button>
            </div>
          </div>

          {/* O reveal fica num wrapper: aplicar transform no elemento que
              carrega o `perspective` mudaria o contexto 3D do notebook. */}
          <div
            className="hidden lg:col-span-5 lg:block xl:-mr-6 2xl:-mr-16"
            data-reveal="scale"
          >
            <Laptop3D />
          </div>
        </div>
      </div>

      {/* O grafo sangra além do container: canvas contínuo, não ilustração emoldurada. */}
      <div className="relative mt-16 md:mt-24" data-reveal="scale">
        <div className="bleed overflow-hidden">
          <div className="mx-auto w-[min(1150px,110%)] px-4 md:px-0 [mask-image:linear-gradient(90deg,transparent,#000_7%,#000_93%,transparent)]">
            <WorkflowGraph
              flow={heroFlow}
              autoPlay
              loop
              description="Fluxo de captação em execução: um lead chega pelo webhook, é qualificado por IA, recebe uma ligação da Voice AI, tem o agendamento confirmado e vira um negócio no CRM."
            />
          </div>
        </div>
      </div>

      {/* Métricas. Os números são ilustrativos — a nota de rodapé diz isso na cara. */}
      <div className="shell relative mt-20 md:mt-28">
        <dl className="grid grid-cols-2 border-t border-line md:grid-cols-4">
          {metrics.map((metric, i) => (
            <div
              key={metric.label}
              className="border-b border-line px-1 py-7 md:border-b-0 md:border-r md:px-6 md:py-8 md:first:pl-0 md:last:border-r-0"
              data-reveal
              style={{ '--reveal-delay': `${i * 80}ms` }}
            >
              <dt className="sr-only">{metric.label}</dt>
              <dd>
                <span className="display block text-4xl text-paper md:text-5xl" style={{ fontStretch: '105%' }}>
                  <Counter value={metric.value} suffix={metric.suffix} />
                </span>
                <span className="mt-2.5 block font-mono text-[11px] uppercase leading-relaxed tracking-[0.12em] text-faint">
                  {metric.label}
                </span>
              </dd>
            </div>
          ))}
        </dl>
        <p className="mt-4 font-mono text-[10.5px] uppercase tracking-[0.12em] text-faint">
          {/* TODO: substituir por métricas reais aprovadas pela PPP e remover esta nota */}
        </p>
      </div>
    </section>
  );
}
