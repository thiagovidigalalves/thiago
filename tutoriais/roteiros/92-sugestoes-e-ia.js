module.exports = {
  id: 'sugestoes-e-ia',
  ordem: 92,
  grupo: 'Utilitários',
  titulo: 'Central de Inteligência IA e sugestões de melhoria',
  resumo: 'Pergunte sobre os números da sua empresa e mande ideias para melhorar o sistema.',
  passos: [
    {
      ir: '/assistente',
      titulo: 'Central de Inteligência IA',
      texto: 'Em Utilitários › Central de Inteligência IA, veja a visão geral, os alertas e as oportunidades. Na aba "Perguntar à IA", escreva perguntas como "Quanto vendi esta semana?".',
      marcar: [{ alvo: { papel: 'tab', nome: 'Perguntar à IA' } }],
    },
    {
      ir: '/sugestoes',
      titulo: 'Mande uma sugestão',
      texto: 'Em Utilitários › Sugestões de Melhoria, clique em "Nova sugestão", escreva sua ideia (ou fale pelo microfone) e salve. Você acompanha o andamento por aqui.',
      marcar: [{ alvo: { papel: 'button', nome: 'Nova sugestão' } }],
    },
  ],
};
