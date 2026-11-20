module.exports = {
  id: 'cadastrar-funcionario',
  ordem: 23,
  grupo: 'Cadastros',
  titulo: 'Cadastrar funcionário e permissões',
  resumo: 'Crie o acesso do funcionário e escolha o que ele pode ver e fazer.',
  antesDeComecar: 'Só o administrador da empresa consegue cadastrar usuários.',
  passos: [
    {
      ir: '/cadastros/usuarios',
      titulo: 'Clique em "Novo usuário"',
      texto: 'No menu, clique em Cadastros › Pessoas › Usuários e depois em "Novo usuário".',
      marcar: [{ alvo: { papel: 'button', nome: 'Novo usuário' } }],
      depois: [{ tipo: 'clicar', alvo: { papel: 'button', nome: 'Novo usuário' }, espera: 1500 }],
    },
    {
      titulo: 'Escolha o perfil',
      texto: 'Em "Perfil de acesso", escolha o que a pessoa faz: Vendedor, Caixa, Gerente, Técnico, Estoquista, Financeiro... O sistema já libera as telas certas para cada perfil.',
      marcar: [{ alvo: { rotulo: 'Perfil de acesso', dentro: 'dialog' } }],
    },
    {
      titulo: 'Nome e forma de entrar',
      texto: 'Digite o nome. Em "Como o funcionário vai entrar?", escolha "Por usuário e senha" se ele não tem e-mail: você mesmo define o usuário e a senha.',
      marcar: [
        { alvo: { campo: 'Nome', dentro: 'dialog' }, legenda: 'Nome' },
        { alvo: { rotulo: 'Tipo de acesso', dentro: 'dialog' }, legenda: 'Como vai entrar' },
      ],
    },
    {
      titulo: 'Comissão (opcional)',
      texto: 'Se o funcionário ganha comissão, informe a porcentagem sobre serviços e sobre produtos. Ela aparece no relatório de comissões.',
      marcar: [{ alvo: { campo: 'Comissão por produtos', dentro: 'dialog' } }],
    },
    {
      titulo: 'Ajuste as permissões',
      texto: 'Na aba "Permissões", marque as telas que ele pode abrir e o que ele pode fazer (dar desconto, excluir venda...).',
      marcar: [{ alvo: { papel: 'tab', nome: 'Permissões', dentro: 'dialog' } }],
    },
    {
      titulo: 'Clique em "Cadastrar"',
      texto: 'Clique em "Cadastrar". Passe para o funcionário o código da empresa, o usuário e a senha (veja o tutorial "Entrar como funcionário").',
      marcar: [{ alvo: { papel: 'button', nome: 'Cadastrar', exato: true, dentro: 'dialog' } }],
      atencao: 'Funcionário saiu da empresa? Edite o usuário e desligue "Ativo" para bloquear o acesso.',
    },
  ],
};
