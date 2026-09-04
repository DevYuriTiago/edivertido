import type { Metadata } from "next";
import { Archivo, Atkinson_Hyperlegible_Next } from "next/font/google";
import { SensorialProvider } from "@/lib/sensorial";
import { PularParaConteudo } from "@/components/casca/PularParaConteudo";
import { Header } from "@/components/casca/Header";
import { BarraFixaMobile } from "@/components/casca/BarraFixaMobile";
import { LoaderInicial } from "@/components/casca/LoaderInicial";
import { schemaHairSalon } from "@/lib/schema";
import "./globals.css";

// Precisa rodar antes da primeira pintura para não haver flash de estado
// errado. Mantém a mesma lógica de lib/sensorial.ts (chave, 0.6, 0), mas
// duplicada aqui de propósito: roda como script cru, fora da árvore React.
const SCRIPT_NIVEL_SENSORIAL = `(function(){try{var c="ed-sensorial-nivel";var s=localStorage.getItem(c);var n;if(s!==null){var v=parseFloat(s);if(!isNaN(v))n=v;}if(n===undefined){n=matchMedia("(prefers-reduced-motion: reduce)").matches?0:0.6;}n=Math.min(1,Math.max(0,n));document.documentElement.style.setProperty("--ed-nivel",String(n));}catch(e){}})();`;

const archivo = Archivo({
  subsets: ["latin"],
  variable: "--font-archivo",
  display: "swap",
});

const atkinson = Atkinson_Hyperlegible_Next({
  subsets: ["latin"],
  variable: "--font-atkinson",
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;

// Título literal de CLAUDE.md §11, com um ajuste: o original usa "—"
// antes de "Edivertido", e a regra de copy do projeto proíbe travessão
// em qualquer texto do site, sem exceção — troquei pelo mesmo "|" que
// já separa os outros dois blocos, mantendo a intenção de busca intacta.
const TITULO_SITE =
  "Salão e Barbearia Inclusivos em Recife | Atendimento a Autistas | Edivertido";
const DESCRICAO_SITE =
  "Salão e barbearia em Recife (Graças), com terapeuta ABA no atendimento a criança autista, pessoa com TEA, TDAH e outras condições. Também atende adolescentes e adultos.";

export const metadata: Metadata = {
  ...(siteUrl ? { metadataBase: new URL(siteUrl) } : {}),
  title: TITULO_SITE,
  description: DESCRICAO_SITE,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: TITULO_SITE,
    description: DESCRICAO_SITE,
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: TITULO_SITE,
    description: DESCRICAO_SITE,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${archivo.variable} ${atkinson.variable}`}
      // O script abaixo escreve --ed-nivel no style deste elemento antes da
      // hidratação, de propósito (evita flash de estado errado). React vai
      // ver um mismatch aqui; é esperado, mesmo padrão do next-themes.
      suppressHydrationWarning
    >
      <body className="bg-ed-surface text-ed-ink font-body antialiased">
        <script
          type="application/ld+json"
          // JSON.stringify já escapa aspas; troca "<" por escape unicode
          // pra nenhuma string de dado conseguir fechar a tag </script>
          // antes da hora (nenhum dado aqui vem de usuário, mas custa
          // nada manter o hábito).
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(schemaHairSalon(siteUrl)).replace(
              /</g,
              "\\u003c",
            ),
          }}
        />
        <script
          dangerouslySetInnerHTML={{ __html: SCRIPT_NIVEL_SENSORIAL }}
        />
        <SensorialProvider>
          <LoaderInicial />
          <PularParaConteudo />
          {/* Header e barra mobile ficam fora do filtro de saturação de
              propósito: o CTA precisa continuar alcançável e legível em
              qualquer nível sensorial (CLAUDE.md §5, regra 1). */}
          <Header />
          <div className="ed-superficie-sensorial pb-24 md:pb-0">
            {children}
          </div>
          <BarraFixaMobile />
        </SensorialProvider>
      </body>
    </html>
  );
}
