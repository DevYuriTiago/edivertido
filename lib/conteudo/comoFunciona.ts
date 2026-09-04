export type EtapaComoFunciona = {
  titulo: string;
  descricao: string;
};

// Bloco 6 — CLAUDE.md §6: "prova de protocolo, não de boa vontade". Cada
// etapa usa só temas já estabelecidos em outros blocos (terapeuta ABA,
// tempo da pessoa, valor combinado antes) — nenhuma promessa operacional
// nova sem confirmação da cliente.
export const ETAPAS_COMO_FUNCIONA: EtapaComoFunciona[] = [
  {
    titulo: "Você chama no WhatsApp",
    descricao:
      "Conta o que precisa. A conversa já ajuda a gente a entender o contexto antes de marcar.",
  },
  {
    titulo: "Perfil sensorial, se quiser",
    descricao:
      "Um formulário curto e opcional ajuda a gente a se preparar antes da pessoa chegar.",
  },
  {
    titulo: "O valor é combinado antes",
    descricao:
      "Sem surpresa na hora de pagar. O valor é fechado antes da visita, não depois.",
  },
  {
    titulo: "Chegada sem fila",
    descricao:
      "O horário é reservado só para aquele atendimento, sem gente esperando do lado.",
  },
  {
    titulo: "Atendimento com terapeuta ABA",
    descricao:
      "Quem corta e quem acompanha já sabem o que fazer se for preciso parar ou ajustar o ritmo.",
  },
  {
    titulo: "O corte termina do jeito que der certo",
    descricao:
      "Sem roteiro fixo. O objetivo é terminar de um jeito que funcione para aquela pessoa.",
  },
];
