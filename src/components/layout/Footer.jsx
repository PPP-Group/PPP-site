import { Logo } from './Logo';
import { brand, contact, navigation } from '../../data/site';

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line bg-ink-050">
      <div className="shell py-16 md:py-20">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <Logo className="text-paper" />
            <p className="mt-5 max-w-sm text-[14.5px] leading-relaxed text-muted">{brand.short}</p>
          </div>

          <nav aria-label="Navegação do rodapé" className="md:col-span-3">
            <h2 className="eyebrow">Seções</h2>
            <ul className="mt-4 space-y-1">
              {[...navigation, { label: 'Contato', href: '#contato' }].map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="inline-block py-1.5 text-[14.5px] text-muted transition-colors hover:text-paper"
                    data-cursor
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="md:col-span-4">
            <h2 className="eyebrow">Contato</h2>
            {/* TODO: preencher os canais reais em src/data/site.js — sem href, viram texto */}
            <ul className="mt-5 space-y-2.5">
              <li className="text-[14.5px] text-muted">{contact.email}</li>
              <li className="text-[14.5px] text-muted">{contact.whatsapp}</li>
            </ul>

            <ul className="mt-7 flex flex-wrap gap-2">
              {contact.socials.map((social) =>
                social.href ? (
                  <li key={social.label}>
                    <a
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex rounded-full border border-line-strong px-3.5 py-1.5 font-mono text-[10.5px] uppercase tracking-[0.1em] text-muted transition-colors hover:border-volt/60 hover:text-paper"
                      data-cursor
                    >
                      {social.label}
                    </a>
                  </li>
                ) : (
                  <li
                    key={social.label}
                    className="inline-flex rounded-full border border-line px-3.5 py-1.5 font-mono text-[10.5px] uppercase tracking-[0.1em] text-faint"
                    title={`${social.label} — link a definir`}
                  >
                    {social.label}
                  </li>
                ),
              )}
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-3 border-t border-line pt-7 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-mono text-[10.5px] uppercase tracking-[0.12em] text-faint">
            © {year} {brand.name} · {brand.tagline}
          </p>
          <a
            href="#topo"
            className="group inline-flex w-fit items-center gap-2 py-1.5 font-mono text-[10.5px] uppercase tracking-[0.12em] text-faint transition-colors hover:text-paper"
            data-cursor
          >
            Voltar ao topo
            <span aria-hidden="true" className="transition-transform duration-300 group-hover:-translate-y-0.5">
              ↑
            </span>
          </a>
        </div>
      </div>
    </footer>
  );
}
