// A comprar: Chegou e dar entrada (versão 2026.11.24.873). Gravado na Demonstração com 2 itens fictícios já comprados
// (Fone TWS M25 x10 e Emenda RJ45 x50, Distribuidora Exemplo). NÃO confirma entrada nenhuma: vai até a conferência da
// Entrada manual (quadro verde "Da lista A comprar") e volta. "Tenho a nota" e "Só marcar" são só mostrados.
module.exports = {
  id: 'a-comprar-chegou',
  ordem: 38.5,
  grupo: 'Estoque',
  titulo: 'A comprar: chegou e dar entrada',
  gravaDados: true,
  manter: ['FONE DE OUVIDO SEM FIO TWS M25', 'Emenda Rj45 8x8 Cat5 Cat6 1 Gbps Emenda Cabo De Rede 1 Uni', 'Distribuidora Exemplo', 'Ana Gestora'],
  assunto: { chave: ['a comprar', 'lista de compras', 'chegou', 'chegaram', 'mercadoria chegou', 'dar entrada'], acoes: ['chegou', 'chegaram', 'dar', 'lançar', 'marcar', 'receber', 'como'], rotas: ['/estoque/a-comprar'] },
  resumo: 'Quando a mercadoria chega, confira o que veio e dê entrada sem nota, pela nota ou só marque que chegou.',
  fala: 'Oi! Aqui é o Thiago, da Thiago Informática. Neste vídeo eu vou te mostrar o que fazer quando chega o que você comprou da lista A comprar. Bora lá!',
  passos: [
    {
      ir: '/estoque/a-comprar',
      espera: 6000,
      antes: [{ tipo: 'clicar', alvo: { papel: 'button', nome: /Comprados/ }, seguro: true, espera: 2500 }],
      titulo: 'Abra A comprar',
      texto: 'No menu, clica em Estoque, A comprar. Clica em Comprados: aqui fica o que você já comprou e está esperando chegar.',
      marcar: [{ alvo: { css: '[aria-label="Marcar FONE DE OUVIDO SEM FIO TWS M25"]' }, legenda: 'Esperando chegar' }],
    },
    {
      antes: [
        { tipo: 'clicar', alvo: { css: '[aria-label="Marcar FONE DE OUVIDO SEM FIO TWS M25"]' }, seguro: true, espera: 700 },
        { tipo: 'clicar', alvo: { css: '[aria-label="Marcar Emenda Rj45 8x8 Cat5 Cat6 1 Gbps Emenda Cabo De Rede 1 Uni"]' }, seguro: true, espera: 900 },
      ],
      titulo: 'Marque o que chegou',
      texto: 'Chegou a mercadoria? Marca os itens e clica em Chegaram, dar entrada. Dá pra fazer com um item só no botão Chegou da linha, até mesmo sem ter marcado que comprou.',
      marcar: [{ alvo: { papel: 'button', nome: /Chegaram · dar entrada/ }, legenda: 'Chegaram' }],
      depois: [{ tipo: 'clicar', alvo: { papel: 'button', nome: /Chegaram · dar entrada/ }, seguro: true, espera: 2000 }],
    },
    {
      antes: [
        { tipo: 'clicar', alvo: { papel: 'button', nome: /Chegou tudo/, dentro: 'dialog' }, seguro: true, espera: 800 },
        { tipo: 'preencher', alvo: { css: '[aria-label="Quantidade de Emenda Rj45 8x8 Cat5 Cat6 1 Gbps Emenda Cabo De Rede 1 Uni que chegou"]', dentro: 'dialog' }, valor: '30', espera: 900 },
      ],
      titulo: 'Chegou tudo ou só uma parte',
      texto: 'Na janela Chegou, o que veio, clica em Chegou tudo. Veio menos? É só mudar a quantidade. Aqui chegaram trinta emendas das cinquenta, e as vinte que faltam continuam na lista.',
      marcar: [
        { alvo: { papel: 'button', nome: /Chegou tudo/, dentro: 'dialog' }, legenda: 'Chegou tudo' },
        { alvo: { texto: /Parcial: continua faltando/, dentro: 'dialog' }, legenda: 'Falta 20' },
      ],
    },
    {
      titulo: 'Três jeitos de dar entrada',
      texto: 'Agora, três caminhos: dar entrada sem nota, tenho a nota fiscal, que abre a entrada pelo XML, ou só marcar que chegou, sem mexer no estoque nem no financeiro.',
      marcar: [
        { alvo: { papel: 'button', nome: /Dar entrada sem nota/, dentro: 'dialog' }, legenda: 'Sem nota' },
        { alvo: { papel: 'button', nome: /Tenho a nota fiscal/, dentro: 'dialog' }, legenda: 'Com a nota (XML)' },
        { alvo: { papel: 'button', nome: /Só marcar que chegou/, dentro: 'dialog' }, legenda: 'Só marcar' },
      ],
    },
    {
      antes: [{ tipo: 'clicar', alvo: { papel: 'button', nome: /Dar entrada sem nota/, dentro: 'dialog' }, seguro: true, espera: 6000 }],
      titulo: 'Entrada manual já preenchida',
      texto: 'Clicando em dar entrada sem nota, abre a Entrada manual já com o fornecedor, os produtos, as quantidades e os preços. Você não digita nada de novo.',
      marcar: [{ alvo: { papel: 'button', nome: /Próximo: pagamento/ }, legenda: 'Próximo' }],
    },
    {
      antes: [
        { tipo: 'clicar', alvo: { papel: 'button', nome: /Próximo: pagamento/ }, seguro: true, espera: 2000 },
        { tipo: 'clicar', alvo: { papel: 'button', nome: /Conferir e avançar para custos/ }, seguro: true, espera: 6000 },
      ],
      titulo: 'Conferência: da lista A comprar',
      texto: 'Escolhe como pagou e vai pra conferência. Esse quadro verde mostra os itens da lista A comprar: quando você gerar a entrada, eles passam pra Chegou sozinhos.',
      marcar: [{ alvo: { css: '[aria-label="Itens da lista A comprar nesta entrada"]' }, legenda: 'Da lista A comprar' }],
    },
    {
      ir: '/estoque/a-comprar',
      espera: 6000,
      antes: [
        { tipo: 'clicar', alvo: { papel: 'button', nome: /Chegaram no mês/ }, seguro: true, espera: 2500 },
        { tipo: 'clicar', alvo: { papel: 'button', nome: /Pela entrada manual/ }, seguro: true, espera: 2000 },
      ],
      titulo: 'Aba Chegou: de onde veio',
      texto: 'E de volta em A comprar, na aba Chegou, dá pra filtrar pela nota fiscal, pela entrada manual ou só marcado. E cada item mostra a etiqueta de onde veio a entrada.',
      marcar: [
        { alvo: { css: '[aria-label="Como chegou"]' }, legenda: 'Filtros' },
        { alvo: { texto: /Entrada manual/ }, legenda: 'Origem' },
      ],
    },
  ],
};
