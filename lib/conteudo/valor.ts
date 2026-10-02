export type ParagrafoValor = {
  texto: string;
};

// Bloco 9 — CLAUDE.md §6: sem tabela, sem faixa, sem "a partir de".
// Conteúdo segue exatamente o critério que o próprio briefing manda
// explicar: o que pesa no valor, que ele é combinado antes da visita, e
// que sessão não concluída não vira cobrança dupla.
export const VALOR_TITULO = "Sem surpresa na hora de pagar";

export const PARAGRAFOS_VALOR: ParagrafoValor[] = [
  {
    texto:
      "Não existe tabela fixa, porque não existe atendimento igual. O que define o valor é o tempo e as adaptações que aquela pessoa precisa, nunca o diagnóstico ou a idade.",
  },
  {
    texto:
      "O valor é combinado com você pelo WhatsApp, antes da visita. Você sai de casa sabendo quanto vai pagar.",
  },
  {
    texto:
      "E se o corte não terminar no mesmo dia, isso não vira cobrança dobrada na próxima vez.",
  },
];
