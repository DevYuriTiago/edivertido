"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { HandPointing } from "@phosphor-icons/react";
import { useSensorial } from "@/lib/sensorial";
import { AVISO_PERFIL_TEXTO, AVISO_PERFIL_TITULO } from "@/lib/conteudo/perfilSensorial";

export const EVENTO_IR_PARA_PERFIL = "ed:ir-para-perfil";

// Retorno visível do clique num CTA: diz que o próximo passo é o
// formulário. Cada clique reanima (chave nova). No modo "Tirar ruído" o
// CSS desliga o movimento e a cor: vira um aviso simples.
export function AvisoPerfil() {
  const [vez, setVez] = useState(0);
  const { movimento } = useSensorial();

  useEffect(() => {
    // Chegou de outra página (ex.: /privacidade) já com a âncora.
    if (window.location.hash === "#perfil-sensorial") setVez(1);
    const mostrar = () => setVez((atual) => atual + 1);
    window.addEventListener(EVENTO_IR_PARA_PERFIL, mostrar);
    return () => window.removeEventListener(EVENTO_IR_PARA_PERFIL, mostrar);
  }, []);

  const animar = movimento > 0;

  return (
    <div role="status" aria-live="polite">
      {vez > 0 && (
        <motion.div
          key={vez}
          className="aviso-perfil mov mb-6 flex items-center gap-4 rounded-[20px] px-5 py-4"
          initial={animar ? { opacity: 0, y: -16, scale: 0.92 } : false}
          // Só anima quando o aviso entra na tela: a rolagem até o
          // formulário é suave e levaria a animação embora no caminho.
          whileInView={
            animar
              ? { opacity: 1, y: 0, scale: 1, rotate: [0, -2.5, 2, -1, 0] }
              : { opacity: 1 }
          }
          viewport={{ once: true, amount: 0.8 }}
          transition={{
            type: "spring",
            duration: 0.5,
            bounce: 0.35,
            rotate: { duration: 0.7, delay: 0.25, ease: "easeInOut" },
          }}
        >
          <motion.span
            className="aviso-perfil-icone mov shrink-0"
            aria-hidden="true"
            whileInView={animar ? { y: [0, 7, 0, 7, 0] } : undefined}
            viewport={{ once: true, amount: 0.8 }}
            transition={{ duration: 1.4, delay: 0.4, ease: "easeInOut" }}
          >
            <HandPointing size={36} weight="fill" style={{ transform: "rotate(180deg)" }} />
          </motion.span>
          <span>
            <strong className="titulo block text-[1.35rem]">{AVISO_PERFIL_TITULO}</strong>
            <span className="mt-1 block text-base leading-snug">{AVISO_PERFIL_TEXTO}</span>
          </span>
        </motion.div>
      )}
    </div>
  );
}
