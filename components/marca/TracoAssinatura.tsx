"use client";

import { useEffect, useId, useRef, useState } from "react";
import Image from "next/image";
import {
  animate,
  motion,
  useMotionValue,
  useScroll,
  useTransform,
} from "framer-motion";
import { useSensorial } from "@/lib/sensorial";

type ModoTraco = "loader" | "progresso" | "divisor";

type TracoAssinaturaProps = {
  modo: ModoTraco;
  className?: string;
  aoTerminarLoader?: () => void;
};

const CAMINHO =
  "M 200,100 C 160,38 62,38 62,100 C 62,162 160,162 200,100 C 240,38 338,38 338,100 C 338,162 240,162 200,100";

const EASE_ASSINATURA = [0.22, 1, 0.36, 1] as const;
const DURACAO_LOADER = 0.9;

function GradienteTraco({ id }: { id: string }) {
  return (
    <linearGradient
      id={id}
      x1="0"
      y1="0"
      x2="400"
      y2="0"
      gradientUnits="userSpaceOnUse"
    >
      <stop offset="0%" style={{ stopColor: "var(--ed-navy)" }} />
      <stop offset="40%" style={{ stopColor: "var(--ed-navy)" }} />
      <stop offset="50%" style={{ stopColor: "var(--ed-orange)" }} />
      <stop offset="60%" style={{ stopColor: "var(--ed-green)" }} />
      <stop offset="100%" style={{ stopColor: "var(--ed-green)" }} />
    </linearGradient>
  );
}

export function TracoAssinatura({
  modo,
  className,
  aoTerminarLoader,
}: TracoAssinaturaProps) {
  const gradienteId = useId();
  const { nivel, movimento } = useSensorial();

  if (modo === "loader") {
    return (
      <LoaderTraco
        gradienteId={gradienteId}
        movimento={movimento}
        aoTerminar={aoTerminarLoader}
        className={className}
      />
    );
  }

  return (
    <svg
      viewBox="0 0 400 200"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <defs>
        <GradienteTraco id={gradienteId} />
      </defs>
      {modo === "progresso" ? (
        <TracoProgresso gradienteId={gradienteId} nivel={nivel} />
      ) : (
        <TracoDivisor gradienteId={gradienteId} />
      )}
    </svg>
  );
}

// Acompanha o scroll da página inteira. No nível sensorial calmo, some a
// ligação com o scroll e mostra o traço já desenhado e parado.
function TracoProgresso({
  gradienteId,
  nivel,
}: {
  gradienteId: string;
  nivel: number;
}) {
  const { scrollYProgress } = useScroll();
  const dashOffsetDinamico = useTransform(scrollYProgress, [0, 1], [1, 0]);
  const dashOffsetEstatico = useMotionValue(0);

  return (
    <motion.path
      d={CAMINHO}
      pathLength={1}
      stroke={`url(#${gradienteId})`}
      strokeWidth={22}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeDasharray={1}
      style={{
        strokeDashoffset: nivel <= 0 ? dashOffsetEstatico : dashOffsetDinamico,
      }}
    />
  );
}

// Divisor de seção: fino, discreto, sempre estático. Nunca anima.
function TracoDivisor({ gradienteId }: { gradienteId: string }) {
  return (
    <path
      d={CAMINHO}
      pathLength={1}
      stroke={`url(#${gradienteId})`}
      strokeWidth={3}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeDasharray={1}
      strokeDashoffset={0}
      opacity={0.25}
    />
  );
}

// Desenha uma vez ao montar, depois cede lugar à logo por cross-fade. A
// duração escala com o nível sensorial do momento em que monta (capturado
// numa ref, não muda no meio da animação); em nível 0 o desenho é instantâneo.
function LoaderTraco({
  gradienteId,
  movimento,
  aoTerminar,
  className,
}: {
  gradienteId: string;
  movimento: number;
  aoTerminar?: () => void;
  className?: string;
}) {
  const dashOffset = useMotionValue(1);
  const [desenhoCompleto, setDesenhoCompleto] = useState(false);
  const movimentoInicialRef = useRef(movimento);

  useEffect(() => {
    const controles = animate(dashOffset, 0, {
      duration: DURACAO_LOADER * movimentoInicialRef.current,
      ease: EASE_ASSINATURA,
      onComplete: () => {
        setDesenhoCompleto(true);
        aoTerminar?.();
      },
    });
    return () => controles.stop();
  }, [dashOffset, aoTerminar]);

  const duracaoFadeMs = Math.max(movimentoInicialRef.current, 0.15) * 250;

  return (
    <div className={`relative aspect-[2/1] ${className ?? ""}`}>
      <svg
        viewBox="0 0 400 200"
        fill="none"
        aria-hidden="true"
        className="absolute inset-0 h-full w-full transition-opacity"
        style={{
          opacity: desenhoCompleto ? 0 : 1,
          transitionDuration: `${duracaoFadeMs}ms`,
        }}
      >
        <defs>
          <GradienteTraco id={gradienteId} />
        </defs>
        <motion.path
          d={CAMINHO}
          pathLength={1}
          stroke={`url(#${gradienteId})`}
          strokeWidth={22}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray={1}
          style={{ strokeDashoffset: dashOffset }}
        />
      </svg>
      <Image
        src="/marca/logo-edivertido-vetorial-sem-fundo.svg"
        alt=""
        aria-hidden="true"
        fill
        className="object-contain transition-opacity"
        style={{
          opacity: desenhoCompleto ? 1 : 0,
          transitionDuration: `${duracaoFadeMs}ms`,
        }}
      />
    </div>
  );
}
