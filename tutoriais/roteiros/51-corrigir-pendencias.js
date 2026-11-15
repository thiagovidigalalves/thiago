module.exports = {
  id: 'corrigir-pendencias',
  ordem: 51,
  grupo: 'Fiscal',
  titulo: 'Corrigir nota com erro (rejeitada)',
  resumo: 'A nota voltou com erro? Veja o motivo, corrija e transmita de novo.',
  passos: [
    {
      ir: '/fiscal/erros',
      titulo: 'Abra "Corrigir pendências"',
      texto: 'No menu, clique em Fiscal › Corrigir pendências. Cada cartão é uma venda cuja nota não foi autorizada.',
      marcar: [{ alvo: { papel: 'heading', nome: 'Corrigir pendências' } }],
    },
    {
      titulo: 'Leia o motivo do erro',
      texto: 'Clique em "Detalhes da pendência" para ver o que a Receita (SEFAZ) recusou. Normalmente é um dado do cliente ou do produto (CPF, endereço, NCM).',
      marcar: [{ alvo: { texto: 'Detalhes da pendência' } }],
    },
    {
      titulo: 'Corrija o cadastro',
      texto: 'Clique no botão de cadastro do cartão (por exemplo "Conferir cadastro") e arrume o dado que estava errado.',
      marcar: [{ alvo: { papel: 'button', nome: /Conferir cadastro/ } }],
    },
    {
      titulo: 'Clique em "Corrigir e transmitir novamente"',
      texto: 'Depois de corrigir, clique em "Corrigir e transmitir novamente". Escolha se é cupom (NFC-e) ou nota (NF-e) e clique em "Emitir nota".',
      marcar: [{ alvo: { papel: 'button', nome: 'Corrigir e transmitir novamente' } }],
      dica: 'Use "Conferir dados sem emitir" para checar se ainda tem algum erro antes de enviar.',
    },
  ],
};
