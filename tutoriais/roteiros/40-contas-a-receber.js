module.exports = {
  id: 'contas-a-receber',
  ordem: 40,
  grupo: 'Financeiro',
  titulo: 'Contas a receber: lançar e dar baixa',
  resumo: 'Lance o que o cliente vai te pagar e registre quando ele pagar.',
  passos: [
    {
      ir: '/financeiro/contas-receber',
      titulo: 'Abra Contas a Receber',
      texto: 'No menu, clique em Financeiro › Contas a Receber. Os quadros no alto mostram o total recebido, o saldo a receber e o que está atrasado.',
      marcar: [{ alvo: { papel: 'heading', nome: 'Contas a Receber' } }],
    },
    {
      titulo: 'Veja as contas em aberto',
      texto: 'Use as abas para ver as contas "Em aberto/atraso", as "Pagas" ou "Todas". Para achar um cliente, digite o nome no filtro.',
      marcar: [
        { alvo: { papel: 'tab', nome: /Em aberto/ }, legenda: 'Abas' },
        { alvo: { placeholder: 'Nome do cliente' }, legenda: 'Buscar cliente' },
      ],
    },
    {
      titulo: 'Clique em "Nova conta"',
      texto: 'Para lançar uma conta, clique em "Nova conta".',
      marcar: [{ alvo: { papel: 'button', nome: 'Nova conta' } }],
      depois: [{ tipo: 'clicar', alvo: { papel: 'button', nome: 'Nova conta' }, espera: 1500 }],
    },
    {
      titulo: 'Preencha a conta',
      texto: 'Escolha o cliente, escreva uma descrição, o plano de contas, quantas parcelas, o valor total e o vencimento. Depois clique em "Salvar".',
      marcar: [
        { alvo: { placeholder: 'Digite o nome do cliente...', dentro: 'dialog' }, legenda: 'Cliente' },
        { alvo: { papel: 'button', nome: 'Salvar', exato: true, dentro: 'dialog' }, legenda: 'Salvar' },
      ],
      dica: 'Se o cliente já pagou agora, ligue "Já foi recebido agora" e informe a data e a forma de pagamento.',
    },
    {
      ir: '/financeiro/contas-receber',
      titulo: 'O cliente pagou? Dê baixa',
      texto: 'Na linha da conta, clique em "Receber no caixa (PDV)" ou "Receber com Pix". Confira o valor e confirme.',
      marcar: [{ alvo: { titulo: 'Receber no caixa (PDV)' } }],
      dica: 'O botão "Copiar mensagem de cobrança (WhatsApp)" já monta a mensagem para você mandar ao cliente.',
    },
  ],
};
