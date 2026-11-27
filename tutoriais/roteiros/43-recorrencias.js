// Recorrências: refeito em 20/11/2026 com a regra do dono. Na empresa de DEMONSTRAÇÃO o robô lança de verdade
// (dados fictícios) e mostra as contas geradas em Contas a Pagar. Em outra empresa o capturar.js não deixa salvar.
// 27/11/2026: acrescentada a recorrência A RECEBER (mensalidade da cliente fictícia "Joana Exemplo", sem telefone),
// com o plano de contas escolhido na mão, e a lista de recorrências com os botões Ver contas / Alterar / Encerrar.
module.exports = {
  id: 'recorrencias',
  ordem: 43,
  grupo: 'Financeiro',
  titulo: 'Contas que se repetem todo mês',
  gravaDados: true,
  manter: ['Imobiliária Exemplo', 'Aluguel da loja', '1.800,00', '1800', 'Joana Exemplo', 'Mensalidade de manutenção', '99,90', '99.90'], // o que o robô lança: não vira nome/valor inventado
  valoresReais: true,
  assunto: { chave: ['recorrencia', 'recorrencias', 'conta fixa', 'todo mes', 'mensalidade', 'aluguel'], acoes: ['lançar', 'cadastrar', 'criar', 'repetir', 'como'], rotas: ['/financeiro/recorrencias'] },
  resumo: 'Aluguel, salário, internet, mensalidade: cadastre uma vez e o sistema lança os próximos 12 meses.',
  fala: 'Oi! Aqui é o Thiago, da Thiago Informática. Neste vídeo eu vou cadastrar de verdade uma conta que se repete todo mês, o aluguel da loja, e também uma mensalidade que eu recebo de um cliente. Bora lá!',
  passos: [
    {
      ir: '/financeiro/recorrencias',
      titulo: 'Clique em "Nova recorrência"',
      texto: 'No menu, clica em Financeiro, Banco e organização, Recorrências. Pra uma conta que você paga todo mês, é Nova recorrência. Pra algo que você recebe todo mês, é A receber. Começando pela que eu pago.',
      marcar: [
        { alvo: { papel: 'button', nome: 'A receber', exato: true }, legenda: 'Recebo todo mês' },
        { alvo: { papel: 'button', nome: 'Nova recorrência' }, legenda: 'Pago todo mês' },
      ],
      depois: [{ tipo: 'clicar', alvo: { papel: 'button', nome: 'Nova recorrência' }, espera: 1500 }],
    },
    {
      antes: [{ tipo: 'preencher', alvo: { placeholder: 'Ex.: Aluguel, Salário, Energia', dentro: 'dialog' }, valor: 'Aluguel da loja', espera: 1200 }],
      titulo: 'Nome e plano de contas',
      texto: 'Dá um nome, como Aluguel da loja. O plano de contas já vem sugerido pelo nome, é só conferir.',
      marcar: [{ alvo: { placeholder: 'Ex.: Aluguel, Salário, Energia', dentro: 'dialog' }, legenda: 'Nome' }],
    },
    {
      antes: [
        { tipo: 'clicar', alvo: { papel: 'button', nome: 'Outros', exato: true, dentro: 'dialog' }, espera: 700 },
        { tipo: 'preencher', alvo: { placeholder: 'Nome (opcional), ex.: Cemig, Condomínio', dentro: 'dialog' }, valor: 'Imobiliária Exemplo' },
      ],
      titulo: 'Para quem',
      texto: 'Escolhe se é pra um funcionário, um fornecedor ou outros, como a imobiliária ou a companhia de energia.',
      marcar: [{ alvo: { papel: 'button', nome: 'Outros', exato: true, dentro: 'dialog' }, legenda: 'Para quem' }],
    },
    {
      antes: [
        { tipo: 'preencher', alvo: { css: 'input[placeholder="0,00"]', dentro: 'dialog' }, valor: '1800' },
        { tipo: 'preencher', alvo: { css: 'input[type="number"][max="31"]', dentro: 'dialog' }, valor: '10', espera: 900 },
      ],
      titulo: 'Valor e dia do vencimento',
      texto: 'Coloca o valor por mês e o dia que vence. O quadro azul mostra quantas contas vão ser lançadas.',
      marcar: [
        { alvo: { css: 'input[placeholder="0,00"]', dentro: 'dialog' }, legenda: 'Valor por mês' },
        { alvo: { css: 'input[type="number"][max="31"]', dentro: 'dialog' }, legenda: 'Dia' },
      ],
    },
    {
      titulo: 'Clique em "Criar e lançar"',
      texto: 'Agora é só clicar em Criar e lançar. Pronto: o sistema já deixa as contas dos próximos meses lançadas.',
      marcar: [{ alvo: { papel: 'button', nome: 'Criar e lançar', dentro: 'dialog' } }],
      depois: [{ tipo: 'clicar', alvo: { papel: 'button', nome: 'Criar e lançar', dentro: 'dialog' }, aguardarFechar: true, espera: 3500 }],
    },
    {
      antes: [{ tipo: 'preencher', alvo: { placeholder: 'Buscar recorrência, pessoa ou plano de contas...' }, valor: 'Aluguel da loja', espera: 2000 }],
      titulo: 'A recorrência está na lista',
      texto: 'Pronto, o aluguel já está na lista, com o dia e a próxima conta. Do lado tem: Ver contas, Alterar, que vale de hoje pra frente sem mexer no que já foi pago, e Encerrar, quando parar de pagar.',
      marcar: [
        { alvo: { titulo: 'Ver contas' }, legenda: 'Ver contas' },
        { alvo: { titulo: 'Alterar (vale de hoje para frente)' }, legenda: 'Alterar' },
        { alvo: { titulo: 'Encerrar (para de lançar; continua na lista)' }, legenda: 'Encerrar' },
      ],
    },
    {
      antes: [
        { tipo: 'clicar', alvo: { papel: 'button', nome: 'A receber', exato: true }, seguro: true, espera: 1500 },
        { tipo: 'preencher', alvo: { placeholder: 'Ex.: Mensalidade, Aluguel da sala', dentro: 'dialog' }, valor: 'Mensalidade de manutenção', espera: 1200 },
        { tipo: 'clicar', alvo: { papel: 'combobox', nome: 'Busque o plano de contas...', dentro: 'dialog' }, seguro: true, espera: 800 },
        { tipo: 'preencher', alvo: { placeholder: 'Digite para buscar...' }, valor: 'Serviços', espera: 1000 },
        { tipo: 'clicar', alvo: { papel: 'option', nome: /^Serviços$/ }, seguro: true, espera: 1000 },
      ],
      titulo: 'Recebe todo mês? A receber',
      texto: 'Agora uma que eu recebo. Clica em A receber e dá o nome, aqui Mensalidade de manutenção. Se o plano de contas não vier sozinho, clica nele e escolhe, aqui Serviços.',
      marcar: [
        { alvo: { placeholder: 'Ex.: Mensalidade, Aluguel da sala', dentro: 'dialog' }, legenda: 'Nome' },
        { alvo: { papel: 'combobox', nome: /Serviços|Busque o plano/, dentro: 'dialog' }, legenda: 'Plano de contas' },
      ],
    },
    {
      antes: [
        { tipo: 'preencher', alvo: { placeholder: 'Digite o nome do cliente...', dentro: 'dialog' }, valor: 'Joana Exemplo', espera: 2500 },
        { tipo: 'clicar', alvo: { texto: 'Joana Exemplo', exato: true, dentro: 'dialog' }, seguro: true, espera: 1200 },
        { tipo: 'preencher', alvo: { css: 'input[placeholder="0,00"]', dentro: 'dialog' }, valor: '99.90' },
        { tipo: 'preencher', alvo: { css: 'input[type="number"][max="31"]', dentro: 'dialog' }, valor: '15', espera: 900 },
      ],
      titulo: 'Cliente, valor e dia',
      texto: 'Em Para quem, busca o cliente. Coloca o valor por mês e o dia que vence, e clica em Criar e lançar.',
      marcar: [
        { alvo: { css: 'input[placeholder="0,00"]', dentro: 'dialog' }, legenda: 'R$ 99,90 por mês' },
        { alvo: { papel: 'button', nome: 'Criar e lançar', dentro: 'dialog' }, legenda: 'Criar e lançar' },
      ],
      depois: [{ tipo: 'clicar', alvo: { papel: 'button', nome: 'Criar e lançar', dentro: 'dialog' }, aguardarFechar: true, espera: 3500 }],
    },
    {
      ir: '/financeiro/contas-receber',
      espera: 6000,
      antes: [
        { tipo: 'clicar', alvo: { papel: 'button', nome: 'Todas', exato: true }, seguro: true, espera: 1500 },
        { tipo: 'preencher', alvo: { placeholder: 'Nome do cliente' }, valor: 'Joana Exemplo', espera: 3500 },
      ],
      titulo: 'As mensalidades no Contas a receber',
      texto: 'E no Contas a receber as mensalidades já estão lançadas, uma por mês, com a etiqueta Recorrência. Quando a cliente pagar, é só dar baixa no caixa.',
      marcar: [{ alvo: { css: 'tbody tr:has-text("Mensalidade de manutenção")' }, legenda: 'Uma por mês' }],
    },
    {
      ir: '/financeiro/contas-pagar',
      espera: 6000,
      antes: [
        { tipo: 'clicar', alvo: { papel: 'button', nome: 'Todas', exato: true }, seguro: true, espera: 1500 },
        { tipo: 'preencher', alvo: { placeholder: 'Nome' }, valor: 'Imobiliária Exemplo', espera: 3000 },
      ],
      titulo: 'As contas já estão lançadas',
      texto: 'E em Contas a Pagar, o aluguel também: uma conta pra cada mês, com o vencimento certinho. Quando pagar, é só clicar em Pagar.',
      marcar: [{ alvo: { css: 'tbody tr:has-text("Imobiliária Exemplo")' }, legenda: 'Uma por mês' }],
    },
  ],
};
