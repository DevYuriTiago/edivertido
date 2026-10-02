import {
  AJUDA_SENSIBILIDADE,
  OPCOES_SENSIBILIDADE,
  PERGUNTA_SENSIBILIDADE,
  type RespostaSensibilidade,
} from "@/lib/conteudo/formPerfilSensorial";

type Etapa1Props = {
  nomePessoaAtendida: string;
  idadeAproximada: string;
  sensibilidade: RespostaSensibilidade | "";
  erroSensibilidade?: string;
  aoMudar: (campo: "nomePessoaAtendida" | "idadeAproximada", valor: string) => void;
  aoMudarSensibilidade: (valor: RespostaSensibilidade) => void;
};

export function Etapa1SobreAPessoa({
  nomePessoaAtendida,
  idadeAproximada,
  sensibilidade,
  erroSensibilidade,
  aoMudar,
  aoMudarSensibilidade,
}: Etapa1Props) {
  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col gap-2">
        <label htmlFor="nome-pessoa-atendida" className="text-sm font-bold">
          Nome de quem vai ser atendido
        </label>
        <input
          id="nome-pessoa-atendida"
          type="text"
          autoComplete="off"
          value={nomePessoaAtendida}
          onChange={(evento) =>
            aoMudar("nomePessoaAtendida", evento.target.value)
          }
          className="min-h-12 w-full rounded-2xl border border-ed-line bg-ed-white px-4 text-ed-ink"
        />
      </div>

      <fieldset
        className="flex flex-col gap-3"
        aria-describedby={
          erroSensibilidade ? "ajuda-sensibilidade erro-sensibilidade" : "ajuda-sensibilidade"
        }
      >
        <legend className="text-sm font-bold">{PERGUNTA_SENSIBILIDADE}</legend>
        <p id="ajuda-sensibilidade" className="text-sm text-ed-ink-soft">
          {AJUDA_SENSIBILIDADE}
        </p>
        <div className="flex gap-3">
          {OPCOES_SENSIBILIDADE.map((opcao) => (
            <label
              key={opcao.valor}
              className="flex min-h-12 flex-1 cursor-pointer items-center gap-3 rounded-2xl border border-ed-line bg-ed-white px-4 has-[:checked]:border-ed-navy has-[:checked]:shadow-[inset_0_0_0_1px_var(--navy)]"
            >
              <input
                type="radio"
                name="sensibilidade"
                value={opcao.valor}
                checked={sensibilidade === opcao.valor}
                onChange={() => aoMudarSensibilidade(opcao.valor)}
                className="h-5 w-5 shrink-0 accent-ed-navy"
              />
              {opcao.rotulo}
            </label>
          ))}
        </div>
        {erroSensibilidade && (
          <p id="erro-sensibilidade" role="alert" className="text-sm font-bold">
            {erroSensibilidade}
          </p>
        )}
      </fieldset>

      <div className="flex flex-col gap-2">
        <label htmlFor="idade-aproximada" className="text-sm font-bold">
          Idade aproximada (opcional)
        </label>
        <input
          id="idade-aproximada"
          type="text"
          autoComplete="off"
          value={idadeAproximada}
          onChange={(evento) => aoMudar("idadeAproximada", evento.target.value)}
          className="min-h-12 w-full rounded-2xl border border-ed-line bg-ed-white px-4 text-ed-ink"
        />
      </div>
    </div>
  );
}
