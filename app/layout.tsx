import type { Metadata } from "next";
import { Grandstander, Atkinson_Hyperlegible_Next } from "next/font/google";
import { SensorialProvider } from "@/lib/sensorial";
import { PularParaConteudo } from "@/components/casca/PularParaConteudo";
import { Header } from "@/components/casca/Header";
import { BarraFixaMobile } from "@/components/casca/BarraFixaMobile";
import { schemaHairSalon } from "@/lib/schema";
import "./globals.css";

// Precisa rodar antes da primeira pintura para o modo "Tirar ruído" não
// piscar colorido antes de ficar branco. Mesma chave de lib/sensorial.ts,
// duplicada de propósito: roda como script cru, fora da árvore React.
const SCRIPT_SEM_RUIDO = `(function(){try{if(localStorage.getItem("ed-sem-ruido")==="1")document.documentElement.setAttribute("data-calmo","true")}catch(e){}})();`;

const grandstander = Grandstander({
  subsets: ["latin"],
  weight: ["700", "800", "900"],
  variable: "--font-titulo",
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
      className={`${grandstander.variable} ${atkinson.variable}`}
      // O script abaixo escreve data-calmo neste elemento antes da
      // hidratação, de propósito (evita flash de estado errado). React vai
      // ver um mismatch aqui; é esperado, mesmo padrão do next-themes.
      suppressHydrationWarning
    >
      <body className="antialiased">
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
          dangerouslySetInnerHTML={{ __html: SCRIPT_SEM_RUIDO }}
        />
        <SensorialProvider>
          <PularParaConteudo />
          <Header />
          <div className="pb-24 md:pb-0">
            {children}
          </div>
          <BarraFixaMobile />
        </SensorialProvider>
      </body>
    </html>
  );
}
