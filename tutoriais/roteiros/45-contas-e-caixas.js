// Contas e caixas feito DE VERDADE na Demonstração (pedido do dono, 27/11/2026): transfere R$ 200 de uma conta
// para outra (as duas primeiras contas da Demonstração, que o próprio formulário já sugere), mostra o movimento no
// extrato e confere um caixa fechado (aba "A conferir"). Valores fictícios.
module.exports = {
  id: 'contas-e-caixas',
  ordem: 45,
  grupo: 'Financeiro',
  titulo: 'Saldo das contas e conferência dos caixas',
  gravaDados: true,
  valoresReais: true, // R$ 200 do começo ao fim
  manter: ['200,00', 'Depósito do caixa no banco'],
  assunto: { chave: ['saldo', 'conta bancaria', 'transferir', 'transferencia', 'ajuste de saldo', 'conferir caixa', 'conferencia'], acoes: ['ver', 'transferir', 'ajustar', 'conferir', 'movimentar', 'como'], rotas: ['/financeiro/contas', '/financeiro/caixas'] },
  resumo: 'Veja o saldo de cada banco e caixa, transfira entre contas e confira os caixas fechados.',
  fala: 'Oi! Aqui é o Thiago, da Thiago Informática. Neste vídeo eu vou te mostrar o saldo de cada conta, fazer uma transferência de verdade entre elas e conferir um caixa fechado. Bora lá!',
  antesDeComecar: 'Para conferir caixa, ter um caixa fechado e a conferência ligada em Configurações › PDV › Fechamento de caixa.',
  passos: [
    {
      ir: '/financeiro/contas',
      espera: 6000,
      titulo: 'Saldo de cada conta',
      texto: 'No menu, clica em Financeiro, Banco e organização, Contas. Cada cartão é uma conta, banco, cofre, com o saldo, as entradas e as saídas do período.',
      marcar: [{ alvo: { papel: 'button', nome: 'Ver detalhes' }, legenda: 'Ver detalhes' }],
    },
    {
      antes: [{ tipo: 'clicar', alvo: { papel: 'button', nome: 'Movimentar', exato: true }, seguro: true, espera: 1800 }],
      titulo: 'Movimentar: transferir ou ajustar',
      texto: 'Clica em Movimentar. Aqui tem três jeitos: Transferir, de uma conta pra outra, Ajustar mais, e Ajustar menos, pra corrigir o saldo. Vamos transferir.',
      marcar: [
        { alvo: { papel: 'button', nome: 'Transferir', dentro: 'dialog' }, legenda: 'Transferir' },
        { alvo: { papel: 'button', nome: 'Ajustar +', dentro: 'dialog' }, legenda: 'Ajustar +' },
        { alvo: { papel: 'button', nome: 'Ajustar −', dentro: 'dialog' }, legenda: 'Ajustar −' },
      ],
    },
    {
      antes: [
        { tipo: 'clicar', alvo: { papel: 'button', nome: 'Transferir', dentro: 'dialog' }, seguro: true, espera: 800 },
        { tipo: 'preencher', alvo: { css: 'input[inputmode="decimal"]', dentro: 'dialog' }, valor: '200,00', espera: 600 },
        { tipo: 'escolher', alvo: { campo: 'Motivo', dentro: 'dialog' }, valor: 'Depósito', espera: 600 },
        { tipo: 'preencher', alvo: { placeholder: 'Explique brevemente a movimentação', dentro: 'dialog' }, valor: 'Depósito do caixa no banco', espera: 800 },
      ],
      titulo: 'De onde, para onde e quanto',
      texto: 'Escolhe a conta de origem, a de destino e o valor, aqui duzentos reais. Coloca o motivo, Depósito, e uma observação.',
      marcar: [
        { alvo: { campo: 'Conta de origem', dentro: 'dialog' }, legenda: 'Sai daqui' },
        { alvo: { campo: 'Conta de destino', dentro: 'dialog' }, legenda: 'Entra aqui' },
        { alvo: { css: 'input[inputmode="decimal"]', dentro: 'dialog' }, legenda: 'R$ 200' },
      ],
    },
    {
      titulo: 'Confirme',
      texto: 'Clica em Confirmar. A transferência fica no extrato das duas contas e não entra no DRE, porque o dinheiro só mudou de lugar.',
      marcar: [{ alvo: { papel: 'button', nome: 'Confirmar', exato: true, dentro: 'dialog' }, legenda: 'Confirmar' }],
      depois: [{ tipo: 'clicar', alvo: { papel: 'button', nome: 'Confirmar', exato: true, dentro: 'dialog' }, aguardarFechar: true, espera: 3000 }],
    },
    {
      antes: [
        { tipo: 'clicar', alvo: { papel: 'button', nome: 'Ver detalhes' }, seguro: true, espera: 2500 },
        { tipo: 'esperar', alvo: { texto: 'Depósito do caixa no banco', dentro: 'dialog' }, espera: 800 },
      ],
      titulo: 'O movimento no extrato',
      texto: 'Clicando em Ver detalhes da conta, aparece cada movimento, com a entrada, a saída e o saldo. Olha a transferência aqui.',
      marcar: [{ alvo: { css: 'tr:has-text("Transferência")', dentro: 'dialog' }, legenda: 'Transferência' }],
      depois: [{ tipo: 'clicar', alvo: { papel: 'button', nome: 'Fechar', exato: true, dentro: 'dialog' }, seguro: true, espera: 1000 }],
      dica: 'Lançou errado? Clique no olhinho do movimento e em "Estornar movimentação".',
    },
    {
      ir: '/financeiro/caixas',
      espera: 6000,
      antes: [{ tipo: 'clicar', alvo: { papel: 'button', nome: /A conferir/ }, seguro: true, espera: 2000 }],
      titulo: 'Caixas a conferir',
      texto: 'Agora os caixas. No menu, clica em Financeiro, Caixas e conferência. Tem os abertos, os que faltam conferir e os fechados. Clica em A conferir e depois no caixa.',
      marcar: [{ alvo: { css: 'button:has-text("👤")' }, legenda: 'Caixa fechado' }],
      depois: [{ tipo: 'clicar', alvo: { css: 'button:has-text("👤")' }, seguro: true, espera: 2500 }],
    },
    {
      titulo: 'Confira forma por forma',
      texto: 'Aparece, pra cada forma de pagamento, o que o sistema esperava e o que o caixa contou. Se um Pix foi lançado como dinheiro, clica em Ajustar, coloca o valor certo e o motivo.',
      marcar: [{ alvo: { papel: 'button', nome: 'Ajustar', exato: true, dentro: '[aria-label="Conferência do caixa"]' }, legenda: 'Ajustar' }],
    },
    {
      titulo: 'Marque como conferido',
      texto: 'Bateu tudo? Clica em Conferido. Fica gravado quem conferiu e quando.',
      marcar: [{ alvo: { papel: 'button', nome: /Conferido|Salvar conferência/, dentro: '[aria-label="Conferência do caixa"]' }, legenda: 'Conferido' }],
      depois: [{ tipo: 'clicar', alvo: { papel: 'button', nome: /Conferido|Salvar conferência/, dentro: '[aria-label="Conferência do caixa"]' }, espera: 3000 }],
    },
    {
      antes: [{ tipo: 'clicar', alvo: { papel: 'button', nome: /Fechados/ }, seguro: true, espera: 2500 }],
      titulo: 'Caixa conferido',
      texto: 'E nos Fechados o caixa já aparece com Conferido, e embaixo tem as diferenças de cada operador no período.',
      marcar: [{ alvo: { texto: '✔ Conferido', exato: true }, legenda: 'Conferido' }],
    },
  ],
};
