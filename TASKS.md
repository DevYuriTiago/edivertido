# TASKS.md — Landing Page Edivertido

Ordem de execução. **Uma tarefa por sessão.** Fecha quando todos os "pronto quando" estiverem verdadeiros e `npm run verify` estiver verde.

Regras estão em `CLAUDE.md`. Não repita aqui, consulte lá.

---

## T1 — Fundação

Scaffold Next.js 15 + TS strict + Tailwind v4 + shadcn. Fonts self-hosted via `next/font`. Tokens de cor como CSS custom properties em `globals.css`. Escala tipográfica. Scripts. `.env.example` com `NEXT_PUBLIC_SITE_URL`, já consumida por `metadataBase`.

**Pronto quando:**
- [ ] `npm run verify` verde
- [ ] Página de teste com os 3 tons e a escala tipográfica completa
- [ ] Nenhum hex fora de `globals.css`
- [ ] Archivo e Atkinson Hyperlegible self-hosted, sem request externo
- [ ] Nenhum domínio hardcoded

---

## T2 — Estado sensorial

`lib/sensorial.ts`: contexto com nível de 0 (calmo) a 1 (pleno), persistido em `localStorage`. Absorve `prefers-reduced-motion`. Expõe `useSensorial()` com o nível e derivados (`movimento`, `saturacao`, `espacamento`, `somDeVideo`).

**Pronto quando:**
- [ ] `prefers-reduced-motion: reduce` inicia o nível em 0
- [ ] Padrão sem preferência: 0.6, nunca 1
- [ ] Persiste entre rotas e após recarregar
- [ ] Sem flash de estado errado na hidratação
- [ ] Nenhum componente lê a media query direto

---

## T3 — Regulador Sensorial

O elemento-assinatura (`CLAUDE.md` §5.1). Slider vertical arrastável no herói, com a frase de fecho no extremo calmo.

**Pronto quando:**
- [ ] Arrasto com resposta abaixo de 100ms
- [ ] Operável por seta do teclado e por clique em 3 posições
- [ ] `role="slider"` com `aria-valuenow`, `aria-valuetext` em texto humano
- [ ] Página inteira reage: movimento, saturação e espaçamento
- [ ] Nível 0 deixa a página completamente estática
- [ ] Não sequestra o scroll vertical no mobile

---

## T4 — Traço-assinatura

`components/marca/TracoAssinatura.tsx`. Path pronto em `CLAUDE.md` §9. Modos `loader`, `progresso`, `divisor`.

**Pronto quando:**
- [ ] Desenho por `stroke-dashoffset` com `pathLength="1"`
- [ ] Progresso acompanha o scroll sem salto
- [ ] `aria-hidden="true"` sempre
- [ ] Nível sensorial 0: aparece desenhado e estático
- [ ] Só `transform` e dash; zero reflow

---

## T5 — Casca e conversão

Header mínimo (logo + CTA). Barra fixa inferior no mobile (WhatsApp + Como chegar). "Pular para o conteúdo". `lib/whatsapp.ts` com mensagem por origem. Eventos de analytics.

**Pronto quando:**
- [ ] Navegação por teclado com foco visível (outline 3px laranja, offset 2px)
- [ ] Cada CTA gera mensagem distinta e coerente com a origem
- [ ] Barra mobile não cobre conteúdo nem o último elemento focável
- [ ] Legível a 200% de zoom sem scroll horizontal
- [ ] Eventos disparando: `whatsapp_click` com origem

---

## T6 — Blocos 1 a 4

Herói (com o Regulador acoplado), faixa de números, "Você já passou por isso?", "O que muda aqui". Copy exata do briefing, vinda de `lib/conteudo/`.

**Pronto quando:**
- [ ] H1 literal do briefing
- [ ] Vídeo com poster, controles visíveis, sem autoplay com som
- [ ] Reveals disparam uma vez, não re-animam ao subir
- [ ] LCP < 2.5s em Lighthouse mobile com throttling 4G
- [ ] Faixa de números só renderiza se os dados existirem em `lib/conteudo/`; sem dado, o bloco não aparece — nunca com valor de exemplo

---

## T7 — Galeria real *(bloco de maior valor)*

Grade de fotos, lightbox ao toque, navegável por teclado e por setas. Sem física, sem swipe forçado, sem narrativa passo a passo. Detalhes em `CLAUDE.md` §6, bloco 5.

**Pronto quando:**
- [ ] Todas as fotos recebidas aparecem, incluindo as que mostram desconforto — nenhuma curadoria só-sorriso
- [ ] Lightbox abre e fecha por clique, Enter, Esc; navega por seta
- [ ] `alt` descreve a cena real, sem eufemismo e sem dramatizar
- [ ] Frase de contexto acima da grade, nenhuma legenda tentando narrar passo a passo
- [ ] Nível sensorial 0: grade estática, lightbox sem transição de fade longa
- [ ] CTA abaixo da grade com origem própria no WhatsApp
- [ ] Evento `galeria_aberta` dispara
- [ ] **Autorização de imagem confirmada especificamente para as fotos de criança em desconforto**, além da autorização geral — não publicar sem isso

## T8 — Blocos 6, 7, 8 e 9

Como funciona (6 etapas), depoimentos em vídeo, bloco de objeções "E se..." e bloco "como funciona o valor" (`CLAUDE.md` §6).

**Pronto quando:**
- [ ] Texto sobre ABA sem promessa terapêutica
- [ ] Zero linguagem capacitista
- [ ] Vídeos com legenda e transcrição
- [ ] Nenhuma tabela de preço, nenhuma faixa, nenhum "a partir de"
- [ ] Bloco de valor explica o critério e diz que o valor é combinado antes da visita
- [ ] Objeções em `<details>`/acordeão acessível: navegável por teclado, `aria-expanded` correto, conteúdo presente no DOM para indexação
- [ ] Respostas operacionais e concretas, nunca tranquilização genérica
- [ ] Nenhum texto do bloco tratando o público como exclusivamente infantil

---

## T9 — Perfil sensorial

Quatro etapas, progresso visível, tudo opcional exceto nome e contato. Monta mensagem estruturada e abre `wa.me`.

**Pronto quando:**
- [ ] Labels visíveis sempre, nunca só placeholder
- [ ] Erros descritivos em texto ao lado do campo
- [ ] `aria-live` anuncia mudança de etapa
- [ ] 100% por teclado, sem timeout
- [ ] Opções incluem "prefiro não dizer" e "sem diagnóstico"
- [ ] Mensagem final legível por humano, não despejo de JSON
- [ ] Aviso de LGPD com link para `/privacidade` antes do envio

---

## T10 — Bloco 11

Localização, horários, CTA final.

**Pronto quando:**
- [ ] Mapa carrega sob clique, não no load
- [ ] Horário e endereço vêm de `lib/conteudo/`, nunca hardcoded no componente

## T11 — SEO, LGPD e metadados

Metadata API. JSON-LD `HairSalon` + `LocalBusiness`. `sitemap.ts`, `robots.ts`. OG 1200×630. Página de privacidade.

**Pronto quando:**
- [ ] JSON-LD válido no Rich Results Test
- [ ] `lang="pt-BR"`, title e description com a intenção de busca
- [ ] `grep -rn "https://" app lib components` não retorna o domínio
- [ ] Um canônico respondendo 200, o outro com 308
- [ ] Preview com `X-Robots-Tag: noindex`, verificado no header
- [ ] Política cobre dado sensível de saúde coletado no formulário

---

## T12 — Auditoria final

**Pronto quando:**
- [ ] Lighthouse mobile: Performance ≥ 90, Acessibilidade 100, SEO ≥ 95
- [ ] axe DevTools sem violação crítica ou séria
- [ ] Nenhum contraste de texto abaixo de 4.5:1
- [ ] Zoom 200% sem scroll horizontal
- [ ] Nada pisca acima de 3Hz
- [ ] Nível sensorial 0 elimina todo movimento não essencial
- [ ] Teste real em celular de entrada em 4G, não só em emulador

---

## Bloqueios abertos

Não invente nenhum destes.

- [ ] Número de WhatsApp
- [ ] Horário de funcionamento
- [ ] Nome e formação da terapeuta ABA
- [ ] CNPJ e razão social
- [ ] Estacionamento? Acesso para cadeirante? Banheiro adaptado?
- [ ] Arquivo vetorial original da logo
- [ ] Autorização de imagem das famílias — **em especial, confirmação específica para as fotos de criança em desconforto** antes de publicar (bloqueia T7)
- [ ] Acesso ao Google Business Profile
- [ ] **Nota e volume real de avaliações no Google** — bloqueia o bloco 2
- [ ] Respostas operacionais para as objeções do bloco 8 — bloqueia parte do T8
