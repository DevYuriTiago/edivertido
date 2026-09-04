import { Revelar } from "@/components/ui/Revelar";
import { ITENS_DOR, FECHO_DOR } from "@/lib/conteudo/dor";

// Bloco 3 — espelha a dor, cria identificação. Não precisa convencer de
// nada ainda: só precisa fazer a mãe pensar "é exatamente isso".
export function VoceJaPassou() {
  return (
    <section
      aria-labelledby="dor-titulo"
      className="mx-auto flex max-w-2xl flex-col gap-8 px-6 py-16 md:py-20"
    >
      <Revelar>
        <h2 id="dor-titulo">Você já passou por isso?</h2>
      </Revelar>

      <ul role="list" className="flex list-none flex-col gap-4">
        {ITENS_DOR.map((item, indice) => (
          <Revelar
            key={item.texto}
            as="li"
            atraso={indice * 0.06}
            className="border-l-2 border-ed-line pl-4"
          >
            {item.texto}
          </Revelar>
        ))}
      </ul>

      <Revelar atraso={ITENS_DOR.length * 0.06}>
        <p className="text-h3">{FECHO_DOR}</p>
      </Revelar>
    </section>
  );
}
