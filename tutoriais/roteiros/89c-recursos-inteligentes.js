module.exports = {
  id: 'recursos-inteligentes',
  ordem: 89.8,
  grupo: 'Configurações',
  titulo: 'Recursos inteligentes (atendente IA, resumo do dia e mais)',
  resumo: 'Ligue só as ferramentas automáticas que quiser usar.',
  passos: [
    {
      ir: '/configuracoes/recursos-ia',
      desfocarCampos: true,
      titulo: 'Ligue o que quiser',
      texto: 'Em Configurações › Recursos inteligentes, cada cartão é uma ferramenta: Atendente no WhatsApp, Orçamento pelo histórico, Cadastro pela câmera, Preço e Compra inteligente, Resumo do dia, Pesquisa de satisfação e Garantia com aviso. Use a chave para ligar ou desligar.',
      marcar: [{ alvo: { papel: 'heading', nome: 'Recursos inteligentes' } }],
    },
    {
      desfocarCampos: true,
      titulo: 'Resumo do dia no WhatsApp',
      texto: 'Ligado o "Resumo do dia", informe até 5 números de WhatsApp que recebem às 19h o resumo das vendas e do caixa. Clique em "Salvar".',
      dica: 'Recurso marcado "Não liberado"? Fale com o suporte da Thiago Informática.',
    },
  ],
};
