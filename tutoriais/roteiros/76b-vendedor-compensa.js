// Relatórios › Funcionários › O vendedor compensa? (tela nova, 21/11/2026). Só leitura.
module.exports = {
  id: 'vendedor-compensa',
  ordem: 76.2,
  grupo: 'Relatórios',
  titulo: 'O vendedor compensa?',
  valoresReais: true,
  assunto: { chave: ['vendedor compensa', 'vendedor da lucro', 'custo do vendedor', 'lucro do vendedor'], acoes: ['ver', 'saber', 'calcular', 'como', 'funciona'], rotas: ['/relatorios/funcionarios/vendedor-compensa'] },
  resumo: 'Compare o lucro que cada vendedor trouxe com o que ele custa: salário, comissão, INSS, 13º, férias e FGTS.',
  fala: 'Oi! Aqui é o Thiago, da Thiago Informática. Neste vídeo eu vou te mostrar o relatório O vendedor compensa: o lucro que cada vendedor trouxe contra o que ele custa pra loja. Bora lá!',
  passos: [
    {
      ir: '/relatorios/funcionarios/vendedor-compensa',
      espera: 8000,
      titulo: 'Abra o relatório',
      texto: 'Em Relatórios, Funcionários, O vendedor compensa. Ele pega o lucro das vendas de cada vendedor, já tirando o custo dos produtos, os descontos e as devoluções.',
      marcar: [{ alvo: { papel: 'heading', nome: /O vendedor compensa/ }, legenda: 'Lucro × custo' }],
    },
    {
      titulo: 'O custo de verdade',
      texto: 'E coloca do outro lado tudo o que ele custa: salário, INSS, bonificação, comissão, e se você quiser, a provisão do décimo terceiro e das férias, e o FGTS.',
      marcar: [
        { alvo: { texto: 'Provisão de 13º e férias', exato: true }, legenda: '13º e férias' },
        { alvo: { texto: 'FGTS 8%', exato: true }, legenda: 'FGTS' },
      ],
    },
    {
      titulo: 'Mês a mês',
      texto: 'O gráfico mostra mês a mês o lucro das vendas contra o que ele custou. Embaixo aparecem os produtos que mais deram lucro e os de margem baixa.',
      marcar: [
        { alvo: { texto: /Mês a mês: lucro das vendas/ }, legenda: 'Mês a mês' },
        { alvo: { texto: 'Mais deram lucro', exato: true }, legenda: 'Mais lucro' },
      ],
      dica: 'Tem também o "O técnico compensa?", com a mesma conta para quem faz as ordens de serviço.',
    },
  ],
};
