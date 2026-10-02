export type IconeServico =
  | "tesoura"
  | "rosto"
  | "olho"
  | "crianca"
  | "pessoas"
  | "secador"
  | "sacola"
  | "infinito";

export type Servico = {
  nome: string;
  icone: IconeServico;
};

// Os 7 primeiros vêm do flyer da própria cliente (confirmado). O oitavo é
// o diferencial já confirmado em PRODUCT.md: atendimento com terapeuta ABA.
export const SERVICOS: Servico[] = [
  { nome: "Corte", icone: "tesoura" },
  { nome: "Barba", icone: "rosto" },
  { nome: "Sobrancelha", icone: "olho" },
  { nome: "Corte infantil", icone: "crianca" },
  { nome: "Masculino e feminino", icone: "pessoas" },
  { nome: "Penteados", icone: "secador" },
  { nome: "Venda de produtos", icone: "sacola" },
  { nome: "Atendimento inclusivo", icone: "infinito" },
];

export const SERVICOS_TITULO = "Um salão completo, que se encaixa em você";
