---
name: auditar
description: Auditoria de acessibilidade, contraste, movimento e performance da landing page do Edivertido. Use ao fechar qualquer tarefa do TASKS.md, antes de qualquer commit que altere layout ou movimento, e obrigatoriamente na tarefa T12.
---

# Auditoria

Delegue a varredura ao subagente `auditor-a11y` para não poluir o contexto principal, depois corrija você mesmo o que ele apontar.

Reporte cada item como **passa / falha / não verificável**, com o arquivo e a linha. Não escreva "provavelmente ok". Item não verificado é falha.

## 1. Contraste

Nenhum texto abaixo de 4.5:1. Ícone e borda de componente, mínimo 3:1.

Os erros prováveis neste projeto, porque as cores da marca convidam a eles:
- branco sobre `--ed-green` (2.4:1) → reprova
- branco sobre `--ed-orange` (2.0:1) → reprova
- verde ou laranja como cor de **texto** sobre fundo claro → reprova

Verde e laranja só como fundo, sempre com texto navy.

## 2. Teclado

Percorra a página inteira só com Tab, Shift+Tab, Enter, Espaço e setas.

- Foco visível em todo interativo: outline 3px laranja, offset 2px
- Ordem de foco segue a ordem visual
- "Pular para o conteúdo" é o primeiro focável
- Regulador Sensorial operável por seta
- Percurso navegável sem arrastar
- Nenhuma armadilha de foco
- A barra fixa inferior não esconde o último elemento focável

## 3. Movimento

- Nada pisca acima de 3 vezes por segundo, em lugar nenhum
- Nível sensorial 0 elimina todo movimento não essencial
- `prefers-reduced-motion: reduce` inicia no nível 0
- Nenhum reveal re-anima ao rolar para cima
- Parallax dentro de 12% de deslocamento
- Nenhuma animação fora de `transform` e `opacity`
- Arraste horizontal não captura gesto vertical
- Rota `/guia` sem movimento algum

## 4. Áudio

- Nada toca sozinho
- Som da máquina só sob pressão contínua, iniciando abaixo de 30%
- Indicador visual sempre presente onde há áudio

## 5. Estrutura e semântica

- Um `<h1>` na página, hierarquia sem pular níveis
- `lang="pt-BR"`
- Landmarks corretos, cada `<section>` com `aria-labelledby`
- Formulário com label visível, erro descritivo ao lado do campo, `aria-live` na troca de etapa
- Nada comunicado só por cor
- Todo ícone acompanhado de rótulo textual

## 6. Responsivo

- 390px sem scroll horizontal
- Zoom 200% sem scroll horizontal
- Alvos de toque 48×48 com 8px de folga

## 7. Performance

- Lighthouse mobile: Performance ≥ 90, Acessibilidade 100, SEO ≥ 95
- LCP < 2.5s em throttling 4G, CLS < 0.1, JS inicial < 200KB gzip
- Imagens com `width`/`height` declarados, WebP, `priority` só no herói
- Vídeo com `poster` e `preload="none"`

## 8. Integridade de conteúdo

- Nenhum dado factual inventado sobrevivendo como placeholder
- Nenhuma imagem gerada por IA representando cliente, equipe ou espaço
- `grep -rn "https://" app lib components` não retorna o domínio hardcoded

Ao final, liste as falhas em ordem de gravidade e proponha a correção de cada uma antes de aplicar qualquer coisa.
