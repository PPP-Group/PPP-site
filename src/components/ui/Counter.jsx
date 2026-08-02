import { useEffect, useRef } from 'react';
import { useInViewOnce } from '../../hooks/useInViewOnce';
import { useReducedMotion } from '../../hooks/useMediaQuery';

/**
 * Contador que sobe quando entra na tela.
 *
 * O número é escrito direto no nó de texto, sem estado do React — contar até
 * 12.000 não deve custar 12.000 renders. Com movimento reduzido, o valor final
 * aparece de imediato.
 */
export function Counter({ value, suffix = '', duration = 1400, className = '' }) {
  const [wrapRef, inView] = useInViewOnce({ threshold: 0.5 });
  const outRef = useRef(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const el = outRef.current;
    if (!el) return undefined;

    if (reduced || !inView) {
      if (reduced) el.textContent = String(value);
      return undefined;
    }

    let frame;
    const start = performance.now();

    const tick = (now) => {
      const t = Math.min(1, (now - start) / duration);
      // easeOutExpo: chega rápido perto do valor final e assenta com calma.
      const eased = t === 1 ? 1 : 1 - Math.pow(2, -9 * t);
      el.textContent = String(Math.round(value * eased));
      if (t < 1) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, value, duration, reduced]);

  return (
    <span ref={wrapRef} className={className}>
      {/* O valor real fica no aria-label: leitores de tela não devem ouvir a contagem. */}
      <span aria-label={`${value}${suffix}`}>
        <span ref={outRef} aria-hidden="true">
          {reduced ? value : 0}
        </span>
        <span aria-hidden="true">{suffix}</span>
      </span>
    </span>
  );
}
