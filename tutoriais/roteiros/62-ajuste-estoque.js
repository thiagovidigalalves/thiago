module.exports = {
  id: 'ajuste-estoque',
  ordem: 62,
  grupo: 'Estoque',
  titulo: 'Corrigir estoque e preços (ajuste)',
  resumo: 'Acerte a quantidade em estoque e os preços de vários produtos de uma vez.',
  passos: [
    {
      ir: '/estoque/ajuste',
      desfocarTudo: true,
      titulo: 'Abra "Ajuste de Estoque"',
      texto: 'No menu, clique em Estoque › Ajuste de Estoque.',
      marcar: [{ alvo: { papel: 'heading', nome: 'Ajuste de Estoque' } }],
    },
    {
      desfocarTudo: true,
      titulo: 'Ache o produto',
      texto: 'Digite o nome ou código do produto. Os botões "Estoque negativo" e "Estoque zerado" mostram só os produtos com problema.',
      marcar: [
        { alvo: { placeholder: 'Buscar produto...' }, legenda: 'Buscar' },
        { alvo: { papel: 'button', nome: /Estoque negativo/ }, legenda: 'Com problema' },
      ],
    },
    {
      desfocarTudo: true,
      titulo: 'Digite o novo estoque',
      texto: 'Na coluna "Novo estoque", digite a quantidade certa (a que você contou na prateleira). Se quiser, mude também o custo e o preço de venda.',
      marcar: [{ alvo: 'input[aria-label^="Novo estoque"]' }],
    },
    {
      desfocarTudo: true,
      titulo: 'Clique em "Salvar alterações"',
      texto: 'Clique em "Salvar alterações". O número entre parênteses mostra quantos produtos você mudou. O valor antigo fica guardado no histórico.',
      marcar: [{ alvo: { papel: 'button', nome: /Salvar alterações/ } }],
      dica: 'Errou? Clique em "Desfazer alterações não salvas" antes de salvar.',
    },
  ],
};
