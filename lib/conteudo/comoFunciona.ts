export type EtapaComoFunciona = {
  titulo: string;
  descricao: string;
};

// Bloco 6 — CLAUDE.md §6: "prova de protocolo, não de boa vontade". Cada
// etapa usa só temas já estabelecidos em outros blocos (terapeuta ABA,
// tempo da pessoa, valor combinado antes) — nenhuma promessa operacional
// nova sem confirmação da cliente.
export const COMO_FUNCIONA_INTRO =
  "Nenhuma etapa é surpresa. É assim do primeiro oi até o último fio.";

export const ETAPAS_COMO_FUNCIONA: EtapaComoFunciona[] = [
  {
    titulo: "Você chama no WhatsApp",
    descricao:
      "Conta quem vai ser atendido e o que costuma ser difícil. Ninguém julga, ninguém apressa.",
  },
  {
    titulo: "Perfil sensorial, se quiser",
    descricao:
      "Barulho, toque, luz: você conta o que incomoda e a equipe se prepara antes da chegada.",
  },
  {
    titulo: "O valor é combinado antes",
    descricao:
      "Você sabe quanto vai pagar antes de sair de casa. Sem surpresa no caixa.",
  },
  {
    titulo: "Chegada sem fila",
    descricao:
      "O horário é só daquele atendimento. Ninguém esperando do lado.",
  },
  {
    titulo: "Terapeuta ABA junto",
    descricao:
      "Quem corta e quem acompanha sabem quando pausar, mudar o ritmo ou tentar de outro jeito.",
  },
  {
    titulo: "Termina do jeito que der certo",
    descricao:
      "Na cadeira, no colo, no chão ou no carrinho. O que importa é terminar bem para aquela pessoa.",
  },
];
