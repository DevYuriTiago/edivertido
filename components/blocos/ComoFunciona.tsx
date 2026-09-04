import { Revelar } from "@/components/ui/Revelar";
import { ETAPAS_COMO_FUNCIONA } from "@/lib/conteudo/comoFunciona";

// Bloco 6 — prova de protocolo, não de boa vontade: uma sequência
// numerada, concreta, do primeiro contato até o fim do corte.
export function ComoFunciona() {
  return (
    <section
      aria-labelledby="como-funciona-titulo"
      className="mx-auto flex max-w-3xl flex-col gap-8 px-6 py-16 md:py-20"
    >
      <Revelar>
        <h2 id="como-funciona-titulo">Como funciona</h2>
      </Revelar>

      <ol className="flex flex-col gap-6">
        {ETAPAS_COMO_FUNCIONA.map((etapa, indice) => (
          <Revelar key={etapa.titulo} as="li" atraso={indice * 0.05}>
            <div className="flex gap-4">
              <span
                aria-hidden="true"
                className="text-h3 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-ed-surface-2 text-ed-navy"
              >
                {indice + 1}
              </span>
              <div className="flex flex-col gap-1 pt-1">
                <h3>{etapa.titulo}</h3>
                <p>{etapa.descricao}</p>
              </div>
            </div>
          </Revelar>
        ))}
      </ol>
    </section>
  );
}
