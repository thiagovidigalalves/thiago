module.exports = {
  id: 'ordem-de-servico',
  ordem: 33,
  grupo: 'Comercial',
  titulo: 'Abrir uma ordem de serviço (OS)',
  assunto: {"chave": ["ordem", "os", "servico", "serviço"], "acoes": ["abrir", "abro", "fazer", "faço", "lançar", "criar", "nova", "cadastrar", "funciona", "usar"]}, // como o Thiaguinho acha o vídeo
  resumo: 'Registre o conserto: cliente, veículo/equipamento, serviços, peças e fotos.',
  antesDeComecar: 'Ter os serviços cadastrados (Cadastros › Serviços › Serviços e Status) e os mecânicos/técnicos cadastrados como usuários. Os nomes dos campos mudam conforme o ramo: oficina mostra "Veículo/Placa/Mecânico"; assistência técnica mostra "Equipamento/Técnico".',
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
      titulo: 'Equipamento (obrigatório) e o defeito',
      texto: 'Preencha o equipamento (ou veículo) e modelo: junto com o cliente, é o que precisa pra salvar, por isso tem o asterisco. Ao lado vai a observação (ou placa). Escreva o defeito que o cliente relatou e, depois de olhar, o laudo técnico.',
      marcar: [{ alvo: { placeholder: /Veículo \(modelo\/marca\)|Equipamento e modelo/ } }],
    },
    {
      titulo: 'Adicione os serviços',
      texto: 'Clique em "Adicionar serviço", busque o serviço pelo nome ou código e confira o valor. O técnico de cada serviço é opcional: escolha se ele ganha comissão.',
      marcar: [{ alvo: { rotulo: 'Adicionar serviço' } }],
    },
    {
      titulo: 'Adicione as peças',
      texto: 'Clique em "Adicionar produto" para incluir as peças usadas, com a quantidade. Elas saem do estoque quando você recebe a OS no caixa.',
      marcar: [{ alvo: { rotulo: 'Adicionar produto' } }],
      dica: 'Use "+ Adicionar fotos" para guardar fotos de antes, durante e depois do serviço. O equipamento pode ser opcional: mude em Configurações › Ordem de Serviço › Geral.',
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
      antes: [{ tipo: 'escolher', alvo: { rotulo: 'Período' }, valor: 'Todas as datas', espera: 3000 }],
      titulo: 'Serviço pronto? Receba no caixa',
      texto: 'Na lista de ordens, clique em "Receber OS no caixa" na linha da OS. Ela vai para o PDV para receber o pagamento.',
      marcar: [{ alvo: { titulo: 'Receber OS no caixa' } }],
    },
  ],
};
