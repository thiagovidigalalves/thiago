// Grupos, marcas, unidades e plano de contas feitos DE VERDADE na Demonstração (pedido do dono, 27/11/2026):
// cria o grupo "Capinhas e Películas" com o subgrupo "Película 3D", a marca "Exemplo Tech", a unidade "Fardo (FD)"
// e a conta "Sistema de alarme" dentro de Despesas Operacionais. Nada disso é dado de cliente.
module.exports = {
  id: 'grupos-marcas-unidades',
  ordem: 24,
  grupo: 'Cadastros',
  titulo: 'Grupos, marcas, unidades e plano de contas',
  gravaDados: true,
  manter: ['Capinhas e Películas', 'Película 3D', 'Exemplo Tech', 'Fardo', 'FD', 'Sistema de alarme', 'Despesas Operacionais'],
  assunto: { chave: ['grupo', 'subgrupo', 'marca', 'unidade', 'plano de contas', 'categoria'], acoes: ['cadastrar', 'criar', 'novo', 'nova', 'organizar', 'como'], rotas: ['/cadastros/grupos', '/cadastros/marcas', '/cadastros/unidades', '/cadastros/plano-de-contas'] },
  resumo: 'Organize seus produtos em grupos, marcas e unidades, e crie as categorias de receitas e despesas.',
  fala: 'Oi! Aqui é o Thiago, da Thiago Informática. Neste vídeo eu vou cadastrar de verdade um grupo, um subgrupo, uma marca, uma unidade e uma conta no plano de contas. Bora lá!',
  passos: [
    {
      ir: '/cadastros/grupos',
      espera: 5000,
      antes: [{ tipo: 'clicar', alvo: { papel: 'button', nome: 'Novo grupo', exato: true }, seguro: true, espera: 1500 }],
      titulo: 'Novo grupo',
      texto: 'No menu, clica em Cadastros, Produtos, Grupos e Subgrupos. Clica em Novo grupo e digita o nome, por exemplo, Capinhas e Películas.',
      marcar: [{ alvo: { rotulo: 'Nome do grupo', dentro: 'dialog' }, legenda: 'Nome do grupo' }],
    },
    {
      antes: [{ tipo: 'preencher', alvo: { rotulo: 'Nome do grupo', dentro: 'dialog' }, valor: 'Capinhas e Películas', espera: 800 }],
      titulo: 'Salve o grupo',
      texto: 'Clica em Salvar, e o grupo já aparece na lista.',
      marcar: [{ alvo: { papel: 'button', nome: 'Salvar', exato: true, dentro: 'dialog' }, legenda: 'Salvar' }],
      depois: [{ tipo: 'clicar', alvo: { papel: 'button', nome: 'Salvar', exato: true, dentro: 'dialog' }, aguardarFechar: true, espera: 2000 }],
    },
    {
      antes: [
        { tipo: 'clicar', alvo: { papel: 'button', nome: 'Capinhas e Películas', exato: true }, seguro: true, espera: 1200 },
        { tipo: 'clicar', alvo: { papel: 'button', nome: 'Novo subgrupo', exato: true }, seguro: true, espera: 1500 },
        { tipo: 'preencher', alvo: { rotulo: 'Nome do subgrupo', dentro: 'dialog' }, valor: 'Película 3D', espera: 800 },
      ],
      titulo: 'Subgrupo dentro do grupo',
      texto: 'Agora clica no nome do grupo, Capinhas e Películas, e depois em Novo subgrupo. Digita Película 3D e salva. Assim você filtra os produtos e vê os relatórios por grupo.',
      marcar: [{ alvo: { papel: 'button', nome: 'Salvar', exato: true, dentro: 'dialog' }, legenda: 'Salvar' }],
      depois: [{ tipo: 'clicar', alvo: { papel: 'button', nome: 'Salvar', exato: true, dentro: 'dialog' }, aguardarFechar: true, espera: 2000 }],
    },
    {
      titulo: 'Grupo e subgrupo prontos',
      texto: 'Pronto: do lado esquerdo o grupo, e do lado direito o subgrupo dele.',
      marcar: [
        { alvo: { papel: 'button', nome: 'Capinhas e Películas', exato: true }, legenda: 'Grupo' },
        { alvo: { texto: 'Película 3D', exato: true }, legenda: 'Subgrupo' },
      ],
    },
    {
      ir: '/cadastros/marcas',
      espera: 4000,
      antes: [
        { tipo: 'clicar', alvo: { papel: 'button', nome: 'Nova marca' }, seguro: true, espera: 1500 },
        { tipo: 'preencher', alvo: { campo: 'Nome', dentro: 'dialog' }, valor: 'Exemplo Tech', espera: 800 },
      ],
      titulo: 'Marcas',
      texto: 'Agora as marcas. No menu, clica em Cadastros, Produtos, Marcas. Clica em Nova marca, digita o nome e clica em Salvar.',
      marcar: [
        { alvo: { campo: 'Nome', dentro: 'dialog' }, legenda: 'Nome da marca' },
        { alvo: { papel: 'button', nome: 'Salvar', exato: true, dentro: 'dialog' }, legenda: 'Salvar' },
      ],
      depois: [{ tipo: 'clicar', alvo: { papel: 'button', nome: 'Salvar', exato: true, dentro: 'dialog' }, aguardarFechar: true, espera: 2000 }],
      dica: 'Também dá para criar a marca na hora, dentro do cadastro do produto: comece a digitar e clique em "+ Cadastrar".',
    },
    {
      ir: '/cadastros/unidades',
      espera: 4000,
      antes: [
        { tipo: 'clicar', alvo: { papel: 'button', nome: 'Nova unidade' }, seguro: true, espera: 1500 },
        { tipo: 'preencher', alvo: { campo: 'Nome', dentro: 'dialog' }, valor: 'Fardo', espera: 500 },
        { tipo: 'preencher', alvo: { campo: 'Sigla', dentro: 'dialog' }, valor: 'FD', espera: 800 },
      ],
      titulo: 'Unidades de medida',
      texto: 'As unidades ficam em Cadastros, Produtos, Unidades. Clica em Nova unidade, coloca o nome e a sigla, aqui Fardo, FD, e clica em Salvar.',
      marcar: [
        { alvo: { campo: 'Nome', dentro: 'dialog' }, legenda: 'Nome' },
        { alvo: { campo: 'Sigla', dentro: 'dialog' }, legenda: 'Sigla' },
      ],
      depois: [{ tipo: 'clicar', alvo: { papel: 'button', nome: 'Salvar', exato: true, dentro: 'dialog' }, aguardarFechar: true, espera: 2000 }],
    },
    {
      titulo: 'A unidade já está na lista',
      texto: 'Pronto, o Fardo já aparece na lista e já dá pra usar no cadastro dos produtos.',
      marcar: [{ alvo: { texto: '(FD)', exato: true }, legenda: 'Fardo (FD)' }],
    },
    {
      ir: '/cadastros/plano-de-contas',
      espera: 5000,
      antes: [
        { tipo: 'clicar', alvo: { papel: 'button', nome: 'Nova conta', exato: true }, seguro: true, espera: 1500 },
        { tipo: 'preencher', alvo: { css: 'label:has-text("Nome *") input', dentro: 'dialog' }, valor: 'Sistema de alarme', espera: 800 },
      ],
      titulo: 'Plano de contas: nova conta',
      texto: 'Agora o plano de contas, em Cadastros, Plano de contas. Ele já vem pronto, com as receitas e as despesas que alimentam o DRE. Pra criar uma nova, clica em Nova conta e dá o nome, aqui Sistema de alarme. O tipo é Despesa.',
      marcar: [
        { alvo: { css: 'label:has-text("Nome *") input', dentro: 'dialog' }, legenda: 'Nome' },
        { alvo: { css: 'label:has-text("Tipo") select', dentro: 'dialog' }, legenda: 'Despesa' },
      ],
    },
    {
      antes: [
        { tipo: 'clicar', alvo: { papel: 'combobox', nome: 'Categoria pai', dentro: 'dialog' }, seguro: true, espera: 1000 },
        { tipo: 'preencher', alvo: { placeholder: 'Digite a categoria...' }, valor: 'Despesas Operacionais', espera: 1000 },
        { tipo: 'clicar', alvo: { papel: 'option', nome: /Despesas Operacionais/ }, seguro: true, espera: 1000 },
      ],
      titulo: 'Escolha a categoria pai',
      texto: 'Em Categoria pai, escolhe onde ela fica: aqui em Despesas Operacionais. Depois clica em Salvar.',
      marcar: [
        { alvo: { papel: 'combobox', nome: 'Categoria pai', dentro: 'dialog' }, legenda: 'Categoria pai' },
        { alvo: { papel: 'button', nome: 'Salvar', exato: true, dentro: 'dialog' }, legenda: 'Salvar' },
      ],
      depois: [{ tipo: 'clicar', alvo: { papel: 'button', nome: 'Salvar', exato: true, dentro: 'dialog' }, aguardarFechar: true, espera: 2500 }],
      dica: 'Use nomes simples, como "Energia", "Aluguel", "Internet". Assim o DRE fica fácil de ler.',
    },
    {
      antes: [{ tipo: 'clicar', alvo: { css: 'div.flex:has(> span:text-is("Despesas Operacionais")) > button.shrink-0' }, seguro: true, espera: 1200 }],
      titulo: 'A conta já está no plano',
      texto: 'Abrindo Despesas Operacionais, a conta Sistema de alarme já está lá. Agora ela aparece no Contas a pagar e no DRE.',
      marcar: [{ alvo: { texto: 'Sistema de alarme' }, legenda: 'Conta nova' }],
    },
  ],
};
