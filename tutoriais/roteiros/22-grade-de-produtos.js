// Grade de produtos (cor × numeração), feita DE VERDADE na Demonstração (pedido do dono, 27/11/2026):
// 1) em Cadastros › Grades cadastra uma cor nova (Verde Água) e uma numeração nova (Feminino 34 a 40) e salva;
// 2) cria o produto "Com Grade", salva, monta a grade (Roupa P/M/G × Preto/Branco/Verde Água) com estoque e gera os itens;
// 3) mostra o resultado na lista de Produtos e na Consulta de Grade.
// O exemplo antigo "Tênis Esportivo Run" continua lá (não é mexido).
// Troque o NOVO a cada gravação: o cadastro não aceita dois produtos com o mesmo nome.
const NOVO = 'Camiseta Básica Algodão Lote 1';
const campo = (rotulo, extra = 'input') => ({ css: `div.space-y-1\\.5:has(> label:text-is("${rotulo}")) ${extra}`, dentro: 'dialog' });
const qtd = (cor, tam) => ({ css: `input[aria-label="Quantidade ${cor} ${tam}"]`, dentro: 'dialog' });
module.exports = {
  id: 'grade-de-produtos',
  ordem: 22,
  grupo: 'Cadastros',
  titulo: 'Grade de produtos (cor e numeração)',
  gravaDados: true,
  valoresReais: true,
  manter: [NOVO, 'Verde Água', 'Feminino 34 a 40', 'Roupas', 'Tênis Esportivo Run', '22,00', '49,90'],
  assunto: {"chave": ["grade", "grades", "numeração", "numeracao", "tamanho", "tamanhos", "cor", "cores"], "acoes": ["funciona", "cadastrar", "criar", "montar", "usar", "fazer", "consultar", "ver", "grade", "colocar", "como"], "rotas": ["/cadastros/grades", "/estoque/consulta-grade"]}, // como o Thiaguinho acha o vídeo pela pergunta
  resumo: 'Venda roupas e calçados por cor e número: cada combinação tem estoque e código de barras próprios.',
  fala: 'Oi! Aqui é o Thiago, da Thiago Informática. Neste vídeo eu vou cadastrar, de verdade, um produto com grade: cor e numeração, pra quem vende roupa e calçado. Cada cor e cada número vira um item com estoque e código de barras próprios. Bora lá!',
  antesDeComecar: 'A grade precisa estar liberada para a sua empresa. Se não aparecer "Grades" no menu, fale com o suporte da Thiago Informática.',
  passos: [
    {
      ir: '/cadastros/grades',
      espera: 5000,
      titulo: 'Abra as Grades',
      texto: 'No menu, clica em Cadastros, Grades. Aqui ficam as cores e as numerações. As mais usadas já vêm prontas: preto, branco, nude, jeans e muitas outras.',
      marcar: [{ alvo: { texto: 'Cores', exato: true }, legenda: 'Cores prontas' }],
    },
    {
      antes: [{ tipo: 'preencher', alvo: { placeholder: 'Nova cor (ex.: MT Champanhe)' }, valor: 'Verde Água', espera: 700 }],
      titulo: 'Cadastre uma cor nova',
      texto: 'Faltou uma cor da sua marca? Digita o nome, escolhe a cor na paleta do lado e clica em mais Cor.',
      marcar: [
        { alvo: { placeholder: 'Nova cor (ex.: MT Champanhe)' }, legenda: 'Cor nova' },
        { alvo: { papel: 'button', nome: 'Cor', exato: true }, legenda: '+ Cor' },
      ],
      depois: [{ tipo: 'clicar', alvo: { papel: 'button', nome: 'Cor', exato: true }, seguro: true, espera: 900 }],
    },
    {
      antes: [
        { tipo: 'preencher', alvo: { placeholder: 'Nome (ex.: Feminino 34 a 40)' }, valor: 'Feminino 34 a 40', espera: 600 },
        { tipo: 'preencher', alvo: { placeholder: 'Tamanhos: 34, 35, 36…' }, valor: '34, 36, 38, 40', espera: 600 },
        { tipo: 'clicar', alvo: { papel: 'button', nome: 'Grade', exato: true }, seguro: true, espera: 900 },
      ],
      titulo: 'Numeração nova e Salvar',
      texto: 'As numerações também vêm prontas: calçado, roupa de PP a XGG, jeans e tamanho único. Pra criar a sua, digita o nome, os tamanhos separados por vírgula e clica em mais Grade. No fim, clica em Salvar.',
      marcar: [
        { alvo: { texto: 'Feminino 34 a 40', exato: true }, legenda: 'Numeração nova' },
        { alvo: { papel: 'button', nome: 'Salvar', exato: true }, legenda: 'Salvar' },
      ],
      depois: [{ tipo: 'clicar', alvo: { papel: 'button', nome: 'Salvar', exato: true }, espera: 2500 }],
    },
    {
      ir: '/cadastros/produtos',
      espera: 6000,
      antes: [
        { tipo: 'clicar', alvo: { papel: 'button', nome: 'Novo produto' }, seguro: true, espera: 1800 },
        { tipo: 'preencher', alvo: campo('Nome do produto *'), valor: NOVO, espera: 700 },
        { tipo: 'clicar', alvo: { campo: 'Tipo do produto', dentro: 'dialog' }, seguro: true, espera: 700 },
        { tipo: 'clicar', alvo: { papel: 'option', nome: 'Com Grade' }, seguro: true, espera: 900 },
      ],
      titulo: 'Novo produto "Com Grade"',
      texto: 'Agora em Cadastros, Produtos, clica em Novo produto, digita o nome da referência e, em Tipo do produto, escolhe Com Grade. Repara: o estoque não fica mais no produto, fica em cada cor e numeração.',
      marcar: [
        { alvo: { campo: 'Tipo do produto', dentro: 'dialog' }, legenda: 'Com Grade' },
        { alvo: { texto: 'Fica em cada cor e numeração', dentro: 'dialog' }, legenda: 'Estoque por cor e número' },
      ],
    },
    {
      antes: [
        { tipo: 'preencher', alvo: campo('Grupo'), valor: 'Roupas', espera: 900 },
        { tipo: 'tecla', tecla: 'Enter', espera: 1200 },
        { tipo: 'preencher', alvo: campo('Preço de custo'), valor: '22,00', espera: 600 },
        { tipo: 'preencher', alvo: campo('Preço de venda'), valor: '49,90', espera: 900 },
      ],
      titulo: 'Grupo e preços da referência',
      texto: 'Coloca o grupo, o preço de custo e o preço de venda. Esses dados vão pra todas as cores e numerações de uma vez.',
      marcar: [
        { alvo: campo('Grupo'), legenda: 'Grupo' },
        { alvo: campo('Preço de custo'), legenda: 'Custo' },
        { alvo: campo('Preço de venda'), legenda: 'Venda' },
      ],
    },
    {
      titulo: 'Clique em Cadastrar',
      texto: 'Clica em Cadastrar. Na hora, o sistema já abre a montagem da grade.',
      marcar: [{ alvo: { papel: 'button', nome: 'Cadastrar', exato: true, dentro: 'dialog' }, legenda: 'Cadastrar' }],
      depois: [
        { tipo: 'clicar', alvo: { papel: 'button', nome: 'Cadastrar', exato: true, dentro: 'dialog' }, espera: 2000 },
        { tipo: 'esperar', alvo: { texto: '1. Numeração', exato: true, dentro: 'dialog' }, espera: 1200 },
      ],
    },
    {
      antes: [
        { tipo: 'escolher', alvo: { css: 'select[aria-label="Grade"]', dentro: 'dialog' }, valor: 'Roupa (PP a XGG)', espera: 900 },
        { tipo: 'clicar', alvo: { papel: 'button', nome: 'P', exato: true, dentro: 'dialog' }, seguro: true, espera: 500 },
        { tipo: 'clicar', alvo: { papel: 'button', nome: 'M', exato: true, dentro: 'dialog' }, seguro: true, espera: 500 },
        { tipo: 'clicar', alvo: { papel: 'button', nome: 'G', exato: true, dentro: 'dialog' }, seguro: true, espera: 700 },
      ],
      titulo: '1. Numeração',
      texto: 'Primeiro a numeração: escolhe a grade, aqui Roupa, e clica nos tamanhos que você vende: P, M e G.',
      marcar: [
        { alvo: { css: 'select[aria-label="Grade"]', dentro: 'dialog' }, legenda: 'Tipo de grade' },
        { alvo: { papel: 'button', nome: 'M', exato: true, dentro: 'dialog' }, legenda: 'Tamanhos' },
      ],
    },
    {
      antes: [
        { tipo: 'clicar', alvo: { papel: 'button', nome: 'Preto', exato: true, dentro: 'dialog' }, seguro: true, espera: 500 },
        { tipo: 'clicar', alvo: { papel: 'button', nome: 'Branco', exato: true, dentro: 'dialog' }, seguro: true, espera: 500 },
        { tipo: 'clicar', alvo: { papel: 'button', nome: 'Verde Água', exato: true, dentro: 'dialog' }, seguro: true, espera: 900 },
      ],
      titulo: '2. Cores',
      texto: 'Depois as cores: é só clicar nas que você tem. Preto, Branco, e o Verde Água, que a gente acabou de cadastrar.',
      marcar: [{ alvo: { papel: 'button', nome: 'Verde Água', exato: true, dentro: 'dialog' }, legenda: 'Cor nova' }],
    },
    {
      antes: [
        { tipo: 'preencher', alvo: qtd('Preto', 'P'), valor: '3', espera: 300 },
        { tipo: 'preencher', alvo: qtd('Preto', 'M'), valor: '4', espera: 300 },
        { tipo: 'preencher', alvo: qtd('Preto', 'G'), valor: '2', espera: 300 },
        { tipo: 'preencher', alvo: qtd('Branco', 'P'), valor: '2', espera: 300 },
        { tipo: 'preencher', alvo: qtd('Branco', 'M'), valor: '3', espera: 300 },
        { tipo: 'preencher', alvo: qtd('Branco', 'G'), valor: '2', espera: 300 },
        { tipo: 'preencher', alvo: qtd('Verde Água', 'M'), valor: '1', espera: 700 },
      ],
      titulo: '3. Estoque de cada cor e número',
      texto: 'Na tabela, digita quantas peças você tem de cada cor e tamanho. Se o fornecedor manda código de barras, marca essa opção e digita; se não, o sistema cria um código pra cada peça.',
      marcar: [
        { alvo: qtd('Preto', 'M'), legenda: 'Quantidade' },
        { alvo: { texto: 'Digitar códigos de barras do fornecedor', dentro: 'dialog' }, legenda: 'Código do fornecedor' },
      ],
    },
    {
      titulo: 'Clique em Gerar',
      texto: 'Agora clica em Gerar: cada cor e tamanho vira um item, com estoque e código de barras próprios. No caixa é só passar o código, e o estoque baixa da peça certinha.',
      marcar: [{ alvo: { papel: 'button', nome: /^Gerar \d+/, dentro: 'dialog' }, legenda: 'Gerar' }],
      depois: [{ tipo: 'clicar', alvo: { papel: 'button', nome: /^Gerar \d+/, dentro: 'dialog' }, aguardarFechar: true, espera: 2500 }],
      dica: 'Pra aumentar a grade depois (cor ou número novo), abra o produto no lápis e clique em "Cores e numerações da grade". O que já tem estoque fica travado.',
    },
    {
      antes: [{ tipo: 'preencher', alvo: { placeholder: 'Nome, barras, cód. interno ou fornecedor' }, valor: NOVO, espera: 3500 }],
      titulo: 'A grade na lista de Produtos',
      texto: 'Na lista aparece a referência, com a etiqueta Grade, e cada cor e tamanho como um item, com o seu estoque.',
      marcar: [
        { alvo: { css: 'td a[href^="/estoque/consulta-grade?ref="]' }, legenda: 'Referência' },
        { alvo: { texto: 'Preto · M' }, legenda: 'Cada cor e tamanho' },
      ],
    },
    {
      ir: '/estoque/consulta-grade',
      espera: 5000,
      antes: [
        { tipo: 'clicar', alvo: { placeholder: 'Nome, referência ou código de barras' }, seguro: true, espera: 1000 },
        { tipo: 'preencher', alvo: { placeholder: 'Nome, referência ou código de barras' }, valor: 'Camiseta Básica', espera: 1500 },
        { tipo: 'clicar', alvo: { papel: 'button', nome: new RegExp(NOVO) }, seguro: true, espera: 3000 },
      ],
      titulo: 'Estoque, Consulta de Grade',
      texto: 'E pra ver tudo de uma vez, vai em Estoque, Consulta de Grade, e busca a referência. Aparece a tabela de cor por tamanho com o saldo de cada um, o total por cor e o total por tamanho.',
      marcar: [{ alvo: { texto: /Grade — cor × numeração/ }, legenda: 'Cor × tamanho' }],
    },
    {
      titulo: 'Última peça e reposição',
      texto: 'Olha que inteligente: a última peça, o Verde Água M, aparece em amarelo, e embaixo vem a reposição sugerida, com o que está zerado e o que está acabando.',
      marcar: [
        { alvo: { texto: 'última' }, legenda: 'Última peça' },
        { alvo: { texto: 'Reposição sugerida' }, legenda: 'O que repor' },
      ],
    },
    {
      titulo: 'Filtros, Excel e impressão',
      texto: 'Dá ainda pra filtrar por cor e por tamanho, esconder a grade zerada, exportar pro Excel e imprimir.',
      marcar: [
        { alvo: { texto: 'Esconder grade zerada' }, legenda: 'Filtro' },
        { alvo: { papel: 'button', nome: 'Exportar Excel' }, legenda: 'Excel' },
        { alvo: { papel: 'button', nome: 'Imprimir', exato: true }, legenda: 'Imprimir' },
      ],
      dica: 'Na lista de Produtos, a etiqueta "▦ Grade" na linha do produto também abre essa consulta.',
    },
  ],
};
