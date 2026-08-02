import { useEffect } from 'react';

/**
 * Scroll reveal para o site inteiro com um único IntersectionObserver.
 *
 * Qualquer elemento com `data-reveal` entra com fade + deslocamento ao cruzar
 * o viewport. O estado inicial (invisível) mora no CSS sob `html.reveal-ready`,
 * classe que só é adicionada aqui — se o JS falhar ou o navegador não suportar
 * IntersectionObserver, o conteúdo simplesmente permanece visível.
 *
 * Um MutationObserver acompanha nós inseridos depois (conteúdo de modal,
 * itens expandidos) sem precisar de registro manual em cada componente.
 */
export function useRevealObserver() {
  useEffect(() => {
    const root = document.documentElement;

    if (!('IntersectionObserver' in window)) return;

    root.classList.add('reveal-ready');

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.classList.add('is-revealed');
          io.unobserve(entry.target); // revela uma vez; não re-esconde ao subir
        }
      },
      { rootMargin: '0px 0px -12% 0px', threshold: 0.08 },
    );

    const observeAll = (scope) => {
      scope.querySelectorAll('[data-reveal]:not(.is-revealed)').forEach((el) => io.observe(el));
    };

    observeAll(document);

    const mo = new MutationObserver((records) => {
      for (const record of records) {
        for (const node of record.addedNodes) {
          if (node.nodeType !== 1) continue;
          if (node.matches?.('[data-reveal]')) io.observe(node);
          observeAll(node);
        }
      }
    });
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      mo.disconnect();
      io.disconnect();
      root.classList.remove('reveal-ready');
    };
  }, []);
}

/**
 * Atraso escalonado para listas. Convertido em `--reveal-delay`, consumido
 * pela transição no CSS. Teto em 6 posições para que o último item de uma
 * lista longa não fique esperando visivelmente.
 */
export function stagger(index, step = 70) {
  return { '--reveal-delay': `${Math.min(index, 6) * step}ms` };
}
