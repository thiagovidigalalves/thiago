module.exports = {
  id: 'lista-a-comprar',
  ordem: 65,
  grupo: 'Estoque',
  titulo: 'Lista "A comprar"',
  resumo: 'A equipe anota o que está faltando; quem compra marca o que comprou e quando chegou.',
  passos: [
    {
      ir: '/estoque/a-comprar',
      desfocarTudo: true,
      titulo: 'Anote o que está faltando',
      texto: 'Em Estoque › A comprar, digite o produto (do cadastro ou um novo), a quantidade e uma observação. Se for urgente, clique em "Urgente". Clique em "Lançar".',
      marcar: [{ alvo: { placeholder: /Produto \(busque no cadastro/ } }],
    },
    {
      desfocarTudo: true,
      titulo: 'Errou? Clique no lápis para editar',
      texto: 'Para corrigir um item (nome, quantidade, observação ou urgente), clique no lápis "Editar" na linha dele, mude o que precisa e clique em "Salvar". Nos itens já comprados dá para corrigir também a quantidade comprada e os preços.',
      marcar: [{ alvo: { titulo: 'Editar' } }],
    },
    {
      desfocarTudo: true,
      titulo: 'Comprou? Marque "Comprei"',
      texto: 'Na aba "Falta comprar", clique em "Comprei" no item, escolha o fornecedor e confira quantidade e preços.',
      marcar: [{ alvo: { papel: 'button', nome: /Falta comprar/ } }],
    },
    {
      desfocarTudo: true,
      titulo: 'Chegou? Vira entrada no estoque',
      texto: 'Quando a mercadoria chegar, clique em "Chegou". Os itens comprados também podem virar uma entrada manual já preenchida, com "Transformar em entrada manual".',
      dica: 'Quando você lança a nota (XML) ou a entrada manual do produto, ele passa para "Chegou" sozinho.',
    },
  ],
};
