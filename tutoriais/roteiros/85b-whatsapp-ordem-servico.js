module.exports = {
  id: 'whatsapp-ordem-servico',
  ordem: 85.5,
  grupo: 'WhatsApp',
  titulo: 'Avisar o cliente da OS pelo WhatsApp',
  resumo: 'Escolha se o cliente recebe mensagem quando a OS muda de status e edite o texto.',
  passos: [
    {
      ir: '/whatsapp/ordem-servico',
      titulo: 'Quando a OS muda de status',
      texto: 'Em WhatsApp › Ordem de serviço, escolha "Enviar automático" (o cliente recebe sozinho), "Abrir telinha para enviar" ou "Não avisar". Depois marque em quais status avisar (ex.: Pronto para retirar) e clique em "Salvar status".',
      marcar: [{ alvo: { papel: 'heading', nome: /1\. Quando a OS muda de status/ } }],
    },
    {
      titulo: 'Edite as mensagens',
      texto: 'Em "3. Mensagens da OS", mude o texto. Use os campos entre chaves, como {nome}, {numero} e {status}, que o sistema troca sozinho. Clique em "Salvar mensagens".',
      marcar: [{ alvo: { papel: 'heading', nome: /3\. Mensagens da OS/ } }],
    },
  ],
};
