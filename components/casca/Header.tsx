import { Logo } from "@/components/marca/Logo";
import { BotaoWhatsApp } from "@/components/ui/BotaoWhatsApp";

// Logo sempre visível; o CTA só aparece aqui no desktop. No mobile, quem
// carrega a conversão é a barra fixa inferior (BarraFixaMobile).
export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-ed-line bg-ed-surface">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
        <Logo className="h-10 w-auto" />
        <BotaoWhatsApp
          origem="barra-fixa"
          className="hidden min-h-12 items-center rounded-full bg-ed-orange px-6 text-sm font-bold text-ed-navy shadow-ed transition-transform hover:scale-[1.02] md:inline-flex"
        >
          Falar no WhatsApp
        </BotaoWhatsApp>
      </div>
    </header>
  );
}
