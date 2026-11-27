// Perdas e Uso/Consumo feitos DE VERDADE na Demonstração (pedido do dono, 27/11/2026): os dois tipos de baixa,
// com motivo fictício, conferidos e confirmados. 1) Perda: 1 FONE que caiu e quebrou. 2) Uso e consumo: 2 Emendas
// RJ45 usadas na rede da própria loja. O "Excluir" (estorno) é só mostrado.
const FONE = 'FONE DE OUVIDO SEM FIO TWS M25';
const EMENDA = 'Emenda Rj45 8x8 Cat5 Cat6 1 Gbps Emenda Cabo De Rede 1 Uni';
const MOTIVO_PERDA = 'Caiu no chão e quebrou';
const MOTIVO_USO = 'Usada na instalação da rede da loja';
const tipo = { css: 'label:has-text("Tipo") select', dentro: 'dialog' };
const motivo = { placeholder: 'Ex.: produto danificado ou material utilizado na loja', dentro: 'dialog' };
const busca = { placeholder: 'Buscar por nome, código ou código de barras', dentro: 'dialog' };
module.exports = {
  id: 'perdas-e-consumo',
  ordem: 64,
  grupo: 'Estoque',
  titulo: 'Perdas e uso/consumo (baixa de estoque)',
  gravaDados: true,
  valoresReais: true,
  manter: [FONE, EMENDA, MOTIVO_PERDA, MOTIVO_USO],
  assunto: { chave: ['perda', 'perdas', 'quebrou', 'quebrado', 'vencido', 'uso e consumo', 'consumo', 'baixa de estoque', 'dar baixa'], acoes: ['lançar', 'dar', 'fazer', 'baixar', 'tirar', 'como'], rotas: ['/estoque/perdas-consumo'] },
  resumo: 'Dê baixa em produto quebrado, vencido ou sumido (perda) e no que foi usado na própria loja (uso e consumo).',
  fala: 'Oi! Aqui é o Thiago, da Thiago Informática. Neste vídeo eu vou dar baixa no estoque de verdade: uma perda, de produto que quebrou, e um uso e consumo, do que a loja usou. Bora lá!',
  passos: [
    {
      ir: '/estoque/perdas-consumo',
      espera: 6000,
      titulo: 'Abra Perdas e Uso/Consumo',
      texto: 'No menu, clica em Estoque, Perdas e Uso/Consumo. Aqui ficam todas as baixas, com o motivo, quem fez e o custo. Pra lançar uma, é em Nova movimentação.',
      marcar: [{ alvo: { papel: 'button', nome: 'Nova movimentação' }, legenda: 'Nova movimentação' }],
    },
    {
      antes: [
        { tipo: 'clicar', alvo: { papel: 'button', nome: 'Nova movimentação' }, seguro: true, espera: 1500 },
        { tipo: 'escolher', alvo: tipo, valor: 'Perda', espera: 600 },
        { tipo: 'preencher', alvo: motivo, valor: MOTIVO_PERDA, espera: 900 },
      ],
      titulo: 'Perda: tipo e motivo',
      texto: 'Em Tipo, escolhe Perda: quando quebrou, venceu ou sumiu. Escreve o motivo, aqui o fone caiu no chão e quebrou. A data já vem com hoje.',
      marcar: [
        { alvo: tipo, legenda: 'Perda' },
        { alvo: motivo, legenda: 'Motivo' },
      ],
    },
    {
      antes: [
        { tipo: 'preencher', alvo: busca, valor: 'FONE DE OUVIDO', espera: 1500 },
        { tipo: 'clicar', alvo: { papel: 'button', nome: new RegExp(FONE), dentro: 'dialog' }, seguro: true, espera: 1000 },
        { tipo: 'preencher', alvo: { css: `input[aria-label="Quantidade de ${FONE}"]`, dentro: 'dialog' }, valor: '1', espera: 900 },
      ],
      titulo: 'Produto e quantidade',
      texto: 'Busca o produto pelo nome ou pelo código, clica nele e coloca a quantidade. Aparece quanto tem disponível e o custo da baixa.',
      marcar: [
        { alvo: busca, legenda: 'Buscar produto' },
        { alvo: { css: `input[aria-label="Quantidade de ${FONE}"]`, dentro: 'dialog' }, legenda: 'Quantidade' },
      ],
    },
    {
      antes: [{ tipo: 'clicar', alvo: { papel: 'button', nome: 'Conferir movimentação', dentro: 'dialog' }, seguro: true, espera: 2500 }],
      titulo: 'Confira e confirme',
      texto: 'Clica em Conferir movimentação: aparece o resumo, com o custo de cada item. Tá certo? Clica em Confirmar baixa pelo custo.',
      marcar: [{ alvo: { papel: 'button', nome: /Confirmar baixa pelo custo/, dentro: 'dialog' }, legenda: 'Confirmar' }],
      depois: [{ tipo: 'clicar', alvo: { papel: 'button', nome: /Confirmar baixa pelo custo/, dentro: 'dialog' }, aguardarFechar: true, espera: 2500 }],
    },
    {
      titulo: 'A perda já está na lista',
      texto: 'Pronto! A perda aparece na lista, confirmada. O estoque baixou e o custo entra no relatório.',
      marcar: [{ alvo: { texto: MOTIVO_PERDA, exato: true }, legenda: 'Perda lançada' }],
    },
    {
      antes: [
        { tipo: 'clicar', alvo: { papel: 'button', nome: 'Nova movimentação' }, seguro: true, espera: 1500 },
        { tipo: 'escolher', alvo: tipo, valor: 'Uso e consumo', espera: 600 },
        { tipo: 'preencher', alvo: motivo, valor: MOTIVO_USO, espera: 900 },
      ],
      titulo: 'Uso e consumo',
      texto: 'Agora o outro tipo. Nova movimentação de novo e, em Tipo, escolhe Uso e consumo: é o que a própria loja usou. Aqui, emendas pra rede da loja.',
      marcar: [
        { alvo: tipo, legenda: 'Uso e consumo' },
        { alvo: motivo, legenda: 'Motivo' },
      ],
    },
    {
      antes: [
        { tipo: 'preencher', alvo: busca, valor: 'Emenda', espera: 1500 },
        { tipo: 'clicar', alvo: { papel: 'button', nome: /^Emenda Rj45/, dentro: 'dialog' }, seguro: true, espera: 1000 },
        { tipo: 'preencher', alvo: { css: `input[aria-label="Quantidade de ${EMENDA}"]`, dentro: 'dialog' }, valor: '2', espera: 900 },
        { tipo: 'clicar', alvo: { papel: 'button', nome: 'Conferir movimentação', dentro: 'dialog' }, seguro: true, espera: 2500 },
      ],
      titulo: 'Produto, conferir e confirmar',
      texto: 'Busca o produto, coloca a quantidade, duas, e clica em Conferir movimentação. Depois, Confirmar baixa pelo custo.',
      marcar: [{ alvo: { papel: 'button', nome: /Confirmar baixa pelo custo/, dentro: 'dialog' }, legenda: 'Confirmar' }],
      depois: [{ tipo: 'clicar', alvo: { papel: 'button', nome: /Confirmar baixa pelo custo/, dentro: 'dialog' }, aguardarFechar: true, espera: 2500 }],
    },
    {
      titulo: 'As duas baixas lançadas',
      texto: 'E as duas estão aqui: a perda e o uso e consumo, com o custo total lá em cima. Dá pra filtrar pelo tipo e pela data.',
      marcar: [
        { alvo: { texto: MOTIVO_USO, exato: true }, legenda: 'Uso e consumo' },
        { alvo: { css: 'select[aria-label="Tipo de baixa"]' }, legenda: 'Filtrar por tipo' },
      ],
    },
    {
      titulo: 'Lançou errado? Excluir',
      texto: 'Lançou errado? Clica em Excluir na linha, escreve o motivo e confirma. O produto volta pro estoque e o custo sai do relatório.',
      marcar: [{ alvo: { papel: 'button', nome: /Excluir lançamento/ }, legenda: 'Excluir (estorno)' }],
      atencao: 'O lançamento excluído continua no histórico como Estornado, com o motivo e quem fez.',
    },
  ],
};
