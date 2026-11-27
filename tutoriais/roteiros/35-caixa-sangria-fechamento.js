// Sangria, suprimento e fechamento feitos DE VERDADE na Demonstração (pedido do dono, 27/11/2026): tira R$ 50 para o
// cofre, coloca R$ 20 de troco, confere no resumo, FECHA o caixa de verdade (sem retirada) e já ABRE de novo com
// R$ 100 de troco, para o caixa da Demonstração continuar aberto para os outros vídeos. No fim, o relatório de
// fechamentos. Nada vai para WhatsApp (no fechamento escolhe "Não fazer nada").
module.exports = {
  id: 'caixa-sangria-fechamento',
  ordem: 35,
  grupo: 'Comercial',
  titulo: 'Sangria, suprimento, fechar e abrir o caixa',
  gravaDados: true,
  valoresReais: true, // R$ 50, R$ 20 e R$ 100 do começo ao fim
  manter: ['Dinheiro para o cofre', 'Mais troco na gaveta', 'Fechamento do dia', 'Troco da gaveta', '50', '20', '100'],
  assunto: {"chave": ["sangria", "suprimento", "caixa", "gaveta", "fechar caixa", "abrir caixa", "fechamento"], "acoes": ["fazer", "fechar", "fecho", "fechamento", "abrir", "abro", "tirar", "retirar", "colocar", "sangria", "suprimento", "conferir"], "rotas": ["/pdv", "/relatorios/caixas/fechamentos"]}, // como o Thiaguinho acha o vídeo pela pergunta
  resumo: 'Tire ou coloque dinheiro na gaveta, confira o resumo, feche o caixa no fim do dia e abra de novo com o troco.',
  fala: 'Oi! Aqui é o Thiago, da Thiago Informática. Neste vídeo eu vou fazer de verdade uma sangria, um suprimento, fechar o caixa e abrir de novo com o troco. Bora lá!',
  passos: [
    {
      ir: '/pdv',
      espera: 15000,
      titulo: 'A tela do caixa',
      texto: 'No menu, clica em Comercial, PDV. Aqui na tela inicial do caixa ficam a Sangria, o Suprimento, o Resumo do caixa e o Fechar caixa.',
      marcar: [
        { alvo: { papel: 'button', nome: /Sangria/ }, legenda: 'Sangria' },
        { alvo: { papel: 'button', nome: /Suprimento/ }, legenda: 'Suprimento' },
        { alvo: { papel: 'button', nome: /Resumo do caixa/ }, legenda: 'Resumo' },
        { alvo: { papel: 'button', nome: /Fechar caixa/ }, legenda: 'Fechar caixa' },
      ],
    },
    {
      antes: [
        { tipo: 'clicar', alvo: { papel: 'button', nome: 'Sangria' }, seguro: true, espera: 1800 },
        { tipo: 'preencher', alvo: { css: 'div.space-y-1:has(label:text-is("Valor (R$)")) input', dentro: 'dialog' }, valor: '50', espera: 600 },
        { tipo: 'preencher', alvo: { placeholder: 'Opcional', dentro: 'dialog' }, valor: 'Dinheiro para o cofre', espera: 600 },
      ],
      titulo: 'Sangria: tirar dinheiro da gaveta',
      texto: 'A sangria é pra tirar dinheiro da gaveta. Clica em Sangria, digita o valor, cinquenta reais, e do que é. Deixando Cofre, só sai do caixa. Se for pagar uma despesa, escolhe ela aqui no plano de contas. E Confirmar.',
      marcar: [
        { alvo: { css: 'div.space-y-1:has(label:text-is("Valor (R$)")) input', dentro: 'dialog' }, legenda: 'R$ 50' },
        { alvo: { papel: 'button', nome: 'Confirmar', exato: true, dentro: 'dialog' }, legenda: 'Confirmar' },
      ],
      depois: [
        { tipo: 'clicar', alvo: { papel: 'button', nome: 'Confirmar', exato: true, dentro: 'dialog' }, espera: 3000 },
        { tipo: 'tecla', tecla: 'Escape', espera: 1200 }, // fecha a janela do Caixa (F12), se ficar aberta
      ],
    },
    {
      antes: [
        { tipo: 'clicar', alvo: { papel: 'button', nome: 'Suprimento' }, seguro: true, espera: 1800 },
        { tipo: 'preencher', alvo: { css: 'div.space-y-1:has(label:text-is("Valor (R$)")) input', dentro: 'dialog' }, valor: '20', espera: 600 },
        { tipo: 'preencher', alvo: { placeholder: 'Opcional', dentro: 'dialog' }, valor: 'Mais troco na gaveta', espera: 600 },
      ],
      titulo: 'Suprimento: colocar troco',
      texto: 'Faltou troco? É o suprimento. Clica em Suprimento, coloca o valor, vinte reais, e Confirmar.',
      marcar: [
        { alvo: { css: 'div.space-y-1:has(label:text-is("Valor (R$)")) input', dentro: 'dialog' }, legenda: 'R$ 20' },
        { alvo: { papel: 'button', nome: 'Confirmar', exato: true, dentro: 'dialog' }, legenda: 'Confirmar' },
      ],
      depois: [
        { tipo: 'clicar', alvo: { papel: 'button', nome: 'Confirmar', exato: true, dentro: 'dialog' }, espera: 3000 },
        { tipo: 'tecla', tecla: 'Escape', espera: 1200 },
      ],
    },
    {
      antes: [{ tipo: 'clicar', alvo: { papel: 'button', nome: 'Resumo do caixa' }, seguro: true, espera: 4000 }],
      titulo: 'Confira o resumo',
      texto: 'No Resumo do caixa aparece quanto vendeu em cada forma, e a sangria e o suprimento que eu acabei de fazer. Aqui você sabe quanto tem que ter na gaveta.',
      marcar: [{ alvo: { texto: 'Dinheiro para o cofre', dentro: 'dialog' }, legenda: 'Sangria' }],
      depois: [{ tipo: 'tecla', tecla: 'Escape', espera: 1500 }],
    },
    {
      antes: [
        { tipo: 'clicar', alvo: { papel: 'button', nome: 'Fechar caixa' }, seguro: true, espera: 5000 },
        { tipo: 'preencher', alvo: { placeholder: 'Diferença, conferência...', dentro: 'dialog' }, valor: 'Fechamento do dia', espera: 600 },
      ],
      titulo: 'Feche o caixa',
      texto: 'No fim do dia, clica em Fechar caixa. Ele mostra quanto tem que ter de dinheiro. Pra contar nota por nota, o Contar cédulas e moedas soma pra você. Se for levar dinheiro pro cofre, coloca o valor a retirar. E clica em Fechar caixa.',
      marcar: [
        { alvo: { papel: 'button', nome: /Contar cédulas e moedas/, dentro: 'dialog' }, legenda: 'Contar as notas' },
        { alvo: { placeholder: '0,00 (sem retirada)', dentro: 'dialog' }, legenda: 'Retirar pro cofre' },
        { alvo: { papel: 'button', nome: 'Fechar caixa', exato: true, dentro: 'dialog' }, legenda: 'Fechar caixa' },
      ],
      depois: [{ tipo: 'clicar', alvo: { papel: 'button', nome: 'Fechar caixa', exato: true, dentro: 'dialog' }, espera: 6000 }],
    },
    {
      antes: [{ tipo: 'esperar', alvo: { texto: 'Caixa fechado', exato: true, dentro: 'dialog' }, espera: 800 }],
      titulo: 'Caixa fechado',
      texto: 'Caixa fechado! Dá pra imprimir o fechamento em A4, na bobina, ou mandar no WhatsApp. Aqui eu clico em Não fazer nada.',
      marcar: [{ alvo: { papel: 'button', nome: /Não fazer nada/, dentro: 'dialog' }, legenda: 'Não fazer nada' }],
      depois: [{ tipo: 'clicar', alvo: { papel: 'button', nome: /Não fazer nada/, dentro: 'dialog' }, seguro: true, espera: 3000 }],
    },
    {
      antes: [
        { tipo: 'clicar', alvo: { papel: 'button', nome: 'Abrir caixa' }, seguro: true, espera: 2500 },
        { tipo: 'preencher', alvo: { placeholder: '0,00', exato: true, dentro: 'dialog' }, valor: '100', espera: 600 },
        { tipo: 'preencher', alvo: { placeholder: /^Ex\.: troco inicial/, dentro: 'dialog' }, valor: 'Troco da gaveta', espera: 600 },
      ],
      titulo: 'Abra o caixa com o troco',
      texto: 'No outro dia, é só clicar em Abrir caixa, colocar o troco que ficou na gaveta, aqui cem reais, e clicar em Abrir caixa de novo. Pronto, caixa aberto pra vender.',
      marcar: [
        { alvo: { placeholder: '0,00', exato: true, dentro: 'dialog' }, legenda: 'Troco R$ 100' },
        { alvo: { papel: 'button', nome: 'Abrir caixa', exato: true, dentro: 'dialog' }, legenda: 'Abrir caixa' },
      ],
      depois: [{ tipo: 'clicar', alvo: { papel: 'button', nome: 'Abrir caixa', exato: true, dentro: 'dialog' }, espera: 4000 }],
      atencao: 'Feche o caixa todo dia. No dia seguinte, abra de novo com o valor do troco.',
    },
    {
      ir: '/relatorios/caixas/fechamentos',
      espera: 6000,
      semMenu: true, // vem do PDV, que é tela cheia sem o menu lateral
      titulo: 'Confira os fechamentos',
      texto: 'E o dono vê todos os caixas fechados, com as sobras e as faltas, em Relatórios, Caixas, Fechamento de caixa. O que eu acabei de fechar já está aqui.',
      marcar: [{ alvo: { papel: 'heading', nome: 'Fechamento de Caixa' }, legenda: 'Fechamentos' }],
    },
  ],
};
