// Devolução ao fornecedor feita DE VERDADE na Demonstração (pedido do dono, 27/11/2026), até o "Salvar rascunho":
// fornecedor fictício "Distribuidora Exemplo", nota original fictícia nº 4521 (chave fictícia de 44 dígitos com
// dígito verificador certo), 2 FONES devolvidos de 10, CFOP 5202, tributos zerados, conferência marcada.
// NUNCA emite: nota fiscal de verdade é proibida no vídeo. "Conferir devolução" e "Emitir NF-e de devolução" só são mostrados.
const FONE = 'FONE DE OUVIDO SEM FIO TWS M25';
const NOTA = '4521';
const CHAVE = '31261112345678000195550010000045211000045212'; // fictícia (CNPJ de teste 12.345.678/0001-95)
module.exports = {
  id: 'devolucao-fornecedor',
  ordem: 54,
  grupo: 'Fiscal',
  titulo: 'Devolver mercadoria ao fornecedor (NF-e de devolução)',
  gravaDados: true,
  valoresReais: true,
  manter: ['Distribuidora Exemplo', FONE, NOTA, CHAVE, '25153507', '5202'],
  assunto: { chave: ['devolução ao fornecedor', 'devolver ao fornecedor', 'nota de devolução', 'devolução de compra', 'devolver mercadoria'], acoes: ['fazer', 'emitir', 'devolver', 'lançar', 'como'], rotas: ['/fiscal/devolucao-fornecedor'] },
  resumo: 'Escolha a nota de compra, marque o que vai voltar, confira os impostos e emita a nota de devolução.',
  fala: 'Oi! Aqui é o Thiago, da Thiago Informática. Neste vídeo eu vou montar uma devolução de mercadoria pro fornecedor, passo a passo, até deixar pronta pra emitir a nota. Bora lá!',
  antesDeComecar: 'A empresa precisa estar com o fiscal configurado (certificado digital). Tenha em mãos a nota de compra (número e chave) ou o XML dela.',
  passos: [
    {
      ir: '/fiscal/devolucao-fornecedor',
      espera: 6000,
      titulo: 'Abra a Devolução ao fornecedor',
      texto: 'No menu, clica em Fiscal, Emitir, Devolução ao fornecedor. Dá pra começar pela nota de entrada, buscando o fornecedor, o número ou a chave, ou pelo Importar XML. Aqui eu vou montar do zero, em Nova devolução.',
      marcar: [
        { alvo: { papel: 'combobox', nome: 'Busque fornecedor, número ou chave' }, legenda: 'Pela nota de entrada' },
        { alvo: { papel: 'button', nome: 'Importar XML' }, legenda: 'Pelo XML' },
        { alvo: { papel: 'button', nome: 'Nova devolução' }, legenda: 'Nova devolução' },
      ],
    },
    {
      antes: [
        { tipo: 'clicar', alvo: { papel: 'button', nome: 'Nova devolução' }, seguro: true, espera: 2000 },
        { tipo: 'clicar', alvo: { papel: 'combobox', nome: 'Buscar fornecedor' }, seguro: true, espera: 800 },
        { tipo: 'preencher', alvo: { placeholder: 'Digite para buscar...' }, valor: 'Distribuidora', espera: 1000 },
        { tipo: 'clicar', alvo: { papel: 'option', nome: /Distribuidora Exemplo/ }, seguro: true, espera: 1200 },
      ],
      titulo: '1. Fornecedor',
      texto: 'Clicou em Nova devolução, o primeiro passo é o fornecedor: clica no campo, digita o nome e escolhe. O endereço dele já vem do cadastro.',
      marcar: [{ alvo: { texto: '1. Fornecedor e nota original', exato: true }, legenda: 'Passo 1' }],
    },
    {
      antes: [
        { tipo: 'preencher', alvo: { css: 'label:has-text("Número da nota original") input' }, valor: NOTA, espera: 500 },
        { tipo: 'preencher', alvo: { css: 'label:has-text("Chave de acesso da NF-e original") input' }, valor: CHAVE, espera: 900 },
      ],
      titulo: 'Número e chave da nota de compra',
      texto: 'Agora o número da nota de compra e a chave de acesso, os quarenta e quatro números. Tem o XML da compra? Clica em Anexar XML original, que ele preenche tudo sozinho.',
      marcar: [
        { alvo: { css: 'label:has-text("Número da nota original") input' }, legenda: 'Número' },
        { alvo: { css: 'label:has-text("Chave de acesso da NF-e original") input' }, legenda: 'Chave' },
        { alvo: { papel: 'button', nome: /Anexar XML original/ }, legenda: 'Ou o XML' },
      ],
    },
    {
      antes: [
        { tipo: 'clicar', alvo: { papel: 'combobox', nome: 'Buscar produto cadastrado' }, seguro: true, espera: 800 },
        { tipo: 'preencher', alvo: { placeholder: 'Digite para buscar...' }, valor: 'TWS M25', espera: 1000 },
        { tipo: 'clicar', alvo: { papel: 'option', nome: new RegExp(FONE) }, seguro: true, espera: 900 },
        { tipo: 'clicar', alvo: { papel: 'button', nome: 'Adicionar', exato: true }, seguro: true, espera: 1500 },
      ],
      titulo: '2. Produtos que vão voltar',
      texto: 'No passo dois, busca o produto que vai voltar e clica em Adicionar.',
      marcar: [{ alvo: { texto: FONE, exato: true }, legenda: 'Produto' }],
    },
    {
      antes: [
        { tipo: 'preencher', alvo: { css: `input[aria-label="Quantidade original ${FONE}"]` }, valor: '10', espera: 500 },
        { tipo: 'preencher', alvo: { css: `input[aria-label="Quantidade a devolver ${FONE}"]` }, valor: '2', espera: 500 },
        { tipo: 'preencher', alvo: { css: `input[aria-label="Valor unitário ${FONE}"]` }, valor: '25', espera: 900 },
      ],
      titulo: 'Quantidade e valor',
      texto: 'Coloca quantos vieram na nota, quantos vão voltar, aqui dois de dez, e o valor de cada um, o mesmo da nota de compra. O total da devolução aparece embaixo.',
      marcar: [
        { alvo: { css: `input[aria-label="Quantidade a devolver ${FONE}"]` }, legenda: 'Devolver' },
        { alvo: { texto: 'Total da devolução' }, legenda: 'Total' },
      ],
    },
    {
      antes: [
        { tipo: 'clicar', alvo: { css: `summary:has-text("${FONE}")` }, seguro: true, espera: 900 },
        { tipo: 'escolher', alvo: { css: 'details[open] label:has-text("CFOP") select' }, valor: '5202 · Comercialização', espera: 700 },
        { tipo: 'clicar', alvo: { papel: 'button', nome: 'Confirmar tributos originais zerados' }, espera: 900 },
      ],
      titulo: '3. Conferência fiscal',
      texto: 'No passo três, abre o produto e confere o CFOP de devolução, aqui cinco dois zero dois, de comercialização, e os impostos. Essa parte é bom conferir com o seu contador.',
      marcar: [{ alvo: { css: 'details[open] label:has-text("CFOP") select' }, legenda: 'CFOP' }],
    },
    {
      antes: [{ tipo: 'clicar', alvo: { texto: /Conferi fornecedor, nota original/ }, seguro: true, espera: 900 }],
      titulo: 'Marque a conferência e salve',
      texto: 'Marca que você conferiu tudo e clica em Salvar rascunho. Fica guardado, pra emitir depois, com calma.',
      marcar: [
        { alvo: { texto: /Conferi fornecedor, nota original/ }, legenda: 'Conferi' },
        { alvo: { papel: 'button', nome: /Salvar rascunho/ }, legenda: 'Salvar rascunho' },
      ],
      depois: [{ tipo: 'clicar', alvo: { papel: 'button', nome: /Salvar rascunho/ }, espera: 3000 }],
    },
    {
      titulo: 'Conferir e emitir',
      texto: 'Quando estiver tudo certo, clica em Conferir devolução: o sistema mostra se falta alguma coisa. Aí é só clicar em Emitir NF-e de devolução.',
      marcar: [
        { alvo: { css: 'label:has-text("Ambiente") select' }, legenda: 'Ambiente' },
        { alvo: { papel: 'button', nome: 'Conferir devolução' }, legenda: 'Conferir' },
        { alvo: { papel: 'button', nome: 'Emitir NF-e de devolução' }, legenda: 'Emitir' },
      ],
      atencao: 'A nota de devolução vale para a Receita. Na dúvida, deixe em rascunho e confirme com o contador antes de emitir.',
    },
    {
      antes: [{ tipo: 'clicar', alvo: { papel: 'button', nome: 'Lista de devoluções' }, seguro: true, espera: 2500 }],
      titulo: 'O rascunho fica na lista',
      texto: 'Na Lista de devoluções aparece o rascunho, com o fornecedor, a nota e o total. Pra continuar depois, é no botão Abrir.',
      marcar: [
        { alvo: { css: `tr:has-text("${NOTA}"):has-text("Rascunho")` }, legenda: 'Rascunho salvo' },
        { alvo: { css: `tr:has-text("${NOTA}") button:has-text("Abrir")` }, legenda: 'Abrir' },
      ],
    },
  ],
};
