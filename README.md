# Edivertido Salão Inclusivo

Landing page do Edivertido, salão e barbearia inclusivos em Recife.
No ar em https://edivertido.com.br.

Site desenvolvido pela [Prompts360](https://prompts360.com.br).

## Stack

Next.js 15 (App Router, estático), TypeScript, Tailwind CSS v4, Motion.
Hospedado na Netlify.

## Rodar localmente

```bash
npm install
npm run dev      # http://localhost:3000
npm run verify   # typecheck + lint + build
```

## Onde mexer

- `lib/conteudo/`: todo o texto do site (títulos, serviços, números, valor, formulário).
- `lib/conteudo/contato.ts`: endereço, WhatsApp e horário.
- `public/marca/`: fotos e logos usados na página.

## Variáveis de ambiente

| Variável | Uso |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | Domínio público. Opcional: sem ela, usa a URL da Netlify ou `https://edivertido.com.br`. |
