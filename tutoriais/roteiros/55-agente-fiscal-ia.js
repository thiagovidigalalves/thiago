module.exports = {
  id: 'agente-fiscal-ia',
  ordem: 55,
  grupo: 'Fiscal',
  titulo: 'Agente Fiscal IA (tirar dúvidas fiscais)',
  resumo: 'Pergunte sobre CFOP, NCM, impostos e NF-e, e converta o CFOP das notas de compra.',
  passos: [
    {
      ir: '/fiscal/agente-fiscal',
      titulo: 'Converter o CFOP de entrada',
      texto: 'Em Fiscal › Agente Fiscal IA, digite o CFOP que veio na nota do fornecedor (ex.: 5102) e escolha a finalidade. O sistema mostra o CFOP de entrada certo.',
      marcar: [{ alvo: { rotulo: 'CFOP da nota do fornecedor' } }],
    },
    {
      titulo: 'Pergunte o que quiser',
      texto: 'Escreva sua dúvida (ex.: "Qual CFOP uso para venda para outro estado?") e aperte Enter. A resposta mostra as fontes.',
      marcar: [{ alvo: { placeholder: 'Pergunte qualquer dúvida fiscal...' } }],
      atencao: 'A IA orienta, mas confirme com o seu contador antes de aplicar.',
    },
  ],
};
