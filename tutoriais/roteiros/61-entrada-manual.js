module.exports = {
  id: 'entrada-manual',
  ordem: 61,
  grupo: 'Estoque',
  titulo: 'Entrada manual de mercadoria (sem nota)',
  resumo: 'Lance uma compra à mão: produtos, pagamento e preço de venda.',
  antesDeComecar: 'O fornecedor e os produtos podem ser cadastrados na hora, dentro da própria entrada.',
  passos: [
    {
      ir: '/estoque/entrada-manual',
      titulo: 'Clique em "Nova entrada"',
      texto: 'No menu, clique em Estoque › Entrada Manual e depois em "Nova entrada" (atalho F1).',
      marcar: [{ alvo: { papel: 'button', nome: /Nova entrada/ } }],
      depois: [{ tipo: 'clicar', alvo: { papel: 'button', nome: /Nova entrada/ }, espera: 1500 }],
    },
    {
      titulo: 'Escolha o fornecedor',
      texto: 'Digite o nome do fornecedor, use a seta para baixo e aperte Enter. Se ele não existe, clique em "+ Cadastrar".',
      marcar: [{ alvo: { placeholder: 'Fornecedor: digite, ↓ e Enter' } }],
    },
    {
      titulo: 'Lance os produtos',
      texto: 'Digite o nome, código ou passe o código de barras e aperte Enter. Para cada produto, informe a quantidade e o custo unitário.',
      marcar: [{ alvo: { placeholder: 'Nome, código ou barras; Enter seleciona' } }],
    },
    {
      titulo: 'Informe o pagamento',
      texto: 'Clique em "2. Pagamento", escolha a forma (à vista, boleto, a prazo) e as parcelas. As parcelas viram contas a pagar.',
      marcar: [{ alvo: { papel: 'button', nome: '2. Pagamento' } }],
    },
    {
      titulo: 'Confira os preços de venda',
      texto: 'Em "3. Custos", veja o novo custo de cada produto. Você pode aplicar uma margem para todos ou manter os preços atuais.',
      marcar: [{ alvo: { papel: 'button', nome: '3. Custos' } }],
    },
    {
      titulo: 'Clique em "Gerar entrada"',
      texto: 'Tudo certo? Clique em "Gerar entrada" (F1). O estoque sobe na hora. Se ainda não terminou, use "Salvar em aberto" (F2) e continue depois.',
      marcar: [
        { alvo: { papel: 'button', nome: /Salvar em aberto/ }, legenda: 'Continuar depois' },
        { alvo: { papel: 'button', nome: /Gerar entrada/ }, legenda: 'Concluir' },
      ],
      dica: 'Depois de gerar, use "Imprimir etiquetas" para etiquetar os produtos que chegaram.',
    },
  ],
};
