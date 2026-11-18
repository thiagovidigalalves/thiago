module.exports = {
  id: 'perdas-e-consumo',
  ordem: 64,
  grupo: 'Estoque',
  titulo: 'Perdas e uso/consumo (baixa de estoque)',
  resumo: 'Dê baixa em produto quebrado, vencido ou usado na própria loja.',
  passos: [
    {
      ir: '/estoque/perdas-consumo',
      titulo: 'Clique em "Nova movimentação"',
      texto: 'Em Estoque › Perdas e Uso/Consumo, clique em "Nova movimentação".',
      marcar: [{ alvo: { papel: 'button', nome: 'Nova movimentação' } }],
      depois: [{ tipo: 'clicar', alvo: { papel: 'button', nome: 'Nova movimentação' }, espera: 1500 }],
    },
    {
      titulo: 'Tipo, motivo e produtos',
      texto: 'Escolha "Perda" (quebrou, venceu, sumiu) ou "Uso e consumo" (usado na loja). Escreva o motivo, busque os produtos e informe a quantidade.',
      marcar: [
        { alvo: { placeholder: /produto danificado/, dentro: 'dialog' }, legenda: 'Motivo' },
        { alvo: { placeholder: 'Buscar por nome, código ou código de barras', dentro: 'dialog' }, legenda: 'Produtos' },
      ],
    },
    {
      titulo: 'Confira e confirme',
      texto: 'Clique em "Conferir movimentação", veja o resumo e clique em "Confirmar baixa pelo custo". O estoque baixa e o custo entra no relatório.',
      marcar: [{ alvo: { papel: 'button', nome: 'Conferir movimentação', dentro: 'dialog' } }],
      dica: 'Lançou errado? Abra a movimentação e use "Estornar": o estoque volta.',
    },
  ],
};
