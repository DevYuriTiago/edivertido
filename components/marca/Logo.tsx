import Image from "next/image";
import Link from "next/link";

type LogoProps = {
  className?: string;
};

// Vetor de marca real (ver TASKS.md); wordmark em navy, pensado para fundo
// claro. Uma variante para fundo escuro entra quando existir um vetor
// equivalente — por ora este é o único header que a página tem.
export function Logo({ className }: LogoProps) {
  return (
    <Link href="/" className="inline-flex">
      <Image
        src="/marca/logo-edivertido-vetorial-sem-fundo.svg"
        alt="Edivertido Salão Inclusivo"
        width={160}
        height={80}
        priority
        className={className}
      />
    </Link>
  );
}
