module.exports = {
  id: 'lixeira-e-auditoria',
  ordem: 91,
  grupo: 'Utilitários',
  titulo: 'Lixeira (restaurar o que foi excluído) e Auditoria',
  resumo: 'Excluiu sem querer? Restaure. E veja quem excluiu ou alterou cada coisa.',
  passos: [
    {
      ir: '/lixeira',
      titulo: 'Encontre o que foi excluído',
      texto: 'Em Utilitários › Lixeira, escolha o tipo (Clientes, Produtos, Contas...) ou busque pelo nome.',
      marcar: [{ alvo: { placeholder: 'Buscar pelo nome, descrição ou quem excluiu' } }],
    },
    {
      titulo: 'Clique em "Restaurar"',
      texto: 'Clique em "Restaurar" na linha do item e confirme. Ele volta para o lugar de antes.',
      marcar: [{ alvo: { papel: 'button', nome: 'Restaurar', exato: true } }],
    },
    {
      ir: '/auditoria',
      titulo: 'Auditoria: quem fez o quê',
      texto: 'Em Utilitários › Auditoria você vê o histórico: o que foi excluído ou alterado, quem fez e quando. Use os filtros de tipo, ação, pessoa e datas.',
      marcar: [{ alvo: { rotulo: 'Pesquisar auditoria' } }],
    },
  ],
};
