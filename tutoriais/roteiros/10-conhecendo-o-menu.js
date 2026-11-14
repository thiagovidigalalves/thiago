module.exports = {
  id: 'conhecendo-o-menu',
  ordem: 10,
  grupo: 'Primeiros passos',
  titulo: 'Conhecendo o menu',
  resumo: 'Ache qualquer tela rápido: menu lateral, busca e favoritos.',
  passos: [
    {
      ir: '/',
      titulo: 'O menu fica do lado esquerdo',
      texto: 'Todas as telas do sistema estão no menu azul à esquerda, separadas por assunto: Comercial, Cadastros, Estoque, Financeiro, Fiscal, Relatórios e Configurações.',
      marcar: [{ alvo: 'aside nav', legenda: 'Menu do sistema' }],
      telaInteira: true,
    },
    {
      titulo: 'Clique num grupo para abrir',
      texto: 'Clique no nome do grupo (por exemplo "Cadastros") para ver as telas dele. Clique de novo para fechar.',
      marcar: [{ alvo: { papel: 'button', nome: 'Cadastros' } }],
      depois: [{ tipo: 'clicar', alvo: { papel: 'button', nome: 'Cadastros' } }],
    },
    {
      titulo: 'Marque suas telas favoritas',
      texto: 'Clique na estrelinha ao lado de uma tela que você usa muito. Ela vai aparecer lá em cima, em "Favoritos".',
      marcar: [{ alvo: 'aside nav button[aria-label^="Adicionar aos favoritos"]' }],
    },
    {
      titulo: 'Não achou? Pesquise',
      texto: 'Digite o que procura no campo "Buscar no sistema..." (por exemplo "contas") e clique no resultado.',
      marcar: [{ alvo: { placeholder: 'Buscar no sistema...' } }],
      depois: [{ tipo: 'preencher', alvo: { placeholder: 'Buscar no sistema...' }, valor: 'contas' }],
    },
    {
      titulo: 'Clique no resultado',
      texto: 'Aparece a lista das telas encontradas. É só clicar na que você quer.',
      marcar: [{ alvo: '[role="listbox"]' }],
      dica: 'Aperte Enter para abrir o primeiro resultado da lista.',
    },
  ],
};
