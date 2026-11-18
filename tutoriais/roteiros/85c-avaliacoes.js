module.exports = {
  id: 'avaliacoes',
  ordem: 85.7,
  grupo: 'WhatsApp',
  titulo: 'Avaliações dos clientes (pesquisa de satisfação)',
  resumo: 'Veja a nota que os clientes dão à loja e chame quem ficou insatisfeito.',
  antesDeComecar: 'Ligue a "Pesquisa de satisfação" em Configurações › Recursos inteligentes.',
  passos: [
    {
      ir: '/whatsapp/avaliacoes',
      desfocarTudo: true,
      titulo: 'Veja a nota da loja',
      texto: 'Em WhatsApp › Avaliações, escolha o período. O NPS mostra quantos clientes recomendariam a loja; aparecem também a nota média e o que mais incomoda.',
      marcar: [{ alvo: { papel: 'heading', nome: /Avaliações dos clientes/ } }],
    },
    {
      desfocarTudo: true,
      titulo: 'Recupere quem ficou insatisfeito',
      texto: 'Em "Recuperar clientes", clique em "Chamar" para falar com o cliente pelo WhatsApp. Resolveu? Clique em "Resolvido".',
      dica: 'Cliente bem atendido depois de uma reclamação costuma virar fã da loja.',
    },
  ],
};
