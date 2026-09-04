import { ReguladorSensorial } from "@/components/tatil/ReguladorSensorial";

export default function Home() {
  return (
    <main className="mx-auto flex max-w-3xl flex-col gap-16 px-6 py-16 md:py-32">
      <header className="flex flex-col gap-3">
        <p className="text-eyebrow text-ed-ink-soft">Fundação · T1 a T3</p>
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
    </main>
  );
}
