/**
 * Stack apresentada como nós de um canvas, não como grade de logotipos.
 * `role` é o que a ferramenta faz na operação — é isso que interessa ao
 * visitante, mais do que a marca em si.
 */

export const stackGroups = [
  {
    group: 'automação',
    tone: 'volt',
    items: [
      { name: 'GoHighLevel', role: 'CRM, workflows multicanal e Voice AI' },
      { name: 'n8n', role: 'orquestração de processos e integrações' },
      { name: 'Webhooks & REST', role: 'contrato entre sistemas' },
      { name: 'OAuth2 / API Key', role: 'autenticação das integrações' },
    ],
  },
  {
    group: 'produto',
    tone: 'pulse',
    items: [
      { name: 'React', role: 'interfaces e sistemas web' },
      { name: 'TypeScript', role: 'contratos de dados no front' },
      { name: 'Supabase', role: 'banco, auth e tempo real' },
      { name: 'Flutter', role: 'apps iOS e Android' },
      { name: 'Firebase', role: 'dados em tempo real e chat' },
      { name: 'WordPress', role: 'sites e blogs com gestão própria' },
    ],
  },
  {
    group: 'entrega',
    tone: 'faint',
    items: [
      { name: 'Git & GitHub', role: 'versionamento com Gitflow' },
      { name: 'Deploy em nuvem', role: 'publicação e ambientes' },
      { name: 'Motion', role: 'peças animadas e identidade' },
    ],
  },
];
