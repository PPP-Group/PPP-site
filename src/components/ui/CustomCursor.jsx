import { useEffect, useRef, useState } from 'react';
import { useFinePointer, useReducedMotion } from '../../hooks/useMediaQuery';

/**
 * Cursor customizado.
 *
 * Duas peças: um ponto que acompanha o ponteiro exatamente e um anel que chega
 * com atraso. Sobre qualquer elemento com `data-cursor`, o anel cresce e assume
 * o rótulo declarado em `data-cursor-label` — sobre um card de portfólio ele
 * literalmente vira "ver projeto".
 *
 * Só entra em ponteiro fino e sem preferência por movimento reduzido. Em toque
 * ou reduced-motion o cursor do sistema continua sendo o cursor.
 */
export function CustomCursor() {
  const fine = useFinePointer();
  const reduced = useReducedMotion();
  const enabled = fine && !reduced;

  const ringRef = useRef(null);
  const dotRef = useRef(null);
  const [label, setLabel] = useState('');
  const [active, setActive] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!enabled) return undefined;

    const root = document.documentElement;
    root.classList.add('has-custom-cursor');

    const target = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const ring = { ...target };
    let frame;

    const onMove = (event) => {
      target.x = event.clientX;
      target.y = event.clientY;
      setVisible(true);

      const hit = event.target?.closest?.('[data-cursor]');
      if (hit) {
        setActive(true);
        setLabel(hit.getAttribute('data-cursor-label') || '');
      } else {
        setActive(false);
        setLabel('');
      }
    };

    const onLeave = () => setVisible(false);

    const loop = () => {
      // Lerp do anel: o atraso é o que dá peso ao movimento.
      ring.x += (target.x - ring.x) * 0.18;
      ring.y += (target.y - ring.y) * 0.18;

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ring.x}px, ${ring.y}px, 0) translate(-50%, -50%)`;
      }
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${target.x}px, ${target.y}px, 0) translate(-50%, -50%)`;
      }
      frame = requestAnimationFrame(loop);
    };

    frame = requestAnimationFrame(loop);
    window.addEventListener('pointermove', onMove, { passive: true });
    document.addEventListener('pointerleave', onLeave);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('pointermove', onMove);
      document.removeEventListener('pointerleave', onLeave);
      root.classList.remove('has-custom-cursor');
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[200]">
      <div
        ref={ringRef}
        className={[
          'fixed left-0 top-0 flex items-center justify-center rounded-full border',
          'transition-[width,height,background-color,border-color,opacity] duration-300',
          'ease-[cubic-bezier(0.16,1,0.3,1)]',
          visible ? 'opacity-100' : 'opacity-0',
          active
            ? 'h-[74px] w-[74px] border-volt/70 bg-volt/10'
            : 'h-8 w-8 border-line-strong bg-transparent',
        ].join(' ')}
      >
        {label && (
          <span className="font-mono text-[9.5px] uppercase tracking-[0.14em] text-volt text-center leading-tight">
            {label}
          </span>
        )}
      </div>
      <div
        ref={dotRef}
        className={[
          'fixed left-0 top-0 h-[5px] w-[5px] rounded-full bg-paper transition-opacity duration-200',
          visible && !active ? 'opacity-100' : 'opacity-0',
        ].join(' ')}
      />
    </div>
  );
}
