export type FotoGaleria = {
  arquivo: string;
  alt: string;
};

// Material real da cliente. Autorização de imagem confirmada — geral e
// específica para a foto de desconforto (02) — ver TASKS.md > Bloqueios
// abertos. Nenhuma curadoria só-sorriso: o corte difícil (02) fica ao
// lado do resultado feliz (05), como CLAUDE.md §6 bloco 5 pede.
export const FOTOS_GALERIA: FotoGaleria[] = [
  {
    arquivo: "/marca/01.jpeg",
    alt: "Sala de espera do salão, com mesa de sinuca, mesas e balcão de recepção decorados com bandeirinhas coloridas.",
  },
  {
    arquivo: "/marca/03.jpeg",
    alt: "Criança deitada no chão durante o corte, cercada por acompanhantes. Ao fundo, um painel sensorial de brinquedos na parede.",
  },
  {
    arquivo: "/marca/02.jpeg",
    alt: "Criança no colo de um acompanhante durante o corte, expressando desconforto. Mechas de cabelo já cortadas espalhadas pelo chão.",
  },
  {
    arquivo: "/marca/05.jpeg",
    alt: "Barbeiro sorridente faz sinal de positivo ao lado de uma criança sorrindo, sentada em um carrinho de brinquedo depois do corte.",
  },
  {
    arquivo: "/marca/04.jpeg",
    alt: "Duas crianças na sala de espera sensorial: uma sentada brincando com um brinquedo de encaixe, outra em pé segurando um brinquedo.",
  },
];

export const FRASE_CONTEXTO_GALERIA =
  "Nem todo corte é fácil. Todos são concluídos do jeito que der certo para essa pessoa.";
