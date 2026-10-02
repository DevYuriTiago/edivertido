import { TELEFONE_WHATSAPP_DIGITOS } from "@/lib/conteudo/contato";
import {
  montarMensagemDireta,
  montarMensagemPerfilSensorial,
  type DadosPerfilSensorial,
  type DadosMensagemDireta,
} from "@/lib/conteudo/formPerfilSensorial";

// Única fonte dos links de WhatsApp do site. Nunca monte uma URL de
// WhatsApp fora daqui. Os CTAs da página não abrem o WhatsApp direto:
// levam ao perfil sensorial, e é ele que gera um destes dois links.

// De onde veio o clique no CTA, para o evento cta_click.
export type OrigemCta = "header" | "barra-fixa" | "hero" | "galeria" | "valor" | "final";

function link(mensagem: string): string {
  const parametros = new URLSearchParams({ text: mensagem });
  return `https://wa.me/${TELEFONE_WHATSAPP_DIGITOS}?${parametros.toString()}`;
}

// Quem respondeu que a pessoa não tem sensibilidade sensorial.
export function linkWhatsAppDireto(dados: DadosMensagemDireta): string {
  return link(montarMensagemDireta(dados));
}

// Quem preencheu o perfil sensorial completo.
export function linkWhatsAppPerfilSensorial(dados: DadosPerfilSensorial): string {
  return link(montarMensagemPerfilSensorial(dados));
}
