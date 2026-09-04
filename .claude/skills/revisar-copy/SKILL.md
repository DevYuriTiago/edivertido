---
name: revisar-copy
description: Revisar qualquer texto que vá aparecer no site do Edivertido antes de commitar. Use sempre que escrever ou alterar conteúdo em lib/conteudo/, texto de botão, título, mensagem de WhatsApp, alt de imagem, metadado ou mensagem de erro de formulário.
---

# Revisão de copy

Rode isto sobre **todo** texto visível ao usuário, incluindo `alt`, `aria-label`, placeholder, mensagem de erro e metadado. Falha aqui não é detalhe de estilo: é o público-alvo percebendo que quem escreveu não conhece o assunto.

## Bloqueios absolutos

**Linguagem capacitista.** Nunca: "sofre de autismo", "portador de", "criança especial", "pessoa normal", "apesar da condição", "superar o autismo", "anjo azul".
Sempre: *pessoa autista*, *pessoa com TEA*, *neurodivergente*, *neurotípico*, *pessoa com deficiência*.

**Travessão (—) em qualquer lugar da copy.** Use vírgula, dois-pontos ou ponto final. Vale para todo texto do site.

**Tratar o público como exclusivamente infantil.** O salão atende crianças, adolescentes e adultos. Evite "seu filho" como forma padrão; prefira *a pessoa atendida*, *quem vai ser atendido*, ou construções que não presumam idade. "Seu filho" só quando o contexto for comprovadamente infantil.

**Dado factual não confirmado.** Preço, horário, nota do Google, número de atendimentos, tempo de operação, formação da terapeuta. Se não está em `lib/conteudo/` vindo da cliente, não escreva. Não arredonde para cima. Não use "mais de" para disfarçar chute.

**Promessa terapêutica.** O salão é serviço de beleza com suporte especializado. Não trata, não melhora sintoma, não substitui terapia.

**Urgência fabricada.** Sem "últimas vagas", contagem regressiva, "só hoje". O público é cético por experiência ruim; truque destrói a confiança que a página inteira constrói.

## Tom

O tom é **competência tranquila**. Não é fofura, não é pena, não é heroísmo.

- Frase curta. Voz ativa. Concreto antes de abstrato.
- Prova antes de adjetivo: o que o salão *faz*, não como ele *é*.
- Nas objeções, resposta operacional. "Fica tranquila, temos paciência" não converte. "A gente para, remarca sem custo e você não paga a diferença" converte.
- Sem jargão clínico não explicado. ABA aparece explicado na primeira menção.
- Sem exclamação em série. No máximo uma por bloco, e só se ganhar algo.

## Acessibilidade textual

- `alt` descreve o que importa na imagem, não repete a legenda. Decorativa recebe `alt=""`.
- Texto de link diz o destino. Nunca "clique aqui", "saiba mais" solto.
- Erro de formulário diz o que fazer, não só o que está errado.
- Nada em caixa alta além de 3 palavras.

## Saída

Liste as violações encontradas com a linha e a correção proposta. Se não houver nenhuma, diga só isso. Não reescreva o texto inteiro por preferência estilística.
