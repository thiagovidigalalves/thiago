// Tutorial: criar a conta a partir de um convite (tela pública).
module.exports = {
  id: 'criar-conta',
  ordem: 3,
  grupo: 'Primeiros passos',
  titulo: 'Criar minha conta (primeiro acesso)',
  resumo: 'Recebeu um convite? Crie sua senha e comece a usar.',
  precisaLogin: false,
  passos: [
    {
      ir: '/register',
      titulo: 'Abra o link do convite',
      texto: 'Abra o link que chegou no seu e-mail de convite. Ele abre a tela "Criar Conta". Só funciona com e-mails autorizados pela sua empresa.',
      marcar: [{ alvo: { texto: 'Criar Conta', exato: true } }],
    },
    {
      titulo: 'Preencha seus dados',
      texto: 'Use o MESMO e-mail que recebeu o convite. Depois digite seu nome, crie uma senha e repita a senha no último campo.',
      marcar: [
        { alvo: { rotulo: 'E-mail' }, legenda: 'E-mail do convite' },
        { alvo: { rotulo: 'Nome do responsável' }, legenda: 'Seu nome' },
        { alvo: { rotulo: 'Senha', exato: true }, legenda: 'Crie uma senha' },
        { alvo: { rotulo: 'Confirmar senha' }, legenda: 'Repita a senha' },
      ],
    },
    {
      titulo: 'Clique em "Criar conta"',
      texto: 'Clique no botão "Criar conta". Pronto! Agora é só entrar com seu e-mail e a senha que você criou.',
      marcar: [{ alvo: { papel: 'button', nome: 'Criar conta', exato: true } }],
      dica: 'Só funciona com e-mails autorizados pela sua empresa. Se aparecer aviso de e-mail não autorizado, peça ao responsável da empresa para liberar seu e-mail.',
    },
  ],
};
