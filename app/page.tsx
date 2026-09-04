import { ReguladorSensorial } from "@/components/tatil/ReguladorSensorial";
import { TracoAssinatura } from "@/components/marca/TracoAssinatura";

export default function Home() {
  return (
    <main className="mx-auto flex max-w-3xl flex-col gap-16 px-6 py-16 md:py-32">
      <TracoAssinatura
        modo="progresso"
        className="fixed right-4 top-24 z-50 w-24 sm:w-32"
      />

      <header className="flex flex-col gap-3">
        <p className="text-eyebrow text-ed-ink-soft">Fundação · T1 a T4</p>
        <h1>Tokens de cor e escala tipográfica</h1>
        <p>
          Página de verificação da fundação do projeto: os três tons da marca
          e a escala tipográfica completa, mobile e desktop.
        </p>
      </header>

      <section aria-labelledby="tons-titulo" className="flex flex-col gap-4">
        <h2 id="tons-titulo">Os três tons</h2>
        <div className="grid gap-4 sm:grid-cols-3">
          <div className="flex h-28 flex-col justify-end rounded-2xl bg-ed-navy p-4">
            <span className="text-sm text-ed-white">Navy: texto branco</span>
          </div>
          <div className="flex h-28 flex-col justify-end rounded-2xl bg-ed-orange p-4">
            <span className="text-sm text-ed-navy">Laranja: texto navy</span>
          </div>
          <div className="flex h-28 flex-col justify-end rounded-2xl bg-ed-green p-4">
            <span className="text-sm text-ed-navy">Verde: texto navy</span>
          </div>
        </div>
      </section>

      <section
        aria-labelledby="escala-titulo"
        className="flex flex-col gap-6 border-t border-ed-line pt-12"
      >
        <h2 id="escala-titulo">Escala tipográfica</h2>
        <div className="flex flex-col gap-6">
          <p className="text-h1">Estilo H1: 34px a 56px</p>
          <p className="text-h2">Estilo H2: 26px a 38px</p>
          <p className="text-h3">Estilo H3: 20px a 24px</p>
          <p>
            Corpo em Atkinson Hyperlegible Next, 17px a 18px, desenhada pelo
            Braille Institute para diferenciar caracteres em baixa visão.
          </p>
          <p className="text-sm">
            Texto pequeno, 15px, para legendas e apoio.
          </p>
        </div>
      </section>

      <section
        aria-labelledby="regulador-titulo"
        className="flex flex-col items-center gap-6 border-t border-ed-line pt-12"
      >
        <h2 id="regulador-titulo">Regulador sensorial</h2>
        <ReguladorSensorial />
      </section>

      <section
        aria-labelledby="traco-titulo"
        className="flex flex-col items-center gap-8 border-t border-ed-line pt-12"
      >
        <h2 id="traco-titulo">Traço-assinatura</h2>

        <div className="flex flex-col items-center gap-2">
          <p className="text-sm text-ed-ink-soft">
            Loader (recarregue a página para ver de novo)
          </p>
          <TracoAssinatura modo="loader" className="w-48" />
        </div>

        <div className="flex flex-col items-center gap-2">
          <p className="text-sm text-ed-ink-soft">
            Progresso (o mesmo do canto superior direito, acompanha o scroll)
          </p>
          <TracoAssinatura modo="progresso" className="w-48" />
        </div>

        <div className="flex w-full flex-col items-center gap-2">
          <p className="text-sm text-ed-ink-soft">
            Divisor (estático, usado entre blocos)
          </p>
          <TracoAssinatura modo="divisor" className="h-6 w-full" />
        </div>
      </section>

      <div className="h-[60vh]" aria-hidden="true" />
    </main>
  );
}
