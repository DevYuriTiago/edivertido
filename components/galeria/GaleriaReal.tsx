"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { useSensorial } from "@/lib/sensorial";
import { rastrear } from "@/lib/analytics";
import { Revelar } from "@/components/ui/Revelar";
import { BotaoWhatsApp } from "@/components/ui/BotaoWhatsApp";
import { FOTOS_GALERIA, FRASE_CONTEXTO_GALERIA } from "@/lib/conteudo/galeria";

// Bloco 5 — editorial, não tátil (CLAUDE.md §6): a honestidade da imagem
// é o argumento, não a interação. Por isso a grade não tem reveal
// escalonado por foto, só a frase de contexto acima dela.
export function GaleriaReal() {
  const [indiceAberto, setIndiceAberto] = useState<number | null>(null);
  const { movimento } = useSensorial();
  const gatilhoRef = useRef<HTMLButtonElement | null>(null);

  const abrir = useCallback((indice: number, gatilho: HTMLButtonElement) => {
    gatilhoRef.current = gatilho;
    setIndiceAberto(indice);
    rastrear("galeria_aberta");
  }, []);

  const fechar = useCallback(() => {
    setIndiceAberto(null);
    gatilhoRef.current?.focus();
  }, []);

  const anterior = useCallback(() => {
    setIndiceAberto((atual) =>
      atual === null
        ? null
        : (atual - 1 + FOTOS_GALERIA.length) % FOTOS_GALERIA.length,
    );
  }, []);

  const proxima = useCallback(() => {
    setIndiceAberto((atual) =>
      atual === null ? null : (atual + 1) % FOTOS_GALERIA.length,
    );
  }, []);

  useEffect(() => {
    if (indiceAberto === null) return;

    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [indiceAberto]);

  return (
    <section
      aria-labelledby="galeria-titulo"
      className="mx-auto flex max-w-5xl flex-col gap-8 px-6 py-16 md:py-20"
    >
      <Revelar className="flex flex-col gap-3">
        <h2 id="galeria-titulo" className="sr-only">
          Galeria real
        </h2>
        <p className="text-h3 max-w-xl">{FRASE_CONTEXTO_GALERIA}</p>
      </Revelar>

      <ul role="list" className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {FOTOS_GALERIA.map((foto, indice) => (
          <li key={foto.arquivo}>
            <button
              type="button"
              onClick={(evento) => abrir(indice, evento.currentTarget)}
              className="relative block aspect-square w-full overflow-hidden rounded-2xl"
            >
              <Image
                src={foto.arquivo}
                alt={foto.alt}
                fill
                sizes="(min-width: 640px) 33vw, 50vw"
                className="object-cover"
              />
            </button>
          </li>
        ))}
      </ul>

      <BotaoWhatsApp
        origem="galeria"
        className="hover-tatil inline-flex min-h-12 w-fit items-center rounded-full bg-ed-orange px-6 text-sm font-bold text-ed-navy shadow-ed"
      >
        Quero saber como vocês cuidam disso
      </BotaoWhatsApp>

      {indiceAberto !== null && (
        <Lightbox
          indice={indiceAberto}
          movimento={movimento}
          aoFechar={fechar}
          aoAnterior={anterior}
          aoProxima={proxima}
        />
      )}
    </section>
  );
}

function Lightbox({
  indice,
  movimento,
  aoFechar,
  aoAnterior,
  aoProxima,
}: {
  indice: number;
  movimento: number;
  aoFechar: () => void;
  aoAnterior: () => void;
  aoProxima: () => void;
}) {
  const foto = FOTOS_GALERIA[indice];
  const fecharRef = useRef<HTMLButtonElement>(null);
  const anteriorRef = useRef<HTMLButtonElement>(null);
  const proximaRef = useRef<HTMLButtonElement>(null);
  // "sem transição de fade longa" mesmo no nível pleno — o teto é 200ms.
  const duracaoMs = Math.max(movimento, 0.1) * 200;

  useEffect(() => {
    fecharRef.current?.focus();
  }, []);

  useEffect(() => {
    function aoTeclado(evento: KeyboardEvent) {
      if (evento.key === "Escape") {
        aoFechar();
      } else if (evento.key === "ArrowRight") {
        aoProxima();
      } else if (evento.key === "ArrowLeft") {
        aoAnterior();
      } else if (evento.key === "Tab") {
        // Prende o foco nos 3 controles do diálogo enquanto está aberto.
        const focaveis = [
          fecharRef.current,
          anteriorRef.current,
          proximaRef.current,
        ].filter((el): el is HTMLButtonElement => el !== null);
        const indiceAtual = focaveis.indexOf(
          document.activeElement as HTMLButtonElement,
        );
        evento.preventDefault();
        const proximoIndice = evento.shiftKey
          ? (indiceAtual - 1 + focaveis.length) % focaveis.length
          : (indiceAtual + 1) % focaveis.length;
        focaveis[proximoIndice]?.focus();
      }
    }

    window.addEventListener("keydown", aoTeclado);
    return () => window.removeEventListener("keydown", aoTeclado);
  }, [aoFechar, aoProxima, aoAnterior]);

  // Portal para fora de .ed-superficie-sensorial: esse wrapper tem filter
  // (T3), e filter em CSS cria containing block para position:fixed —
  // sem o portal, os botões calculam a posição contra a altura da página
  // inteira, não contra a viewport (achado ao testar este bloco).
  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`Foto ${indice + 1} de ${FOTOS_GALERIA.length}`}
      className="fixed inset-0 z-50 flex items-center justify-center bg-ed-navy/90 p-4 transition-opacity"
      style={{ transitionDuration: `${duracaoMs}ms` }}
      onClick={(evento) => {
        if (evento.target === evento.currentTarget) aoFechar();
      }}
    >
      <button
        ref={fecharRef}
        type="button"
        onClick={aoFechar}
        aria-label="Fechar"
        className="absolute right-4 top-4 flex h-12 w-12 items-center justify-center rounded-full bg-ed-surface text-ed-navy"
      >
        <span aria-hidden="true">✕</span>
      </button>

      <button
        ref={anteriorRef}
        type="button"
        onClick={aoAnterior}
        aria-label="Foto anterior"
        className="absolute left-4 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-ed-surface text-ed-navy"
      >
        <span aria-hidden="true">‹</span>
      </button>

      <div className="relative max-h-[80vh] w-full max-w-2xl">
        <Image
          src={foto.arquivo}
          alt={foto.alt}
          width={1000}
          height={1000}
          className="h-auto max-h-[80vh] w-full rounded-2xl object-contain"
        />
      </div>

      <button
        ref={proximaRef}
        type="button"
        onClick={aoProxima}
        aria-label="Próxima foto"
        className="absolute right-4 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-ed-surface text-ed-navy"
      >
        <span aria-hidden="true">›</span>
      </button>
    </div>,
    document.body,
  );
}
