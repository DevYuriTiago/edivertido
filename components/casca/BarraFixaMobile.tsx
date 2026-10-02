import { WhatsappLogo } from "@phosphor-icons/react/dist/ssr";
import { BotaoPerfil } from "@/components/ui/BotaoPerfil";
import { CTA_WHATSAPP } from "@/lib/conteudo/hero";

// Único CTA fixo do mobile (o header esconde o botão nesse tamanho).
// app/layout.tsx reserva espaço embaixo do conteúdo para essa barra nunca
// cobrir o último elemento focável da página.
export function BarraFixaMobile() {
  return (
    <div
      className="fixed inset-x-0 bottom-0 z-40 border-t border-ed-line bg-ed-white p-3 md:hidden"
      style={{ paddingBottom: "max(0.75rem, env(safe-area-inset-bottom))" }}
    >
      <BotaoPerfil origem="barra-fixa" className="botao botao--laranja w-full">
        <WhatsappLogo size={24} weight="bold" aria-hidden="true" />
        {CTA_WHATSAPP}
      </BotaoPerfil>
    </div>
  );
}
