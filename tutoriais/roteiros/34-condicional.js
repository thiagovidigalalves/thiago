// Condicional feita DE VERDADE na Demonstração (pedido do dono, 27/11/2026): a cliente fictícia Joana Exemplo (sem
// telefone) leva o fone e duas emendas para provar (saída salva), devolve uma emenda (devolução confirmada) e o resto
// vira venda no PDV (PDV › Condicional › Transformar em venda), recebida em dinheiro e finalizada SEM nota ("3" e
// "Não imprimir"). O "Transformar em venda (ir ao PDV)" da tela Comercial › Condicional não é usado porque abre o PDV
// sem o ?empresa= (o robô cairia em outra empresa).
module.exports = {
  id: 'condicional',
  ordem: 34,
  grupo: 'Comercial',
  titulo: 'Condicional: cliente leva para provar, devolve e compra',
  gravaDados: true,
  valoresReais: true, // R$ 80 + 2 x R$ 5; volta uma emenda; venda de R$ 85
  manter: ['Joana Exemplo', '25153507', '7896442302382', 'FONE DE OUVIDO SEM FIO TWS M25', 'Emenda Rj45 8×8 Cat5 Cat6 1 Gbps Emenda Cabo De Rede 1 Uni', 'Emenda Rj45 8x8 Cat5 Cat6 1 Gbps Emenda Cabo De Rede 1 Uni'],
  assunto: {"chave": ["condicional", "levar para provar", "levou para casa", "provar em casa", "devolveu", "mala"], "acoes": ["fazer", "lançar", "criar", "nova", "devolver", "baixar", "vender", "transformar", "como"], "rotas": ["/comercial/condicional"]},
  resumo: 'O cliente leva os produtos para provar; depois você dá baixa no que voltou e vende o resto no caixa.',
  fala: 'Oi! Aqui é o Thiago, da Thiago Informática. Neste vídeo eu vou lançar uma condicional de verdade: a cliente leva as peças pra provar, devolve uma, e o resto vira venda no caixa. Bora lá!',
  antesDeComecar: 'Ter os produtos cadastrados. O cliente pode ser cadastrado na hora.',
  passos: [
    {
      ir: '/comercial/condicional',
      espera: 7000,
      titulo: 'Abra a Condicional',
      texto: 'No menu, clica em Comercial, Condicional. Aqui fica o que os clientes levaram pra provar: quantas estão na rua e quantas venceram. Pra lançar, é no Nova condicional.',
      marcar: [{ alvo: { papel: 'button', nome: 'Nova condicional' }, legenda: 'Nova condicional' }],
    },
    {
      antes: [
        { tipo: 'clicar', alvo: { papel: 'button', nome: 'Nova condicional' }, seguro: true, espera: 1800 },
        { tipo: 'preencher', alvo: { placeholder: /^Opcional — digite o nome/, dentro: 'dialog' }, valor: 'Joana Exemplo', espera: 2500 },
        { tipo: 'esperar', alvo: { css: 'button.block:has-text("Joana Exemplo")', dentro: 'dialog' }, espera: 300 },
        { tipo: 'clicar', alvo: { css: 'button.block:has-text("Joana Exemplo")', dentro: 'dialog' }, seguro: true, espera: 1500 },
      ],
      titulo: 'Cliente e validade',
      texto: 'Clica em Nova condicional e escolhe o cliente: digita o nome e clica nele. Do lado, se quiser, o vendedor e a validade: até quando ele pode ficar com as peças.',
      marcar: [
        { alvo: { css: 'div.border-emerald-300:has-text("Joana Exemplo")', dentro: 'dialog' }, legenda: 'Cliente' },
        { alvo: { css: 'input[type="date"]', dentro: 'dialog' }, legenda: 'Validade' },
      ],
    },
    {
      antes: [
        { tipo: 'preencher', alvo: { placeholder: 'Bipe o código de barras ou digite e tecle Enter', dentro: 'dialog' }, valor: '25153507', espera: 600 },
        { tipo: 'tecla', tecla: 'Enter', espera: 1800 },
        { tipo: 'preencher', alvo: { css: 'div:has(> span:text-is("Qtd")) input', dentro: 'dialog' }, valor: '2', espera: 600 },
        { tipo: 'preencher', alvo: { placeholder: 'Bipe o código de barras ou digite e tecle Enter', dentro: 'dialog' }, valor: '7896442302382', espera: 600 },
        { tipo: 'tecla', tecla: 'Enter', espera: 1800 },
      ],
      titulo: 'Bipe as peças',
      texto: 'Agora bipa cada peça que ele vai levar, ou digita o código e aperta Enter. Pra levar mais de uma, muda a quantidade antes de bipar. Aqui ele levou o fone e duas emendas.',
      marcar: [
        { alvo: { texto: 'FONE DE OUVIDO SEM FIO TWS M25', exato: true, dentro: 'dialog' }, legenda: 'Fone' },
        { alvo: { texto: /^Emenda Rj45/, dentro: 'dialog' }, legenda: '2 emendas' },
      ],
    },
    {
      titulo: 'Salve a condicional',
      texto: 'Clica em Salvar condicional. As peças saem do estoque na hora.',
      marcar: [{ alvo: { papel: 'button', nome: /Salvar condicional/, dentro: 'dialog' }, legenda: 'Salvar condicional' }],
      depois: [{ tipo: 'clicar', alvo: { papel: 'button', nome: /Salvar condicional/, dentro: 'dialog' }, aguardarFechar: true, espera: 3000 }],
    },
    {
      titulo: 'Imprima ou mande o link',
      texto: 'Pronto, a condicional está salva. Aqui do lado dá pra imprimir em oitenta milímetros ou A4 pro cliente assinar, ou mandar o link pra ele assinar no celular.',
      marcar: [
        { alvo: { papel: 'heading', nome: /Condicional #/ }, legenda: 'Salva' },
        { alvo: { papel: 'button', nome: /Link p\/ assinar/ }, legenda: 'Link para assinar' },
      ],
    },
    {
      antes: [
        { tipo: 'clicar', alvo: { papel: 'button', nome: 'Devolver itens' }, seguro: true, espera: 1500 },
        { tipo: 'clicar', alvo: { css: 'button[aria-label^="Somar uma unidade de Emenda"]' }, seguro: true, espera: 1000 },
      ],
      titulo: 'O cliente voltou: devolva',
      texto: 'O cliente voltou e devolveu uma emenda. Clica em Devolver itens, e no mais um de cada peça que voltou. Depois, Confirmar devolução.',
      marcar: [
        { alvo: { css: 'input[aria-label^="Quantidade a devolver de Emenda"]' }, legenda: 'Voltou 1' },
        { alvo: { papel: 'button', nome: /Confirmar devolução/ }, legenda: 'Confirmar devolução' },
      ],
      depois: [{ tipo: 'clicar', alvo: { papel: 'button', nome: /Confirmar devolução/ }, espera: 4000 }],
    },
    {
      ir: '/pdv',
      espera: 15000,
      antes: [
        { tipo: 'clicar', alvo: { papel: 'button', nome: 'Condicional' }, seguro: true, espera: 4000 },
        { tipo: 'esperar', alvo: { css: 'button:has-text("Joana Exemplo")', dentro: 'dialog' }, espera: 800 },
      ],
      titulo: 'O resto vira venda no caixa',
      texto: 'O resto ele ficou. Pra cobrar, no menu, clica em Comercial, PDV, e na tela do caixa clica em Condicional. Abre a condicional do cliente.',
      marcar: [{ alvo: { css: 'button:has-text("Joana Exemplo")', dentro: 'dialog' }, legenda: 'Condicional do cliente' }],
      depois: [{ tipo: 'clicar', alvo: { css: 'button:has-text("Joana Exemplo")', dentro: 'dialog' }, seguro: true, espera: 3000 }],
    },
    {
      titulo: 'Transformar em venda',
      texto: 'Aqui aparece o que voltou e o que ficou. Clica em Transformar em venda.',
      marcar: [{ alvo: { papel: 'button', nome: /Transformar em venda/, dentro: 'dialog' }, legenda: 'Transformar em venda' }],
      depois: [{ tipo: 'clicar', alvo: { papel: 'button', nome: /Transformar em venda/, dentro: 'dialog' }, seguro: true, espera: 3000 }],
    },
    {
      antes: [
        { tipo: 'tecla', tecla: 'F9', espera: 2500 },
        { tipo: 'clicar', alvo: { papel: 'button', nome: 'Dinheiro', dentro: 'dialog' }, seguro: true, espera: 1500 },
      ],
      titulo: 'Receba e finalize',
      texto: 'As peças que ficaram com ele já vieram pra venda. Aperta F9, escolhe a forma, aqui foi Dinheiro, e Enter. Sem nota: tecla três, e Não imprimir.',
      marcar: [{ alvo: { papel: 'button', nome: /Confirmar/, dentro: 'dialog' }, legenda: 'Confirmar (Enter)' }],
      depois: [
        { tipo: 'tecla', tecla: 'Enter', espera: 5000 },
        { tipo: 'tecla', tecla: '3', espera: 2500 },
        { tipo: 'clicar', alvo: { papel: 'button', nome: /Não imprimir/ }, seguro: true, espera: 2500 },
      ],
    },
    {
      ir: '/comercial/condicional',
      espera: 7000,
      semMenu: true, // vem do PDV, que é tela cheia sem o menu lateral
      antes: [{ tipo: 'preencher', alvo: { placeholder: 'Cliente, vendedor ou número' }, valor: 'Joana Exemplo', espera: 3000 }],
      titulo: 'Situação atualizada',
      texto: 'E lá em Condicional, ela aparece com a situação atualizada. Os filtros mostram quem ainda está com peças na rua e quem passou do prazo.',
      marcar: [{ alvo: { css: 'button:has-text("Joana Exemplo")' }, legenda: 'Situação' }],
      dica: 'Os filtros "Na rua" e "Vencidas" mostram quem está com produtos e quem passou do prazo.',
    },
  ],
};
