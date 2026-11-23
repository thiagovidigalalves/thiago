// WhatsApp › OS prontas não retiradas (tela nova, 21/11/2026). O robô NÃO clica em Enviar nem WhatsApp
// (os clientes da Demonstração têm telefone): só mostra os filtros e a mensagem pronta.
module.exports = {
  id: 'os-retirada',
  ordem: 85.3,
  grupo: 'WhatsApp',
  titulo: 'OS prontas que o cliente não buscou',
  valoresReais: true,
  assunto: { chave: ['os pronta', 'nao retirou', 'retirada', 'cliente nao buscou', 'aparelho parado'], acoes: ['avisar', 'ver', 'cobrar', 'mandar', 'como'], rotas: ['/whatsapp/os-retirada', '/relatorios/servicos/os-retirada'] },
  resumo: 'Veja as OS concluídas que o cliente ainda não veio buscar e avise pelo WhatsApp com o link da OS.',
  fala: 'Oi! Aqui é o Thiago, da Thiago Informática. Neste vídeo eu vou te mostrar as OS prontas que o cliente ainda não veio buscar, e como avisar ele pelo WhatsApp. Bora lá!',
  passos: [
    {
      ir: '/whatsapp/os-retirada',
      espera: 8000,
      titulo: 'Abra as OS prontas não retiradas',
      texto: 'Em WhatsApp, OS prontas não retiradas. Lá em cima você vê quantas OS estão paradas, o valor parado e a média de dias.',
      marcar: [{ alvo: { papel: 'heading', nome: /OS prontas não retiradas/ }, legenda: 'OS paradas' }],
    },
    {
      titulo: 'Há quantos dias',
      texto: 'Escolhe há quantos dias está pronta: cinco, dez, quinze, trinta dias, até um ano. Dá pra buscar o cliente e filtrar pelo técnico.',
      marcar: [
        { alvo: { papel: 'button', nome: 'há 5 dias+', exato: true }, legenda: 'Dias parada' },
        { alvo: { placeholder: 'Buscar cliente, nº da OS, equipamento…' }, legenda: 'Busca' },
      ],
    },
    {
      antes: [{ tipo: 'clicar', alvo: { papel: 'button', nome: 'Mensagem', exato: true }, seguro: true, espera: 1500 }],
      titulo: 'A mensagem pronta',
      texto: 'Em Mensagem você vê o texto que vai pro cliente, com o link da OS. É só mandar pelo WhatsApp, de uma em uma ou marcando várias.',
      marcar: [{ alvo: { texto: /^Mensagem para / }, legenda: 'Texto pronto' }],
      depois: [{ tipo: 'clicar', alvo: { papel: 'button', nome: 'Fechar', exato: true }, seguro: true, espera: 800 }],
    },
    {
      titulo: 'Aviso automático',
      texto: 'E aqui em cima você liga o aviso automático: depois de tantos dias, no horário que você escolher, o sistema avisa sozinho.',
      marcar: [{ alvo: { papel: 'link', nome: /Automático|Aviso automático/ }, legenda: 'Automático' }],
    },
  ],
};
