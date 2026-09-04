// Bloco condicional — CLAUDE.md §6, bloco 2. Só liga com os 4 dados
// comprovados ao mesmo tempo; "se qualquer um não puder ser comprovado, o
// bloco inteiro sai". nota/avaliações vêm do Google Business Profile;
// anos de operação e atendimentos confirmados pela cliente em 2026-09-04
// (ver TASKS.md > Bloqueios abertos).
export type FaixaNumeros = {
  notaGoogle?: number;
  avaliacoesGoogle?: number;
  anosDeOperacao?: number;
  atendimentosRealizados?: number;
  // true = exibe "X+" em vez do valor exato. A cliente informou
  // "mais de 2k", não um número fechado — CLAUDE.md §12 proíbe "mais de"
  // pra disfarçar chute, mas isso não é chute nosso, é a própria cliente
  // relatando um piso, não uma contagem exata. Trata como faixa honesta,
  // não como número preciso.
  atendimentosAproximado?: boolean;
};

export const NUMEROS: FaixaNumeros = {
  notaGoogle: 5.0,
  avaliacoesGoogle: 84,
  anosDeOperacao: 5,
  atendimentosRealizados: 2000,
  atendimentosAproximado: true,
};

type FaixaNumerosCompleta = Required<FaixaNumeros>;

export function faixaNumerosCompleta(
  dados: FaixaNumeros,
): dados is FaixaNumerosCompleta {
  return (
    dados.notaGoogle !== undefined &&
    dados.avaliacoesGoogle !== undefined &&
    dados.anosDeOperacao !== undefined &&
    dados.atendimentosRealizados !== undefined
  );
}
