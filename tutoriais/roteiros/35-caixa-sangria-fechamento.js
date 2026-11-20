module.exports = {
  id: 'caixa-sangria-fechamento',
  ordem: 35,
  grupo: 'Comercial',
  titulo: 'Sangria, suprimento e fechar o caixa',
  resumo: 'Tire ou coloque dinheiro na gaveta e feche o caixa no fim do dia.',
  fala: 'Oi! Aqui é o Thiago, da Thiago Informática. Neste vídeo eu vou te mostrar como tirar ou colocar dinheiro na gaveta, e como fechar o caixa no fim do dia.', // abertura do vídeo, no jeito de falar do Thiago
  passos: [
    {
      ir: '/pdv',
      espera: 4000,
      titulo: 'Sangria: tirar dinheiro da gaveta',
      texto: 'Na tela inicial do PDV, clique em "Sangria" (Ctrl+3). Digite o valor, uma descrição e escolha "Cofre" ou a despesa (ex.: pagamento de fornecedor). Clique em "Confirmar".',
      marcar: [{ alvo: { papel: 'button', nome: /Sangria/ } }],
    },
    {
      titulo: 'Suprimento: colocar troco',
      texto: 'Precisou colocar mais troco? Clique em "Suprimento" (Ctrl+4), digite o valor e confirme.',
      marcar: [{ alvo: { papel: 'button', nome: /Suprimento/ } }],
    },
    {
      titulo: 'Confira o resumo',
      texto: 'Antes de fechar, clique em "Resumo do caixa" (Ctrl+5) para ver quanto vendeu em cada forma e quanto deve ter na gaveta.',
      marcar: [{ alvo: { papel: 'button', nome: /Resumo do caixa/ } }],
    },
    {
      titulo: 'Feche o caixa',
      texto: 'Clique em "Fechar caixa" (Ctrl+6). Conte o dinheiro, informe quanto vai retirar (se for levar para o cofre) e clique em "Fechar caixa".',
      marcar: [{ alvo: { papel: 'button', nome: /(Fechar|Abrir) caixa/ } }],
      dica: 'Marque "Conferir cédulas e moedas" para contar nota por nota: o sistema soma para você.',
      atencao: 'Feche o caixa todo dia. No dia seguinte, abra de novo com o valor do troco.',
    },
    {
      ir: '/relatorios/caixas/fechamentos',
      titulo: 'Confira os fechamentos',
      texto: 'O dono/gerente vê todos os caixas fechados, com sobras e faltas, em Relatórios › Caixas › Fechamento de Caixa.',
      marcar: [{ alvo: { papel: 'heading', nome: 'Fechamento de Caixa' } }],
    },
  ],
};
