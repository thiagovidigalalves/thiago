module.exports = {
  id: 'trocas-e-devolucoes',
  ordem: 78,
  grupo: 'Relatórios',
  titulo: 'Trocas e devoluções',
  resumo: 'Veja quais produtos mais voltam e quanto dinheiro voltou para os clientes.',
  passos: [
    {
      ir: '/relatorios/trocas-devolucoes',
      desfocarTudo: true,
      titulo: 'Abra "Trocas e devoluções"',
      texto: 'No menu, clique em Relatórios › Vendas › Trocas e devoluções. Escolha o período ("Este mês", "3 meses", "12 meses").',
      marcar: [{ alvo: { papel: 'button', nome: '3 meses', exato: true } }],
    },
    {
      desfocarTudo: true,
      titulo: 'Veja o que mais volta',
      texto: 'Os cartões mostram quantas trocas e devoluções teve, o valor que voltou e quanto isso pesa nas vendas. Embaixo aparecem os produtos que mais voltam.',
      marcar: [{ alvo: { papel: 'heading', nome: 'Trocas e devoluções' } }],
      dica: 'Produto que volta muito pode ter defeito de fábrica: fale com o fornecedor.',
    },
  ],
};
