export type OpcaoDiagnostico = {
  valor: string;
  rotulo: string;
};

// "Sem diagnóstico" e "prefiro não dizer" são opções de primeira classe,
// não um afterthought — CLAUDE.md §9 (T9) exige as duas.
export const OPCOES_DIAGNOSTICO: OpcaoDiagnostico[] = [
  { valor: "tea", rotulo: "TEA (autismo)" },
  { valor: "tdah", rotulo: "TDAH" },
  { valor: "sindrome-down", rotulo: "Síndrome de Down" },
  { valor: "microcefalia", rotulo: "Microcefalia" },
  { valor: "deficiencia-intelectual", rotulo: "Deficiência intelectual" },
  { valor: "outra", rotulo: "Outra condição" },
  { valor: "sem-diagnostico", rotulo: "Sem diagnóstico" },
  { valor: "prefiro-nao-dizer", rotulo: "Prefiro não dizer" },
];

export type OpcaoGatilho = {
  valor: string;
  rotulo: string;
};

// Gatilhos específicos de um atendimento de corte, ecoando as mesmas
// situações do bloco de objeções (CLAUDE.md §6, bloco 8).
export const OPCOES_GATILHO: OpcaoGatilho[] = [
  { valor: "barulho-maquina", rotulo: "Barulho da máquina" },
  { valor: "toque-cabeca", rotulo: "Toque na cabeça ou no pescoço" },
  { valor: "cabelo-caindo", rotulo: "Cabelo caindo no corpo ou no rosto" },
  { valor: "ficar-parado", rotulo: "Ficar parado sentado por muito tempo" },
  { valor: "luz-forte", rotulo: "Luz forte" },
  { valor: "cheiro-produtos", rotulo: "Cheiro de produtos" },
  { valor: "capa-pescoco", rotulo: "Capa ou avental no pescoço" },
];

// Tudo opcional aqui, exceto os dois campos de contato — CLAUDE.md §9 (T9).
export type DadosPerfilSensorial = {
  nomePessoaAtendida?: string;
  idadeAproximada?: string;
  diagnosticos?: string[];
  gatilhos?: string[];
  oQueAjudaAcalmar?: string;
  nomeContato: string;
  whatsappContato: string;
};

function rotulosSelecionados(
  valores: string[] | undefined,
  opcoes: { valor: string; rotulo: string }[],
): string[] {
  if (!valores || valores.length === 0) return [];
  return opcoes
    .filter((opcao) => valores.includes(opcao.valor))
    .map((opcao) => opcao.rotulo);
}

// Mensagem legível por humano, nunca um despejo de JSON. Cada linha só
// aparece se aquele campo foi preenchido.
export function montarMensagemPerfilSensorial(
  dados: DadosPerfilSensorial,
): string {
  const linhas: string[] = ["Vim pelo formulário do site. Segue o perfil sensorial:"];

  const diagnosticos = rotulosSelecionados(dados.diagnosticos, OPCOES_DIAGNOSTICO);
  const gatilhos = rotulosSelecionados(dados.gatilhos, OPCOES_GATILHO);

  if (dados.nomePessoaAtendida) {
    const idade = dados.idadeAproximada ? `, ${dados.idadeAproximada}` : "";
    linhas.push("", `Pessoa atendida: ${dados.nomePessoaAtendida}${idade}`);
  }

  if (diagnosticos.length > 0) {
    linhas.push(`Diagnóstico: ${diagnosticos.join(", ")}`);
  }

  if (gatilhos.length > 0) {
    linhas.push(`O que costuma incomodar: ${gatilhos.join(", ")}`);
  }

  if (dados.oQueAjudaAcalmar) {
    linhas.push(`O que ajuda a acalmar: ${dados.oQueAjudaAcalmar}`);
  }

  linhas.push("", `Meu nome: ${dados.nomeContato}`, `Meu WhatsApp: ${dados.whatsappContato}`);

  return linhas.join("\n");
}
