module.exports = {
  id: 'emitir-nota',
  ordem: 50,
  grupo: 'Fiscal',
  titulo: 'Emitir nota fiscal de uma venda',
  resumo: 'Transforme uma venda em NF-e ou NFC-e (cupom fiscal).',
  antesDeComecar: 'A empresa precisa ter o fiscal configurado (certificado digital) e o produto com NCM preenchido.',
  passos: [
    {
      ir: '/fiscal/nao-gerados',
      titulo: 'Veja as vendas sem nota',
      texto: 'No menu, clique em Fiscal › Notas a emitir. Aparecem as vendas que ainda não viraram nota fiscal. Use "Hoje", "Este mês" ou "Todo o período" para escolher as datas.',
      marcar: [
        { alvo: { papel: 'heading', nome: 'Notas a emitir' }, legenda: 'Vendas sem nota' },
        { alvo: { papel: 'button', nome: 'Este mês', exato: true }, legenda: 'Período' },
      ],
    },
    {
      ir: '/vendas',
      titulo: 'Abra a venda em Vendas',
      texto: 'Para emitir, vá em Comercial › Vendas e encontre a venda (digite o nome do cliente para achar mais rápido).',
      marcar: [{ alvo: { placeholder: 'Digite o nome do cliente' } }],
    },
    {
      titulo: 'Clique em "NF-e" ou "NFC-e"',
      texto: 'Na linha da venda, clique em "NF-e" (nota para empresa ou entrega) ou "NFC-e" (cupom fiscal para consumidor).',
      marcar: [{ alvo: { titulo: 'Conferir e emitir NF-e' } }],
      depois: [{ tipo: 'clicar', alvo: { titulo: 'Conferir e emitir NF-e' }, espera: 1500 }],
      dica: 'Na dúvida entre NF-e e NFC-e, pergunte ao seu contador qual usar.',
    },
    {
      titulo: 'Confira e clique em "Continuar emissão"',
      texto: 'Confira os dados do cliente e dos produtos na janela e clique em "Continuar emissão". Em alguns segundos a nota é autorizada.',
      marcar: [{ alvo: { papel: 'button', nome: 'Continuar emissão', dentro: 'dialog' } }],
      atencao: 'Nota emitida vale para a Receita. Confira o cliente e os valores antes de continuar.',
    },
    {
      ir: '/fiscal/gerados',
      titulo: 'Veja as notas emitidas',
      texto: 'As notas autorizadas ficam em Fiscal › Notas emitidas. Lá você imprime, baixa o XML ou envia para o cliente pelo botão "Ações".',
      marcar: [{ alvo: { papel: 'heading', nome: 'Notas emitidas' } }],
      dica: 'Se a nota voltar com erro, ela vai para Fiscal › Corrigir pendências. Veja o tutorial "Corrigir nota com erro".',
    },
  ],
};
