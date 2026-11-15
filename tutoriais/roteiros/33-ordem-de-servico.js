module.exports = {
  id: 'ordem-de-servico',
  ordem: 33,
  grupo: 'Comercial',
  titulo: 'Abrir uma ordem de serviço (OS)',
  resumo: 'Registre o conserto: cliente, veículo/equipamento, serviços, peças e fotos.',
  antesDeComecar: 'Ter os serviços cadastrados (Cadastros › Serviços e Status) e os mecânicos/técnicos cadastrados como usuários. Os nomes dos campos mudam conforme o ramo: oficina mostra "Veículo/Placa/Mecânico"; assistência técnica mostra "Equipamento/Técnico".',
  passos: [
    {
      ir: '/comercial/ordens-servico',
      titulo: 'Clique em "Nova ordem"',
      texto: 'No menu, clique em Comercial › Ordens de Serviço e depois em "Nova ordem".',
      marcar: [{ alvo: { papel: 'button', nome: 'Nova ordem', exato: true } }],
      depois: [{ tipo: 'clicar', alvo: { papel: 'button', nome: 'Nova ordem', exato: true }, espera: 1500 }],
    },
    {
      titulo: 'Escolha o cliente',
      texto: 'Comece a digitar o nome do cliente e clique nele. Se for cliente novo, clique em "+ Cadastrar cliente".',
      marcar: [{ alvo: '#os-client-search' }],
    },
    {
      titulo: 'Veículo (ou equipamento) e o defeito',
      texto: 'Preencha o veículo (ou equipamento) e a placa. Escreva o que o cliente reclamou e, depois de olhar, o laudo técnico.',
      marcar: [{ alvo: { placeholder: /Veículo \(modelo\/marca\)|Equipamento e modelo/ } }],
    },
    {
      titulo: 'Adicione os serviços',
      texto: 'Clique em "Adicionar serviço", busque o serviço pelo nome ou código, escolha o mecânico/técnico responsável e confira o valor.',
      marcar: [{ alvo: { rotulo: 'Adicionar serviço' } }],
    },
    {
      titulo: 'Adicione as peças',
      texto: 'Clique em "Adicionar produto" para incluir as peças usadas, com a quantidade. Elas saem do estoque.',
      marcar: [{ alvo: { rotulo: 'Adicionar produto' } }],
      dica: 'Use "+ Adicionar fotos" para guardar fotos de antes, durante e depois do serviço.',
    },
    {
      titulo: 'Salve ou gere o orçamento',
      texto: 'Clique em "Salvar ordem". Se o cliente ainda vai aprovar, clique em "Gerar orçamento" e envie pelo WhatsApp ou imprima.',
      marcar: [
        { alvo: { papel: 'button', nome: 'Gerar orçamento' }, legenda: 'Orçamento' },
        { alvo: { papel: 'button', nome: 'Salvar ordem' }, legenda: 'Salvar' },
      ],
    },
    {
      ir: '/comercial/ordens-servico',
      titulo: 'Serviço pronto? Receba no caixa',
      texto: 'Na lista de ordens, clique em "Receber OS no caixa" na linha da OS. Ela vai para o PDV para receber o pagamento.',
      marcar: [{ alvo: { titulo: 'Receber OS no caixa' } }],
    },
  ],
};
