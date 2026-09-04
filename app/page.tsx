import { Hero } from "@/components/blocos/Hero";
import { FaixaNumeros } from "@/components/blocos/FaixaNumeros";
import { VoceJaPassou } from "@/components/blocos/VoceJaPassou";
import { OQueMudaAqui } from "@/components/blocos/OQueMudaAqui";
import { GaleriaReal } from "@/components/galeria/GaleriaReal";
import { TracoAssinatura } from "@/components/marca/TracoAssinatura";

export default function Home() {
  return (
    <>
      <TracoAssinatura
        modo="progresso"
        className="fixed bottom-4 right-4 z-30 hidden w-16 md:block"
      />

      <main id="conteudo">
        <Hero />
        <FaixaNumeros />

        <TracoAssinatura modo="divisor" className="mx-auto h-6 w-40" />
        <VoceJaPassou />

        <TracoAssinatura modo="divisor" className="mx-auto h-6 w-40" />
        <OQueMudaAqui />

        <TracoAssinatura modo="divisor" className="mx-auto h-6 w-40" />
        <GaleriaReal />
      </main>
    </>
  );
}
