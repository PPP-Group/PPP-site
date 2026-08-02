import { useCallback, useEffect, useId, useRef, useState } from 'react';
import { Modal } from '../ui/Modal';
import { ProjectCover } from './ProjectCover';

/** Quanto esperamos o iframe antes de assumir que ele não vai carregar. */
const LOAD_TIMEOUT_MS = 6000;

/**
 * Modal de projeto com preview navegável.
 *
 * ===========================================================================
 * DETECÇÃO DE EMBED BLOQUEADO — leia antes de mexer
 * ===========================================================================
 * Um site que recusa embed (`X-Frame-Options: DENY/SAMEORIGIN` ou
 * `Content-Security-Policy: frame-ancestors`) NÃO dispara `error` no iframe: o
 * navegador dispara `load` normalmente e apenas deixa o frame vazio.
 *
 * O detalhe que costuma ser ignorado: no Chrome, ler
 * `contentWindow.location.href` de um frame bloqueado lança `SecurityError` —
 * exatamente igual a um cross-origin que carregou COM SUCESSO. Os dois casos
 * são indistinguíveis de propósito; conseguir separá-los seria um vazamento de
 * informação entre origens. Verificado contra github.com (`X-Frame-Options:
 * deny`): a leitura lança, e nada no lado do cliente diferencia isso de um
 * embed que deu certo.
 *
 * Conclusão: para URLs de outra origem, **não existe detecção confiável no
 * cliente**. O que este componente faz, então:
 *
 *   1. `liveUrl: null`          -> abre direto no fallback. Determinístico.
 *   2. `embeddable: false`      -> abre direto no fallback, sem nem tentar a
 *                                  requisição. É a PPP declarando o que já
 *                                  sabe sobre o domínio do projeto.
 *   3. Mesma origem             -> detecção REAL: dá para ler o href. Se vier
 *                                  'about:blank', o embed foi recusado.
 *   4. Timeout / `onError`      -> fallback. Cobre rede caída e DNS morto.
 *   5. Outra origem que carregou -> assumimos sucesso, mas marcamos como não
 *                                  verificado e mostramos uma saída manual
 *                                  ("mostrar capa"), porque se o domínio
 *                                  bloquear, o usuário vê um frame vazio e
 *                                  precisa de um caminho para sair dele.
 *
 * A checagem de 'about:blank' continua valendo além da mesma origem: o Firefox
 * deixa frames bloqueados por `frame-ancestors` legíveis nesse estado.
 */
export function ProjectModal({ project, open, onClose }) {
  const titleId = useId();
  const frameRef = useRef(null);
  const timerRef = useRef(null);

  const [status, setStatus] = useState('idle');
  /* Cross-origin que carregou sem que possamos confirmar de fato. */
  const [unverified, setUnverified] = useState(false);

  /* Reinicia o estado a cada abertura: o iframe só é montado com o modal. */
  useEffect(() => {
    if (!open || !project) return undefined;

    setUnverified(false);

    // `embeddable: false` é a PPP declarando que o domínio recusa embed.
    // Poupa uma requisição que já sabemos que vai render um frame vazio.
    if (!project.liveUrl || project.embeddable === false) {
      setStatus(project.liveUrl ? 'blocked' : 'unavailable');
      return undefined;
    }

    setStatus('loading');
    timerRef.current = window.setTimeout(() => {
      setStatus((current) => (current === 'loading' ? 'blocked' : current));
    }, LOAD_TIMEOUT_MS);

    return () => window.clearTimeout(timerRef.current);
  }, [open, project]);

  const handleLoad = useCallback(() => {
    window.clearTimeout(timerRef.current);
    const frame = frameRef.current;
    if (!frame) return;

    try {
      const href = frame.contentWindow?.location?.href;
      // Leitura funcionou: mesma origem, detecção confiável.
      // 'about:blank' = embed recusado (é assim que o Firefox deixa o frame).
      setStatus(!href || href === 'about:blank' ? 'blocked' : 'ready');
    } catch {
      // Leitura bloqueada: outra origem. Pode ter carregado ou pode ter sido
      // recusada — não há como saber daqui. Segue otimista, mas marcado.
      setStatus('ready');
      setUnverified(true);
    }
  }, []);

  const handleError = useCallback(() => {
    window.clearTimeout(timerRef.current);
    setStatus('blocked');
  }, []);

  const showCoverInstead = useCallback(() => setStatus('blocked'), []);

  if (!project) return null;

  const showFrame = status === 'loading' || status === 'ready';

  return (
    <Modal open={open} onClose={onClose} labelledBy={titleId}>
      <header className="flex shrink-0 flex-wrap items-start justify-between gap-4 border-b border-line px-5 py-4 md:px-7 md:py-5">
        <div className="min-w-0">
          <p className="eyebrow flex flex-wrap items-center gap-x-3 gap-y-1">
            <span className="text-volt">{project.category}</span>
            <span aria-hidden="true" className="text-faint">
              ·
            </span>
            <span>{project.year}</span>
          </p>
          <h2 id={titleId} className="display mt-2 text-xl text-paper md:text-2xl">
            {project.title}
          </h2>
          <ul className="mt-3 flex flex-wrap gap-1.5">
            {project.stack.map((tech) => (
              <li
                key={tech}
                className="rounded-full border border-line px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.08em] text-faint"
              >
                {tech}
              </li>
            ))}
          </ul>
        </div>

        <div className="flex shrink-0 items-center gap-2">
          {project.externalUrl && (
            <a
              href={project.externalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-10 items-center gap-2 rounded-full border border-line-strong px-4 font-mono text-[11px] uppercase tracking-[0.1em] text-paper transition-colors hover:border-volt/60"
            >
              Abrir em nova aba
              <svg viewBox="0 0 14 14" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                <path d="M5 2h7v7M12 2 6 8M11 9v3H2V3h3" />
              </svg>
            </a>
          )}
          <button
            type="button"
            onClick={onClose}
            data-autofocus
            className="flex h-10 w-10 items-center justify-center rounded-full border border-line-strong text-paper transition-colors hover:border-volt/60"
          >
            <span className="sr-only">Fechar</span>
            <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
              <path d="M5 5l10 10M15 5L5 15" />
            </svg>
          </button>
        </div>
      </header>

      <div className="grid min-h-0 flex-1 grid-rows-[minmax(0,1fr)_auto] overflow-y-auto lg:grid-cols-[1fr_20rem] lg:grid-rows-1">
        <div className="relative min-h-[42vh] bg-ink-200 lg:min-h-0">
          {showFrame && (
            <iframe
              ref={frameRef}
              src={project.liveUrl}
              title={`Preview navegável — ${project.title}`}
              onLoad={handleLoad}
              onError={handleError}
              loading="lazy"
              sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
              className="h-full w-full border-0 bg-white"
            />
          )}

          {status === 'loading' && (
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-ink-200">
              <p className="eyebrow flex items-center gap-2.5">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-volt" />
                Carregando preview
              </p>
            </div>
          )}

          {/* Saída manual para o caso indetectável: se o domínio recusou o
              embed, o usuário está olhando para um frame vazio e precisa de um
              caminho de volta que não seja fechar o modal. */}
          {status === 'ready' && unverified && (
            <div className="absolute inset-x-0 bottom-0 flex flex-wrap items-center justify-between gap-3 border-t border-line bg-ink-100/95 px-5 py-3 backdrop-blur-sm">
              <p className="font-mono text-[10.5px] uppercase tracking-[0.12em] text-faint">
                Preview vazio? O domínio pode bloquear exibição embutida
              </p>
              <button
                type="button"
                onClick={showCoverInstead}
                className="rounded-full border border-line-strong px-3.5 py-1.5 font-mono text-[10.5px] uppercase tracking-[0.1em] text-paper transition-colors hover:border-volt/60"
              >
                Mostrar capa
              </button>
            </div>
          )}

          {(status === 'blocked' || status === 'unavailable') && (
            <Fallback project={project} reason={status} />
          )}
        </div>

        <aside className="border-t border-line p-5 md:p-7 lg:border-l lg:border-t-0">
          <h3 className="eyebrow">O projeto</h3>
          <p className="mt-4 text-[15px] leading-relaxed text-muted">{project.description}</p>

          <h3 className="eyebrow mt-8">Resultado</h3>
          <dl className="mt-4 space-y-4">
            {project.results.map((result) => (
              <div key={result.label} className="border-t border-line pt-3">
                {/* TODO: substituir pelos números reais aprovados pela PPP */}
                <dt className="font-mono text-[12px] tracking-[0.04em] text-volt">{result.value}</dt>
                <dd className="mt-1 text-[13px] leading-relaxed text-faint">{result.label}</dd>
              </div>
            ))}
          </dl>
        </aside>
      </div>
    </Modal>
  );
}

/** Fallback elegante: a capa do projeto e a razão, nunca um frame quebrado. */
function Fallback({ project, reason }) {
  return (
    <div className="absolute inset-0 flex flex-col">
      <ProjectCover project={project} className="flex-1" />
      <div className="border-t border-line bg-ink-100/95 px-5 py-4 backdrop-blur-sm md:px-7">
        <p className="eyebrow text-muted">
          {reason === 'unavailable' ? 'Sem preview embutido' : 'Preview indisponível'}
        </p>
        <p className="mt-2 max-w-xl text-[13.5px] leading-relaxed text-faint">
          {reason === 'unavailable'
            ? 'Este projeto não tem uma versão web navegável — é um aplicativo ou um ambiente restrito a usuários autenticados.'
            : 'O site de destino não permite ser exibido dentro de outra página. Abra em uma nova aba para navegar por ele.'}
        </p>
      </div>
    </div>
  );
}
