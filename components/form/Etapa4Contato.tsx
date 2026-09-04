import Link from "next/link";

export type ErrosEtapa4 = {
  nomeContato?: string;
  whatsappContato?: string;
  privacidade?: string;
};

type Etapa4Props = {
  nomeContato: string;
  whatsappContato: string;
  aceitouPrivacidade: boolean;
  erros: ErrosEtapa4;
  aoMudarTexto: (
    campo: "nomeContato" | "whatsappContato",
    valor: string,
  ) => void;
  aoMudarAceite: (valor: boolean) => void;
};

export function Etapa4Contato({
  nomeContato,
  whatsappContato,
  aceitouPrivacidade,
  erros,
  aoMudarTexto,
  aoMudarAceite,
}: Etapa4Props) {
  return (
    <fieldset className="flex flex-col gap-5">
      <legend className="sr-only">Seus dados de contato</legend>

      <div className="flex flex-col gap-2">
        <label htmlFor="nome-contato" className="text-sm font-bold">
          Seu nome
        </label>
        <input
          id="nome-contato"
          type="text"
          value={nomeContato}
          onChange={(evento) => aoMudarTexto("nomeContato", evento.target.value)}
          aria-invalid={erros.nomeContato ? true : undefined}
          aria-describedby={erros.nomeContato ? "erro-nome-contato" : undefined}
          className="min-h-12 w-full rounded-2xl border border-ed-line bg-ed-white px-4 text-ed-ink"
        />
        {erros.nomeContato && (
          <p id="erro-nome-contato" role="alert" className="text-sm font-bold">
            {erros.nomeContato}
          </p>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="whatsapp-contato" className="text-sm font-bold">
          Seu WhatsApp
        </label>
        <input
          id="whatsapp-contato"
          type="tel"
          value={whatsappContato}
          onChange={(evento) =>
            aoMudarTexto("whatsappContato", evento.target.value)
          }
          aria-invalid={erros.whatsappContato ? true : undefined}
          aria-describedby={
            erros.whatsappContato ? "erro-whatsapp-contato" : undefined
          }
          className="min-h-12 w-full rounded-2xl border border-ed-line bg-ed-white px-4 text-ed-ink"
        />
        {erros.whatsappContato && (
          <p
            id="erro-whatsapp-contato"
            role="alert"
            className="text-sm font-bold"
          >
            {erros.whatsappContato}
          </p>
        )}
      </div>

      <div className="flex flex-col gap-2 rounded-2xl bg-ed-surface-2 p-4">
        <label className="flex cursor-pointer items-start gap-3">
          <input
            type="checkbox"
            checked={aceitouPrivacidade}
            onChange={(evento) => aoMudarAceite(evento.target.checked)}
            aria-invalid={erros.privacidade ? true : undefined}
            aria-describedby={
              erros.privacidade ? "erro-privacidade" : undefined
            }
            className="mt-1 h-5 w-5 shrink-0 accent-ed-navy"
          />
          <span className="text-sm">
            Li a{" "}
            <Link href="/privacidade" className="underline">
              política de privacidade
            </Link>{" "}
            e concordo em enviar essas informações pelo WhatsApp.
          </span>
        </label>
        {erros.privacidade && (
          <p id="erro-privacidade" role="alert" className="text-sm font-bold">
            {erros.privacidade}
          </p>
        )}
      </div>
    </fieldset>
  );
}
