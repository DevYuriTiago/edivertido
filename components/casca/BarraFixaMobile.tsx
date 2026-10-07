"use client";

import { useEffect, useState } from "react";
import { WhatsappLogo } from "@phosphor-icons/react";
import { BotaoPerfil } from "@/components/ui/BotaoPerfil";
import { CTA_WHATSAPP } from "@/lib/conteudo/hero";

// Único CTA fixo do mobile (o header esconde o botão nesse tamanho).
// app/layout.tsx reserva espaço embaixo do conteúdo para essa barra nunca
// cobrir o último elemento focável da página.
//
// Enquanto o herói está na tela a barra some: ele já tem o mesmo botão, e
// dois iguais à vista é redundante. Começa escondida para não piscar no
// carregamento; páginas sem herói mostram a barra direto.
export function BarraFixaMobile() {
  const [visivel, setVisivel] = useState(false);

  useEffect(() => {
    const heroi = document.getElementById("hero-titulo")?.closest("section");
    if (!heroi) {
      setVisivel(true);
      return;
    }
    const observador = new IntersectionObserver(([entrada]) =>
      setVisivel(!entrada.isIntersecting),
    );
    observador.observe(heroi);
    return () => observador.disconnect();
  }, []);

  return (
    <div
      inert={!visivel}
      className={`barra-fixa fixed inset-x-0 bottom-0 z-40 border-t border-ed-line bg-ed-white p-3 transition-opacity duration-200 md:hidden ${
        visivel ? "opacity-100" : "pointer-events-none opacity-0"
      }`}
      style={{ paddingBottom: "max(0.75rem, env(safe-area-inset-bottom))" }}
    >
      <BotaoPerfil origem="barra-fixa" className="botao botao--laranja w-full">
        <WhatsappLogo size={24} weight="bold" aria-hidden="true" />
        {CTA_WHATSAPP}
      </BotaoPerfil>
    </div>
  );
}
