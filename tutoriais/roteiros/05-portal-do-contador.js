module.exports = {
  id: 'portal-do-contador',
  ordem: 5,
  grupo: 'Primeiros passos',
  titulo: 'Acesso do contador',
  resumo: 'Seu contador entra no Portal do Contador para pegar as notas e os arquivos fiscais.',
  antesDeComecar: 'A empresa precisa ter cadastrado o e-mail do contador no sistema.',
  precisaLogin: false,
  passos: [
    {
      ir: '/login',
      titulo: 'Clique em "Sou contador"',
      texto: 'Na tela de entrada, desça até o final e clique em "Sou contador · entrar com usuário e senha".',
      marcar: [{ alvo: { texto: 'Sou contador' } }],
      depois: [{ tipo: 'clicar', alvo: { texto: 'Sou contador' }, espera: 2000 }],
    },
    {
      titulo: 'Clique em "Entrar com e-mail"',
      texto: 'No Portal do Contador, clique em "Entrar com e-mail" e use o e-mail que a empresa cadastrou para você. Dá para entrar com Google, Microsoft ou e-mail e senha.',
      marcar: [{ alvo: { texto: 'Entrar com e-mail', exato: true } }],
      dica: 'Se aparecer que o e-mail não está cadastrado, peça para a empresa (ou para o suporte) incluir o seu e-mail.',
    },
  ],
};
