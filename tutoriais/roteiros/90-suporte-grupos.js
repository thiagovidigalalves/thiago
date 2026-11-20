// Super Admin › Suporte em grupos (IA). Vídeo SÓ do Super Admin (somente_admin): não vai para a Central dos clientes
// nem para a Ajuda das empresas. Grava fora de qualquer empresa (superAdmin) e os nomes dos clientes viram fictícios.
// O robô só mostra: não liga/desliga grupo, não muda o modo, não clica em Salvar nem em Buscar/Entrar pelo link.
module.exports = {
  id: 'suporte-grupos',
  ordem: 90,
  grupo: 'Super Admin',
  titulo: 'Suporte em grupos com IA',
  somente_admin: true,
  superAdmin: true,
  // Nomes dos grupos (clientes) e da equipe: sempre desfocados (o fictício não pega todos os nomes de grupo).
  borrar: 'div.grid > div.rounded-2xl b.truncate, div.grid > div.rounded-2xl p, section label b.truncate, div.mt-1.flex.flex-wrap > button, input[placeholder="Nome"], input[placeholder="WhatsApp com DDD"]',
  assunto: { chave: ['suporte em grupos', 'grupo de suporte', 'grupos', 'ia do suporte', 'thiaguinho no grupo'], acoes: ['configurar', 'ligar', 'usar', 'funciona', 'como'], rotas: ['/admin/suporte-grupos'] },
  resumo: 'O Thiaguinho responde as dúvidas do sistema nos grupos de WhatsApp que você ligar, manda o vídeo e pergunta se a pessoa conseguiu.',
  fala: 'Oi! Aqui é o Thiago. Neste vídeo eu vou te mostrar o Suporte em grupos: o Thiaguinho respondendo as dúvidas dos clientes direto nos grupos de WhatsApp do suporte. Bora lá!',
  passos: [
    {
      ir: '/admin/suporte-grupos',
      espera: 5000,
      titulo: 'Abra o Suporte em grupos',
      texto: 'No menu do Super Admin, clica em Suporte em grupos. Aqui em cima mostra se a IA está ligada: só observando ou respondendo.',
      marcar: [{ alvo: { papel: 'heading', nome: 'Suporte em grupos' } }],
    },
    {
      titulo: 'Os grupos do WhatsApp',
      texto: 'Na aba Grupos aparecem os grupos do número do suporte. O botão verde busca os grupos de novo, e aqui embaixo dá pra colar o link de convite pro número do suporte entrar num grupo novo.',
      marcar: [
        { alvo: { papel: 'button', nome: /Buscar grupos do WhatsApp/ }, legenda: 'Buscar grupos' },
        { alvo: { placeholder: 'Cole o link do grupo (https://chat.whatsapp.com/...)' }, legenda: 'Entrar pelo link' },
      ],
    },
    {
      titulo: 'Ligue a IA no grupo',
      texto: 'Em cada grupo você marca IA responde aqui e escolhe a empresa daquele grupo. Os outros grupos e as conversas no privado nunca são lidos.',
      marcar: [
        { alvo: { texto: 'IA responde aqui' }, legenda: 'Liga a IA' },
        { alvo: { css: 'label:has-text("Empresa do grupo") select' }, legenda: 'Empresa' },
      ],
    },
    {
      antes: [{ tipo: 'clicar', alvo: { papel: 'button', nome: '⚙️ Configurações', exato: true }, seguro: true, espera: 1500 }],
      titulo: 'Só observar ou responder',
      texto: 'Em Configurações, primeiro liga o suporte em grupos. No Só observar ela registra as perguntas mas não responde, bom pra testar. No Responder, ela responde, manda o vídeo e pergunta se a pessoa conseguiu.',
      desfocarCampos: true,
      marcar: [
        { alvo: { texto: 'Ligar o suporte em grupos' }, legenda: 'Liga' },
        { alvo: { papel: 'button', nome: /Só observar/ }, legenda: 'Testar' },
        { alvo: { papel: 'button', nome: /Responder/ }, legenda: 'Responde' },
      ],
    },
    {
      titulo: 'Horário e o que ela abre',
      texto: 'Aqui você põe o horário que ela responde e o que ela aceita abrir: áudio, foto ou vídeo. Cada um gasta crédito de IA, e o vídeo é o que mais gasta.',
      desfocarCampos: true,
      marcar: [
        { alvo: { css: 'label:has-text("Responde das (h)") input' }, legenda: 'Horário' },
        { alvo: { texto: 'O que a IA aceita abrir' }, legenda: 'Áudio, foto, vídeo' },
      ],
    },
    {
      titulo: 'Pesquisa de satisfação',
      texto: 'Aqui escolhe a IA das respostas e do áudio, e liga a pesquisa de satisfação: quando o atendente resolve, ela pede uma nota de um a cinco no grupo.',
      desfocarCampos: true,
      marcar: [
        { alvo: { texto: /Provedor de IA e pesquisa de satisfação/ }, legenda: 'IA' },
        { alvo: { texto: /⭐ Pesquisa de satisfação/ }, legenda: 'Nota de 1 a 5' },
      ],
    },
    {
      titulo: 'Mensagens prontas',
      texto: 'E as mensagens prontas da Central de Atendimento: a de quando você clica em Atender, a de encerramento e o pedido de avaliação. Dá pra mudar o texto, e também escolher o que vai por padrão ao finalizar.',
      desfocarCampos: true,
      marcar: [{ alvo: { css: 'label:has-text("Ao clicar em Atender") textarea' }, legenda: 'Textos prontos' }],
    },
    {
      titulo: 'Quem a IA não responde e quem atende',
      texto: 'Mais embaixo ficam os números que a IA nunca responde, como você e a sua equipe, e quem atende na Central de Atendimento. Depois de mudar, é só clicar em Salvar.',
      desfocarCampos: true,
      marcar: [
        { alvo: { texto: /Números que a IA nunca responde/ }, legenda: 'Exceções' },
        { alvo: { texto: /Quem atende na Central de Atendimento/ }, legenda: 'Atendentes' },
      ],
    },
    {
      titulo: 'A Central de Atendimento',
      texto: 'E quando a pessoa precisa de gente, a conversa cai na Central de Atendimento. É só clicar aqui em cima pra abrir. Ela tem um vídeo só dela.',
      marcar: [{ alvo: { texto: /Abrir a Central de Atendimento/ }, legenda: 'Abre a Central' }],
    },
  ],
};
