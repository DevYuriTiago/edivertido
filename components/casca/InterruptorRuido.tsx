"use client";

import { useSensorial } from "@/lib/sensorial";

// Interruptor de verdade (role="switch"): troca o site inteiro para o modo
// branco, plano e parado. O estado visual vem do data-calmo no <html>, via
// CSS, para não piscar antes da hidratação.
export function InterruptorRuido() {
  const { semRuido, alternarRuido } = useSensorial();

  return (
    <button
      type="button"
      role="switch"
      aria-checked={semRuido}
      onClick={alternarRuido}
      className="interruptor group inline-flex min-h-12 items-center gap-3 rounded-full px-2 text-left"
    >
      <span className="interruptor-trilho relative inline-block h-7 w-12 shrink-0 rounded-full">
        <span className="interruptor-bolinha absolute left-1 top-1 h-5 w-5 rounded-full" />
      </span>
      <span className="font-[family-name:var(--font-titulo)] text-base font-extrabold leading-none">
        Tirar ruído
      </span>
    </button>
  );
}
