import { Revelar } from "@/components/ui/Revelar";
import { OBJECOES, objecoesRespondidas } from "@/lib/conteudo/objecoes";

// Bloco 8 — <details>/<summary> nativos: teclado, estado de
// expandido/recolhido e leitura por AT vêm de graça do navegador, e o
// conteúdo continua no DOM mesmo fechado (indexável). Só renderiza
// objeções com resposta confirmada pela cliente; hoje são zero, então
// o bloco inteiro fica de fora até a primeira resposta chegar.
export function ObjecoesFrequentes() {
  const respondidas = objecoesRespondidas(OBJECOES);
  if (respondidas.length === 0) return null;

  return (
    <section
      aria-labelledby="objecoes-titulo"
      className="mx-auto flex max-w-2xl flex-col gap-6 px-6 py-16 md:py-20"
    >
      <Revelar>
        <h2 id="objecoes-titulo">E se...</h2>
      </Revelar>

      <div className="flex flex-col divide-y divide-ed-line border-y border-ed-line">
        {respondidas.map((objecao, indice) => (
          <Revelar key={objecao.pergunta} as="div" atraso={indice * 0.04}>
            <details className="group py-4">
              <summary className="text-h3 cursor-pointer list-none">
                {objecao.pergunta}
              </summary>
              <p className="pt-3">{objecao.resposta}</p>
            </details>
          </Revelar>
        ))}
      </div>
    </section>
  );
}
