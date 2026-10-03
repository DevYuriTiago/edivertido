import Image from "next/image";
import { WhatsappLogo } from "@phosphor-icons/react/dist/ssr";
import { BotaoPerfil } from "@/components/ui/BotaoPerfil";
import { QuebraCabecaHero } from "@/components/puzzle/QuebraCabecaHero";
import { HERO, CTA_WHATSAPP } from "@/lib/conteudo/hero";

export function Hero() {
  return (
    <section
      aria-labelledby="hero-titulo"
      className="secao secao--navy overflow-hidden pt-10 md:pt-16"
    >
      <div className="mx-auto grid max-w-[1240px] items-center gap-14 px-5 md:px-8 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-6">
          <h1 id="hero-titulo" className="titulo titulo-1 text-[clamp(2.1rem,1.3rem+2.4vw,3.4rem)] leading-[1.08]">
            {HERO.titulo}
          </h1>
          <p className="medida mt-6 text-lg md:text-xl">{HERO.subtitulo}</p>
          <div className="mt-9">
            <BotaoPerfil origem="hero" className="botao botao--laranja">
              <WhatsappLogo size={24} weight="bold" aria-hidden="true" />
              {CTA_WHATSAPP}
            </BotaoPerfil>
          </div>
        </div>

        <div className="so-ruido mx-auto w-full max-w-[540px] px-6 pb-6 lg:col-span-6 lg:px-8">
          <QuebraCabecaHero />
        </div>

        <div className="so-calmo foto-calma relative aspect-[4/3] w-full overflow-hidden rounded-2xl lg:col-span-6">
          <Image
            src="/marca/05.jpeg"
            alt="Barbeiro sorridente faz sinal de positivo ao lado de uma criança sorrindo num carrinho de brinquedo depois do corte."
            fill
            sizes="(min-width: 1024px) 40vw, 90vw"
            className="object-cover"
          />
        </div>
      </div>
    </section>
  );
}
