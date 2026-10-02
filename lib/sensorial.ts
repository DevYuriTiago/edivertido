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
import { useReducedMotion } from "framer-motion";

// Interruptor "Tirar ruído": guardado no localStorage e refletido em
// data-calmo no <html>. O script em app/layout.tsx aplica o atributo antes
// da primeira pintura; este provider só sincroniza o React com ele.
export const CHAVE_SEM_RUIDO = "ed-sem-ruido";

type EstadoSensorial = {
  semRuido: boolean;
  alternarRuido: () => void;
  // 0 = parado (sem ruído ou movimento reduzido), 1 = movimento completo
  movimento: number;
};

const SensorialContext = createContext<EstadoSensorial | null>(null);

export function SensorialProvider({ children }: { children: ReactNode }) {
  const [semRuido, setSemRuido] = useState(false);
  const movimentoReduzido = useReducedMotion();

  useEffect(() => {
    setSemRuido(document.documentElement.hasAttribute("data-calmo"));
  }, []);

  const alternarRuido = useCallback(() => {
    setSemRuido((atual) => {
      const proximo = !atual;
      const raiz = document.documentElement;
      if (proximo) raiz.setAttribute("data-calmo", "true");
      else raiz.removeAttribute("data-calmo");
      try {
        localStorage.setItem(CHAVE_SEM_RUIDO, proximo ? "1" : "0");
      } catch {
        // navegação privada sem storage: o modo vale só nesta visita
      }
      return proximo;
    });
  }, []);

  const valor = useMemo<EstadoSensorial>(
    () => ({
      semRuido,
      alternarRuido,
      movimento: semRuido || movimentoReduzido ? 0 : 1,
    }),
    [semRuido, alternarRuido, movimentoReduzido],
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
