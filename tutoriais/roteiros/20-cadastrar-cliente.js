module.exports = {
  id: 'cadastrar-cliente',
  ordem: 20,
  grupo: 'Cadastros',
  titulo: 'Cadastrar um cliente',
  resumo: 'Cadastre clientes com nome, CPF/CNPJ, WhatsApp e endereço.',
  passos: [
    {
      ir: '/cadastros/clientes',
      titulo: 'Abra a tela de Clientes',
      texto: 'No menu, clique em Cadastros › Clientes. Aqui ficam todos os seus clientes.',
      marcar: [{ alvo: { papel: 'heading', nome: 'Clientes', exato: true } }],
    },
    {
      titulo: 'Clique em "Novo cliente"',
      texto: 'Clique no botão "Novo cliente", no alto da tela.',
      marcar: [{ alvo: { papel: 'button', nome: 'Novo cliente' } }],
      depois: [{ tipo: 'clicar', alvo: { papel: 'button', nome: 'Novo cliente' }, espera: 1500 }],
    },
    {
      titulo: 'Digite o nome (obrigatório)',
      texto: 'O único campo obrigatório é o Nome. O Código é criado sozinho quando você salva.',
      marcar: [{ alvo: { campo: 'Nome', dentro: 'dialog' } }],
      depois: [{ tipo: 'preencher', alvo: { campo: 'Nome', dentro: 'dialog' }, valor: 'Maria da Silva' }],
    },
    {
      titulo: 'CPF ou CNPJ',
      texto: 'Digite o CPF ou CNPJ. Se for CNPJ, clique na lupa ao lado: o sistema busca e preenche os dados da empresa sozinho.',
      marcar: [
        { alvo: { placeholder: 'CPF ou CNPJ', dentro: 'dialog' }, legenda: 'CPF ou CNPJ' },
        { alvo: { rotulo: 'Buscar CNPJ', dentro: 'dialog' }, legenda: 'Busca o CNPJ' },
      ],
    },
    {
      titulo: 'WhatsApp e e-mail',
      texto: 'Preencha o WhatsApp do cliente. Ele é usado para enviar comprovantes, cobranças e mensagens de aniversário.',
      marcar: [
        { alvo: { placeholder: '(principal)', dentro: 'dialog' }, legenda: 'WhatsApp' },
        { alvo: { campo: 'E-mail', dentro: 'dialog' }, legenda: 'E-mail' },
      ],
      dica: 'Preencha também o Aniversário: o sistema avisa quando chegar o dia.',
    },
    {
      titulo: 'Endereço pelo CEP',
      texto: 'Digite o CEP e clique no botão de consultar: rua, bairro, cidade e estado são preenchidos sozinhos. Depois complete o número.',
      marcar: [{ alvo: { titulo: 'Consultar CEP', dentro: 'dialog' } }],
    },
    {
      titulo: 'Clique em "Cadastrar"',
      texto: 'Confira os dados e clique em "Cadastrar". Pronto: o cliente já aparece na lista e pode ser usado nas vendas.',
      marcar: [{ alvo: { papel: 'button', nome: 'Cadastrar', exato: true, dentro: 'dialog' } }],
      dica: 'Para alterar depois, clique no lápis (Editar) na linha do cliente.',
    },
  ],
};
