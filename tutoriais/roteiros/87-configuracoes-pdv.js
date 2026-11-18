module.exports = {
  id: 'configuracoes-pdv',
  ordem: 87,
  grupo: 'Configurações',
  titulo: 'Configurar o PDV (caixa)',
  resumo: 'Caixa único ou por terminal, fechamento às cegas, vendedor na venda e impressões.',
  passos: [
    {
      ir: '/configuracoes/pdv',
      titulo: 'Tipo de caixa',
      texto: 'Em Configurações › PDV, escolha "Caixa único" (todos os computadores somam no mesmo caixa) ou "Caixas múltiplos" (cada terminal tem o seu).',
      marcar: [{ alvo: { texto: 'Tipo de caixa da empresa' } }],
    },
    {
      titulo: 'Fechamento de caixa',
      texto: 'Escolha como o operador fecha o caixa: Simples, Conferência aberta (vê o esperado) ou Às cegas (conta sem ver o valor). Você também escolhe o que acontece depois de fechar: imprimir, mandar no WhatsApp ou nada.',
      marcar: [{ alvo: { texto: 'Fechamento de caixa', exato: true } }],
      dica: '"Às cegas" é o mais seguro: o operador informa o que contou e o sistema mostra a diferença para o gerente.',
    },
    {
      titulo: 'Impressões',
      texto: 'Em "Impressões" ajuste o comprovante da venda (formato e duas vias), o recibo de recebimento e quando perguntar sobre o cupom fiscal.',
      marcar: [{ alvo: { papel: 'button', nome: 'Vendas / PDV' } }],
    },
    {
      titulo: 'Clique em "Salvar"',
      texto: 'Confira e clique em "Salvar". Os caixas abertos pegam a mudança na próxima venda.',
      marcar: [{ alvo: { papel: 'button', nome: 'Salvar', exato: true } }],
    },
  ],
};
