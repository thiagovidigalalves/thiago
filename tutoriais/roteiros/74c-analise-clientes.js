// Relatórios › Clientes › Análise de clientes (tela nova, 21/11/2026): nota A/B/C/D de cada cliente pelo histórico.
// Só leitura; "Analisar todos" só recalcula as notas. Nomes viram fictícios no vídeo.
module.exports = {
  id: 'analise-clientes',
  ordem: 74.3,
  grupo: 'Relatórios',
  titulo: 'Análise de clientes: nota A, B, C ou D',
  assunto: { chave: ['analise de cliente', 'nota do cliente', 'bom pagador', 'mau pagador', 'cliente bom', 'nota a b c d'], acoes: ['ver', 'saber', 'analisar', 'como', 'funciona'], rotas: ['/relatorios/clientes/analise'] },
  resumo: 'Cada cliente ganha uma nota pelo que compra e como paga: você vê na hora quem é bom pagador e quem sumiu.',
  fala: 'Oi! Aqui é o Thiago, da Thiago Informática. Neste vídeo eu vou te mostrar a Análise de clientes: cada cliente ganha uma nota, A, B, C ou D, pelo jeito que compra e paga. Bora lá!',
  passos: [
    {
      ir: '/relatorios/clientes/analise',
      espera: 8000,
      titulo: 'Abra a Análise de clientes',
      texto: 'Em Relatórios, Clientes, Análise de clientes. Aqui em cima mostra quantos clientes tem em cada nota: A é o melhor, D é quem mais atrasa.',
      marcar: [{ alvo: { papel: 'heading', nome: /Análise de clientes/ }, legenda: 'Notas A, B, C, D' }],
    },
    {
      titulo: 'Filtre do jeito que precisar',
      texto: 'Dá pra buscar o cliente pelo nome, ver só uma nota, só quem está devendo, ou quem está parado há mais de noventa dias, pra chamar de volta.',
      marcar: [
        { alvo: { placeholder: 'Buscar cliente…' }, legenda: 'Busca' },
        { alvo: { papel: 'button', nome: 'Só quem deve', exato: true }, legenda: 'Quem deve' },
        { alvo: { papel: 'button', nome: 'Parados há 90+ dias', exato: true }, legenda: 'Sumidos' },
      ],
    },
    {
      antes: [{ tipo: 'clicar', alvo: { css: 'div.divide-y > button' }, seguro: true, espera: 4000 }],
      titulo: 'A análise de cada cliente',
      texto: 'Clicando no cliente, abre a análise dele: as compras dos últimos doze meses, as parcelas pagas, o que ele mais compra e o histórico, que também conta na nota.',
      marcar: [{ alvo: { texto: /Compras nos últimos 12 meses/ }, legenda: 'Tudo do cliente' }],
      depois: [{ tipo: 'tecla', tecla: 'Escape', espera: 1000 }],
      dica: 'A nota também aparece no cadastro do cliente e no caixa, na hora da venda.',
    },
  ],
};
