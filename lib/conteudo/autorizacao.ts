// Termo de autorização de uso de imagem. Mudou qualquer cláusula ou opção?
// Suba a VERSAO_DO_TERMO: ela é gravada em cada autorização, para saber
// depois exatamente qual texto a pessoa aceitou.
export const VERSAO_DO_TERMO = "2026-10-06";

export const AUTORIZACAO_TITULO = "Autorização de uso de imagem";
export const AUTORIZACAO_INTRO =
  "Leva um minuto. Você escolhe onde as fotos e os vídeos do atendimento podem aparecer, e pode cancelar quando quiser.";

export const RESPONSAVEL_PELO_SALAO = "Edivertido Salão Inclusivo (Ednark Teles da Silva)";

export type QuemAssina = "proprio" | "responsavel" | "curador";

export const OPCOES_QUEM_ASSINA: { valor: QuemAssina; rotulo: string }[] = [
  { valor: "proprio", rotulo: "Sou eu quem aparece nas imagens e tenho 18 anos ou mais" },
  { valor: "responsavel", rotulo: "Sou mãe, pai ou responsável legal de quem aparece" },
  { valor: "curador", rotulo: "Sou curadora ou curador de quem aparece" },
];

export type UsoImagem = "redes" | "site" | "anuncios";

export const OPCOES_DE_USO: { valor: UsoImagem; rotulo: string }[] = [
  { valor: "redes", rotulo: "Instagram e outras redes sociais do salão" },
  { valor: "site", rotulo: "Site do salão" },
  { valor: "anuncios", rotulo: "Anúncios pagos do salão" },
];

export const PERGUNTA_ROSTO = "O rosto pode aparecer?";
export const AJUDA_ROSTO =
  "Se marcar não, o salão só usa imagens em que a pessoa não pode ser reconhecida.";

export const ROTULO_MOMENTOS_DIFICEIS =
  "Também autorizo imagens de momentos difíceis do atendimento, como choro ou desconforto.";
export const AJUDA_MOMENTOS_DIFICEIS =
  "Opcional. O salão mostra esses momentos para outras famílias verem que nem todo corte é fácil.";

export const ROTULO_DECLARACAO =
  "Li o termo acima e declaro que as informações que preenchi são verdadeiras.";

// As cláusulas usam {pessoa} para o nome de quem aparece nas imagens.
export const CLAUSULAS: string[] = [
  `Autorizo o ${RESPONSAVEL_PELO_SALAO} a usar fotos e vídeos feitos durante o atendimento de {pessoa}, somente nos usos que marquei neste termo.`,
  "A autorização é gratuita: não há pagamento pelo uso das imagens.",
  "Ela vale até eu pedir o cancelamento. Posso cancelar a qualquer momento, pelo e-mail gestaoedivertido@gmail.com ou pelo WhatsApp (81) 99331-2424, e o salão retira as imagens do site e das redes sociais dele.",
  "O salão não usa as imagens de forma ofensiva nem fora do contexto do atendimento.",
  "Meu nome, CPF, WhatsApp e assinatura ficam guardados pelo salão como prova desta autorização.",
];

export const ERROS = {
  quemAssina: "Escolha quem está assinando.",
  nomePessoa: "Escreva o nome de quem aparece nas imagens.",
  nomeAssinante: "Escreva o seu nome completo.",
  cpf: "Digite um CPF válido, com 11 números.",
  whatsapp: "Digite o celular com DDD, no formato (81) 9.0000-0000.",
  usos: "Marque pelo menos um lugar onde as imagens podem aparecer.",
  rosto: "Escolha sim ou não.",
  declaracao: "Marque que leu o termo para continuar.",
  assinatura: "Assine no quadro, com o dedo ou o mouse.",
  envio:
    "Não conseguimos registrar agora. Confira a internet e tente de novo. Se continuar, avise a equipe do salão.",
};

export type RegistroAutorizacao = {
  protocolo: string;
  assinadoEm: string;
  quemAssina: QuemAssina;
  nomePessoa: string;
  nomeAssinante: string;
  cpf: string;
  whatsapp: string;
  usos: UsoImagem[];
  rosto: boolean;
  momentosDificeis: boolean;
};

export function clausulasPara(nomePessoa: string): string[] {
  return CLAUSULAS.map((c) => c.replace("{pessoa}", nomePessoa || "quem aparece nas imagens"));
}
