module.exports = {
  id: 'entrada-nfe',
  ordem: 60,
  grupo: 'Estoque',
  titulo: 'Dar entrada na nota do fornecedor (NF-e)',
  resumo: 'As notas de compra chegam sozinhas da SEFAZ: confira e importe no estoque.',
  antesDeComecar: 'Precisa do certificado digital cadastrado. Sem ele, use o botão "Importar XML" com o arquivo que o fornecedor mandou.',
  passos: [
    {
      ir: '/estoque/entrada-dfe',
      espera: 3500,
      titulo: 'Abra "Entrada de NF-e"',
      texto: 'No menu, clique em Estoque › Entrada de NF-e. Aparecem as notas que os fornecedores emitiram para o CNPJ da sua loja.',
      marcar: [{ alvo: { papel: 'heading', nome: /NF-e Recebidas/ } }],
    },
    {
      titulo: 'Busque novas notas',
      texto: 'Clique em "Atualizar agora" para buscar as notas mais recentes na SEFAZ.',
      marcar: [{ alvo: { papel: 'button', nome: 'Atualizar agora' } }],
    },
    {
      titulo: 'Encontre a nota',
      texto: 'Digite o nome do fornecedor, o CNPJ ou o número da nota no campo de busca.',
      marcar: [{ alvo: { placeholder: 'Fornecedor, CNPJ, número ou chave' } }],
    },
    {
      titulo: 'Clique em "Importar"',
      texto: 'Na linha da nota, clique em "Importar". Confira os produtos (o sistema liga cada item ao seu cadastro) e clique em "Confirmar e importar". O estoque e o contas a pagar são atualizados.',
      semPrint: true,
      dica: 'Use o ícone "Visualizar" para ver a nota antes de importar.',
    },
    {
      titulo: 'Recebeu o XML por e-mail? Importe o arquivo',
      texto: 'Se a nota não apareceu na lista, clique em "Importar XML" e escolha o arquivo .xml que o fornecedor mandou.',
      marcar: [{ alvo: { titulo: 'Importar o arquivo XML de uma nota' } }],
    },
  ],
};
