// Lista "A comprar" feita DE VERDADE na Demonstração (pedido do dono, 27/11/2026), o ciclo inteiro:
// 1) lança um produto do cadastro (FONE, urgente, com observação); 2) lança um item novo sem cadastro (Película);
// 3) edita a Película no lápis; 4) marca "Comprei" com a Distribuidora Exemplo, quantidade e preços;
// 5) na aba Comprados, "Chegaram" → "Chegou tudo" → "Só marcar que chegou" (não mexe no estoque nem no financeiro);
// 6) mostra na aba Chegou. A entrada de verdade pela lista fica no vídeo "A comprar: chegou e dar entrada" (38b).
// Troque o ITEM a cada gravação se quiser um nome diferente (itens iguais "Falta comprar" se somam).
const FONE = 'FONE DE OUVIDO SEM FIO TWS M25';
const ITEM = 'Película 3D Galaxy A15';
const produto = { placeholder: 'Produto (busque no cadastro ou escreva um novo)' };
module.exports = {
  id: 'lista-a-comprar',
  ordem: 65,
  grupo: 'Estoque',
  titulo: 'Lista "A comprar"',
  gravaDados: true,
  valoresReais: true,
  manter: [FONE, ITEM, 'Distribuidora Exemplo', 'Cliente esperando', 'Pedir a transparente', 'Marcado na lista', 'Ana Gestora'],
  assunto: { chave: ['a comprar', 'lista de compras', 'lista a comprar', 'falta comprar', 'comprei', 'pedido de compra'], acoes: ['lançar', 'anotar', 'marcar', 'usar', 'fazer', 'como'], rotas: ['/estoque/a-comprar'] },
  resumo: 'A equipe anota o que está faltando; quem compra marca o que comprou e, quando chega, marca que chegou ou dá entrada.',
  fala: 'Oi! Aqui é o Thiago, da Thiago Informática. Neste vídeo eu vou usar a lista A comprar de verdade: anotar o que está faltando, marcar que comprei e marcar que chegou. Bora lá!',
  passos: [
    {
      ir: '/estoque/a-comprar',
      espera: 6000,
      titulo: 'Abra A comprar',
      texto: 'No menu, clica em Estoque, A comprar. Aqui a equipe anota o que está faltando, e quem compra vai marcando o que comprou e o que chegou.',
      marcar: [{ alvo: produto, legenda: 'Lançar o que falta' }],
    },
    {
      antes: [
        { tipo: 'preencher', alvo: produto, valor: 'FONE DE OUVIDO', espera: 1500 },
        { tipo: 'clicar', alvo: { papel: 'button', nome: new RegExp('^' + FONE) }, seguro: true, espera: 900 },
        { tipo: 'preencher', alvo: { css: 'input[aria-label="Quantidade"]' }, valor: '5', espera: 500 },
        { tipo: 'preencher', alvo: { placeholder: 'Observação (ex.: cliente esperando)' }, valor: 'Cliente esperando', espera: 500 },
        { tipo: 'clicar', alvo: { papel: 'button', nome: 'Urgente', exato: true }, seguro: true, espera: 800 },
      ],
      titulo: 'Produto do cadastro',
      texto: 'Digita o produto e escolhe na lista: aparece até o estoque dele. Coloca a quantidade, uma observação e, se for urgente, clica em Urgente. Depois, Lançar.',
      marcar: [
        { alvo: { papel: 'button', nome: 'Urgente', exato: true }, legenda: 'Urgente' },
        { alvo: { papel: 'button', nome: 'Lançar', exato: true }, legenda: 'Lançar' },
      ],
      depois: [{ tipo: 'clicar', alvo: { papel: 'button', nome: 'Lançar', exato: true }, espera: 2000 }],
    },
    {
      antes: [
        { tipo: 'preencher', alvo: produto, valor: ITEM, espera: 1200 },
        { tipo: 'preencher', alvo: { css: 'input[aria-label="Quantidade"]' }, valor: '10', espera: 600 },
        { tipo: 'clicar', alvo: { papel: 'button', nome: 'Lançar', exato: true }, espera: 2000 },
      ],
      titulo: 'Item novo, sem cadastro',
      texto: 'Não tem no cadastro? Escreve o nome mesmo assim e clica em Lançar. Ele entra na lista como item novo, e dá pra cadastrar depois, em Cadastrar agora.',
      marcar: [
        { alvo: { css: `b[title="${ITEM}"]` }, legenda: 'Item novo' },
        { alvo: { texto: '＋ Cadastrar agora' }, legenda: 'Cadastrar depois' },
      ],
    },
    {
      antes: [
        { tipo: 'clicar', alvo: { css: `[aria-label="Editar ${ITEM}"]` }, seguro: true, espera: 1200 },
        { tipo: 'preencher', alvo: { css: 'label:has-text("Quantidade") input', dentro: 'dialog' }, valor: '12', espera: 500 },
        { tipo: 'preencher', alvo: { placeholder: 'Ex.: cliente esperando', dentro: 'dialog' }, valor: 'Pedir a transparente', espera: 800 },
      ],
      titulo: 'Errou? Clique no lápis',
      texto: 'Pra corrigir, clica no lápis, Editar, na linha do item. Muda o que precisa, aqui a quantidade pra doze e uma observação, e clica em Salvar.',
      marcar: [{ alvo: { papel: 'button', nome: 'Salvar', exato: true, dentro: 'dialog' }, legenda: 'Salvar' }],
      depois: [{ tipo: 'clicar', alvo: { papel: 'button', nome: 'Salvar', exato: true, dentro: 'dialog' }, aguardarFechar: true, espera: 1500 }],
    },
    {
      antes: [{ tipo: 'clicar', alvo: { css: `[aria-label="Marcar ${ITEM}"]` }, seguro: true, espera: 900 }],
      titulo: 'Comprou? Marque Comprei',
      texto: 'Comprou? Clica em Comprei na linha do item. Ou marca vários itens na caixinha e clica em Comprei estes, tudo de uma vez.',
      marcar: [{ alvo: { papel: 'button', nome: /Comprei estes/ }, legenda: 'Comprei estes' }],
      depois: [{ tipo: 'clicar', alvo: { papel: 'button', nome: /Comprei estes/ }, seguro: true, espera: 1500 }],
    },
    {
      antes: [
        { tipo: 'escolher', alvo: { css: 'label:has-text("Fornecedor") select', dentro: 'dialog' }, valor: 'Distribuidora Exemplo', espera: 600 },
        { tipo: 'preencher', alvo: { css: 'label:has-text("Quantidade comprada") input', dentro: 'dialog' }, valor: '12', espera: 400 },
        { tipo: 'preencher', alvo: { css: 'label:has-text("Preço de custo (un.)") input', dentro: 'dialog' }, valor: '4.50', espera: 400 },
        { tipo: 'preencher', alvo: { css: 'label:has-text("Preço de venda (un.)") input', dentro: 'dialog' }, valor: '15', espera: 900 },
      ],
      titulo: 'Fornecedor, quantidade e preços',
      texto: 'Escolhe o fornecedor, confere a quantidade comprada, o preço de custo e o de venda. A margem aparece sozinha. Clica em Confirmar compra.',
      marcar: [
        { alvo: { css: 'label:has-text("Fornecedor") select', dentro: 'dialog' }, legenda: 'Fornecedor' },
        { alvo: { papel: 'button', nome: /Confirmar compra/, dentro: 'dialog' }, legenda: 'Confirmar compra' },
      ],
      depois: [{ tipo: 'clicar', alvo: { papel: 'button', nome: /Confirmar compra/, dentro: 'dialog' }, aguardarFechar: true, espera: 2000 }],
      dica: 'Isto é só o controle da compra: o estoque e o preço do cadastro mudam pela entrada de nota ou pela entrada manual.',
    },
    {
      antes: [
        { tipo: 'clicar', alvo: { papel: 'button', nome: /Comprados/ }, seguro: true, espera: 2000 },
        { tipo: 'clicar', alvo: { css: `[aria-label="Marcar ${ITEM}"]` }, seguro: true, espera: 900 },
      ],
      titulo: 'Chegou? Aba Comprados',
      texto: 'Na aba Comprados fica o que está esperando chegar. Chegou? Marca o item e clica em Chegaram, dar entrada.',
      marcar: [{ alvo: { papel: 'button', nome: /Chegaram · dar entrada/ }, legenda: 'Chegaram' }],
      depois: [{ tipo: 'clicar', alvo: { papel: 'button', nome: /Chegaram · dar entrada/ }, seguro: true, espera: 1800 }],
    },
    {
      antes: [{ tipo: 'clicar', alvo: { papel: 'button', nome: /Chegou tudo/, dentro: 'dialog' }, seguro: true, espera: 900 }],
      titulo: 'Chegou tudo e como dar entrada',
      texto: 'Clica em Chegou tudo, ou muda a quantidade se veio menos. Aí escolhe: dar entrada sem nota, tenho a nota fiscal, ou só marcar que chegou. Como a película ainda não tem cadastro, é Só marcar que chegou.',
      marcar: [
        { alvo: { papel: 'button', nome: /Dar entrada sem nota/, dentro: 'dialog' }, legenda: 'Sem nota' },
        { alvo: { papel: 'button', nome: /Tenho a nota fiscal/, dentro: 'dialog' }, legenda: 'Com a nota' },
        { alvo: { papel: 'button', nome: /Só marcar que chegou/, dentro: 'dialog' }, legenda: 'Só marcar' },
      ],
      depois: [{ tipo: 'clicar', alvo: { papel: 'button', nome: /Só marcar que chegou/, dentro: 'dialog' }, aguardarFechar: true, espera: 2000 }],
    },
    {
      antes: [{ tipo: 'clicar', alvo: { papel: 'button', nome: /Chegaram no mês/ }, seguro: true, espera: 2500 }],
      titulo: 'Aba Chegou',
      texto: 'Pronto! Na aba Chegou está a película, com a etiqueta de como chegou. E o fone urgente continua em Falta comprar, esperando alguém comprar.',
      marcar: [
        { alvo: { css: `b[title="${ITEM}"]` }, legenda: 'Chegou' },
        { alvo: { css: '[aria-label="Como chegou"]' }, legenda: 'Filtrar por origem' },
      ],
      dica: 'Quando você lança a nota (XML) ou a entrada manual do produto, ele passa para "Chegou" sozinho.',
    },
  ],
};
