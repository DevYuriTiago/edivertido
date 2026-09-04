---
name: novo-bloco
description: Construir um bloco da landing page do Edivertido seguindo as convenções do projeto. Use sempre que for criar ou reescrever qualquer um dos 11 blocos definidos em CLAUDE.md §6, ou quando o pedido mencionar herói, percurso, objeções, depoimentos, serviços, perfil sensorial ou faixa de números.
---

# Construir um bloco da LP

Não comece pelo JSX. A ordem abaixo existe porque cada etapa impede um erro específico que já aconteceu neste projeto.

## 1. Situar

Leia `CLAUDE.md` §6 e identifique o bloco pelo número. Diga em uma frase **qual obstáculo de conversão ele remove**. Se não conseguir dizer, o bloco não deveria existir: pare e me pergunte.

## 2. Conteúdo primeiro

Crie ou atualize `lib/conteudo/<bloco>.ts` com um tipo explícito e os dados.

Nenhuma string de interface fica no componente. Nenhum dado factual (preço, número, horário, nome) é inventado: se falta, o campo é opcional no tipo e o bloco **não renderiza** quando ausente. Placeholder plausível é pior que buraco visível, porque sobrevive até produção.

## 3. Estrutura antes de estilo

Monte o HTML semântico completo e navegue por teclado antes de aplicar qualquer classe visual. `<section>` com `aria-labelledby` apontando para o `<h2>` do bloco. Só a home tem `<h1>`, e é o do herói.

## 4. Estilo

Só tokens de `globals.css`. Nenhum hex.

Cor de fundo verde ou laranja exige texto navy — branco reprova contraste nas duas (ver `CLAUDE.md` §8). Alvo de toque mínimo 48×48 com 8px de folga. Corpo nunca abaixo de 17px no mobile. Alinhamento à esquerda, nunca justificado.

Antes de aceitar o layout, verifique se ele não caiu no padrão "gerado por IA": grade de cards idênticos, ícone repetido em cada item, três colunas equivalentes sem hierarquia. Se caiu, redesenhe com hierarquia real, pesos diferentes e assimetria intencional.

## 5. Movimento

Todo movimento passa por `useSensorial()`. Nenhum componente lê `prefers-reduced-motion` direto.

Anime só `transform` e `opacity`. Reveal dispara uma vez e não re-anima ao rolar para cima. Nível sensorial 0 deixa o bloco completamente estático.

## 6. Conversão

Se o bloco tem CTA, a mensagem vem de `lib/whatsapp.ts` com origem própria, e o evento correspondente dispara. Nunca monte URL de WhatsApp no componente.

## 7. Verificar antes de entregar

- [ ] `npm run verify` verde
- [ ] Navegação completa por teclado, foco visível
- [ ] Sem scroll horizontal a 390px e a 200% de zoom
- [ ] Nenhum hex fora de `globals.css`, nenhuma string fora de `lib/conteudo/`
- [ ] Nível sensorial 0 elimina o movimento
- [ ] Rode a skill `revisar-copy` no texto do bloco

Ao terminar, marque o item correspondente em `TASKS.md` e pare. Não emende o próximo bloco.
