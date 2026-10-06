"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { QuadroAssinatura } from "./QuadroAssinatura";
import { Comprovante } from "./Comprovante";
import { cpfValido, mascararCpf } from "@/lib/cpf";
import {
  DIGITOS_CELULAR,
  aplicarMascaraAoDigitar,
  somenteDigitos,
} from "@/lib/telefone";
import { rastrear } from "@/lib/analytics";
import {
  AJUDA_MOMENTOS_DIFICEIS,
  AJUDA_ROSTO,
  ERROS,
  OPCOES_DE_USO,
  OPCOES_QUEM_ASSINA,
  PERGUNTA_ROSTO,
  ROTULO_DECLARACAO,
  ROTULO_MOMENTOS_DIFICEIS,
  VERSAO_DO_TERMO,
  clausulasPara,
  type QuemAssina,
  type RegistroAutorizacao,
  type UsoImagem,
} from "@/lib/conteudo/autorizacao";

const CAMPO =
  "min-h-12 w-full rounded-2xl border border-ed-line bg-ed-white px-4 text-ed-ink";
const OPCAO =
  "flex min-h-12 cursor-pointer items-start gap-3 rounded-2xl border border-ed-line bg-ed-white px-4 py-3 has-[:checked]:border-ed-navy has-[:checked]:shadow-[inset_0_0_0_1px_var(--navy)]";
const MARCA = "mt-0.5 h-5 w-5 shrink-0 accent-ed-navy";

type Erros = Partial<Record<keyof typeof ERROS, string>>;

function novoProtocolo(agora: Date): string {
  const data = agora.toISOString().slice(0, 10).replace(/-/g, "");
  const aleatorio = crypto.getRandomValues(new Uint32Array(1))[0]
    .toString(36)
    .toUpperCase()
    .padStart(6, "0")
    .slice(-6);
  return `ED-${data}-${aleatorio}`;
}

const simNao = (valor: boolean) => (valor ? "sim" : "não");

export function FormularioAutorizacao() {
  const [quemAssina, setQuemAssina] = useState<QuemAssina | "">("");
  const [nomePessoa, setNomePessoa] = useState("");
  const [nomeAssinante, setNomeAssinante] = useState("");
  const [cpf, setCpf] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [usos, setUsos] = useState<UsoImagem[]>([]);
  const [rosto, setRosto] = useState<"sim" | "nao" | "">("");
  const [momentosDificeis, setMomentosDificeis] = useState(false);
  const [declarou, setDeclarou] = useState(false);
  const [assinou, setAssinou] = useState(false);
  const [erros, setErros] = useState<Erros>({});
  const [enviando, setEnviando] = useState(false);
  const [registro, setRegistro] = useState<RegistroAutorizacao | null>(null);
  const [assinaturaUrl, setAssinaturaUrl] = useState("");
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const pessoa = quemAssina === "proprio" ? nomeAssinante : nomePessoa;

  function validar(): Erros {
    const e: Erros = {};
    if (!quemAssina) e.quemAssina = ERROS.quemAssina;
    if (quemAssina && quemAssina !== "proprio" && !nomePessoa.trim()) {
      e.nomePessoa = ERROS.nomePessoa;
    }
    if (nomeAssinante.trim().split(/\s+/).length < 2) e.nomeAssinante = ERROS.nomeAssinante;
    if (!cpfValido(cpf)) e.cpf = ERROS.cpf;
    if (somenteDigitos(whatsapp).length !== DIGITOS_CELULAR) e.whatsapp = ERROS.whatsapp;
    if (usos.length === 0) e.usos = ERROS.usos;
    if (!rosto) e.rosto = ERROS.rosto;
    if (!declarou) e.declaracao = ERROS.declaracao;
    if (!assinou) e.assinatura = ERROS.assinatura;
    return e;
  }

  async function aoEnviar(evento: React.FormEvent<HTMLFormElement>) {
    evento.preventDefault();
    const novosErros = validar();
    setErros(novosErros);
    if (Object.keys(novosErros).length > 0) {
      // leva o foco ao primeiro campo com problema
      requestAnimationFrame(() => {
        formRef.current
          ?.querySelector<HTMLElement>("[aria-invalid='true'], [data-erro='true']")
          ?.focus();
      });
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas || !quemAssina || !rosto) return;
    // lido antes do primeiro await: depois dele o evento já foi liberado
    const armadilha =
      (evento.currentTarget.elements.namedItem("bot-field") as HTMLInputElement | null)?.value ?? "";
    setEnviando(true);

    const agora = new Date();
    const novo: RegistroAutorizacao = {
      protocolo: novoProtocolo(agora),
      assinadoEm: agora.toISOString(),
      quemAssina,
      nomePessoa: pessoa.trim(),
      nomeAssinante: nomeAssinante.trim(),
      cpf,
      whatsapp,
      usos,
      rosto: rosto === "sim",
      momentosDificeis,
    };

    try {
      const imagem = await new Promise<Blob | null>((ok) => canvas.toBlob(ok, "image/png"));
      if (!imagem) throw new Error("assinatura");

      const dados = new FormData();
      dados.append("form-name", "autorizacao-imagem");
      dados.append("bot-field", armadilha);
      dados.append("protocolo", novo.protocolo);
      dados.append("versao_do_termo", VERSAO_DO_TERMO);
      dados.append("assinado_em", novo.assinadoEm);
      dados.append("quem_assina", OPCOES_QUEM_ASSINA.find((o) => o.valor === quemAssina)?.rotulo ?? quemAssina);
      dados.append("pessoa_nas_imagens", novo.nomePessoa);
      dados.append("nome_de_quem_assina", novo.nomeAssinante);
      dados.append("cpf_de_quem_assina", novo.cpf);
      dados.append("whatsapp", novo.whatsapp);
      dados.append("uso_redes_sociais", simNao(usos.includes("redes")));
      dados.append("uso_site", simNao(usos.includes("site")));
      dados.append("uso_anuncios_pagos", simNao(usos.includes("anuncios")));
      dados.append("pode_mostrar_o_rosto", simNao(novo.rosto));
      dados.append("momentos_dificeis", simNao(momentosDificeis));
      dados.append("termo_aceito", clausulasPara(novo.nomePessoa).join("\n"));
      dados.append("assinatura", imagem, `assinatura-${novo.protocolo}.png`);

      const resposta = await fetch("/__forms.html", { method: "POST", body: dados });
      if (!resposta.ok) throw new Error(String(resposta.status));

      setAssinaturaUrl(canvas.toDataURL("image/png"));
      setRegistro(novo);
      rastrear("autorizacao_enviada");
      window.scrollTo({ top: 0 });
    } catch {
      setErros({ envio: ERROS.envio });
    } finally {
      setEnviando(false);
    }
  }

  if (registro) {
    return <Comprovante registro={registro} assinaturaUrl={assinaturaUrl} />;
  }

  const erro = (chave: keyof typeof ERROS, id: string) =>
    erros[chave] ? (
      <p id={id} role="alert" className="font-bold">
        {erros[chave]}
      </p>
    ) : null;

  return (
    <form ref={formRef} onSubmit={aoEnviar} noValidate className="flex flex-col gap-10">
      <p className="hidden">
        <label>
          Não preencha este campo: <input name="bot-field" tabIndex={-1} autoComplete="off" />
        </label>
      </p>

      <fieldset className="flex flex-col gap-3">
        <legend className="titulo titulo-3 mb-3">Quem está assinando?</legend>
        {OPCOES_QUEM_ASSINA.map((opcao, indice) => (
          <label key={opcao.valor} className={OPCAO}>
            <input
              type="radio"
              name="quem-assina"
              className={MARCA}
              checked={quemAssina === opcao.valor}
              onChange={() => setQuemAssina(opcao.valor)}
              data-erro={indice === 0 && erros.quemAssina ? "true" : undefined}
              aria-describedby={erros.quemAssina ? "erro-quem" : undefined}
            />
            {opcao.rotulo}
          </label>
        ))}
        {erro("quemAssina", "erro-quem")}
      </fieldset>

      <div className="flex flex-col gap-5">
        <h2 className="titulo titulo-3">Seus dados</h2>

        {quemAssina !== "" && quemAssina !== "proprio" && (
          <div className="flex flex-col gap-2">
            <label htmlFor="nome-pessoa" className="font-bold">
              Nome completo de quem aparece nas imagens
            </label>
            <input
              id="nome-pessoa"
              className={CAMPO}
              autoComplete="off"
              value={nomePessoa}
              onChange={(e) => setNomePessoa(e.target.value)}
              aria-invalid={erros.nomePessoa ? true : undefined}
              aria-describedby={erros.nomePessoa ? "erro-nome-pessoa" : undefined}
            />
            {erro("nomePessoa", "erro-nome-pessoa")}
          </div>
        )}

        <div className="flex flex-col gap-2">
          <label htmlFor="nome-assinante" className="font-bold">
            Seu nome completo
          </label>
          <input
            id="nome-assinante"
            className={CAMPO}
            autoComplete="name"
            value={nomeAssinante}
            onChange={(e) => setNomeAssinante(e.target.value)}
            aria-invalid={erros.nomeAssinante ? true : undefined}
            aria-describedby={erros.nomeAssinante ? "erro-nome-assinante" : undefined}
          />
          {erro("nomeAssinante", "erro-nome-assinante")}
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          <div className="flex flex-col gap-2">
            <label htmlFor="cpf" className="font-bold">
              Seu CPF
            </label>
            <input
              id="cpf"
              className={CAMPO}
              inputMode="numeric"
              autoComplete="off"
              placeholder="000.000.000-00"
              value={cpf}
              onChange={(e) => setCpf(mascararCpf(e.target.value))}
              aria-invalid={erros.cpf ? true : undefined}
              aria-describedby={erros.cpf ? "erro-cpf" : undefined}
            />
            {erro("cpf", "erro-cpf")}
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="whatsapp" className="font-bold">
              Seu WhatsApp
            </label>
            <input
              id="whatsapp"
              type="tel"
              className={CAMPO}
              inputMode="numeric"
              autoComplete="tel-national"
              placeholder="(81) 9.0000-0000"
              value={whatsapp}
              onChange={(e) =>
                setWhatsapp(
                  aplicarMascaraAoDigitar(
                    whatsapp,
                    e.target.value,
                    (e.nativeEvent as InputEvent).inputType?.startsWith("delete") ?? false,
                  ),
                )
              }
              aria-invalid={erros.whatsapp ? true : undefined}
              aria-describedby={erros.whatsapp ? "erro-whatsapp" : undefined}
            />
            {erro("whatsapp", "erro-whatsapp")}
          </div>
        </div>
      </div>

      <fieldset className="flex flex-col gap-3">
        <legend className="titulo titulo-3 mb-3">Onde as imagens podem aparecer?</legend>
        {OPCOES_DE_USO.map((opcao, indice) => (
          <label key={opcao.valor} className={OPCAO}>
            <input
              type="checkbox"
              className={MARCA}
              checked={usos.includes(opcao.valor)}
              onChange={(e) =>
                setUsos((atual) =>
                  e.target.checked
                    ? [...atual, opcao.valor]
                    : atual.filter((u) => u !== opcao.valor),
                )
              }
              data-erro={indice === 0 && erros.usos ? "true" : undefined}
              aria-describedby={erros.usos ? "erro-usos" : undefined}
            />
            {opcao.rotulo}
          </label>
        ))}
        {erro("usos", "erro-usos")}
      </fieldset>

      <fieldset className="flex flex-col gap-3" aria-describedby="ajuda-rosto">
        <legend className="titulo titulo-3 mb-3">{PERGUNTA_ROSTO}</legend>
        <p id="ajuda-rosto" className="text-ed-ink-soft">
          {AJUDA_ROSTO}
        </p>
        <div className="flex gap-3">
          {(["sim", "nao"] as const).map((valor, indice) => (
            <label key={valor} className={`${OPCAO} flex-1`}>
              <input
                type="radio"
                name="rosto"
                className={MARCA}
                checked={rosto === valor}
                onChange={() => setRosto(valor)}
                data-erro={indice === 0 && erros.rosto ? "true" : undefined}
              />
              {valor === "sim" ? "Sim" : "Não"}
            </label>
          ))}
        </div>
        {erro("rosto", "erro-rosto")}
      </fieldset>

      <div className="flex flex-col gap-2">
        <label className={OPCAO}>
          <input
            type="checkbox"
            className={MARCA}
            checked={momentosDificeis}
            onChange={(e) => setMomentosDificeis(e.target.checked)}
            aria-describedby="ajuda-momentos"
          />
          {ROTULO_MOMENTOS_DIFICEIS}
        </label>
        <p id="ajuda-momentos" className="text-ed-ink-soft">
          {AJUDA_MOMENTOS_DIFICEIS}
        </p>
      </div>

      <section aria-labelledby="termo-titulo" className="rounded-[28px] bg-ed-surface-2 p-6 md:p-8">
        <h2 id="termo-titulo" className="titulo titulo-3">
          O termo
        </h2>
        <ol className="mt-4 flex list-decimal flex-col gap-3 pl-5">
          {clausulasPara(pessoa.trim()).map((clausula) => (
            <li key={clausula}>{clausula}</li>
          ))}
        </ol>
        <p className="mt-4">
          Como o salão cuida desses dados está na{" "}
          <Link href="/privacidade" className="font-bold underline underline-offset-4">
            política de privacidade
          </Link>
          .
        </p>
      </section>

      <div className="flex flex-col gap-2">
        <label className={OPCAO}>
          <input
            type="checkbox"
            className={MARCA}
            checked={declarou}
            onChange={(e) => setDeclarou(e.target.checked)}
            aria-invalid={erros.declaracao ? true : undefined}
            aria-describedby={erros.declaracao ? "erro-declaracao" : undefined}
          />
          {ROTULO_DECLARACAO}
        </label>
        {erro("declaracao", "erro-declaracao")}
      </div>

      <div className="flex flex-col gap-3">
        <h2 className="titulo titulo-3">Assine aqui</h2>
        <QuadroAssinatura
          canvasRef={canvasRef}
          aoMudar={setAssinou}
          invalido={Boolean(erros.assinatura)}
          descritoPor={erros.assinatura ? "erro-assinatura" : undefined}
        />
        {erro("assinatura", "erro-assinatura")}
      </div>

      <div className="flex flex-col gap-3">
        {erro("envio", "erro-envio")}
        <button type="submit" disabled={enviando} className="botao botao--laranja w-full disabled:opacity-60">
          {enviando ? "Registrando..." : "Assinar e enviar"}
        </button>
      </div>
    </form>
  );
}
