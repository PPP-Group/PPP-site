# Site institucional e portfólio da PPP

Site de página única em React + Vite + Tailwind v4. Dark mode, grafo de
automação animado, portfólio com preview navegável em modal.

## Rodar

```bash
npm install
```

```bash
npm run dev
```

Abre em `http://localhost:5173`.

| Comando           | O que faz                                                     |
| ----------------- | ------------------------------------------------------------- |
| `npm run dev`     | Servidor de desenvolvimento com HMR                            |
| `npm run build`   | Build de produção em `dist/`                                   |
| `npm run preview` | Serve o `dist/` localmente para conferir o build               |
| `npm run check`   | Valida a geometria do grafo de workflow (ver abaixo)           |

## Publicar

O build é estático — `dist/` sobe em qualquer hospedagem. Em Vercel ou Netlify,
o padrão detectado já funciona: comando `npm run build`, diretório `dist`.

---

## O que precisa ser preenchido antes de ir ao ar

Tudo que é placeholder está marcado no código com `[A DEFINIR]`,
`[MÉTRICA A DEFINIR]` ou um comentário `TODO`. Para encontrar todos:

```bash
grep -rn "A DEFINIR\|TODO:" src/ index.html
```

### 1. Contato — `src/data/site.js`

E-mail, WhatsApp e redes sociais. Enquanto `href` for `null`, o item aparece
como texto inerte em vez de link quebrado — de propósito.

### 2. Métricas do hero — `src/data/site.js`

Os quatro contadores animados usam números ilustrativos. Abaixo deles há uma
nota dizendo isso explicitamente; **remova a nota junto com os placeholders**.

### 3. Portfólio — `src/data/portfolio.js`

Seis projetos de exemplo. Nenhum nome de cliente real é usado: as entradas
descrevem o *tipo* de projeto. Substitua título, resumo, descrição, stack, ano,
URL e métricas pelos cases definitivos.

Ver `public/portfolio/README.md` para as capas.

### 4. Painel do notebook do hero — `src/components/hero/Laptop3D.jsx`

A constante `PANEL` no topo do arquivo tem números ilustrativos. O bloco inteiro
é `role="img"`, então isso não é copy de produção — mas troque quando houver um
print real de dashboard para usar.

### 5. Domínio — `index.html`

`<link rel="canonical">` está apontando para `https://example.com/`.

### 6. Prazos do processo — `src/data/process.js`

`[PRAZO A DEFINIR]` em cada etapa.

### 7. Páginas de exemplo — `public/preview/`

Dois arquivos HTML servem de preview navegável enquanto não há URLs reais.
Quando os projetos definitivos entrarem, aponte `liveUrl` para a URL real e
apague os arquivos.

---

## Como o site é montado

```
src/
  data/            conteúdo — é aqui que a PPP edita, sem tocar em componente
  hooks/           observador de reveal, smooth scroll, parallax, tilt, media queries
  lib/scroll.js    ponte única para rolagem: com ou sem Lenis, o resto do app não sabe
  components/
    graph/         motor do grafo de workflow (o elemento-assinatura)
    hero/          notebook 3D interativo em CSS puro
    sections/      as nove seções da página, na ordem em que aparecem
    portfolio/     capa procedural e modal com iframe
    automation/    modal de mini-case
    layout/        header, footer, espinha de workflow, marca
    ui/            modal acessível, contador, tilt, cursor, botão, casca de seção
```

### O grafo de workflow

O hero não ilustra uma automação, ele executa uma: um pacote sai do gatilho,
percorre cada aresta desenhando a corrente, e cada nó imprime a saída da própria
etapa ao receber o pacote. O mesmo componente aparece na seção de demonstração,
com botão de reprodução e uma ramificação condicional.

Os fluxos são dados (`src/data/automations.js`), com posições num espaço 0–100
que descreve intenção de leitura. `computeLayout` traduz para o viewBox em dois
modos: horizontal em telas largas, coluna no celular — não é o horizontal
encolhido, é uma releitura.

Como a composição depende dos dados, `npm run check` valida que nenhum nó saiu
da moldura nem colidiu com outro, nos dois modos. Rode depois de mexer nos
fluxos.

### O notebook 3D do hero

Geometria em CSS 3D, não WebGL. A tela é DOM de verdade, então o painel fica
nítido em qualquer zoom e herda os tokens do site. O custo total ficou em
2,6 kB gz — um canvas 3D traria cerca de 150 kB para exibir um dashboard que já
sabemos desenhar em HTML.

Duas formas de mexer, que não brigam entre si: **arrastar** dá controle direto e
o ângulo é mantido ao soltar, e **passar o mouse** pelo hero aplica uma
inclinação sutil *como desvio sobre o ângulo atual* — por isso continua
funcionando depois de o visitante ter girado o objeto para onde quis.

A pose inicial mora no CSS (`--lp-rx` / `--lp-ry`), então o notebook aparece no
ângulo certo antes de qualquer JavaScript rodar.

**Tampa e base são caixas de seis faces, não planos.** Um plano em CSS 3D não
tem verso nem espessura: ao girar o objeto você atravessa a tela e vê o próprio
painel espelhado do outro lado. Cada corpo tem frente, verso e quatro arestas,
com a espessura proporcional a `--lp-w` (a base é mais grossa que a tampa, como
num notebook real).

O que segura o truque é `backface-visibility: hidden` combinado com
`transform-style: flat` na face da frente: o flat achata a tela e todo o painel
dentro daquela face, então esconder o verso dela esconde o conteúdo junto. Se
alguém trocar esse `flat` por `preserve-3d`, os filhos voltam a renderizar
soltos no espaço e o dashboard reaparece espelhado por trás.

**Os cantos são fatiados.** As arestas retas terminam onde a curva do canto
começa — se corressem a largura inteira, ultrapassariam a curva e apareceriam
como abas quadradas. Mas isso deixa a região do canto sem face nenhuma: um
quarto de cilindro que `div` plana não desenha, e dá para ver através dele.

A saída é extrudar por fatiamento: cinco planos opacos por corpo (`.lp-shell`),
com o mesmo contorno arredondado, distribuídos ao longo da espessura em
0,4d · 0,2d · 0 · −0,2d · −0,4d. Sendo opacos e do tamanho do corpo, cada um
oculta o de trás, então o canto lê como material sólido de qualquer ângulo que
não seja exatamente de perfil. Nos trechos retos eles ficam escondidos atrás
das arestas.

Três números precisam continuar casados, senão o canto abre ou cria aba: o
recuo das arestas, o raio das faces e o raio das fatias são todos `--r`.

Dois detalhes que só aparecem medindo: transform 3D não encolhe a caixa de
layout, então a base deitada reserva quase o dobro da altura que ocupa na tela.
Sem compensar isso com margem negativa, a centralização vertical sai errada e a
sombra fica flutuando longe do objeto. Os ajustes estão comentados em
`laptop.css` — se mexer na geometria, confira de novo.

Para conferir que a caixa fecha: gire para 90° e meça. As faces da frente e do
verso devem colapsar em linhas finas, e a aresta lateral deve ter exatamente a
largura do vão entre elas.

### Movimento

Um único `IntersectionObserver` cuida do reveal do site inteiro: qualquer
elemento com `data-reveal` entra com fade e deslocamento. O estado inicial mora
sob `html.reveal-ready`, classe adicionada pelo JS — se o script falhar, o
conteúdo simplesmente aparece.

`prefers-reduced-motion` é respeitado em toda parte, e o fallback é estático,
não ausente: o grafo vira um diagrama completo com todos os nós acesos e os logs
impressos, e o Lenis nem chega a ser baixado.

### Performance

O carregamento inicial traz apenas o bundle da página e o CSS. `motion` (a
biblioteca de animação, ~43 kB gz) vive dentro do chunk do modal e só desce
quando alguém abre um projeto ou um case. `lenis` entra por import dinâmico
depois da primeira pintura. Os iframes de preview só são montados quando o
modal abre.

> Não reintroduza `manualChunks` no `vite.config.js` para "separar" essas libs:
> agrupá-las em chunks nomeados faz o Vite tratá-las como dependência de topo e
> emitir `modulepreload`, trazendo de volta ao carregamento inicial exatamente o
> que o lazy loading tirou. O comentário no arquivo explica.

### Um detalhe que costuma surpreender: preview de site em iframe

O modal de projeto tenta exibir o site dentro de um `<iframe>`. Quando o domínio
recusa embed (`X-Frame-Options` ou CSP `frame-ancestors`), **não existe forma
confiável de detectar isso pelo cliente**: o navegador dispara `load`
normalmente, e ler `contentWindow.location.href` lança `SecurityError` tanto no
caso bloqueado quanto num cross-origin que carregou bem. Conseguir separar os
dois seria um vazamento de informação entre origens.

O que o componente faz, então: detecta de verdade em mesma origem, cobre timeout
e erro de rede, aceita a declaração `embeddable: false` nos dados para os
domínios que você já sabe que bloqueiam, e oferece uma saída manual quando não
dá para confirmar. O comentário no topo de
`src/components/portfolio/ProjectModal.jsx` detalha cada caso.

## Acessibilidade

Contraste conferido em todos os pares de texto e fundo (mínimo AA). Modais com
foco preso, fecham no ESC e devolvem o foco a quem os abriu. Acordeão e menu
usam `inert` quando fechados, para não deixarem alvos de tabulação invisíveis.
Cursor customizado só entra em ponteiro fino e sem `prefers-reduced-motion` —
em toque e em movimento reduzido o cursor do sistema continua sendo o cursor.
