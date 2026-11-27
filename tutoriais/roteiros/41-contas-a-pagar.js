// Contas a pagar feito DE VERDADE na Demonstração (pedido do dono, 21/11/2026): lança a conta de luz da loja
// (despesa geral, fornecedor fictício "Companhia de Energia Exemplo"), paga e mostra paga.
// 27/11/2026: a tela agora já abre com "Já foi pago agora" LIGADO (a maioria lança já paga): o robô desliga para lançar
// em aberto. Acrescentados: boleto parcelado do fornecedor "Distribuidora Exemplo" (3x) e o lançamento já pago (Pix).
module.exports = {
  id: 'contas-a-pagar',
  ordem: 41,
  grupo: 'Financeiro',
  titulo: 'Contas a pagar: lançar, parcelar e pagar',
  gravaDados: true,
  valoresReais: true, // R$ 289,90 do começo ao fim
  manter: ['Companhia de Energia Exemplo', 'Conta de luz da loja', '289,90', '289.90', 'Distribuidora Exemplo', 'Boleto da compra de mercadorias', '1.200,00', '400,00', 'Padaria Exemplo', 'Café da loja', '45,00'],
  assunto: { chave: ['conta a pagar', 'contas a pagar', 'despesa', 'boleto', 'pagar conta'], acoes: ['lançar', 'lanço', 'pagar', 'registrar', 'cadastrar', 'baixar', 'dar baixa', 'como'], rotas: ['/financeiro/contas-pagar'] },
  resumo: 'Lance suas despesas e boletos e marque quando pagar.',
  fala: 'Oi! Aqui é o Thiago, da Thiago Informática. Neste vídeo eu vou lançar contas a pagar de verdade: a conta de luz da loja, que eu pago depois, um boleto parcelado do fornecedor, e uma despesa que já foi paga na hora. Bora lá!',
  passos: [
    {
      ir: '/financeiro/contas-pagar',
      espera: 6000,
      titulo: 'Abra Contas a Pagar',
      texto: 'No menu, clica em Financeiro, Contas a Pagar. Aqui em cima você vê o que já pagou, o que falta pagar e o que está atrasado.',
      marcar: [{ alvo: { papel: 'button', nome: 'Nova conta' }, legenda: 'Nova conta' }],
    },
    {
      antes: [
        { tipo: 'clicar', alvo: { papel: 'button', nome: 'Nova conta' }, seguro: true, espera: 1800 },
        { tipo: 'clicar', alvo: { css: 'div.space-y-1:has(label:text-is("Vínculo da despesa")) button[role=combobox]', dentro: 'dialog' }, seguro: true, espera: 800 },
        { tipo: 'clicar', alvo: { papel: 'option', nome: /Despesa geral/ }, seguro: true, espera: 800 },
        { tipo: 'preencher', alvo: { placeholder: 'Pode deixar vazio, por exemplo: água, luz ou tarifa', dentro: 'dialog' }, valor: 'Companhia de Energia Exemplo' },
      ],
      titulo: 'De quem é a conta',
      texto: 'Clica em Nova conta e escolhe de quem é: um fornecedor, um funcionário, ou uma despesa geral, como a conta de luz. Aqui eu coloquei a companhia de energia.',
      marcar: [{ alvo: { placeholder: 'Pode deixar vazio, por exemplo: água, luz ou tarifa', dentro: 'dialog' }, legenda: 'Para quem' }],
    },
    {
      antes: [
        { tipo: 'preencher', alvo: { css: 'div.space-y-1:has(label:text-is("Descrição")) input', dentro: 'dialog' }, valor: 'Conta de luz da loja' },
        { tipo: 'clicar', alvo: { css: 'button[aria-pressed="true"]:has-text("Já foi pago agora")', dentro: 'dialog' }, seguro: true, espera: 900 },
        { tipo: 'preencher', alvo: { css: 'div.space-y-1:has(label:has-text("Valor")) input[type=number]', dentro: 'dialog' }, valor: '289.90' },
        { tipo: 'clicar', alvo: { css: 'div.space-y-1:has(label:text-is("Descrição")) input', dentro: 'dialog' }, seguro: true, espera: 800 },
      ],
      titulo: 'Descrição, valor e vencimento',
      texto: 'Escreve do que é. Como eu ainda vou pagar, desligo o Já foi pago agora. Aí coloca o valor e o vencimento, e clica em Salvar.',
      marcar: [
        { alvo: { papel: 'button', nome: /Já foi pago agora/, dentro: 'dialog' }, legenda: 'Desligado: em aberto' },
        { alvo: { css: 'div.space-y-1:has(label:has-text("Valor")) input[type=number]', dentro: 'dialog' }, legenda: 'R$ 289,90' },
        { alvo: { papel: 'button', nome: 'Salvar', exato: true, dentro: 'dialog' }, legenda: 'Salvar' },
      ],
      depois: [{ tipo: 'clicar', alvo: { papel: 'button', nome: 'Salvar', exato: true, dentro: 'dialog' }, aguardarFechar: true, espera: 4000 }],
      dica: 'Conta que se repete todo mês, como aluguel e internet? Cadastre em Financeiro › Recorrências e ela é lançada sozinha.',
    },
    {
      antes: [{ tipo: 'preencher', alvo: { placeholder: 'Nome' }, valor: 'Companhia de Energia Exemplo', espera: 4000 }],
      titulo: 'A conta já está lançada',
      texto: 'Pronto, a conta está aqui, esperando o pagamento. Ela também já entra no fluxo de caixa e no DRE.',
      marcar: [{ alvo: { css: 'tbody tr:has-text("Companhia de Energia Exemplo")' }, legenda: 'Em aberto' }],
    },
    {
      antes: [{ tipo: 'clicar', alvo: { css: 'tbody tr:has-text("Companhia de Energia Exemplo") button:has-text("Pagar")' }, seguro: true, espera: 2000 }],
      titulo: 'Pagou? Clique em Pagar',
      texto: 'Quando pagar, clica em Pagar na linha da conta. Confere o valor, a forma de pagamento e de qual conta saiu o dinheiro, e confirma.',
      marcar: [{ alvo: { papel: 'button', nome: /Confirmar/, dentro: 'dialog' }, legenda: 'Confirmar' }],
      depois: [{ tipo: 'clicar', alvo: { papel: 'button', nome: /Confirmar/, dentro: 'dialog' }, espera: 4000 }],
    },
    {
      antes: [
        { tipo: 'clicar', alvo: { papel: 'button', nome: 'Pagas', exato: true }, seguro: true, espera: 2500 },
        { tipo: 'preencher', alvo: { placeholder: 'Nome' }, valor: 'Companhia de Energia Exemplo', espera: 4000 },
      ],
      titulo: 'A conta ficou paga',
      texto: 'E na aba Pagas a conta de luz já aparece paga, com a data. O dinheiro saiu da conta que você escolheu.',
      marcar: [{ alvo: { css: 'tbody tr:has-text("Companhia de Energia Exemplo")' }, legenda: 'Paga' }],
    },
    {
      antes: [
        { tipo: 'clicar', alvo: { papel: 'button', nome: 'Nova conta' }, seguro: true, espera: 1800 },
        { tipo: 'clicar', alvo: { css: 'div.space-y-1:has(label:text-is("Vínculo da despesa")) button[role=combobox]', dentro: 'dialog' }, seguro: true, espera: 800 },
        { tipo: 'clicar', alvo: { papel: 'option', nome: 'Fornecedor', exato: true }, seguro: true, espera: 800 },
        { tipo: 'clicar', alvo: { papel: 'combobox', nome: 'Digite o nome do fornecedor...', dentro: 'dialog' }, seguro: true, espera: 800 },
        { tipo: 'preencher', alvo: { placeholder: 'Digite para buscar...' }, valor: 'Distribuidora Exemplo', espera: 1200 },
        { tipo: 'clicar', alvo: { papel: 'option', nome: /Distribuidora Exemplo/ }, seguro: true, espera: 1000 },
        { tipo: 'preencher', alvo: { css: 'div.space-y-1:has(label:text-is("Descrição")) input', dentro: 'dialog' }, valor: 'Boleto da compra de mercadorias' },
        { tipo: 'clicar', alvo: { css: 'button[aria-pressed="true"]:has-text("Já foi pago agora")', dentro: 'dialog' }, seguro: true, espera: 900 },
        { tipo: 'preencher', alvo: { campo: 'Quantidade de parcelas', dentro: 'dialog' }, valor: '3' },
        { tipo: 'preencher', alvo: { css: 'div.space-y-1:has(label:has-text("Valor")) input[type=number]', dentro: 'dialog' }, valor: '1200' },
        { tipo: 'clicar', alvo: { css: 'div.space-y-1:has(label:text-is("Descrição")) input', dentro: 'dialog' }, seguro: true, espera: 800 },
      ],
      titulo: 'Boleto parcelado do fornecedor',
      texto: 'Agora um boleto parcelado. Nova conta, escolhe Fornecedor e busca o nome dele. Desliga o Já foi pago agora, coloca três parcelas e o valor total. Ele divide sozinho: três boletos de quatrocentos, um por mês.',
      marcar: [
        { alvo: { campo: 'Quantidade de parcelas', dentro: 'dialog' }, legenda: '3 parcelas' },
        { alvo: { texto: /^Parcelado:/, dentro: 'dialog' }, legenda: '3x de R$ 400' },
      ],
      depois: [{ tipo: 'clicar', alvo: { papel: 'button', nome: 'Salvar', exato: true, dentro: 'dialog' }, aguardarFechar: true, espera: 4000 }],
    },
    {
      antes: [
        { tipo: 'clicar', alvo: { papel: 'button', nome: /Em aberto/ }, seguro: true, espera: 2500 },
        { tipo: 'preencher', alvo: { placeholder: 'Nome' }, valor: 'Distribuidora Exemplo', espera: 4000 },
      ],
      titulo: 'Os três boletos lançados',
      texto: 'Pronto: os três boletos estão aqui, cada um no seu mês. Pagou um? É só clicar em Pagar na linha dele.',
      marcar: [{ alvo: { css: 'tbody tr:has-text("Boleto da compra de mercadorias")' }, legenda: 'Parcela 1/3' }],
    },
    {
      antes: [
        { tipo: 'clicar', alvo: { papel: 'button', nome: 'Nova conta' }, seguro: true, espera: 1800 },
        { tipo: 'clicar', alvo: { css: 'div.space-y-1:has(label:text-is("Vínculo da despesa")) button[role=combobox]', dentro: 'dialog' }, seguro: true, espera: 800 },
        { tipo: 'clicar', alvo: { papel: 'option', nome: /Despesa geral/ }, seguro: true, espera: 800 },
        { tipo: 'preencher', alvo: { placeholder: 'Pode deixar vazio, por exemplo: água, luz ou tarifa', dentro: 'dialog' }, valor: 'Padaria Exemplo' },
        { tipo: 'preencher', alvo: { css: 'div.space-y-1:has(label:text-is("Descrição")) input', dentro: 'dialog' }, valor: 'Café da loja' },
        { tipo: 'preencher', alvo: { css: 'div.space-y-1:has(label:has-text("Valor")) input[type=number]', dentro: 'dialog' }, valor: '45' },
        { tipo: 'clicar', alvo: { css: 'div.space-y-1:has(label:text-is("Descrição")) input', dentro: 'dialog' }, seguro: true, espera: 800 },
      ],
      titulo: 'Pagou na hora? Já lança pago',
      texto: 'E o que você já pagou na hora, como o café da loja, é o mais rápido: deixa o Já foi pago agora ligado. Ele já vem com o Pix; troca a forma se pagou de outro jeito, e salva.',
      marcar: [
        { alvo: { papel: 'button', nome: /Já foi pago agora/, dentro: 'dialog' }, legenda: 'Já pago' },
        { alvo: { papel: 'combobox', nome: 'Selecione a forma usada no pagamento', dentro: 'dialog' }, legenda: 'Forma' },
      ],
      depois: [{ tipo: 'clicar', alvo: { papel: 'button', nome: 'Salvar', exato: true, dentro: 'dialog' }, aguardarFechar: true, espera: 4000 }],
    },
    {
      antes: [
        { tipo: 'clicar', alvo: { papel: 'button', nome: 'Pagas', exato: true }, seguro: true, espera: 2500 },
        { tipo: 'preencher', alvo: { placeholder: 'Nome' }, valor: 'Padaria Exemplo', espera: 4000 },
      ],
      titulo: 'Já entrou paga',
      texto: 'Olha ela aqui, direto nas Pagas, e o dinheiro já saiu da conta. Tudo isso entra no fluxo de caixa e no DRE.',
      marcar: [{ alvo: { css: 'tbody tr:has-text("Padaria Exemplo")' }, legenda: 'Paga na hora' }],
    },
  ],
};
