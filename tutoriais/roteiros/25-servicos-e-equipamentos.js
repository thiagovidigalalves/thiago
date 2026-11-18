module.exports = {
  id: 'servicos-e-equipamentos',
  ordem: 25,
  grupo: 'Cadastros',
  titulo: 'Serviços, status e equipamentos (para a OS)',
  resumo: 'Cadastre os serviços com preço e comissão, os status da OS e os equipamentos dos clientes.',
  passos: [
    {
      ir: '/cadastros/servicos',
      titulo: 'Cadastre os serviços',
      texto: 'Em Cadastros › Serviços e Status, digite o nome do serviço (ex.: Formatação), o preço (se tiver preço fixo) e a comissão do técnico. Clique em "Cadastrar".',
      marcar: [{ alvo: { placeholder: 'Nome do serviço' } }],
      dica: 'Sem preço, o valor é digitado na hora, em cada OS.',
    },
    {
      titulo: 'Status da OS',
      texto: 'Clique em "Status" para criar as etapas que a OS passa (ex.: Aguardando peça, Pronto para retirar).',
      marcar: [{ alvo: { papel: 'button', nome: 'Status', exato: true } }],
    },
    {
      ir: '/cadastros/veiculos',
      titulo: 'Equipamentos (ou veículos) dos clientes',
      texto: 'Em Cadastros › Equipamentos, digite o equipamento e modelo, uma observação (nº de série, senha...), escolha o cliente e clique em "Cadastrar". Ele aparece na hora de abrir a OS.',
      marcar: [{ alvo: { placeholder: /Equipamento e modelo|Marca e modelo/ } }],
    },
  ],
};
