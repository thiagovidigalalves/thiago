module.exports = {
  id: 'relatorios-financeiros',
  ordem: 73,
  grupo: 'Relatórios',
  titulo: 'Relatórios financeiros: fluxo de caixa, gastos e comparativo',
  resumo: 'Veja o dinheiro que entrou e saiu, o que pagou e se o mês foi melhor que o anterior.',
  passos: [
    {
      ir: '/relatorios/fluxo-caixa',
      titulo: 'Fluxo de Caixa: o que entrou e saiu de verdade',
      texto: 'Em Relatórios › Financeiro › Fluxo de Caixa escolha as datas. Crediário e boleto só entram quando o cliente paga. Troque entre "Detalhado" e "Resumo".',
      marcar: [{ alvo: { papel: 'heading', nome: 'Fluxo de Caixa' } }],
      dica: 'O botão "PDF" gera o relatório para mandar ao contador.',
    },
    {
      ir: '/relatorios/contas-pagar',
      titulo: 'Relatório de Contas a Pagar: para onde foi o dinheiro',
      texto: 'Veja os gastos pagos e a pagar por plano de contas, fornecedor ou funcionário. O botão "Fixas" mostra só as despesas que se repetem todo mês.',
      marcar: [{ alvo: { titulo: 'Mostrar só despesas fixas' } }],
    },
    {
      ir: '/relatorios/comparativo',
      titulo: 'Comparativo Financeiro: este mês × mês passado',
      texto: 'Clique em "Este mês × mês passado" (ou outro atalho). O sistema mostra se faturamento e entradas melhoraram ou pioraram.',
      marcar: [{ alvo: { papel: 'button', nome: /Este mês × mês passado/ } }],
    },
  ],
};
