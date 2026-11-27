// Formas de pagamento feitas DE VERDADE na Demonstração (pedido do dono, 27/11/2026): cadastra a maquininha fictícia
// "Maquininha Exemplo" com as taxas, a forma "Crédito Maquininha Exemplo" ligada a ela e a forma "Pix Banco Exemplo"
// caindo numa conta nova "Banco Exemplo". O "Pix automático pelo banco" depende de banco vinculado: só é mostrado.
module.exports = {
  id: 'formas-de-pagamento',
  ordem: 42,
  grupo: 'Financeiro',
  titulo: 'Configurar formas de pagamento e maquininha',
  gravaDados: true,
  valoresReais: true, // taxas fictícias, coerentes do começo ao fim
  manter: ['Maquininha Exemplo', 'Crédito Maquininha Exemplo', 'Pix Banco Exemplo', 'Banco Exemplo', '1,99', '0,99', '3,49', '4,99'],
  assunto: { chave: ['forma de pagamento', 'formas de pagamento', 'maquininha', 'taxa', 'adquirente', 'pix', 'cartao'], acoes: ['cadastrar', 'configurar', 'colocar', 'criar', 'nova', 'como'], rotas: ['/cadastros/formas-pagamento'] },
  resumo: 'Cadastre a maquininha com as taxas, as formas de pagamento do caixa e em que conta cai o dinheiro.',
  fala: 'Oi! Aqui é o Thiago, da Thiago Informática. Neste vídeo eu vou cadastrar de verdade uma maquininha com as taxas, uma forma de crédito e uma forma de Pix, cada uma caindo na conta certa. Bora lá!',
  passos: [
    {
      ir: '/cadastros/formas-pagamento',
      espera: 6000,
      titulo: 'Abra Formas de pagamento',
      texto: 'No menu, clica em Financeiro, Banco e organização, Formas de pagamento. São as opções que aparecem no caixa na hora de receber. Tem três abas: Formas de pagamento, Adquirentes e Contas.',
      marcar: [
        { alvo: { papel: 'tab', nome: 'Formas de pagamento' }, legenda: 'Formas' },
        { alvo: { papel: 'tab', nome: 'Adquirentes' }, legenda: 'Maquininhas' },
        { alvo: { papel: 'tab', nome: 'Contas' }, legenda: 'Contas' },
      ],
    },
    {
      antes: [
        { tipo: 'clicar', alvo: { papel: 'tab', nome: 'Adquirentes' }, seguro: true, espera: 1500 },
        { tipo: 'clicar', alvo: { papel: 'button', nome: 'Nova adquirente' }, seguro: true, espera: 1500 },
        { tipo: 'preencher', alvo: { placeholder: 'Nome da sua maquininha ou operadora', dentro: 'dialog' }, valor: 'Maquininha Exemplo', espera: 800 },
      ],
      titulo: 'Cadastre a maquininha',
      texto: 'Começa pela maquininha: clica em Adquirentes e depois em Nova adquirente. Coloca o nome da sua maquininha.',
      marcar: [{ alvo: { placeholder: 'Nome da sua maquininha ou operadora', dentro: 'dialog' }, legenda: 'Nome' }],
    },
    {
      antes: [
        { tipo: 'preencher', alvo: { campo: 'Débito · taxa (%)', dentro: 'dialog' }, valor: '1.99', espera: 400 },
        { tipo: 'preencher', alvo: { campo: 'Pix · taxa (%)', dentro: 'dialog' }, valor: '0.99', espera: 400 },
        { tipo: 'preencher', alvo: { campo: '1×', exato: true, dentro: 'dialog' }, valor: '3.49', espera: 400 },
        { tipo: 'preencher', alvo: { campo: '2×', exato: true, dentro: 'dialog' }, valor: '4.99', espera: 800 },
      ],
      titulo: 'As taxas',
      texto: 'Agora as taxas que a maquininha cobra: débito, Pix, e o crédito por parcela, à vista, em duas vezes, e assim por diante. Assim o sistema mostra quanto você recebe de verdade.',
      marcar: [
        { alvo: { campo: 'Débito · taxa (%)', dentro: 'dialog' }, legenda: 'Débito' },
        { alvo: { campo: 'Pix · taxa (%)', dentro: 'dialog' }, legenda: 'Pix' },
        { alvo: { campo: '1×', exato: true, dentro: 'dialog' }, legenda: 'Crédito à vista' },
      ],
    },
    {
      titulo: 'Salve a maquininha',
      texto: 'Em Como registrar o recebimento, o automático já é o recomendado. Clica em Salvar.',
      marcar: [
        { alvo: { campo: 'Como registrar o recebimento', dentro: 'dialog' }, legenda: 'Automático' },
        { alvo: { papel: 'button', nome: 'Salvar', exato: true, dentro: 'dialog' }, legenda: 'Salvar' },
      ],
      depois: [{ tipo: 'clicar', alvo: { papel: 'button', nome: 'Salvar', exato: true, dentro: 'dialog' }, aguardarFechar: true, espera: 2500 }],
    },
    {
      antes: [
        { tipo: 'clicar', alvo: { papel: 'tab', nome: 'Formas de pagamento' }, seguro: true, espera: 1500 },
        { tipo: 'clicar', alvo: { papel: 'button', nome: 'Nova forma' }, seguro: true, espera: 1500 },
        { tipo: 'preencher', alvo: { placeholder: 'Ex.: Pix C6', dentro: 'dialog' }, valor: 'Crédito Maquininha Exemplo', espera: 500 },
        { tipo: 'escolher', alvo: { campo: 'Tipo', dentro: 'dialog' }, valor: 'Cartão de crédito', espera: 600 },
        { tipo: 'preencher', alvo: { campo: 'Atalho · uma tecla', dentro: 'dialog' }, valor: 'M', espera: 500 },
        { tipo: 'escolher', alvo: { campo: 'Adquirente', dentro: 'dialog' }, valor: 'Maquininha Exemplo', espera: 800 },
      ],
      titulo: 'Forma de crédito na maquininha',
      texto: 'Agora volta em Formas de pagamento e clica em Nova forma. Dá o nome que vai aparecer no caixa, escolhe o tipo, Cartão de crédito, uma tecla de atalho pro PDV, e a adquirente, que é a maquininha que a gente acabou de cadastrar.',
      marcar: [
        { alvo: { placeholder: 'Ex.: Pix C6', dentro: 'dialog' }, legenda: 'Nome no PDV' },
        { alvo: { campo: 'Tipo', dentro: 'dialog' }, legenda: 'Tipo' },
        { alvo: { campo: 'Adquirente', dentro: 'dialog' }, legenda: 'Maquininha' },
      ],
    },
    {
      titulo: 'Salve a forma',
      texto: 'O dinheiro cai na conta da maquininha. Clica em Salvar.',
      marcar: [{ alvo: { papel: 'button', nome: 'Salvar', exato: true, dentro: 'dialog' }, legenda: 'Salvar' }],
      depois: [{ tipo: 'clicar', alvo: { papel: 'button', nome: 'Salvar', exato: true, dentro: 'dialog' }, aguardarFechar: true, espera: 2500 }],
    },
    {
      antes: [
        { tipo: 'clicar', alvo: { papel: 'button', nome: 'Nova forma' }, seguro: true, espera: 1500 },
        { tipo: 'preencher', alvo: { placeholder: 'Ex.: Pix C6', dentro: 'dialog' }, valor: 'Pix Banco Exemplo', espera: 500 },
        { tipo: 'escolher', alvo: { campo: 'Tipo', dentro: 'dialog' }, valor: 'Pix', espera: 800 },
      ],
      titulo: 'Forma de Pix',
      texto: 'Agora uma de Pix. Clica em Nova forma, coloca o nome e o tipo Pix. Essa caixinha, Pix automático pelo banco, mostra o QR Code no caixa e confirma sozinha, mas precisa do banco ligado ao sistema.',
      marcar: [
        { alvo: { placeholder: 'Ex.: Pix C6', dentro: 'dialog' }, legenda: 'Nome' },
        { alvo: { texto: 'Pix automático pelo banco', dentro: 'dialog' }, legenda: 'Precisa do banco ligado' },
      ],
      dica: 'Para ligar o Pix automático, o banco da empresa precisa estar vinculado ao sistema. Fale com o suporte.',
    },
    {
      antes: [
        { tipo: 'preencher', alvo: { rotulo: 'Buscar conta de destino', dentro: 'dialog' }, valor: 'Banco Exemplo', espera: 1200 },
        { tipo: 'clicar', alvo: { papel: 'button', nome: /Cadastrar conta “Banco Exemplo”/, dentro: 'dialog' }, seguro: true, espera: 1500 },
      ],
      titulo: 'Em que conta cai o dinheiro',
      texto: 'Em Conta de destino, você diz em qual conta o dinheiro do Pix cai. Digita o nome do banco. Se ela ainda não existe, clica em Cadastrar conta e salva ali mesmo.',
      marcar: [
        { alvo: { placeholder: 'Ex.: Conta C6', dentro: 'dialog' }, legenda: 'Conta nova' },
        { alvo: { papel: 'button', nome: 'Salvar e selecionar', dentro: 'dialog' }, legenda: 'Salvar e selecionar' },
      ],
      depois: [{ tipo: 'clicar', alvo: { papel: 'button', nome: 'Salvar e selecionar', dentro: 'dialog' }, espera: 2500 }],
    },
    {
      titulo: 'Salve a forma de Pix',
      texto: 'A conta já ficou escolhida. Agora é só clicar em Salvar.',
      marcar: [
        { alvo: { rotulo: 'Buscar conta de destino', dentro: 'dialog' }, legenda: 'Banco Exemplo' },
        { alvo: { papel: 'button', nome: 'Salvar', exato: true, dentro: 'dialog' }, legenda: 'Salvar' },
      ],
      depois: [{ tipo: 'clicar', alvo: { papel: 'button', nome: 'Salvar', exato: true, dentro: 'dialog' }, aguardarFechar: true, espera: 2500 }],
    },
    {
      antes: [{ tipo: 'preencher', alvo: { placeholder: 'Pesquisar por nome…' }, valor: 'Exemplo', espera: 1500 }],
      titulo: 'As formas já aparecem no caixa',
      texto: 'Pronto! As duas formas já estão aqui, cada uma com a conta onde o dinheiro cai e a maquininha. No caixa elas já aparecem pra receber.',
      marcar: [
        { alvo: { css: 'tbody tr:has-text("Crédito Maquininha Exemplo")' }, legenda: 'Crédito' },
        { alvo: { css: 'tbody tr:has-text("Pix Banco Exemplo")' }, legenda: 'Pix' },
      ],
    },
  ],
};
