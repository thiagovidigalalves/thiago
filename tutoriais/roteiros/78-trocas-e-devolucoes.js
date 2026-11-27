// Trocas e devoluções feitas DE VERDADE na Demonstração (pedido do dono, 27/11/2026), no PDV (F8 Devoluções):
// 1) TROCA: a cliente fictícia Joana Exemplo (sem telefone) devolve a compra dela, leva duas emendas de rede e a
//    diferença fica de haver (crédito) no nome dela;
// 2) DEVOLUÇÃO SEM A VENDA ("Devolver só o produto"): uma emenda volta e o dinheiro sai do caixa.
// Devolução/troca não tem nota fiscal: no fim escolhe "Não imprimir". Depois mostra o relatório Trocas e devoluções.
module.exports = {
  id: 'trocas-e-devolucoes',
  ordem: 78,
  grupo: 'Relatórios',
  titulo: 'Trocas e devoluções',
  gravaDados: true,
  valoresReais: true, // a diferença da troca e o valor devolvido têm que fechar
  manter: ['Joana Exemplo', '25153507', '2*7896442302382', '7896442302382', 'FONE DE OUVIDO SEM FIO TWS M25', 'Emenda Rj45 8×8 Cat5 Cat6 1 Gbps Emenda Cabo De Rede 1 Uni', 'Emenda Rj45 8x8 Cat5 Cat6 1 Gbps Emenda Cabo De Rede 1 Uni'],
  assunto: {"chave": ["troca", "trocar", "devolução", "devolucao", "devolver", "haver", "crédito do cliente", "produto voltou"], "acoes": ["fazer", "faço", "lançar", "trocar", "devolver", "como", "ver"], "rotas": ["/pdv", "/relatorios/trocas-devolucoes"]},
  resumo: 'Faça a troca e a devolução no caixa (com haver, dinheiro, Pix ou cartão) e veja no relatório o que mais volta.',
  fala: 'Oi! Aqui é o Thiago, da Thiago Informática. Neste vídeo eu vou fazer uma troca e uma devolução de verdade no caixa, e depois te mostrar o relatório de trocas. Bora lá!',
  antesDeComecar: 'O caixa precisa estar aberto. Para devolver pela venda, a venda tem que ter sido feita no sistema.',
  passos: [
    {
      ir: '/pdv',
      espera: 15000,
      titulo: 'Troca e devolução são no caixa',
      texto: 'No menu, clica em Comercial, PDV. A troca e a devolução são feitas aqui no caixa. Clica em Nova venda.',
      marcar: [{ alvo: { papel: 'button', nome: /Nova venda/ }, legenda: 'Nova venda' }],
      depois: [{ tipo: 'clicar', alvo: { papel: 'button', nome: 'Nova venda' }, seguro: true, espera: 1800 }],
    },
    {
      antes: [
        { tipo: 'clicar', alvo: { papel: 'button', nome: 'Devoluções' }, seguro: true, espera: 2500 },
        { tipo: 'preencher', alvo: { placeholder: 'Nome do cliente, telefone, CPF ou nº da venda', dentro: 'dialog' }, valor: 'Joana Exemplo', espera: 3000 },
      ],
      titulo: 'Devoluções (F8): ache o cliente',
      texto: 'Clica em Devoluções, ou aperta F8. Procura o cliente pelo nome, telefone, CPF, ou pelo número da venda.',
      marcar: [{ alvo: { css: 'button:has-text("Joana Exemplo")', dentro: 'dialog' }, legenda: 'Cliente' }],
    },
    {
      antes: [{ tipo: 'clicar', alvo: { css: 'button:has-text("Joana Exemplo")', dentro: 'dialog' }, seguro: true, espera: 3500 }],
      titulo: 'Escolha a venda',
      texto: 'Clica no cliente e aparecem as compras dele. Escolhe a venda que ele está trazendo.',
      marcar: [{ alvo: { css: 'button.group', dentro: 'dialog' }, legenda: 'A compra' }],
    },
    {
      antes: [
        { tipo: 'clicar', alvo: { css: 'button.group', dentro: 'dialog' }, seguro: true, espera: 2000 },
        { tipo: 'clicar', alvo: { papel: 'button', nome: 'Devolver tudo', dentro: 'dialog' }, seguro: true, espera: 1200 },
      ],
      titulo: 'O que volta',
      texto: 'Agora diz o que está voltando: no mais e no menos de cada item, ou em Devolver tudo. Depois clica em Continuar.',
      marcar: [
        { alvo: { papel: 'button', nome: 'Devolver tudo', dentro: 'dialog' }, legenda: 'Devolver tudo' },
        { alvo: { papel: 'button', nome: /Continuar/, dentro: 'dialog' }, legenda: 'Continuar' },
      ],
      depois: [{ tipo: 'clicar', alvo: { papel: 'button', nome: /Continuar/, dentro: 'dialog' }, seguro: true, espera: 1800 }],
    },
    {
      titulo: 'Lance no caixa',
      texto: 'Confere o resumo, com o total a devolver, e clica em Lançar no caixa. Os itens entram na venda em vermelho.',
      marcar: [
        { alvo: { texto: 'Total a devolver', exato: true, dentro: 'dialog' }, legenda: 'Total a devolver' },
        { alvo: { papel: 'button', nome: /Lançar no caixa/, dentro: 'dialog' }, legenda: 'Lançar no caixa' },
      ],
      depois: [{ tipo: 'clicar', alvo: { papel: 'button', nome: /Lançar no caixa/, dentro: 'dialog' }, espera: 2500 }],
    },
    {
      antes: [
        { tipo: 'clicar', alvo: { placeholder: 'Código ou produto' }, seguro: true, espera: 400 },
        { tipo: 'preencher', alvo: { placeholder: 'Código ou produto' }, valor: '2*7896442302382', espera: 800 },
        { tipo: 'tecla', tecla: 'Enter', espera: 2000 },
      ],
      titulo: 'Troca: passe o produto novo',
      texto: 'É troca? Passa os produtos que ele vai levar no lugar. Aqui ele trocou por duas emendas de rede. O caixa já mostra a diferença.',
      marcar: [
        { alvo: { texto: /^Emenda Rj45/ }, legenda: 'Leva no lugar' },
        { alvo: { texto: 'TOTAL A RECEBER', exato: true }, legenda: 'Diferença' },
      ],
    },
    {
      antes: [
        { tipo: 'tecla', tecla: 'F9', espera: 2500 },
        { tipo: 'clicar', alvo: { papel: 'button', nome: 'Haver no cliente', dentro: 'dialog' }, seguro: true, espera: 1200 },
      ],
      titulo: 'Sobrou? Fica de haver',
      texto: 'Aperta F9. Sobrou dinheiro pro cliente, então escolhe como devolver: Haver no cliente, que fica de crédito pra próxima compra, ou dinheiro, Pix ou cartão. E Confirmar devolução.',
      marcar: [
        { alvo: { texto: 'Valor a devolver', exato: true, dentro: 'dialog' }, legenda: 'Diferença a devolver' },
        { alvo: { papel: 'button', nome: /Confirmar devolução/, dentro: 'dialog' }, legenda: 'Confirmar devolução' },
      ],
      depois: [
        { tipo: 'tecla', tecla: 'Enter', espera: 5000 },
        { tipo: 'clicar', alvo: { papel: 'button', nome: /Não imprimir/ }, seguro: true, opcional: true, espera: 2500 },
      ],
      dica: 'Se o produto novo for mais caro, o cliente paga só a diferença, em qualquer forma de pagamento.',
    },
    {
      antes: [
        { tipo: 'clicar', alvo: { papel: 'button', nome: 'Devoluções' }, seguro: true, espera: 2500 },
        { tipo: 'clicar', alvo: { papel: 'button', nome: 'Devolver só o produto', dentro: 'dialog' }, seguro: true, espera: 1500 },
        { tipo: 'preencher', alvo: { placeholder: 'Nome, código ou código de barras do produto', dentro: 'dialog' }, valor: '7896442302382', espera: 1500 },
        { tipo: 'clicar', alvo: { css: 'button:has-text("Emenda Rj45")', dentro: 'dialog' }, seguro: true, espera: 1200 },
      ],
      titulo: 'Devolução sem a venda',
      texto: 'E quando o cliente não tem a venda? Clica em Devoluções e em Devolver só o produto. Busca o produto e clica nele. Depois, Continuar.',
      marcar: [{ alvo: { texto: /^Emenda Rj45/, dentro: 'dialog' }, legenda: 'Produto que voltou' }],
      depois: [{ tipo: 'clicar', alvo: { papel: 'button', nome: /Continuar/, dentro: 'dialog' }, seguro: true, espera: 1800 }],
    },
    {
      antes: [
        { tipo: 'clicar', alvo: { papel: 'button', nome: 'Lançar no caixa', dentro: 'dialog' }, espera: 2500 },
        { tipo: 'tecla', tecla: 'F9', espera: 2500 },
        { tipo: 'clicar', alvo: { papel: 'button', nome: 'Dinheiro', dentro: 'dialog' }, seguro: true, espera: 1200 },
      ],
      titulo: 'Devolva em dinheiro',
      texto: 'Clica em Lançar no caixa, aperta F9 e escolhe Dinheiro, que sai do caixa. Confirmar devolução, e pronto.',
      marcar: [{ alvo: { papel: 'button', nome: /Confirmar devolução/, dentro: 'dialog' }, legenda: 'Confirmar devolução' }],
      depois: [
        { tipo: 'tecla', tecla: 'Enter', espera: 5000 },
        { tipo: 'clicar', alvo: { papel: 'button', nome: /Não imprimir/ }, seguro: true, opcional: true, espera: 2500 },
      ],
    },
    {
      ir: '/relatorios/trocas-devolucoes',
      espera: 7000,
      semMenu: true, // vem do PDV, que é tela cheia sem o menu lateral
      antes: [{ tipo: 'clicar', alvo: { papel: 'button', nome: '12 meses', exato: true }, seguro: true, espera: 4000 }],
      titulo: 'Relatório de trocas e devoluções',
      texto: 'E pra ver tudo isso, em Relatórios, Vendas, Trocas e devoluções: quantas teve, quanto voltou, como a loja devolveu, e os produtos que mais voltam.',
      marcar: [
        { alvo: { papel: 'button', nome: '12 meses', exato: true }, legenda: 'Período' },
        { alvo: { papel: 'heading', nome: 'Trocas e devoluções' }, legenda: 'Relatório' },
      ],
      dica: 'Produto que volta muito pode ter defeito de fábrica: fale com o fornecedor.',
    },
  ],
};
