"use client";

import type { ReactNode } from "react";
import { rastrear } from "@/lib/analytics";
import { linkWhatsApp, type OrigemWhatsApp } from "@/lib/whatsapp";

type BotaoWhatsAppProps = {
  origem: OrigemWhatsApp;
  className?: string;
  children: ReactNode;
};

export function BotaoWhatsApp({
  origem,
  className,
  children,
}: BotaoWhatsAppProps) {
  return (
    <a
      href={linkWhatsApp(origem)}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
      onClick={() => rastrear("whatsapp_click", { origem })}
    >
      {children}
    </a>
  );
}
