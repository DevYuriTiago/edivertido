import type { NextConfig } from "next";

// Deploys de preview nunca podem ser indexados: uma URL de preview
// indexada custa meses para limpar. Vale para a Netlify (CONTEXT é
// "deploy-preview" ou "branch-deploy" fora de produção) e para a Vercel
// (VERCEL_ENV=preview). Produção não recebe esse header.
const ehPreview =
  process.env.VERCEL_ENV === "preview" ||
  (process.env.NETLIFY === "true" && process.env.CONTEXT !== "production");

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
