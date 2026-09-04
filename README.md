# Edivertido — Landing Page

Projeto ainda não iniciado. Esta pasta contém só o planejamento (`CLAUDE.md`, `TASKS.md`) e a configuração do Claude Code (`.claude/`). O código nasce na primeira tarefa.

## Como começar

1. Abra esta pasta no VS Code.
2. Abra o terminal integrado e rode `claude` (ou use a extensão do Claude Code).
3. Confirme que ele enxergou a configuração:
   ```
   /agents
   ```
   Deve listar `auditor-a11y`. Se não listar, confira se a pasta `.claude` está na raiz (ela começa com ponto — alguns exploradores de arquivo escondem isso por padrão).
4. Primeira mensagem, exatamente assim:
   ```
   Leia CLAUDE.md e TASKS.md. Execute apenas T1 e pare.
   ```
5. Depois de cada tarefa, confira o resultado no navegador antes de pedir a próxima. Sempre uma por vez:
   ```
   Execute apenas T2 e pare.
   ```

## O que já está aqui

```
CLAUDE.md              regras permanentes do projeto — o Claude Code lê sozinho toda sessão
TASKS.md                as 12 tarefas, em ordem, com checklist de pronto
.claude/
  settings.json          permissões (o que ele pode rodar sem perguntar)
  skills/
    novo-bloco/           como construir cada bloco da LP
    revisar-copy/         checklist de texto (linguagem, tom, dados inventados)
    auditar/               auditoria de acessibilidade e movimento
  agents/
    auditor-a11y.md        subagente somente-leitura que varre o código
public/marca/
  ed-lemniscata.svg      o traço-assinatura, pronto para virar componente
.env.example            copie para .env.local e preencha antes do T11
.gitignore
```

## Antes de rodar T7 (Galeria real)

As fotos precisam de autorização de imagem confirmada — em especial as que mostram desconforto da criança durante o corte. Ver `TASKS.md`, seção "Bloqueios abertos".

## Domínio

Já comprado, mesmo ecossistema de deploy da Prompts360, projeto separado na Vercel. Ver `CLAUDE.md` §9, "Deploy e domínio".
