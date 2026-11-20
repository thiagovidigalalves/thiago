module.exports = {
  id: 'entrar-funcionario',
  ordem: 4,
  grupo: 'Primeiros passos',
  titulo: 'Entrar com usuário e senha (funcionário sem e-mail)',
  resumo: 'Funcionário entra com o código da empresa, usuário e senha.',
  antesDeComecar: 'O administrador da empresa precisa ter cadastrado o seu usuário e senha.',
  precisaLogin: false,
  passos: [
    {
      ir: '/login',
      titulo: 'Clique em "Entrar com usuário e senha"',
      texto: 'Na tela de entrada, clique no botão "Entrar com usuário e senha", no final da caixa.',
      marcar: [{ alvo: { texto: 'Entrar com usuário e senha' } }],
      depois: [{ tipo: 'clicar', alvo: { texto: 'Entrar com usuário e senha' }, espera: 2000 }],
    },
    {
      titulo: 'Preencha empresa, usuário e senha',
      texto: 'Digite o código ou o CNPJ da empresa, o seu usuário (ex.: joao.silva) e a sua senha. Quem passa esses dados é o administrador da empresa.',
      marcar: [
        { alvo: { placeholder: 'EMP_... ou 00.000.000/0001-00' }, legenda: 'Código ou CNPJ da empresa' },
        { alvo: { placeholder: 'ex.: joao.silva' }, legenda: 'Seu usuário' },
        { alvo: 'input[type="password"]', legenda: 'Sua senha' },
      ],
    },
    {
      titulo: 'Clique em "Entrar"',
      texto: 'Clique em "Entrar". Você verá só as telas que o administrador liberou para você.',
      marcar: [{ alvo: { papel: 'button', nome: 'Entrar', exato: true } }],
      dica: 'Esqueceu a senha de funcionário? Peça ao administrador da empresa para criar uma nova em Cadastros › Pessoas › Usuários.',
    },
  ],
};
