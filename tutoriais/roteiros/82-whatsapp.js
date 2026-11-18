module.exports = {
  id: 'whatsapp',
  ordem: 84,
  grupo: 'WhatsApp',
  titulo: 'Conectar o WhatsApp e editar as mensagens',
  resumo: 'Ligue o WhatsApp da loja ao sistema e personalize as mensagens enviadas.',
  antesDeComecar: 'Tenha em mãos o celular com o WhatsApp da empresa.',
  passos: [
    {
      ir: '/configuracoes/whatsapp',
      titulo: 'Abra as configurações do WhatsApp',
      texto: 'No menu, clique em WhatsApp › Configurações e mensagens.',
      marcar: [{ alvo: { papel: 'heading', nome: /WhatsApp · Configurações/ } }],
    },
    {
      titulo: 'Conecte pelo QR Code',
      texto: 'Clique em "Conectar WhatsApp". No celular, abra o WhatsApp › Aparelhos conectados › Conectar aparelho e aponte a câmera para o QR Code.',
      marcar: [{ alvo: { papel: 'button', nome: /Conectar WhatsApp|Gerar novo QR Code|Reconectar/ } }],
    },
    {
      titulo: 'Escolha o que sai automático',
      texto: 'Em "Envio automático", diga se o comprovante de venda, a OS e o orçamento vão sozinhos para o cliente ou só quando você clicar.',
      marcar: [{ alvo: { papel: 'heading', nome: 'Envio automático' } }],
    },
    {
      titulo: 'Edite as mensagens',
      texto: 'Clique na aba do assunto (Comercial, Ordens de serviço, Cobranças, Relacionamento), mude o texto e clique em "Salvar mensagens".',
      marcar: [{ alvo: { papel: 'tab', nome: /Comercial e vendas/ } }],
      dica: 'Abra "Campos disponíveis" para colocar o nome do cliente, valor e outros dados automáticos na mensagem.',
    },
  ],
};
