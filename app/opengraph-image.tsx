import { readFileSync } from "fs";
import { join } from "path";
import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// CLAUDE.md §9 manda logo-fundo-azul.jpeg para a OG image, mas o
// arquivo é quadrado (1600x1600); compõe num quadro 1200x630 sem
// distorcer, com o mesmo navy de fundo pra não ter costura visível.
export default function Image() {
  const logo = readFileSync(
    join(process.cwd(), "public/marca/logo-fundo-azul.jpeg"),
  );
  const logoBase64 = `data:image/jpeg;base64,${logo.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          // --ed-navy literal, não var(): ImageResponse roda no Satori,
          // fora do DOM/stylesheet da página — não tem :root pra
          // resolver custom property nenhuma. Exceção necessária à
          // regra de hex só em globals.css, não descuido.
          backgroundColor: "#131351",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={logoBase64} width={560} height={560} alt="" />
      </div>
    ),
    { ...size },
  );
}
