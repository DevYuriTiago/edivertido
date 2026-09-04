import type { NextConfig } from "next";

// Deploys de preview na Vercel (VERCEL_ENV=preview) nunca podem ser
// indexados — uma URL de preview indexada custa meses para limpar
// (CLAUDE.md §9). Produção não recebe esse header.
const ehPreview = process.env.VERCEL_ENV === "preview";

const nextConfig: NextConfig = {
  async headers() {
    if (!ehPreview) return [];

    return [
      {
        source: "/:path*",
        headers: [{ key: "X-Robots-Tag", value: "noindex" }],
      },
    ];
  },
};

export default nextConfig;
