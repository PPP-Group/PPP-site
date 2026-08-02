import { lazy, Suspense, useState } from 'react';
import { Section, SectionHeading } from '../ui/Section';
import { TiltCard } from '../ui/TiltCard';
import { ProjectCover } from '../portfolio/ProjectCover';
import { projects } from '../../data/portfolio';

/* O modal — e com ele a biblioteca de animação — só é baixado quando alguém
   abre um projeto. Nenhum visitante paga por isso só para ler a página. */
const ProjectModal = lazy(() =>
  import('../portfolio/ProjectModal').then((m) => ({ default: m.ProjectModal })),
);

/**
 * Portfólio de sites e plataformas.
 *
 * O primeiro card ocupa duas colunas: a grade quebra de propósito, e o projeto
 * de destaque ganha o peso visual que uma grade uniforme apagaria. Cada card
 * abre um modal com o site rodando dentro — o iframe só é montado quando o
 * modal abre, então nenhum preview é baixado antes de alguém pedir.
 */
export function Portfolio() {
  const [activeId, setActiveId] = useState(null);
  const active = projects.find((p) => p.id === activeId) || null;

  return (
    <Section id="portfolio" label="portfólio">
      <div className="shell">
        <SectionHeading
          eyebrow="Portfólio"
          title="Sites, plataformas e apps que a operação usa todo dia."
          lead="Abra um projeto para navegar por ele aqui dentro."
        />

        {/* TODO: substituir os seis projetos de exemplo pelos cases reais da PPP */}
        <p className="mt-6 inline-flex items-center gap-2.5 rounded-full border border-line-strong px-4 py-2 font-mono text-[10.5px] uppercase tracking-[0.12em] text-faint" data-reveal>
          <span aria-hidden="true" className="h-1.5 w-1.5 rotate-45 bg-flare" />
          Projetos de exemplo — substituir pelos cases definitivos
        </p>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {projects.map((project, i) => (
            <TiltCard
              key={project.id}
              className={[
                'relative',
                i === 0 ? 'lg:col-span-2' : '',
              ].join(' ')}
              data-reveal="scale"
              style={{ '--reveal-delay': `${Math.min(i, 4) * 80}ms` }}
            >
              <button
                type="button"
                onClick={() => setActiveId(project.id)}
                className="group flex h-full w-full flex-col overflow-hidden rounded-xl border border-line bg-ink-100 text-left transition-colors duration-500 hover:border-line-strong"
                data-cursor
                data-cursor-label="ver projeto"
              >
                <ProjectCover
                  project={project}
                  className={i === 0 ? 'aspect-[16/8]' : 'aspect-[16/10]'}
                />

                <span className="flex flex-1 flex-col p-6">
                  <span className="eyebrow flex items-center justify-between gap-3">
                    <span>{project.category}</span>
                    <span className="text-faint">{project.year}</span>
                  </span>

                  <span className="display mt-3.5 block text-xl leading-tight text-paper md:text-2xl">
                    {project.title}
                  </span>

                  <span className="mt-3 block text-[14.5px] leading-relaxed text-muted">
                    {project.summary}
                  </span>

                  <span className="mt-5 flex flex-wrap gap-1.5 pt-4">
                    {project.stack.map((tech) => (
                      <span
                        key={tech}
                        className="rounded-full border border-line px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.08em] text-faint"
                      >
                        {tech}
                      </span>
                    ))}
                  </span>
                </span>
              </button>
            </TiltCard>
          ))}
        </div>
      </div>

      {active && (
        <Suspense fallback={null}>
          <ProjectModal project={active} open onClose={() => setActiveId(null)} />
        </Suspense>
      )}
    </Section>
  );
}
