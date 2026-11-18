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
      ir: '/entrar-contador',
      titulo: 'Abra o Portal do Contador',
      texto: 'O contador entra pelo endereço do sistema terminado em /entrar-contador. A empresa manda esse link pelo botão "Enviar acesso ao contador pelo WhatsApp", em Fiscal › Arquivos para contador.',
      marcar: [{ alvo: { texto: 'Portal do Contador', exato: true } }],
    },
    {
      titulo: 'Clique em "Entrar com e-mail"',
      texto: 'No Portal do Contador, clique em "Entrar com e-mail" e use o e-mail que a empresa cadastrou para você. Dá para entrar com Google, Microsoft ou e-mail e senha.',
      marcar: [{ alvo: { texto: 'Entrar com e-mail', exato: true } }],
      dica: 'Se aparecer que o e-mail não está cadastrado, peça para a empresa (ou para o suporte) incluir o seu e-mail.',
    },
  ],
};
