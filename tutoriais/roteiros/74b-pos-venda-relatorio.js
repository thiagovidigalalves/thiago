module.exports = {
  id: 'pos-venda-agradecer',
  ordem: 74.5,
  grupo: 'Relatórios',
  titulo: 'Agradecer cada compra (Pós-Venda)',
  resumo: 'Mande o "obrigado pela compra" no WhatsApp e veja quem ainda falta.',
  passos: [
    {
      ir: '/relatorios/pos-venda',
      desfocarTudo: true,
      titulo: 'Escolha o período',
      texto: 'Em Relatórios › Clientes › Pós-Venda, clique em "Hoje", "Ontem", "7 dias" ou "30 dias". Os cartões mostram quantas vendas já foram agradecidas e quantas faltam.',
      marcar: [{ alvo: { papel: 'button', nome: 'Ontem', exato: true } }],
    },
    {
      desfocarTudo: true,
      titulo: 'Envie o agradecimento',
      texto: 'Marque "Só pendentes" e clique no botão de WhatsApp em cada venda. A mensagem já vai pronta; depois ela aparece como "Enviado".',
      marcar: [{ alvo: { rotulo: 'Só pendentes' } }],
      dica: 'Para o sistema mandar sozinho, ligue a régua em WhatsApp › Pós-venda.',
    },
  ],
};
