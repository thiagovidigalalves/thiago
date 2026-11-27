// Ajuste de estoque feito DE VERDADE na Demonstração (pedido do dono, 27/11/2026): corrige o estoque do
// "FONE DE OUVIDO SEM FIO TWS M25" para 30 e salva (a pergunta do navegador é aceita: aceitarConfirmacao).
// Preço NÃO é mudado de propósito: o vídeo de Emitir nota usa a venda de R$ 80 desse fone. Custo, margem e venda
// são só mostrados.
const FONE = 'FONE DE OUVIDO SEM FIO TWS M25';
module.exports = {
  id: 'ajuste-estoque',
  ordem: 62,
  grupo: 'Estoque',
  titulo: 'Corrigir estoque e preços (ajuste)',
  gravaDados: true,
  valoresReais: true,
  aceitarConfirmacao: true, // "Salvar ajustes de 1 produto(s)?" (pergunta do navegador)
  manter: [FONE, '25153507', '30'],
  assunto: { chave: ['ajuste de estoque', 'ajustar estoque', 'corrigir estoque', 'estoque errado', 'estoque negativo', 'mudar preço', 'alterar preço'], acoes: ['ajustar', 'corrigir', 'acertar', 'mudar', 'alterar', 'como'], rotas: ['/estoque/ajuste'] },
  resumo: 'Acerte a quantidade em estoque e os preços de vários produtos de uma vez, com histórico do que era antes.',
  fala: 'Oi! Aqui é o Thiago, da Thiago Informática. Neste vídeo eu vou corrigir o estoque de um produto de verdade, no Ajuste de Estoque. Bora lá!',
  passos: [
    {
      ir: '/estoque/ajuste',
      espera: 6000,
      titulo: 'Abra o Ajuste de Estoque',
      texto: 'No menu, clica em Estoque, Ajuste de Estoque. Aqui você muda a quantidade, o custo e o preço de venda, e o valor antigo fica guardado no histórico.',
      marcar: [{ alvo: { papel: 'heading', nome: 'Ajuste de Estoque' }, legenda: 'Ajuste de Estoque' }],
    },
    {
      antes: [{ tipo: 'clicar', alvo: { papel: 'button', nome: /Estoque negativo/ }, seguro: true, espera: 1500 }],
      titulo: 'Veja o que está com problema',
      texto: 'Clica em Estoque negativo, ou em Estoque zerado, e aparecem só os produtos com problema. Pra ver tudo de novo, é em Todos.',
      marcar: [
        { alvo: { papel: 'button', nome: /Estoque negativo/ }, legenda: 'Negativo' },
        { alvo: { papel: 'button', nome: /^Estoque zerado/ }, legenda: 'Zerado' },
      ],
      depois: [{ tipo: 'clicar', alvo: { papel: 'button', nome: /^Todos/ }, seguro: true, espera: 1200 }],
    },
    {
      antes: [{ tipo: 'preencher', alvo: { placeholder: 'Buscar produto...' }, valor: FONE, espera: 2000 }],
      titulo: 'Busque o produto',
      texto: 'Digita o nome ou o código do produto. Dá pra filtrar também por grupo, subgrupo e fornecedor.',
      marcar: [
        { alvo: { placeholder: 'Buscar produto...' }, legenda: 'Buscar' },
        { alvo: { texto: FONE, exato: true }, legenda: 'Produto' },
      ],
    },
    {
      antes: [{ tipo: 'preencher', alvo: { css: `input[aria-label="Novo estoque ${FONE}"]` }, valor: '30', espera: 1000 }],
      titulo: 'Digite o novo estoque',
      texto: 'Na coluna Novo estoque, digita a quantidade certa, a que você contou na prateleira. Aqui são trinta. A linha fica azul, mostrando que mudou.',
      marcar: [
        { alvo: { css: `input[aria-label="Novo estoque ${FONE}"]` }, legenda: 'Novo estoque' },
      ],
    },
    {
      titulo: 'Custo, margem e venda',
      texto: 'Na mesma linha você muda o custo, a margem ou o preço de venda, se precisar. Mudou a margem, o preço de venda é recalculado.',
      marcar: [
        { alvo: { css: `input[aria-label="Novo custo ${FONE}"]` }, legenda: 'Custo' },
        { alvo: { css: `input[aria-label="Margem ${FONE}"]` }, legenda: 'Margem' },
        { alvo: { css: `input[aria-label="Nova venda ${FONE}"]` }, legenda: 'Venda' },
      ],
    },
    {
      titulo: 'Margem pra vários de uma vez',
      texto: 'E pra mudar o preço de vários de uma vez: filtra os produtos, digita a margem e clica em Aplicar margem aos filtrados. Errou alguma coisa? Desfazer alterações não salvas volta tudo.',
      marcar: [
        { alvo: { papel: 'button', nome: 'Aplicar margem aos filtrados' }, legenda: 'Margem em lote' },
        { alvo: { papel: 'button', nome: 'Desfazer alterações não salvas' }, legenda: 'Desfazer' },
      ],
    },
    {
      titulo: 'Clique em Salvar alterações',
      texto: 'Agora clica em Salvar alterações. O número do lado mostra quantos produtos você mudou. Ele pergunta se quer salvar: é só confirmar.',
      marcar: [{ alvo: { papel: 'button', nome: /Salvar alterações/ }, legenda: 'Salvar' }],
      depois: [{ tipo: 'clicar', alvo: { papel: 'button', nome: /Salvar alterações/ }, espera: 4000 }],
    },
    {
      antes: [{ tipo: 'esperar', alvo: { papel: 'button', nome: 'Salvar alterações (0)' }, espera: 800 }],
      titulo: 'Pronto, estoque corrigido',
      texto: 'Pronto! O estoque atual já mostra trinta. E o que era antes fica guardado no histórico de ajustes, pra você conferir depois.',
      marcar: [{ alvo: { css: `tr:has-text("${FONE}") td:nth-child(2)` }, legenda: 'Estoque atual' }],
      dica: 'Contou o estoque todo? Use o Balanço: ele ajusta tudo de uma vez no final.',
    },
  ],
};
