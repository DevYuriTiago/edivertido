// Geometria das peças de quebra-cabeça. Cada borda é "lisa", "fora"
// (encaixe saliente) ou "dentro" (encaixe vazado); peças vizinhas
// recebem bordas opostas para encaixarem de verdade.

export type Borda = "lisa" | "fora" | "dentro";

export type Bordas = {
  topo: Borda;
  direita: Borda;
  base: Borda;
  esquerda: Borda;
};

// Altura do encaixe em fração do menor lado da peça. A caixa da peça
// ganha essa folga em todos os lados para o encaixe caber.
export const FOLGA = 0.24;

// Curva do encaixe numa borda unitária: x ao longo da borda, y para fora.
const MOLDE: [number, number][][] = [
  [[0.4, 0], [0.42, 0.048], [0.38, 0.096]],
  [[0.32, 0.176], [0.4, 0.24], [0.5, 0.24]],
  [[0.6, 0.24], [0.68, 0.176], [0.62, 0.096]],
  [[0.58, 0.048], [0.6, 0], [0.66, 0]],
];

type Ponto = [number, number];

function borda(
  inicio: Ponto,
  dir: Ponto,
  comprimento: number,
  tamanho: number,
  tipo: Borda,
): string {
  const fim: Ponto = [
    inicio[0] + dir[0] * comprimento,
    inicio[1] + dir[1] * comprimento,
  ];
  if (tipo === "lisa") return `L${fim[0]} ${fim[1]}`;

  const sinal = tipo === "fora" ? 1 : -1;
  // normal para fora da peça percorrida no sentido horário
  const normal: Ponto = [dir[1], -dir[0]];
  const p = (x: number, y: number): string => {
    const u = comprimento / 2 + tamanho * (x - 0.5);
    const v = tamanho * y * sinal;
    return `${inicio[0] + dir[0] * u + normal[0] * v} ${inicio[1] + dir[1] * u + normal[1] * v}`;
  };

  const partes = [`L${p(0.34, 0)}`];
  for (const [a, b, c] of MOLDE) {
    partes.push(`C${p(a[0], a[1])} ${p(b[0], b[1])} ${p(c[0], c[1])}`);
  }
  partes.push(`L${fim[0]} ${fim[1]}`);
  return partes.join(" ");
}

// Caminho da peça normalizado para 0..1 na caixa (corpo + folga), pronto
// para clipPathUnits="objectBoundingBox". largura/altura em "células".
export function caminhoPeca(
  bordas: Bordas,
  largura = 1,
  altura = 1,
): { d: string; proporcao: number } {
  const tamanho = Math.min(largura, altura);
  const folga = FOLGA * tamanho;
  const caixaL = largura + folga * 2;
  const caixaA = altura + folga * 2;

  const d = [
    `M${folga} ${folga}`,
    borda([folga, folga], [1, 0], largura, tamanho, bordas.topo),
    borda([folga + largura, folga], [0, 1], altura, tamanho, bordas.direita),
    borda([folga + largura, folga + altura], [-1, 0], largura, tamanho, bordas.base),
    borda([folga, folga + altura], [0, -1], altura, tamanho, bordas.esquerda),
    "Z",
  ].join(" ");

  // normaliza cada coordenada pela caixa
  const normalizado = d.replace(
    /(-?\d*\.?\d+(?:e-?\d+)?) (-?\d*\.?\d+(?:e-?\d+)?)/g,
    (_, x: string, y: string) =>
      `${(Number(x) / caixaL).toFixed(5)} ${(Number(y) / caixaA).toFixed(5)}`,
  );

  return { d: normalizado, proporcao: caixaL / caixaA };
}

// Grade em que toda borda interna encaixa: padrão de xadrez, borda
// externa lisa.
export function bordasNaGrade(
  linha: number,
  coluna: number,
  linhas: number,
  colunas: number,
): Bordas {
  const par = (linha + coluna) % 2 === 0;
  const parEsquerda = (linha + coluna - 1) % 2 === 0;
  const parAcima = (linha - 1 + coluna) % 2 === 0;
  return {
    topo: linha === 0 ? "lisa" : parAcima ? "fora" : "dentro",
    direita: coluna === colunas - 1 ? "lisa" : par ? "fora" : "dentro",
    base: linha === linhas - 1 ? "lisa" : par ? "dentro" : "fora",
    esquerda: coluna === 0 ? "lisa" : parEsquerda ? "dentro" : "fora",
  };
}
