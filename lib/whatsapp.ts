import { TELEFONE_WHATSAPP_DIGITOS } from "@/lib/conteudo/contato";
import {
  montarMensagemPerfilSensorial,
  type DadosPerfilSensorial,
} from "@/lib/conteudo/formPerfilSensorial";

// Única fonte das mensagens de WhatsApp do site — CLAUDE.md §7. Nunca monte
// uma URL de WhatsApp fora daqui: a origem muda a mensagem, e a mensagem
// muda a qualidade da conversa que chega para a cliente.
export type OrigemWhatsApp =
  | "barra-fixa"
  | "hero"
  | "galeria"
  | "valor"
  | "final";

const MENSAGENS: Record<OrigemWhatsApp, string> = {
  "barra-fixa": "Oi! Vim pelo site e queria falar com vocês.",
  hero: "Oi! Vim pelo site e queria entender como funciona o atendimento.",
  galeria: "Oi! Vi as fotos no site e queria saber como vocês cuidam de um corte mais difícil.",
  valor: "Oi! Queria saber o valor para o meu caso.",
  final: "Oi! Vim pelo site e queria marcar um horário.",
};

export function linkWhatsApp(origem: OrigemWhatsApp): string {
  const mensagem = MENSAGENS[origem];
  const parametros = new URLSearchParams({ text: mensagem });
  return `https://wa.me/${TELEFONE_WHATSAPP_DIGITOS}?${parametros.toString()}`;
}

// Origem própria do formulário do T9: mensagem estruturada, montada a
// partir do que a pessoa preencheu, nunca um despejo de JSON.
export function linkWhatsAppPerfilSensorial(
  dados: DadosPerfilSensorial,
): string {
  const mensagem = montarMensagemPerfilSensorial(dados);
  const parametros = new URLSearchParams({ text: mensagem });
  return `https://wa.me/${TELEFONE_WHATSAPP_DIGITOS}?${parametros.toString()}`;
}
