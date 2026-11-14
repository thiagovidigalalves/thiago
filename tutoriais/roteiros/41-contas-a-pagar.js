module.exports = {
  id: 'contas-a-pagar',
  ordem: 41,
  grupo: 'Financeiro',
  titulo: 'Contas a pagar: lançar e pagar',
  resumo: 'Registre suas despesas e boletos e marque quando pagar.',
  passos: [
    {
      ir: '/financeiro/contas-pagar',
      titulo: 'Abra Contas a Pagar',
      texto: 'No menu, clique em Financeiro › Contas a Pagar. Os quadros mostram o que já foi pago, o saldo a pagar e o que está atrasado.',
      marcar: [{ alvo: { papel: 'heading', nome: 'Contas a Pagar' } }],
    },
    {
      titulo: 'Clique em "Nova conta"',
      texto: 'Clique em "Nova conta" para lançar uma despesa ou boleto.',
      marcar: [{ alvo: { papel: 'button', nome: 'Nova conta' } }],
      depois: [{ tipo: 'clicar', alvo: { papel: 'button', nome: 'Nova conta' }, espera: 1500 }],
    },
    {
      titulo: 'Diga de quem é a despesa',
      texto: 'Em "Vínculo da despesa", escolha Fornecedor, Funcionário ou Despesa geral (luz, aluguel, internet...).',
      marcar: [{ alvo: { texto: 'Vínculo da despesa', dentro: 'dialog' } }],
    },
    {
      titulo: 'Preencha e salve',
      texto: 'Coloque a descrição, o plano de contas, as parcelas, o valor e o vencimento. Clique em "Salvar".',
      marcar: [
        { alvo: { placeholder: 'Digite ou busque o plano de contas...', dentro: 'dialog' }, legenda: 'Plano de contas' },
        { alvo: { papel: 'button', nome: 'Salvar', exato: true, dentro: 'dialog' }, legenda: 'Salvar' },
      ],
      dica: 'Conta que se repete todo mês (aluguel, internet)? Cadastre em Financeiro › Recorrências e ela é lançada sozinha.',
    },
    {
      ir: '/financeiro/contas-pagar',
      titulo: 'Pagou? Clique em "Pagar"',
      texto: 'Na linha da conta, clique em "Pagar", confira o valor, a forma e de qual conta saiu o dinheiro, e confirme.',
      marcar: [{ alvo: { papel: 'button', nome: 'Pagar', exato: true } }],
    },
  ],
};
