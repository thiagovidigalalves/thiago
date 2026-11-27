// Cadastro de fornecedor feito DE VERDADE na Demonstração (pedido do dono, 21/11/2026): fornecedor fictício
// "Atacado Exemplo Sul", sem telefone, salva e aparece na lista.
module.exports = {
  id: 'cadastrar-fornecedor',
  ordem: 22,
  grupo: 'Cadastros',
  titulo: 'Cadastrar um fornecedor',
  gravaDados: true,
  aceitarConfirmacao: true,
  manter: ['Atacado Exemplo Sul'],
  assunto: { chave: ['fornecedor', 'fornecedores'], acoes: ['cadastrar', 'cadastro', 'novo', 'incluir', 'adicionar', 'criar', 'como'], rotas: ['/cadastros/fornecedores'] },
  resumo: 'Cadastre quem vende mercadoria para a sua loja.',
  fala: 'Oi! Aqui é o Thiago, da Thiago Informática. Neste vídeo eu vou cadastrar um fornecedor de verdade. Bora lá!',
  passos: [
    {
      ir: '/cadastros/fornecedores',
      espera: 6000,
      titulo: 'Abra Fornecedores',
      texto: 'No menu, clica em Cadastros, Pessoas, Fornecedores. Pra cadastrar, é no botão Novo fornecedor.',
      marcar: [{ alvo: { papel: 'button', nome: 'Novo fornecedor' }, legenda: 'Novo fornecedor' }],
    },
    {
      antes: [{ tipo: 'clicar', alvo: { papel: 'button', nome: 'Novo fornecedor' }, seguro: true, espera: 1800 }],
      titulo: 'Busque pelo CNPJ',
      texto: 'Se tiver o CNPJ, digita e clica na lupa: o nome e o endereço vêm sozinhos, direto da Receita.',
      marcar: [
        { alvo: { placeholder: 'Digite o CNPJ', dentro: 'dialog' }, legenda: 'CNPJ' },
        { alvo: { titulo: 'Buscar dados públicos do CNPJ', dentro: 'dialog' }, legenda: 'Buscar' },
      ],
    },
    {
      antes: [{ tipo: 'preencher', alvo: { campo: 'Nome', dentro: 'dialog' }, valor: 'Atacado Exemplo Sul' }],
      titulo: 'O nome e o contato',
      texto: 'O nome é o único obrigatório. Aqui eu digitei Atacado Exemplo Sul. Dá pra colocar também o telefone, o WhatsApp e o e-mail do vendedor.',
      marcar: [{ alvo: { campo: 'Nome', dentro: 'dialog' }, legenda: 'Nome' }],
    },
    {
      titulo: 'Clique em Cadastrar',
      texto: 'Clica em Cadastrar e pronto.',
      marcar: [{ alvo: { papel: 'button', nome: 'Cadastrar', exato: true, dentro: 'dialog' }, legenda: 'Cadastrar' }],
      depois: [{ tipo: 'clicar', alvo: { papel: 'button', nome: 'Cadastrar', exato: true, dentro: 'dialog' }, aguardarFechar: true, espera: 2500 }],
    },
    {
      antes: [{ tipo: 'preencher', alvo: { placeholder: 'Buscar fornecedor' }, valor: 'Atacado Exemplo Sul', espera: 3500 }],
      titulo: 'O fornecedor já está na lista',
      texto: 'Ele já aparece na lista, pronto pra usar na entrada de mercadoria e no contas a pagar.',
      marcar: [{ alvo: { texto: 'Atacado Exemplo Sul', exato: true }, legenda: 'Fornecedor salvo' }],
    },
  ],
};
