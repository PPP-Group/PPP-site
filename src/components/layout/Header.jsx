import { useEffect, useState } from 'react';
import { Logo } from './Logo';
import { Button, ArrowRight } from '../ui/Button';
import { navigation } from '../../data/site';
import { setScrollLocked } from '../../lib/scroll';

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setScrollLocked(menuOpen);
    return () => setScrollLocked(false);
  }, [menuOpen]);

  useEffect(() => {
    if (!menuOpen) return undefined;
    const onKey = (e) => e.key === 'Escape' && setMenuOpen(false);
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [menuOpen]);

  return (
    <>
      <a
        href="#conteudo"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[300] focus:rounded-full focus:bg-paper focus:px-5 focus:py-2.5 focus:font-mono focus:text-xs focus:uppercase focus:tracking-widest focus:text-ink-000"
      >
        Pular para o conteúdo
      </a>

      <header className="fixed inset-x-0 top-0 z-50 flex h-[var(--header-h)] items-center justify-center">
        <div
          className="nav-pill flex items-center justify-between gap-6"
          data-scrolled={scrolled ? 'true' : 'false'}
        >
          <a
            href="#topo"
            className="-my-2 flex items-center py-2 text-paper transition-opacity hover:opacity-70"
            aria-label="PPP — início"
            data-cursor
          >
            <Logo />
          </a>

          <nav aria-label="Navegação principal" className="hidden items-center gap-8 lg:flex">
            {navigation.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="group relative font-mono text-[11.5px] uppercase tracking-[0.14em] text-muted transition-colors hover:text-paper"
                data-cursor
              >
                {item.label}
                <span className="absolute -bottom-1.5 left-0 h-px w-0 bg-volt transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:w-full" />
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <Button as="a" href="#contato" variant="ghost" className="hidden sm:inline-flex" data-cursor>
              Falar com a equipe
              <ArrowRight />
            </Button>

            <button
              type="button"
              onClick={() => setMenuOpen((v) => !v)}
              aria-expanded={menuOpen}
              aria-controls="menu-mobile"
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-line-strong text-paper lg:hidden"
            >
              <span className="sr-only">{menuOpen ? 'Fechar menu' : 'Abrir menu'}</span>
              <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                {menuOpen ? <path d="M5 5l10 10M15 5L5 15" /> : <path d="M3 7h14M3 13h14" />}
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Menu mobile em CSS. Fica sempre montado e sai do fluxo de foco com
          `inert` quando fechado — trocar isso por montagem condicional custaria
          uma biblioteca de animação inteira no carregamento inicial. */}
      <div
        id="menu-mobile"
        className="mobile-menu fixed inset-0 z-40 bg-ink-000 pt-[var(--header-h)] lg:hidden"
        data-open={menuOpen ? 'true' : 'false'}
        inert={menuOpen ? undefined : ''}
      >
        <div className="shell flex h-full flex-col justify-between py-10">
          <nav aria-label="Navegação principal" className="flex flex-col gap-1">
            {navigation.map((item, i) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className="mobile-menu-item display border-b border-line py-5 text-4xl text-paper"
                style={{ '--item-delay': `${60 + i * 55}ms` }}
              >
                {item.label}
              </a>
            ))}
          </nav>
          <Button
            as="a"
            href="#contato"
            variant="primary"
            size="lg"
            onClick={() => setMenuOpen(false)}
          >
            Falar com a equipe
            <ArrowRight />
          </Button>
        </div>
      </div>
    </>
  );
}
