/**
 * Ponte entre o smooth scroll customizado e o resto do app.
 *
 * O restante do código nunca importa Lenis diretamente: chama `scrollToTarget`
 * e recebe rolagem suave quando a lib está ativa, ou o comportamento nativo
 * quando não está (reduced motion, falha de carregamento, mobile sem suporte).
 */

let instance = null;

export function setScrollInstance(next) {
  instance = next;
}

export function getScrollInstance() {
  return instance;
}

/** Altura do header fixo, para o alvo não ficar escondido atrás dele. */
function headerOffset() {
  const raw = getComputedStyle(document.documentElement).getPropertyValue('--header-h');
  return (parseInt(raw, 10) || 72) + 12;
}

/**
 * Rola até um elemento ou seletor. Move o foco para o alvo depois da rolagem
 * para que a navegação por teclado continue de onde o olho parou.
 */
export function scrollToTarget(target, { focus = true } = {}) {
  const el = typeof target === 'string' ? document.querySelector(target) : target;
  if (!el) return;

  const offset = -headerOffset();

  if (instance) {
    instance.scrollTo(el, { offset, duration: 1.15 });
  } else {
    const top = el.getBoundingClientRect().top + window.scrollY + offset;
    window.scrollTo({ top, behavior: prefersReducedMotion() ? 'auto' : 'smooth' });
  }

  if (focus) {
    // Torna a seção focável só o tempo suficiente para receber o foco, sem
    // deixar um tabstop permanente no documento.
    const hadTabIndex = el.hasAttribute('tabindex');
    if (!hadTabIndex) el.setAttribute('tabindex', '-1');
    el.focus({ preventScroll: true });
    if (!hadTabIndex) {
      el.addEventListener('blur', () => el.removeAttribute('tabindex'), { once: true });
    }
  }
}

export function prefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/** Para/retoma a rolagem da página enquanto um modal está aberto. */
export function setScrollLocked(locked) {
  if (instance) {
    locked ? instance.stop() : instance.start();
  }
  document.body.style.overflow = locked ? 'hidden' : '';
}
