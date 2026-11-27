// Entrada manual de mercadoria (sem nota), DETALHADA para cliente leigo (pedido do dono, 27/11/2026): feita de verdade
// na Demonstração, do começo ao fim. Fornecedor fictício "Distribuidora Exemplo". Um produto NOVO é cadastrado dentro
// da própria entrada (Carregador Turbo USB-C 20W), com a tributação buscada pela "Tributação IA" e conferida na aba
// Fiscal (e o que fazer se a busca não achar). Um produto que já existe entra pelo código. Pagamento no Pix, custos,
// e a entrada é gerada (estoque sobe e o pagamento vai para o contas a pagar).
module.exports = {
  id: 'entrada-manual',
  ordem: 61,
  grupo: 'Estoque',
  titulo: 'Entrada manual de mercadoria, passo a passo',
  gravaDados: true,
  valoresReais: true, // custo e preço do produto novo: a conta tem que fechar
  manter: ['Distribuidora Exemplo', 'Carregador Turbo USB-C 20W', 'FONE DE OUVIDO SEM FIO TWS M25', '25153507', '25,00', '59,90', '85044090', '8504.40.90', '85.04.40.90', '2105300', '21.053.00', '85044021', '8504.40.21', '2103900', '21.039.00', '5102', '6102', '5405', '6404'], // NCM/CEST/CFOP de verdade (são do produto, não de cliente)
  assunto: { chave: ['entrada manual', 'entrada de mercadoria', 'entrada sem nota', 'entrada de nota manual', 'compra', 'mercadoria chegou', 'tributação', 'ncm'], acoes: ['lançar', 'dar', 'fazer', 'cadastrar', 'buscar', 'como', 'entrada'], rotas: ['/estoque/entrada-manual'] },
  resumo: 'Lance uma compra sem nota do começo ao fim: fornecedor, produto novo com tributação, quantidades, pagamento e custos.',
  fala: 'Oi! Aqui é o Thiago, da Thiago Informática. Neste vídeo eu vou fazer uma entrada manual de mercadoria, do começo ao fim, bem devagar: inclusive cadastrar um produto novo e buscar a tributação dele. Bora lá!',
  antesDeComecar: 'Ter o fornecedor em mãos. O produto e o fornecedor podem ser cadastrados na hora, dentro da própria entrada.',
  passos: [
    {
      ir: '/estoque/entrada-manual',
      espera: 8000,
      titulo: 'Abra a Entrada manual',
      texto: 'No menu, clica em Estoque, Entrada manual. Aqui fica o histórico das suas compras. Pra lançar uma compra nova, é no botão Nova entrada.',
      marcar: [{ alvo: { papel: 'button', nome: /Nova entrada/ }, legenda: 'Nova entrada' }],
    },
    {
      antes: [{ tipo: 'clicar', alvo: { papel: 'button', nome: /Nova entrada/ }, seguro: true, espera: 2000 }],
      titulo: 'As três etapas',
      texto: 'Clicou em Nova entrada, a tela tem três etapas: um, os itens; dois, o pagamento; e três, os custos. A gente começa pelos itens.',
      marcar: [
        { alvo: { papel: 'button', nome: '1. Itens' }, legenda: '1 · Itens' },
        { alvo: { papel: 'button', nome: '2. Pagamento' }, legenda: '2 · Pagamento' },
        { alvo: { papel: 'button', nome: '3. Custos' }, legenda: '3 · Custos' },
      ],
    },
    {
      antes: [
        { tipo: 'preencher', alvo: { placeholder: 'Fornecedor: digite, ↓ e Enter' }, valor: 'Distribuidora Exemplo', espera: 1200 },
        { tipo: 'esperar', alvo: { css: 'button.block:has-text("Distribuidora Exemplo")' }, espera: 300 },
        { tipo: 'tecla', tecla: 'Enter', espera: 1200 },
      ],
      titulo: 'Escolha o fornecedor',
      texto: 'Primeiro o fornecedor. Digita o nome de quem vendeu e aperta Enter pra escolher. Se ele ainda não tem cadastro, é só clicar em Cadastrar, aqui do lado, e cadastrar na hora.',
      marcar: [
        { alvo: { placeholder: 'Fornecedor: digite, ↓ e Enter' }, legenda: 'Fornecedor' },
        { alvo: { css: 'div.rounded-2xl:has(h3:text-is("Fornecedor")) button:text-is("+ Cadastrar")' }, legenda: 'Não tem? Cadastrar' },
      ],
    },
    {
      antes: [{ tipo: 'preencher', alvo: { placeholder: 'Nome, código ou barras; Enter seleciona' }, valor: 'Carregador Turbo USB-C 20W', espera: 1500 }],
      titulo: 'Produto que ainda não tem cadastro',
      texto: 'Agora os produtos. Digita o nome, o código, ou bipa o código de barras. Se o produto já tem cadastro, ele aparece na lista e é só dar Enter. Esse carregador ainda não tem: então clica em Cadastrar novo produto.',
      marcar: [{ alvo: { papel: 'button', nome: /Cadastrar novo produto/ }, legenda: 'Cadastrar novo produto' }],
      depois: [
        { tipo: 'clicar', alvo: { papel: 'button', nome: /Cadastrar novo produto/ }, seguro: true, espera: 1500 },
        { tipo: 'esperar', alvo: { papel: 'heading', nome: 'Novo produto' }, espera: 1500 },
      ],
    },
    {
      antes: [
        { tipo: 'preencher', alvo: { css: 'div.space-y-1\\.5:has(> label:text-is("Preço de custo")) input', dentro: 'dialog' }, valor: '25,00', espera: 500 },
        { tipo: 'preencher', alvo: { css: 'div.space-y-1\\.5:has(> label:text-is("Preço de venda")) input', dentro: 'dialog' }, valor: '59,90', espera: 800 },
      ],
      titulo: 'Nome, custo e preço de venda',
      texto: 'Abre o cadastro do produto, já com o nome que você digitou. Coloca o preço de custo, quanto você pagou, e o preço de venda. A margem é calculada sozinha.',
      marcar: [
        { alvo: { css: 'div.space-y-1\\.5:has(> label:text-is("Nome do produto *")) input', dentro: 'dialog' }, legenda: 'Nome' },
        { alvo: { css: 'div.space-y-1\\.5:has(> label:text-is("Preço de custo")) input', dentro: 'dialog' }, legenda: 'Custo' },
        { alvo: { css: 'div.space-y-1\\.5:has(> label:text-is("Preço de venda")) input', dentro: 'dialog' }, legenda: 'Venda' },
      ],
    },
    {
      antes: [
        { tipo: 'clicar', alvo: { papel: 'button', nome: /Tributação IA/, dentro: 'dialog' }, seguro: true, espera: 800 },
        { tipo: 'esperar', alvo: { papel: 'button', nome: 'Aplicar no produto' }, espera: 800 },
      ],
      titulo: 'Busque a tributação',
      texto: 'Agora a tributação. Clica em Tributação IA: o sistema pesquisa pelo nome do produto, ou pela foto, e sugere o NCM, o CEST, o CSOSN e o CFOP. Lê com calma e, se estiver certo, clica em Aplicar no produto.',
      marcar: [{ alvo: { papel: 'button', nome: 'Aplicar no produto' }, legenda: 'Aplicar no produto' }],
      depois: [{ tipo: 'clicar', alvo: { papel: 'button', nome: 'Aplicar no produto' }, seguro: true, espera: 1500 }],
    },
    {
      antes: [{ tipo: 'clicar', alvo: { papel: 'tab', nome: 'Fiscal', dentro: 'dialog' }, seguro: true, espera: 1500 }],
      titulo: 'Confira na aba Fiscal',
      texto: 'Depois, sempre confere na aba Fiscal. Veja se o NCM, o CEST e os CFOPs foram preenchidos.',
      marcar: [
        { alvo: { css: 'div.space-y-1\\.5:has(> label:text-is("NCM")) input', dentro: 'dialog' }, legenda: 'NCM' },
        { alvo: { css: 'div.space-y-1\\.5:has(> label:text-is("CFOP saída (dentro)")) input', dentro: 'dialog' }, legenda: 'CFOP' },
      ],
    },
    {
      titulo: 'Não achou? Preencha à mão',
      texto: 'E se a busca não achar, você preenche à mão: digita o NCM de oito números, que vem na nota do fornecedor, ou clica na lupa do lado pra pesquisar. Na dúvida, confirma com o seu contador antes de emitir nota.',
      marcar: [{ alvo: { css: 'button[aria-label="Pesquisar NCM"]', dentro: 'dialog' }, legenda: 'Pesquisar NCM' }],
      dica: 'O NCM certo está na nota fiscal de compra do fornecedor: copie de lá.',
    },
    {
      titulo: 'Salve o produto',
      texto: 'Tudo certo? Clica em Cadastrar. O produto fica salvo e já entra na sua entrada.',
      marcar: [{ alvo: { papel: 'button', nome: 'Cadastrar', exato: true, dentro: 'dialog' }, legenda: 'Cadastrar' }],
      depois: [{ tipo: 'clicar', alvo: { papel: 'button', nome: 'Cadastrar', exato: true, dentro: 'dialog' }, aguardarFechar: true, espera: 2000 }],
    },
    {
      antes: [{ tipo: 'preencher', alvo: { css: 'label:has-text("Quantidade") input' }, valor: '10', espera: 900 }],
      titulo: 'Quantidade e custo',
      texto: 'Agora coloca a quantidade que chegou, aqui foram dez, e confere o custo de cada um. Se o produto vem em caixa, em Unidades por pacote você diz quantas vêm em cada caixa, e o estoque sobe certinho.',
      marcar: [
        { alvo: { css: 'label:has-text("Quantidade") input' }, legenda: 'Quantidade' },
        { alvo: { css: 'label:has-text("Unid. por pacote") input' }, legenda: 'Por caixa' },
        { alvo: { css: 'label:has-text("Custo unitário") input' }, legenda: 'Custo' },
      ],
    },
    {
      antes: [
        { tipo: 'preencher', alvo: { placeholder: 'Nome, código ou barras; Enter seleciona' }, valor: '25153507', espera: 1500 },
        { tipo: 'tecla', tecla: 'Enter', espera: 1500 },
        { tipo: 'preencher', alvo: { css: 'label:has-text("Quantidade") input' }, valor: '5', espera: 900 },
      ],
      titulo: 'Produto que já tem cadastro',
      texto: 'Produto que já tem cadastro é mais rápido: bipa ou digita o código, aperta Enter, e põe a quantidade. Repete pra cada produto da compra.',
      marcar: [{ alvo: { texto: 'FONE DE OUVIDO SEM FIO TWS M25', exato: true }, legenda: 'Já cadastrado' }],
    },
    {
      antes: [{ tipo: 'clicar', alvo: { papel: 'button', nome: /Próximo: pagamento/ }, seguro: true, espera: 2000 }],
      titulo: 'Pagamento',
      texto: 'Clica em Próximo, pagamento. Escolhe como pagou: Pix, dinheiro, boleto ou a prazo. No boleto e no a prazo, você informa as parcelas, e elas já vão para o contas a pagar.',
      marcar: [
        { alvo: { css: 'select.border' }, legenda: 'Forma de pagamento' },
        { alvo: { papel: 'button', nome: /Conferir e avançar para custos/ }, legenda: 'Avançar' },
      ],
    },
    {
      antes: [
        { tipo: 'clicar', alvo: { papel: 'button', nome: /Conferir e avançar para custos/ }, seguro: true, espera: 1000 },
        { tipo: 'esperar', alvo: { texto: 'Gerência de custos', exato: true }, espera: 1000 },
      ],
      titulo: 'Custos e preço de venda',
      texto: 'Clica em Conferir e avançar. Aqui aparece o custo novo de cada produto e o preço de venda. Pode aplicar uma margem pra todos, ou manter os preços que já estão.',
      marcar: [
        { alvo: { papel: 'button', nome: 'Aplicar margem a todos' }, legenda: 'Margem para todos' },
        { alvo: { papel: 'button', nome: 'Manter preços atuais' }, legenda: 'Manter preços' },
      ],
    },
    {
      titulo: 'Gere a entrada',
      texto: 'Tudo conferido? Clica em Gerar entrada. O estoque sobe na hora, o custo médio é atualizado, e o pagamento vai para o contas a pagar.',
      marcar: [{ alvo: { papel: 'button', nome: /Gerar entrada/ }, legenda: 'Gerar entrada' }],
      depois: [
        { tipo: 'clicar', alvo: { papel: 'button', nome: /Gerar entrada/ }, espera: 1500 },
        { tipo: 'esperar', alvo: { papel: 'button', nome: /Nova entrada/ }, espera: 2500 },
      ],
      dica: 'Não terminou? Use "Salvar em aberto" e continue depois.',
    },
    {
      antes: [{ tipo: 'esperar', alvo: { css: ':not(option):text-is("Concluída") >> visible=true' }, espera: 800 }],
      titulo: 'Pronto, entrada concluída',
      texto: 'Pronto! A entrada já aparece aqui no histórico, concluída. Clicando nela, dá pra imprimir as etiquetas dos produtos que chegaram.',
      marcar: [{ alvo: { css: ':not(option):text-is("Concluída") >> visible=true' }, legenda: 'Concluída' }],
    },
  ],
};
