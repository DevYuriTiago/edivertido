import { Revelar } from "@/components/ui/Revelar";
import { NUMEROS, faixaNumerosCompleta } from "@/lib/conteudo/numeros";

// Bloco 2 — condicional. CLAUDE.md §6: só entra com nota+avaliações do
// Google, tempo de operação e número de atendimentos comprovados ao mesmo
// tempo; sem os 4, o bloco inteiro sai. Confirmados em 2026-09-04.
export function FaixaNumeros() {
  if (!faixaNumerosCompleta(NUMEROS)) return null;

  const atendimentosFormatado = NUMEROS.atendimentosRealizados.toLocaleString(
    "pt-BR",
  );

  const itens = [
    {
      valor: `${NUMEROS.notaGoogle.toLocaleString("pt-BR")} ★`,
      rotulo: `nota no Google, ${NUMEROS.avaliacoesGoogle} avaliações`,
    },
    {
      valor: `${NUMEROS.anosDeOperacao}`,
      rotulo:
        NUMEROS.anosDeOperacao === 1 ? "ano de funcionamento" : "anos de funcionamento",
    },
    {
      // "+" quando o número é um piso informado pela cliente, não uma
      // contagem exata (ver o comentário em lib/conteudo/numeros.ts).
      valor: NUMEROS.atendimentosAproximado
        ? `${atendimentosFormatado}+`
        : atendimentosFormatado,
      rotulo: "atendimentos realizados",
    },
  ];

  return (
    <section
      aria-labelledby="numeros-titulo"
      className="mx-auto max-w-5xl px-6 py-12"
    >
      <h2 id="numeros-titulo" className="sr-only">
        Números que comprovam
      </h2>
      <Revelar className="grid gap-8 sm:grid-cols-3">
        <>
          {itens.map((item) => (
            <div key={item.rotulo} className="flex flex-col gap-1 text-center">
              <p className="text-h2">{item.valor}</p>
              <p className="text-sm text-ed-ink-soft">{item.rotulo}</p>
            </div>
          ))}
        </>
      </Revelar>
    </section>
  );
}
