import { Revelar } from "@/components/ui/Revelar";
import { PROVAS } from "@/lib/conteudo/provas";

const [primeira, segunda, terceira] = PROVAS;

// Bloco 4 — 3 provas concretas, com peso visual desigual de propósito: a
// terapeuta ABA é o diferencial central, então ganha mais espaço e um
// título maior. Nada de grade de 3 cards idênticos.
export function OQueMudaAqui() {
  return (
    <section
      aria-labelledby="muda-titulo"
      className="mx-auto flex max-w-5xl flex-col gap-10 px-6 py-16 md:py-20"
    >
      <Revelar>
        <h2 id="muda-titulo">O que muda aqui</h2>
      </Revelar>

      <div className="flex flex-col gap-10 md:grid md:grid-cols-12 md:gap-x-8 md:gap-y-10">
        <Revelar className="md:col-span-7">
          <div className="flex flex-col gap-3">
            <h3 className="text-h2">{primeira.titulo}</h3>
            <p className="max-w-md">{primeira.descricao}</p>
          </div>
        </Revelar>

        <Revelar className="md:col-span-5 md:pt-2" atraso={0.08}>
          <div className="flex flex-col gap-3">
            <h3>{segunda.titulo}</h3>
            <p>{segunda.descricao}</p>
          </div>
        </Revelar>

        <Revelar className="md:col-span-7" atraso={0.16}>
          <div className="flex flex-col gap-3">
            <h3>{terceira.titulo}</h3>
            <p className="max-w-md">{terceira.descricao}</p>
          </div>
        </Revelar>
      </div>
    </section>
  );
}
