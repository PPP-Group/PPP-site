import { useEffect, useRef, useState } from 'react';

/**
 * Dispara uma vez quando o elemento entra no viewport.
 *
 * Usado por coisas que precisam *começar* no momento certo, não só aparecer:
 * contadores animados e a execução automática do grafo de automação.
 */
export function useInViewOnce({ threshold = 0.35, rootMargin = '0px 0px -10% 0px' } = {}) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;

    // Sem IntersectionObserver, considera visível para não bloquear conteúdo.
    if (!('IntersectionObserver' in window)) {
      setInView(true);
      return undefined;
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { threshold, rootMargin },
    );

    io.observe(el);
    return () => io.disconnect();
  }, [threshold, rootMargin]);

  return [ref, inView];
}
