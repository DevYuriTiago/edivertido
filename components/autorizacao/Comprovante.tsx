"use client";

import {
  OPCOES_DE_USO,
  OPCOES_QUEM_ASSINA,
  RESPONSAVEL_PELO_SALAO,
  VERSAO_DO_TERMO,
  clausulasPara,
  type RegistroAutorizacao,
} from "@/lib/conteudo/autorizacao";

type ComprovanteProps = {
  registro: RegistroAutorizacao;
  assinaturaUrl: string;
};

// Cópia da pessoa. "Salvar em PDF" usa a impressão do navegador: o CSS de
// impressão esconde cabeçalho, barra e botões e deixa só este documento.
export function Comprovante({ registro, assinaturaUrl }: ComprovanteProps) {
  const quando = new Date(registro.assinadoEm).toLocaleString("pt-BR", {
    dateStyle: "long",
    timeStyle: "short",
  });
  const usos = OPCOES_DE_USO.filter((o) => registro.usos.includes(o.valor)).map((o) => o.rotulo);
  const quem = OPCOES_QUEM_ASSINA.find((o) => o.valor === registro.quemAssina)?.rotulo;

  return (
    <div className="flex flex-col gap-8">
      <div role="status" className="nao-imprimir rounded-[28px] bg-ed-green p-6 text-ed-navy md:p-8">
        <h2 className="titulo titulo-3">Autorização registrada</h2>
        <p className="mt-2">
          O salão já recebeu. Guarde a sua cópia: toque em salvar e escolha
          &ldquo;Salvar como PDF&rdquo;.
        </p>
        <button type="button" onClick={() => window.print()} className="botao botao--navy mt-5">
          Salvar minha cópia em PDF
        </button>
      </div>

      <article className="comprovante flex flex-col gap-6 rounded-[28px] border border-ed-line p-6 md:p-8">
        <header>
          <h2 className="titulo titulo-3">Autorização de uso de imagem</h2>
          <p className="mt-1 text-ed-ink-soft">{RESPONSAVEL_PELO_SALAO}</p>
        </header>

        <dl className="grid gap-x-8 gap-y-4 md:grid-cols-2">
          <Item rotulo="Protocolo" valor={registro.protocolo} />
          <Item rotulo="Assinado em" valor={quando} />
          <Item rotulo="Quem aparece nas imagens" valor={registro.nomePessoa} />
          <Item rotulo="Quem assina" valor={`${registro.nomeAssinante} (${quem})`} />
          <Item rotulo="CPF de quem assina" valor={registro.cpf} />
          <Item rotulo="WhatsApp" valor={registro.whatsapp} />
          <Item rotulo="Onde pode aparecer" valor={usos.join("; ")} />
          <Item rotulo="O rosto pode aparecer" valor={registro.rosto ? "Sim" : "Não"} />
          <Item
            rotulo="Momentos difíceis (choro, desconforto)"
            valor={registro.momentosDificeis ? "Autorizado" : "Não autorizado"}
          />
          <Item rotulo="Versão do termo" valor={VERSAO_DO_TERMO} />
        </dl>

        <ol className="flex list-decimal flex-col gap-2 pl-5">
          {clausulasPara(registro.nomePessoa).map((clausula) => (
            <li key={clausula}>{clausula}</li>
          ))}
        </ol>

        <div>
          {/* Imagem gerada no aparelho (data URL): next/image não se aplica. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={assinaturaUrl}
            alt={`Assinatura de ${registro.nomeAssinante}`}
            className="h-28 w-auto max-w-full"
          />
          <p className="mt-1 border-t border-ed-navy pt-2">{registro.nomeAssinante}</p>
        </div>
      </article>
    </div>
  );
}

function Item({ rotulo, valor }: { rotulo: string; valor: string }) {
  return (
    <div>
      <dt className="text-ed-ink-soft">{rotulo}</dt>
      <dd className="font-bold">{valor}</dd>
    </div>
  );
}
