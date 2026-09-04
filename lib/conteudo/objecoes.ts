export type Objecao = {
  pergunta: string;
  resposta?: string;
};

// Bloco 8 — perguntas literais do briefing (CLAUDE.md §6). As respostas
// precisam ser operacionais e concretas, vindas da cliente — nenhuma
// delas está confirmada ainda (ver TASKS.md > Bloqueios abertos), então
// nenhuma objeção renderiza hoje. "Fica tranquila, temos paciência" não
// é resposta válida: só entra o que a cliente confirmar que a equipe
// realmente faz nesses casos.
export const OBJECOES: Objecao[] = [
  { pergunta: "E se ele não quiser sentar na cadeira?" },
  { pergunta: "E se ela não deixar encostarem na cabeça dela?" },
  { pergunta: "E se o barulho da máquina for demais?" },
  { pergunta: "E se não der para terminar o corte hoje?" },
  { pergunta: "E se ele tiver uma crise no meio?" },
  { pergunta: "E se a gente precisar ir embora antes?" },
];

export function objecoesRespondidas(objecoes: Objecao[]): Required<Objecao>[] {
  return objecoes.filter(
    (objecao): objecao is Required<Objecao> => objecao.resposta !== undefined,
  );
}
