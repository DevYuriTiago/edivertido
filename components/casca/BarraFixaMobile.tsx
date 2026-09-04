import { BotaoWhatsApp } from "@/components/ui/BotaoWhatsApp";
import { linkComoChegar } from "@/lib/conteudo/contato";

// Único CTA do mobile (o header não mostra o botão nesse tamanho de tela).
// app/layout.tsx reserva espaço embaixo do conteúdo para essa barra nunca
// cobrir o último elemento focável da página.
export function BarraFixaMobile() {
  return (
    <div
      className="fixed inset-x-0 bottom-0 z-40 flex gap-2 border-t border-ed-line bg-ed-surface p-3 md:hidden"
      style={{ paddingBottom: "max(0.75rem, env(safe-area-inset-bottom))" }}
    >
      <BotaoWhatsApp
        origem="barra-fixa"
        className="flex min-h-12 flex-1 items-center justify-center rounded-full bg-ed-orange px-4 text-sm font-bold text-ed-navy"
      >
        Falar no WhatsApp
      </BotaoWhatsApp>
      <a
        href={linkComoChegar()}
        target="_blank"
        rel="noopener noreferrer"
        className="flex min-h-12 flex-1 items-center justify-center rounded-full border border-ed-navy px-4 text-sm font-bold text-ed-navy"
      >
        Como chegar
      </a>
    </div>
  );
}
