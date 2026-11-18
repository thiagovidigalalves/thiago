module.exports = {
  id: 'boletos-remessa-retorno',
  ordem: 46,
  grupo: 'Financeiro',
  titulo: 'Boletos: remessa e retorno do banco',
  resumo: 'Gere o arquivo de remessa para o banco e leia o retorno para baixar os boletos pagos.',
  antesDeComecar: 'Só para bancos "por arquivo". Ative antes em Configurações › Boletos.',
  passos: [
    {
      ir: '/financeiro/boletos',
      titulo: 'Gere a remessa',
      texto: 'Em Financeiro › Boletos, clique em "Gerar remessa" e envie o arquivo no internet banking da empresa.',
      marcar: [{ alvo: { papel: 'heading', nome: 'Boletos', exato: true } }],
    },
    {
      titulo: 'Leia o retorno',
      texto: 'Baixe o arquivo de retorno no banco e clique em "Ler retorno do banco". Confira a lista (pagos, confirmados, rejeitados) e clique em "Confirmar e dar baixa".',
      atencao: 'Nada é gravado antes de você confirmar. Confira os pagos antes.',
    },
  ],
};
