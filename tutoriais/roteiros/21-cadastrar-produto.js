// Cadastro de produto feito DE VERDADE na Demonstração (pedido do dono, 27/11/2026): produto fictício completo
// (nome, código de barras gerado, grupo, marca, fornecedor "Distribuidora Exemplo", estoque, custo, margem, venda),
// tributação pela "Tributação IA" e conferida na aba Fiscal, salva e aparece na lista.
// Troque o NOVO a cada gravação: o cadastro não aceita dois produtos com o mesmo nome.
const NOVO = 'Capinha Silicone iPhone 15 Azul';
const campo = (rotulo, extra = 'input') => ({ css: `div.space-y-1\\.5:has(> label:text-is("${rotulo}")) ${extra}`, dentro: 'dialog' });
module.exports = {
  id: 'cadastrar-produto',
  ordem: 21,
  grupo: 'Cadastros',
  titulo: 'Cadastrar um produto',
  gravaDados: true,
  valoresReais: true, // custo, margem e venda do produto fictício: a conta tem que fechar
  aceitarConfirmacao: true,
  manter: [NOVO, 'Distribuidora Exemplo', 'Acessórios', 'Genérica', '12,00', '39,90', '20', '5', '39269090', '3926.90.90', '42023900', '4202.39.00', '5102', '6102', '5405', '6404'],
  assunto: {"chave": ["produto", "produtos", "mercadoria", "item"], "acoes": ["cadastrar", "cadastro", "cadastra", "novo", "nova", "incluir", "adicionar", "criar", "colocar", "registrar"], "rotas": ["/cadastros/produtos"]}, // como o Thiaguinho acha o vídeo pela pergunta
  resumo: 'Cadastre um produto completo: nome, código de barras, grupo, estoque, custo, preço de venda e a tributação pela Tributação IA.',
  fala: 'Oi! Aqui é o Thiago, da Thiago Informática. Neste vídeo eu vou cadastrar um produto de verdade, do começo ao fim: preço, estoque e até a tributação. Bora lá!',
  passos: [
    {
      ir: '/cadastros/produtos',
      espera: 6000,
      titulo: 'Abra a tela de Produtos',
      texto: 'No menu, clica em Cadastros, Produtos. Aqui ficam todos os seus produtos. Pra cadastrar um novo, é no botão Novo produto.',
      marcar: [{ alvo: { papel: 'button', nome: 'Novo produto' }, legenda: 'Novo produto' }],
    },
    {
      antes: [
        { tipo: 'clicar', alvo: { papel: 'button', nome: 'Novo produto' }, seguro: true, espera: 1800 },
        { tipo: 'esperar', alvo: { papel: 'heading', nome: 'Novo produto' }, espera: 600 },
        { tipo: 'preencher', alvo: campo('Nome do produto *'), valor: NOVO, espera: 800 },
      ],
      titulo: 'Digite o nome',
      texto: 'Clicou em Novo produto, digita o nome do produto. O código interno não precisa: o sistema cria sozinho quando você salva.',
      marcar: [
        { alvo: campo('Nome do produto *'), legenda: 'Nome' },
        { alvo: campo('Código interno *'), legenda: 'Gerado sozinho' },
      ],
    },
    {
      antes: [{ tipo: 'clicar', alvo: { titulo: 'Gerar EAN', dentro: 'dialog' }, seguro: true, espera: 900 }],
      titulo: 'Código de barras',
      texto: 'O código de barras: passa o leitor na etiqueta do produto, ou digita o número. Se o produto não tem, clica no mais, Gerar EAN, que o sistema cria um pra você.',
      marcar: [
        { alvo: { placeholder: 'EAN', dentro: 'dialog' }, legenda: 'Código de barras' },
        { alvo: { titulo: 'Gerar EAN', dentro: 'dialog' }, legenda: 'Gerar EAN' },
      ],
    },
    {
      antes: [
        { tipo: 'preencher', alvo: campo('Grupo'), valor: 'Acessórios', espera: 900 },
        { tipo: 'tecla', tecla: 'Enter', espera: 1200 },
        { tipo: 'preencher', alvo: campo('Marca'), valor: 'Genérica', espera: 900 },
        { tipo: 'tecla', tecla: 'Enter', espera: 1200 },
      ],
      titulo: 'Grupo e marca',
      texto: 'Em Grupo e em Marca é só começar a digitar e dar Enter. Se ainda não existe, aparece Cadastrar embaixo e ele cria na hora.',
      marcar: [
        { alvo: campo('Grupo'), legenda: 'Grupo' },
        { alvo: campo('Marca'), legenda: 'Marca' },
      ],
    },
    {
      antes: [
        { tipo: 'clicar', alvo: campo('Fornecedor'), seguro: true, espera: 500 },
        { tipo: 'preencher', alvo: campo('Fornecedor'), valor: 'Distribuidora Exemplo', espera: 1200 },
        { tipo: 'clicar', alvo: { css: 'button:text-is("Distribuidora Exemplo")', dentro: 'dialog' }, seguro: true, espera: 900 },
      ],
      titulo: 'Fornecedor',
      texto: 'No Fornecedor, digita o nome de quem te vende e clica nele. Assim você sabe de quem comprar de novo.',
      marcar: [{ alvo: campo('Fornecedor'), legenda: 'Fornecedor' }],
    },
    {
      antes: [
        { tipo: 'preencher', alvo: campo('Estoque atual'), valor: '20', espera: 500 },
        { tipo: 'preencher', alvo: campo('Estoque mínimo'), valor: '5', espera: 500 },
      ],
      titulo: 'Estoque atual e mínimo',
      texto: 'Agora o estoque: quantos você tem hoje, aqui vinte, e o estoque mínimo, cinco. Quando chegar no mínimo, o sistema te avisa que está acabando.',
      marcar: [
        { alvo: campo('Estoque atual'), legenda: 'Estoque' },
        { alvo: campo('Estoque mínimo'), legenda: 'Mínimo' },
      ],
    },
    {
      antes: [
        { tipo: 'preencher', alvo: campo('Preço de custo'), valor: '12,00', espera: 600 },
        { tipo: 'preencher', alvo: campo('Preço de venda'), valor: '39,90', espera: 900 },
      ],
      titulo: 'Custo, margem e preço de venda',
      texto: 'Coloca o preço de custo, quanto você pagou, e o preço de venda. A margem aparece sozinha. Ou, se preferir, digita a margem e o preço de venda é calculado.',
      marcar: [
        { alvo: campo('Preço de custo'), legenda: 'Custo' },
        { alvo: campo('Margem (%)'), legenda: 'Margem' },
        { alvo: campo('Preço de venda'), legenda: 'Venda' },
      ],
    },
    {
      antes: [
        { tipo: 'clicar', alvo: { papel: 'button', nome: /Tributação IA/, dentro: 'dialog' }, seguro: true, espera: 800 },
        { tipo: 'esperar', alvo: { papel: 'button', nome: 'Aplicar no produto' }, espera: 800 },
      ],
      titulo: 'Tributação IA',
      texto: 'Agora a parte fiscal, sem complicação. Clica em Tributação IA: o sistema pesquisa pelo nome do produto e sugere o NCM, o CEST, o CSOSN e o CFOP. Lê com calma e clica em Aplicar no produto.',
      marcar: [{ alvo: { papel: 'button', nome: 'Aplicar no produto' }, legenda: 'Aplicar no produto' }],
      depois: [{ tipo: 'clicar', alvo: { papel: 'button', nome: 'Aplicar no produto' }, seguro: true, espera: 1500 }],
    },
    {
      antes: [{ tipo: 'clicar', alvo: { papel: 'tab', nome: 'Fiscal', dentro: 'dialog' }, seguro: true, espera: 1500 }],
      titulo: 'Confira na aba Fiscal',
      texto: 'Depois, confere na aba Fiscal: o NCM, o CEST e os CFOPs já estão preenchidos.',
      marcar: [
        { alvo: campo('NCM'), legenda: 'NCM' },
        { alvo: campo('CFOP saída (dentro)'), legenda: 'CFOP' },
      ],
    },
    {
      titulo: 'Não achou? Preencha à mão',
      texto: 'Se a busca não achar, digita o NCM de oito números, que vem na nota do fornecedor, ou clica na lupa do lado pra pesquisar. Na dúvida, confirma com o seu contador.',
      marcar: [{ alvo: { css: 'button[aria-label="Pesquisar NCM"]', dentro: 'dialog' }, legenda: 'Pesquisar NCM' }],
      dica: 'O NCM certo está na nota fiscal de compra do fornecedor: copie de lá.',
    },
    {
      antes: [{ tipo: 'clicar', alvo: { papel: 'tab', nome: 'Geral', dentro: 'dialog' }, seguro: true, espera: 1000 }],
      titulo: 'Clique em Cadastrar',
      texto: 'Tudo certo? Clica em Cadastrar. Pronto, o produto está salvo e já pode ser vendido no caixa.',
      marcar: [{ alvo: { papel: 'button', nome: 'Cadastrar', exato: true, dentro: 'dialog' }, legenda: 'Cadastrar' }],
      depois: [{ tipo: 'clicar', alvo: { papel: 'button', nome: 'Cadastrar', exato: true, dentro: 'dialog' }, aguardarFechar: true, espera: 2500 }],
    },
    {
      antes: [{ tipo: 'preencher', alvo: { placeholder: 'Nome, barras, cód. interno ou fornecedor' }, valor: NOVO, espera: 3500 }],
      titulo: 'O produto já está na lista',
      texto: 'E olha ele aqui na lista, com o código, o estoque e o preço. Pra mudar alguma coisa depois, é no lápis, Editar produto.',
      marcar: [
        { alvo: { texto: NOVO, exato: true }, legenda: 'Produto salvo' },
        { alvo: { titulo: 'Editar produto' }, legenda: 'Editar' },
      ],
      dica: 'Para criar um produto parecido, use "Clonar produto" na linha dele: copia tudo e você só muda o que precisa.',
    },
  ],
};
