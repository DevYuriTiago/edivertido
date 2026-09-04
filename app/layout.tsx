import type { Metadata } from "next";
import { Archivo, Atkinson_Hyperlegible_Next } from "next/font/google";
import { SensorialProvider } from "@/lib/sensorial";
import { PularParaConteudo } from "@/components/casca/PularParaConteudo";
import { Header } from "@/components/casca/Header";
import { BarraFixaMobile } from "@/components/casca/BarraFixaMobile";
import { LoaderInicial } from "@/components/casca/LoaderInicial";
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

export const metadata: Metadata = {
  ...(siteUrl ? { metadataBase: new URL(siteUrl) } : {}),
  title: "Edivertido Salão Inclusivo",
  description:
    "Salão e barbearia em Recife com atendimento especializado a pessoas neurodivergentes.",
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
