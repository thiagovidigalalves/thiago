// Funcionários: lançar vale e fazer o acerto do mês. Na Demonstração o robô lança um vale de verdade (fictício).
const JANELA = 'div.fixed.inset-0'; // janelas da área Funcionários
module.exports = {
  id: 'funcionarios-vale-acerto',
  ordem: 48.2,
  grupo: 'Funcionários',
  titulo: 'Funcionários: lançar vale e fazer o acerto do mês',
  gravaDados: true,
  valoresReais: true, // valores da Demonstração (fictícios e coerentes): não inventa outros
  manter: ['Mayara', 'JOAO PAULO', 'Jonathan', 'Rafael Arantes', 'Rafael'],
  assunto: { chave: ['vale', 'vales', 'adiantamento', 'acerto', 'pagamento', 'salario', 'recibo', 'funcionario'], acoes: ['lancar', 'pagar', 'fazer', 'dar', 'imprimir', 'como', 'funciona'], rotas: ['/funcionarios', '/funcionarios/pagamentos'] },
  resumo: 'Lance os vales do mês, veja quanto falta pagar e faça o acerto com recibo.',
  fala: 'Oi! Aqui é o Thiago, da Thiago Informática. Neste vídeo eu vou te mostrar como lançar um vale pro funcionário e fazer o acerto do mês, com recibo e tudo. Bora lá!',
  passos: [
    {
      ir: '/funcionarios',
      espera: 6000,
      titulo: 'O Painel dos funcionários',
      texto: 'Em Funcionários, o Painel já abre no próximo pagamento. Aqui em cima mostra o total do mês, o que já foi pago, os vales e o que falta pagar.',
      marcar: [
        { alvo: { texto: /^Pagamento / }, legenda: 'Pagamento do mês' },
        { alvo: { texto: 'Falta pagar', exato: true }, legenda: 'Falta pagar' },
      ],
    },
    {
      titulo: 'O cartão de cada funcionário',
      texto: 'Cada funcionário tem um cartão: salário, mais bonificação, mais comissão, menos os vales. Embaixo aparece quanto falta pagar pra ele.',
      marcar: [{ alvo: { css: 'button:has-text("💵 Lançar vale")' }, legenda: 'Lançar vale' }],
    },
    {
      antes: [
        { tipo: 'clicar', alvo: { papel: 'button', nome: '💵 Lançar vale' }, seguro: true, espera: 1800 }, // só abre a janela
        { tipo: 'preencher', alvo: { css: 'input[placeholder="0,00"]', dentro: JANELA }, valor: '100', espera: 900 },
      ],
      titulo: 'Lance o vale',
      texto: 'Clica em Lançar vale, coloca o valor, a forma e de qual conta saiu o dinheiro. O sistema mostra como vai abater: primeiro do salário, depois da bonificação e depois da comissão.',
      marcar: [
        { alvo: { css: 'input[placeholder="0,00"]', dentro: JANELA }, legenda: 'Valor' },
        { alvo: { papel: 'button', nome: 'Lançar vale', exato: true, dentro: JANELA }, legenda: 'Lançar' },
      ],
      depois: [{ tipo: 'clicar', alvo: { papel: 'button', nome: 'Lançar vale', exato: true, dentro: JANELA }, espera: 3500 }],
    },
    {
      antes: [{ tipo: 'clicar', alvo: { papel: 'button', nome: '✔ Fazer o acerto' }, espera: 1800 }],
      titulo: 'Fazer o acerto',
      texto: 'No dia do pagamento, clica em Fazer o acerto: ele já vem com o valor que falta, e é só clicar em Pagar. É a mesma baixa do Contas a pagar: sai do caixa no dia e aparece no Fluxo de caixa.',
      marcar: [
        { alvo: { css: 'input[placeholder="0,00"]', dentro: JANELA }, legenda: 'O que falta' },
        { alvo: { papel: 'button', nome: 'Pagar', exato: true, dentro: JANELA }, legenda: 'Pagar' },
      ],
      depois: [{ tipo: 'clicar', alvo: { papel: 'button', nome: 'Cancelar', exato: true, dentro: JANELA }, espera: 1200 }],
    },
    {
      antes: [{ tipo: 'clicar', alvo: { papel: 'button', nome: 'Ver tudo / recibo' }, espera: 1800 }],
      titulo: 'Recibo',
      texto: 'Em Ver tudo e recibo aparece cada conta do mês. Dá pra imprimir o recibo pro funcionário assinar ou mandar no WhatsApp dele.',
      marcar: [
        { alvo: { papel: 'button', nome: 'Imprimir recibo', dentro: JANELA }, legenda: 'Imprimir' },
        { alvo: { papel: 'button', nome: 'WhatsApp', exato: true, dentro: JANELA }, legenda: 'WhatsApp' },
      ],
      depois: [{ tipo: 'clicar', alvo: { rotulo: 'Fechar', dentro: JANELA }, espera: 1200 }],
    },
    {
      ir: '/funcionarios/pagamentos',
      espera: 6000,
      titulo: 'Tela de Pagamentos',
      texto: 'E em Funcionários, Pagamentos, você filtra por funcionário, tipo e situação, vê os totais e a lista dos vales. Ainda dá pra exportar pro Excel.',
      marcar: [
        { alvo: { rotulo: 'Funcionário' }, legenda: 'Filtros' },
        { alvo: { papel: 'button', nome: 'Excel', exato: true }, legenda: 'Excel' },
      ],
    },
  ],
};
