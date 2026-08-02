/**
 * Marca da PPP.
 *
 * Três nós ligados por duas arestas — a sigla é lida como um fluxo mínimo,
 * que é exatamente o que a empresa monta. O terceiro nó fica aceso: o fluxo
 * chegou ao fim.
 */
export function Logo({ className = '' }) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <svg
        viewBox="0 0 40 14"
        className="h-3.5 w-10 shrink-0"
        fill="none"
        aria-hidden="true"
        focusable="false"
      >
        <path d="M9 7h8M23 7h8" stroke="currentColor" strokeWidth="1.2" opacity="0.45" />
        <rect x="1" y="3" width="8" height="8" rx="2.4" stroke="currentColor" strokeWidth="1.3" />
        <rect x="15" y="3" width="8" height="8" rx="2.4" stroke="currentColor" strokeWidth="1.3" />
        <rect
          x="29"
          y="3"
          width="8"
          height="8"
          rx="2.4"
          className="fill-volt/15 stroke-volt"
          strokeWidth="1.3"
        />
      </svg>
      <span
        className="display text-[1.35rem] leading-none tracking-[-0.02em]"
        style={{ fontStretch: '118%' }}
      >
        PPP
      </span>
    </span>
  );
}
