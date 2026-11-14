// Tutorial: como entrar no sistema (tela pública, não precisa de login).
module.exports = {
  id: 'entrar-no-sistema',
  ordem: 1,
  grupo: 'Primeiros passos',
  titulo: 'Como entrar no sistema',
  resumo: 'Acesse o sistema com seu e-mail e senha, ou com sua conta Google/Microsoft.',
  precisaLogin: false,
  passos: [
    {
      ir: '/login',
      titulo: 'Digite seu e-mail',
      texto: 'Abra o endereço do sistema no navegador. Na tela "Bem-vindo!", clique no campo E-mail e digite o e-mail que você usa no sistema.',
      marcar: [{ alvo: { placeholder: 'seu@email.com' } }],
      depois: [{ tipo: 'preencher', alvo: { placeholder: 'seu@email.com' }, valor: 'maria@minhaloja.com.br' }],
    },
    {
      titulo: 'Digite sua senha',
      texto: 'Clique no campo Senha e digite a sua senha. Ela aparece com bolinhas para ninguém ver.',
      marcar: [{ alvo: 'input[type="password"]' }],
      depois: [{ tipo: 'preencher', alvo: 'input[type="password"]', valor: 'senha1234' }],
    },
    {
      titulo: 'Clique em Entrar',
      texto: 'Confira o e-mail e clique no botão Entrar. Pronto: o sistema abre no Dashboard.',
      marcar: [{ alvo: { papel: 'button', nome: 'Entrar', exato: true } }],
      dica: 'Se o sistema pedir um código de verificação, abra o aplicativo autenticador ou o seu e-mail e digite o código que chegou.',
    },
    {
      ir: '/login',
      titulo: 'Ou entre com Google ou Microsoft',
      texto: 'Se o seu e-mail é Gmail ou Hotmail/Outlook, você pode clicar em "Continuar com Google" ou "Continuar com Microsoft" e entrar sem digitar senha.',
      marcar: [
        { alvo: { papel: 'button', nome: 'Continuar com Google' }, legenda: 'Gmail' },
        { alvo: { papel: 'button', nome: 'Continuar com Microsoft' }, legenda: 'Hotmail / Outlook' },
      ],
    },
  ],
};
