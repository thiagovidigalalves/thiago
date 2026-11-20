// Funcionários: advertências e faltas. Na Demonstração o robô lança uma advertência de verdade (fictícia).
const JANELA = 'div.fixed.inset-0';
module.exports = {
  id: 'funcionarios-advertencias',
  ordem: 48.4,
  grupo: 'Funcionários',
  titulo: 'Funcionários: advertências e faltas',
  gravaDados: true,
  valoresReais: true, // valores da Demonstração (fictícios e coerentes): não inventa outros
  manter: ['Mayara', 'JOAO PAULO', 'Jonathan', 'Rafael Arantes', 'Rafael', 'Chegou 30 minutos atrasado sem avisar.'],
  assunto: { chave: ['advertencia', 'advertencias', 'falta', 'faltas', 'atraso', 'bonificacao', 'funcionario'], acoes: ['lancar', 'dar', 'registrar', 'cancelar', 'imprimir', 'como', 'funciona'], rotas: ['/funcionarios/advertencias', '/funcionarios/configuracoes'] },
  resumo: 'Registre advertências e faltas: a bonificação do mês cai sozinha, direto no Contas a pagar.',
  fala: 'Oi! Aqui é o Thiago, da Thiago Informática. Neste vídeo eu vou te mostrar como registrar uma advertência ou uma falta, e como isso mexe sozinho na bonificação do funcionário. Bora lá!',
  passos: [
    {
      ir: '/funcionarios/advertencias',
      espera: 6000,
      titulo: 'Advertências e faltas',
      texto: 'Em Funcionários, Advertências, cada cartão mostra as bolinhas das advertências do mês e quanto a bonificação já caiu.',
      marcar: [{ alvo: { papel: 'button', nome: 'Nova advertência / falta' }, legenda: 'Nova' }],
    },
    {
      antes: [
        { tipo: 'clicar', alvo: { papel: 'button', nome: 'Nova advertência / falta' }, espera: 1800 },
        { tipo: 'escolher', alvo: { css: 'select', dentro: JANELA }, valor: 'Rafael Arantes' },
        { tipo: 'clicar', alvo: { papel: 'button', nome: 'Atraso', exato: true, dentro: JANELA }, espera: 600 },
        { tipo: 'preencher', alvo: { css: 'textarea', dentro: JANELA }, valor: 'Chegou 30 minutos atrasado sem avisar.' },
      ],
      titulo: 'Lance a advertência',
      texto: 'Clica em Nova advertência ou falta, escolhe o funcionário, o tipo, como atraso, uso de celular ou falta, a data e escreve o que aconteceu. Aí é só clicar em Lançar.',
      marcar: [
        { alvo: { papel: 'button', nome: 'Atraso', exato: true, dentro: JANELA }, legenda: 'Tipo' },
        { alvo: { css: 'textarea', dentro: JANELA }, legenda: 'O que aconteceu' },
        { alvo: { papel: 'button', nome: 'Lançar', exato: true, dentro: JANELA }, legenda: 'Lançar' },
      ],
      depois: [{ tipo: 'clicar', alvo: { papel: 'button', nome: 'Lançar', exato: true, dentro: JANELA }, espera: 3500 }],
    },
    {
      titulo: 'A bonificação cai sozinha',
      texto: 'No padrão é assim: até uma advertência, quatrocentos reais; com duas, trezentos; três, duzentos; quatro, cem; cinco ou mais, zera. Falta sem atestado também zera. A advertência de novembro desconta na bonificação paga em dezembro, direto no Contas a pagar.',
      marcar: [{ alvo: { texto: /Bonificação: R\$/ }, legenda: 'Bonificação do mês' }],
    },
    {
      titulo: 'Imprimir, WhatsApp e ciente',
      texto: 'Dá pra imprimir pro funcionário assinar, mandar no WhatsApp e marcar que ele ficou ciente. Advertência não se apaga: só o administrador cancela, dizendo o motivo.',
      marcar: [
        { alvo: { papel: 'button', nome: 'Marcar ciente', exato: true }, legenda: 'Ciente' },
        { alvo: { papel: 'button', nome: 'WhatsApp', exato: true }, legenda: 'WhatsApp' },
      ],
    },
    {
      ir: '/funcionarios/configuracoes',
      espera: 5000,
      titulo: 'As regras são suas',
      texto: 'Em Configurações você muda as regras: a tabela da bonificação, a falta, o limite e os tipos de advertência com o peso de cada um. Só o administrador mexe aqui.',
      marcar: [{ alvo: { papel: 'button', nome: '+ tipo', exato: true }, legenda: 'Tipos e pesos' }],
    },
  ],
};
