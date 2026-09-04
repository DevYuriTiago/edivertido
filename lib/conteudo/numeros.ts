// Bloco condicional — CLAUDE.md §6, bloco 2. Só liga com os 4 dados
// comprovados ao mesmo tempo; "se qualquer um não puder ser comprovado, o
// bloco inteiro sai". nota/avaliações já vêm do Google Business Profile
// (ver TASKS.md > Bloqueios abertos); tempo de operação e número de
// atendimentos ainda não foram confirmados pela cliente.
export type FaixaNumeros = {
  notaGoogle?: number;
  avaliacoesGoogle?: number;
  anosDeOperacao?: number;
  atendimentosRealizados?: number;
};

export const NUMEROS: FaixaNumeros = {
  notaGoogle: 5.0,
  avaliacoesGoogle: 84,
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
