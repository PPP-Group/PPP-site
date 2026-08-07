# PPP — identidade de marca e sistema de design

Documento de referência único. Cobre quem é a empresa, o que ela comunica, como
ela se parece e por quê. Toda decisão aqui está implementada em código; quando
houver divergência entre este documento e o código, **o código é a verdade** —
corrija o documento.

| | |
| --- | --- |
| **Implementação** | `src/styles/index.css` (tokens), `src/data/` (conteúdo) |
| **Instruções de build e placeholders** | [`../README.md`](../README.md) |
| **Última revisão** | 2026-08-04 |

---

## 1. A empresa

**PPP** é uma empresa de tecnologia especializada em soluções digitais para
**aquisição, atendimento e retenção de clientes**.

O que a distingue não é dominar uma ferramenta, é cobrir as duas pontas que a
maioria dos clientes contrata em lugares diferentes: a **automação comercial**
e o **produto digital** que ela alimenta — mais o design que amarra os dois.

### Os dois eixos

| Eixo | O que é | Ferramentas |
| --- | --- | --- |
| **Automação comercial e de relacionamento** | Funil de vendas, CRM, atendimento automatizado por texto e voz, integração entre as ferramentas que a operação já usa | GoHighLevel, n8n |
| **Produto digital** | Sites, sistemas web, plataformas SaaS, aplicativos — e o design visual que sustenta tudo | React, Supabase, Flutter, Motion |

Os eixos são **paralelos, não sequenciais**. Isso tem consequência visual: eles
nunca são numerados (ver §9.4).

### Os quatro serviços

1. **Automação e CRM com GoHighLevel** — pipelines, workflows multicanal,
   follow-up e recuperação de lead, agentes de IA de atendimento, Voice AI que
   atende ligação e agenda na própria chamada, escalonamento para humano, modo
   SaaS white-label, dashboards de pipeline e receita.
2. **Processos e integrações com n8n** — orquestração com triggers e lógica
   condicional, integração por API com qualquer serviço HTTP, sincronização e
   transformação de dados entre sistemas, agentes de IA autônomos dentro do
   fluxo, infraestrutura self-hosted ou cloud.
3. **Sites, plataformas e software** — institucionais e landing pages com SEO,
   sistemas web sob medida, plataformas SaaS e dashboards alimentados por
   automação, apps mobile multiplataforma, processo com Git e deploy em nuvem.
4. **Motion design e produção visual** — motion graphics, identidade visual e
   logotipos, materiais de campanha, apoio visual para funis.

Frentes complementares: consultoria em automação (diagnóstico + desenho),
treinamento e repasse técnico, suporte e manutenção contínua.

> Fonte: `src/data/services.js` e `src/data/site.js`. Editar o conteúdo lá, não
> nos componentes.

---

## 2. Posicionamento e mensagem

### Manifesto

> **Estruturamos a operação digital de ponta a ponta.**
>
> CRM e automação de atendimento e vendas, integração entre sistemas, e o site,
> plataforma ou app que a operação precisa — com o design por trás de tudo isso.

É o texto do hero e a formulação canônica. Use-o inteiro em apresentações,
propostas e bio de rede social.

### A ideia que sustenta tudo

**Automação sem produto digital vira remendo. Produto sem automação vira
trabalho manual.** A PPP entrega os dois lados e o visual que amarra — por isso
ninguém precisa traduzir o escopo de um fornecedor para o outro.

### Roteiro dor → solução

A entrada de leitura preferida não é o nome da ferramenta, é o problema que o
cliente reconhece em si:

| Dor | Solução |
| --- | --- |
| "Perde lead porque ninguém responde rápido" | Follow-up automático e IA de atendimento e voz no GHL |
| "Os sistemas não conversam entre si" | Integrações e orquestração de processos com n8n |
| "Falta o site, o sistema ou o app da operação" | Desenvolvimento web, plataforma ou aplicativo sob medida |
| "A comunicação visual não acompanha o que a empresa entrega" | Motion design, identidade e material de campanha |

### Os quatro compromissos

Ocupam o lugar de prova social enquanto não há depoimentos aprovados. São
afirmações **verificáveis**, não adjetivos:

1. **Diagnóstico antes de ferramenta** — automatizar processo quebrado só
   quebra mais rápido.
2. **A operação fica com você** — treinamento, documentação e acesso; sem
   dependência do fornecedor para operar.
3. **Uma frente só não resolve** — os dois lados e o visual que amarra.
4. **Manutenção é parte do serviço** — fluxo não é entrega única.

---

## 3. Tom de voz

O tom vem do mesmo lugar que o visual: quem opera automação fala em execução,
não em transformação digital.

**Princípios**

- **Frase declarativa, verbo simples.** "Estruturamos a operação", não
  "potencializamos a jornada".
- **Específico ganha de esperto.** "Voice AI que consulta a agenda e confirma o
  horário na própria chamada" é melhor que "atendimento inteligente".
- **A dor antes da ferramenta.** O visitante se reconhece no problema; o nome
  do produto vem depois.
- **Número com origem, ou número marcado.** Métrica sem lastro fica marcada
  como `[MÉTRICA A DEFINIR]` na interface. Não inventamos resultado.
- **Sem apologia e sem urgência fabricada.** Nada de "não perca", "última
  chance", contadores regressivos.

**Vocabulário da casa** — fluxo, execução, nó, gatilho, pipeline, integração,
repasse, diagnóstico, operação.

**Evitar** — solução inovadora, revolucionar, transformação digital, sinergia,
disruptivo, "cuidamos de tudo para você", exclamação em copy institucional.

**Registro** — segunda pessoa direta ("conta o processo, a gente devolve o
mapa"), primeira pessoa do plural para a empresa. Sentence case em títulos e
botões; caixa alta apenas nos rótulos em mono, onde a caixa é um recurso
tipográfico e não ênfase.

---

## 4. A tese visual

A PPP monta automação. O clichê da categoria é partícula flutuando e "rede
neural" brilhando — visual que aparece igual em qualquer agência de tecnologia,
independentemente do que ela faz.

O artefato real do mundo da PPP é outro: **o canvas de um editor de workflow,
com payload passando entre nós e log sendo impresso.**

Daí a decisão que organiza todo o resto:

> O site não descreve automação. Ele **executa** uma.

O hero é um fluxo rodando de verdade — um lead entra pelo webhook, atravessa os
nós, e cada nó imprime a saída daquela etapa ao receber o pacote. O mesmo motor
reaparece na seção de demonstração, com controle e ramificação condicional, e em
escala menor no painel do notebook 3D.

Consequência para qualquer peça nova: **antes de decorar, pergunte se dá para
demonstrar.**

---

## 5. Marca

### O símbolo

Três nós ligados por duas arestas. A sigla é lida como um fluxo mínimo — que é
exatamente o que a empresa monta. **O terceiro nó fica aceso** (`volt`,
preenchimento a 15%): o fluxo chegou ao fim.

Implementação: `src/components/layout/Logo.jsx` · Favicon: `public/favicon.svg`

### Assinatura

Símbolo + wordmark **PPP** em Archivo, peso 700, `font-stretch: 118%`, tracking
`-0.02em`. Espaço entre símbolo e wordmark: `10px` (`gap-2.5`).

Proporção do símbolo: viewBox `40 × 14`; no header renderiza a `40 × 14 px`.

### Regras de uso

- O símbolo herda `currentColor` nos dois primeiros nós — ele se adapta ao
  contexto. **O terceiro nó é sempre `volt`**, nunca outra cor.
- Área de proteção: no mínimo a altura do símbolo (14px) em todos os lados.
- Tamanho mínimo do símbolo: **32px de largura**. Abaixo disso, use só o
  wordmark ou o favicon.
- Não aplicar sombra, contorno, gradiente ou rotação.
- Não reescrever a sigla em outra fonte.
- Fundo: sempre escuro. Se for inevitável usar sobre claro, inverta para
  `ink-000` mantendo o nó aceso em `volt`.

---

## 6. Cor

### O conceito: tinta e corrente

A base é um **canvas de editor**: tinta quase preta com viés violeta,
separações por **hairline em vez de sombra**.

O acento não é decoração — é **corrente**. Ele só aparece onde algo está de fato
transportando um dado. Essa é a regra que impede o site de virar um degradê
genérico.

### Tinta (superfícies e linhas)

| Token | Hex | Papel |
| --- | --- | --- |
| `ink-000` | `#07070C` | fundo da página |
| `ink-050` | `#0A0A11` | faixa alternada de seção |
| `ink-100` | `#0E0E17` | superfície elevada |
| `ink-200` | `#13131E` | card |
| `ink-300` | `#1A1A28` | card em hover |
| `line` | `#22222F` | hairline padrão |
| `line-strong` | `#2E2E42` | hairline em destaque |

> `line` e `line-strong` são **cores de borda**. `line-strong` como texto dá
> **1,45:1** — foi o único erro de contraste encontrado na auditoria e está
> corrigido. Não repita.

### Texto

| Token | Hex | Papel |
| --- | --- | --- |
| `paper` | `#ECECF3` | texto principal e títulos |
| `muted` | `#9A9AB0` | texto secundário, parágrafos de apoio |
| `faint` | `#7C7C96` | rótulos, legendas, eyebrows |

### Corrente (acentos)

| Token | Hex | Papel |
| --- | --- | --- |
| `pulse` | `#6A5AE0` | indigo — **gráficos e bordas apenas** |
| `pulse-soft` | `#9B8EFF` | indigo claro — quando o indigo precisa virar texto |
| `volt` | `#3FD8E6` | ciano — sinal ativo, foco, destaque, nó aceso |
| `flare` | `#E0479A` | magenta — **exclusivo do CTA final** |
| `ok` | `#43D18E` | verde — status de execução, **nunca marca** |

### Gradientes

```css
--current:       linear-gradient(100deg, #6A5AE0 0%, #3FD8E6 100%);
--current-flare: linear-gradient(100deg, #6A5AE0 0%, #E0479A 100%);
```

`--current` aparece em **exatamente três lugares**: o pacote percorrendo as
arestas do grafo, a espinha de workflow que acompanha a rolagem, e o CTA final
(onde vira `--current-flare`).

**Títulos são sólidos.** Gradiente em título empurra o projeto para o genérico e
compete com a corrente.

Guardar o magenta por nove seções é o que faz ele significar "é aqui que se
decide". Se ele começar a aparecer em outros lugares, perde a função.

### Matriz de contraste (WCAG 2.1)

Razão de cada cor de frente sobre cada superfície. **Piso AA = 4,5:1** para
texto normal, **3:1** para texto grande (≥24px, ou ≥18,66px em peso 700).

| | ink-000 | ink-050 | ink-100 | ink-200 | ink-300 |
| --- | --- | --- | --- | --- | --- |
| `paper` | 17,09 | 16,78 | 16,33 | 15,67 | 14,61 |
| `muted` | 7,30 | 7,16 | 6,97 | 6,69 | 6,24 |
| `faint` | 4,96 | 4,87 | 4,74 | 4,55 | **4,24** ⚠ |
| `pulse` | **3,97** ⚠ | **3,90** ⚠ | **3,80** ⚠ | **3,64** ⚠ | **3,40** ⚠ |
| `pulse-soft` | 7,38 | 7,24 | 7,05 | 6,76 | 6,31 |
| `volt` | 11,65 | 11,44 | 11,13 | 10,68 | 9,96 |
| `flare` | 5,30 | 5,20 | 5,06 | 4,86 | 4,53 |
| `ok` | 10,29 | 10,10 | 9,83 | 9,43 | 8,79 |

**Duas regras que saem daqui:**

1. **`pulse` reprova como texto em qualquer superfície.** Use-o em traço,
   borda, preenchimento de gráfico. Para texto indigo, use `pulse-soft`.
2. **`faint` reprova sobre `ink-300`** (4,24). Como `ink-300` é o estado de
   hover dos cards, rótulo em `faint` dentro de card precisa clarear no hover —
   ou o card não deve usar `faint` em texto essencial.

Recalcular após qualquer mudança de token:

```bash
node -e "const L=h=>{const n=parseInt(h.slice(1),16);return [16,8,0].map(s=>(n>>s)&255).map(v=>{v/=255;return v<=0.03928?v/12.92:Math.pow((v+0.055)/1.055,2.4)}).reduce((a,c,i)=>a+[0.2126,0.7152,0.0722][i]*c,0)};const R=(a,b)=>{const[x,y]=[L(a),L(b)].sort((p,q)=>q-p);return((x+0.05)/(y+0.05)).toFixed(2)};console.log(R('#9A9AB0','#07070C'))"
```

---

## 7. Tipografia

Três papéis, nenhum deles a escolha automática para site de tecnologia.

### As famílias

| Papel | Família | Por quê |
| --- | --- | --- |
| **Display** | Archivo Variable | Grotesca industrial com **eixo de largura de 62% a 125%**. É a largura que dá presença, no lugar onde outro projeto colocaria um gradiente. |
| **Corpo** | Hanken Grotesk | Grotesca humanista, mais quente, excelente em tamanho pequeno. O contraste com a Archivo vem de largura e temperatura, não de estilo. |
| **Utilitário** | JetBrains Mono | O vernáculo do assunto. Se o texto apareceria num terminal ou num painel de execução, ele é mono. |

As fontes são **empacotadas com o site** (`@fontsource-variable`), não vêm de
CDN: sem requisição a terceiros, sem FOUT dependente de rede. O eixo `wdth` da
Archivo é importado explicitamente (`archivo/wdth.css`) — é mais pesado que o
`wght` sozinho, e o peso é justificado porque a largura é a assinatura.

### Escala

| Classe | Tamanho | Uso |
| --- | --- | --- |
| `.display-xl` | `clamp(2.5rem, 7vw, 5.6rem)` | título do hero e do CTA final |
| `.display-lg` | `clamp(2rem, 5vw, 3.5rem)` | título de seção |
| corpo | `1rem / 1.6` | texto padrão |
| `.eyebrow` | `0.6875rem` (11px) | rótulo em mono |

**O teto de `5.6rem` não é gosto, é medida.** A coluna do título tem ~694px
(limite da shell) e a linha "Estruturamos a" ocupa 7,74em. Acima de 89,6px a
linha estoura e o navegador deixa o "a" órfão. Se mudar a largura da shell, a
grade ou o texto do manifesto, **remeça**.

### Ajustes de estilo

```css
.display {
  font-weight: 700;
  font-stretch: 112%;
  letter-spacing: -0.035em;
  line-height: 0.95;
}

.eyebrow {
  font-family: mono;
  font-size: 0.6875rem;
  font-weight: 500;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: faint;
}
```

### Regra do mono

Mono não é enfeite, é classificação. Recebe mono: rótulo de nó, linha de log,
eyebrow de seção, métrica, id, stack, status, duração, timestamp. **Não recebe
mono**: título, parágrafo, item de lista descritivo.

---

## 8. Layout e malha

| Variável | Valor | Papel |
| --- | --- | --- |
| `--shell` | `min(1240px, 100% - 2.5rem)` | largura útil do conteúdo |
| `--header-h` | `72px` | altura da barra fixa |
| `.canvas-grid` | pontos de 1px a cada `26px`, `rgba(255,255,255,0.055)` | malha de editor ao fundo |

Espaçamento vertical de seção: `py-24` → `md:py-32` → `lg:py-40`.

Breakpoints (padrão Tailwind): `sm 640` · `md 768` · `lg 1024` · `xl 1280` ·
`2xl 1536`.

A página inteira se apoia na **malha de canvas** — a mesma grade de fundo de um
editor de nós. As seções são nós dessa grade.

### Quebras de grade deliberadas

- O grafo do hero **sangra além do container** (`.bleed`), com máscara nas
  bordas: você vê um pedaço de um canvas maior, não uma ilustração emoldurada.
- No hero, o bloco de texto ocupa 7 colunas à esquerda e o notebook 3D flutua
  nas 5 da direita, com ar em volta. O notebook é o contrapeso.
- O primeiro card do portfólio ocupa duas colunas e é mais largo que alto.

### Numeração

Só a seção **"Como trabalhamos"** é numerada, porque ali a ordem carrega
informação: não se implementa antes de desenhar, nem se desenha antes de
diagnosticar.

Os dois eixos e os quatro serviços **não** são numerados — são paralelos, e
numerá-los sugeriria uma sequência que não existe. Numeração é estrutura de
dado, não enfeite.

---

## 9. Movimento

**Um mecanismo, não vários efeitos espalhados.**

### Curvas

```css
--ease-out-soft:    cubic-bezier(0.16, 1, 0.3, 1);   /* entradas e revelações */
--ease-in-out-soft: cubic-bezier(0.65, 0, 0.35, 1);  /* transições simétricas */
```

### Scroll reveal

Um único `IntersectionObserver` cobre o site inteiro. Qualquer elemento com
`data-reveal` entra com fade + deslocamento de 22px em 0,75s. Escalonamento de
70ms por item, **limitado a 6 posições** para o último item de uma lista longa
não ficar esperando visivelmente.

O estado inicial mora sob `html.reveal-ready`, classe adicionada pelo JS: **se o
script falhar, o conteúdo simplesmente aparece.** Nunca escreva um estado
inicial invisível fora desse escopo.

### Ritmo do grafo

| Etapa | Duração |
| --- | --- |
| permanência no nó (`dwell`) | 620ms |
| viagem pela aresta (`travel`) | 760ms |
| pausa no fim (`hold`) | 1500ms |

Ciclo completo: hero 7,0s · demonstração 11,2s.

### Onde o movimento é permitido

Só onde significa alguma coisa:

- o pacote percorrendo o grafo — **é o conteúdo, não o enfeite**;
- o trilho do processo se desenhando no sentido da leitura;
- o tilt dos cards de portfólio, com o brilho seguindo a mão;
- o cursor customizado, que sobre um card vira "ver projeto";
- a flutuação e o giro do notebook 3D.

### `prefers-reduced-motion`

**Não desliga o design, troca por uma versão estática.** O grafo vira um
diagrama completo, com todos os nós acesos e cada log impresso. O Lenis (scroll
suave) nem chega a ser baixado. O cursor customizado não entra.

Giro por arrasto continua valendo mesmo em movimento reduzido: é ação direta do
usuário, não movimento imposto a ele.

---

## 10. Elementos proprietários

Quatro peças que só existem neste projeto. São elas que tornam o site
irreconhecível como template.

### 10.1 O grafo de workflow

O elemento-assinatura. Um pacote sai do gatilho, percorre cada aresta
desenhando a corrente, e cada nó imprime a saída da própria etapa ao receber o
pacote.

- **Dados, não marcação**: os fluxos vivem em `src/data/automations.js`, com
  posições num espaço 0–100 que descreve intenção de leitura.
- **Dois modos**: horizontal em telas largas, coluna no celular — não é o
  horizontal encolhido, é uma releitura.
- **Estado "aceso"** é comunicado por borda, contraste de rótulo e impressão do
  log. Parece um nó que **executou**, não um nó iluminado. Sem glow difuso.
- **Tom por tipo de nó**: `trigger` → volt · `ai` → pulse · `action` →
  line-strong · `sink` → ok.
- `npm run check` valida a geometria nos dois modos. Rode depois de mexer nos
  fluxos.

### 10.2 A espinha de workflow

A vista de longe do mesmo grafo. Cada seção da página é um nó; a rolagem é o
pacote percorrendo a aresta. É indicador de progresso e navegação ao mesmo
tempo.

A parte acesa não é calculada em JS a cada frame: são duas camadas idênticas,
uma apagada e uma acesa, e a acesa é recortada por `clip-path` em função de
`--scroll-progress`.

### 10.3 O notebook 3D do hero

Geometria em **CSS 3D, não WebGL**: a tela é DOM de verdade, fica nítida em
qualquer zoom, herda os tokens e custa poucos kB em vez de ~150 kB.

Na tela roda um painel de execuções cujas linhas ecoam os logs do grafo
(`200 · 84ms`, `score 87`, `00:41`) — a mesma ideia do hero em outra escala.

Interação: **arrastar** dá controle direto e o ângulo é mantido ao soltar;
**passar o mouse** aplica inclinação sutil como desvio sobre o ângulo atual.
A pose inicial mora no CSS, então o objeto aparece certo antes de qualquer JS.

Detalhes técnicos e armadilhas: [`../README.md`](../README.md).

### 10.4 O cursor customizado

Um ponto que segue o ponteiro exatamente e um anel que chega com atraso. Sobre
qualquer elemento com `data-cursor`, o anel cresce e assume o rótulo declarado
em `data-cursor-label` — sobre um card de portfólio ele vira literalmente "ver
projeto".

Só entra em ponteiro fino e sem `prefers-reduced-motion`. Em toque, o cursor do
sistema continua sendo o cursor.

---

## 11. Componentes

| Componente | Regra de identidade |
| --- | --- |
| **Card** | Plano, `ink-100`/`ink-200`, hairline `line`. Sem glassmorphism, sem sombra difusa. Hover muda borda e translada, não só a cor. |
| **Botão primário** | `paper` sólido sobre tinta, texto `ink-000`. Mono, caixa alta, tracking `0.12em`, pílula. |
| **Botão flare** | `--current-flare`. **Só no CTA final.** |
| **Botão ghost** | Borda `line-strong`, texto `paper`, hover clareia a borda para `volt/60`. |
| **Eyebrow** | Mono + traço de 32px à esquerda. É o rótulo de seção padrão. |
| **Modal** | Foco preso, fecha no ESC e no clique do fundo, devolve o foco a quem abriu. Rolagem da página travada. |
| **Acordeão** | `grid-template-rows: 0fr → 1fr` em CSS puro. `inert` quando fechado. |
| **Barra de navegação** | Faixa alinhada à shell no topo; ao rolar, encolhe para pílula flutuante com `backdrop-filter`. |

---

## 12. Acessibilidade como parte da identidade

Não é checklist de conformidade, é parte do padrão de acabamento.

- **Contraste** conferido em todos os pares de texto e fundo (§6).
- **Foco visível** em tudo: contorno `volt` de 2px com 3px de deslocamento.
- **Modais** com foco preso, ESC e devolução de foco.
- **Acordeão e menu** usam `inert` quando fechados — nada de alvo de tabulação
  invisível.
- **Alvos de toque** ≥ 24px.
- **Um `h1` por página**, sem salto de nível de heading.
- **Movimento reduzido** respeitado com fallback estático elegante.
- **SVG decorativo** com `aria-hidden`; SVG informativo com `role="img"` e
  `aria-label` descrevendo o conteúdo, não a forma.
- **Contadores animados** expõem o valor final em `aria-label` — leitor de tela
  não deve ouvir a contagem.

---

## 13. O que foi deliberadamente recusado

Registrado para não voltar por engano:

- **Partículas flutuando e "rede neural"** — o clichê da categoria, idêntico em
  qualquer agência de tecnologia.
- **Gradiente em título** — empurra para o genérico e compete com a corrente.
- **Glow difuso nos nós** — o nó precisa parecer que *executou*, não que está
  iluminado.
- **Glassmorphism nos cards** — trocado por plano com hairline.
- **Azul corporativo chapado** — a corrente é indigo→ciano, com magenta
  guardado para um único momento.
- **Numerar o que não é sequência** — os eixos e os serviços são paralelos.
- **Métrica inventada** — placeholder marcado na interface até a PPP confirmar.
- **Nome de cliente real no portfólio** — as entradas descrevem o *tipo* de
  projeto até os cases definitivos entrarem.
- **Uma capa gerada por IA** (card de marketplace) — tinha emenda retangular
  visível e lia como banco de imagens; o wireframe procedural comunica melhor.

---

## 14. Aplicação fora do site

Para manter coerência em peças que não são o site.

**Apresentações e propostas**
Fundo `ink-000`. Título em Archivo 700 com `font-stretch` entre 105% e 118%.
Corpo em Hanken Grotesk. Rótulo de seção, número de slide e legenda de dado em
JetBrains Mono caixa alta. Um acento por slide, no máximo.

**Redes sociais**
A malha de canvas (pontos a cada 26px) funciona como textura de fundo
reconhecível. Diagramas de fluxo com nós e arestas são o formato nativo da
marca — prefira-os a foto de banco de imagens. Magenta só em peça de conversão.

**Motion**
Curva padrão `cubic-bezier(0.16, 1, 0.3, 1)`. O movimento característico é o
**pacote percorrendo uma aresta** e o **nó acendendo ao recebê-lo**, nesta
ordem. Evite fade genérico entre cenas: prefira a transição que parece uma
execução avançando.

**Documento e e-mail**
Fundo claro é aceitável fora do site. Nesse caso: texto `#07070C` sobre
`#FAFAFC`, acento `pulse` `#6A5AE0` (que sobre claro passa em contraste), e o
símbolo invertido com o terceiro nó em `volt`.

---

## 15. Referência rápida

```css
/* Tinta */
--color-ink-000: #07070c;  --color-ink-050: #0a0a11;
--color-ink-100: #0e0e17;  --color-ink-200: #13131e;
--color-ink-300: #1a1a28;
--color-line: #22222f;     --color-line-strong: #2e2e42;

/* Texto */
--color-paper: #ececf3;    --color-muted: #9a9ab0;
--color-faint: #7c7c96;

/* Corrente */
--color-pulse: #6a5ae0;    --color-pulse-soft: #9b8eff;
--color-volt:  #3fd8e6;    --color-flare: #e0479a;
--color-ok:    #43d18e;

/* Gradientes */
--current:       linear-gradient(100deg, #6a5ae0, #3fd8e6);
--current-flare: linear-gradient(100deg, #6a5ae0, #e0479a);

/* Tipografia */
--font-display: 'Archivo Variable';
--font-body:    'Hanken Grotesk Variable';
--font-mono:    'JetBrains Mono Variable';

/* Layout */
--shell:     min(1240px, 100% - 2.5rem);
--header-h:  72px;

/* Movimento */
--ease-out-soft:    cubic-bezier(0.16, 1, 0.3, 1);
--ease-in-out-soft: cubic-bezier(0.65, 0, 0.35, 1);
```

---

## 16. Pendências

Itens abertos que afetam a identidade:

- **Contato e redes** — todos os canais estão como `[A DEFINIR]` em
  `src/data/site.js`.
- **Métricas** — os quatro contadores do hero usam números ilustrativos, com
  nota explícita na interface. Remover a nota junto com os placeholders.
- **Portfólio** — seis projetos de exemplo; nenhum nome de cliente real.
- **Depoimentos** — a seção de princípios ocupa o lugar da prova social até
  haver depoimentos aprovados.
- **Notebook 3D** — as quinas ainda apresentam vão em ângulos de rotação
  acentuados. Correção em andamento; ver §10.3 e o README.

A lista completa de placeholders, com caminhos de arquivo:

```bash
grep -rn "A DEFINIR\|TODO:" src/ index.html
```
