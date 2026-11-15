module.exports = {
  id: 'relatorio-caixas-dre',
  ordem: 70,
  grupo: 'Relatórios',
  titulo: 'Ver o lucro do mês (DRE) e o relatório de caixas',
  resumo: 'Descubra se a loja deu lucro e confira o dinheiro de cada caixa.',
  passos: [
    {
      ir: '/relatorios/dre',
      titulo: 'Abra o DRE',
      texto: 'No menu, clique em Relatórios › Financeiro › DRE. Ele mostra vendas, custo das mercadorias, despesas e o lucro líquido.',
      marcar: [{ alvo: { papel: 'heading', nome: 'DRE', exato: true } }],
    },
    {
      titulo: 'Escolha o mês',
      texto: 'Clique em "Mês atual" ou "Mês anterior". O quadro "Lucro líquido" diz quanto sobrou de verdade.',
      marcar: [{ alvo: { papel: 'button', nome: 'Mês anterior' } }],
      dica: 'Para o DRE ficar certo, os produtos precisam ter preço de custo e as despesas precisam estar com o plano de contas preenchido.',
    },
    {
      ir: '/relatorios/caixas',
      titulo: 'Relatório de Caixas',
      texto: 'Em Relatórios › Caixas › Relatório de Caixa você vê o que entrou, saiu e o dinheiro que deveria estar na gaveta. Clique num caixa para ver os detalhes.',
      marcar: [{ alvo: { papel: 'heading', nome: 'Relatório de Caixas' } }],
    },
  ],
};
