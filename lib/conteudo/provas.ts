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
    titulo: "Terapeuta ABA ao lado da cadeira",
    descricao:
      "ABA é a Análise do Comportamento Aplicada. Quem acompanha o atendimento sabe ler os sinais de desconforto e ajustar o ritmo quando algo foge do esperado. Não é sorte, é preparo.",
  },
  {
    titulo: "O relógio é da pessoa, não do salão",
    descricao:
      "Ninguém corta com pressa. Se precisar de pausa, a pausa acontece. O horário se ajusta a quem está na cadeira, não o contrário.",
  },
  {
    titulo: "Sem plateia, sem olhar torto",
    descricao:
      "Ninguém parado olhando, ninguém comentando. O espaço é pensado para quem está sendo atendido, não para quem está por perto.",
  },
];
