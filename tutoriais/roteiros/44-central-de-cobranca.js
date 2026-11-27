// Central de cobrança feita DE VERDADE na Demonstração (pedido do dono, 27/11/2026). A cliente fictícia "Joana Exemplo"
// (SEM telefone: nenhuma cobrança vai para o WhatsApp de ninguém) tem parcelas atrasadas, lançadas pelo vídeo de
// Contas a receber (parcelado com a 1ª parcela já vencida). O robô abre a ficha dela, anota "Prometeu pagar" com data
// e SALVA a anotação. Enviar cobrança e Pix (precisa de banco vinculado) só são marcados, não clicados.
module.exports = {
  id: 'central-de-cobranca',
  ordem: 44,
  grupo: 'Financeiro',
  titulo: 'Cobrar clientes atrasados (Central de cobrança)',
  gravaDados: true,
  manter: ['Joana Exemplo', 'Prometeu pagar', 'Ligou dizendo que paga no dia 10'],
  assunto: { chave: ['cobranca', 'cobrar', 'atrasado', 'devendo', 'inadimplente', 'prometeu pagar'], acoes: ['cobrar', 'mandar', 'enviar', 'ver', 'anotar', 'como'], rotas: ['/financeiro/cobranca'] },
  resumo: 'Veja quem está devendo, anote a conversa com o cliente e mande cobrança pelo WhatsApp para vários de uma vez.',
  fala: 'Oi! Aqui é o Thiago, da Thiago Informática. Neste vídeo eu vou te mostrar a Central de cobrança: quem está devendo, como anotar o que o cliente prometeu e como mandar a cobrança. Bora lá!',
  antesDeComecar: 'Ter contas a receber vencidas. Na Demonstração, a Joana Exemplo tem um parcelado com a primeira parcela vencida (vídeo Contas a receber).',
  passos: [
    {
      ir: '/financeiro/cobranca',
      espera: 7000,
      titulo: 'Abra a Central de cobrança',
      texto: 'No menu, clica em Financeiro, Cobrança, Central de cobrança. Lá em cima aparece o total vencido e quantos clientes estão atrasados.',
      marcar: [{ alvo: { texto: /^Vencido:/ }, legenda: 'Total vencido' }],
    },
    {
      titulo: 'Faixas de atraso',
      texto: 'Embaixo vêm as faixas: a vencer, de um a quinze dias, de dezesseis a trinta, e assim por diante. Clicou numa faixa, aparecem só esses clientes.',
      marcar: [{ alvo: { papel: 'button', nome: /1 a 15 dias/ }, legenda: 'Faixas de atraso' }],
    },
    {
      antes: [{ tipo: 'preencher', alvo: { placeholder: 'Nome ou telefone' }, valor: 'Joana Exemplo', espera: 2500 }],
      titulo: 'Busque o cliente',
      texto: 'Pra achar alguém, é só digitar o nome aqui. Na linha do cliente aparece quanto ele deve e há quantos dias. O botão verde manda a cobrança no WhatsApp com as parcelas.',
      marcar: [
        { alvo: { css: 'tbody tr:has-text("Joana Exemplo")' }, legenda: 'Joana Exemplo' },
        { alvo: { css: 'button[aria-label="Cobrar Joana Exemplo no WhatsApp"]' }, legenda: 'Cobrar no WhatsApp' },
      ],
    },
    {
      antes: [
        { tipo: 'clicar', alvo: { css: 'tbody tr:has-text("Joana Exemplo") button:text-is("Ver")' }, seguro: true, espera: 3500 },
        { tipo: 'esperar', alvo: { texto: 'Parcelas em aberto', dentro: 'dialog' }, espera: 800 },
      ],
      titulo: 'A ficha do cliente',
      texto: 'Clicando em Ver, abre a ficha: as parcelas em aberto, com o valor do dia já com juros. Daqui dá pra marcar as parcelas e clicar em Cobrar agora.',
      marcar: [
        { alvo: { texto: 'Parcelas em aberto', dentro: 'dialog' }, legenda: 'Parcelas' },
        { alvo: { papel: 'button', nome: /Cobrar agora/, dentro: 'dialog' }, legenda: 'Cobrar agora' },
      ],
      dica: 'Com o Pix do banco ligado, aparece também "Gerar Pix (QR)": o cliente paga e a conta baixa sozinha.',
    },
    {
      antes: [
        { tipo: 'escolher', alvo: { css: 'section:has(h3:has-text("Anotação")) select', dentro: 'dialog' }, valor: 'Prometeu pagar', espera: 800 },
        { tipo: 'preencher', alvo: { css: 'section:has(h3:has-text("Anotação")) input[type=date]', dentro: 'dialog' }, valor: '2026-12-10', espera: 500 },
        { tipo: 'preencher', alvo: { placeholder: 'Ex.: ligou dizendo que paga dia 20', dentro: 'dialog' }, valor: 'Ligou dizendo que paga no dia 10', espera: 800 },
      ],
      titulo: 'Anote o que o cliente falou',
      texto: 'Falou com o cliente? Na Anotação, escolhe Prometeu pagar, coloca a data que ele prometeu e escreve o que ele disse. Assim você não cobra de novo antes da hora.',
      marcar: [
        { alvo: { css: 'section:has(h3:has-text("Anotação")) select', dentro: 'dialog' }, legenda: 'Prometeu pagar' },
        { alvo: { placeholder: 'Ex.: ligou dizendo que paga dia 20', dentro: 'dialog' }, legenda: 'O que ele disse' },
      ],
    },
    {
      titulo: 'Salve a anotação',
      texto: 'Clica em Salvar anotação.',
      marcar: [{ alvo: { papel: 'button', nome: 'Salvar anotação', dentro: 'dialog' }, legenda: 'Salvar anotação' }],
      depois: [
        { tipo: 'clicar', alvo: { papel: 'button', nome: 'Salvar anotação', dentro: 'dialog' }, espera: 2500 },
        { tipo: 'tecla', tecla: 'Escape', espera: 2500 },
      ],
    },
    {
      antes: [{ tipo: 'escolher', alvo: { rotulo: 'Situação' }, valor: 'Prometeu pagar', espera: 2500 }],
      titulo: 'Filtre quem prometeu pagar',
      texto: 'Na lista, a Joana já aparece com Prometeu pagar e a data. E no filtro de situação dá pra ver só quem prometeu, quem está negociando ou quem nunca foi cobrado.',
      marcar: [
        { alvo: { rotulo: 'Situação' }, legenda: 'Situação' },
        { alvo: { css: 'tbody tr:has-text("Joana Exemplo")' }, legenda: 'Prometeu pagar' },
      ],
    },
    {
      antes: [{ tipo: 'escolher', alvo: { rotulo: 'Situação' }, valor: 'Todas as situações', espera: 1500 }],
      titulo: 'Cobrar vários de uma vez',
      texto: 'Pra cobrar vários de uma vez, marca os clientes, ou Marcar todos aqui em cima, e clica em Enviar cobrança. Confere a mensagem, deixa o link de pagamento marcado, e envia. O cliente paga pelo link e a conta baixa sozinha.',
      marcar: [{ alvo: { rotulo: 'Marcar todos' }, legenda: 'Marcar todos' }],
      atencao: 'Cliente sem WhatsApp no cadastro fica de fora do envio. Clique em "Cadastrar" embaixo do nome para colocar o número.',
    },
  ],
};
