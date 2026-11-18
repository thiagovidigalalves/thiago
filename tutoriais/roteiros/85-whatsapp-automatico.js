module.exports = {
  id: 'whatsapp-automatico',
  ordem: 85,
  grupo: 'WhatsApp',
  titulo: 'Mensagens automáticas: cobrança, pós-venda e aniversário',
  resumo: 'Ligue a régua e o sistema avisa vencimentos, agradece compras e manda parabéns sozinho.',
  antesDeComecar: 'Para enviar sozinho, conecte o WhatsApp da loja (veja "Conectar o WhatsApp").',
  passos: [
    {
      ir: '/whatsapp/cobrancas',
      desfocarTudo: true,
      titulo: 'Cobranças: lembra antes e cobra depois',
      texto: 'Em WhatsApp › Cobranças, ligue "Régua ligada" e escolha "Enviar sozinho". Aparece a lista "Para hoje" com quem vai receber mensagem.',
      marcar: [{ alvo: { papel: 'group', nome: 'Como envia' } }],
      dica: 'Use "Desta semana" ou "Tudo em atraso" para cobrar mais gente de uma vez.',
    },
    {
      desfocarTudo: true,
      titulo: 'Configure os dias e o texto',
      texto: 'Clique em "Configurar" para escolher a hora do envio, quantos dias antes e depois do vencimento a mensagem sai e o texto de cada etapa.',
      marcar: [{ alvo: { papel: 'button', nome: 'Configurar', exato: true } }],
    },
    {
      ir: '/whatsapp/pos-venda',
      desfocarTudo: true,
      titulo: 'Pós-venda: agradecer e pedir avaliação',
      texto: 'Em WhatsApp › Pós-venda, ligue a régua. Alguns dias depois da compra o cliente recebe um agradecimento e pode dar uma nota de 0 a 10 para a loja.',
      marcar: [{ alvo: { papel: 'heading', nome: /Pós-venda/ } }],
    },
    {
      ir: '/whatsapp/aniversarios',
      desfocarTudo: true,
      titulo: 'Aniversários: parabéns automático',
      texto: 'Em WhatsApp › Aniversários, ligue a régua e o cliente recebe os parabéns no dia do aniversário.',
      marcar: [{ alvo: { papel: 'heading', nome: /Aniversários/ } }],
      dica: 'O aniversário precisa estar no cadastro do cliente.',
    },
  ],
};
