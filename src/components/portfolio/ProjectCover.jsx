import { useState } from 'react';

/**
 * Capa de projeto.
 *
 * Duas camadas: uma abstração em SVG desenhada a partir do *tipo* de projeto e,
 * por cima, a imagem real quando ela existe em /public/portfolio. Se o arquivo
 * ainda não foi colocado lá, o `onError` esconde a imagem e a abstração fica —
 * nunca aparece ícone de imagem quebrada, e o card continua parecendo
 * intencional enquanto a PPP não sobe os prints definitivos.
 */

const ACCENT = {
  pulse: 'var(--color-pulse)',
  volt: 'var(--color-volt)',
  flare: 'var(--color-flare)',
};

export function ProjectCover({ project, className = '' }) {
  const [imageFailed, setImageFailed] = useState(false);
  const accent = ACCENT[project.accent] || ACCENT.pulse;

  return (
    <div className={`relative overflow-hidden bg-ink-200 ${className}`}>
      <Wireframe category={project.category} accent={accent} />

      {project.cover && !imageFailed && (
        <img
          src={project.cover}
          alt=""
          loading="lazy"
          decoding="async"
          onError={() => setImageFailed(true)}
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
        />
      )}

      {/* Escurece a base para o texto sobreposto manter contraste em qualquer capa. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-t from-ink-000/75 via-transparent to-transparent"
      />
    </div>
  );
}

/** Abstração do tipo de projeto — o suficiente para o olho classificar em 1s. */
function Wireframe({ category, accent }) {
  const line = 'var(--color-line-strong)';
  const fill = 'var(--color-ink-100)';

  const shapes = {
    'App mobile': (
      <>
        <rect x="158" y="26" width="84" height="208" rx="14" fill={fill} stroke={line} />
        <rect x="170" y="46" width="60" height="9" rx="4.5" fill={line} />
        <rect x="170" y="68" width="60" height="34" rx="6" fill={accent} opacity="0.5" />
        <rect x="170" y="112" width="60" height="14" rx="4" fill={line} />
        <rect x="170" y="134" width="60" height="14" rx="4" fill={line} />
        <rect x="170" y="156" width="42" height="14" rx="4" fill={line} />
        <rect x="170" y="200" width="60" height="18" rx="9" fill={accent} opacity="0.75" />
      </>
    ),
    'Site institucional': (
      <>
        <rect x="30" y="26" width="340" height="20" rx="5" fill={fill} stroke={line} />
        <rect x="42" y="33" width="34" height="6" rx="3" fill={accent} opacity="0.8" />
        <rect x="30" y="58" width="206" height="72" rx="7" fill={fill} stroke={line} />
        <rect x="46" y="76" width="132" height="11" rx="5" fill={line} />
        <rect x="46" y="95" width="98" height="8" rx="4" fill={line} opacity="0.6" />
        <rect x="46" y="110" width="52" height="12" rx="6" fill={accent} opacity="0.7" />
        <rect x="248" y="58" width="122" height="72" rx="7" fill={fill} stroke={line} />
        {[30, 146, 262].map((x) => (
          <rect key={x} x={x} y="146" width="108" height="72" rx="7" fill={fill} stroke={line} />
        ))}
      </>
    ),
    'Landing page': (
      <>
        <rect x="86" y="24" width="228" height="212" rx="8" fill={fill} stroke={line} />
        <rect x="106" y="52" width="150" height="13" rx="6" fill={line} />
        <rect x="106" y="74" width="188" height="9" rx="4" fill={line} opacity="0.55" />
        <rect x="106" y="90" width="140" height="9" rx="4" fill={line} opacity="0.55" />
        <rect x="106" y="116" width="82" height="20" rx="10" fill={accent} opacity="0.8" />
        <rect x="106" y="156" width="188" height="58" rx="7" fill="var(--color-ink-200)" stroke={line} />
      </>
    ),
    'Plataforma de conteúdo': (
      <>
        <rect x="30" y="26" width="340" height="208" rx="8" fill={fill} stroke={line} />
        <rect x="30" y="26" width="340" height="26" rx="8" fill="var(--color-ink-200)" />
        {[0, 1, 2].map((r) =>
          [0, 1, 2].map((c) => (
            <rect
              key={`${r}-${c}`}
              x={48 + c * 106}
              y={70 + r * 54}
              width="90"
              height="40"
              rx="5"
              fill="var(--color-ink-200)"
              stroke={line}
            />
          )),
        )}
        <rect x="48" y="70" width="90" height="40" rx="5" fill={accent} opacity="0.35" />
      </>
    ),
  };

  /* SaaS e dashboard compartilham a mesma leitura: barra lateral + painéis. */
  const dashboard = (
    <>
      <rect x="30" y="26" width="340" height="208" rx="8" fill={fill} stroke={line} />
      <rect x="30" y="26" width="66" height="208" rx="8" fill="var(--color-ink-200)" />
      {[46, 66, 86, 106].map((y, i) => (
        <rect key={y} x="44" y={y} width="38" height="7" rx="3.5" fill={i === 0 ? accent : line} opacity={i === 0 ? 0.9 : 0.7} />
      ))}
      <rect x="112" y="46" width="112" height="46" rx="6" fill="var(--color-ink-200)" stroke={line} />
      <rect x="238" y="46" width="118" height="46" rx="6" fill="var(--color-ink-200)" stroke={line} />
      <rect x="112" y="106" width="244" height="112" rx="6" fill="var(--color-ink-200)" stroke={line} />
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <rect
          key={i}
          x={130 + i * 38}
          y={196 - [34, 58, 42, 76, 60, 88][i]}
          width="20"
          height={[34, 58, 42, 76, 60, 88][i]}
          rx="3"
          fill={accent}
          opacity={0.3 + i * 0.1}
        />
      ))}
    </>
  );

  return (
    <svg
      viewBox="0 0 400 260"
      className="h-full w-full"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      <rect width="400" height="260" fill="var(--color-ink-200)" />
      <g strokeWidth="1.1">{shapes[category] || dashboard}</g>
    </svg>
  );
}
