module.exports = {
  id: 'relatorios-de-vendas',
  ordem: 71,
  grupo: 'Relatórios',
  titulo: 'Relatórios de vendas: BI, faturamento, comparativo e Curva ABC',
  resumo: 'Veja quanto vendeu, quanto sobrou de verdade, se cresceu e quais produtos mais vendem.',
  passos: [
    {
      ir: '/relatorios/vendas/bi',
      desfocarTudo: true,
      titulo: 'BI Vendas: quanto vendeu e como pagaram',
      texto: 'Em Relatórios › Vendas › BI Vendas escolha o período nos filtros do alto. Os gráficos mostram as vendas por forma de pagamento e por situação. Clique numa fatia para filtrar.',
      marcar: [{ alvo: { papel: 'heading', nome: 'BI Vendas', exato: true } }],
      dica: 'O botão "Imprimir" gera o relatório para guardar em PDF.',
    },
    {
      ir: '/relatorios/vendas/faturamento',
      desfocarTudo: true,
      titulo: 'Faturamento: do bruto ao líquido',
      texto: 'Em Relatórios › Vendas › Faturamento você vê o que vendeu, os descontos e taxas, e quanto ficou de verdade. Escolha o período nos botões do alto; ele compara sozinho com o período anterior.',
      marcar: [{ alvo: { papel: 'heading', nome: 'Faturamento', exato: true } }],
    },
    {
      ir: '/relatorios/comparativo-vendas',
      desfocarTudo: true,
      titulo: 'Comparativo: vendeu mais ou menos?',
      texto: 'Em Comparativo de Vendas, clique em "Mês × anterior" (ou "Semana × anterior", "Ano × anterior"). Os cartões mostram faturamento, quantidade de vendas, ticket médio e o crescimento.',
      marcar: [{ alvo: { papel: 'button', nome: /Mês × anterior/ } }],
      dica: 'Use "Personalizado" para comparar quaisquer datas, por exemplo a Black Friday deste ano com a do ano passado.',
    },
    {
      ir: '/relatorios/curva-abc',
      desfocarTudo: true,
      titulo: 'Curva ABC: os produtos que mais trazem dinheiro',
      texto: 'Em Curva ABC, os produtos "A" são os poucos que trazem a maior parte do faturamento; os "C" quase não vendem. Classifique por faturamento, quantidade ou lucro.',
      marcar: [
        { alvo: { papel: 'button', nome: 'Maior faturamento', exato: true }, legenda: 'Ordenar' },
        { alvo: { papel: 'button', nome: 'A', exato: true }, legenda: 'Só os da classe A' },
      ],
      dica: 'Nunca deixe faltar os produtos da classe A. Os da classe C são bons para promoção.',
    },
  ],
};
