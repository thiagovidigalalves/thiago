module.exports = {
  id: 'cadastrar-fornecedor',
  ordem: 22,
  grupo: 'Cadastros',
  titulo: 'Cadastrar um fornecedor',
  resumo: 'Cadastre quem vende mercadoria para a sua loja.',
  passos: [
    {
      ir: '/cadastros/fornecedores',
      titulo: 'Clique em "Novo fornecedor"',
      texto: 'No menu, clique em Cadastros › Pessoas › Fornecedores e depois em "Novo fornecedor".',
      marcar: [{ alvo: { papel: 'button', nome: 'Novo fornecedor' } }],
      depois: [{ tipo: 'clicar', alvo: { papel: 'button', nome: 'Novo fornecedor' }, espera: 1500 }],
    },
    {
      titulo: 'Busque pelo CNPJ',
      texto: 'Digite o CNPJ e clique na lupa: nome e endereço são preenchidos sozinhos com os dados da Receita.',
      marcar: [
        { alvo: { placeholder: 'Digite o CNPJ', dentro: 'dialog' }, legenda: 'CNPJ' },
        { alvo: { titulo: 'Buscar dados públicos do CNPJ', dentro: 'dialog' }, legenda: 'Buscar' },
      ],
    },
    {
      titulo: 'Confira o nome e o contato',
      texto: 'O Nome é obrigatório. Preencha também telefone, WhatsApp e e-mail do vendedor.',
      marcar: [{ alvo: { campo: 'Nome', dentro: 'dialog' } }],
    },
    {
      titulo: 'Clique em "Cadastrar"',
      texto: 'Clique em "Cadastrar". O fornecedor já pode ser usado nas entradas de mercadoria e no contas a pagar.',
      marcar: [{ alvo: { papel: 'button', nome: 'Cadastrar', exato: true, dentro: 'dialog' } }],
    },
  ],
};
