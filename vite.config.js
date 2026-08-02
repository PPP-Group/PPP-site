import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    target: 'es2020',
    cssCodeSplit: true,
    /*
     * Sem manualChunks de proposito.
     *
     * `motion` so e alcancado pelos modais, que sao carregados com React.lazy;
     * `lenis` entra por import dinamico no hook de rolagem. Deixar o Rollup
     * dividir naturalmente mantem os dois fora do grafo de imports estaticos
     * da entrada — e portanto fora do modulepreload do index.html.
     *
     * Agrupa-los a mao em chunks nomeados fazia o Vite tratar `motion` como
     * dependencia de topo e emitir um <link rel="modulepreload"> para ele,
     * baixando 134 kB no carregamento inicial para animar um modal que talvez
     * ninguem abra.
     */
  },
});
