"use client";

import {
  createContext,
  createElement,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

const CHAVE_ARMAZENAMENTO = "ed-sensorial-nivel";
const NIVEL_PADRAO = 0.6;
const NIVEL_CALMO = 0;

export type EstadoSensorial = {
  nivel: number;
  definirNivel: (nivel: number) => void;
  movimento: number;
  saturacao: number;
  espacamento: number;
  somDeVideo: boolean;
};

const SensorialContext = createContext<EstadoSensorial | null>(null);

function clamp01(valor: number) {
  return Math.min(1, Math.max(0, valor));
}

// Único lugar do app autorizado a ler prefers-reduced-motion e localStorage
// diretamente — todo componente consome via useSensorial().
function lerNivelInicial(): number {
  if (typeof window === "undefined") return NIVEL_PADRAO;

  const salvo = window.localStorage.getItem(CHAVE_ARMAZENAMENTO);
  if (salvo !== null) {
    const numero = Number(salvo);
    if (!Number.isNaN(numero)) return clamp01(numero);
  }

  const prefereReduzido = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;
  return prefereReduzido ? NIVEL_CALMO : NIVEL_PADRAO;
}

function derivar(nivel: number): Omit<EstadoSensorial, "nivel" | "definirNivel"> {
  return {
    movimento: nivel,
    // nunca some de vez: página não pode virar ilegível em preto e branco
    saturacao: 0.5 + nivel * 0.5,
    // calmo = mais respiro entre blocos, pleno = espaçamento de base
    espacamento: 1 + (1 - nivel) * 0.5,
    somDeVideo: nivel > 0,
  };
}

export function SensorialProvider({ children }: { children: ReactNode }) {
  // Estado inicial igual em servidor e cliente (evita mismatch de hidratação).
  // O script bloqueante em layout.tsx já pintou o valor real antes deste
  // componente montar; este efeito só sincroniza o estado do React com ele.
  const [nivel, setNivel] = useState<number>(NIVEL_PADRAO);

  useEffect(() => {
    setNivel(lerNivelInicial());
  }, []);

  useEffect(() => {
    window.localStorage.setItem(CHAVE_ARMAZENAMENTO, String(nivel));
    document.documentElement.style.setProperty("--ed-nivel", String(nivel));
  }, [nivel]);

  const definirNivel = useCallback((novoNivel: number) => {
    setNivel(clamp01(novoNivel));
  }, []);

  const valor = useMemo<EstadoSensorial>(
    () => ({ nivel, definirNivel, ...derivar(nivel) }),
    [nivel, definirNivel],
  );

  return createElement(SensorialContext.Provider, { value: valor }, children);
}

export function useSensorial(): EstadoSensorial {
  const contexto = useContext(SensorialContext);
  if (!contexto) {
    throw new Error("useSensorial precisa estar dentro de <SensorialProvider>");
  }
  return contexto;
}

// Consumido pelo script bloqueante em app/layout.tsx (mesma lógica de
// lerNivelInicial, duplicada de propósito: aquele trecho roda antes de
// qualquer módulo React carregar, fora da árvore de componentes).
export const SENSORIAL_CHAVE_ARMAZENAMENTO = CHAVE_ARMAZENAMENTO;
export const SENSORIAL_NIVEL_PADRAO = NIVEL_PADRAO;
export const SENSORIAL_NIVEL_CALMO = NIVEL_CALMO;
