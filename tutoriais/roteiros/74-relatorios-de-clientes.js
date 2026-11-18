module.exports = {
  id: 'relatorios-de-clientes',
  ordem: 74,
  grupo: 'Relatórios',
  titulo: 'Conhecer seus clientes: resumo, CRM e aniversariantes',
  resumo: 'Descubra os melhores clientes, quem sumiu, quem faz aniversário e chame pelo WhatsApp.',
  passos: [
    {
      ir: '/relatorios/resumo-clientes',
      titulo: 'Resumo de Clientes',
      texto: 'Em Relatórios › Clientes › Resumo de Clientes escolha o período ("Mês", "Ano"...). Aparecem os melhores clientes, os que compram pouco e os que mais atrasam pagamento.',
      marcar: [{ alvo: { papel: 'button', nome: 'Mês', exato: true } }],
    },
    {
      ir: '/relatorios/crm',
      titulo: 'CRM: clientes para chamar de volta',
      texto: 'No CRM de Clientes, a aba "Oportunidades" mostra quem já devia ter voltado a comprar e quanto isso vale. Marque os clientes e clique em "Enviar WhatsApp".',
      marcar: [{ alvo: { papel: 'button', nome: /Oportunidades/ } }],
      dica: 'O link "Personalizar mensagens" deixa você mudar o texto que vai para o cliente.',
    },
    {
      ir: '/relatorios/aniversariantes',
      titulo: 'Aniversariantes: mande os parabéns',
      texto: 'Escolha "Hoje", "Semana" ou "Mês". Marque os clientes (ou "Marcar todos") e clique em "Enviar para marcados" para mandar os parabéns pelo WhatsApp.',
      marcar: [
        { alvo: { papel: 'button', nome: 'Hoje', exato: true }, legenda: 'Período' },
        { alvo: { papel: 'button', nome: /Enviar para marcados/ }, legenda: 'Enviar' },
      ],
    },
    {
      ir: '/relatorios/whatsapp',
      titulo: 'Mensagens enviadas: chegou ou não?',
      texto: 'Em WhatsApp › Mensagens enviadas você vê cada mensagem que o sistema mandou (venda, cobrança, aniversário...) e se foi entregue ou lida.',
      marcar: [{ alvo: { papel: 'heading', nome: /Mensagens enviadas/ } }],
    },
  ],
};
