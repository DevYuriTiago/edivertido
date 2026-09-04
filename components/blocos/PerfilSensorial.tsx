import { Revelar } from "@/components/ui/Revelar";
import { PerfilSensorialForm } from "@/components/form/PerfilSensorialForm";
import { INTRO_PERFIL_SENSORIAL } from "@/lib/conteudo/perfilSensorial";

// Bloco 10 — conversão qualificada: quem chega no WhatsApp com contexto
// já preenchido muda a qualidade da primeira mensagem (CLAUDE.md §2).
export function PerfilSensorial() {
  return (
    <section
      aria-labelledby="perfil-sensorial-titulo"
      className="mx-auto flex max-w-xl flex-col gap-8 px-6 py-16 md:py-20"
    >
      <Revelar className="flex flex-col gap-3">
        <h2 id="perfil-sensorial-titulo">Perfil sensorial</h2>
        <p>{INTRO_PERFIL_SENSORIAL}</p>
      </Revelar>

      <PerfilSensorialForm />
    </section>
  );
}
