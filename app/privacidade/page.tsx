import type { Metadata } from "next";
import Link from "next/link";
import {
  PRIVACIDADE_ATUALIZADA_EM,
  SECOES_PRIVACIDADE,
} from "@/lib/conteudo/privacidade";

export const metadata: Metadata = {
  title: "Política de Privacidade | Edivertido Salão Inclusivo",
  description:
    "Como o Edivertido Salão Inclusivo trata os dados enviados pelo site: o que pedimos, quem acessa, por quanto tempo guardamos e como pedir a exclusão.",
  alternates: {
    canonical: "/privacidade",
  },
};

export default function Privacidade() {
  return (
    <main id="conteudo" className="mx-auto max-w-[760px] px-5 py-16 md:px-8 md:py-24">
      <h1 className="titulo titulo-2">Política de privacidade</h1>
      <p className="mt-4 text-ed-ink-soft">
        Atualizada em {PRIVACIDADE_ATUALIZADA_EM}.
      </p>

      <div className="mt-12 flex flex-col gap-10">
        {SECOES_PRIVACIDADE.map((secao) => (
          <section key={secao.titulo} className="flex flex-col gap-3">
            <h2 className="titulo titulo-3">{secao.titulo}</h2>
            {secao.paragrafos.map((paragrafo) => (
              <p key={paragrafo}>{paragrafo}</p>
            ))}
          </section>
        ))}
      </div>

      <p className="mt-14">
        <Link href="/" className="font-bold underline underline-offset-4">
          Voltar para o site
        </Link>
      </p>
    </main>
  );
}
