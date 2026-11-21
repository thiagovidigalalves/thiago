// Venda no PDV feita DE VERDADE na Demonstração (pedido do dono, 21/11/2026): lança dois produtos, recebe em dinheiro,
// mostra o troco e conclui. A Demonstração não tem emissão fiscal configurada: nenhuma nota é emitida.
// No fim escolhe "Não imprimir" (não manda WhatsApp para ninguém).
module.exports = {
  id: 'vender-no-pdv',
  ordem: 30,
  grupo: 'Comercial',
  titulo: 'Fazer uma venda no PDV (caixa)',
  gravaDados: true,
  valoresReais: true, // R$ 90, 100 e 10 de troco: a conta tem que fechar
  manter: ['25153507', '2*7896442302382', '7896442302382', 'FONE DE OUVIDO SEM FIO TWS M25', 'Emenda Rj45 8×8 Cat5 Cat6 1 Gbps Emenda Cabo De Rede 1 Uni', 'Emenda Rj45 8x8 Cat5 Cat6 1 Gbps Emenda Cabo De Rede 1 Uni'],
  assunto: {"chave": ["venda", "vender", "vendo", "pdv", "caixa"], "acoes": ["fazer", "faço", "lançar", "registrar", "vender", "passar", "nova", "como", "pdv"], "rotas": ["/pdv"]}, // como o Thiaguinho acha o vídeo pela pergunta
  resumo: 'Lance os produtos, receba o pagamento e veja o troco: a venda inteira, do começo ao fim.',
  fala: 'Oi! Aqui é o Thiago, da Thiago Informática. Neste vídeo eu vou fazer uma venda no caixa de verdade, do começo ao fim: lançar os produtos, receber e dar o troco. Bora lá!',
  antesDeComecar: 'Ter pelo menos um produto cadastrado e o caixa aberto.',
  passos: [
    {
      ir: '/pdv',
      espera: 12000,
      titulo: 'Abra o PDV',
      texto: 'No menu, clica em Comercial, PDV. Lá em cima mostra que o caixa está aberto. No começo do dia, é por aqui que você abre o caixa, com o troco da gaveta.',
      marcar: [
        { alvo: { texto: /Caixa aberto/ }, legenda: 'Caixa aberto' },
        { alvo: { papel: 'button', nome: /Nova venda/ }, legenda: 'Nova venda' },
      ],
    },
    {
      antes: [
        { tipo: 'clicar', alvo: { papel: 'button', nome: /Nova venda/ }, seguro: true, espera: 1500 },
        { tipo: 'preencher', alvo: { placeholder: 'Código ou produto' }, valor: '25153507' },
        { tipo: 'tecla', tecla: 'Enter', espera: 2000 },
      ],
      titulo: 'Bipe o produto',
      texto: 'Clica em Nova venda e bipa o código de barras, ou digita o código e aperta Enter. O produto entra na venda.',
      marcar: [{ alvo: { texto: 'FONE DE OUVIDO SEM FIO TWS M25', exato: true }, legenda: 'Produto lançado' }],
    },
    {
      antes: [
        { tipo: 'preencher', alvo: { placeholder: 'Código ou produto' }, valor: '2*7896442302382' },
        { tipo: 'tecla', tecla: 'Enter', espera: 2000 },
      ],
      titulo: 'Mais de uma unidade',
      texto: 'Pra lançar várias unidades, digita a quantidade, um asterisco e o código. Aqui eu lancei duas. O total já aparece do lado.',
      marcar: [
        { alvo: { texto: /^Emenda Rj45/ }, legenda: '2 unidades' },
        { alvo: { texto: 'TOTAL A RECEBER', exato: true }, legenda: 'Total' },
      ],
    },
    {
      antes: [
        { tipo: 'tecla', tecla: 'F9', espera: 2000 },
        { tipo: 'preencher', alvo: { css: 'input[data-payment-amount]' }, valor: '100' },
        { tipo: 'clicar', alvo: { papel: 'button', nome: /Dinheiro/ }, seguro: true, espera: 1500 },
      ],
      titulo: 'Receba o pagamento',
      texto: 'Aperta F9. Digita quanto o cliente deu, cem reais, e escolhe Dinheiro. O sistema já mostra o troco de dez reais.',
      marcar: [
        { alvo: { texto: /TROCO A DEVOLVER/ }, legenda: 'Troco' },
        { alvo: { papel: 'button', nome: /Confirmar/ }, legenda: 'Confirmar (Enter)' },
      ],
      depois: [{ tipo: 'tecla', tecla: 'Enter', espera: 4500 }],
      dica: 'Pix, cartão e crediário também ficam aqui; dá pra dividir o pagamento em mais de uma forma.',
    },
    {
      titulo: 'Venda concluída',
      texto: 'Pronto, venda feita! Agora ele pergunta do comprovante: imprimir em A4, na bobina, não imprimir, ou mandar pelo WhatsApp do cliente.',
      marcar: [{ alvo: { texto: 'Imprimir comprovante?', exato: true }, legenda: 'Comprovante' }],
      depois: [{ tipo: 'clicar', alvo: { papel: 'button', nome: /Não imprimir/ }, seguro: true, espera: 2000 }],
    },
  ],
};
