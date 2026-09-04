type Etapa1Props = {
  nomePessoaAtendida: string;
  idadeAproximada: string;
  aoMudar: (campo: "nomePessoaAtendida" | "idadeAproximada", valor: string) => void;
};

export function Etapa1SobreAPessoa({
  nomePessoaAtendida,
  idadeAproximada,
  aoMudar,
}: Etapa1Props) {
  return (
    <fieldset className="flex flex-col gap-5">
      <legend className="sr-only">Sobre quem vai ser atendido</legend>

      <div className="flex flex-col gap-2">
        <label htmlFor="nome-pessoa-atendida" className="text-sm font-bold">
          Nome de quem vai ser atendido
        </label>
        <input
          id="nome-pessoa-atendida"
          type="text"
          value={nomePessoaAtendida}
          onChange={(evento) =>
            aoMudar("nomePessoaAtendida", evento.target.value)
          }
          className="min-h-12 w-full rounded-2xl border border-ed-line bg-ed-white px-4 text-ed-ink"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="idade-aproximada" className="text-sm font-bold">
          Idade aproximada
        </label>
        <input
          id="idade-aproximada"
          type="text"
          value={idadeAproximada}
          onChange={(evento) => aoMudar("idadeAproximada", evento.target.value)}
          className="min-h-12 w-full rounded-2xl border border-ed-line bg-ed-white px-4 text-ed-ink"
        />
      </div>

      <p className="text-sm text-ed-ink-soft">
        As duas perguntas são opcionais. Pode pular direto para a
        próxima etapa.
      </p>
    </fieldset>
  );
}
