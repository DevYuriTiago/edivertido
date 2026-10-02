import Image from "next/image";
import { Peca } from "@/components/puzzle/Peca";
import { PROVAS } from "@/lib/conteudo/provas";

export function Inclusivo() {
  return (
    <section aria-labelledby="inclusivo-titulo" className="secao secao--branco">
      <span className="costura" aria-hidden="true" />
      <div className="mx-auto grid max-w-[1240px] items-center gap-16 px-5 md:px-8 lg:grid-cols-12 lg:gap-12">
        <div className="mx-auto w-full max-w-[460px] px-[10%] lg:col-span-5 lg:max-w-none lg:px-[8%]">
          <div className="quebra-cabeca relative aspect-[4/5]">
            <Peca
              id="inclusivo-foto"
              bordas={{ topo: "lisa", direita: "lisa", base: "dentro", esquerda: "fora" }}
              largura={4}
              altura={5}
              sangria
            >
              <Image
                src="/marca/03.jpeg"
                alt="Criança deitada no chão durante o corte, cercada por acompanhantes, com um painel sensorial de brinquedos na parede ao fundo."
                fill
                sizes="(min-width: 1024px) 34vw, 80vw"
                className="object-cover"
              />
            </Peca>
          </div>
        </div>

        <div className="lg:col-span-7">
          <h2 id="inclusivo-titulo" className="titulo titulo-2 max-w-[16ch]">
            Feito também para quem é autista ou neurodivergente
          </h2>
          <p className="medida mt-6 text-lg">
            Já saiu de um salão no meio do corte, ou ouviu que a criança era
            &ldquo;malcriada&rdquo;? Aqui o atendimento é preparado para isso,
            para crianças, adolescentes e adultos.
          </p>

          <ul role="list" className="mt-12 grid gap-10 md:grid-cols-2">
            {PROVAS.map((prova, indice) => (
              <li
                key={prova.titulo}
                className={indice === 0 ? "md:col-span-2" : undefined}
              >
                <h3 className="titulo titulo-3">{prova.titulo}</h3>
                <p className="medida mt-3 text-ed-ink-soft">{prova.descricao}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
