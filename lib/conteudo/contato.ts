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
