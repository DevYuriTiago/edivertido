import { Star } from "@phosphor-icons/react/dist/ssr";
import { NUMEROS, faixaNumerosCompleta } from "@/lib/conteudo/numeros";

// Prova em uma frase corrida, não no molde "número grande + legenda".
// Os números vêm da cliente e do Google Business Profile.
export function FaixaNumeros() {
  if (!faixaNumerosCompleta(NUMEROS)) return null;

  const nota = NUMEROS.notaGoogle.toLocaleString("pt-BR", {
    minimumFractionDigits: 1,
  });
  const atendimentos = NUMEROS.atendimentosRealizados.toLocaleString("pt-BR");

  return (
    <section aria-labelledby="prova-titulo" className="secao secao--branco py-16 md:py-20">
      <span className="costura" aria-hidden="true" />
      <h2 id="prova-titulo" className="sr-only">
        Quem já passou por aqui
      </h2>
      <p className="titulo titulo--frase mx-auto max-w-[1100px] px-5 text-center text-[clamp(1.9rem,1.2rem+2.6vw,3.4rem)] leading-[1.05] md:px-8">
        <span className="inline-flex items-center gap-2 whitespace-nowrap">
          Nota {nota}
          <Star weight="fill" className="text-ed-orange" aria-hidden="true" />
        </span>{" "}
        no Google, em {NUMEROS.avaliacoesGoogle} avaliações.{" "}
        <span className="whitespace-nowrap">{NUMEROS.anosDeOperacao} anos</span>{" "}
        cortando cabelo em Recife.{" "}
        {NUMEROS.atendimentosAproximado ? "Mais de " : ""}
        <span className="whitespace-nowrap">{atendimentos} atendimentos.</span>
      </p>
    </section>
  );
}
