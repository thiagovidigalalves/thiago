module.exports = {
  id: 'formas-de-pagamento',
  ordem: 42,
  grupo: 'Financeiro',
  titulo: 'Configurar formas de pagamento e maquininha',
  resumo: 'Cadastre Pix, cartões e as taxas da maquininha, e diga em que conta cai o dinheiro.',
  passos: [
    {
      ir: '/cadastros/formas-pagamento',
      titulo: 'Abra "Formas de pagamento"',
      texto: 'No menu, clique em Financeiro › Formas de pagamento. São as opções que aparecem no caixa na hora de receber.',
      marcar: [{ alvo: { papel: 'heading', nome: 'Formas de pagamento' } }],
    },
    {
      titulo: 'Clique em "Nova forma"',
      texto: 'Clique em "Nova forma".',
      marcar: [{ alvo: { papel: 'button', nome: 'Nova forma' } }],
      depois: [{ tipo: 'clicar', alvo: { papel: 'button', nome: 'Nova forma' }, espera: 1500 }],
    },
    {
      titulo: 'Nome, tipo e atalho',
      texto: 'Dê o nome que vai aparecer no caixa (ex.: "Pix C6"), escolha o tipo (Dinheiro, Pix, Crédito, Débito...) e uma tecla de atalho para usar no PDV.',
      marcar: [{ alvo: { placeholder: 'Ex.: Pix C6', dentro: 'dialog' } }],
    },
    {
      titulo: 'Conta de destino e salvar',
      texto: 'Em "Conta de destino", escolha em qual conta o dinheiro cai (ex.: conta do banco). Clique em "Salvar".',
      marcar: [
        { alvo: { rotulo: 'Buscar conta de destino', dentro: 'dialog' }, legenda: 'Onde cai o dinheiro' },
        { alvo: { papel: 'button', nome: 'Salvar', exato: true, dentro: 'dialog' }, legenda: 'Salvar' },
      ],
    },
    {
      ir: '/cadastros/formas-pagamento',
      titulo: 'Taxas da maquininha',
      texto: 'Na aba "Adquirentes", cadastre sua maquininha com as taxas de débito, Pix e crédito. Assim o sistema mostra quanto você recebe de verdade e quando o dinheiro cai.',
      marcar: [{ alvo: { papel: 'tab', nome: 'Adquirentes' } }],
    },
  ],
};
