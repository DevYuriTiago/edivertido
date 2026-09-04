export type Prova = {
  titulo: string;
  descricao: string;
};

// As 3 provas de CLAUDE.md §6, bloco 4: "Terapeuta ABA · tempo da pessoa ·
// sem plateia". Descrição escrita para este projeto — nenhuma credencial
// específica é citada aqui (nome/formação da terapeuta seguem sem
// confirmação, ver TASKS.md), só o que a presença dela muda na prática.
export const PROVAS: [Prova, Prova, Prova] = [
  {
    titulo: "Terapeuta ABA no atendimento",
    descricao:
      "ABA é Análise do Comportamento Aplicada. A pessoa que atende já entende como reagir quando alguma coisa foge do esperado durante o corte. Não é sorte, é preparo.",
  },
  {
    titulo: "O tempo é da pessoa",
    descricao:
      "Sem corte cronometrado. Se for preciso parar, o horário se ajusta a quem está na cadeira, não o contrário.",
  },
  {
    titulo: "Sem plateia",
    descricao:
      "Sem gente parada olhando, sem comentário de quem não entende. O espaço é pensado para quem está sendo atendido, não para quem está por perto.",
  },
];
