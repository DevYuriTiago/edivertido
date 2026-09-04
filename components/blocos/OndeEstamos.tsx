"use client";

import { useState } from "react";
import { Revelar } from "@/components/ui/Revelar";
import { BotaoWhatsApp } from "@/components/ui/BotaoWhatsApp";
import {
  enderecoCompleto,
  faixasFormatadas,
  linkComoChegar,
} from "@/lib/conteudo/contato";

// Bloco 11 — fecha a página. Mapa só carrega sob clique: um iframe do
// Google Maps no load custa JS e uma requisição de terceiro que a
// maioria de quem visita nunca precisa.
export function OndeEstamos() {
  const [mapaCarregado, setMapaCarregado] = useState(false);
  const endereco = enderecoCompleto();
  const horarios = faixasFormatadas();

  return (
    <section
      aria-labelledby="onde-titulo"
      className="mx-auto flex max-w-2xl flex-col gap-8 px-6 py-16 md:py-24"
    >
      <Revelar className="flex flex-col gap-4">
        <h2 id="onde-titulo">Onde estamos</h2>
        <p>{endereco}</p>
        <ul className="flex flex-col gap-1">
          {horarios.map((linha) => (
            <li key={linha} className="text-sm text-ed-ink-soft">
              {linha}
            </li>
          ))}
        </ul>
      </Revelar>

      <Revelar>
        {mapaCarregado ? (
          <iframe
            title="Mapa até o Edivertido Salão Inclusivo"
            src={`https://www.google.com/maps?q=${encodeURIComponent(endereco)}&output=embed`}
            className="aspect-video w-full rounded-2xl border-0"
            loading="lazy"
          />
        ) : (
          <button
            type="button"
            onClick={() => setMapaCarregado(true)}
            className="flex aspect-video w-full items-center justify-center rounded-2xl bg-ed-surface-2 text-sm font-bold text-ed-navy"
          >
            Ver mapa
          </button>
        )}
      </Revelar>

      <Revelar className="flex flex-wrap gap-3">
        <BotaoWhatsApp
          origem="final"
          className="hover-tatil inline-flex min-h-12 items-center rounded-full bg-ed-orange px-8 text-base font-bold text-ed-navy shadow-ed"
        >
          Falar no WhatsApp
        </BotaoWhatsApp>
        <a
          href={linkComoChegar()}
          target="_blank"
          rel="noopener noreferrer"
          className="hover-tatil inline-flex min-h-12 items-center rounded-full border border-ed-navy px-8 text-base font-bold text-ed-navy"
        >
          Como chegar
        </a>
      </Revelar>
    </section>
  );
}
