// Dados confirmados em TASKS.md > Bloqueios abertos. Nada aqui é chute:
// se um dado novo precisar entrar, ele vem confirmado ou não entra.

export type Endereco = {
  logradouro: string;
  bairro: string;
  cidade: string;
  estado: string;
  cep: string;
};

export const ENDERECO: Endereco = {
  logradouro: "Rua do Cupim, 53",
  bairro: "Graças",
  cidade: "Recife",
  estado: "PE",
  cep: "52011-170",
};

export function enderecoCompleto(endereco: Endereco = ENDERECO): string {
  return `${endereco.logradouro}, ${endereco.bairro}, ${endereco.cidade} - ${endereco.estado}, ${endereco.cep}`;
}

export function linkComoChegar(endereco: Endereco = ENDERECO): string {
  const destino = encodeURIComponent(enderecoCompleto(endereco));
  return `https://www.google.com/maps/dir/?api=1&destination=${destino}`;
}

// Dígitos apenas, formato internacional, como o wa.me exige.
export const TELEFONE_WHATSAPP_DIGITOS = "5581988041234";

export type DiaSemana =
  | "segunda"
  | "terca"
  | "quarta"
  | "quinta"
  | "sexta"
  | "sabado"
  | "domingo";

export type FaixaHorario = { abre: string; fecha: string };

// null = fechado no dia
export const HORARIO_FUNCIONAMENTO: Record<DiaSemana, FaixaHorario | null> = {
  segunda: { abre: "09:00", fecha: "18:00" },
  terca: { abre: "09:00", fecha: "18:00" },
  quarta: { abre: "09:00", fecha: "18:00" },
  quinta: { abre: "09:00", fecha: "18:00" },
  sexta: { abre: "09:00", fecha: "18:00" },
  sabado: { abre: "09:00", fecha: "18:00" },
  domingo: null,
};

const ORDEM_DIAS: DiaSemana[] = [
  "segunda",
  "terca",
  "quarta",
  "quinta",
  "sexta",
  "sabado",
  "domingo",
];

const NOME_DIA: Record<DiaSemana, string> = {
  segunda: "Segunda",
  terca: "Terça",
  quarta: "Quarta",
  quinta: "Quinta",
  sexta: "Sexta",
  sabado: "Sábado",
  domingo: "Domingo",
};

function mesmaFaixa(a: FaixaHorario | null, b: FaixaHorario | null): boolean {
  if (a === null || b === null) return a === b;
  return a.abre === b.abre && a.fecha === b.fecha;
}

// Agrupa dias consecutivos com o mesmo horário ("Segunda a Sábado: 09:00
// às 18:00") em vez de repetir uma linha por dia. Genérico de propósito:
// continua correto se o horário deixar de ser uniforme no futuro.
export function faixasFormatadas(
  horario: Record<DiaSemana, FaixaHorario | null> = HORARIO_FUNCIONAMENTO,
): string[] {
  const grupos: { dias: DiaSemana[]; faixa: FaixaHorario | null }[] = [];

  for (const dia of ORDEM_DIAS) {
    const faixa = horario[dia];
    const grupoAtual = grupos[grupos.length - 1];
    if (grupoAtual && mesmaFaixa(grupoAtual.faixa, faixa)) {
      grupoAtual.dias.push(dia);
    } else {
      grupos.push({ dias: [dia], faixa });
    }
  }

  return grupos.map(({ dias, faixa }) => {
    const rotuloDias =
      dias.length === 1
        ? NOME_DIA[dias[0]]
        : `${NOME_DIA[dias[0]]} a ${NOME_DIA[dias[dias.length - 1]]}`;
    const rotuloHorario = faixa ? `${faixa.abre} às ${faixa.fecha}` : "Fechado";
    return `${rotuloDias}: ${rotuloHorario}`;
  });
}

// Crédito da agência no rodapé (pedido da Prompts360, 2026-10-02).
export const CREDITO_AGENCIA = {
  prefixo: "Site desenvolvido pela",
  nome: "Prompts360",
  url: "https://prompts360.com.br",
};
