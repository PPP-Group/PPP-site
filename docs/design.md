# Direção de design — site da PPP

Registro das decisões visuais e do porquê de cada uma. Serve para manter
coerência quando o site crescer.

## A tese

A PPP monta automação. O clichê da categoria é partículas flutuando e "rede
neural" brilhando — visual que aparece igual em qualquer agência de tecnologia,
independentemente do que ela faz.

O artefato real do mundo da PPP é outro: o canvas de um editor de workflow com
payload passando entre nós e log sendo impresso. Então o hero não ilustra
automação — **executa uma**. É a peça que o site é lembrado por, e o mesmo motor
reaparece na seção de demonstração, com controle e uma ramificação condicional.

## Paleta

Base escura de editor, com hairlines em vez de sombras. O acento não é
decoração: é **corrente**. Só aparece onde algo está de fato transportando um
dado.

| Token           | Hex       | Papel                                        |
| --------------- | --------- | -------------------------------------------- |
| `ink-000`       | `#07070C` | fundo da página                              |
| `ink-050`       | `#0A0A11` | faixa alternada de seção                     |
| `ink-100`       | `#0E0E17` | superfície elevada                           |
| `ink-200`       | `#13131E` | card                                          |
| `ink-300`       | `#1A1A28` | card em hover                                 |
| `line`          | `#22222F` | hairline padrão                               |
| `line-strong`   | `#2E2E42` | hairline em destaque — **nunca como texto**   |
| `paper`         | `#ECECF3` | texto principal                               |
| `muted`         | `#9A9AB0` | texto secundário (7,2:1 sobre `ink-000`)      |
| `faint`         | `#7C7C96` | rótulos e legendas (4,8:1 — piso AA)          |
| `pulse`         | `#6A5AE0` | indigo — gráficos e bordas                    |
| `pulse-soft`    | `#9B8EFF` | indigo claro — quando o indigo vira texto     |
| `volt`          | `#3FD8E6` | ciano — sinal ativo, foco, link em destaque   |
| `flare`         | `#E0479A` | magenta — **só no CTA final**                 |
| `ok`            | `#43D18E` | verde — status de execução, nunca marca       |

O gradiente da corrente (`--current`, indigo → ciano) aparece em exatamente três
lugares: o pacote percorrendo as arestas do grafo, a espinha de workflow que
acompanha a rolagem, e o CTA final (onde vira `--current-flare`, indigo →
magenta). Títulos são sólidos. Guardar o magenta por nove seções é o que faz ele
significar "é aqui que se decide".

`line-strong` é cor de borda. Usá-lo como cor de texto dá 1,45:1 — foi o único
problema de contraste encontrado na auditoria, e está corrigido.

## Tipografia

Três papéis, nenhum deles a escolha automática para site de tecnologia.

- **Archivo Variable** (display) — grotesca industrial com eixo de largura de
  62% a 125%. Os títulos usam `font-stretch: 112%`; é a largura que dá presença,
  no lugar onde outro projeto colocaria um gradiente. Foi por isso que o eixo
  `wdth` foi importado, apesar de ser mais pesado que o `wght` sozinho.
- **Hanken Grotesk** (corpo) — grotesca humanista, mais quente, excelente em
  tamanho pequeno. O contraste com a Archivo vem de largura e temperatura, não
  de estilo.
- **JetBrains Mono** (utilitário) — o vernáculo do assunto. Rótulos de nó,
  linhas de log, eyebrows, métricas e ids. Se o texto é algo que apareceria num
  terminal ou num painel de execução, ele é mono.

As fontes são empacotadas com o site (`@fontsource-variable`), não vêm de CDN:
sem requisição a terceiros e sem FOUT dependente de rede.

## Estrutura

A página inteira se apoia numa malha de canvas (`.canvas-grid`) — a mesma grade
de fundo de um editor de nós. As seções são nós dessa grade, e a **espinha de
workflow** no trilho esquerdo é a vista de longe do mesmo grafo do hero: cada
seção é um ponto, a rolagem é o pacote percorrendo a aresta. É indicador de
progresso e navegação ao mesmo tempo.

A parte acesa da espinha não é calculada em JS a cada frame: são duas camadas
idênticas, uma apagada e uma acesa, e a acesa é recortada por `clip-path` em
função de `--scroll-progress`.

### O notebook do hero

O parágrafo e os CTAs ficavam empurrados para a coluna direita — era a
assimetria possível enquanto não havia nada ali. Com o notebook 3D ocupando
aquela coluna, o contrapeso passou a ser ele, e o texto voltou para debaixo do
título, que é onde se lê naturalmente. A composição virou: bloco de texto à
esquerda, objeto flutuando à direita, com ar em volta.

Na tela dele roda um painel de execuções cujas linhas ecoam os logs do grafo
(`200 · 84ms`, `score 87`, `00:41`). É a mesma ideia do hero em outra escala —
o site mostrando o que a PPP entrega em vez de descrever.

Feito em CSS 3D, não WebGL: a tela é DOM, herda os tokens, e o custo é 2,6 kB gz
em vez de ~150 kB.

### Quebras de grade deliberadas

- O grafo do hero sangra além do container (`.bleed`), com máscara nas bordas —
  você está vendo um pedaço de um canvas maior, não uma ilustração emoldurada.
- No hero, o título ocupa a esquerda em três linhas enquanto o parágrafo e os
  CTAs são empurrados para a direita. A assimetria é o que impede a leitura de
  "hero centralizado de template".
- O primeiro card do portfólio ocupa duas colunas e é mais largo que alto.

### Numeração

Só a seção "Como trabalhamos" é numerada, porque ali a ordem carrega informação:
não se implementa antes de desenhar, nem se desenha antes de diagnosticar. Os
dois eixos de atuação e os quatro serviços **não** são numerados — são
paralelos, e numerá-los sugeriria uma sequência que não existe.

## Movimento

Um mecanismo, não vários efeitos espalhados. O `data-reveal` cobre o site
inteiro com um único observador. Fora dele, o movimento aparece só onde
significa alguma coisa:

- o pacote percorrendo o grafo (é o conteúdo, não o enfeite);
- o trilho do processo se desenhando no sentido da leitura;
- o tilt dos cards de portfólio, com o brilho seguindo a mão;
- o cursor customizado, que sobre um card vira "ver projeto".

`prefers-reduced-motion` não desliga o design, troca por uma versão estática: o
grafo vira um diagrama completo, com todos os nós acesos e cada log impresso.

## O que foi cortado

- Gradiente em título. Empurrava tudo para o genérico e competia com a corrente.
- Glow difuso nos nós. O estado "aceso" é comunicado por borda, contraste de
  rótulo e a impressão do log — parece um nó que **executou**, não um nó
  iluminado.
- Glassmorphism nos cards. Ficaram planos, com hairline.
- A capa gerada por IA do card de marketplace: tinha uma emenda retangular
  visível e lia como banco de imagens. O wireframe procedural de celular
  comunica "app mobile" melhor.
