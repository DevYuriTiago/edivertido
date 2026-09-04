"use client";

import { useState } from "react";
import { TracoAssinatura } from "@/components/marca/TracoAssinatura";
import { useSensorial } from "@/lib/sensorial";

type Estado = "carregando" | "saindo" | "escondido";

// Roda uma vez por carregamento real de página (o layout raiz não
// remonta em navegação client-side entre / e /privacidade). Decorativo
// e sem informação própria: aria-hidden, o conteúdo real já está no DOM
// por baixo o tempo todo.
export function LoaderInicial() {
  const [estado, setEstado] = useState<Estado>("carregando");
  const { movimento } = useSensorial();

  if (estado === "escondido") return null;

  const duracaoSaidaMs = Math.max(movimento, 0.15) * 400;

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 z-50 flex items-center justify-center bg-ed-surface transition-opacity"
      style={{
        opacity: estado === "saindo" ? 0 : 1,
        transitionDuration: `${duracaoSaidaMs}ms`,
      }}
      onTransitionEnd={() => {
        if (estado === "saindo") setEstado("escondido");
      }}
    >
      <TracoAssinatura
        modo="loader"
        className="w-40"
        aoTerminarLoader={() => {
          setTimeout(() => setEstado("saindo"), duracaoSaidaMs);
        }}
      />
    </div>
  );
}
