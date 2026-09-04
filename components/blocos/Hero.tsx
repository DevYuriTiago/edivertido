import { ReguladorSensorial } from "@/components/tatil/ReguladorSensorial";
import { BotaoWhatsApp } from "@/components/ui/BotaoWhatsApp";
import { HERO } from "@/lib/conteudo/hero";

// Bloco 1 — remove o obstáculo de reconhecimento: em 5s, a mãe cética
// precisa ver que aqui é diferente. O Regulador ao lado do H1 é a
// diferenciação em si, não uma ilustração dela.
export function Hero() {
  return (
    <section
      aria-labelledby="hero-titulo"
      className="mx-auto flex max-w-5xl flex-col items-center gap-12 px-6 pb-16 pt-10 md:flex-row md:items-start md:justify-between md:gap-8 md:pb-20 md:pt-16"
    >
      <div className="flex max-w-xl flex-col items-start gap-6">
        <h1 id="hero-titulo">{HERO.titulo}</h1>
        <p>{HERO.subtitulo}</p>
        <BotaoWhatsApp
          origem="hero"
          className="inline-flex min-h-12 items-center rounded-full bg-ed-orange px-8 text-base font-bold text-ed-navy shadow-ed transition-transform hover:scale-[1.02]"
        >
          Falar no WhatsApp
        </BotaoWhatsApp>
      </div>

      <ReguladorSensorial />
    </section>
  );
}
