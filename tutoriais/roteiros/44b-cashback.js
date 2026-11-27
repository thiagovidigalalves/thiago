// Cashback feito DE VERDADE na Demonstração (pedido do dono, 27/11/2026): liga o cashback com uma regra fictícia
// (5%, compra mínima R$ 50, máximo R$ 30 por venda, vale 60 dias), salva a regra e confere as vendas.
// "Avisar no WhatsApp" NÃO é clicado (os clientes da Demonstração têm telefone): só marcado.
// O ligar/salvar não manda mensagem sozinho (a função "cashback" não envia WhatsApp; o aviso é só pelo botão).
module.exports = {
  id: 'cashback',
  ordem: 44.5,
  grupo: 'Financeiro',
  titulo: 'Cashback: parte da compra volta para o cliente',
  gravaDados: true,
  valoresReais: true, // regra fictícia, coerente do começo ao fim
  assunto: { chave: ['cashback', 'credito de volta', 'dinheiro de volta', 'fidelidade'], acoes: ['ligar', 'configurar', 'usar', 'como', 'funciona'], rotas: ['/financeiro/cashback'] },
  resumo: 'Parte de cada compra paga volta para o cliente como haver, para usar na próxima compra.',
  fala: 'Oi! Aqui é o Thiago, da Thiago Informática. Neste vídeo eu vou ligar o Cashback de verdade: uma parte de cada compra volta pro cliente usar na próxima, e ele volta na sua loja. Bora lá!',
  passos: [
    {
      ir: '/financeiro/cashback',
      espera: 6000,
      titulo: 'Abra o Cashback',
      texto: 'No menu, clica em Clientes, Cashback. Aqui em cima você vê se ele está ligado ou desligado.',
      marcar: [{ alvo: { texto: /⚙️ Regra/ }, legenda: 'A regra' }],
    },
    {
      antes: [
        { tipo: 'preencher', alvo: { css: 'label:has-text("Volta") input' }, valor: '5', espera: 400 },
        { tipo: 'preencher', alvo: { css: 'label:has-text("Compra mínima") input' }, valor: '50', espera: 400 },
        { tipo: 'preencher', alvo: { css: 'label:has-text("Máximo por venda") input' }, valor: '30', espera: 400 },
        { tipo: 'preencher', alvo: { css: 'label:has-text("Vale por") input' }, valor: '60', espera: 900 },
      ],
      titulo: 'Monte a regra',
      texto: 'Primeiro a regra: quanto volta, aqui cinco por cento. A compra mínima, o máximo por venda e em quantos dias o cliente pode usar. Embaixo ele já mostra um exemplo da conta.',
      marcar: [
        { alvo: { css: 'label:has-text("Volta") input' }, legenda: 'Quanto volta' },
        { alvo: { css: 'label:has-text("Compra mínima") input' }, legenda: 'Compra mínima' },
        { alvo: { css: 'label:has-text("Vale por") input' }, legenda: 'Validade' },
      ],
    },
    {
      titulo: 'Salve a regra',
      texto: 'Clica em Salvar regra.',
      marcar: [{ alvo: { papel: 'button', nome: 'Salvar regra' }, legenda: 'Salvar regra' }],
      depois: [{ tipo: 'clicar', alvo: { papel: 'button', nome: 'Salvar regra' }, espera: 3000 }],
    },
    {
      titulo: 'Ligue o cashback',
      texto: 'Agora clica em Ligar cashback. Pronto: a partir de agora, toda venda paga, com cliente, já gera o cashback dele.',
      marcar: [{ alvo: { papel: 'button', nome: '🟢 Ligar cashback' }, legenda: 'Ligar' }],
      depois: [
        { tipo: 'clicar', alvo: { papel: 'button', nome: '🟢 Ligar cashback' }, espera: 3000 },
        { tipo: 'esperar', alvo: { texto: /🟢 Ligado/ }, espera: 800 },
      ],
      atencao: 'Só contam as vendas feitas depois de ligar. Troca, devolução e o que foi pago com haver não contam.',
    },
    {
      titulo: 'Está ligado',
      texto: 'Olha aqui em cima: Ligado, cinco por cento.',
      marcar: [{ alvo: { texto: /🟢 Ligado/ }, legenda: 'Ligado' }],
    },
    {
      titulo: 'A mensagem do WhatsApp',
      texto: 'Do lado fica a mensagem que o cliente recebe contando quanto ganhou e até quando pode usar. Dá pra mudar o texto do seu jeito.',
      marcar: [{ alvo: { texto: /💬 Aviso no WhatsApp/ }, legenda: 'Mensagem' }],
    },
    {
      titulo: 'Confira as vendas',
      texto: 'O sistema confere as vendas sozinho a cada quinze minutos. Se quiser na hora, clica em Conferir vendas agora.',
      marcar: [{ alvo: { papel: 'button', nome: /Conferir vendas agora/ }, legenda: 'Conferir agora' }],
      depois: [{ tipo: 'clicar', alvo: { papel: 'button', nome: /Conferir vendas agora/ }, seguro: true, espera: 4000 }],
    },
    {
      titulo: 'Quem tem cashback',
      texto: 'Embaixo aparece quanto foi gerado, quanto está disponível e quanto já foi usado, e a lista de cada cliente. Pra avisar todo mundo de uma vez, é o botão Avisar no WhatsApp. E na hora da venda, o caixa já mostra o cashback do cliente como haver.',
      marcar: [
        { alvo: { placeholder: 'Buscar cliente ou nº da venda' }, legenda: 'Clientes' },
        { alvo: { papel: 'button', nome: /Avisar no WhatsApp/ }, legenda: 'Avisar no WhatsApp' },
      ],
    },
  ],
};
