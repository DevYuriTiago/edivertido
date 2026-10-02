"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { WhatsappLogo, X, CaretLeft, CaretRight } from "@phosphor-icons/react";
import { useSensorial } from "@/lib/sensorial";
import { rastrear } from "@/lib/analytics";
import { BotaoPerfil } from "@/components/ui/BotaoPerfil";
import { Peca } from "@/components/puzzle/Peca";
import type { Borda } from "@/lib/puzzle";
import { FOTOS_GALERIA, FRASE_CONTEXTO_GALERIA } from "@/lib/conteudo/galeria";
import { CTA_WHATSAPP } from "@/lib/conteudo/hero";

// Ordem do mosaico: o corte difícil ao lado do resultado feliz na primeira
// linha, o processo e o espaço embaixo. Índices de FOTOS_GALERIA.
const ORDEM = ["/marca/02.jpeg", "/marca/05.jpeg", "/marca/03.jpeg", "/marca/04.jpeg", "/marca/01.jpeg"].map(
  (arquivo) => FOTOS_GALERIA.findIndex((foto) => foto.arquivo === arquivo),
);

// Linhas do mosaico: cada item é [posição em ORDEM, largura em células].
const LINHAS_DESKTOP: [number, number][][] = [
  [[0, 2], [1, 1]],
  [[2, 1], [3, 1], [4, 1]],
];
const LINHAS_MOBILE: [number, number][][] = [
  [[0, 2]],
  [[1, 1], [2, 1]],
  [[3, 1], [4, 1]],
];

function bordasNaLinha(indice: number, total: number) {
  const direita: Borda =
    indice === total - 1 ? "lisa" : indice % 2 === 0 ? "fora" : "dentro";
  const esquerda: Borda =
    indice === 0 ? "lisa" : (indice - 1) % 2 === 0 ? "dentro" : "fora";
  return { topo: "lisa" as Borda, direita, base: "lisa" as Borda, esquerda };
}

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
    <section aria-labelledby="galeria-titulo" className="secao secao--navy">
      <span className="costura" aria-hidden="true" />
      <div className="mx-auto max-w-[1100px] px-5 md:px-8">
        <h2 id="galeria-titulo" className="titulo titulo--frase titulo-2 max-w-[24ch]">
          {FRASE_CONTEXTO_GALERIA}
        </h2>

        <div className="mt-14 px-[7%] md:hidden">
          <Mosaico linhas={LINHAS_MOBILE} prefixo="galeria-m" aoAbrir={abrir} />
        </div>
        <div className="mt-16 hidden px-[6%] md:block">
          <Mosaico linhas={LINHAS_DESKTOP} prefixo="galeria-d" aoAbrir={abrir} />
        </div>

        <div className="mt-14">
          <BotaoPerfil origem="galeria" className="botao botao--laranja">
            <WhatsappLogo size={24} weight="bold" aria-hidden="true" />
            {CTA_WHATSAPP}
          </BotaoPerfil>
        </div>
      </div>

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

function Mosaico({
  linhas,
  prefixo,
  aoAbrir,
}: {
  linhas: [number, number][][];
  prefixo: string;
  aoAbrir: (indice: number, gatilho: HTMLButtonElement) => void;
}) {
  const colunas = linhas[0].reduce((soma, [, largura]) => soma + largura, 0);
    return (
      <div className="quebra-cabeca flex flex-col">
        {linhas.map((linha, indiceLinha) => (
          <ul
            key={indiceLinha}
            role="list"
            className="grid"
            style={{ gridTemplateColumns: `repeat(${colunas}, minmax(0, 1fr))` }}
          >
            {linha.map(([posicao, largura], indiceNaLinha) => {
              const indiceFoto = ORDEM[posicao];
              const foto = FOTOS_GALERIA[indiceFoto];
              return (
                <li
                  key={foto.arquivo}
                  className="relative"
                  style={{
                    gridColumn: `span ${largura}`,
                    aspectRatio: `${largura} / 1`,
                  }}
                >
                  <button
                    type="button"
                    onClick={(evento) => aoAbrir(indiceFoto, evento.currentTarget)}
                    aria-label={`Ampliar foto: ${foto.alt}`}
                    className="absolute inset-0"
                  >
                    <Peca
                      id={`${prefixo}-${indiceFoto}`}
                      bordas={bordasNaLinha(indiceNaLinha, linha.length)}
                      largura={largura}
                      altura={1}
                      sangria
                    >
                      <Image
                        src={foto.arquivo}
                        alt=""
                        fill
                        sizes={largura === 2 ? "(min-width: 768px) 60vw, 90vw" : "(min-width: 768px) 30vw, 45vw"}
                        className="object-cover"
                      />
                    </Peca>
                  </button>
                </li>
              );
            })}
          </ul>
        ))}
      </div>
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

  // Portal para o body: as peças ficam dentro de .quebra-cabeca, que tem
  // filter, e filter cria containing block para position:fixed.
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
        <X size={24} weight="bold" aria-hidden="true" />
      </button>

      <button
        ref={anteriorRef}
        type="button"
        onClick={aoAnterior}
        aria-label="Foto anterior"
        className="absolute left-4 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-ed-surface text-ed-navy"
      >
        <CaretLeft size={24} weight="bold" aria-hidden="true" />
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
        <CaretRight size={24} weight="bold" aria-hidden="true" />
      </button>
    </div>,
    document.body,
  );
}
