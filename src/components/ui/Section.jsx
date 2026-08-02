/**
 * Casca de seção.
 *
 * Cada seção é também um nó da espinha de workflow que percorre a página:
 * `data-spine-node` e `data-spine-label` são lidos pelo componente WorkflowSpine
 * para desenhar e rotular o ponto correspondente no trilho lateral.
 */
export function Section({
  id,
  label,
  tone = 'base',
  className = '',
  children,
  ...rest
}) {
  return (
    <section
      id={id}
      data-spine-node={id}
      data-spine-label={label}
      aria-label={label}
      className={[
        'relative scroll-mt-24',
        tone === 'raised' ? 'bg-ink-050' : 'bg-ink-000',
        'py-24 md:py-32 lg:py-40',
        className,
      ].join(' ')}
      {...rest}
    >
      {children}
    </section>
  );
}

/**
 * Cabeçalho de seção. O eyebrow em mono é o vernáculo do assunto — o mesmo
 * registro dos rótulos de nó e das linhas de log.
 */
export function SectionHeading({ eyebrow, title, lead, align = 'left', className = '' }) {
  return (
    <header
      className={[
        'max-w-3xl',
        align === 'center' ? 'mx-auto text-center' : '',
        className,
      ].join(' ')}
    >
      {eyebrow && (
        <p className="eyebrow mb-5 flex items-center gap-2.5" data-reveal>
          <span className="inline-block h-px w-8 bg-line-strong" aria-hidden="true" />
          {eyebrow}
        </p>
      )}
      <h2 className="display display-lg text-paper" data-reveal>
        {title}
      </h2>
      {lead && (
        <p className="mt-6 text-lg leading-relaxed text-muted md:text-xl" data-reveal>
          {lead}
        </p>
      )}
    </header>
  );
}
