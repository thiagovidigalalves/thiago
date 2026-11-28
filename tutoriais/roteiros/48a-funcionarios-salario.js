// Funcionários (área nova, 20/11/2026): cadastrar salário e bonificação. Na Demonstração; a Mayara é fictícia.
module.exports = {
  id: 'funcionarios-salario',
  ordem: 48.1,
  grupo: 'Funcionários',
  titulo: 'Funcionários: cadastrar salário e bonificação',
  gravaDados: true,
  valoresReais: true, // valores da Demonstração (fictícios e coerentes): não inventa outros
  manter: ['Mayara', 'JOAO PAULO', 'Jonathan', 'Rafael Arantes', 'Rafael', '2.200,00', '2200', '400,00'],
  assunto: { chave: ['funcionario', 'funcionarios', 'salario', 'bonificacao', 'bonus', 'folha'], acoes: ['cadastrar', 'colocar', 'lancar', 'configurar', 'como', 'funciona', 'mudar'], rotas: ['/cadastros/usuarios', '/funcionarios/configuracoes'] },
  resumo: 'Marque quem é funcionário, coloque salário, dia de pagamento e bonificação: o sistema lança tudo no Contas a pagar.',
  fala: 'Oi! Aqui é o Thiago, da Thiago Informática. Agora o sistema tem a área de Funcionários. Neste vídeo eu vou te mostrar como colocar o salário e a bonificação de cada funcionário, pra tudo cair sozinho no Contas a pagar. Bora lá!',
  passos: [
    {
      ir: '/cadastros/usuarios',
      titulo: 'Abra Usuários e edite o funcionário',
      texto: 'Vai em Cadastros, Usuários, e clica no lápis de editar do funcionário. Aqui eu vou usar a Mayara.',
      marcar: [{ alvo: { css: 'tr:has-text("Mayara") button[title="Editar"]' }, legenda: 'Editar' }],
      depois: [{ tipo: 'clicar', alvo: { css: 'tr:has-text("Mayara") button[title="Editar"]' }, espera: 2500 }],
    },
    {
      antes: [{ tipo: 'clicar', alvo: { papel: 'tab', nome: '💼 Funcionário', dentro: 'dialog' }, espera: 1500 }],
      titulo: 'Aba "💼 Funcionário"',
      texto: 'Clica na aba Funcionário e marca: É funcionário. Pronto, ele já aparece no menu Funcionários.',
      marcar: [
        { alvo: { papel: 'tab', nome: '💼 Funcionário', dentro: 'dialog' }, legenda: 'Aba Funcionário' },
        { alvo: { texto: 'É funcionário (recebe salário pela empresa)', dentro: 'dialog' }, legenda: 'É funcionário' },
      ],
    },
    {
      titulo: 'Salário e dia de pagamento',
      texto: 'Coloca o salário da carteira, o valor bruto, e o dia de pagamento. Se deixar o dia em branco, vale o padrão da empresa, que é dia cinco.',
      marcar: [
        { alvo: { campo: 'Salário da carteira (bruto, R$)', dentro: 'dialog' }, legenda: 'Salário bruto' },
        { alvo: { campo: 'Dia de pagamento', dentro: 'dialog' }, legenda: 'Dia (padrão dia 5)' },
      ],
    },
    {
      titulo: 'Desconto de INSS',
      texto: 'Logo abaixo vem o desconto de INSS: no automático ele segue a tabela oficial, mas dá pra pôr um percentual, um valor fixo ou não descontar. O que for descontado vira a guia do INSS no Contas a pagar.',
      marcar: [{ alvo: { papel: 'button', nome: 'Automático (tabela oficial)', exato: true, dentro: 'dialog' }, legenda: 'INSS' }],
    },
    {
      titulo: 'Como recebe a comissão',
      texto: 'E aqui você escolhe como recebe a comissão: se ela soma no salário, ou se o salário é o mínimo garantido e a comissão só entra no que passar dele.',
      marcar: [{ alvo: { papel: 'button', nome: /^Salário \+ comissão/, dentro: 'dialog' }, legenda: 'Soma' }, { alvo: { papel: 'button', nome: /^Salário é o mínimo/, dentro: 'dialog' }, legenda: 'Mínimo garantido' }],
    },
    {
      titulo: 'Bonificação do mês',
      texto: 'Na bonificação você escolhe: o padrão da empresa, um valor só dele, ou não tem. A bonificação cai conforme as advertências do mês.',
      marcar: [
        { alvo: { papel: 'button', nome: /Padrão da empresa/, dentro: 'dialog' }, legenda: 'Padrão da empresa' },
        { alvo: { papel: 'button', nome: 'Valor só dele', exato: true, dentro: 'dialog' }, legenda: 'Só dele' },
        { alvo: { papel: 'button', nome: 'Não tem', exato: true, dentro: 'dialog' }, legenda: 'Não tem' },
      ],
    },
    {
      titulo: 'Salve: vira conta a pagar todo mês',
      texto: 'Clica em Salvar, lá embaixo. O salário e a bonificação viram conta no Contas a pagar, sempre doze meses pra frente, e entram no DRE do mês em que vencem. Mudou o valor ou o dia? Vale só daqui pra frente; o que já foi pago não muda.',
      marcar: [
        { alvo: { texto: /Todo mês: salário/, dentro: 'dialog' }, legenda: '12 meses no Contas a pagar' },
        { alvo: { papel: 'button', nome: 'Salvar', exato: true, dentro: 'dialog' }, legenda: 'Salvar' },
      ],
      depois: [{ tipo: 'clicar', alvo: { papel: 'button', nome: 'Salvar', exato: true, dentro: 'dialog' }, espera: 3000 }],
    },
    {
      ir: '/funcionarios/configuracoes',
      titulo: 'O padrão da empresa',
      texto: 'E em Funcionários, Configurações, fica o padrão da empresa: o dia de pagamento e as regras da bonificação. Só o administrador mexe aqui.',
      marcar: [{ alvo: { papel: 'heading', nome: 'Configurações dos funcionários' } }],
    },
  ],
};
