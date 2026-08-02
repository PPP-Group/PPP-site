import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

/* Fontes empacotadas com o site: sem requisição a CDN de terceiros, sem FOUT
   dependente de rede, e o eixo de largura da Archivo (62%–125%) disponível —
   é ele que dá presença aos títulos sem precisar de gradiente. */
import '@fontsource-variable/archivo/wdth.css';
import '@fontsource-variable/hanken-grotesk';
import '@fontsource-variable/jetbrains-mono';

import './styles/index.css';
import App from './App';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
