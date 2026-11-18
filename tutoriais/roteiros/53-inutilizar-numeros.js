module.exports = {
  id: 'inutilizar-numeros',
  ordem: 53,
  grupo: 'Fiscal',
  titulo: 'Inutilizar números de nota',
  resumo: 'Avise a SEFAZ que um número de NF-e ou NFC-e com erro (ou pulado) não será usado.',
  antesDeComecar: 'Só o administrador da empresa pode inutilizar. Na dúvida, fale com o contador.',
  passos: [
    {
      ir: '/fiscal/inutilizar-numeros',
      titulo: 'Escreva o motivo',
      texto: 'Em Fiscal › Inutilizar números, escreva o motivo com pelo menos 15 letras (ex.: "Nota rejeitada por erro de cadastro").',
      marcar: [{ alvo: { rotulo: 'Motivo' } }],
    },
    {
      titulo: 'Escolha as notas e inutilize',
      texto: 'Em "Notas e cupons com erro", marque as notas e clique em "Inutilizar selecionados". Para um número que não está na lista, use "Inutilizar outro número" com a série e o número.',
      marcar: [{ alvo: { papel: 'heading', nome: 'Inutilizar outro número' } }],
      atencao: 'Número inutilizado não pode mais ser usado. Confira antes de confirmar.',
    },
  ],
};
