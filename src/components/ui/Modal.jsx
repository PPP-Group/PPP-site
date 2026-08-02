import { useCallback, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion } from 'motion/react';
import { setScrollLocked } from '../../lib/scroll';
import { useReducedMotion } from '../../hooks/useMediaQuery';

const FOCUSABLE =
  'a[href], button:not([disabled]), textarea, input, select, iframe, [tabindex]:not([tabindex="-1"])';

/**
 * Diálogo modal acessível.
 *
 * Fecha com ESC ou clique no fundo, prende o foco enquanto está aberto,
 * devolve o foco para o elemento que o abriu ao fechar, e para a rolagem da
 * página por trás (inclusive a rolagem suave do Lenis, que ignora
 * `overflow: hidden` no body por conta própria).
 */
export function Modal({ open, onClose, labelledBy, children, size = 'wide' }) {
  const panelRef = useRef(null);
  const restoreRef = useRef(null);
  const reduced = useReducedMotion();

  const handleKeyDown = useCallback(
    (event) => {
      if (event.key === 'Escape') {
        event.stopPropagation();
        onClose();
        return;
      }

      if (event.key !== 'Tab') return;

      const panel = panelRef.current;
      if (!panel) return;

      const items = [...panel.querySelectorAll(FOCUSABLE)].filter(
        (el) => el.offsetParent !== null || el.tagName === 'IFRAME',
      );
      if (items.length === 0) {
        event.preventDefault();
        return;
      }

      const first = items[0];
      const last = items[items.length - 1];
      const active = document.activeElement;

      // Ciclo fechado: Tab no último volta ao primeiro, Shift+Tab no primeiro
      // vai ao último. O foco nunca escapa para a página atrás.
      if (event.shiftKey && (active === first || !panel.contains(active))) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && active === last) {
        event.preventDefault();
        first.focus();
      }
    },
    [onClose],
  );

  /* Foco e trava de rolagem. Depende só de `open`: se dependesse também do
     handler de teclado, qualquer re-render que trocasse a identidade do
     callback re-executaria isto e roubaria o foco de volta no meio da leitura. */
  useEffect(() => {
    if (!open) return undefined;

    restoreRef.current = document.activeElement;
    setScrollLocked(true);

    const focusIn = () => {
      const panel = panelRef.current;
      if (!panel) return false;
      const target = panel.querySelector('[data-autofocus]') || panel.querySelector(FOCUSABLE);
      (target || panel).focus();
      return panel.contains(document.activeElement);
    };

    /* O efeito roda depois do commit, então o painel já está no DOM e dá para
       focar de imediato. O frame extra é só a rede de segurança para o caso de
       a animação de entrada ainda não ter anexado o nó — e não pode ser a via
       principal, porque o ciclo duplo de efeitos do StrictMode cancelaria. */
    let raf = 0;
    if (!focusIn()) raf = requestAnimationFrame(focusIn);

    return () => {
      if (raf) cancelAnimationFrame(raf);
      setScrollLocked(false);
      // Só devolve o foco se quem abriu ainda existir na página.
      const previous = restoreRef.current;
      if (previous?.isConnected) previous.focus();
    };
  }, [open]);

  useEffect(() => {
    if (!open) return undefined;
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [open, handleKeyDown]);

  const duration = reduced ? 0 : 0.32;

  return createPortal(
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[100] flex items-end justify-center sm:items-center">
          <motion.div
            className="absolute inset-0 bg-ink-000/85 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration }}
            onClick={onClose}
            aria-hidden="true"
          />
          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby={labelledBy}
            tabIndex={-1}
            className={[
              'relative flex max-h-[92vh] w-full flex-col overflow-hidden',
              'rounded-t-2xl border border-line-strong bg-ink-100 sm:rounded-2xl',
              size === 'wide' ? 'sm:max-w-6xl' : 'sm:max-w-2xl',
              'sm:mx-6',
            ].join(' ')}
            initial={reduced ? { opacity: 0 } : { opacity: 0, y: 26, scale: 0.985 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reduced ? { opacity: 0 } : { opacity: 0, y: 18, scale: 0.99 }}
            transition={{ duration, ease: [0.16, 1, 0.3, 1] }}
          >
            {children}
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body,
  );
}
