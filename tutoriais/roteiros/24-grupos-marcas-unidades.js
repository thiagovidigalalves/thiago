module.exports = {
  id: 'grupos-marcas-unidades',
  ordem: 24,
  grupo: 'Cadastros',
  titulo: 'Grupos, marcas, unidades e plano de contas',
  resumo: 'Organize seus produtos e as categorias de receitas e despesas.',
  passos: [
    {
      ir: '/cadastros/grupos',
      titulo: 'Grupos e subgrupos',
      texto: 'Em Cadastros › Grupos e Subgrupos, clique em "Novo grupo" (ex.: Informática). Depois clique no nome do grupo e em "Novo subgrupo" (ex.: Mouses). Serve para filtrar produtos e ver relatórios por grupo.',
      marcar: [{ alvo: { papel: 'button', nome: 'Novo grupo', exato: true } }],
    },
    {
      ir: '/cadastros/marcas',
      titulo: 'Marcas',
      texto: 'Em Cadastros › Marcas, clique em "Nova marca", digite o nome e clique em "Salvar".',
      marcar: [{ alvo: { papel: 'button', nome: 'Nova marca' } }],
      dica: 'Também dá para criar a marca na hora, dentro do cadastro do produto: comece a digitar e clique em "+ Cadastrar".',
    },
    {
      ir: '/cadastros/unidades',
      titulo: 'Unidades de medida',
      texto: 'Em Cadastros › Unidades, clique em "Nova unidade" e informe o nome e a sigla (ex.: Caixa, CX).',
      marcar: [{ alvo: { papel: 'button', nome: 'Nova unidade' } }],
    },
    {
      ir: '/cadastros/plano-de-contas',
      titulo: 'Plano de contas',
      texto: 'O plano de contas já vem pronto, com as categorias de receitas e despesas que alimentam o DRE. Para criar uma nova, clique em "Nova conta", dê o nome, o tipo e escolha a categoria pai.',
      marcar: [{ alvo: { papel: 'button', nome: 'Nova conta', exato: true } }],
      dica: 'Use nomes simples, como "Energia", "Aluguel", "Internet". Assim o DRE fica fácil de ler.',
    },
  ],
};
