module.exports = {
  id: 'contas-e-caixas',
  ordem: 45,
  grupo: 'Financeiro',
  titulo: 'Saldo das contas e conferência dos caixas',
  resumo: 'Veja o saldo de cada banco e caixa, transfira entre contas e confira os caixas fechados.',
  passos: [
    {
      ir: '/financeiro/contas',
      desfocarTudo: true,
      titulo: 'Saldo de cada conta',
      texto: 'Em Financeiro › Contas aparece um cartão para cada conta (banco, caixa, cofre) com o saldo, as entradas e as saídas do período. Clique em "Ver detalhes" para ver cada movimento.',
      marcar: [{ alvo: { papel: 'heading', nome: 'Contas', exato: true } }],
    },
    {
      desfocarTudo: true,
      titulo: 'Transferir ou ajustar',
      texto: 'Clique em "Movimentar" para passar dinheiro de uma conta para outra (ex.: do caixa para o banco) ou ajustar o saldo, sempre com o motivo.',
      marcar: [{ alvo: { papel: 'button', nome: 'Movimentar', exato: true } }],
    },
    {
      ir: '/financeiro/caixas',
      desfocarTudo: true,
      titulo: 'Conferir os caixas fechados',
      texto: 'Em Financeiro › Caixas e conferência, abra a aba "A conferir". Clique no caixa, confira o esperado e o contado em cada forma de pagamento e clique em "Conferido".',
      marcar: [{ alvo: { papel: 'button', nome: /A conferir/ } }],
      dica: 'Se um Pix foi lançado como dinheiro, use "Ajustar" na forma e escreva o motivo.',
    },
  ],
};
