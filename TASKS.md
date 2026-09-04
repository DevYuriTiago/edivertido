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
- [x] `prefers-reduced-motion: reduce` inicia o nível em 0
- [x] Padrão sem preferência: 0.6, nunca 1
- [x] Persiste entre rotas e após recarregar (localStorage, provider no layout raiz)
- [x] Sem flash de estado errado na hidratação (script bloqueante + `suppressHydrationWarning` no `<html>`)
- [x] Nenhum componente lê a media query direto

---

## T3 — Regulador Sensorial

O elemento-assinatura (`CLAUDE.md` §5.1). Slider vertical arrastável no herói, com a frase de fecho no extremo calmo.

**Pronto quando:**
- [x] Arrasto com resposta abaixo de 100ms (framer-motion liga o ponteiro direto no motion value, sem debounce)
- [x] Operável por seta do teclado e por clique em 3 posições
- [x] `role="slider"` com `aria-valuenow`, `aria-valuetext` em texto humano
- [~] Página inteira reage: movimento, saturação e espaçamento — saturação confirmada visualmente (filtro em `.ed-superficie-sensorial`); espaçamento e movimento são consumidos pela infraestrutura (`--ed-espacamento`, `useSensorial().movimento`) mas só ficam visíveis quando blocos reais existirem, a partir do T6
- [x] Nível 0 deixa a página completamente estática (polegar fixo no fim do trilho, frase de fecho aparece)
- [x] Não sequestra o scroll vertical no mobile (`touch-action: none` só no polegar de 48×48, não na página)

---

## T4 — Traço-assinatura

`components/marca/TracoAssinatura.tsx`. Path pronto em `CLAUDE.md` §9. Modos `loader`, `progresso`, `divisor`.

**Pronto quando:**
- [x] Desenho por `stroke-dashoffset` com `pathLength="1"`
- [x] Progresso acompanha o scroll sem salto (testado: 0%, 50% e 100% de scroll, traçado parcial correto no meio)
- [x] `aria-hidden="true"` sempre
- [x] Nível sensorial 0: aparece desenhado e estático (testado, herda o nível salvo do Regulador)
- [x] Só `transform` e dash; zero reflow (dashoffset via style, cross-fade do loader via opacity)

---

## T5 — Casca e conversão

Header mínimo (logo + CTA). Barra fixa inferior no mobile (WhatsApp + Como chegar). "Pular para o conteúdo". `lib/whatsapp.ts` com mensagem por origem. Eventos de analytics.

**Pronto quando:**
- [x] Navegação por teclado com foco visível (outline 3px laranja, offset 2px — regra global em `:focus-visible`)
- [x] Cada CTA gera mensagem distinta e coerente com a origem (só a origem `barra-fixa` existe por enquanto; hero/galeria/valor/final entram nos blocos que os usam)
- [x] Barra mobile não cobre conteúdo nem o último elemento focável (testado: `pb-24` no wrapper, fim de página com espaço livre acima da barra)
- [x] Legível a 200% de zoom sem scroll horizontal (testado: `scrollWidth === clientWidth`)
- [x] Eventos disparando: `whatsapp_click` com origem (testado: `dataLayer` recebe `{evento, origem}`)

---

## T6 — Blocos 1 a 4

Herói (com o Regulador acoplado), faixa de números, "Você já passou por isso?", "O que muda aqui". Copy exata do briefing, vinda de `lib/conteudo/`.

**Pronto quando:**
- [x] H1 literal do briefing
- [~] Vídeo com poster, controles visíveis, sem autoplay com som — **nenhum vídeo real chegou ainda**, ver novo item em "Bloqueios abertos". Nenhum bloco do T6 tem vídeo; a regra fica satisfeita porque não existe vídeo nenhum para violá-la, não porque foi implementada
- [x] Reveals disparam uma vez, não re-animam ao subir (`Revelar`, `viewport={{ once: true }}`)
- [ ] LCP < 2.5s em Lighthouse mobile com throttling 4G — não medido nesta tarefa; fica para a auditoria completa do T12
- [x] Faixa de números só renderiza se os dados existirem em `lib/conteudo/`; sem dado, o bloco não aparece (hoje: `null`, faltam tempo de operação e atendimentos)

---

## T7 — Galeria real *(bloco de maior valor)*

Grade de fotos, lightbox ao toque, navegável por teclado e por setas. Sem física, sem swipe forçado, sem narrativa passo a passo. Detalhes em `CLAUDE.md` §6, bloco 5.

**Pronto quando:**
- [x] Todas as fotos recebidas aparecem, incluindo as que mostram desconforto — as 5 fotos reais (01-05), nenhuma curadoria só-sorriso
- [x] Lightbox abre e fecha por clique, Enter, Esc; navega por seta (testado no navegador, os 3 caminhos)
- [x] `alt` descreve a cena real, sem eufemismo e sem dramatizar (revisado com a skill revisar-copy)
- [x] Frase de contexto acima da grade, nenhuma legenda tentando narrar passo a passo
- [x] Nível sensorial 0: grade sem reveal escalonado por foto; fade do lightbox tem teto de 200ms e escala com o nível
- [x] CTA abaixo da grade com origem própria no WhatsApp (origem "galeria")
- [x] Evento `galeria_aberta` dispara (testado: aparece no dataLayer)
- [x] **Autorização de imagem confirmada especificamente para as fotos de criança em desconforto**, além da autorização geral (usuário confirmou em 2026-09-04, ver Bloqueios abertos)

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

- [x] Número de WhatsApp — **+55 81 98804-1234**, confirmado em dois lugares (flyer promocional e Google Business Profile). *Nota: o número digitado em chat vinha sem o "9" (81 8804-1234); o painel de origem (perfil do Google) usa 98804-1234, que é o formato válido de celular — usando este.*
- [x] Horário de funcionamento — **segunda a sábado, 9h–18h; domingo fechado** (Google Business Profile; a entrada de segunda-feira no print trazia um aviso de feriado, mas o padrão dos outros dias confirma o horário regular).
- [ ] Nome e formação da terapeuta ABA — **ainda bloqueado.** A bio do Instagram do barbeiro (@edbarbeiroinclusivo) se autodeclara "Terapeuta ABA" mas diz "Cursando Terapia Ocupacional" (ainda estudante, formação diferente) — não é credencial verificável. Não usar como fonte. Nenhuma tarefa do T2–T12 exige publicar nome/formação da terapeuta hoje; só entra se vier confirmação real.
- [ ] CNPJ e razão social — ainda bloqueado (necessário para T11, página de privacidade)
- [ ] Estacionamento? Acesso para cadeirante? Banheiro adaptado? — ainda bloqueado
- [x] Arquivo vetorial original da logo — **resolvido.** `public/marca/logo-edivertido-vetorial-fiel.svg` (com fundo branco) e `logo-edivertido-vetorial-sem-fundo.svg` (transparente) são vetores de verdade: poucos paths (13), cores separadas por camada, lemniscata "e+d" nítida, sem herança de autotrace. Substituem os JPEGs como logo principal a partir de agora. *Nota: os hex do arquivo (#17175B navy, #74C100 verde, #FFAA00 laranja) diferem ligeiramente dos tokens do CLAUDE.md §8 (#131351, #77B900, #FCA700, que já têm contraste verificado). Mantendo os tokens do CLAUDE.md como fonte da verdade para cor; o SVG serve para forma, não para recalibrar a paleta.*
- [x] Autorização de imagem das famílias — **confirmada, geral e específica para a foto de desconforto** (usuário confirmou em 2026-09-04). Material real recebido em `public/marca/01.jpeg`–`05.jpeg`.
- [ ] Acesso ao Google Business Profile — ainda bloqueado (temos só um print do painel, não acesso direto à conta)
- [~] Nota e volume real de avaliações no Google — **5,0 ★, 84 avaliações**, confirmado via print do Google Business Profile. Bloco 2 continua fora do ar porque `CLAUDE.md` §6 exige nota+avaliações **e** tempo de operação **e** número de atendimentos juntos ("se qualquer um não puder ser comprovado, o bloco inteiro sai") — faltam os outros dois.
- [ ] Tempo de operação do salão e número de atendimentos sustentável — bloqueia o bloco 2 mesmo com a nota do Google confirmada
- [ ] Respostas operacionais para as objeções do bloco 8 — bloqueia parte do T8
- [ ] Confirmar handle correto do Instagram — `CLAUDE.md` §1 documenta `@edivertidooficial` (2.2k), mas o print recebido é de `@edbarbeiroinclusivo` (2.9k, conta do barbeiro). Pode ser conta pessoal separada da conta oficial da marca — checar antes do T11 (JSON-LD `sameAs`).
- [ ] Domínio do site (`NEXT_PUBLIC_SITE_URL`) — ainda bloqueado, necessário para T11
- [ ] Vídeo real do salão/atendimento — bloqueia o critério de vídeo do T6 (e possivelmente os depoimentos em vídeo do T8). Só existem fotos (`public/marca/01.jpeg`-`05.jpeg`); nenhum arquivo de vídeo foi recebido
