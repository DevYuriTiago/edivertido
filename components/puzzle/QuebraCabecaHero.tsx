"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Peca } from "@/components/puzzle/Peca";
import { bordasNaGrade } from "@/lib/puzzle";
import { useSensorial } from "@/lib/sensorial";

type ItemPeca =
  | { tipo: "foto"; src: string; alt: string }
  | { tipo: "logo" };

const PECAS: ItemPeca[] = [
  {
    tipo: "foto",
    src: "/marca/05.jpeg",
    alt: "Barbeiro sorridente faz sinal de positivo ao lado de uma criança sorrindo num carrinho de brinquedo depois do corte.",
  },
  { tipo: "logo" },
  {
    tipo: "foto",
    src: "/marca/04.jpeg",
    alt: "Crianças brincando na sala de espera sensorial, com tapete colorido e painel de brinquedos na parede.",
  },
  {
    tipo: "foto",
    src: "/marca/01.jpeg",
    alt: "Sala de espera do salão, com mesa de sinuca e balcão de recepção.",
  },
];

// De onde cada peça chega antes de se encaixar (fração da própria peça).
const ORIGEM = [
  { x: -55, y: -40, r: -14 },
  { x: 60, y: -55, r: 12 },
  { x: -45, y: 50, r: 10 },
  { x: 55, y: 45, r: -12 },
];

export function QuebraCabecaHero() {
  const { movimento } = useSensorial();
  const [ponteiroFino, setPonteiroFino] = useState(false);

  // Arrastar só com mouse: no toque, o gesto é da rolagem da página.
  useEffect(() => {
    setPonteiroFino(window.matchMedia("(pointer: fine)").matches);
  }, []);

  const animar = movimento > 0;

  return (
    <div className="quebra-cabeca grid aspect-square w-full grid-cols-2 grid-rows-2">
      {PECAS.map((peca, indice) => {
        const linha = Math.floor(indice / 2);
        const coluna = indice % 2;
        const origem = ORIGEM[indice];
        return (
          <div key={indice} className="relative">
            <motion.div
              className="mov absolute inset-0"
              style={{ zIndex: indice === 0 ? 2 : 1 }}
              initial={
                animar
                  ? {
                      x: `${origem.x}%`,
                      y: `${origem.y}%`,
                      rotate: origem.r,
                      opacity: 0,
                    }
                  : false
              }
              animate={{ x: 0, y: 0, rotate: 0, opacity: 1 }}
              transition={{
                type: "spring",
                duration: 0.9,
                bounce: 0.28,
                delay: 0.2 + indice * 0.12,
              }}
              drag={animar && ponteiroFino}
              dragSnapToOrigin
              dragElastic={0.5}
              whileDrag={{ scale: 1.05, zIndex: 5 }}
            >
              <Peca
                id={`hero-peca-${indice}`}
                bordas={bordasNaGrade(linha, coluna, 2, 2)}
                sangria={peca.tipo === "foto"}
                className={peca.tipo === "logo" ? "peca-cor bg-ed-orange" : ""}
              >
                {peca.tipo === "foto" ? (
                  <Image
                    src={peca.src}
                    alt={peca.alt}
                    fill
                    priority={indice === 0}
                    sizes="(min-width: 1024px) 26vw, 60vw"
                    className="object-cover"
                    draggable={false}
                  />
                ) : (
                  <Image
                    src="/marca/logo-fundo-amarelo.jpeg"
                    alt=""
                    fill
                    sizes="(min-width: 1024px) 20vw, 45vw"
                    className="object-contain p-[6%]"
                    draggable={false}
                  />
                )}
              </Peca>
            </motion.div>
          </div>
        );
      })}
    </div>
  );
}
