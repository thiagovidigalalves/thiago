module.exports = {
  id: 'configuracoes-ordem-servico',
  ordem: 86,
  grupo: 'Configurações',
  titulo: 'Configurar a Ordem de Serviço',
  resumo: 'Numeração, garantia, impressão, etiqueta e WhatsApp automático para técnico e cliente.',
  passos: [
    {
      ir: '/configuracoes/ordem-servico',
      titulo: 'Escolha o assunto no menu',
      texto: 'Em Configurações › Ordem de Serviço, o menu de cima separa os assuntos: Geral, Impressão, Etiqueta, WhatsApp, Agenda, Atrasos e Dias.',
      marcar: [{ alvo: { papel: 'navigation', nome: 'Seções da Ordem de Serviço' } }],
    },
    {
      titulo: 'Geral: número, garantia e equipamento',
      texto: 'Em "Geral" você define o próximo número de OS, o termo de garantia que sai no PDF e se o equipamento é obrigatório ou opcional na OS.',
      marcar: [{ alvo: { papel: 'button', nome: 'Obrigatório (padrão)' } }],
    },
    {
      titulo: 'Impressão e etiqueta',
      texto: 'Em "Impressão" escolha A4 ou bobina e se a OS imprime sozinha ao salvar. Em "Etiqueta" escolha se a etiqueta da OS sai junto, sozinha ou só pelo ícone.',
      marcar: [{ alvo: { papel: 'button', nome: /Impressão/ } }],
    },
    {
      titulo: 'WhatsApp, agenda e atrasos do técnico',
      texto: 'Em "WhatsApp" escolha se o técnico e/ou o cliente recebem mensagem quando você salva uma OS nova. Em "Agenda" o técnico recebe a agenda do dia às 8h; em "Atrasos", um aviso quando a OS passar do horário.',
      marcar: [{ alvo: { papel: 'button', nome: /WhatsApp/ } }],
    },
    {
      titulo: 'Clique em "Salvar configurações"',
      texto: 'Depois de ajustar, clique em "Salvar configurações" no rodapé. Vale para todas as abas.',
      marcar: [{ alvo: { papel: 'button', nome: 'Salvar configurações' } }],
    },
  ],
};
