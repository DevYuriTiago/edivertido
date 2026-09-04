export type ParagrafoValor = {
  texto: string;
};

// Bloco 9 — CLAUDE.md §6: sem tabela, sem faixa, sem "a partir de".
// Conteúdo segue exatamente o critério que o próprio briefing manda
// explicar: o que pesa no valor, que ele é combinado antes da visita, e
// que sessão não concluída não vira cobrança dupla.
export const PARAGRAFOS_VALOR: ParagrafoValor[] = [
  {
    texto:
      "O valor muda de pessoa para pessoa porque o atendimento muda de pessoa para pessoa. O que pesa é o tempo e as adaptações que aquele atendimento precisa, não um diagnóstico ou uma idade.",
  },
  {
    texto:
      "Esse valor é combinado com você pelo WhatsApp, antes da visita. Você sabe quanto vai pagar antes de sair de casa.",
  },
  {
    texto:
      "Se o atendimento não for concluído no mesmo dia, isso não vira uma cobrança dobrada na próxima vez.",
  },
];
