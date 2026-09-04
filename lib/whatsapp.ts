import { TELEFONE_WHATSAPP_DIGITOS } from "@/lib/conteudo/contato";

// Única fonte das mensagens de WhatsApp do site — CLAUDE.md §7. Nunca monte
// uma URL de WhatsApp fora daqui: a origem muda a mensagem, e a mensagem
// muda a qualidade da conversa que chega para a cliente.
export type OrigemWhatsApp = "barra-fixa";

const MENSAGENS: Record<OrigemWhatsApp, string> = {
  "barra-fixa": "Vim pelo site e queria falar com vocês.",
};

export function linkWhatsApp(origem: OrigemWhatsApp): string {
  const mensagem = MENSAGENS[origem];
  const parametros = new URLSearchParams({ text: mensagem });
  return `https://wa.me/${TELEFONE_WHATSAPP_DIGITOS}?${parametros.toString()}`;
}
