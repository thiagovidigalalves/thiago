// Cadastro de cliente feito DE VERDADE na Demonstração (pedido do dono, 21/11/2026): cliente fictícia
// "Paula Exemplo Lima", sem telefone (nada vai para WhatsApp de ninguém), endereço pelo CEP, salva e aparece na lista.
module.exports = {
  id: 'cadastrar-cliente',
  ordem: 20,
  grupo: 'Cadastros',
  titulo: 'Cadastrar um cliente',
  gravaDados: true,
  aceitarConfirmacao: true, // "já existe cliente com esse nome": é a mesma cliente fictícia de outras gravações
  manter: ['Paula Exemplo Lima', '38140000', '38140-000', 'Rua das Flores', 'Centro', 'Prata'],
  assunto: {"chave": ["cliente", "clientes"], "acoes": ["cadastrar", "cadastro", "cadastra", "novo", "nova", "incluir", "adicionar", "criar", "colocar", "registrar"]}, // como o Thiaguinho acha o vídeo pela pergunta
  resumo: 'Cadastre clientes com nome, CPF/CNPJ, WhatsApp e endereço.',
  fala: 'Oi! Aqui é o Thiago, da Thiago Informática. Neste vídeo eu vou cadastrar um cliente de verdade, do começo ao fim. Bora lá!',
  passos: [
    {
      ir: '/cadastros/clientes',
      espera: 6000,
      titulo: 'Abra a tela de Clientes',
      texto: 'No menu, clica em Cadastros, Pessoas, Clientes. Aqui ficam todos os seus clientes. Pra cadastrar um novo, é no botão Novo cliente.',
      marcar: [{ alvo: { papel: 'button', nome: 'Novo cliente' }, legenda: 'Novo cliente' }],
    },
    {
      antes: [
        { tipo: 'clicar', alvo: { papel: 'button', nome: 'Novo cliente' }, seguro: true, espera: 1800 },
        { tipo: 'preencher', alvo: { campo: 'Nome', dentro: 'dialog' }, valor: 'Paula Exemplo Lima' },
      ],
      titulo: 'Digite o nome',
      texto: 'O único campo obrigatório é o nome. O código é criado sozinho quando você salva.',
      marcar: [{ alvo: { campo: 'Nome', dentro: 'dialog' }, legenda: 'Nome' }],
    },
    {
      titulo: 'CPF, WhatsApp e e-mail',
      texto: 'Coloca o CPF ou CNPJ: se for CNPJ, a lupa busca e preenche os dados da empresa sozinha. E o WhatsApp, que é por onde vão os comprovantes, as cobranças e o parabéns no aniversário.',
      marcar: [
        { alvo: { placeholder: 'CPF ou CNPJ', dentro: 'dialog' }, legenda: 'CPF ou CNPJ' },
        { alvo: { placeholder: '(principal)', dentro: 'dialog' }, legenda: 'WhatsApp' },
      ],
    },
    {
      antes: [
        { tipo: 'preencher', alvo: { campo: 'CEP', dentro: 'dialog' }, valor: '38140000' },
        { tipo: 'preencher', alvo: { campo: 'Rua', dentro: 'dialog' }, valor: 'Rua das Flores' },
        { tipo: 'preencher', alvo: { campo: 'Número', dentro: 'dialog' }, valor: '120' },
        { tipo: 'preencher', alvo: { campo: 'Bairro', dentro: 'dialog' }, valor: 'Centro' },
        { tipo: 'preencher', alvo: { campo: 'Cidade', dentro: 'dialog' }, valor: 'Prata' },
        { tipo: 'preencher', alvo: { campo: 'Estado', dentro: 'dialog' }, valor: 'MG' },
      ],
      titulo: 'Endereço',
      texto: 'Agora o endereço: o CEP, a rua, o número, o bairro e a cidade. Com o CEP, a lupa do lado já preenche a rua e a cidade sozinha.',
      marcar: [
        { alvo: { campo: 'CEP', dentro: 'dialog' }, legenda: 'CEP' },
        { alvo: { campo: 'Cidade', dentro: 'dialog' }, legenda: 'Endereço' },
      ],
    },
    {
      titulo: 'Clique em Cadastrar',
      texto: 'Confere e clica em Cadastrar. Pronto, a cliente está salva.',
      marcar: [{ alvo: { papel: 'button', nome: 'Cadastrar', exato: true, dentro: 'dialog' }, legenda: 'Cadastrar' }],
      depois: [{ tipo: 'clicar', alvo: { papel: 'button', nome: 'Cadastrar', exato: true, dentro: 'dialog' }, aguardarFechar: true, espera: 2500 }],
    },
    {
      antes: [{ tipo: 'preencher', alvo: { placeholder: 'Buscar nome, CPF/CNPJ ou telefone' }, valor: 'Paula Exemplo Lima', espera: 3500 }],
      titulo: 'A cliente já está na lista',
      texto: 'E ela já aparece na lista, pronta pra usar nas vendas, nas ordens de serviço e no crediário.',
      marcar: [{ alvo: { texto: 'Paula Exemplo Lima', exato: true }, legenda: 'Cliente salva' }],
      dica: 'Para alterar depois, clique no lápis (Editar) na linha do cliente.',
    },
  ],
};
