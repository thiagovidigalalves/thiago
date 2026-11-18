module.exports = {
  id: 'central-de-cobranca',
  ordem: 44,
  grupo: 'Financeiro',
  titulo: 'Cobrar clientes atrasados (Central de cobrança)',
  resumo: 'Veja quem está devendo e mande cobrança pelo WhatsApp para vários de uma vez.',
  passos: [
    {
      ir: '/financeiro/cobranca',
      titulo: 'Abra a Central de cobrança',
      texto: 'No menu, clique em Financeiro › Central de cobrança. No alto aparece o total vencido e quantos clientes estão atrasados.',
      marcar: [{ alvo: { papel: 'heading', nome: 'Central de cobrança' } }],
    },
    {
      titulo: 'Escolha a faixa de atraso',
      texto: 'Clique numa faixa (1 a 15 dias, 16 a 30 dias...) para ver só esses clientes.',
      marcar: [{ alvo: { papel: 'button', nome: /1 a 15 dias/ } }],
    },
    {
      titulo: 'Cobrar um cliente na hora',
      texto: 'Na linha do cliente, o botão do WhatsApp manda a cobrança com as parcelas, e o botão do QR Code gera o Pix das parcelas e envia. O cliente paga e a conta baixa sozinha.',
      marcar: [{ alvo: 'button[aria-label^="Cobrar "][aria-label$=" no WhatsApp"]' }],
    },
    {
      titulo: 'Marque os clientes',
      texto: 'Marque os clientes que você quer cobrar (ou "Marcar todos").',
      marcar: [{ alvo: { rotulo: 'Marcar todos' } }],
    },
    {
      titulo: 'Clique em "Enviar cobrança"',
      texto: 'Clique em "Enviar cobrança". Confira a mensagem, deixe marcado o link de Pix (o cliente paga e a conta baixa sozinha) e clique em "Enviar".',
      semPrint: true,
      dica: 'Clique em "Ver" num cliente para anotar "Prometeu pagar" com a data. Assim você não cobra de novo antes da hora.',
    },
  ],
};
