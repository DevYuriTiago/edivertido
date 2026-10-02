"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { rastrear } from "@/lib/analytics";
import type { OrigemCta } from "@/lib/whatsapp";
import { EVENTO_IR_PARA_PERFIL } from "@/components/form/AvisoPerfil";

type BotaoPerfilProps = {
  origem: OrigemCta;
  className?: string;
  children: ReactNode;
};

// Todo CTA da página leva ao perfil sensorial, que decide o caminho: sem
// sensibilidade sensorial, vai direto para o WhatsApp; com, segue o perfil.
// "/#" para funcionar também a partir de /privacidade.
export function BotaoPerfil({ origem, className, children }: BotaoPerfilProps) {
  return (
    <Link
      href="/#perfil-sensorial"
      className={className}
      onClick={() => {
        rastrear("cta_click", { origem });
        window.dispatchEvent(new Event(EVENTO_IR_PARA_PERFIL));
      }}
    >
      {children}
    </Link>
  );
}
