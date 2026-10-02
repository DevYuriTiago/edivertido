import { WhatsappLogo } from "@phosphor-icons/react/dist/ssr";
import { BotaoPerfil } from "@/components/ui/BotaoPerfil";
import { PerfilSensorialForm } from "@/components/form/PerfilSensorialForm";
import { PARAGRAFOS_VALOR, VALOR_TITULO } from "@/lib/conteudo/valor";
import {
  INTRO_PERFIL_SENSORIAL,
  PERFIL_SENSORIAL_TITULO,
} from "@/lib/conteudo/perfilSensorial";
import { CTA_WHATSAPP } from "@/lib/conteudo/hero";

// O que se resolve antes de sair de casa: quanto custa e o que a equipe
// precisa saber. Valor à esquerda, formulário opcional à direita.
export function AntesDaVisita() {
  return (
    <section aria-labelledby="valor-titulo" className="secao secao--branco">
      <span className="costura" aria-hidden="true" />
      <div className="mx-auto grid max-w-[1240px] gap-16 px-5 md:px-8 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-5">
          <h2 id="valor-titulo" className="titulo titulo-2 max-w-[16ch]">
            {VALOR_TITULO}
          </h2>
          <div className="mt-8 flex flex-col gap-5">
            {PARAGRAFOS_VALOR.map((paragrafo) => (
              <p key={paragrafo.texto} className="medida text-lg">
                {paragrafo.texto}
              </p>
            ))}
          </div>
          <div className="mt-10">
            <BotaoPerfil origem="valor" className="botao botao--navy">
              <WhatsappLogo size={24} weight="bold" aria-hidden="true" />
              {CTA_WHATSAPP}
            </BotaoPerfil>
          </div>
        </div>

        <div
          id="perfil-sensorial"
          className="scroll-mt-24 rounded-[28px] bg-ed-surface-2 p-6 md:p-10 lg:col-span-7"
        >
          <h2 id="perfil-sensorial-titulo" className="titulo titulo-3">
            {PERFIL_SENSORIAL_TITULO}
          </h2>
          <p className="medida mt-3 text-ed-ink-soft">{INTRO_PERFIL_SENSORIAL}</p>
          <div className="mt-8">
            <PerfilSensorialForm />
          </div>
        </div>
      </div>
    </section>
  );
}
