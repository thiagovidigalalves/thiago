module.exports = {
  id: 'etiquetas',
  ordem: 63,
  grupo: 'Estoque',
  titulo: 'Imprimir etiquetas de preço',
  resumo: 'Escolha o modelo, marque os produtos e imprima.',
  passos: [
    {
      ir: '/estoque/etiquetas',
      titulo: 'Escolha o tipo de etiqueta',
      texto: 'No menu, clique em Estoque › Etiquetas. Escolha: etiqueta de código (código de barras), de produto ou de gôndola (prateleira).',
      marcar: [{ alvo: { papel: 'button', nome: /Etiquetas de produto/ } }],
      depois: [{ tipo: 'clicar', alvo: { papel: 'button', nome: /Etiquetas de produto/ }, espera: 1500 }],
    },
    {
      titulo: 'Escolha o modelo',
      texto: 'Clique no modelo do papel de etiqueta que você usa (o tamanho aparece em milímetros).',
      marcar: [{ alvo: { papel: 'button', nome: /mm/ } }],
      depois: [{ tipo: 'clicar', alvo: { papel: 'button', nome: /mm/ }, espera: 1500 }],
    },
    {
      titulo: 'Busque os produtos',
      texto: 'Digite o nome ou código, ou passe o leitor no código de barras. Para etiquetar o que mudou de preço, use o filtro "Preço alterado por data".',
      marcar: [{ alvo: { placeholder: 'Digite nome, código ou bipe a etiqueta...' } }],
    },
    {
      titulo: 'Marque e diga quantas etiquetas',
      texto: 'Marque cada produto e digite quantas etiquetas quer dele. Depois clique em "Conferir etiquetas".',
      marcar: [{ alvo: { papel: 'button', nome: 'Conferir etiquetas' } }],
    },
    {
      titulo: 'Imprima',
      texto: 'Confira a prévia. Na primeira vez, use "Imprimir uma de teste" para ver se ficou alinhado. Depois clique em "Imprimir etiquetas".',
      dica: 'Já usou parte da folha? Marque "Pular posições já usadas na primeira folha" para não desperdiçar etiqueta.',
    },
  ],
};
