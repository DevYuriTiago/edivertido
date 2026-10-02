import { Hero } from "@/components/blocos/Hero";
import { FaixaNumeros } from "@/components/blocos/FaixaNumeros";
import { Servicos } from "@/components/blocos/Servicos";
import { Inclusivo } from "@/components/blocos/Inclusivo";
import { GaleriaReal } from "@/components/galeria/GaleriaReal";
import { ComoFunciona } from "@/components/blocos/ComoFunciona";
import { ObjecoesFrequentes } from "@/components/blocos/ObjecoesFrequentes";
import { AntesDaVisita } from "@/components/blocos/AntesDaVisita";
import { OndeEstamos } from "@/components/blocos/OndeEstamos";

export default function Home() {
  return (
    <main id="conteudo">
      <Hero />
      <FaixaNumeros />
      <Servicos />
      <Inclusivo />
      <GaleriaReal />
      <ComoFunciona />
      {/* Depoimentos em vídeo: sem vídeo real ainda, ver TASKS.md. */}
      <ObjecoesFrequentes />
      <AntesDaVisita />
      <OndeEstamos />
    </main>
  );
}
