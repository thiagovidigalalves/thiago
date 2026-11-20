module.exports = {
  id: 'cadastrar-produto',
  ordem: 21,
  grupo: 'Cadastros',
  titulo: 'Cadastrar um produto',
  assunto: {"chave": ["produto", "produtos", "mercadoria", "item"], "acoes": ["cadastrar", "cadastro", "cadastra", "novo", "nova", "incluir", "adicionar", "criar", "colocar", "registrar"], "rotas": ["/cadastros/produtos"]}, // como o Thiaguinho acha o vídeo pela pergunta
  resumo: 'Cadastre produtos com código, preço, estoque e código de barras.',
  passos: [
    {
      ir: '/cadastros/produtos',
      titulo: 'Abra a tela de Produtos',
      texto: 'No menu, clique em Cadastros › Produtos.',
      marcar: [{ alvo: { papel: 'heading', nome: 'Produtos', exato: true } }],
    },
    {
      titulo: 'Clique em "Novo produto"',
      texto: 'Clique no botão "Novo produto".',
      marcar: [{ alvo: { papel: 'button', nome: 'Novo produto' } }],
      depois: [{ tipo: 'clicar', alvo: { papel: 'button', nome: 'Novo produto' }, espera: 1500 }],
    },
    {
      titulo: 'Digite o nome do produto',
      texto: 'Digite o Nome do produto. O Código interno você não precisa preencher: o sistema gera sozinho quando você salva.',
      marcar: [
        { alvo: { campo: 'Nome do produto', dentro: 'dialog' }, legenda: 'Nome' },
        { alvo: { campo: 'Código interno', dentro: 'dialog' }, legenda: 'Gerado sozinho' },
      ],
      depois: [{ tipo: 'preencher', alvo: { campo: 'Nome do produto', dentro: 'dialog' }, valor: 'Mouse sem fio' }],
    },
    {
      titulo: 'Código de barras',
      texto: 'Passe o leitor no código de barras do produto ou digite o número. Se o produto não tiver, clique em "Gerar EAN".',
      marcar: [
        { alvo: { placeholder: 'EAN', dentro: 'dialog' }, legenda: 'Código de barras' },
        { alvo: { titulo: 'Gerar EAN', dentro: 'dialog' }, legenda: 'Gerar' },
      ],
    },
    {
      titulo: 'Estoque e preço de venda',
      texto: 'Informe quanto tem em estoque, o estoque mínimo (para o sistema avisar quando estiver acabando) e o preço de venda.',
      marcar: [
        { alvo: { campo: 'Estoque atual', dentro: 'dialog' }, legenda: 'Estoque' },
        { alvo: { campo: 'Preço de venda', dentro: 'dialog' }, legenda: 'Preço de venda' },
      ],
      dica: 'Se você informar o Preço de custo e a Margem (%), o preço de venda é calculado sozinho. Em Grupo, Subgrupo e Marca é só começar a digitar; se não existir, clique em "+ Cadastrar".',
    },
    {
      titulo: 'Dados fiscais (se você emite nota)',
      texto: 'Na aba "Fiscal", preencha o NCM, o CFOP e a origem. Na dúvida, pergunte ao seu contador.',
      marcar: [{ alvo: { papel: 'tab', nome: 'Fiscal', dentro: 'dialog' } }],
    },
    {
      titulo: 'Clique em "Cadastrar"',
      texto: 'Confira e clique em "Cadastrar". O produto já pode ser vendido no PDV.',
      marcar: [{ alvo: { papel: 'button', nome: 'Cadastrar', exato: true, dentro: 'dialog' } }],
      dica: 'Para criar um produto parecido, use o botão "Clonar produto" na linha dele: copia tudo e você só muda o que precisa.',
    },
  ],
};
