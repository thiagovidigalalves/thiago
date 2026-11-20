// Funcionários: relatórios, 13º e férias (só mostra as janelas; nada é lançado).
const JANELA = 'div.fixed.inset-0';
module.exports = {
  id: 'funcionarios-relatorios-13-ferias',
  ordem: 48.5,
  grupo: 'Funcionários',
  titulo: 'Funcionários: relatórios, 13º e férias',
  valoresReais: true, // valores da Demonstração (fictícios e coerentes): não inventa outros
  manter: ['Mayara', 'JOAO PAULO', 'Jonathan', 'Rafael Arantes', 'Rafael'],
  assunto: { chave: ['13', 'decimo', 'ferias', 'relatorio', 'custo', 'equipe', 'funcionario'], acoes: ['lancar', 'calcular', 'ver', 'pagar', 'como', 'funciona'], rotas: ['/funcionarios/relatorios', '/funcionarios'] },
  resumo: 'Veja quanto a equipe custa mês a mês e lance o 13º e as férias com a conta pronta.',
  fala: 'Oi! Aqui é o Thiago, da Thiago Informática. Neste vídeo eu vou te mostrar os relatórios dos funcionários e como lançar o décimo terceiro e as férias, com a conta já pronta. Bora lá!',
  passos: [
    {
      ir: '/funcionarios/relatorios',
      espera: 7000,
      titulo: 'Relatórios dos funcionários',
      texto: 'Em Funcionários, Relatórios, os gráficos mostram o custo da equipe mês a mês, por funcionário, e as advertências de cada mês.',
      marcar: [{ alvo: { papel: 'heading', nome: 'Relatórios dos funcionários' } }],
    },
    {
      titulo: 'Conferência com o DRE',
      texto: 'E tem a conferência com o DRE: o que está aqui bate certinho com o DRE, porque é tudo a mesma conta do Contas a pagar.',
      marcar: [{ alvo: { texto: /Conferência com o DRE/ }, legenda: 'Bate com o DRE' }],
    },
    {
      ir: '/funcionarios',
      espera: 6000,
      antes: [{ tipo: 'clicar', alvo: { papel: 'button', nome: '🎁 13º salário' }, espera: 2000 }],
      titulo: '13º salário',
      texto: 'No Painel, o botão décimo terceiro salário já traz a sugestão das duas parcelas: dia trinta de novembro e dia vinte de dezembro. Dá pra mudar o valor antes de lançar no Contas a pagar.',
      marcar: [{ alvo: { papel: 'button', nome: 'Lançar no Contas a pagar', dentro: JANELA }, legenda: 'Lançar' }],
      depois: [{ tipo: 'clicar', alvo: { papel: 'button', nome: 'Voltar', exato: true, dentro: JANELA }, espera: 1200 }],
    },
    {
      antes: [{ tipo: 'clicar', alvo: { papel: 'button', nome: '🏖️ Lançar férias' }, seguro: true, espera: 2000 }],
      titulo: 'Férias',
      texto: 'E no cartão do funcionário tem Lançar férias: você coloca o início e os dias, e o valor já vem calculado, salário mais um terço, vencendo dois dias antes das férias.',
      marcar: [
        { alvo: { css: 'input[type="date"]', dentro: JANELA }, legenda: 'Início' },
        { alvo: { css: 'input[type="number"]', dentro: JANELA }, legenda: 'Dias' },
        { alvo: { papel: 'button', nome: 'Lançar férias', exato: true, dentro: JANELA }, legenda: 'Lançar' },
      ],
      depois: [{ tipo: 'clicar', alvo: { papel: 'button', nome: 'Voltar', exato: true, dentro: JANELA }, espera: 1200 }],
    },
  ],
};
