import { OPCOES_DIAGNOSTICO } from "@/lib/conteudo/formPerfilSensorial";

type Etapa2Props = {
  diagnosticos: string[];
  aoMudar: (diagnosticos: string[]) => void;
};

export function Etapa2Diagnostico({ diagnosticos, aoMudar }: Etapa2Props) {
  function alternar(valor: string) {
    aoMudar(
      diagnosticos.includes(valor)
        ? diagnosticos.filter((item) => item !== valor)
        : [...diagnosticos, valor],
    );
  }

  return (
    <fieldset className="flex flex-col gap-4">
      <legend className="sr-only">Diagnóstico</legend>

      <p className="text-sm text-ed-ink-soft">
        Opcional. Marque quantas opções fizerem sentido.
      </p>

      <div className="flex flex-col gap-3">
        {OPCOES_DIAGNOSTICO.map((opcao) => (
          <label
            key={opcao.valor}
            className="flex min-h-12 cursor-pointer items-center gap-3"
          >
            <input
              type="checkbox"
              checked={diagnosticos.includes(opcao.valor)}
              onChange={() => alternar(opcao.valor)}
              className="h-5 w-5 shrink-0 accent-ed-navy"
            />
            <span>{opcao.rotulo}</span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}
