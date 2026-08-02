import { useEffect } from 'react';
import { setScrollInstance, scrollToTarget } from '../lib/scroll';

/**
 * Smooth scroll customizado.
 *
 * Lenis entra por import dinâmico: a página pinta e fica utilizável antes de a
 * lib chegar, e quem pediu menos movimento nunca a baixa. A rolagem nativa
 * continua sendo o fallback em todos os casos.
 */
export function useSmoothScroll(enabled) {
  useEffect(() => {
    if (!enabled) return undefined;

    let lenis;
    let frame;
    let cancelled = false;

    import('lenis')
      .then(({ default: Lenis }) => {
        if (cancelled) return;

        lenis = new Lenis({
          duration: 1.15,
          // Curva com desaceleração longa: dá o "peso" sem atrasar a resposta.
          easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          smoothWheel: true,
          syncTouch: false, // toque nativo continua nativo — é o que o dedo espera
          touchMultiplier: 1.5,
        });

        setScrollInstance(lenis);

        const loop = (time) => {
          lenis.raf(time);
          frame = requestAnimationFrame(loop);
        };
        frame = requestAnimationFrame(loop);
      })
      .catch(() => {
        /* Sem Lenis o site continua rolando nativamente. Nada a fazer. */
      });

    return () => {
      cancelled = true;
      if (frame) cancelAnimationFrame(frame);
      lenis?.destroy();
      setScrollInstance(null);
    };
  }, [enabled]);

  /* Âncoras internas passam pelo mesmo caminho de rolagem, com ou sem Lenis. */
  useEffect(() => {
    const onClick = (event) => {
      const link = event.target.closest?.('a[href^="#"]');
      if (!link) return;

      const id = link.getAttribute('href');
      if (!id || id === '#') return;

      const target = document.querySelector(id);
      if (!target) return;

      event.preventDefault();
      scrollToTarget(target);
      history.replaceState(null, '', id);
    };

    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, []);
}
