module.exports = {
  id: 'condicional',
  ordem: 34,
  grupo: 'Comercial',
  titulo: 'Condicional (cliente leva para provar)',
  resumo: 'O cliente leva os produtos para casa; depois você dá baixa no que voltou e vende o resto.',
  passos: [
    {
      ir: '/comercial/condicional',
      titulo: 'Clique em "Nova condicional"',
      texto: 'No menu, clique em Comercial › Condicional e depois em "Nova condicional".',
      marcar: [{ alvo: { papel: 'button', nome: 'Nova condicional' } }],
      depois: [{ tipo: 'clicar', alvo: { papel: 'button', nome: 'Nova condicional' }, espera: 1500 }],
    },
    {
      titulo: 'Cliente e validade',
      texto: 'Digite o nome do cliente e escolha até quando ele pode ficar com os produtos (Validade).',
      marcar: [{ alvo: { placeholder: /Opcional — digite o nome/, dentro: 'dialog' } }],
    },
    {
      titulo: 'Bipe os produtos',
      texto: 'Passe o leitor no código de barras de cada peça (ou digite e aperte Enter).',
      marcar: [{ alvo: { placeholder: 'Bipe o código de barras ou digite e tecle Enter', dentro: 'dialog' } }],
    },
    {
      titulo: 'Clique em "Salvar condicional"',
      texto: 'Clique em "Salvar condicional". Os produtos saem do estoque e você pode imprimir (80mm ou A4) para o cliente assinar.',
      marcar: [{ alvo: { papel: 'button', nome: 'Salvar condicional', dentro: 'dialog' } }],
    },
    {
      ir: '/comercial/condicional',
      titulo: 'Cliente voltou? Abra a condicional',
      texto: 'Clique na condicional na lista. Use "Devolver itens" para bipar o que voltou e depois "Transformar em venda (ir ao PDV)" para cobrar o que ele ficou.',
      marcar: [{ alvo: { placeholder: 'Cliente, vendedor ou número' } }],
      dica: 'Os filtros "Para a rua" e "Expirado" mostram quem está com produtos e quem passou do prazo.',
    },
  ],
};
