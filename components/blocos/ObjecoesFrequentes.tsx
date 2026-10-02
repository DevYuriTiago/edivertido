import { OBJECOES, objecoesRespondidas } from "@/lib/conteudo/objecoes";

// <details>/<summary> nativos: teclado, estado de expandido/recolhido e
// leitura por AT vêm de graça do navegador. Só renderiza objeções com
// resposta confirmada pela cliente; hoje são zero, então o bloco inteiro
// fica de fora até a primeira resposta chegar.
export function ObjecoesFrequentes() {
  const respondidas = objecoesRespondidas(OBJECOES);
  if (respondidas.length === 0) return null;

  return (
    <section aria-labelledby="objecoes-titulo" className="secao secao--navy">
      <span className="costura" aria-hidden="true" />
      <div className="mx-auto max-w-[860px] px-5 md:px-8">
        <h2 id="objecoes-titulo" className="titulo titulo-2">
          E se...
        </h2>
        <div className="rodape mt-10 divide-y divide-current/20 border-b border-current/20">
          {respondidas.map((objecao) => (
            <details key={objecao.pergunta} className="py-5">
              <summary className="titulo titulo-3 cursor-pointer list-none">
                {objecao.pergunta}
              </summary>
              <p className="medida pt-3">{objecao.resposta}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
