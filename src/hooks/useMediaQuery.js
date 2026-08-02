import { useEffect, useState } from 'react';

/**
 * Media query reativa. Retorna `false` no primeiro render (inclusive em SSR)
 * e sincroniza no efeito, para que nenhum componente tente ler window cedo.
 */
export function useMediaQuery(query) {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia(query);
    const onChange = () => setMatches(mql.matches);
    onChange();
    mql.addEventListener('change', onChange);
    return () => mql.removeEventListener('change', onChange);
  }, [query]);

  return matches;
}

/** Verdadeiro quando o usuário pediu menos movimento no sistema. */
export function useReducedMotion() {
  return useMediaQuery('(prefers-reduced-motion: reduce)');
}

/** Verdadeiro em ponteiro fino (mouse/trackpad) — não em toque. */
export function useFinePointer() {
  return useMediaQuery('(pointer: fine)');
}

/** Verdadeiro a partir do breakpoint de desktop usado no layout. */
export function useIsDesktop() {
  return useMediaQuery('(min-width: 1024px)');
}
