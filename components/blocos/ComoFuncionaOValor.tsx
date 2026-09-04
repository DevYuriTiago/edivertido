import { Revelar } from "@/components/ui/Revelar";
import { BotaoWhatsApp } from "@/components/ui/BotaoWhatsApp";
import { PARAGRAFOS_VALOR } from "@/lib/conteudo/valor";

// Bloco 9 — remove a objeção de custo sem tabela de preço. O medo aqui
// não é gastar, é ser surpreendida na hora de pagar (CLAUDE.md §6).
export function ComoFuncionaOValor() {
  return (
    <section
      aria-labelledby="valor-titulo"
      className="mx-auto flex max-w-2xl flex-col gap-6 px-6 py-16 md:py-20"
    >
      <Revelar>
        <h2 id="valor-titulo">Como funciona o valor</h2>
      </Revelar>

      <div className="flex flex-col gap-4">
        {PARAGRAFOS_VALOR.map((paragrafo, indice) => (
          <Revelar key={paragrafo.texto} atraso={indice * 0.06}>
            <p>{paragrafo.texto}</p>
          </Revelar>
        ))}
      </div>

      <Revelar atraso={PARAGRAFOS_VALOR.length * 0.06}>
        <BotaoWhatsApp
          origem="valor"
          className="hover-tatil inline-flex min-h-12 items-center rounded-full bg-ed-orange px-6 text-sm font-bold text-ed-navy shadow-ed"
        >
          Quero saber o valor para o meu caso
        </BotaoWhatsApp>
      </Revelar>
    </section>
  );
}
