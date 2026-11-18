module.exports = {
  id: 'temas',
  ordem: 83,
  grupo: 'Configurações',
  titulo: 'Mudar as cores do sistema (temas)',
  resumo: 'Escolha a paleta de cores do painel da sua empresa.',
  passos: [
    {
      ir: '/configuracoes/temas',
      titulo: 'Escolha um tema',
      texto: 'Em Configurações › Temas, clique no cartão do tema que preferir (Azul, Premium Slim, Thiago Elite ou Vermelho). Ele já é aplicado e salvo na hora; o tema ativo fica com o ✓.',
      marcar: [{ alvo: { texto: 'Premium Slim', exato: true } }],
      dica: 'O PDV mantém o visual dele. Para a tela escura, use o botão "Modo escuro" no rodapé do menu.',
    },
  ],
};
