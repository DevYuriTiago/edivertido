"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { useSensorial } from "@/lib/sensorial";

const TAGS = { div: motion.div, li: motion.li, section: motion.section } as const;

type RevelarProps = {
  children: ReactNode;
  className?: string;
  atraso?: number;
  as?: keyof typeof TAGS;
};

// Dispara uma vez ao entrar na viewport, nunca de novo ao rolar de volta
// (viewport once: true). Distância e duração escalam com o nível
// sensorial do momento em que monta; no calmo, aparece sem nenhum
// deslocamento. "as" existe para não quebrar semântica de lista: um
// <motion.div> entre <ul> e <li> invalida o content model do <ul>.
export function Revelar({
  children,
  className,
  atraso = 0,
  as = "div",
}: RevelarProps) {
  const { movimento } = useSensorial();
  const distancia = 16 * movimento;
  const duracao = Math.max(movimento, 0.01) * 0.4;
  const MotionTag = TAGS[as];

  return (
    <MotionTag
      className={className}
      initial={{ opacity: movimento > 0 ? 0 : 1, y: distancia }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{
        duration: duracao,
        delay: atraso,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </MotionTag>
  );
}
