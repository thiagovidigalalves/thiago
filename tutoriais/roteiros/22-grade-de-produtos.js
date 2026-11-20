// Grade de produtos (cor × numeração), para lojas de roupa e calçado.
// Na empresa de demonstração existe o exemplo "Tênis Esportivo Run" (Preto, Branco e Azul, 37 a 42),
// cadastrado a pedido do dono só para os prints e o vídeo. O robô nunca clica em Cadastrar/Gerar/Salvar.
module.exports = {
  id: 'grade-de-produtos',
  ordem: 22,
  grupo: 'Cadastros',
  titulo: 'Grade de produtos (cor e numeração)',
  assunto: {"chave": ["grade", "grades", "numeração", "numeracao", "tamanho", "tamanhos", "cor", "cores"], "acoes": ["funciona", "cadastrar", "criar", "montar", "usar", "fazer", "consultar", "ver", "grade", "colocar", "como"], "rotas": ["/cadastros/grades", "/estoque/consulta-grade"]}, // como o Thiaguinho acha o vídeo pela pergunta
  resumo: 'Venda roupas e calçados por cor e número: cada combinação tem estoque e código de barras próprios.',
  fala: 'Oi! Aqui é o Thiago, da Thiago Informática. Neste vídeo eu vou te mostrar, tim-tim por tim-tim, como funciona a grade de produtos: cor e numeração, pra quem vende roupa e calçado. Cada cor e cada número vira um item com estoque e código de barras próprios. Bora lá!',
  antesDeComecar: 'A grade precisa estar liberada para a sua empresa. Se não aparecer "Grades" no menu, fale com o suporte da Thiago Informática.',
  passos: [
    {
      ir: '/cadastros/grades',
      titulo: 'Abra Cadastros › Produtos › Grades',
      texto: 'No menu, clique em Cadastros › Produtos › Grades. Aqui ficam as cores e as numerações que você vai usar nos produtos.',
      marcar: [{ alvo: { papel: 'heading', nome: 'Grades', exato: true } }],
    },
    {
      titulo: 'As cores',
      texto: 'As cores mais usadas já vêm prontas: preto, branco, nude, jeans e muitas outras. Faltou uma cor da sua marca? Digite o nome, escolha a cor na paleta e clique no botão de mais Cor.',
      marcar: [
        { alvo: { texto: 'Cores', exato: true }, legenda: 'Cores prontas' },
        { alvo: { placeholder: 'Nova cor (ex.: MT Champanhe)' }, legenda: 'Cor nova' },
      ],
    },
    {
      titulo: 'As numerações',
      texto: 'As numerações também já vêm prontas: calçado adulto de 33 a 44, calçado infantil, roupa de PP a XGG, jeans e tamanho único. Se precisar, crie a sua, por exemplo Feminino 34 a 40, e clique em Salvar.',
      marcar: [
        { alvo: { texto: 'Grades de numeração', exato: true }, legenda: 'Numerações prontas' },
        { alvo: { placeholder: 'Tamanhos: 34, 35, 36…' }, legenda: 'Criar a sua' },
      ],
    },
    {
      ir: '/cadastros/produtos',
      antes: [
        { tipo: 'clicar', alvo: { papel: 'button', nome: 'Novo produto' }, espera: 1800 },
        { tipo: 'clicar', alvo: { campo: 'Tipo do produto', dentro: 'dialog' }, espera: 700 },
        { tipo: 'clicar', alvo: { papel: 'option', nome: 'Com Grade' }, espera: 900 },
      ],
      titulo: 'Novo produto do tipo "Com Grade"',
      texto: 'Agora em Produtos, clique em Novo produto e, em Tipo do produto, escolha Com Grade. Repara que o estoque não fica mais no produto: ele fica em cada cor e numeração.',
      marcar: [
        { alvo: { campo: 'Tipo do produto', dentro: 'dialog' }, legenda: 'Com Grade' },
        { alvo: { texto: 'Fica em cada cor e numeração' }, legenda: 'Estoque por cor e número' },
      ],
    },
    {
      antes: [{ tipo: 'preencher', alvo: { campo: 'Nome do produto', dentro: 'dialog' }, valor: 'Tênis Esportivo Run' }],
      titulo: 'Nome da referência e "Cadastrar"',
      texto: 'Preencha o nome da referência, como Tênis Esportivo Run, o preço de venda e clique em Cadastrar. Na hora, o sistema já abre a montagem da grade.',
      marcar: [
        { alvo: { campo: 'Nome do produto', dentro: 'dialog' }, legenda: 'Referência' },
        { alvo: { papel: 'button', nome: 'Cadastrar', exato: true, dentro: 'dialog' }, legenda: 'Abre a grade' },
      ],
      depois: [{ tipo: 'tecla', tecla: 'Escape', espera: 900 }],
    },
    {
      ir: '/cadastros/produtos',
      antes: [
        { tipo: 'preencher', alvo: { placeholder: 'Nome, barras, cód. interno ou fornecedor' }, valor: 'Tênis Esportivo Run', espera: 2500 },
        { tipo: 'clicar', alvo: { titulo: 'Editar produto' }, espera: 2000 },
      ],
      titulo: 'Montar ou aumentar a grade',
      texto: 'Pra montar ou aumentar a grade de um produto que já existe, abra o produto e clique em Cores e numerações da grade.',
      marcar: [{ alvo: { papel: 'button', nome: /Cores e numera/, dentro: 'dialog' } }],
      depois: [{ tipo: 'clicar', alvo: { papel: 'button', nome: /Cores e numera/, dentro: 'dialog' }, espera: 2500 }],
    },
    {
      antes: [{ tipo: 'clicar', alvo: { papel: 'button', nome: '43', exato: true, dentro: 'dialog' }, espera: 700 }],
      titulo: '1. Numeração',
      texto: 'Primeiro a numeração: escolha a grade e marque os números que você vende. Eu marquei o 43. Os números que já têm estoque ficam travados, pra você não apagar nada sem querer.',
      marcar: [
        { alvo: { css: 'select[aria-label="Grade"]', dentro: 'dialog' }, legenda: 'Tipo de grade' },
        { alvo: { papel: 'button', nome: '43', exato: true, dentro: 'dialog' }, legenda: 'Número novo' },
      ],
    },
    {
      antes: [{ tipo: 'clicar', alvo: { papel: 'button', nome: /^Vermelho/, dentro: 'dialog' }, espera: 900 }],
      titulo: '2. Cores',
      texto: 'Depois as cores: é só clicar nas que você tem. Eu acrescentei o Vermelho.',
      marcar: [{ alvo: { papel: 'button', nome: /^Vermelho/, dentro: 'dialog' }, legenda: 'Cor nova' }],
    },
    {
      antes: [{ tipo: 'preencher', alvo: { css: 'input[aria-label="Quantidade Vermelho 40"]', dentro: 'dialog' }, valor: '4' }],
      titulo: '3. Estoque de cada cor e número',
      texto: 'Na tabela, digite quantas peças você tem de cada cor e número. O que já existe aparece em verde, com o saldo. Se o fornecedor manda código de barras, marque a opção e digite; se não, o sistema cria um código pra cada peça.',
      marcar: [
        { alvo: { css: 'input[aria-label="Quantidade Vermelho 40"]', dentro: 'dialog' }, legenda: 'Quantidade' },
        { alvo: { texto: 'Digitar códigos de barras do fornecedor' }, legenda: 'Código do fornecedor' },
      ],
    },
    {
      titulo: 'Clique em "Gerar"',
      texto: 'Agora é só clicar em Gerar: cada cor e número vira um item, com estoque e código de barras próprios. No caixa é só passar o código, e o estoque baixa da peça certinha.',
      marcar: [{ alvo: { papel: 'button', nome: /^Gerar \d+/, dentro: 'dialog' } }],
      depois: [{ tipo: 'tecla', tecla: 'Escape', espera: 900 }],
    },
    {
      ir: '/estoque/consulta-grade',
      antes: [
        { tipo: 'clicar', alvo: { placeholder: 'Nome, referência ou código de barras' }, espera: 1500 },
        { tipo: 'preencher', alvo: { placeholder: 'Nome, referência ou código de barras' }, valor: 'Tênis', espera: 1500 },
        { tipo: 'clicar', alvo: { papel: 'button', nome: /Tênis Esportivo Run/ }, espera: 3000 },
      ],
      titulo: 'Estoque › Consulta de Grade',
      texto: 'E pra ver tudo de uma vez, vá em Estoque, depois em Consulta de Grade, e busque a referência. Aparece a tabela de cor por número com o saldo de cada um, o total por cor e o total por numeração.',
      marcar: [{ alvo: { texto: /Grade — cor × numeração/ }, legenda: 'Cor × numeração' }],
    },
    {
      titulo: 'Última peça e reposição',
      texto: 'Olha que inteligente: a última peça aparece em amarelo, e embaixo vem a reposição sugerida, com o que está zerado e o que está acabando. Assim você sabe na hora o que comprar.',
      marcar: [
        { alvo: { texto: 'última' }, legenda: 'Última peça' },
        { alvo: { texto: 'Reposição sugerida' }, legenda: 'O que repor' },
      ],
    },
    {
      titulo: 'Totais, filtros, Excel e impressão',
      texto: 'Você ainda vê as peças em estoque, o valor em estoque e quantas numerações repor. Dá pra filtrar por cor, por número, esconder a grade zerada, exportar pro Excel e imprimir.',
      marcar: [
        { alvo: { texto: 'Esconder grade zerada' }, legenda: 'Filtro' },
        { alvo: { papel: 'button', nome: 'Exportar Excel' }, legenda: 'Excel' },
        { alvo: { papel: 'button', nome: 'Imprimir', exato: true }, legenda: 'Imprimir' },
      ],
      dica: 'Na lista de Produtos, o ícone de grade na linha do produto também abre essa consulta.',
    },
  ],
};
