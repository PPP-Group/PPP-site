/**
 * Botões do site.
 *
 * `primary` é o único lugar do layout onde a corrente vira preenchimento —
 * fora do CTA final, que ganha a variante `flare`. Manter isso escasso é o que
 * faz o acento significar alguma coisa.
 */

const base =
  'group relative inline-flex items-center justify-center gap-2.5 rounded-full font-mono text-[12px] ' +
  'uppercase tracking-[0.12em] transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ' +
  'focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-volt';

const sizes = {
  md: 'h-11 px-6',
  lg: 'h-13 px-8 text-[13px]',
};

const variants = {
  primary:
    'bg-paper text-ink-000 hover:-translate-y-0.5 hover:bg-white active:translate-y-0',
  flare:
    'text-white shadow-none hover:-translate-y-0.5 active:translate-y-0 ' +
    '[background:var(--current-flare)] [background-size:160%_100%] hover:[background-position:40%_0]',
  ghost:
    'border border-line-strong text-paper hover:border-volt/60 hover:bg-white/[0.04] hover:-translate-y-0.5',
  quiet: 'text-muted hover:text-paper',
};

export function Button({
  as: Tag = 'button',
  variant = 'primary',
  size = 'md',
  className = '',
  children,
  ...rest
}) {
  return (
    <Tag className={`${base} ${sizes[size]} ${variants[variant]} ${className}`} {...rest}>
      {children}
    </Tag>
  );
}

/** Seta que avança no hover — o único enfeite que sobreviveu à revisão. */
export function ArrowRight({ className = '' }) {
  return (
    <svg
      viewBox="0 0 16 16"
      className={`h-3.5 w-3.5 transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1 ${className}`}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M2 8h12M9 3l5 5-5 5" />
    </svg>
  );
}
