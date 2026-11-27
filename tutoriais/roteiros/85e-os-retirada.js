// OS prontas não retiradas. Desde 26/11/2026 fica em Relatórios › Serviços › OS prontas não retiradas
// (o endereço antigo /whatsapp/os-retirada continua abrindo). O robô usa os filtros e abre a mensagem pronta.
// Enviar / WhatsApp / Avisar marcadas NÃO são clicados: mandariam mensagem para os telefones dos clientes da
// Demonstração, e a tela não tem nenhum outro lançamento (só avisa). Por isso não tem gravaDados.
module.exports = {
  id: 'os-retirada',
  ordem: 85.3,
  grupo: 'WhatsApp',
  titulo: 'OS prontas que o cliente não buscou',
  valoresReais: true,
  assunto: { chave: ['os pronta', 'nao retirou', 'retirada', 'cliente nao buscou', 'aparelho parado'], acoes: ['avisar', 'ver', 'cobrar', 'mandar', 'como'], rotas: ['/relatorios/servicos/os-retirada', '/whatsapp/os-retirada'] },
  resumo: 'Veja as OS concluídas que o cliente ainda não veio buscar e avise pelo WhatsApp com o link da OS.',
  fala: 'Oi! Aqui é o Thiago, da Thiago Informática. Neste vídeo eu vou te mostrar as OS prontas que o cliente ainda não veio buscar, e como avisar ele pelo WhatsApp. Bora lá!',
  passos: [
    {
      ir: '/relatorios/servicos/os-retirada',
      espera: 8000,
      titulo: 'Abra as OS prontas não retiradas',
      texto: 'No menu, clica em Relatórios, Serviços, OS prontas não retiradas. Lá em cima você vê quantas OS estão paradas, o valor parado e a média de dias.',
      marcar: [{ alvo: { papel: 'heading', nome: /OS prontas não retiradas/ }, legenda: 'OS paradas' }],
    },
    {
      antes: [{ tipo: 'clicar', alvo: { papel: 'button', nome: 'Todas', exato: true }, seguro: true, espera: 1500 }],
      titulo: 'Há quantos dias',
      texto: 'Escolhe há quantos dias está pronta: cinco, dez, quinze, trinta dias, até um ano, ou Todas. Dá pra buscar o cliente, filtrar pelo técnico e pela data.',
      marcar: [
        { alvo: { papel: 'button', nome: 'há 5 dias+', exato: true }, legenda: 'Dias parada' },
        { alvo: { placeholder: 'Buscar cliente, nº da OS, equipamento…' }, legenda: 'Busca' },
        { alvo: { rotulo: 'Técnico' }, legenda: 'Técnico' },
      ],
    },
    {
      antes: [{ tipo: 'clicar', alvo: { papel: 'button', nome: 'Mensagem', exato: true }, seguro: true, espera: 1500 }],
      titulo: 'A mensagem pronta',
      texto: 'Clica em Mensagem e você vê o texto que vai pro cliente, com o link da OS. Dali mesmo é só clicar em Abrir no WhatsApp.',
      marcar: [{ alvo: { texto: /^Mensagem para / }, legenda: 'Texto pronto' }],
      depois: [{ tipo: 'clicar', alvo: { papel: 'button', nome: 'Fechar', exato: true }, seguro: true, espera: 800 }],
    },
    {
      antes: [{ tipo: 'clicar', alvo: { css: 'input[type=checkbox][aria-label^="Marcar OS "]' }, seguro: true, espera: 1200 }],
      titulo: 'Avisar várias de uma vez',
      texto: 'Pra avisar várias, marca as OS, e aparece o botão Avisar marcadas pelo WhatsApp. Com o WhatsApp da empresa conectado, ele manda sozinho, uma por uma.',
      marcar: [{ alvo: { texto: /marcada\(s\)/ }, legenda: 'Marcadas' }],
      depois: [{ tipo: 'clicar', alvo: { css: 'input[type=checkbox][aria-label^="Marcar OS "]' }, seguro: true, espera: 800 }],
    },
    {
      titulo: 'Aviso automático',
      texto: 'E aqui em cima você liga o aviso automático: depois de tantos dias, no horário que você escolher, o sistema avisa sozinho.',
      marcar: [{ alvo: { papel: 'link', nome: /Automático|Aviso automático/ }, legenda: 'Automático' }],
    },
  ],
};
