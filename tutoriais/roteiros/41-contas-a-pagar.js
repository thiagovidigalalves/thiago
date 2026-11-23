// Contas a pagar feito DE VERDADE na Demonstração (pedido do dono, 21/11/2026): lança a conta de luz da loja
// (despesa geral, fornecedor fictício "Companhia de Energia Exemplo"), paga e mostra paga.
module.exports = {
  id: 'contas-a-pagar',
  ordem: 41,
  grupo: 'Financeiro',
  titulo: 'Contas a pagar: lançar e pagar',
  gravaDados: true,
  valoresReais: true, // R$ 289,90 do começo ao fim
  manter: ['Companhia de Energia Exemplo', 'Conta de luz da loja', '289,90', '289.90'],
  assunto: { chave: ['conta a pagar', 'contas a pagar', 'despesa', 'boleto', 'pagar conta'], acoes: ['lançar', 'lanço', 'pagar', 'registrar', 'cadastrar', 'baixar', 'dar baixa', 'como'], rotas: ['/financeiro/contas-pagar'] },
  resumo: 'Lance suas despesas e boletos e marque quando pagar.',
  fala: 'Oi! Aqui é o Thiago, da Thiago Informática. Neste vídeo eu vou lançar uma conta a pagar de verdade, a conta de luz da loja, e depois pagar ela. Bora lá!',
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
        { tipo: 'preencher', alvo: { css: 'div.space-y-1:has(label:has-text("Valor")) input[type=number]', dentro: 'dialog' }, valor: '289.90' },
      ],
      titulo: 'Descrição, valor e vencimento',
      texto: 'Escreve do que é, o valor e o vencimento. Se for boleto parcelado, coloca as parcelas que ele divide sozinho. Depois clica em Salvar.',
      marcar: [
        { alvo: { css: 'div.space-y-1:has(label:has-text("Valor")) input[type=number]', dentro: 'dialog' }, legenda: 'R$ 289,90' },
        { alvo: { papel: 'button', nome: 'Salvar', exato: true, dentro: 'dialog' }, legenda: 'Salvar' },
      ],
      depois: [{ tipo: 'clicar', alvo: { papel: 'button', nome: 'Salvar', exato: true, dentro: 'dialog' }, espera: 4000 }],
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
  ],
};
