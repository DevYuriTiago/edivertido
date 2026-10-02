import type { CSSProperties, ReactNode } from "react";
import { caminhoPeca, FOLGA, type Bordas } from "@/lib/puzzle";

type PecaProps = {
  id: string;
  bordas: Bordas;
  largura?: number;
  altura?: number;
  className?: string;
  // true: o conteúdo (uma foto) ocupa a caixa inteira, encaixes inclusos
  sangria?: boolean;
  children: ReactNode;
};

// Ocupa exatamente a célula que a contém (o corpo da peça) e transborda
// pela folga em volta para os encaixes. Duas peças vizinhas com bordas
// opostas se fecham sem fresta. No modo "Tirar ruído", o CSS desfaz o
// transbordo e o recorte: vira um retângulo simples.
export function Peca({
  id,
  bordas,
  largura = 1,
  altura = 1,
  className = "",
  sangria = false,
  children,
}: PecaProps) {
  const { d } = caminhoPeca(bordas, largura, altura);
  const folga = FOLGA * Math.min(largura, altura);

  const caixa: CSSProperties = {
    left: `${(-folga / largura) * 100}%`,
    top: `${(-folga / altura) * 100}%`,
    width: `${((largura + folga * 2) / largura) * 100}%`,
    height: `${((altura + folga * 2) / altura) * 100}%`,
  };

  return (
    <div className="peca-caixa absolute" style={caixa}>
      <svg width="0" height="0" className="absolute" aria-hidden="true">
        <clipPath id={id} clipPathUnits="objectBoundingBox">
          <path d={d} />
        </clipPath>
      </svg>
      <div
        className={`peca-corte relative h-full w-full ${className}`}
        style={{ clipPath: `url(#${id})` }}
      >
        {sangria ? (
          <>
            {children}
            {/* Linha de corte visível: sem ela, fotos vizinhas viram uma
                colagem com buracos em vez de peças encaixadas. */}
            <svg
              viewBox="0 0 1 1"
              preserveAspectRatio="none"
              className="pointer-events-none absolute inset-0 h-full w-full"
              aria-hidden="true"
            >
              <path
                d={d}
                className="peca-contorno"
                fill="none"
                strokeWidth={6}
                vectorEffect="non-scaling-stroke"
              />
            </svg>
          </>
        ) : (
          <div className="peca-miolo absolute" style={miolo(bordas, folga, largura, altura)}>
            {children}
          </div>
        )}
      </div>
    </div>
  );
}

// Área útil da peça dentro da caixa, para posicionar texto: o corpo, menos
// a profundidade do encaixe nos lados "dentro", por onde o encaixe da
// vizinha entra e cobriria o texto.
function miolo(
  bordas: Bordas,
  folga: number,
  largura: number,
  altura: number,
): CSSProperties {
  const caixaL = largura + folga * 2;
  const caixaA = altura + folga * 2;
  // O mesmo recuo nos dois lados opostos mantém o texto centrado no corpo,
  // então rótulos vizinhos ficam alinhados na mesma linha.
  const recuo = (a: Bordas[keyof Bordas], b: Bordas[keyof Bordas]) =>
    a === "dentro" || b === "dentro" ? folga : 0;
  const recuoX = recuo(bordas.esquerda, bordas.direita);
  const recuoY = recuo(bordas.topo, bordas.base);
  const esquerda = folga + recuoX;
  const topo = folga + recuoY;
  const l = largura - recuoX * 2;
  const a = altura - recuoY * 2;
  return {
    left: `${(esquerda / caixaL) * 100}%`,
    top: `${(topo / caixaA) * 100}%`,
    width: `${(l / caixaL) * 100}%`,
    height: `${(a / caixaA) * 100}%`,
  };
}
