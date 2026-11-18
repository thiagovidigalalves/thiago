module.exports = {
  id: 'devolucao-fornecedor',
  ordem: 54,
  grupo: 'Fiscal',
  titulo: 'Devolver mercadoria ao fornecedor (NF-e de devolução)',
  resumo: 'Escolha a nota de compra, marque o que vai voltar e emita a nota de devolução.',
  passos: [
    {
      ir: '/fiscal/devolucao-fornecedor',
      titulo: 'Clique em "Nova devolução"',
      texto: 'Em Fiscal › Devolução fornecedor, clique em "Nova devolução". Também dá para começar direto pela nota de entrada, buscando pelo fornecedor, número ou chave.',
      marcar: [{ alvo: { papel: 'button', nome: 'Nova devolução' } }],
      depois: [{ tipo: 'clicar', alvo: { papel: 'button', nome: 'Nova devolução' }, espera: 2000 }],
    },
    {
      titulo: 'Fornecedor e nota original',
      texto: 'No passo 1, escolha o fornecedor e informe a nota original (número e chave de 44 dígitos). Se tiver o XML da compra, use "Anexar XML original" que preenche tudo sozinho.',
      marcar: [{ alvo: { papel: 'heading', nome: /1\. Fornecedor e nota original/ } }],
    },
    {
      titulo: 'Produtos e conferência fiscal',
      texto: 'No passo 2, adicione os produtos e a quantidade que vai voltar. No passo 3, confira os impostos (o contador ajuda aqui). Depois clique em "Conferir devolução" e em "Emitir NF-e de devolução".',
      marcar: [{ alvo: { papel: 'heading', nome: /2\. Produtos e quantidades/ } }],
      atencao: 'A nota de devolução vale para a Receita. Use "Salvar rascunho" se ainda for confirmar algo com o contador.',
    },
  ],
};
