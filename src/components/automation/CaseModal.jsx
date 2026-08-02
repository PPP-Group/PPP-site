import { useId } from 'react';
import { Modal } from '../ui/Modal';

/** Detalhe de um mini-case: problema → solução → resultado. */
export function CaseModal({ item, open, onClose }) {
  const titleId = useId();
  if (!item) return null;

  return (
    <Modal open={open} onClose={onClose} labelledBy={titleId} size="narrow">
      <header className="flex shrink-0 items-start justify-between gap-4 border-b border-line px-6 py-5">
        <div>
          <p className="eyebrow text-volt">{item.kicker}</p>
          <h2 id={titleId} className="display mt-2 text-xl text-paper md:text-2xl">
            {item.title}
          </h2>
        </div>
        <button
          type="button"
          onClick={onClose}
          data-autofocus
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-line-strong text-paper transition-colors hover:border-volt/60"
        >
          <span className="sr-only">Fechar</span>
          <svg
            viewBox="0 0 20 20"
            className="h-4 w-4"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            aria-hidden="true"
          >
            <path d="M5 5l10 10M15 5L5 15" />
          </svg>
        </button>
      </header>

      <div className="overflow-y-auto px-6 py-7">
        <section>
          <h3 className="eyebrow">O problema</h3>
          <p className="mt-3 text-[15px] leading-relaxed text-muted">{item.problem}</p>
        </section>

        <section className="mt-8">
          <h3 className="eyebrow">A solução</h3>
          <p className="mt-3 text-[15px] leading-relaxed text-muted">{item.solution}</p>
        </section>

        <section className="mt-8">
          <h3 className="eyebrow">O resultado</h3>
          <dl className="mt-4 grid gap-4 sm:grid-cols-2">
            {item.result.map((r) => (
              <div key={r.label} className="border-t border-line pt-3">
                {/* TODO: substituir pelos números reais aprovados pela PPP */}
                <dt className="font-mono text-[12px] tracking-[0.04em] text-volt">{r.value}</dt>
                <dd className="mt-1 text-[13px] leading-relaxed text-faint">{r.label}</dd>
              </div>
            ))}
          </dl>
        </section>
      </div>
    </Modal>
  );
}
