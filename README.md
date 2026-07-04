# Vercel-LAB

Repositório de armazenamento dos sites recuperados no projeto de migração/resiliência Vercel.
Estruturado para suportar **múltiplos sites** no mesmo repositório (monorepo), cada um
deployado como um projeto Vercel independente.

## Estrutura

```
sites/
  <site-slug>/
    (código-fonte completo do site, como baixado da Vercel: package.json, src/, public/, etc.)
    meta.json     metadados de recuperação (origem, método, data)
```

Cada site em `sites/<site-slug>/` é o **código-fonte real** do projeto (não uma cópia estática),
recuperado via API da Vercel (`tools/download-vercel-deployment.mjs`, no repo `Vercel`). Cada pasta
é conectada a um projeto Vercel próprio, com o **Root Directory** do projeto apontando para
`sites/<site-slug>` — a Vercel detecta o framework (ex. Next.js) e roda o build normalmente a cada
push. Isso permite adicionar novos sites recuperados no futuro sem afetar os já publicados — basta
criar uma nova pasta em `sites/` e um novo projeto Vercel apontando para ela.

Quando só há acesso à URL pública (sem token/API da Vercel), o método alternativo é o crawl
(`tools/crawl-site.mjs`), que reproduz apenas o HTML renderizado — sem código-fonte. Ver
`meta.json` de cada site para saber qual método foi usado.

## Sites

| Slug | Origem | Projeto Vercel |
|---|---|---|
| `lab-nextjs-site` | https://lab-nextjs-site.vercel.app | vercel-lab-nextjs-site |

## Fluxo de deploy

1. Código-fonte é recuperado (via `tools/download-vercel-deployment.mjs` no repo `Vercel`) e
   colocado em `sites/<site-slug>/`.
2. Commit + push para este repositório.
3. O projeto Vercel correspondente (Root Directory = `sites/<site-slug>`) detecta o framework e
   builda automaticamente a cada push, sem necessidade de `vercel deploy` manual.
