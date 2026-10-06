"use client";

import { useEffect, useRef } from "react";

type QuadroAssinaturaProps = {
  aoMudar: (temTraco: boolean) => void;
  // O pai lê o desenho por aqui na hora de enviar.
  canvasRef: React.RefObject<HTMLCanvasElement | null>;
  invalido?: boolean;
  descritoPor?: string;
};

// Assinatura desenhada com dedo, caneta ou mouse. touch-action: none para
// o gesto desenhar em vez de rolar a página.
export function QuadroAssinatura({
  aoMudar,
  canvasRef,
  invalido,
  descritoPor,
}: QuadroAssinaturaProps) {
  const desenhando = useRef(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const escala = window.devicePixelRatio || 1;
    const { width, height } = canvas.getBoundingClientRect();
    canvas.width = Math.round(width * escala);
    canvas.height = Math.round(height * escala);
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.scale(escala, escala);
    ctx.lineWidth = 2.5;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.strokeStyle = getComputedStyle(canvas).color;
  }, [canvasRef]);

  function ponto(evento: React.PointerEvent<HTMLCanvasElement>) {
    const caixa = evento.currentTarget.getBoundingClientRect();
    return { x: evento.clientX - caixa.left, y: evento.clientY - caixa.top };
  }

  function comecar(evento: React.PointerEvent<HTMLCanvasElement>) {
    const ctx = evento.currentTarget.getContext("2d");
    if (!ctx) return;
    evento.currentTarget.setPointerCapture(evento.pointerId);
    desenhando.current = true;
    const { x, y } = ponto(evento);
    ctx.beginPath();
    ctx.moveTo(x, y);
    // um toque sem arrastar ainda deixa um ponto
    ctx.lineTo(x + 0.1, y + 0.1);
    ctx.stroke();
    aoMudar(true);
  }

  function mover(evento: React.PointerEvent<HTMLCanvasElement>) {
    if (!desenhando.current) return;
    const ctx = evento.currentTarget.getContext("2d");
    if (!ctx) return;
    const { x, y } = ponto(evento);
    ctx.lineTo(x, y);
    ctx.stroke();
  }

  function limpar() {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    ctx.save();
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.restore();
    aoMudar(false);
  }

  return (
    <div className="flex flex-col gap-2">
      <canvas
        ref={canvasRef}
        role="img"
        aria-label="Quadro de assinatura"
        aria-describedby={descritoPor}
        onPointerDown={comecar}
        onPointerMove={mover}
        onPointerUp={() => (desenhando.current = false)}
        onPointerCancel={() => (desenhando.current = false)}
        className={`h-44 w-full touch-none rounded-2xl border bg-ed-white text-ed-navy ${
          invalido ? "border-2 border-ed-navy" : "border-ed-line"
        }`}
      />
      <button
        type="button"
        onClick={limpar}
        className="min-h-12 self-start font-bold underline underline-offset-4"
      >
        Limpar e assinar de novo
      </button>
    </div>
  );
}
