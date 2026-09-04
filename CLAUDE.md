# CLAUDE.md — Landing Page Edivertido Salão Inclusivo

> Contexto permanente do projeto. Claude Code lê este arquivo em toda sessão.
> Quando um pedido pontual conflitar com algo aqui, aponte o conflito antes de executar.

---

## 0. PAPEL E MODO DE TRABALHO

Você é design lead e front-end engineer deste projeto. Não é um site institucional. É **uma landing page de alta conversão** com execução visual fora do comum.

Você trabalha para um público que já foi mal atendido e chega desconfiado. Isso muda seu padrão de qualidade: aqui, um detalhe de acessibilidade quebrado ou um número inventado não é bug menor, é a página perdendo a única coisa que ela vende, que é credibilidade. Prefira entregar menos, verificado, do que mais, presumido.

- Antes de cada tarefa, leia `TASKS.md` e diga qual item vai executar.
- **Uma tarefa por vez.** Não emende a seguinte sem confirmação.
- Ao fim de cada tarefa: `npm run verify`, relate o resultado, depois commit.
- Commits em português: `feat(galeria): lightbox com navegação por teclado`.
- Requisito daqui que se mostrar inviável: **pare e me diga**. Não silencie.
- Nenhuma dependência nova sem me avisar qual e por quê.
- Nenhum `TODO` órfão: pendência vai para `TASKS.md`.
- Nunca invente dado factual. Campo sem origem confirmada não renderiza.

### Ferramentas do projeto

Estão em `.claude/`. Use sem eu precisar pedir:

| Ferramenta | Quando |
|---|---|
| `/novo-bloco` | Criar ou reescrever qualquer bloco da LP |
| `/revisar-copy` | Todo texto visível, antes de commitar — inclui `alt`, erro de formulário e metadado |
| `/auditar` | Ao fechar qualquer tarefa que altere layout ou movimento, e obrigatoriamente no T12 |
| `auditor-a11y` | Subagente somente-leitura, chamado por `/auditar` para varrer sem poluir o contexto |

---

## 1. O CLIENTE

**Edivertido Salão Inclusivo** — salão e barbearia em Recife/PE, especializado em atendimento a pessoas neurodivergentes: TEA, TDAH, microcefalia, síndrome de Down, deficiência intelectual.

- Rua do Cupim, 53 — Graças, Recife/PE
- Diferencial central: **terapeuta ABA presente no atendimento**
- Instagram: @edivertidooficial (2.2k seguidores, forte em vídeo)
- Atuação social real: ação de inclusão com o Corpo de Bombeiros
- Não existe site hoje. Este é o primeiro ativo digital próprio.

---

## 2. OBJETIVO ÚNICO

**Levar a mãe até a conversa no WhatsApp.**

Não é informar. Não é institucional. Não é portfólio. Cada bloco da página existe para remover um obstáculo específico entre a dúvida dela e a mensagem enviada. Bloco que não faz isso, sai.

**Métrica primária:** taxa de clique em WhatsApp.
**Métrica secundária:** conclusão do perfil sensorial.
**Métrica de qualidade:** proporção de mensagens que chegam já com contexto (via guia ou formulário), em vez de "oi, vocês atendem autista?".

---

## 3. QUEM CONVERTE

**Mãe ou cuidadora, 28–45 anos, celular, 4G, frequentemente à noite.** Chegou buscando *"barbeiro que corta cabelo de criança autista Recife"*, quase sempre **depois de uma experiência ruim** — criança em crise, profissional despreparado, olhares de julgamento na sala.

Ela não está navegando. Está **auditando**. Já ouviu "claro, a gente atende" de quem não sabia atender. Lê a página como evidência, não como propaganda.

A página precisa responder em 5 segundos: *aqui a gente entende, e não vai dar errado de novo.*

Consequências diretas:
- Prova antes de promessa. Vídeo real antes de adjetivo.
- Nada de tom de pena ou de heroísmo. O tom é **competência tranquila**.
- Objeção principal não é preço. É medo de repetir o trauma.
- **O salão atende crianças, adolescentes e adultos.** Nunca escreva a página como se fosse só infantil. Adulto autista buscando corte é público real, com poder de compra, e é justamente quem mais reclama de ser tratado como criança. Copy padrão: *a pessoa atendida*, não *seu filho*.
- Parte relevante das próprias mães é neurodivergente (alta hereditariedade em TEA/TDAH). Clareza não é opcional.

---

## 4. O INSIGHT QUE GOVERNA O DESIGN

Olhe a logo. O "e" e o "d" se cruzam e formam uma **lemniscata — o símbolo do infinito**, que é o símbolo adotado pela comunidade autista em substituição ao quebra-cabeça. A marca já carrega isso.

**O traço contínuo é a assinatura da página**: um caminho SVG em lemniscata que atravessa a LP inteira, conectando blocos e servindo de indicador de progresso. Um traço só, do topo ao rodapé, que não quebra e não recomeça. É a metáfora exata do posicionamento.

> **Nenhuma peça de quebra-cabeça em elemento gráfico algum.** O símbolo é rejeitado por boa parte da comunidade autista adulta, pela associação com "peça faltando". A foto de perfil do Instagram tem quebra-cabeças; a LP não replica.

---

## 5. O SISTEMA TÁTIL

Aqui mora a diferenciação visual. "Tátil" tem significado preciso neste projeto: **elementos que respondem ao toque com peso, inércia e resistência**, em vez de apenas mudarem de cor. E cada um deles precisa **argumentar comercialmente**, não só impressionar.

São dois: o Regulador e o Traço. Não invente um terceiro.

### 5.1 Regulador Sensorial — o elemento-assinatura *(herói)*

Um controle deslizante vertical, arrastável, à direita do herói. Rotulado: **"Diminua o barulho do mundo"**.

Conforme a mãe arrasta para baixo:
- o movimento da página reduz progressivamente até parar
- os elementos sonoros silenciam
- o contraste suaviza e a saturação cai
- o espaçamento entre blocos aumenta
- o traço-assinatura desacelera até ficar estático

No fim do curso, aparece: **"É isso que a gente faz com o ambiente antes de sua filha ou filho sentar na cadeira."**

Esse componente é a página inteira em miniatura. A visitante *experimenta* a proposta de valor em vez de ler sobre ela. Ele também **é** o Modo Calmo — não existem dois controles.

Regras: estado persistido em `localStorage`; posição inicial já parcialmente reduzida (nunca no máximo de estímulo); operável por teclado (setas) e por clique em três posições predefinidas; `prefers-reduced-motion: reduce` inicia no extremo calmo.

### 5.2 O Traço — vinculado ao scroll

A lemniscata se desenha conforme a rolagem, contínua, sem salto. Também é o loader inicial. Detalhes técnicos em §9.2.

### Regras que valem para os dois

1. **Nenhum é obstáculo à conversão.** O botão de WhatsApp está sempre alcançável sem tocar em nenhum deles.
2. **Ambos têm alternativa por teclado e por clique.** Arrastar nunca é o único caminho, no Regulador.
3. **Ambos respeitam o nível sensorial.** No extremo calmo, o Traço vira transição simples e estática.
4. Toque com resposta em menos de 100ms. Latência mata a sensação de peso.

---

## 6. ESTRUTURA DA PÁGINA

Rolagem única. Dez blocos. Nenhum menu de navegação tradicional.

| # | Bloco | Função na conversão |
|---|---|---|
| 1 | **Herói** + Regulador Sensorial | Reconhecimento em 5s + diferenciação |
| 2 | **Faixa de números** *(condicional)* | Credibilidade imediata — só com dado verificado |
| 3 | **"Você já passou por isso?"** | Espelha a dor, cria identificação |
| 4 | **O que muda aqui** (3 provas) | Terapeuta ABA · tempo da pessoa · sem plateia |
| 5 | **Galeria real** (fotos) | Prova honesta: desconforto esperado, resultado alcançado |
| 6 | **Como funciona** (6 etapas) | Prova de protocolo, não de boa vontade |
| 7 | **Depoimentos em vídeo** | Prova social de pares |
| 8 | **"E se..."** (objeções) | Derruba a última barreira antes do preço |
| 9 | **Como funciona o valor** | Remove objeção de custo sem tabela de preço |
| 10 | **Perfil sensorial** (formulário) | Conversão qualificada |
| 11 | **Onde estamos + CTA final** | Fecha |

**Bloco 5 — galeria real.** Fotos reais do salão, sem roteiro inventado e sem curadoria só-sorriso. A cliente já forneceu material que inclui um corte difícil — criança chorando, segurada, cortando no chão — ao lado de um resultado feliz num carrinho de brinquedo. **Use os dois.** Esconder o difícil quebraria a promessa da página inteira: que aqui não fingem que é fácil, e o objetivo é alcançado mesmo assim.

Formato: grade simples de fotos, abre em lightbox ao toque, sem swipe forçado, sem física, sem narrativa passo a passo por baixo de cada uma. Uma frase de contexto acima da grade, não uma legenda por foto tentando contar uma história que as fotos não contam sozinhas:

> **"Nem todo corte é fácil. Todos são concluídos do jeito que der certo para essa pessoa."**

CTA logo abaixo: "Quero saber como vocês cuidam disso" → WhatsApp, origem própria.

Este bloco não é elemento tátil (§5). É editorial: a honestidade da imagem é o argumento, não a interação.

**Bloco 2 — faixa de números.** Só entra com dado **verificável**: nota e volume de avaliações reais do Google Business Profile, tempo de operação, número de atendimentos que a cliente consiga sustentar. Se qualquer um não puder ser comprovado, o bloco inteiro sai. Público cético confere, e número inflado de avaliação do Google é publicidade enganosa. Na dúvida, corte.

**Bloco 9 — como funciona o valor.** A cliente não trabalha com tabela fixa: o valor depende do tempo e das adaptações que cada pessoa precisa. Isso é uma vantagem, desde que dito direito.

Não invente faixa de preço, não escreva "a partir de", não use "consulte valores". Explique o critério: o que faz o atendimento levar mais tempo, o fato de que o valor é combinado **antes** da visita, e que sessão não concluída não vira cobrança dupla. O medo aqui não é gastar, é ser surpreendida na hora de pagar depois de já ter passado por constrangimento. Previsibilidade converte mais que número baixo.

Fecha com CTA para o WhatsApp com origem própria: "quero saber o valor para o meu caso".

**Bloco 8 — "E se...".** Objeções escritas como o medo real da mãe, em primeira pessoa, cada uma abrindo para uma resposta curta e concreta:

> *E se ele não quiser sentar na cadeira?*
> *E se ela não deixar encostarem na cabeça dela?*
> *E se o barulho da máquina for demais?*
> *E se não der para terminar o corte hoje?*
> *E se ele tiver uma crise no meio?*
> *E se a gente precisar ir embora antes?*

As respostas são operacionais, nunca tranquilizadoras no vazio: o que o salão faz, concretamente, em cada um desses casos. Este bloco existe porque a objeção do público não é preço, é medo de repetir o trauma — e medo não respondido não vira mensagem no WhatsApp.

**Copy dos blocos 1 e 2:**

> **H1:** Um corte de cabelo não precisa virar uma crise.
> **Sub:** Salão e barbearia em Recife com terapeuta ABA no atendimento. Para crianças, adolescentes e adultos autistas, com TDAH, microcefalia e outras condições.
> **CTA:** Falar no WhatsApp

Bloco 2, literal e sem rodeio: *Saiu do salão no meio do corte. Ouviu que a criança era "malcriada". Cortou o cabelo dormindo, em casa, com medo. Desistiu de tentar.*
Fecha com: **Nada disso é culpa de vocês. É falta de preparo de quem atendeu.**

**Rota secundária — só uma, e por exigência legal:**
- `/privacidade` — LGPD, dado que o formulário coleta informação sensível de saúde.

Sem rota de "guia imprimível" na v1: o material da cliente é documental, não uma sequência de antecipação visual (porta → cadeira → espelho). Se, no futuro, ela mandar fotos que formem essa sequência, uma rota `/guia` volta a fazer sentido — registre isso como possibilidade, não construa antes de ter o material certo.

---

## 7. CONVERSÃO — MECÂNICA

- **Botão de WhatsApp sempre visível.** Barra fixa inferior no mobile; botão no header no desktop.
- **Mensagem pré-preenchida diferente por origem de clique.** O herói manda "vim pelo site, queria saber como funciona"; a Galeria manda "quero saber como vocês cuidam disso"; o bloco de valor manda "quero saber o valor para o meu caso". Isso muda a qualidade da conversa e é rastreável.
- **`lib/whatsapp.ts` é a única fonte dessas mensagens.** Nunca monte URL solta em componente.
- CTA a cada dois blocos, no máximo. Mais que isso vira desespero e derruba confiança.
- Sem popup de saída, sem contador regressivo, sem "restam 3 vagas". O público é cético por experiência; truque de urgência destrói a credibilidade que a página inteira constrói.
- Eventos rastreados: `whatsapp_click` (com origem), `galeria_aberta`, `form_etapa_1..4`, `form_enviado`, `regulador_usado`.

---

## 8. TOKENS DE DESIGN

### Cor

Valores amostrados diretamente do arquivo original da marca. Use exatamente estes.

```
--ed-navy:      #131351   /* institucional, texto de peso, fundos densos */
--ed-green:     #77B900   /* ação, confirmação, estados de sucesso */
--ed-orange:    #FCA700   /* o traço-assinatura e o CTA primário */
--ed-white:     #FFFFFF

--ed-surface:   #FAFAFC   /* fundo padrão */
--ed-surface-2: #F0F0F5   /* cards, seções alternadas */
--ed-ink:       #131351   /* texto corrido */
--ed-ink-soft:  #4A4B72   /* texto secundário */
--ed-line:      #DCDCE8   /* bordas hairline */
```

**Contrastes verificados — respeite sem exceção:**

| Combinação | Razão | Veredito |
|---|---|---|
| Navy sobre branco | 16.9:1 | ✅ AAA |
| Navy sobre laranja | 8.6:1 | ✅ AAA |
| Navy sobre verde | 7.0:1 | ✅ AAA |
| **Branco sobre laranja** | **2.0:1** | ❌ reprova |
| **Branco sobre verde** | **2.4:1** | ❌ reprova |
| **Laranja sobre branco** | **2.0:1** | ❌ reprova |
| **Verde sobre branco** | **2.4:1** | ❌ reprova |

Consequência direta: **verde e laranja só existem como fundo, e o texto sobre eles é sempre navy.** Nunca branco. E nenhum dos dois pode ser cor de texto sobre fundo claro — nem em link, nem em número de destaque, nem em ícone informativo.

Outras regras:
- Navy é a base. Verde e laranja são acentos, nunca fundo de seção inteira.
- Laranja é reservado ao traço-assinatura e ao CTA primário (com texto navy). Se aparecer num terceiro lugar, remova.
- Verde reservado a confirmação e sucesso.
- Sem gradiente decorativo. O único degradê permitido é o do traço-assinatura (navy → laranja → verde), porque reproduz a logo.

### Tipografia

```
Display:  Archivo — 700 / 800, tracking -0.02em
Corpo:    Atkinson Hyperlegible Next — 400 / 700
Utility:  Archivo 600, uppercase, tracking 0.08em (eyebrows, labels)
```

**Atkinson Hyperlegible não é escolha estética, é escolha de briefing:** foi desenhada pelo Braille Institute para maximizar diferenciação de caracteres em baixa visão. Num site sobre acessibilidade, a fonte do corpo é argumento. Archivo no display porque o wordmark "EDIVERTIDO" já é um grotesco pesado e levemente estreito — a continuidade é natural.

Escala (mobile → desktop):
```
h1  34px / 56px   line-height 1.1
h2  26px / 38px   line-height 1.2
h3  20px / 24px   line-height 1.3
p   17px / 18px   line-height 1.65
sm  15px          line-height 1.6
```

- Corpo nunca abaixo de 17px no mobile.
- Largura máxima de parágrafo: 68 caracteres.
- **Texto sempre alinhado à esquerda. Nunca justificado** (rios de espaço prejudicam leitura em dislexia, comorbidade frequente).
- Sem texto em caixa alta em blocos maiores que 3 palavras.

### Forma e espaço

- Raio: 16px em cards, 999px em botões e pílulas. A marca é toda curva contínua; cantos vivos brigam com ela.
- Sombras: uma só, suave — `0 2px 16px rgba(27,28,99,0.08)`. Sem glassmorphism, sem neon, sem glow.
- Espaçamento em múltiplos de 8. Seções com respiro generoso: 80px mobile, 128px desktop.
- Alvo de toque mínimo: 48×48px, com 8px de folga entre alvos.

---

---

## 9. STACK, ESTRUTURA, MOVIMENTO E ASSETS

### Stack

- **Next.js 15, App Router, TypeScript strict**, SSG
- Tailwind v4 + `shadcn/ui` (só o que for usado)
- `framer-motion` para física e orquestração
- `next/font` self-hosted (Archivo + Atkinson Hyperlegible)
- `next/image` sempre. Nunca `<img>` cru.
- Sem backend, sem banco, sem auth. Formulário sai por `wa.me`, fallback `mailto`.
- Metas: LCP < 2.5s em 4G, CLS < 0.1, JS inicial < 200KB gzip.
- Vídeos com `poster` e `preload="none"`. Nunca autoplay com som.

### Estrutura

```
app/
  layout.tsx            fonts, metadata, providers
  page.tsx              a landing page (composição de blocos)
  privacidade/page.tsx
  sitemap.ts  robots.ts
  globals.css           tokens
components/
  blocos/               um arquivo por bloco da LP, na ordem
  tatil/                ReguladorSensorial
  galeria/               GaleriaReal (grade + lightbox)
  marca/                Logo, TracoAssinatura
  form/                 etapas do perfil sensorial
  ui/                   shadcn
lib/
  sensorial.ts          estado do Regulador, consumido por tudo
  whatsapp.ts           mensagens por origem
  schema.ts             JSON-LD
  conteudo/             toda a copy, tipada
public/
  marca/  fotos/  galeria/
```

- Client Components só onde houver estado, física ou evento. Todo o resto é Server Component.
- **Toda copy vive em `lib/conteudo/`, tipada.** A cliente vai pedir mudança semanal; ninguém quer caçar string em JSX.
- Nenhum componente lê `prefers-reduced-motion` direto. Todos consomem `useSensorial()`.
- Nenhum hex fora de `globals.css`.

### Movimento — regras globais

Intensidade é controlada pelo Regulador (§5.1), que também absorve `prefers-reduced-motion`. Além disso, sempre:

1. **Nada pisca acima de 3 vezes por segundo.** Não negociável — comorbidade com epilepsia é relevante em TEA e microcefalia. WCAG 2.3.1.
2. Durações 180–400ms, easing `cubic-bezier(0.22, 1, 0.36, 1)`. Nada acima de 600ms.
3. Reveals disparam uma vez. Nada re-anima ao rolar para cima.
4. Sem carrossel automático, sem loop infinito no campo de visão, sem cursor customizado, sem scroll hijacking.
5. Parallax, quando houver, no máximo 12% de deslocamento diferencial.
6. Anime só `transform` e `opacity`.

### Deploy e domínio

Projeto **separado** na conta Vercel da Prompts360 — não é rota nem subpath do site da agência. Deploy, rollback e métricas de Core Web Vitals precisam ser independentes por cliente. Um deploy quebrado do Edivertido não pode derrubar a Prompts360, e vice-versa.

O domínio é próprio do cliente. **Nunca sirva este site sob um subdomínio ou subpasta da Prompts360**, nem em caráter provisório: o SEO local depende de autoridade no domínio próprio e da vinculação com o Google Business Profile do salão. URL de preview indexada custa meses para limpar.

**O domínio nunca aparece hardcoded no código.** Uma variável, uma fonte de verdade:

```
NEXT_PUBLIC_SITE_URL=https://<dominio-do-cliente>
```

Consomem essa variável, sem exceção:
- `metadataBase` em `app/layout.tsx`
- `app/sitemap.ts` e `app/robots.ts`
- `url`, `sameAs` e OG image no JSON-LD (`lib/schema.ts`)
- todo link canônico

Configuração de domínio:
- Escolher **um** canônico (apex ou `www`) e redirecionar o outro com 308. Não deixe os dois respondendo 200.
- HTTPS forçado, HSTS ligado.
- Deploys de preview precisam sair com `X-Robots-Tag: noindex`. Confirme — não presuma.
- Analytics em propriedade própria do cliente, separada da Prompts360.
- Google Search Console e Google Business Profile: propriedade do cliente, com o domínio verificado. Esse é o par que faz o SEO local funcionar; sem ele, o resto do trabalho de busca rende metade.

---

### Scripts

```json
{
  "dev": "next dev",
  "build": "next build",
  "lint": "next lint",
  "typecheck": "tsc --noEmit",
  "verify": "npm run typecheck && npm run lint && npm run build"
}
```

### Assets

####  Estado real dos arquivos entregues

**Os SVGs enviados não são vetores de marca.** São autotraces (potrace) feitos a partir dos JPEGs: todos monocromáticos em `#000000`, silhueta preenchida, sem separação de camadas de cor. Um deles (`logo-completo-nome-branco-inicial-branca.svg`) está **vazio**, sem nenhum path.

Portanto:

- **Use os JPEGs** para exibição da logo no site. Eles têm as cores corretas.
- **Não use os SVGs** como logo. Não escalam com as cores da marca.
- `logo-fundo-azul.svg` é a única exceção útil: contém a silhueta completa da lemniscata (e + d + traço de ligação) em path fechado. Serve como máscara/`clip-path`, não como logo.
- Solicitar à cliente o arquivo original do designer (`.ai`, `.cdr`, `.eps` ou SVG com camadas) e substituir depois. Marque como pendência.

| Arquivo | Uso |
|---|---|
| `logo-fundo-branco.jpeg` | header em fundo claro |
| `logo-fundo-azul.jpeg` | footer, herói, OG image, favicon |
| `logo-fundo-verde.jpeg` / `logo-fundo-amarelo.jpeg` | uso pontual, não no layout principal |
| `logo-completo-nome-branco.jpeg` | sobre foto escura |
| `logo-fundo-azul.svg` | máscara da lemniscata (não é logo) |
| demais `.svg` | **não usar** |

####  Traço-assinatura — path pronto

Como o vetor de marca não veio utilizável, o traço-assinatura usa esta lemniscata autoral, já ajustada às proporções e às cores do logotipo. Implemente em `components/marca/TracoAssinatura.tsx`:

```svg
<svg viewBox="0 0 400 200" fill="none" aria-hidden="true">
  <defs>
    <linearGradient id="edTraco" x1="0" y1="0" x2="400" y2="0"
                    gradientUnits="userSpaceOnUse">
      <stop offset="0%"   stop-color="#131351"/>
      <stop offset="40%"  stop-color="#131351"/>
      <stop offset="50%"  stop-color="#FCA700"/>
      <stop offset="60%"  stop-color="#77B900"/>
      <stop offset="100%" stop-color="#77B900"/>
    </linearGradient>
  </defs>
  <path
    id="ed-lemniscata"
    pathLength="1"
    d="M 200,100
       C 160,38 62,38 62,100
       C 62,162 160,162 200,100
       C 240,38 338,38 338,100
       C 338,162 240,162 200,100"
    stroke="url(#edTraco)"
    stroke-width="22"
    stroke-linecap="round"
    stroke-linejoin="round"/>
</svg>
```

`pathLength="1"` está ali de propósito: normaliza o comprimento, então a animação de desenho é simplesmente `stroke-dasharray: 1` com `stroke-dashoffset` indo de `1` a `0`, e o progresso de scroll mapeia direto de 0 a 1 sem cálculo de `getTotalLength()`.

Comportamentos:
- **Loader:** desenha em 900ms com easing `cubic-bezier(0.22, 1, 0.36, 1)`, depois cross-fade para a logo.
- **Progresso de scroll:** `stroke-dashoffset` vinculado ao progresso da página, contínuo, sem salto.
- **Divisor de seções:** versão em `stroke-width: 3` e opacidade 0.25, estática.
- Sempre `aria-hidden="true"`. É decorativo e não deve ser anunciado.

####  Fotografia

Enquanto as fotos reais não chegam, use placeholders com a proporção e o `alt` corretos, marcados visualmente como pendentes. **Nunca use banco de imagem com criança genérica** — descaracteriza a prova social, que é o ativo principal deste site.

Favicon e ícones PWA gerados a partir de `logo-fundo-azul.jpeg`.

---

---

## 10. ACESSIBILIDADE — CRITÉRIO DE ENTREGA, NÃO ITEM OPCIONAL

- **WCAG 2.2 nível AA em todas as páginas.**
- HTML semântico: `header`, `nav`, `main`, `section`, `footer`, hierarquia de headings sem pular níveis.
- Foco visível e forte em todos os interativos: outline de 3px em `--ed-orange` com offset de 2px.
- "Pular para o conteúdo" como primeiro elemento focável.
- `alt` descritivo em toda imagem informativa; `alt=""` em decorativas.
- Legendas em todos os vídeos. Transcrição nos depoimentos.
- Nada comunicado só por cor.
- Todo ícone acompanhado de rótulo textual.
- Site funciona com zoom de 200% sem scroll horizontal.
- `lang="pt-BR"` no html.

---

## 11. SEO LOCAL

O nicho tem volume de busca real e quase nenhuma concorrência otimizada em Recife.

- Title da home: `Salão e Barbearia Inclusivos em Recife | Atendimento a Autistas — Edivertido`
- Meta description com "criança autista", "TEA", "TDAH", "Recife", "Graças".
- JSON-LD: `HairSalon` + `LocalBusiness`, com `address`, `geo`, `openingHoursSpecification`, `telephone`, `sameAs` (Instagram), `areaServed` (Recife, Olinda, Jaboatão, Camaragibe).
- H1 único na página, contendo a intenção de busca. Os demais blocos usam h2.
- URLs em português, sem stopwords.
- `sitemap.xml` e `robots.txt`.
- Open Graph + Twitter Card com imagem 1200×630 usando a versão da logo em fundo navy.

---

---

## 12. NÃO FAÇA

- Peça de quebra-cabeça em qualquer elemento gráfico
- Menu de navegação tradicional, abas, ou qualquer coisa que sugira "site institucional"
- Carrossel automático, autoplay com som, loop de vídeo em close
- Popup de saída, contador regressivo, escassez fabricada
- Glassmorphism, neon, glow, gradiente decorativo, cursor customizado
- Scroll hijacking; arraste horizontal que capture gesto vertical
- Piscar acima de 3Hz em qualquer lugar
- Texto justificado, texto abaixo de 17px no mobile, caixa alta em blocos
- Linguagem capacitista: "sofre de autismo", "portador", "criança especial", "normal". Use *pessoa autista*, *pessoa com TEA*, *neurodivergente*, *neurotípico*.
- Tom de pena ou de heroísmo
- Prometer resultado terapêutico. É um salão com suporte especializado, não serviço de saúde.
- Tabela de preços, faixa de valor ou "a partir de". O valor é combinado caso a caso, no WhatsApp.
- Foto de banco de imagem ou imagem gerada por IA representando clientes, equipe ou o espaço. A prova social real é o produto aqui, e a cliente já tem 303 posts de atendimento verdadeiro.
- Número inventado ou arredondado para cima: nota do Google, volume de avaliações, quantidade de atendimentos, "100% das famílias". Só entra o que a cliente comprovar.
- Escrever a página como salão exclusivamente infantil ("seu filho" em todo lugar, "salão infantil")
- Confete, rabisco, estrelinha e adesivo espalhados. Numa página que vende regulação de estímulo, poluição visual é contradição performática.

---

## 13. DADOS A CONFIRMAR

Nada disso pode ser inventado. Pendência visível e me avise.

- Número de WhatsApp
- Horário de funcionamento
- Nome e formação da terapeuta ABA
- CNPJ e razão social
- Estacionamento? Acesso para cadeirante? Banheiro adaptado?
- Arquivo vetorial original da logo
- ~~As 4 fotos do Percurso~~ — recebidas, ver §6 bloco 5
- Autorização de imagem das famílias
- Acesso ao Google Business Profile do salão
- **Nota e número real de avaliações no Google** — sem isso, o bloco 2 não existe
- Número real de atendimentos e tempo de operação
- Respostas operacionais para cada objeção do bloco 8

---

As tarefas e a ordem de execução estão em `TASKS.md`.
