// Recorrências: refeito em 20/11/2026 com a regra do dono. Na empresa de DEMONSTRAÇÃO o robô lança de verdade
// (dados fictícios) e mostra as contas geradas em Contas a Pagar. Em outra empresa o capturar.js não deixa salvar.
module.exports = {
  id: 'recorrencias',
  ordem: 43,
  grupo: 'Financeiro',
  titulo: 'Contas que se repetem todo mês',
  gravaDados: true,
  resumo: 'Aluguel, salário, internet: cadastre uma vez e o sistema lança os próximos 12 meses.',
  passos: [
    {
      ir: '/financeiro/recorrencias',
      titulo: 'Clique em "Nova recorrência"',
      texto: 'No menu, clique em Financeiro › Recorrências. Para uma conta a pagar, clique em Nova recorrência. Para algo que você recebe todo mês, clique em A receber.',
      marcar: [
        { alvo: { papel: 'button', nome: 'A receber', exato: true }, legenda: 'Recebo todo mês' },
        { alvo: { papel: 'button', nome: 'Nova recorrência' }, legenda: 'Pago todo mês' },
      ],
      depois: [{ tipo: 'clicar', alvo: { papel: 'button', nome: 'Nova recorrência' }, espera: 1500 }],
    },
    {
      antes: [{ tipo: 'preencher', alvo: { placeholder: 'Ex.: Aluguel, Salário, Energia', dentro: 'dialog' }, valor: 'Aluguel da loja', espera: 1200 }],
      titulo: 'Nome e plano de contas',
      texto: 'Dê um nome, como Aluguel da loja. O plano de contas já vem sugerido pelo nome; é só conferir.',
      marcar: [{ alvo: { placeholder: 'Ex.: Aluguel, Salário, Energia', dentro: 'dialog' }, legenda: 'Nome' }],
    },
    {
      antes: [
        { tipo: 'clicar', alvo: { papel: 'button', nome: 'Outros', exato: true, dentro: 'dialog' }, espera: 700 },
        { tipo: 'preencher', alvo: { placeholder: 'Nome (opcional), ex.: Cemig, Condomínio', dentro: 'dialog' }, valor: 'Imobiliária Exemplo' },
      ],
      titulo: 'Para quem',
      texto: 'Escolha se é pra um funcionário, um fornecedor ou outros, como a imobiliária ou a companhia de energia.',
      marcar: [{ alvo: { papel: 'button', nome: 'Outros', exato: true, dentro: 'dialog' }, legenda: 'Para quem' }],
    },
    {
      antes: [
        { tipo: 'preencher', alvo: { css: 'input[placeholder="0,00"]', dentro: 'dialog' }, valor: '1800' },
        { tipo: 'preencher', alvo: { css: 'input[type="number"][max="31"]', dentro: 'dialog' }, valor: '10', espera: 900 },
      ],
      titulo: 'Valor e dia do vencimento',
      texto: 'Informe o valor por mês e o dia que vence. O quadro azul mostra quantas contas vão ser lançadas.',
      marcar: [
        { alvo: { css: 'input[placeholder="0,00"]', dentro: 'dialog' }, legenda: 'Valor por mês' },
        { alvo: { css: 'input[type="number"][max="31"]', dentro: 'dialog' }, legenda: 'Dia' },
      ],
    },
    {
      titulo: 'Clique em "Criar e lançar"',
      texto: 'Agora é só clicar em Criar e lançar. Pronto: o sistema já deixa as contas dos próximos meses lançadas.',
      marcar: [{ alvo: { papel: 'button', nome: 'Criar e lançar', dentro: 'dialog' } }],
      depois: [{ tipo: 'clicar', alvo: { papel: 'button', nome: 'Criar e lançar', dentro: 'dialog' }, espera: 3500 }],
      dica: 'O valor mudou? Use "Alterar": vale de hoje pra frente, sem mexer nas contas já pagas.',
    },
    {
      ir: '/financeiro/contas-pagar',
      antes: [{ tipo: 'preencher', alvo: { placeholder: 'Nome' }, valor: 'Aluguel da loja', espera: 2500 }],
      titulo: 'As contas já estão lançadas',
      texto: 'Olha aí em Contas a Pagar: uma conta pra cada mês, com o vencimento certinho. Quando pagar, é só dar baixa.',
      marcar: [{ alvo: { texto: /Aluguel da loja/ }, legenda: 'Uma por mês' }],
    },
  ],
};
