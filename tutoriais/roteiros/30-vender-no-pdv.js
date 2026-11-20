module.exports = {
  id: 'vender-no-pdv',
  ordem: 30,
  grupo: 'Comercial',
  titulo: 'Fazer uma venda no PDV (caixa)',
  resumo: 'Abra o caixa, lance os produtos e receba o pagamento.',
  fala: 'Oi! Aqui é o Thiago, da Thiago Informática. Neste vídeo eu vou te mostrar como fazer uma venda no caixa, do começo ao fim: abrir o caixa, lançar os produtos e receber o pagamento.', // abertura do vídeo, no jeito de falar do Thiago
  antesDeComecar: 'Ter pelo menos um produto cadastrado. O PDV abre numa aba nova do navegador.',
  passos: [
    {
      ir: '/pdv',
      espera: 4000,
      titulo: 'Abra o PDV',
      texto: 'No menu, clique em Comercial › PDV. Ele abre numa aba nova, com os atalhos do caixa.',
      marcar: [{ alvo: { papel: 'button', nome: /Nova venda/ } }],
    },
    {
      titulo: 'Abra o caixa (início do dia)',
      texto: 'No começo do dia, clique em "Abrir caixa", digite o valor do troco que tem na gaveta e confirme em "Abrir caixa". Com o caixa aberto, esse mesmo botão vira "Fechar caixa".',
      marcar: [{ alvo: { papel: 'button', nome: /(Abrir|Fechar) caixa/ } }],
      dica: 'Atalho: Ctrl+6. Se o caixa já estiver aberto, pule este passo.',
    },
    {
      titulo: 'Clique em "Nova venda"',
      texto: 'Clique em "Nova venda" (ou aperte Enter).',
      marcar: [{ alvo: { papel: 'button', nome: /Nova venda/ } }],
      depois: [{ tipo: 'clicar', alvo: { papel: 'button', nome: /Nova venda/ }, espera: 2000 }],
    },
    {
      titulo: 'Lance os produtos',
      texto: 'Passe o leitor de código de barras ou digite o nome/código do produto e aperte Enter. Repita para cada produto.',
      marcar: [{ alvo: { placeholder: 'Código ou produto' } }],
      dica: 'Para lançar várias unidades, digite a quantidade e um asterisco antes: 3*123 lança 3 unidades do produto 123.',
    },
    {
      titulo: 'Clique em "Finalizar venda" (F9)',
      texto: 'Com todos os produtos lançados, clique em "Finalizar venda" ou aperte F9.',
      marcar: [{ alvo: { papel: 'button', nome: /Finalizar venda/ } }],
    },
    {
      titulo: 'Escolha a forma de pagamento e confirme',
      texto: 'Na janela "Formas de pagamento", clique na forma (Dinheiro, Pix, Cartão...), digite quanto recebeu e aperte Enter. Quando "Falta pagar" zerar, aperte Enter de novo para concluir. O troco aparece na tela.',
      atencao: 'Se errar um pagamento, aperte Delete para desfazer antes de confirmar.',
      dica: 'Atalhos do caixa: F1 Recebimentos · F2 Orçamentos · F3 Produtos · F4 Vendas · F6 Desconto · F7 Em espera · F8 Devolução · F10 Cliente.',
    },
  ],
};
