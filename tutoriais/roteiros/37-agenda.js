// Agenda (Comercial › Agenda) feita DE VERDADE na Demonstração (pedido do dono, 27/11/2026): agenda uma visita à
// cliente fictícia "Joana Exemplo" (sem telefone) para hoje, às 14h, salva, abre de novo e marca "Já foi feito".
// Mostra também o jeito de agendar uma OS (abre a OS nova já com o dia; o resto é o vídeo da Ordem de serviço).
module.exports = {
  id: 'agenda',
  ordem: 37,
  grupo: 'Comercial',
  titulo: 'Agenda: serviços, visitas e compromissos',
  gravaDados: true,
  manter: ['Visita na Joana Exemplo', 'Joana Exemplo', '14:00', '15:00'],
  assunto: { chave: ['agenda', 'agendar', 'agendamento', 'compromisso', 'reuniao', 'calendario', 'visita'], acoes: ['funciona', 'usar', 'ver', 'marcar', 'agendar', 'criar', 'fazer', 'abrir', 'colocar', 'como'], rotas: ['/comercial/agenda'] },
  resumo: 'Veja no calendário as OS e os compromissos do mês, da semana ou do dia, e agende com um clique.',
  fala: 'Oi! Aqui é o Thiago, da Thiago Informática. Neste vídeo eu vou agendar de verdade uma visita pra uma cliente, marcar como feita, e te mostrar como agendar uma ordem de serviço. Bora lá!',
  passos: [
    {
      ir: '/comercial/agenda',
      espera: 6000,
      antes: [{ tipo: 'clicar', alvo: { papel: 'tab', nome: 'Mês', exato: true }, seguro: true, espera: 1200 }],
      titulo: 'Abra a Agenda',
      texto: 'No menu, clica em Comercial, Agenda. Aqui fica o calendário com as ordens de serviço agendadas e os seus compromissos. Em cima você escolhe ver por Mês, Semana ou Dia.',
      marcar: [
        { alvo: { rotulo: 'Ver por' }, legenda: 'Mês, Semana ou Dia' },
        { alvo: { papel: 'button', nome: 'Hoje', exato: true }, legenda: 'Volta pra hoje' },
      ],
    },
    {
      antes: [{ tipo: 'clicar', alvo: { papel: 'button', nome: 'Novo agendamento' }, seguro: true, espera: 1500 }],
      titulo: 'Novo agendamento',
      texto: 'Clica em Novo agendamento, ou direto num dia do calendário. Aí você escolhe: um Compromisso, como visita, reunião ou ligação, ou uma Ordem de serviço. Primeiro o compromisso.',
      marcar: [
        { alvo: { papel: 'radio', nome: /Compromisso/, dentro: 'dialog' }, legenda: 'Compromisso' },
        { alvo: { papel: 'radio', nome: /Ordem de servi/, dentro: 'dialog' }, legenda: 'OS no dia' },
      ],
    },
    {
      antes: [
        { tipo: 'clicar', alvo: { papel: 'button', nome: '🚗 Visita', dentro: 'dialog' }, seguro: true, espera: 700 },
        { tipo: 'preencher', alvo: { placeholder: 'Ex.: Reunião com o fornecedor', dentro: 'dialog' }, valor: 'Visita na Joana Exemplo', espera: 600 },
        { tipo: 'preencher', alvo: { css: 'label:has-text("Início") input', dentro: 'dialog' }, valor: '14:00', espera: 500 },
        { tipo: 'preencher', alvo: { css: 'label:has-text("Fim") input', dentro: 'dialog' }, valor: '15:00', espera: 500 },
        { tipo: 'preencher', alvo: { placeholder: 'Cliente, fornecedor…', dentro: 'dialog' }, valor: 'Joana Exemplo', espera: 800 },
      ],
      titulo: 'Preencha o compromisso',
      texto: 'Escolhe o tipo, aqui Visita. Escreve o assunto, o horário de início e de fim, e com quem é. Em Responsável dá pra escolher quem vai.',
      marcar: [
        { alvo: { papel: 'button', nome: '🚗 Visita', dentro: 'dialog' }, legenda: 'Tipo' },
        { alvo: { placeholder: 'Ex.: Reunião com o fornecedor', dentro: 'dialog' }, legenda: 'Assunto' },
        { alvo: { css: 'label:has-text("Início") input', dentro: 'dialog' }, legenda: 'Horário' },
      ],
    },
    {
      titulo: 'Salve',
      texto: 'Tudo certo? Clica em Salvar.',
      marcar: [{ alvo: { papel: 'button', nome: 'Salvar', exato: true, dentro: 'dialog' }, legenda: 'Salvar' }],
      depois: [{ tipo: 'clicar', alvo: { papel: 'button', nome: 'Salvar', exato: true, dentro: 'dialog' }, aguardarFechar: true, espera: 2500 }],
    },
    {
      titulo: 'O compromisso já está na agenda',
      texto: 'Pronto! A visita já aparece no dia de hoje, em roxo, que é a cor dos compromissos. Azul é ordem de serviço, e verde é o que já foi feito.',
      marcar: [{ alvo: { css: 'aside button:has-text("Visita na Joana Exemplo")' }, legenda: 'Visita às 14h' }],
    },
    {
      antes: [
        { tipo: 'clicar', alvo: { css: 'aside button:has-text("Visita na Joana Exemplo")' }, seguro: true, espera: 1500 },
        { tipo: 'clicar', alvo: { css: 'label:has-text("Já foi feito") input[type=checkbox]', dentro: 'dialog' }, seguro: true, espera: 800 },
      ],
      titulo: 'Já foi? Marque como feito',
      texto: 'Fez a visita? Clica no compromisso, marca Já foi feito e salva. Aqui também dá pra mudar o horário ou excluir.',
      marcar: [
        { alvo: { texto: 'Já foi feito', dentro: 'dialog' }, legenda: 'Já foi feito' },
        { alvo: { papel: 'button', nome: 'Salvar', exato: true, dentro: 'dialog' }, legenda: 'Salvar' },
      ],
      depois: [{ tipo: 'clicar', alvo: { papel: 'button', nome: 'Salvar', exato: true, dentro: 'dialog' }, aguardarFechar: true, espera: 2500 }],
    },
    {
      titulo: 'Ficou verde: feito',
      texto: 'Agora ele aparece como Feito, em verde.',
      marcar: [{ alvo: { css: 'aside button:has-text("Visita na Joana Exemplo")' }, legenda: 'Feito' }],
    },
    {
      antes: [{ tipo: 'clicar', alvo: { papel: 'tab', nome: 'Semana', exato: true }, seguro: true, espera: 1500 }],
      titulo: 'A semana e o dia',
      texto: 'Na Semana, cada dia vira uma coluna com tudo que está marcado, e embaixo tem o botão Agendar. No Dia, aparecem os horários: clicou num horário livre, já abre o agendamento naquela hora.',
      marcar: [{ alvo: { rotulo: 'Ver por' }, legenda: 'Semana' }],
      depois: [{ tipo: 'clicar', alvo: { papel: 'tab', nome: 'Mês', exato: true }, seguro: true, espera: 1200 }],
    },
    {
      antes: [
        { tipo: 'clicar', alvo: { papel: 'button', nome: 'Novo agendamento' }, seguro: true, espera: 1500 },
        { tipo: 'clicar', alvo: { papel: 'radio', nome: /Ordem de servi/, dentro: 'dialog' }, seguro: true, espera: 1000 },
      ],
      titulo: 'Agendar uma ordem de serviço',
      texto: 'E pra agendar um serviço, clica em Novo agendamento e escolhe Ordem de serviço. Clicando em Abrir nova OS, ela abre já agendada nesse dia, e aí você preenche o cliente, o técnico e o serviço.',
      marcar: [{ alvo: { papel: 'button', nome: /Abrir nova OS/, dentro: 'dialog' }, legenda: 'Abrir nova OS' }],
      depois: [{ tipo: 'clicar', alvo: { papel: 'button', nome: 'Cancelar', exato: true, dentro: 'dialog' }, seguro: true, espera: 1000 }],
      dica: 'Escolha o técnico no filtro "Técnico" para ver só a agenda dele. Cada técnico recebe a agenda do dia no WhatsApp às 8h, se estiver ligado em Configurações › Ordem de Serviço.',
    },
  ],
};
