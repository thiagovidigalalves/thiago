// Financeiro › Cashback: só mostra (não liga o cashback da Demonstração, que avisaria clientes no WhatsApp).
module.exports = {
  id: 'cashback',
  ordem: 44.5,
  grupo: 'Financeiro',
  titulo: 'Cashback: parte da compra volta para o cliente',
  assunto: { chave: ['cashback', 'credito de volta', 'dinheiro de volta', 'fidelidade'], acoes: ['ligar', 'configurar', 'usar', 'como', 'funciona'], rotas: ['/financeiro/cashback'] },
  resumo: 'Parte de cada compra paga volta para o cliente como haver, para usar na próxima compra.',
  fala: 'Oi! Aqui é o Thiago, da Thiago Informática. Neste vídeo eu vou te mostrar o Cashback: uma parte de cada compra volta pro cliente usar na próxima, e ele volta na sua loja. Bora lá!',
  passos: [
    {
      ir: '/financeiro/cashback',
      espera: 6000,
      titulo: 'Abra o Cashback',
      texto: 'Em Financeiro, Cashback. Primeiro é a regra: quanto volta, a compra mínima, o máximo por venda e em quantos dias vale.',
      marcar: [{ alvo: { texto: /⚙️ Regra/ }, legenda: 'A regra' }],
    },
    {
      titulo: 'Aviso no WhatsApp',
      texto: 'Do lado, a mensagem que o cliente recebe no WhatsApp contando quanto ganhou e até quando pode usar.',
      marcar: [{ alvo: { texto: /💬 Aviso no WhatsApp/ }, legenda: 'Mensagem' }],
    },
    {
      titulo: 'Quem tem cashback',
      texto: 'Embaixo aparece quanto foi gerado, quanto está disponível e quanto já foi usado, e a lista de cada cliente. Na hora da venda, o caixa já mostra o cashback do cliente.',
      marcar: [{ alvo: { placeholder: 'Buscar cliente ou nº da venda' }, legenda: 'Clientes' }],
    },
  ],
};
