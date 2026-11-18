module.exports = {
  id: 'lembrete-de-revisao',
  ordem: 36,
  grupo: 'Comercial',
  titulo: 'Lembrete de revisão (chamar o cliente de volta)',
  resumo: 'Veja quem fez serviço há 3, 6 ou 12 meses e não voltou, e mande o convite de revisão.',
  passos: [
    {
      ir: '/comercial/revisoes',
      desfocarTudo: true,
      titulo: 'Escolha há quanto tempo',
      texto: 'Em Comercial › Lembrete de revisão, clique em "3 meses", "6 meses" ou "12 meses". Aparecem os clientes que fizeram serviço nesse tempo e não voltaram.',
      marcar: [{ alvo: { papel: 'button', nome: '6 meses', exato: true } }],
    },
    {
      desfocarTudo: true,
      titulo: 'Mande o convite',
      texto: 'Clique em "WhatsApp" na linha do cliente para mandar o convite. Para vários de uma vez, marque os clientes e clique em "Enviar para marcados".',
      marcar: [{ alvo: { rotulo: 'Marcar todos' } }],
      dica: 'Já falou com o cliente por telefone? Clique em "Avisei" para ele sair da lista.',
    },
  ],
};
