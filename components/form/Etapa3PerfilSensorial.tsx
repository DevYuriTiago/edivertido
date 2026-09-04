import { OPCOES_GATILHO } from "@/lib/conteudo/formPerfilSensorial";

type Etapa3Props = {
  gatilhos: string[];
  oQueAjudaAcalmar: string;
  aoMudarGatilhos: (gatilhos: string[]) => void;
  aoMudarTexto: (texto: string) => void;
};

export function Etapa3PerfilSensorial({
  gatilhos,
  oQueAjudaAcalmar,
  aoMudarGatilhos,
  aoMudarTexto,
}: Etapa3Props) {
  function alternar(valor: string) {
    aoMudarGatilhos(
      gatilhos.includes(valor)
        ? gatilhos.filter((item) => item !== valor)
        : [...gatilhos, valor],
    );
  }

  return (
    <fieldset className="flex flex-col gap-5">
      <legend className="sr-only">Perfil sensorial</legend>

      <div className="flex flex-col gap-3">
        <p className="text-sm font-bold">O que costuma incomodar</p>
        <p className="text-sm text-ed-ink-soft">
          Opcional. Marque quantas opções fizerem sentido.
        </p>
        <div className="flex flex-col gap-3">
          {OPCOES_GATILHO.map((opcao) => (
            <label
              key={opcao.valor}
              className="flex min-h-12 cursor-pointer items-center gap-3"
            >
              <input
                type="checkbox"
                checked={gatilhos.includes(opcao.valor)}
                onChange={() => alternar(opcao.valor)}
                className="h-5 w-5 shrink-0 accent-ed-navy"
              />
              <span>{opcao.rotulo}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="o-que-ajuda-acalmar" className="text-sm font-bold">
          O que ajuda a acalmar
        </label>
        <textarea
          id="o-que-ajuda-acalmar"
          value={oQueAjudaAcalmar}
          onChange={(evento) => aoMudarTexto(evento.target.value)}
          rows={3}
          className="w-full rounded-2xl border border-ed-line bg-ed-white px-4 py-3 text-ed-ink"
        />
        <p className="text-sm text-ed-ink-soft">Opcional.</p>
      </div>
    </fieldset>
  );
}
