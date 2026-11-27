// Venda no PDV feita DE VERDADE na Demonstração (pedido do dono, 27/11/2026): os 4 jeitos de receber, cada um numa
// venda gravada até o fim: 1) dinheiro com troco; 2) cartão de crédito parcelado; 3) dividido (dinheiro + Pix);
// 4) a prazo no crediário, com a cliente fictícia Joana Exemplo (sem telefone: nada vai para WhatsApp).
// Nota fiscal NUNCA é transmitida: no fim de cada venda aperta "3" (Venda normal, sem documento fiscal) e "Não imprimir".
// No fim mostra as vendas gravadas no F4.
module.exports = {
  id: 'vender-no-pdv',
  ordem: 30,
  grupo: 'Comercial',
  titulo: 'Fazer uma venda no PDV (caixa)',
  gravaDados: true,
  valoresReais: true, // R$ 90, 100 e 10 de troco; 2x de 40; 30 + 50; 3x no crediário: a conta tem que fechar
  manter: ['Joana Exemplo', '25153507', '2*7896442302382', '7896442302382', 'FONE DE OUVIDO SEM FIO TWS M25', 'Emenda Rj45 8×8 Cat5 Cat6 1 Gbps Emenda Cabo De Rede 1 Uni', 'Emenda Rj45 8x8 Cat5 Cat6 1 Gbps Emenda Cabo De Rede 1 Uni', '100', '30'],
  assunto: {"chave": ["venda", "vender", "vendo", "pdv", "caixa", "troco", "parcelar", "parcelado", "cartão", "pix", "crediário", "crediario", "a prazo", "fiado", "dividir pagamento"], "acoes": ["fazer", "faço", "lançar", "registrar", "vender", "passar", "nova", "como", "pdv", "receber", "parcelar", "dividir"], "rotas": ["/pdv"]}, // como o Thiaguinho acha o vídeo pela pergunta
  resumo: 'Lance os produtos e receba de todos os jeitos: dinheiro com troco, cartão parcelado, Pix, pagamento dividido e crediário.',
  fala: 'Oi! Aqui é o Thiago, da Thiago Informática. Neste vídeo eu vou fazer vendas de verdade no caixa, do começo ao fim: no dinheiro com troco, no cartão parcelado, no Pix e no crediário. Bora lá!',
  antesDeComecar: 'Ter os produtos cadastrados e o caixa aberto. Para vender no crediário, o cliente precisa estar cadastrado.',
  passos: [
    {
      ir: '/pdv',
      espera: 15000,
      titulo: 'Abra o PDV',
      texto: 'No menu, clica em Comercial, PDV. Esse é o caixa. Lá em cima mostra que o caixa está aberto. Pra vender, é no Nova venda.',
      marcar: [
        { alvo: { texto: /Caixa aberto/ }, legenda: 'Caixa aberto' },
        { alvo: { papel: 'button', nome: /Nova venda/ }, legenda: 'Nova venda' },
      ],
    },
    {
      antes: [
        { tipo: 'clicar', alvo: { papel: 'button', nome: 'Nova venda' }, seguro: true, espera: 1800 },
        { tipo: 'clicar', alvo: { placeholder: 'Código ou produto' }, seguro: true, espera: 400 },
        { tipo: 'preencher', alvo: { placeholder: 'Código ou produto' }, valor: '25153507', espera: 800 },
        { tipo: 'tecla', tecla: 'Enter', espera: 2000 },
      ],
      titulo: 'Bipe o produto',
      texto: 'Clica em Nova venda e bipa o código de barras do produto, ou digita o código e aperta Enter. Pronto, ele já entrou na venda.',
      marcar: [{ alvo: { texto: 'FONE DE OUVIDO SEM FIO TWS M25', exato: true }, legenda: 'Produto lançado' }],
    },
    {
      antes: [
        { tipo: 'preencher', alvo: { placeholder: 'Código ou produto' }, valor: '2*7896442302382', espera: 800 },
        { tipo: 'tecla', tecla: 'Enter', espera: 2000 },
      ],
      titulo: 'Mais de uma unidade',
      texto: 'Pra lançar várias unidades, digita a quantidade, um asterisco e o código. Aqui foram duas. O total já aparece aqui do lado.',
      marcar: [
        { alvo: { texto: /^Emenda Rj45/ }, legenda: '2 unidades' },
        { alvo: { texto: 'TOTAL A RECEBER', exato: true }, legenda: 'Total' },
      ],
    },
    {
      antes: [
        { tipo: 'tecla', tecla: 'F9', espera: 2500 },
        { tipo: 'preencher', alvo: { css: 'input[data-payment-amount]' }, valor: '100', espera: 600 },
        { tipo: 'clicar', alvo: { papel: 'button', nome: 'Dinheiro', dentro: 'dialog' }, seguro: true, espera: 1500 },
      ],
      titulo: 'Dinheiro com troco',
      texto: 'Agora aperta F9 pra receber. O cliente me deu cem reais: digito cem e clico em Dinheiro. Olha aí o troco de dez reais. É só apertar Enter.',
      marcar: [
        { alvo: { texto: /TROCO A DEVOLVER/ }, legenda: 'Troco' },
        { alvo: { papel: 'button', nome: /Confirmar/, dentro: 'dialog' }, legenda: 'Confirmar (Enter)' },
      ],
      depois: [{ tipo: 'tecla', tecla: 'Enter', espera: 5000 }],
    },
    {
      titulo: 'Sem nota e sem papel',
      texto: 'Venda gravada! Agora ele pergunta o documento. Nota fiscal tem um vídeo só dela. Aqui eu aperto três, venda sem nota, e depois Não imprimir.',
      marcar: [{ alvo: { papel: 'button', nome: /sem documento fiscal/, dentro: 'dialog' }, legenda: '3 · Sem nota' }],
      depois: [
        { tipo: 'tecla', tecla: '3', espera: 2500 },
        { tipo: 'clicar', alvo: { papel: 'button', nome: /Não imprimir/ }, seguro: true, espera: 2500 },
      ],
      atencao: 'As teclas 1 e 2 emitem a nota fiscal na hora. Para venda sem nota, é a 3.',
    },
    {
      antes: [
        { tipo: 'clicar', alvo: { placeholder: 'Código ou produto' }, seguro: true, espera: 400 },
        { tipo: 'preencher', alvo: { placeholder: 'Código ou produto' }, valor: '25153507', espera: 800 },
        { tipo: 'tecla', tecla: 'Enter', espera: 2000 },
        { tipo: 'tecla', tecla: 'F9', espera: 2500 },
        { tipo: 'clicar', alvo: { papel: 'button', nome: 'Crédito', dentro: 'dialog' }, seguro: true, espera: 1200 },
        { tipo: 'clicar', alvo: { papel: 'button', nome: 'Crédito', dentro: 'dialog' }, seguro: true, espera: 1500 },
      ],
      titulo: 'Cartão parcelado',
      texto: 'Agora uma venda no cartão. Bipa o produto e aperta F9. Clica em Cartão Crédito. Clicando de novo, ele parcela: aqui ficou em duas vezes. E Enter.',
      marcar: [
        { alvo: { papel: 'button', nome: /Crédito/, dentro: 'dialog' }, legenda: 'Clique de novo = +1 parcela' },
        { alvo: { css: '[aria-label="Parcelas e vencimentos"]', dentro: 'dialog' }, legenda: '2x' },
      ],
      depois: [
        { tipo: 'tecla', tecla: 'Enter', espera: 5000 },
        { tipo: 'tecla', tecla: '3', espera: 2500 },
        { tipo: 'clicar', alvo: { papel: 'button', nome: /Não imprimir/ }, seguro: true, espera: 2500 },
      ],
      dica: 'Cada forma tem uma letra de atalho (aparece no botão): no cartão de crédito, cada toque na letra soma uma parcela.',
    },
    {
      antes: [
        { tipo: 'clicar', alvo: { placeholder: 'Código ou produto' }, seguro: true, espera: 400 },
        { tipo: 'preencher', alvo: { placeholder: 'Código ou produto' }, valor: '25153507', espera: 800 },
        { tipo: 'tecla', tecla: 'Enter', espera: 2000 },
        { tipo: 'tecla', tecla: 'F9', espera: 2500 },
        { tipo: 'preencher', alvo: { css: 'input[data-payment-amount]' }, valor: '30', espera: 600 },
        { tipo: 'clicar', alvo: { papel: 'button', nome: 'Dinheiro', dentro: 'dialog' }, seguro: true, espera: 1500 },
        { tipo: 'clicar', alvo: { papel: 'button', nome: 'Pix', dentro: 'dialog' }, seguro: true, espera: 1500 },
      ],
      titulo: 'Dividir: dinheiro e Pix',
      texto: 'Dá pra dividir o pagamento. Nessa venda o cliente pagou trinta reais em Dinheiro, e o resto no Pix. Os pagamentos aparecem aqui do lado. Enter, e pronto.',
      marcar: [
        { alvo: { texto: 'Pagamentos da venda', exato: true, dentro: 'dialog' }, legenda: 'R$ 30 em dinheiro' },
        { alvo: { papel: 'button', nome: /Pix/i, dentro: 'dialog' }, legenda: 'O resto no Pix' },
      ],
      depois: [
        { tipo: 'tecla', tecla: 'Enter', espera: 5000 },
        { tipo: 'tecla', tecla: '3', espera: 2500 },
        { tipo: 'clicar', alvo: { papel: 'button', nome: /Não imprimir/ }, seguro: true, espera: 2500 },
      ],
    },
    {
      antes: [
        { tipo: 'clicar', alvo: { placeholder: 'Código ou produto' }, seguro: true, espera: 400 },
        { tipo: 'preencher', alvo: { placeholder: 'Código ou produto' }, valor: '25153507', espera: 800 },
        { tipo: 'tecla', tecla: 'Enter', espera: 2000 },
        { tipo: 'tecla', tecla: 'F10', espera: 2000 },
        { tipo: 'preencher', alvo: { placeholder: 'Nome, telefone, CPF/CNPJ ou endereço...', dentro: 'dialog' }, valor: 'Joana Exemplo', espera: 3500 },
        { tipo: 'esperar', alvo: { papel: 'button', nome: /^Joana Exemplo/, dentro: 'dialog' }, espera: 300 },
        { tipo: 'clicar', alvo: { papel: 'button', nome: /^Joana Exemplo/, dentro: 'dialog' }, seguro: true, espera: 2000 },
      ],
      titulo: 'A prazo: escolha o cliente (F10)',
      texto: 'Agora uma venda a prazo, no crediário. Pra isso tem que ter o cliente: bipa o produto, aperta F10 e escolhe o cliente.',
      marcar: [{ alvo: { css: 'button:has-text("F10"):has-text("Joana Exemplo")' }, legenda: 'Cliente' }],
    },
    {
      antes: [
        { tipo: 'tecla', tecla: 'F9', espera: 2500 },
        { tipo: 'clicar', alvo: { papel: 'button', nome: 'Crediário', dentro: 'dialog' }, seguro: true, espera: 1200 },
        { tipo: 'clicar', alvo: { papel: 'button', nome: 'Crediário', dentro: 'dialog' }, seguro: true, espera: 1000 },
        { tipo: 'clicar', alvo: { papel: 'button', nome: 'Crediário', dentro: 'dialog' }, seguro: true, espera: 1500 },
      ],
      titulo: 'Crediário em parcelas',
      texto: 'Aperta F9 e clica em Crediário. Cada clique é mais uma parcela: aqui ficou em três vezes, com o vencimento de cada uma, todo mês. Dá pra mudar a data e o valor aqui. Enter, três, e Não imprimir.',
      marcar: [{ alvo: { css: '[aria-label="Parcelas e vencimentos"]', dentro: 'dialog' }, legenda: '3 parcelas e vencimentos' }],
      depois: [
        { tipo: 'tecla', tecla: 'Enter', espera: 5000 },
        { tipo: 'tecla', tecla: '3', espera: 2500 },
        { tipo: 'clicar', alvo: { papel: 'button', nome: /Não imprimir/ }, seguro: true, espera: 2500 },
      ],
      dica: 'As parcelas do crediário vão sozinhas para Financeiro › Contas a Receber, no nome do cliente.',
    },
    {
      antes: [
        { tipo: 'tecla', tecla: 'F4', espera: 3500 },
        { tipo: 'esperar', alvo: { placeholder: 'Buscar venda, cliente ou valor', dentro: 'dialog' }, espera: 1500 },
      ],
      titulo: 'Vendas feitas (F4)',
      texto: 'Pronto! Todas as vendas ficam no F4, Vendas. Olha aqui as vendas que eu acabei de fazer, com a forma de pagamento de cada uma.',
      marcar: [{ alvo: { texto: 'Joana Exemplo', dentro: 'dialog' }, legenda: 'Venda no crediário' }],
      depois: [{ tipo: 'tecla', tecla: 'Escape', espera: 1500 }],
    },
  ],
};
