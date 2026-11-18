module.exports = {
  id: 'relatorios-de-estoque',
  ordem: 75,
  grupo: 'Relatórios',
  titulo: 'Relatórios de estoque: movimentação e alertas',
  resumo: 'Veja toda entrada e saída de um produto e o que precisa de atenção no estoque.',
  passos: [
    {
      ir: '/relatorios/estoque/movimentacoes',
      titulo: 'Movimentação: por que o estoque mudou?',
      texto: 'Em Relatórios › Estoque › Movimentação, digite o produto e clique em "Pesquisar". Aparece cada entrada e saída, com a data e o documento (venda, nota, ajuste...).',
      marcar: [{ alvo: { placeholder: 'Pesquisar produto ou documento' } }],
    },
    {
      ir: '/relatorios/estoque/alertas',
      titulo: 'Alertas de estoque',
      texto: 'Os cartões mostram produtos com estoque negativo, no mínimo, vendidos abaixo do custo ou com margem baixa. Clique em "Ver produtos" num cartão para ver a lista.',
      marcar: [{ alvo: { papel: 'heading', nome: 'Alertas de estoque' } }],
    },
    {
      titulo: 'Corrija na hora',
      texto: 'Na lista "Produtos que precisam de atenção", clique em "Ajustar" no produto: abre o Ajuste de Estoque para você acertar a quantidade ou o preço.',
      marcar: [{ alvo: { papel: 'button', nome: 'Ajustar', exato: true } }],
    },
  ],
};
