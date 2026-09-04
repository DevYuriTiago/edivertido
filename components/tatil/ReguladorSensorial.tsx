"use client";

import { useCallback, useEffect, useId, useRef } from "react";
import { animate, motion, useMotionValue } from "framer-motion";
import { useSensorial } from "@/lib/sensorial";

const ALTURA_TRILHO = 288;
const ALVO_TOQUE = 48;

const POSICOES_PREDEFINIDAS = [
  { nivel: 1, rotulo: "Definir regulador para pleno estímulo" },
  { nivel: 0.6, rotulo: "Definir regulador para o padrão" },
  { nivel: 0, rotulo: "Definir regulador para calmo" },
] as const;

function textoValor(nivel: number) {
  if (nivel <= 0.03) return "Calmo, movimento parado";
  if (nivel >= 0.97) return "Pleno estímulo";
  return `${Math.round(nivel * 100)}% de estímulo`;
}

function nivelParaY(nivel: number) {
  return (1 - nivel) * ALTURA_TRILHO;
}

export function ReguladorSensorial() {
  const { nivel, definirNivel } = useSensorial();
  const tituloId = useId();
  const y = useMotionValue(nivelParaY(nivel));
  const arrastandoRef = useRef(false);

  // Mantém a posição visual do polegar sincronizada quando o nível muda
  // por teclado ou pelos marcadores; ignora enquanto o próprio arrasto
  // está em andamento, para não brigar com o gesto do usuário.
  useEffect(() => {
    if (arrastandoRef.current) return;
    const alvo = nivelParaY(nivel);
    if (Math.abs(y.get() - alvo) > 0.5) {
      const controles = animate(y, alvo, {
        duration: 0.15,
        ease: [0.22, 1, 0.36, 1],
      });
      return () => controles.stop();
    }
  }, [nivel, y]);

  const sincronizarDoY = useCallback(() => {
    const posicaoY = Math.min(ALTURA_TRILHO, Math.max(0, y.get()));
    definirNivel(1 - posicaoY / ALTURA_TRILHO);
  }, [y, definirNivel]);

  const aoFimDoArrasto = useCallback(() => {
    arrastandoRef.current = false;
    const posicaoY = Math.min(ALTURA_TRILHO, Math.max(0, y.get()));
    const bruto = 1 - posicaoY / ALTURA_TRILHO;
    definirNivel(bruto < 0.03 ? 0 : bruto > 0.97 ? 1 : bruto);
  }, [y, definirNivel]);

  const aoTeclado = useCallback(
    (evento: React.KeyboardEvent<HTMLDivElement>) => {
      const passo = 0.1;
      if (evento.key === "ArrowUp" || evento.key === "ArrowRight") {
        evento.preventDefault();
        definirNivel(nivel + passo);
      } else if (evento.key === "ArrowDown" || evento.key === "ArrowLeft") {
        evento.preventDefault();
        definirNivel(nivel - passo);
      } else if (evento.key === "Home") {
        evento.preventDefault();
        definirNivel(0);
      } else if (evento.key === "End") {
        evento.preventDefault();
        definirNivel(1);
      }
    },
    [nivel, definirNivel],
  );

  return (
    <div className="flex flex-col items-center gap-4">
      <p
        id={tituloId}
        className="text-sm max-w-36 text-center font-bold text-ed-ink"
      >
        Diminua o barulho do mundo
      </p>

      <div
        className="relative"
        style={{ width: ALVO_TOQUE, height: ALTURA_TRILHO + ALVO_TOQUE }}
      >
        <div
          className="absolute left-1/2 -ml-1 w-2 rounded-full bg-ed-surface-2"
          style={{ top: ALVO_TOQUE / 2, height: ALTURA_TRILHO }}
          aria-hidden="true"
        />

        {POSICOES_PREDEFINIDAS.map((posicao) => (
          <button
            key={posicao.nivel}
            type="button"
            onClick={() => definirNivel(posicao.nivel)}
            className="absolute left-1/2 -ml-6 flex items-center justify-center rounded-full"
            style={{
              top: nivelParaY(posicao.nivel),
              width: ALVO_TOQUE,
              height: ALVO_TOQUE,
            }}
            aria-label={posicao.rotulo}
          >
            <span
              className="h-2 w-2 rounded-full bg-ed-line"
              aria-hidden="true"
            />
          </button>
        ))}

        <motion.div
          role="slider"
          tabIndex={0}
          aria-labelledby={tituloId}
          aria-orientation="vertical"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(nivel * 100)}
          aria-valuetext={textoValor(nivel)}
          drag="y"
          dragConstraints={{ top: 0, bottom: ALTURA_TRILHO }}
          dragElastic={0.04}
          dragMomentum={false}
          onDragStart={() => {
            arrastandoRef.current = true;
          }}
          onDrag={sincronizarDoY}
          onDragEnd={aoFimDoArrasto}
          onKeyDown={aoTeclado}
          whileDrag={{ scale: 1.08 }}
          transition={{ duration: 0.08 }}
          style={{
            y,
            touchAction: "none",
            width: ALVO_TOQUE,
            height: ALVO_TOQUE,
          }}
          className="absolute left-1/2 top-0 -ml-6 z-10 flex cursor-grab items-center justify-center rounded-full bg-ed-navy shadow-ed active:cursor-grabbing focus-visible:outline focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-ed-orange"
        >
          <span
            className="h-2 w-2 rounded-full bg-ed-white"
            aria-hidden="true"
          />
        </motion.div>
      </div>

      <p
        className="text-sm text-ed-ink-soft min-h-14 max-w-40 text-center"
        aria-live="polite"
      >
        {nivel <= 0.03
          ? "É isso que a gente faz com o ambiente antes da pessoa sentar na cadeira."
          : textoValor(nivel)}
      </p>
    </div>
  );
}
