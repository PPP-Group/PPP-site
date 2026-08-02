import { useEffect } from 'react';

/**
 * Primitivas de movimento ligadas a scroll e ponteiro.
 *
 * Todas escrevem em custom properties CSS em vez de estado do React: um
 * `style.setProperty` por frame não dispara render, e a animação fica só em
 * `transform`/`opacity`, sem reflow.
 */

/**
 * Parallax sutil. `amplitude` é o deslocamento máximo em pixels — mantido
 * baixo de propósito: parallax que atrapalha a leitura do texto por cima é
 * efeito, não design.
 */
export function useParallax(ref, { amplitude = 40, disabled = false } = {}) {
  useEffect(() => {
    const el = ref.current;
    if (!el || disabled) return undefined;

    let frame = null;

    const update = () => {
      frame = null;
      const rect = el.getBoundingClientRect();
      const viewport = window.innerHeight || 1;
      // -1 quando o elemento está entrando por baixo, +1 quando já saiu por cima.
      const progress = (rect.top + rect.height / 2 - viewport / 2) / viewport;
      const clamped = Math.max(-1.5, Math.min(1.5, progress));
      el.style.setProperty('--parallax-y', `${(clamped * amplitude).toFixed(2)}px`);
    };

    const schedule = () => {
      if (frame == null) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);

    return () => {
      if (frame != null) cancelAnimationFrame(frame);
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
      el.style.removeProperty('--parallax-y');
    };
  }, [ref, amplitude, disabled]);
}

/**
 * Tilt 3D no ponteiro. Além da rotação, expõe a posição relativa do cursor
 * para o brilho que acompanha a mão sobre o card.
 */
export function useTilt(ref, { max = 7, disabled = false } = {}) {
  useEffect(() => {
    const el = ref.current;
    if (!el || disabled) return undefined;

    let frame = null;
    let pending = null;

    const apply = () => {
      frame = null;
      if (!pending) return;
      const { rx, ry, px, py } = pending;
      el.style.setProperty('--tilt-rx', `${rx.toFixed(2)}deg`);
      el.style.setProperty('--tilt-ry', `${ry.toFixed(2)}deg`);
      el.style.setProperty('--tilt-px', `${px.toFixed(1)}%`);
      el.style.setProperty('--tilt-py', `${py.toFixed(1)}%`);
    };

    const onMove = (event) => {
      const rect = el.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width; // 0..1
      const y = (event.clientY - rect.top) / rect.height;
      pending = {
        ry: (x - 0.5) * 2 * max,
        rx: -(y - 0.5) * 2 * max,
        px: x * 100,
        py: y * 100,
      };
      if (frame == null) frame = requestAnimationFrame(apply);
    };

    const reset = () => {
      if (frame != null) cancelAnimationFrame(frame);
      frame = null;
      pending = null;
      el.style.setProperty('--tilt-rx', '0deg');
      el.style.setProperty('--tilt-ry', '0deg');
      el.style.setProperty('--tilt-px', '50%');
      el.style.setProperty('--tilt-py', '50%');
    };

    el.addEventListener('pointermove', onMove);
    el.addEventListener('pointerleave', reset);
    el.addEventListener('blur', reset, true);

    return () => {
      el.removeEventListener('pointermove', onMove);
      el.removeEventListener('pointerleave', reset);
      el.removeEventListener('blur', reset, true);
      reset();
    };
  }, [ref, max, disabled]);
}

/**
 * Progresso de rolagem do documento em `--scroll-progress` (0 a 1), no <html>.
 * A espinha de workflow que liga as seções lê essa variável — nenhum
 * componente re-renderiza durante a rolagem.
 */
export function useScrollProgressVar() {
  useEffect(() => {
    const root = document.documentElement;
    let frame = null;

    const update = () => {
      frame = null;
      const max = root.scrollHeight - window.innerHeight;
      const progress = max > 0 ? window.scrollY / max : 0;
      root.style.setProperty('--scroll-progress', Math.min(1, Math.max(0, progress)).toFixed(4));
    };

    const schedule = () => {
      if (frame == null) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);

    return () => {
      if (frame != null) cancelAnimationFrame(frame);
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
    };
  }, []);
}
