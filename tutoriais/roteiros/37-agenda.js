// Agenda (Comercial › Agenda): OS agendadas e compromissos (reunião, visita, ligação, lembrete) por Mês, Semana ou Dia.
// Refeita em 20/11/2026 a pedido do dono (layout novo + compromisso sem OS). O robô só ABRE o "Novo agendamento"
// e fecha com Esc: nunca clica em Salvar.
module.exports = {
  id: 'agenda',
  ordem: 37,
  grupo: 'Comercial',
  titulo: 'Agenda: serviços, visitas e compromissos',
  assunto: { chave: ['agenda', 'agendar', 'agendamento', 'compromisso', 'reuniao', 'calendario', 'visita'], acoes: ['funciona', 'usar', 'ver', 'marcar', 'agendar', 'criar', 'fazer', 'abrir', 'colocar', 'como'], rotas: ['/comercial/agenda'] },
  resumo: 'Veja no calendário as OS e os compromissos do mês, da semana ou do dia, e agende com um clique.',
  fala: 'Oi! Aqui é o Thiago, da Thiago Informática. Neste vídeo eu vou te mostrar a Agenda: as ordens de serviço e os seus compromissos, como reunião e visita, num calendário só, por mês, por semana ou por dia. Bora lá!',
  passos: [
    {
      ir: '/comercial/agenda',
      titulo: 'Abra a Agenda',
      texto: 'No menu, clique em Comercial › Agenda. Aqui aparece o calendário com as ordens de serviço agendadas e os seus compromissos. O dia de hoje fica com o número destacado em azul.',
      marcar: [{ alvo: { papel: 'heading', nome: 'Agenda', exato: true } }],
    },
    {
      titulo: 'Mês, Semana ou Dia',
      texto: 'Aqui em cima você escolhe como quer ver: o mês inteiro, a semana ou só o dia. As setas andam pra frente e pra trás, e o botão Hoje volta pro dia de hoje.',
      marcar: [
        { alvo: { rotulo: 'Ver por' }, legenda: 'Mês, Semana ou Dia' },
        { alvo: { papel: 'button', nome: 'Hoje', exato: true }, legenda: 'Volta pra hoje' },
      ],
    },
    {
      antes: [{ tipo: 'clicar', alvo: { papel: 'tab', nome: 'Semana' }, espera: 1200 }],
      titulo: 'A semana de uma vez',
      texto: 'Na Semana, cada dia vira uma coluna com tudo que está marcado. Embaixo de cada dia tem o botão Agendar, pra marcar ali mesmo.',
      marcar: [{ alvo: { rotulo: 'Ver por' }, legenda: 'Semana' }],
    },
    {
      antes: [{ tipo: 'clicar', alvo: { papel: 'tab', nome: 'Dia' }, espera: 1200 }],
      titulo: 'O dia, hora por hora',
      texto: 'No Dia aparecem os horários, das sete da manhã às nove da noite. Horário livre? É só clicar nele que já abre o agendamento naquela hora.',
      marcar: [{ alvo: { texto: 'Dia todo', exato: true }, legenda: 'Sem horário' }],
      depois: [{ tipo: 'clicar', alvo: { papel: 'tab', nome: 'Mês' }, espera: 1200 }],
    },
    {
      titulo: 'Filtre pelo técnico',
      texto: 'Escolha o técnico pra ver só a agenda dele. As cores ajudam: azul é ordem de serviço, roxo é compromisso e verde é o que já foi feito.',
      marcar: [
        { alvo: { rotulo: 'Técnico' }, legenda: 'Técnico' },
        { alvo: { texto: 'Compromisso', exato: true }, legenda: 'Cores' },
      ],
    },
    {
      antes: [{ tipo: 'clicar', alvo: { papel: 'button', nome: 'Novo agendamento' }, espera: 1500 }],
      titulo: 'Novo agendamento',
      texto: 'Clique em Novo agendamento, ou clique direto num dia vazio do calendário. Aí você escolhe: um compromisso, como reunião, visita ou ligação, sem precisar de OS, ou uma ordem de serviço, que já abre agendada naquele dia.',
      marcar: [
        { alvo: { papel: 'radio', nome: /Compromisso/, dentro: 'dialog' }, legenda: 'Reunião, visita…' },
        { alvo: { papel: 'radio', nome: /Ordem de servi/, dentro: 'dialog' }, legenda: 'OS no dia' },
      ],
    },
    {
      antes: [{ tipo: 'preencher', alvo: { placeholder: 'Ex.: Reunião com o fornecedor' }, valor: 'Reunião com o fornecedor' }],
      titulo: 'Preencha o compromisso',
      texto: 'Escolha o tipo, escreva o assunto, o horário de início e de fim, com quem é e quem é o responsável. Depois é só clicar em Salvar, e ele aparece em roxo na agenda.',
      marcar: [
        { alvo: { placeholder: 'Ex.: Reunião com o fornecedor' }, legenda: 'Assunto' },
        { alvo: { css: 'input[type="time"]', dentro: 'dialog' }, legenda: 'Horário' },
        { alvo: { papel: 'button', nome: 'Salvar', exato: true, dentro: 'dialog' }, legenda: 'Salvar' },
      ],
      depois: [{ tipo: 'tecla', tecla: 'Escape', espera: 900 }],
      dica: 'Clicou num compromisso já marcado? Abre pra editar, marcar "Já foi feito" ou excluir. Clicou numa OS? Abre a OS.',
    },
  ],
};
