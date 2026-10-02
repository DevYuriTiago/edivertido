import {
  Scissors,
  UserCircle,
  Eye,
  Smiley,
  Users,
  HairDryer,
  ShoppingBag,
  Infinity as InfinitoIcone,
} from "@phosphor-icons/react/dist/ssr";
import type { Icon } from "@phosphor-icons/react";
import { Peca } from "@/components/puzzle/Peca";
import { bordasNaGrade } from "@/lib/puzzle";
import {
  SERVICOS,
  SERVICOS_TITULO,
  type IconeServico,
} from "@/lib/conteudo/servicos";

const ICONES: Record<IconeServico, Icon> = {
  tesoura: Scissors,
  rosto: UserCircle,
  olho: Eye,
  crianca: Smiley,
  pessoas: Users,
  secador: HairDryer,
  sacola: ShoppingBag,
  infinito: InfinitoIcone,
};

// Navy com texto branco, branco e verde com texto navy: nunca texto branco
// sobre verde ou laranja.
const CORES = [
  "bg-ed-navy text-ed-white",
  "bg-ed-white text-ed-navy",
  "bg-ed-green text-ed-navy",
];

function Grade({ colunas, prefixo }: { colunas: number; prefixo: string }) {
  const linhas = Math.ceil(SERVICOS.length / colunas);
  return (
    <ul
      role="list"
      className="quebra-cabeca grid"
      style={{ gridTemplateColumns: `repeat(${colunas}, minmax(0, 1fr))` }}
    >
      {SERVICOS.map((servico, indice) => {
        const linha = Math.floor(indice / colunas);
        const coluna = indice % colunas;
        const IconeServico = ICONES[servico.icone];
        const cor = CORES[(linha + coluna * 2) % CORES.length];
        return (
          <li key={servico.nome} className="relative aspect-square">
            <Peca
              id={`${prefixo}-${indice}`}
              bordas={bordasNaGrade(linha, coluna, linhas, colunas)}
              className={`peca-cor ${cor}`}
            >
              <div className="flex h-full flex-col items-center justify-center gap-2 p-2 text-center md:gap-3">
                <IconeServico size={36} weight="bold" aria-hidden="true" />
                <span className="titulo text-[clamp(1rem,0.8rem+0.7vw,1.4rem)] leading-none">
                  {servico.nome}
                </span>
              </div>
            </Peca>
          </li>
        );
      })}
    </ul>
  );
}

export function Servicos() {
  return (
    <section aria-labelledby="servicos-titulo" className="secao secao--laranja">
      <span className="costura" aria-hidden="true" />
      <div className="mx-auto max-w-[1100px] px-5 md:px-8">
        <h2 id="servicos-titulo" className="titulo titulo-2 max-w-[14ch]">
          {SERVICOS_TITULO}
        </h2>
        <div className="mt-14 px-[6%] md:hidden">
          <Grade colunas={2} prefixo="servico-m" />
        </div>
        <div className="mt-16 hidden px-[4%] md:block">
          <Grade colunas={4} prefixo="servico-d" />
        </div>
      </div>
    </section>
  );
}
