import { WhatsappLogo } from "@phosphor-icons/react/dist/ssr";
import { Logo } from "@/components/marca/Logo";
import { BotaoWhatsApp } from "@/components/ui/BotaoWhatsApp";
import { InterruptorRuido } from "@/components/casca/InterruptorRuido";
import { CTA_WHATSAPP } from "@/lib/conteudo/hero";

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-ed-line bg-ed-white">
      <div className="mx-auto flex h-[72px] max-w-[1240px] items-center justify-between gap-4 px-5 md:px-8">
        <Logo className="h-11 w-auto" />
        <div className="flex items-center gap-3">
          <InterruptorRuido />
          <BotaoWhatsApp
            origem="barra-fixa"
            className="botao botao--laranja hidden md:inline-flex"
          >
            <WhatsappLogo size={22} weight="bold" aria-hidden="true" />
            {CTA_WHATSAPP}
          </BotaoWhatsApp>
        </div>
      </div>
    </header>
  );
}
