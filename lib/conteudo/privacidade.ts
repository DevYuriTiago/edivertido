export type SecaoPrivacidade = {
  titulo: string;
  paragrafos: string[];
};

// Página mínima, criada agora porque o formulário do T9 precisa linkar
// para /privacidade antes do envio. Completa de verdade no T11 (JSON-LD,
// CNPJ e razão social quando confirmados — ver TASKS.md > Bloqueios
// abertos). Tudo aqui é derivado da arquitetura real do site, nada
// inventado: não há backend, banco de dados, nem autenticação
// (CLAUDE.md §9), então essa política descreve exatamente o que
// acontece com o dado, não uma promessa genérica.
export const SECOES_PRIVACIDADE: SecaoPrivacidade[] = [
  {
    titulo: "Quem trata os seus dados",
    paragrafos: [
      "Este site é do Edivertido Salão Inclusivo, salão e barbearia na Rua do Cupim, 53, Graças, Recife, PE.",
      "A razão social e o CNPJ ainda não estão publicados aqui porque não foram confirmados até o momento. Assim que estiverem, esta página é atualizada.",
    ],
  },
  {
    titulo: "Como os dados do formulário chegam até a gente",
    paragrafos: [
      "Este site não tem servidor, banco de dados ou login. O formulário de perfil sensorial monta uma mensagem com o que você preencheu e abre o WhatsApp com essa mensagem pronta, no seu próprio celular.",
      "Nada do que você escreve no formulário passa por um servidor deste site antes de chegar até o WhatsApp. O envio só acontece se você mesma tocar em enviar, dentro do WhatsApp.",
    ],
  },
  {
    titulo: "Que dados o formulário pede",
    paragrafos: [
      "Nome e uma forma de contato são os únicos campos obrigatórios. Todo o resto, incluindo diagnóstico e perfil sensorial, é opcional e só é enviado se você preencher.",
      "Diagnóstico e perfil sensorial são dados sensíveis de saúde. Eles só existem na mensagem que você decide enviar, com a finalidade específica de preparar o atendimento antes da visita.",
    ],
  },
  {
    titulo: "Seus direitos",
    paragrafos: [
      "Você pode pedir a qualquer momento, pelo WhatsApp do salão, para saber o que foi enviado, corrigir uma informação ou pedir para não usarmos mais os dados enviados.",
    ],
  },
];
