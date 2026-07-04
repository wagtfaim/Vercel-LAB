# Vercel-LAB

Repositório de armazenamento dos sites recuperados no projeto de migração/resiliência Vercel.
Estruturado para suportar **múltiplos sites** no mesmo repositório (monorepo), cada um
deployado como um projeto Vercel independente.

## Estrutura

```
sites/
  <site-slug>/
    dist/         conteúdo estático pronto para deploy (HTML/CSS/JS/assets)
    vercel.json   config de deploy desse site (outputDirectory, cleanUrls, etc.)
    meta.json     metadados de recuperação (URL de origem, método, data)
```

Cada site em `sites/<site-slug>/` é conectado a um projeto Vercel próprio, com o **Root
Directory** do projeto apontando para `sites/<site-slug>`. Isso permite adicionar novos sites
recuperados no futuro sem afetar os já publicados — basta criar uma nova pasta em `sites/` e um
novo projeto Vercel apontando para ela.

## Sites

| Slug | Origem | Projeto Vercel |
|---|---|---|
| `lab-nextjs-site` | https://lab-nextjs-site.vercel.app | vercel-lab-nextjs-site |

## Fluxo de deploy

1. Conteúdo é recuperado (via `tools/crawl-site.mjs` no repo `Vercel`, ou outro método) e colocado
   em `sites/<site-slug>/dist`.
2. Commit + push para este repositório.
3. O projeto Vercel correspondente (Root Directory = `sites/<site-slug>`) faz o deploy automático
   a cada push, sem necessidade de `vercel deploy` manual.
