module.exports = {
  id: 'consultar-vendas',
  ordem: 31,
  grupo: 'Comercial',
  titulo: 'Consultar, imprimir e enviar uma venda',
  resumo: 'Encontre vendas feitas, reimprima o comprovante ou envie pelo WhatsApp.',
  passos: [
    {
      ir: '/vendas',
      titulo: 'Abra a tela de Vendas',
      texto: 'No menu, clique em Comercial › Vendas. Aparecem as vendas do período.',
      marcar: [{ alvo: { papel: 'heading', nome: 'Vendas', exato: true } }],
    },
    {
      titulo: 'Filtre pelo cliente',
      texto: 'Digite o nome do cliente para ver só as vendas dele. Você também pode mudar o período, a forma de pagamento e o status.',
      marcar: [{ alvo: { placeholder: 'Digite o nome do cliente' } }],
    },
    {
      titulo: 'Clique nos três pontinhos da venda',
      texto: 'Na linha da venda, clique no botão "..." (Ações).',
      marcar: [{ alvo: { titulo: 'Ações' } }],
      depois: [{ tipo: 'clicar', alvo: { titulo: 'Ações' } }],
    },
    {
      titulo: 'Escolha o que fazer',
      texto: 'Clique em "Detalhes" para ver os produtos, "Imprimir / PDF" para reimprimir o comprovante ou "Enviar no WhatsApp" para mandar para o cliente.',
      marcar: [{ alvo: '[role="menu"]' }],
      atencao: '"Excluir" manda a venda para a lixeira e devolve os produtos ao estoque. Use só se a venda foi feita errada.',
    },
  ],
};
