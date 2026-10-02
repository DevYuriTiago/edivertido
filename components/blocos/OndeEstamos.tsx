import Link from "next/link";
import { MapPin, Clock, WhatsappLogo } from "@phosphor-icons/react/dist/ssr";
import { BotaoWhatsApp } from "@/components/ui/BotaoWhatsApp";
import { CTA_WHATSAPP } from "@/lib/conteudo/hero";
import {
  enderecoCompleto,
  faixasFormatadas,
  linkComoChegar,
} from "@/lib/conteudo/contato";

// Fecha a página. Sem mapa embutido: "Como chegar" abre o Google Maps já
// com a rota, que é o que a pessoa quer de um mapa aqui.
export function OndeEstamos() {
  const endereco = enderecoCompleto();
  const horarios = faixasFormatadas();

  return (
    <section aria-labelledby="onde-titulo" className="secao secao--navy">
      <span className="costura" aria-hidden="true" />
      <div className="mx-auto grid max-w-[1240px] gap-14 px-5 md:px-8 lg:grid-cols-12 lg:gap-12">
        <h2 id="onde-titulo" className="titulo titulo-1 max-w-[12ch] lg:col-span-6">
          Vem conhecer o salão
        </h2>

        <div className="lg:col-span-6 lg:pt-3">
          <dl className="flex flex-col gap-6">
            <div className="flex gap-4">
              <dt className="shrink-0">
                <MapPin size={28} weight="fill" aria-hidden="true" />
                <span className="sr-only">Endereço</span>
              </dt>
              <dd className="text-lg">{endereco}</dd>
            </div>
            <div className="flex gap-4">
              <dt className="shrink-0">
                <Clock size={28} weight="fill" aria-hidden="true" />
                <span className="sr-only">Horário</span>
              </dt>
              <dd>
                <ul>
                  {horarios.map((linha) => (
                    <li key={linha} className="text-lg">
                      {linha}
                    </li>
                  ))}
                </ul>
              </dd>
            </div>
          </dl>

          <div className="mt-12 flex flex-wrap gap-4">
            <BotaoWhatsApp origem="final" className="botao botao--laranja">
              <WhatsappLogo size={24} weight="bold" aria-hidden="true" />
              {CTA_WHATSAPP}
            </BotaoWhatsApp>
            <a
              href={linkComoChegar()}
              target="_blank"
              rel="noopener noreferrer"
              className="botao botao--contorno"
            >
              Como chegar
            </a>
          </div>
        </div>
      </div>

      <footer className="rodape mx-auto mt-24 flex max-w-[1240px] flex-col gap-3 px-5 pt-10 md:flex-row md:items-center md:justify-between md:px-8">
        <p className="titulo text-2xl">Edivertido Salão Inclusivo</p>
        <p className="text-base">
          Rua do Cupim, 53, Graças, Recife.{" "}
          <Link href="/privacidade" className="underline underline-offset-4">
            Política de privacidade
          </Link>
        </p>
      </footer>
    </section>
  );
}
