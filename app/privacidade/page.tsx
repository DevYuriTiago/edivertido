import type { Metadata } from "next";
import { SECOES_PRIVACIDADE } from "@/lib/conteudo/privacidade";

export const metadata: Metadata = {
  title: "Política de Privacidade | Edivertido Salão Inclusivo",
  description:
    "Como o Edivertido Salão Inclusivo trata os dados enviados pelo formulário do site.",
};

export default function Privacidade() {
  return (
    <main id="conteudo" className="mx-auto flex max-w-2xl flex-col gap-10 px-6 py-16 md:py-24">
      <h1>Política de Privacidade</h1>

      {SECOES_PRIVACIDADE.map((secao) => (
        <div key={secao.titulo} className="flex flex-col gap-3">
          <h2>{secao.titulo}</h2>
          {secao.paragrafos.map((paragrafo) => (
            <p key={paragrafo}>{paragrafo}</p>
          ))}
        </div>
      ))}
    </main>
  );
}
