module.exports = {
  id: 'boletos',
  ordem: 89.5,
  grupo: 'Configurações',
  titulo: 'Configurar boletos do banco',
  resumo: 'Ligue a emissão de boletos com Pix pelo seu banco e defina juros, multa e desconto.',
  antesDeComecar: 'Peça ao seu banco os dados de integração da conta (o gerente sabe quais são).',
  passos: [
    {
      ir: '/configuracoes/boletos',
      desfocarCampos: true,
      titulo: 'Escolha o banco',
      texto: 'Em Configurações › Boletos, clique no cartão do seu banco. "Na hora, automático" registra o boleto na hora, sem arquivo de remessa.',
      marcar: [{ alvo: { papel: 'heading', nome: 'Boletos', exato: true } }],
    },
    {
      desfocarCampos: true,
      titulo: 'Dados da conta e regras',
      texto: 'Preencha os dados da conta (comece em "Testes"). Em "Regras dos boletos" informe juros ao mês, multa, desconto e se o boleto leva o QR Code do Pix.',
      marcar: [{ alvo: { texto: 'Regras dos boletos' } }],
    },
    {
      desfocarCampos: true,
      titulo: 'Teste e ative',
      texto: 'Clique em "Testar conexão". Deu certo? Marque "Ativar" e clique em "Salvar". Depois troque para "Produção" para gerar boletos de verdade.',
      marcar: [{ alvo: { papel: 'button', nome: 'Testar conexão' } }],
    },
  ],
};
