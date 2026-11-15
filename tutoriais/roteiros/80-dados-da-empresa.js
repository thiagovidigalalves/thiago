module.exports = {
  id: 'dados-da-empresa',
  ordem: 80,
  grupo: 'Configurações',
  titulo: 'Dados da empresa e logo',
  resumo: 'Preencha CNPJ, endereço, contatos e o logo que saem nos comprovantes.',
  passos: [
    {
      ir: '/configuracoes/geral',
      desfocarCampos: true,
      titulo: 'Abra "Dados da Empresa"',
      texto: 'No menu, clique em Configurações › Dados da Empresa.',
      marcar: [{ alvo: { papel: 'heading', nome: 'Dados da Empresa' } }],
    },
    {
      desfocarCampos: true,
      titulo: 'Busque pelo CNPJ',
      texto: 'Digite o CNPJ e clique em "Buscar CNPJ": razão social e endereço são preenchidos sozinhos.',
      marcar: [
        { alvo: { placeholder: '00.000.000/0000-00' }, legenda: 'CNPJ' },
        { alvo: { papel: 'button', nome: 'Buscar CNPJ' }, legenda: 'Buscar' },
      ],
    },
    {
      desfocarCampos: true,
      titulo: 'Coloque o logo',
      texto: 'Em "Logo da empresa", envie a imagem do seu logo. Ele aparece nos comprovantes, orçamentos e PDFs.',
      marcar: [{ alvo: { texto: 'Logo da empresa' } }],
    },
    {
      desfocarCampos: true,
      titulo: 'Clique em "Salvar configurações"',
      texto: 'Confira telefone, WhatsApp e e-mail e clique em "Salvar configurações".',
      marcar: [{ alvo: { papel: 'button', nome: 'Salvar configurações' } }],
    },
  ],
};
