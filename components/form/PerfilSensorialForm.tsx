"use client";

import { useEffect, useRef, useState } from "react";
import { rastrear } from "@/lib/analytics";
import { linkWhatsAppDireto, linkWhatsAppPerfilSensorial } from "@/lib/whatsapp";
import {
  ERRO_SENSIBILIDADE,
  type RespostaSensibilidade,
} from "@/lib/conteudo/formPerfilSensorial";
import { Etapa1SobreAPessoa } from "./Etapa1SobreAPessoa";
import { Etapa2Diagnostico } from "./Etapa2Diagnostico";
import { Etapa3PerfilSensorial } from "./Etapa3PerfilSensorial";
import { Etapa4Contato, type ErrosEtapa4 } from "./Etapa4Contato";

const TOTAL_ETAPAS = 4;

const NOMES_ETAPAS = [
  "Sobre quem vai ser atendido",
  "Diagnóstico",
  "Perfil sensorial",
  "Seus dados de contato",
];

type EstadoFormulario = {
  nomePessoaAtendida: string;
  sensibilidade: RespostaSensibilidade | "";
  idadeAproximada: string;
  diagnosticos: string[];
  gatilhos: string[];
  oQueAjudaAcalmar: string;
  nomeContato: string;
  whatsappContato: string;
  aceitouPrivacidade: boolean;
};

const ESTADO_INICIAL: EstadoFormulario = {
  nomePessoaAtendida: "",
  sensibilidade: "",
  idadeAproximada: "",
  diagnosticos: [],
  gatilhos: [],
  oQueAjudaAcalmar: "",
  nomeContato: "",
  whatsappContato: "",
  aceitouPrivacidade: false,
};

export function PerfilSensorialForm() {
  const [etapa, setEtapa] = useState(1);
  const [dados, setDados] = useState(ESTADO_INICIAL);
  const [erros, setErros] = useState<ErrosEtapa4>({});
  const [erroSensibilidade, setErroSensibilidade] = useState<string>();
  // "direto": sem sensibilidade sensorial, foi direto para o WhatsApp.
  const [enviado, setEnviado] = useState<"direto" | "perfil" | null>(null);
  const tituloEtapaRef = useRef<HTMLHeadingElement>(null);
  const primeiraRenderizacaoRef = useRef(true);

  // Move o foco para o título da nova etapa a cada troca — sem isso, quem
  // usa leitor de tela fica preso perto do botão e não percebe que os
  // campos mudaram. Não roda na primeira renderização (o usuário ainda
  // não interagiu com nada).
  useEffect(() => {
    if (primeiraRenderizacaoRef.current) {
      primeiraRenderizacaoRef.current = false;
      rastrear("form_etapa_1");
      return;
    }
    tituloEtapaRef.current?.focus();
  }, [etapa]);

  function irPara(proximaEtapa: number) {
    setEtapa(proximaEtapa);
    rastrear(`form_etapa_${proximaEtapa}`);
  }

  function validarEtapa4(): ErrosEtapa4 {
    const novosErros: ErrosEtapa4 = {};
    if (!dados.nomeContato.trim()) {
      novosErros.nomeContato = "Preencha seu nome antes de continuar.";
    }
    const digitos = dados.whatsappContato.replace(/\D/g, "");
    if (digitos.length < 8) {
      novosErros.whatsappContato =
        "Preencha um número de WhatsApp válido antes de continuar.";
    }
    if (!dados.aceitouPrivacidade) {
      novosErros.privacidade =
        "Confirme que leu a política de privacidade antes de enviar.";
    }
    return novosErros;
  }

  function aoEnviarFormulario(evento: React.FormEvent) {
    evento.preventDefault();

    // A pergunta da etapa 1 divide o caminho.
    if (etapa === 1) {
      if (!dados.sensibilidade) {
        setErroSensibilidade(ERRO_SENSIBILIDADE);
        return;
      }
      setErroSensibilidade(undefined);
      if (dados.sensibilidade === "nao") {
        rastrear("form_direto_whatsapp");
        setEnviado("direto");
        window.open(
          linkWhatsAppDireto({
            nomePessoaAtendida: dados.nomePessoaAtendida || undefined,
            idadeAproximada: dados.idadeAproximada || undefined,
          }),
          "_blank",
          "noopener,noreferrer",
        );
        return;
      }
    }

    if (etapa < TOTAL_ETAPAS) {
      irPara(etapa + 1);
      return;
    }

    const novosErros = validarEtapa4();
    if (Object.keys(novosErros).length > 0) {
      setErros(novosErros);
      return;
    }

    setErros({});
    rastrear("form_enviado");
    setEnviado("perfil");

    const link = linkWhatsAppPerfilSensorial({
      nomePessoaAtendida: dados.nomePessoaAtendida || undefined,
      idadeAproximada: dados.idadeAproximada || undefined,
      diagnosticos: dados.diagnosticos.length ? dados.diagnosticos : undefined,
      gatilhos: dados.gatilhos.length ? dados.gatilhos : undefined,
      oQueAjudaAcalmar: dados.oQueAjudaAcalmar || undefined,
      nomeContato: dados.nomeContato,
      whatsappContato: dados.whatsappContato,
    });
    window.open(link, "_blank", "noopener,noreferrer");
  }

  if (enviado) {
    return (
      <div className="flex flex-col gap-3 rounded-2xl bg-ed-surface-2 p-6">
        <h3 className="titulo titulo-3">
          {enviado === "perfil" ? "Perfil pronto" : "Tudo certo"}
        </h3>
        <p>
          Abrimos o WhatsApp com sua mensagem pronta, é só enviar. Se não
          abriu sozinho, confira se o navegador bloqueou a janela.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <div>
        <p aria-live="polite" className="text-sm text-ed-ink-soft">
          Etapa {etapa} de {TOTAL_ETAPAS}: {NOMES_ETAPAS[etapa - 1]}
        </p>
        <div
          className="mt-2 h-2 w-full overflow-hidden rounded-full bg-ed-surface-2"
          aria-hidden="true"
        >
          <div
            className="h-full rounded-full bg-ed-navy transition-[width] duration-300"
            style={{ width: `${(etapa / TOTAL_ETAPAS) * 100}%` }}
          />
        </div>
      </div>

      <form onSubmit={aoEnviarFormulario} className="flex flex-col gap-6" noValidate>
        <h3 ref={tituloEtapaRef} tabIndex={-1}>
          {NOMES_ETAPAS[etapa - 1]}
        </h3>

        {etapa === 1 && (
          <Etapa1SobreAPessoa
            nomePessoaAtendida={dados.nomePessoaAtendida}
            idadeAproximada={dados.idadeAproximada}
            sensibilidade={dados.sensibilidade}
            erroSensibilidade={erroSensibilidade}
            aoMudar={(campo, valor) =>
              setDados((atual) => ({ ...atual, [campo]: valor }))
            }
            aoMudarSensibilidade={(sensibilidade) => {
              setErroSensibilidade(undefined);
              setDados((atual) => ({ ...atual, sensibilidade }));
            }}
          />
        )}
        {etapa === 2 && (
          <Etapa2Diagnostico
            diagnosticos={dados.diagnosticos}
            aoMudar={(diagnosticos) =>
              setDados((atual) => ({ ...atual, diagnosticos }))
            }
          />
        )}
        {etapa === 3 && (
          <Etapa3PerfilSensorial
            gatilhos={dados.gatilhos}
            oQueAjudaAcalmar={dados.oQueAjudaAcalmar}
            aoMudarGatilhos={(gatilhos) =>
              setDados((atual) => ({ ...atual, gatilhos }))
            }
            aoMudarTexto={(texto) =>
              setDados((atual) => ({ ...atual, oQueAjudaAcalmar: texto }))
            }
          />
        )}
        {etapa === 4 && (
          <Etapa4Contato
            nomeContato={dados.nomeContato}
            whatsappContato={dados.whatsappContato}
            aceitouPrivacidade={dados.aceitouPrivacidade}
            erros={erros}
            aoMudarTexto={(campo, valor) =>
              setDados((atual) => ({ ...atual, [campo]: valor }))
            }
            aoMudarAceite={(valor) =>
              setDados((atual) => ({ ...atual, aceitouPrivacidade: valor }))
            }
          />
        )}

        <div className="flex gap-3">
          {etapa > 1 && (
            <button
              type="button"
              onClick={() => irPara(etapa - 1)}
              className="botao botao--contorno"
            >
              Voltar
            </button>
          )}
          <button
            type="submit"
            className="botao botao--laranja flex-1"
          >
            {etapa === TOTAL_ETAPAS ||
            (etapa === 1 && dados.sensibilidade === "nao")
              ? "Continuar no WhatsApp"
              : "Continuar"}
          </button>
        </div>
      </form>
    </div>
  );
}
