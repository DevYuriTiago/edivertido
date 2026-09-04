import {
  ENDERECO,
  HORARIO_FUNCIONAMENTO,
  TELEFONE_WHATSAPP_DIGITOS,
  type DiaSemana,
} from "@/lib/conteudo/contato";

// HairSalon + LocalBusiness — CLAUDE.md §11. Sem geo: nenhuma
// coordenada foi confirmada pela cliente, e inventar lat/long a partir
// de uma consulta de mapa não é a mesma coisa que dado confirmado.
// Sem legalName/CNPJ pelo mesmo motivo (ver TASKS.md > Bloqueios
// abertos). sameAs usa o Instagram documentado em CLAUDE.md §1
// (@edivertidooficial) — a divulgação recebida numa captura de tela
// era de uma conta diferente (@edbarbeiroinclusivo); confirmar antes
// de considerar isso definitivo.

const DIA_PARA_SCHEMA: Record<DiaSemana, string> = {
  segunda: "Monday",
  terca: "Tuesday",
  quarta: "Wednesday",
  quinta: "Thursday",
  sexta: "Friday",
  sabado: "Saturday",
  domingo: "Sunday",
};

function openingHoursSpecification() {
  return Object.entries(HORARIO_FUNCIONAMENTO)
    .filter(
      (
        entrada,
      ): entrada is [
        DiaSemana,
        NonNullable<(typeof HORARIO_FUNCIONAMENTO)[DiaSemana]>,
      ] => entrada[1] !== null,
    )
    .map(([dia, faixa]) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: `https://schema.org/${DIA_PARA_SCHEMA[dia]}`,
      opens: faixa.abre,
      closes: faixa.fecha,
    }));
}

export function schemaHairSalon(siteUrl?: string) {
  return {
    "@context": "https://schema.org",
    "@type": ["HairSalon", "LocalBusiness"],
    name: "Edivertido Salão Inclusivo",
    description:
      "Salão e barbearia em Recife com terapeuta ABA no atendimento, para crianças, adolescentes e adultos autistas, com TDAH, microcefalia e outras condições.",
    ...(siteUrl ? { url: siteUrl } : {}),
    telephone: `+${TELEFONE_WHATSAPP_DIGITOS}`,
    address: {
      "@type": "PostalAddress",
      streetAddress: ENDERECO.logradouro,
      addressLocality: ENDERECO.cidade,
      addressRegion: ENDERECO.estado,
      postalCode: ENDERECO.cep,
      addressCountry: "BR",
    },
    areaServed: ["Recife", "Olinda", "Jaboatão dos Guararapes", "Camaragibe"],
    openingHoursSpecification: openingHoursSpecification(),
    sameAs: ["https://www.instagram.com/edivertidooficial/"],
  };
}
