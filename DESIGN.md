---
name: Edivertido Salão Inclusivo
description: Salão e barbearia em Recife, montado como um quebra-cabeça colorido que encaixa, e que vira branco, plano e parado com um toque.
colors:
  navy: "#131351"
  laranja: "#FCA700"
  verde: "#77B900"
  branco: "#FFFFFF"
  navy-80: "#424274"
  navy-15: "#DCDCE5"
  navy-06: "#F1F1F5"
typography:
  display:
    fontFamily: "Barlow Condensed, sans-serif"
    fontSize: "clamp(3rem, 1.6rem + 6vw, 6rem)"
    fontWeight: 800
    lineHeight: 0.92
    letterSpacing: "-0.005em"
  headline:
    fontFamily: "Barlow Condensed, sans-serif"
    fontSize: "clamp(2.4rem, 1.5rem + 3.6vw, 4.5rem)"
    fontWeight: 800
    lineHeight: 0.92
    letterSpacing: "-0.005em"
  title:
    fontFamily: "Barlow Condensed, sans-serif"
    fontSize: "clamp(1.5rem, 1.2rem + 1vw, 2rem)"
    fontWeight: 800
    lineHeight: 1
    letterSpacing: "-0.005em"
  body:
    fontFamily: "Atkinson Hyperlegible Next, system-ui, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: "Barlow Condensed, sans-serif"
    fontSize: "1.15rem"
    fontWeight: 700
    lineHeight: 1
    letterSpacing: "0.01em"
rounded:
  foco: "6px"
  peca-calma: "14px"
  campo: "16px"
  painel: "28px"
  pilula: "999px"
spacing:
  gap-sm: "8px"
  gap-md: "16px"
  margem-mobile: "20px"
  margem-desktop: "32px"
  secao: "clamp(5rem, 3rem + 7vw, 9rem)"
  secao-calma: "clamp(3.5rem, 2.5rem + 3vw, 5rem)"
components:
  button-primary:
    backgroundColor: "{colors.laranja}"
    textColor: "{colors.navy}"
    typography: "{typography.label}"
    rounded: "{rounded.pilula}"
    padding: "0 28px"
    height: "52px"
  button-navy:
    backgroundColor: "{colors.navy}"
    textColor: "{colors.branco}"
    typography: "{typography.label}"
    rounded: "{rounded.pilula}"
    padding: "0 28px"
    height: "52px"
  button-branco:
    backgroundColor: "{colors.branco}"
    textColor: "{colors.navy}"
    typography: "{typography.label}"
    rounded: "{rounded.pilula}"
    padding: "0 28px"
    height: "52px"
  button-contorno:
    textColor: "currentColor"
    typography: "{typography.label}"
    rounded: "{rounded.pilula}"
    padding: "0 28px"
    height: "52px"
  input:
    backgroundColor: "{colors.branco}"
    textColor: "{colors.navy}"
    rounded: "{rounded.campo}"
    padding: "0 16px"
    height: "48px"
  painel-formulario:
    backgroundColor: "{colors.navy-06}"
    textColor: "{colors.navy}"
    rounded: "{rounded.painel}"
    padding: "40px"
  peca-navy:
    backgroundColor: "{colors.navy}"
    textColor: "{colors.branco}"
  peca-branca:
    backgroundColor: "{colors.branco}"
    textColor: "{colors.navy}"
  peca-verde:
    backgroundColor: "{colors.verde}"
    textColor: "{colors.navy}"
---

# Design System: Edivertido Salão Inclusivo

## Overview

**Creative North Star: "O Quebra-Cabeça Que Encaixa"**

A página é um quebra-cabeça montado. Cada seção é um campo plano e saturado de uma única cor da marca (navy, laranja, verde ou branco), e a seção de baixo sobe sobre a de cima por uma costura de encaixes. Dentro das seções, fotos reais e blocos de texto são recortados em peças de verdade, geradas por código, com encaixes que se fecham sem fresta nas vizinhas. A linguagem de quebra-cabeça foi fixada pela cliente; o sistema existe para que ela seja executada com rigor, nunca como enfeite solto.

O tipo de display é um grotesco condensado ExtraBold em caixa alta, a mesma voz do wordmark EDIVERTIDO; o corpo é Atkinson Hyperlegible Next, escolhida pela legibilidade em baixa visão. A densidade é baixa: poucas coisas grandes por tela, respiro generoso entre seções.

O sistema tem dois estados, não um. O interruptor "Tirar ruído" transforma a página inteira em branco, plano e parado: campos de cor somem, peças viram retângulos de canto suave, sombras e movimento desligam, fotos ficam menores. Todo componente novo precisa ter as duas aparências.

**Key Characteristics:**
- Quatro cores de marca, nenhuma outra; tons intermediários são só misturas do próprio navy com branco.
- Uma cor comprometida por seção, costuras de encaixe entre seções.
- Peças de quebra-cabeça procedurais, com área de texto segura e linha de corte nas fotos.
- Display condensado em caixa alta, corpo hiperlegível.
- Botões em pílula; a ação é sempre "Chamar no WhatsApp".
- Modo "Tirar ruído": branco, plano, parado.

## Colors

Paleta de marca saturada e plana, usada em campos inteiros, com o navy como base e regra de contraste rígida.

### Primary
- **Navy Edivertido** (#131351): texto corrido, campos de seção densos (herói, galeria, fechamento), peças escuras, botão secundário. Base de todo o sistema.

### Secondary
- **Laranja Encaixe** (#FCA700): campo da seção de serviços, peça da logo no herói, botão primário de WhatsApp, anel de foco sobre navy, seleção de texto. Sempre com texto navy.

### Tertiary
- **Verde Confirmação** (#77B900): campo da seção "Como funciona" e peças verdes da grade de serviços. Sempre com texto navy.

### Neutral
- **Branco** (#FFFFFF): fundo padrão, campos brancos, peças claras, header, barra fixa mobile, e o único fundo do modo "Tirar ruído".
- **Navy 80** (#424274, mistura 80% navy): texto secundário sobre branco.
- **Navy 15** (#DCDCE5, mistura 15% navy): linhas hairline (header, barra fixa, divisórias, bordas de campo), trilho do interruptor desligado, divisória entre seções no modo calmo.
- **Navy 06** (#F1F1F5, mistura 6% navy): painel do formulário e trilho da barra de progresso.

### Named Rules
**The Navy On Color Rule.** Sobre laranja e sobre verde, o texto é sempre navy, nunca branco. Branco só sobre navy. Laranja e verde nunca são cor de texto sobre fundo claro.

**The Four Colors Rule.** Só existem navy, laranja, verde e branco. Qualquer tom extra é `color-mix` do navy com branco, nunca uma cor nova. Nenhum hex fora de `app/globals.css`.

**The One Field Rule.** Cada seção compromete uma cor inteira no fundo. Duas seções vizinhas não repetem o mesmo campo colorido.

## Typography

**Display Font:** Barlow Condensed (fallback sans-serif), pesos 600/700/800
**Body Font:** Atkinson Hyperlegible Next (fallback system-ui, sans-serif)

**Character:** Um condensado pesado e gritado em caixa alta, que conversa com o wordmark, apoiado por um corpo calmo e projetado para diferenciar caracteres. O display faz barulho; o corpo nunca.

### Hierarchy
- **Display** (800, clamp(3rem → 6rem), 0.92, caixa alta): H1 do herói e título de fechamento. No modo calmo cai para clamp(2.4rem → 3.75rem).
- **Headline** (800, clamp(2.4rem → 4.5rem), 0.92, caixa alta): H2 de seção, com largura limitada entre 12ch e 16ch. No modo calmo, clamp(2rem → 3rem).
- **Headline frase** (800, sem caixa alta, line-height 1.02): quando o título é uma frase completa (galeria, faixa de números), a caixa alta sai.
- **Title** (800, clamp(1.5rem → 2rem), 1, caixa alta): H3, rótulos de prova, perguntas de objeção.
- **Body** (400, 17px mobile / 18px desktop, 1.6): texto corrido, sempre alinhado à esquerda, medida máxima de 62ch.
- **Label** (Barlow 700, 1.15rem, 0.01em, caixa alta): botões e o rótulo do interruptor. Nunca mais de três palavras.

### Named Rules
**The Shout And Calm Rule.** Caixa alta só no display condensado e em rótulos de até três palavras; frase inteira como título perde a caixa alta. O corpo nunca é caixa alta, nunca justificado.

## Layout

Rolagem única em seções de largura total, cada uma com padding vertical clamp(5rem → 9rem) (modo calmo: clamp(3.5rem → 5rem), com hairline navy 15 no topo). Contêineres centrados de 1240px (herói, prova, fechamento), 1100px (serviços, galeria, como funciona) e 860px (objeções), com margens laterais de 20px no mobile e 32px a partir de 768px. Seções de duas colunas usam grade de 12 colunas a partir de 1024px (6/6 no herói e fechamento, 5/7 em inclusivo e antes da visita); abaixo disso empilham.

As grades de peças recebem recuo lateral de 4% a 8% para que os encaixes de borda tenham onde transbordar; o corte horizontal acontece na seção (`overflow-x: clip`), nunca na página. Grades de peças mudam de densidade por breakpoint (serviços 2 → 4 colunas, como funciona 1 → 2), renderizadas como duas grades com ids próprios.

No mobile, uma barra fixa branca no rodapé carrega o botão de WhatsApp em largura total, e o conteúdo reserva 96px embaixo para ela nunca cobrir nada. No desktop o botão vai para o header fixo de 72px.

## Elevation & Depth

O sistema é plano. Campos de cor não têm sombra, gradiente nem textura. A única profundidade é uma sombra projetada difusa sob o quebra-cabeça montado como um todo, para que o conjunto de peças pareça um objeto sobre o campo. No modo calmo, até ela some.

### Shadow Vocabulary
- **Sombra do quebra-cabeça** (`filter: drop-shadow(0 10px 24px color-mix(in srgb, #131351 28%, transparent))`): aplicada só ao grupo montado de peças (herói, serviços, inclusivo, galeria, como funciona).

### Named Rules
**The Assembled Shadow Rule.** A sombra vai no quebra-cabeça montado, nunca em cada peça: peça por peça, uma sombra suja a vizinha e o campo de cor deixa de ser plano.

## Shapes

Duas famílias de forma convivem: a curva contínua (botões e interruptor em pílula de 999px, campos de 16px, painel de 28px) e o recorte de quebra-cabeça. As peças são geradas em `lib/puzzle.ts`: cada borda é lisa, "fora" (encaixe saliente) ou "dentro" (encaixe vazado), e a grade alterna em xadrez para que toda borda interna encaixe e toda borda externa seja lisa. O encaixe tem profundidade de 0.24 do menor lado da peça, e a caixa da peça ganha essa folga em todos os lados; peças retangulares (4×3, 3×2, 4×5, 2×1) usam a mesma curva em escala do menor lado.

Entre seções, a costura é uma faixa de 40px com um encaixe a cada 140px, máscara repetida (nunca esticada), na cor da seção de baixo.

### Named Rules
**The Safe Center Rule.** Texto dentro de peça fica no miolo: o corpo da peça menos a profundidade do encaixe nos lados "dentro", com o mesmo recuo nos dois lados opostos para o texto ficar centrado e rótulos vizinhos alinharem na mesma linha.

**The Cut Line Rule.** Peça com foto sangrando leva um contorno de 6px na cor do campo da seção ao longo do recorte. Sem ele, fotos vizinhas viram colagem com buracos em vez de peças encaixadas.

**The Flatten Rule.** No modo calmo, toda peça vira retângulo de 14px de raio com hairline interna navy 15, sem encaixe, sem contorno, sem sombra; peças de cor viram brancas com texto navy.

## Components

### Buttons
Pílulas firmes, de toque grande, que reagem com peso físico.
- **Shape:** pílula (999px), altura mínima de 52px, 28px de padding lateral, ícone do WhatsApp (Phosphor, bold, 22–24px) à esquerda com 0.6rem de espaço.
- **Primary:** laranja com texto navy, rótulo "Chamar no WhatsApp" em todo lugar. É o CTA de herói, galeria, fechamento, header e barra fixa.
- **Navy:** navy com texto branco, para o CTA dentro de seção branca (bloco de valor).
- **Contorno:** sem fundo, anel interno de 2px em `currentColor`; ação secundária ("Como chegar", "Voltar").
- **Hover / Active:** em ponteiro fino sobe 2px no hover; no toque, escala 0.97 no active. 160ms, `cubic-bezier(0.23, 1, 0.32, 1)`.
- **Modo calmo:** laranja e branco viram navy com texto branco.

### Interruptor "Tirar ruído"
Um switch real (`role="switch"`), no header, com alvo mínimo de 48px. Trilho de 48×28px em navy 15 com bolinha navy de 20px; ligado, o trilho fica navy e a bolinha branca desliza 20px (220ms). Rótulo em Barlow 700 caixa alta. O estado vive em `data-calmo` no `<html>`, escrito antes da primeira pintura para não piscar.

### Peças de quebra-cabeça (assinatura)
- **Peça de cor:** campo navy (texto branco), branco ou verde (texto navy), com ícone Phosphor bold de 36px e rótulo em Title; cores distribuídas na grade para que vizinhas não repitam.
- **Peça de foto:** foto real em `object-cover` sangrando pela caixa inteira, com linha de corte.
- **Peça de etapa:** número grande em display ao lado de título e descrição, alternando branco e navy.
- **Movimento:** no herói, quatro peças chegam de fora com rotação e encaixam em mola (0.9s, bounce 0.28, 120ms entre peças), arrastáveis só com mouse e voltando ao lugar; em "Como funciona" as seis etapas encaixam uma vez ao entrar na tela. No modo calmo e com movimento reduzido, tudo fica parado e visível.

### Cards / Containers
- **Painel do formulário:** navy 06, raio de 28px, padding de 24px (mobile) a 40px. Sem sombra, sem borda.
- **Lightbox:** fundo navy a 90%, foto com raio de 16px, controles circulares brancos de 48px com ícone navy.

### Inputs / Fields
- **Style:** fundo branco, borda de 1px navy 15, raio de 16px, altura mínima de 48px, 16px de padding lateral, texto navy; rótulo em negrito acima.
- **Progresso:** trilho de 8px em navy 06 com preenchimento navy, em pílula.

### Navigation
Não há menu. O header é branco, fixo, 72px, com hairline navy 15 embaixo: logo à esquerda; interruptor e botão primário à direita (o botão some no mobile, onde a barra fixa assume). O primeiro focável é "Pular para o conteúdo", pílula navy com texto branco.

### Foco
Anel de 3px com 3px de offset e 6px de raio, navy sobre fundos claros, laranja dentro de seções navy (a variável `--anel` troca por seção).

## Do's and Don'ts

### Do:
- **Do** dar a cada seção um único campo de cor de marca e abrir a seção seguinte com a costura de encaixes na cor dela.
- **Do** gerar toda peça por `caminhoPeca`/`bordasNaGrade` e montar peças vizinhas com bordas opostas, para que fechem sem fresta.
- **Do** manter o texto de peça no miolo seguro e a linha de corte de 6px em toda peça de foto.
- **Do** pôr a sombra só no grupo montado (0 10px 24px, navy a 28%).
- **Do** usar texto navy sobre laranja e verde, branco só sobre navy.
- **Do** rotular todo CTA de WhatsApp como "Chamar no WhatsApp", em pílula laranja (ou navy dentro de seção branca).
- **Do** desenhar cada componente novo também no modo "Tirar ruído": branco, plano, parado, fotos limitadas a 34rem.
- **Do** marcar todo elemento animado com `.mov` para que o modo calmo e o movimento reduzido o congelem visível.

### Don't:
- **Don't** usar cor fora de navy, laranja, verde e branco, nem tom que não seja mistura do navy com branco.
- **Don't** pôr texto branco sobre laranja ou verde, nem laranja ou verde como cor de texto sobre fundo claro.
- **Don't** aplicar sombra peça por peça, nem gradiente, glow ou textura nos campos de cor.
- **Don't** espalhar peças soltas como enfeite: peça existe dentro de um quebra-cabeça que encaixa e carrega conteúdo (foto, serviço, etapa, logo).
- **Don't** usar caixa alta em frase longa ou em corpo de texto, nem justificar texto.
- **Don't** esticar a costura: o encaixe tem escala real de 140px em qualquer largura.
