// Endereço público do site: uma fonte de verdade para metadataBase
// (imagem de compartilhamento, canonical), sitemap, robots e JSON-LD.
//
// Ordem: variável explícita > URL de produção que a Netlify injeta no
// build (URL) > domínio do cliente. Nunca cai em localhost: foi isso
// que deixou a prévia do WhatsApp sem imagem (og:image apontando para
// http://localhost:3000 em produção).
const DOMINIO_PADRAO = "https://edivertido.com.br";

function semBarraFinal(url: string): string {
  return url.replace(/\/+$/, "");
}

export const SITE_URL = semBarraFinal(
  process.env.NEXT_PUBLIC_SITE_URL ||
    (process.env.NETLIFY === "true" && process.env.URL) ||
    DOMINIO_PADRAO,
);
