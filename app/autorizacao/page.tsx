import type { Metadata } from "next";
import { FormularioAutorizacao } from "@/components/autorizacao/FormularioAutorizacao";
import { AUTORIZACAO_INTRO, AUTORIZACAO_TITULO } from "@/lib/conteudo/autorizacao";

// Página de uso no balcão (QR code): fora da busca e fora do sitemap.
export const metadata: Metadata = {
  title: "Autorização de uso de imagem | Edivertido Salão Inclusivo",
  description: "Termo de autorização de uso de imagem do Edivertido Salão Inclusivo.",
  robots: { index: false, follow: false },
  alternates: { canonical: "/autorizacao" },
};

export default function Autorizacao() {
  return (
    <main id="conteudo" className="pagina-autorizacao mx-auto max-w-[760px] px-5 py-14 md:px-8 md:py-20">
      <h1 className="titulo titulo-2 nao-imprimir">{AUTORIZACAO_TITULO}</h1>
      <p className="nao-imprimir mt-4 text-lg">{AUTORIZACAO_INTRO}</p>
      <div className="mt-10">
        <FormularioAutorizacao />
      </div>
    </main>
  );
}
