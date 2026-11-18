module.exports = {
  id: 'preco-e-compra-inteligente',
  ordem: 66,
  grupo: 'Estoque',
  titulo: 'Preço inteligente e compra inteligente',
  resumo: 'Ache produtos vendidos no prejuízo e saiba o que comprar antes que acabe.',
  antesDeComecar: 'Ligue os recursos em Configurações › Recursos inteligentes.',
  passos: [
    {
      ir: '/estoque/preco-inteligente',
      desfocarTudo: true,
      titulo: 'Preço inteligente: corrija o prejuízo',
      texto: 'Em Estoque › Preço inteligente aparecem os produtos vendidos com prejuízo ou margem baixa. Confira o "Preço novo" sugerido, marque os produtos e clique em "Aplicar".',
      marcar: [{ alvo: { placeholder: 'Buscar produto' } }],
    },
    {
      ir: '/estoque/compra-inteligente',
      desfocarTudo: true,
      titulo: 'Compra inteligente: o que vai faltar',
      texto: 'Em Estoque › Compra inteligente, informe em quantos dias o fornecedor entrega e para quantos dias quer comprar. Clique em "Calcular".',
      marcar: [{ alvo: { papel: 'button', nome: 'Calcular', exato: true } }],
    },
    {
      desfocarTudo: true,
      titulo: 'Mande o pedido ao fornecedor',
      texto: 'O sistema separa os produtos por fornecedor, com a quantidade sugerida. Ajuste o que quiser e clique em "Pedir no WhatsApp" (ou "Copiar").',
      marcar: [{ alvo: { rotulo: 'Fornecedor entrega em (dias)' } }],
      dica: 'A conta usa o ritmo de vendas dos últimos 90 dias.',
    },
  ],
};
