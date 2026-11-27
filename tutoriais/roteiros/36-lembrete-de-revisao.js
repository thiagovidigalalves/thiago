// Lembrete de revisão feito DE VERDADE na Demonstração (pedido do dono, 27/11/2026): escolhe o tempo (salva o ajuste),
// salva a mensagem do convite e marca um cliente como "Avisei" (grava sem mandar nada).
// "WhatsApp" e "Enviar para marcados" NÃO são clicados: os clientes da Demonstração têm telefone (só marcados).
module.exports = {
  id: 'lembrete-de-revisao',
  ordem: 36,
  grupo: 'Comercial',
  titulo: 'Lembrete de revisão (chamar o cliente de volta)',
  gravaDados: true,
  assunto: { chave: ['revisao', 'lembrete de revisao', 'cliente sumiu', 'chamar de volta', 'nao voltou'], acoes: ['mandar', 'avisar', 'ver', 'enviar', 'como', 'chamar'], rotas: ['/comercial/revisoes'] },
  resumo: 'Veja quem fez serviço há 3, 6 ou 12 meses e não voltou, e mande o convite de revisão.',
  fala: 'Oi! Aqui é o Thiago, da Thiago Informática. Neste vídeo eu vou te mostrar o Lembrete de revisão: quem fez serviço com você e não voltou, e como chamar esse cliente de volta. Bora lá!',
  antesDeComecar: 'Ter ordens de serviço antigas (de 3 meses ou mais).',
  passos: [
    {
      ir: '/comercial/revisoes',
      espera: 7000,
      desfocarTudo: true,
      antes: [{ tipo: 'clicar', alvo: { papel: 'button', nome: '3 meses', exato: true }, seguro: true, espera: 3000 }],
      titulo: 'Escolha há quanto tempo',
      texto: 'No menu, clica em Comercial, Lembrete de revisão. Escolhe há quanto tempo foi o último serviço: três, seis ou doze meses. Aparecem os clientes que fizeram serviço nesse tempo e não voltaram.',
      marcar: [
        { alvo: { papel: 'button', nome: '3 meses', exato: true }, legenda: '3 meses' },
        { alvo: { papel: 'button', nome: '6 meses', exato: true }, legenda: '6 meses' },
        { alvo: { papel: 'button', nome: '12 meses', exato: true }, legenda: '12 meses' },
      ],
    },
    {
      desfocarTudo: true,
      antes: [{ tipo: 'clicar', alvo: { papel: 'button', nome: '✏️ Mensagem' }, seguro: true, espera: 1500 }],
      titulo: 'A mensagem do convite',
      texto: 'Clica em Mensagem pra ver o convite que vai pro cliente. Dá pra mudar o texto do seu jeito, e os campos entre chaves viram o nome do cliente e o equipamento. Depois clica em Salvar mensagem.',
      marcar: [{ alvo: { papel: 'button', nome: 'Salvar mensagem' }, legenda: 'Salvar mensagem' }],
      depois: [{ tipo: 'clicar', alvo: { papel: 'button', nome: 'Salvar mensagem' }, espera: 2000 }],
    },
    {
      desfocarTudo: true,
      titulo: 'Mande o convite',
      texto: 'Na linha do cliente, o botão WhatsApp abre a conversa com o convite pronto. Pra vários de uma vez, marca os clientes, ou Marcar todos, e clica em Enviar para marcados.',
      marcar: [
        { alvo: { css: 'button.h-8:has-text("WhatsApp")' }, legenda: 'WhatsApp' },
        { alvo: { rotulo: 'Marcar todos' }, legenda: 'Marcar todos' },
      ],
    },
    {
      desfocarTudo: true,
      titulo: 'Já falou com ele? Avisei',
      texto: 'Já falou com o cliente por telefone ou no balcão? Clica em Avisei, e ele sai da lista.',
      marcar: [{ alvo: { papel: 'button', nome: /Avisei/ }, legenda: 'Avisei' }],
      depois: [{ tipo: 'clicar', alvo: { papel: 'button', nome: /Avisei/ }, seguro: true, espera: 2500 }],
    },
    {
      desfocarTudo: true,
      antes: [{ tipo: 'clicar', alvo: { papel: 'button', nome: /Já avisados/ }, seguro: true, espera: 2000 }],
      titulo: 'Quem já foi avisado',
      texto: 'E em Já avisados ficam os clientes que você já chamou, pra não mandar duas vezes.',
      marcar: [{ alvo: { papel: 'button', nome: /Já avisados/ }, legenda: 'Já avisados' }],
    },
  ],
};
