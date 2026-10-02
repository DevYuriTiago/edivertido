"use client";

import { motion } from "framer-motion";
import { Peca } from "@/components/puzzle/Peca";
import { bordasNaGrade } from "@/lib/puzzle";
import { useSensorial } from "@/lib/sensorial";
import { COMO_FUNCIONA_INTRO, ETAPAS_COMO_FUNCIONA } from "@/lib/conteudo/comoFunciona";

// A reprise do momento do herói: as seis etapas chegam e se encaixam uma
// atrás da outra, na ordem em que acontecem. Aqui a numeração é real:
// é uma sequência. Peças largas para o texto caber longe dos encaixes.
function Corrente({
  colunas,
  largura,
  altura,
  prefixo,
}: {
  colunas: number;
  largura: number;
  altura: number;
  prefixo: string;
}) {
  const { movimento } = useSensorial();
  const linhas = Math.ceil(ETAPAS_COMO_FUNCIONA.length / colunas);

  return (
    <ol
      className="quebra-cabeca grid"
      style={{ gridTemplateColumns: `repeat(${colunas}, minmax(0, 1fr))` }}
    >
      {ETAPAS_COMO_FUNCIONA.map((etapa, indice) => {
        const linha = Math.floor(indice / colunas);
        const coluna = indice % colunas;
        const clara = (linha + coluna) % 2 === 0;
        return (
          <li
            key={etapa.titulo}
            className="relative"
            style={{ aspectRatio: `${largura} / ${altura}` }}
          >
            <motion.div
              className="mov absolute inset-0"
              initial={movimento > 0 ? { opacity: 0, y: 40, rotate: indice % 2 ? 5 : -5 } : false}
              whileInView={{ opacity: 1, y: 0, rotate: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ type: "spring", duration: 0.7, bounce: 0.25, delay: coluna * 0.12 }}
            >
              <Peca
                id={`${prefixo}-${indice}`}
                bordas={bordasNaGrade(linha, coluna, linhas, colunas)}
                largura={largura}
                altura={altura}
                className={`peca-cor ${clara ? "bg-ed-white text-ed-navy" : "bg-ed-navy text-ed-white"}`}
              >
                <div className="flex h-full items-center gap-4 px-[7%] md:gap-6">
                  <span
                    className="titulo shrink-0 text-[clamp(3rem,2rem+3vw,5rem)] leading-none"
                    aria-hidden="true"
                  >
                    {indice + 1}
                  </span>
                  <div>
                    <h3 className="titulo text-[clamp(1.2rem,1rem+0.8vw,1.75rem)] leading-[1.02]">
                      {etapa.titulo}
                    </h3>
                    <p className="mt-2 text-[0.95rem] leading-snug md:text-base">
                      {etapa.descricao}
                    </p>
                  </div>
                </div>
              </Peca>
            </motion.div>
          </li>
        );
      })}
    </ol>
  );
}

export function ComoFunciona() {
  return (
    <section aria-labelledby="como-funciona-titulo" className="secao secao--verde">
      <span className="costura" aria-hidden="true" />
      <div className="mx-auto max-w-[1100px] px-5 md:px-8">
        <h2 id="como-funciona-titulo" className="titulo titulo-2">
          Como funciona
        </h2>
        <p className="medida mt-5 text-lg">
          {COMO_FUNCIONA_INTRO}
        </p>

        <div className="so-ruido mt-14 px-[6%] md:hidden">
          <Corrente colunas={1} largura={4} altura={3} prefixo="etapa-m" />
        </div>
        <div className="so-ruido mx-auto mt-16 hidden max-w-[980px] px-[4%] md:block">
          <Corrente colunas={2} largura={3} altura={2} prefixo="etapa-d" />
        </div>

        <div className="so-calmo">
        <ol className="mt-10 grid gap-8 md:grid-cols-2">
          {ETAPAS_COMO_FUNCIONA.map((etapa, indice) => (
            <li key={etapa.titulo}>
              <h3 className="titulo titulo-3">
                {indice + 1}. {etapa.titulo}
              </h3>
              <p className="mt-2 text-ed-ink-soft">{etapa.descricao}</p>
            </li>
          ))}
        </ol>
        </div>
      </div>
    </section>
  );
}
