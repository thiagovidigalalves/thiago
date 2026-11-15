module.exports = {
  id: 'recorrencias',
  ordem: 43,
  grupo: 'Financeiro',
  titulo: 'Contas que se repetem todo mês',
  resumo: 'Aluguel, salário, internet: cadastre uma vez e o sistema lança os próximos 12 meses.',
  passos: [
    {
      ir: '/financeiro/recorrencias',
      titulo: 'Clique em "Nova recorrência"',
      texto: 'No menu, clique em Financeiro › Recorrências. Para uma conta a pagar, clique em "Nova recorrência". Para algo que você recebe todo mês, clique em "A receber".',
      marcar: [
        { alvo: { papel: 'button', nome: 'A receber', exato: true }, legenda: 'Recebo todo mês' },
        { alvo: { papel: 'button', nome: 'Nova recorrência' }, legenda: 'Pago todo mês' },
      ],
      depois: [{ tipo: 'clicar', alvo: { papel: 'button', nome: 'Nova recorrência' }, espera: 1500 }],
    },
    {
      titulo: 'Nome e plano de contas',
      texto: 'Dê um nome (ex.: Aluguel). O plano de contas é sugerido sozinho pelo nome; confira.',
      marcar: [{ alvo: { placeholder: 'Ex.: Aluguel, Salário, Energia', dentro: 'dialog' } }],
    },
    {
      titulo: 'Para quem',
      texto: 'Escolha se é para um funcionário, um fornecedor ou outros (ex.: Cemig, condomínio).',
      marcar: [{ alvo: { papel: 'button', nome: 'Fornecedor', exato: true, dentro: 'dialog' } }],
    },
    {
      titulo: 'Valor e dia do vencimento',
      texto: 'Informe o valor por mês e o dia que vence. O quadro azul mostra quantas contas vão ser lançadas.',
      marcar: [{ alvo: { campo: 'Valor por mês', dentro: 'dialog' } }],
    },
    {
      titulo: 'Clique em "Criar e lançar"',
      texto: 'Clique em "Criar e lançar". As contas aparecem em Contas a Pagar (ou a Receber), uma por mês.',
      marcar: [{ alvo: { papel: 'button', nome: 'Criar e lançar', dentro: 'dialog' } }],
      dica: 'O valor mudou? Use "Alterar": vale de hoje para frente, sem mexer nas contas já pagas.',
    },
  ],
};
