// WhatsApp › Configurar avaliações (tela nova, 21/11/2026): só mostra (não muda a configuração da Demonstração).
module.exports = {
  id: 'configurar-avaliacoes',
  ordem: 85.25,
  grupo: 'WhatsApp',
  titulo: 'Configurar as avaliações dos clientes',
  assunto: { chave: ['configurar avaliacao', 'avaliacao google', 'pesquisa de satisfacao', 'nota do cliente google'], acoes: ['configurar', 'ligar', 'mudar', 'como'], rotas: ['/whatsapp/avaliacoes/configurar'] },
  resumo: 'Como e quando pedir a opinião do cliente, o que fazer com quem ficou insatisfeito e a avaliação no Google.',
  fala: 'Oi! Aqui é o Thiago, da Thiago Informática. Neste vídeo eu vou te mostrar onde configura as avaliações: como pedir a opinião do cliente, e como levar ele pra avaliar sua loja no Google. Bora lá!',
  passos: [
    {
      ir: '/whatsapp/avaliacoes/configurar',
      espera: 6000,
      titulo: 'Abra Configurar avaliações',
      texto: 'Em WhatsApp, Configurar avaliações. Primeiro você escolhe qual nota vale no painel e como mandar o pedido de avaliação.',
      marcar: [
        { alvo: { texto: 'Qual vale no painel?', exato: true }, legenda: 'Qual nota vale' },
        { alvo: { texto: 'Como mandar o pedido?', exato: true }, legenda: 'Como pedir' },
      ],
    },
    {
      titulo: 'Cliente insatisfeito',
      texto: 'Quem dá nota até seis cai aqui: você recebe o aviso e pode ligar pro cliente antes que ele fale mal da loja.',
      marcar: [{ alvo: { texto: /Cliente insatisfeito/ }, legenda: 'Nota até 6' }],
    },
    {
      titulo: 'Avaliação no Google',
      texto: 'E aqui você coloca o link do Google da sua loja, conecta pra trazer as avaliações pro painel, e ajusta a mensagem que o cliente recebe.',
      marcar: [
        { alvo: { texto: /Link para o cliente avaliar/ }, legenda: 'Link do Google' },
        { alvo: { texto: /Mensagem que o cliente recebe/ }, legenda: 'Mensagem' },
      ],
    },
  ],
};
