module.exports = {
  id: 'agenda',
  ordem: 37,
  grupo: 'Comercial',
  titulo: 'Agenda de serviços e visitas',
  resumo: 'Veja no calendário os serviços marcados por dia e por técnico.',
  passos: [
    {
      ir: '/comercial/agenda',
      titulo: 'Abra a Agenda',
      texto: 'Em Comercial › Agenda aparece o calendário do mês com as OS agendadas. Use as setas para mudar de mês e clique numa OS para abrir.',
      marcar: [{ alvo: { rotulo: 'Próximo mês' } }],
    },
    {
      titulo: 'Filtre pelo técnico',
      texto: 'Escolha o técnico para ver só a agenda dele.',
      marcar: [{ alvo: { rotulo: 'Técnico' } }],
      dica: 'Para agendar, abra a OS e clique em "📅 Agendar". Lá também dá para tirar da agenda.',
    },
  ],
};
