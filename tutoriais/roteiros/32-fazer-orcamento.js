module.exports = {
  id: 'fazer-orcamento',
  ordem: 32,
  grupo: 'Comercial',
  titulo: 'Fazer um orçamento',
  resumo: 'Monte o orçamento, envie pelo WhatsApp e depois transforme em venda.',
  antesDeComecar: 'Ter o cliente e os produtos cadastrados (o cliente também pode ser cadastrado na hora).',
  passos: [
    {
      ir: '/cadastros/orcamentos',
      titulo: 'Abra a tela de Orçamentos',
      texto: 'No menu, clique em Comercial › Orçamentos.',
      marcar: [{ alvo: { papel: 'heading', nome: 'Orçamentos', exato: true } }],
    },
    {
      titulo: 'Clique em "Novo orçamento"',
      texto: 'Clique no botão "Novo orçamento".',
      marcar: [{ alvo: { papel: 'button', nome: 'Novo orçamento' } }],
      depois: [{ tipo: 'clicar', alvo: { papel: 'button', nome: 'Novo orçamento' }, espera: 1500 }],
    },
    {
      titulo: 'Escolha o cliente',
      texto: 'Digite o nome ou CPF/CNPJ do cliente e clique nele na lista. Se ele ainda não existe, clique em "Cadastrar cliente".',
      marcar: [{ alvo: { placeholder: 'Buscar cliente por nome ou CPF/CNPJ', dentro: 'dialog' } }],
    },
    {
      titulo: 'Adicione os produtos',
      texto: 'Digite o nome ou código do produto e clique nele para incluir. Repita para cada item. Se quiser, dê desconto no item ou no total.',
      marcar: [{ alvo: { placeholder: 'Buscar produto por nome ou código', dentro: 'dialog' } }],
    },
    {
      titulo: 'Validade',
      texto: 'Confira até quando o orçamento vale.',
      marcar: [{ alvo: { campo: 'Validade', dentro: 'dialog' } }],
    },
    {
      titulo: 'Salve, imprima ou envie',
      texto: 'Clique em "Salvar". Você pode imprimir (A4, 80mm ou PDF) ou enviar pelo WhatsApp: o cliente recebe um link para ver e aprovar.',
      marcar: [
        { alvo: { papel: 'button', nome: 'WhatsApp', exato: true, dentro: 'dialog' }, legenda: 'Enviar' },
        { alvo: { papel: 'button', nome: 'Salvar', exato: true, dentro: 'dialog' }, legenda: 'Salvar' },
      ],
    },
    {
      ir: '/cadastros/orcamentos',
      titulo: 'Cliente aprovou? Fature no PDV',
      texto: 'Na lista de orçamentos, clique no botão "Faturar no PDV" da linha. O orçamento vira uma venda no caixa, já com os produtos.',
      marcar: [{ alvo: { titulo: 'Faturar no PDV' } }],
    },
  ],
};
