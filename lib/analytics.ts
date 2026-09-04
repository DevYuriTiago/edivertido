// Ponte agnóstica de provedor: empilha em window.dataLayer (convenção do
// Google Tag Manager). Funciona mesmo antes de qualquer container carregar
// — quando a cliente configurar a propriedade própria dela (CLAUDE.md §9),
// os eventos já disparados aqui são lidos normalmente. Eventos rastreados
// em CLAUDE.md §7: whatsapp_click, galeria_aberta, form_etapa_1..4,
// form_enviado, regulador_usado.

type EventoAnalytics = {
  evento: string;
  [propriedade: string]: unknown;
};

declare global {
  interface Window {
    dataLayer?: EventoAnalytics[];
  }
}

export function rastrear(
  evento: string,
  propriedades: Record<string, unknown> = {},
): void {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer ?? [];
  window.dataLayer.push({ evento, ...propriedades });
}
