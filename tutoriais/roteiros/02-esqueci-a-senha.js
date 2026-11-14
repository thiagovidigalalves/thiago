// Tutorial: recuperar a senha (tela pública).
module.exports = {
  id: 'esqueci-a-senha',
  ordem: 2,
  grupo: 'Primeiros passos',
  titulo: 'Esqueci minha senha',
  resumo: 'Receba no seu e-mail um link para criar uma senha nova.',
  precisaLogin: false,
  passos: [
    {
      ir: '/login',
      titulo: 'Clique em "Esqueceu a senha?"',
      texto: 'Na tela de entrada, clique no link "Esqueceu a senha?", que fica ao lado do campo Senha.',
      marcar: [{ alvo: { texto: 'Esqueceu a senha?' } }],
      depois: [{ tipo: 'clicar', alvo: { texto: 'Esqueceu a senha?' }, espera: 2000 }],
    },
    {
      titulo: 'Digite seu e-mail',
      texto: 'Na tela "Recuperar senha", digite o mesmo e-mail que você usa para entrar no sistema.',
      marcar: [{ alvo: 'input[type="email"], input' }],
      depois: [{ tipo: 'preencher', alvo: 'input[type="email"], input', valor: 'maria@minhaloja.com.br' }],
    },
    {
      titulo: 'Clique em "Enviar link de recuperação"',
      texto: 'Clique no botão. Em alguns minutos chega um e-mail com o link para criar sua senha nova. Abra o e-mail, clique no link e cadastre a nova senha.',
      marcar: [{ alvo: { papel: 'button', nome: 'Enviar link de recuperação' } }],
      dica: 'Não chegou? Olhe a caixa de Spam/Lixo eletrônico. Se mesmo assim não aparecer, fale com o suporte.',
    },
  ],
};
