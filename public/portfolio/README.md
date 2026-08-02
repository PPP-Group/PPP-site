# Capas de portfólio

O campo `cover` de cada projeto em `src/data/portfolio.js` aponta para um
arquivo desta pasta.

## Situação atual

| Projeto                               | Capa                     | Situação                       |
| ------------------------------------- | ------------------------ | ------------------------------ |
| Plataforma de gestão para academia    | `gestao-academia.webp`   | imagem gerada — substituir pelo print real |
| Site institucional para engenharia    | `site-engenharia.webp`   | imagem gerada — substituir pelo print real |
| App de marketplace de serviços        | —                        | slot vazio (`cover: null`)     |
| Landing page de captação para clínica | —                        | slot vazio (`cover: null`)     |
| Dashboard de atribuição de receita    | —                        | slot vazio (`cover: null`)     |
| Área de membros e curso online        | —                        | slot vazio (`cover: null`)     |

As duas capas existentes são imagens abstratas geradas por IA, na paleta do
site. Servem de marcador de lugar com aparência intencional — troque pelos
prints reais dos projetos assim que existirem.

## Slots vazios não quebram nada

Com `cover: null`, o componente `ProjectCover` desenha uma abstração em SVG a
partir da categoria do projeto: dashboard com barra lateral e gráfico, moldura
de celular, página institucional, e assim por diante. É de propósito — comunica
o tipo de projeto sem fingir ser um print.

Se `cover` apontar para um arquivo que não existe, o `onError` da imagem cai no
mesmo wireframe. Nunca aparece ícone de imagem quebrada. Ainda assim, prefira
`null` a um caminho inválido: evita uma requisição 404 por card.

## Como adicionar a capa real

1. Exporte o print em **1600×1000** (proporção 16:10), formato **WebP**,
   qualidade 80–85.
2. Salve aqui com o nome do id do projeto, por exemplo `lp-clinica.webp`.
3. Em `src/data/portfolio.js`, troque `cover: null` por
   `cover: '/portfolio/lp-clinica.webp'`.

O primeiro card da grade é exibido em 16:8, mais largo que os demais — deixe o
assunto centralizado verticalmente para ele sobreviver ao corte.

Evite molduras de navegador na imagem: o card já é a moldura.
