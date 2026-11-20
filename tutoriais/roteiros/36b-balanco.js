// Balanço do estoque (Estoque › Balanço), pedido de 20/11/2026 (versão 764). Na Demonstração, que já tem o
// "Balanço da equipe (exemplo)" com Ana Souza e Carlos Lima contando. NUNCA clicar em "Gerar balanço" nesse exemplo:
// ele fica aberto para os próximos vídeos. O robô também não digita contagem nele (só mostra onde faz).
module.exports = {
  id: 'balanco',
  ordem: 36.5,
  grupo: 'Estoque',
  titulo: 'Balanço do estoque',
  manter: ['Balanço da equipe (exemplo)', 'Ana Souza', 'Carlos Lima'],
  assunto: { chave: ['balanco', 'balanço', 'inventario', 'inventário', 'contagem', 'contar estoque'], acoes: ['fazer', 'como', 'contar', 'gerar', 'abrir', 'usar'], rotas: ['/estoque/balanco', '/appbalanco'] },
  resumo: 'Conte o estoque bipando, digitando ou pela foto com IA, com a equipe toda junto, e no final gere o ajuste de uma vez.',
  fala: 'Oi! Aqui é o Thiago, da Thiago Informática. Neste vídeo eu vou te mostrar o Balanço do estoque: contar bipando ou pela foto, com a equipe toda contando junto, até pelo celular. Bora lá!',
  passos: [
    {
      ir: '/estoque/balanco',
      espera: 5000,
      titulo: 'Abra o Balanço',
      texto: 'No menu, clica em Estoque, depois em Balanço. Aqui ficam os balanços: os que estão em contagem e os que já foram gerados.',
      marcar: [{ alvo: { papel: 'button', nome: 'Novo balanço' }, legenda: 'Novo balanço' }],
    },
    {
      antes: [{ tipo: 'clicar', alvo: { papel: 'button', nome: 'Novo balanço' }, seguro: true, espera: 1200 }],
      titulo: 'O que vai contar',
      texto: 'Em Novo balanço você dá um nome e escolhe o que vai contar: o estoque todo, um grupo, uma marca ou um fornecedor. Depois é só clicar em Começar a contar.',
      marcar: [
        { alvo: { css: 'label:has-text("O que vai contar") select' }, legenda: 'Tudo, grupo, marca ou fornecedor' },
        { alvo: { papel: 'button', nome: 'Começar a contar' }, legenda: 'Começar' },
      ],
      depois: [{ tipo: 'clicar', alvo: { papel: 'button', nome: 'Cancelar', exato: true }, seguro: true, espera: 1000 }],
    },
    {
      antes: [{ tipo: 'clicar', alvo: { papel: 'button', nome: /Balanço da equipe \(exemplo\)/ }, seguro: true, espera: 5000 }],
      titulo: 'Bipe ou digite o código',
      texto: 'Na contagem, é só bipar o código de barras: cada bip soma um. Dá pra pôr a quantidade do lado, ou digitar doze x e o código, que já soma doze. E também dá pra digitar a quantidade direto na lista.',
      marcar: [
        { alvo: { placeholder: 'Bipe o código de barras (ou digite o código e Enter)' }, legenda: 'Bipe aqui' },
        { alvo: { css: 'label:has-text("Qtd") input' }, legenda: 'Quantidade' },
      ],
    },
    {
      titulo: 'A equipe contando junto',
      texto: 'Aqui aparece a equipe contando, ao vivo, e as últimas contagens. Vários celulares contam ao mesmo tempo, e um não apaga a contagem do outro: tudo vai somando.',
      marcar: [
        { alvo: { texto: /Equipe contando/ }, legenda: 'Ao vivo' },
        { alvo: { texto: /Últimas contagens/ }, legenda: 'Quem contou o quê' },
      ],
    },
    {
      titulo: 'Foto com IA',
      texto: 'O botão roxo é a Foto com IA: você tira a foto da prateleira, confere o produto e a quantidade que ela achou e toca em Somar ao balanço. Ele aparece quando os Recursos inteligentes estão ligados.',
      marcar: [{ alvo: { papel: 'button', nome: /Foto com IA/ }, legenda: 'Foto com IA' }],
    },
    {
      antes: [{ tipo: 'clicar', alvo: { papel: 'button', nome: 'Revisar e gerar' }, seguro: true, espera: 1500 }],
      titulo: 'Revisar e gerar',
      texto: 'Terminou? Clica em Revisar e gerar. Aqui aparecem as maiores diferenças, pra recontar antes. Você escolhe se os produtos não contados ficam como estão ou vão pra zero, o motivo da quebra, e clica em Gerar balanço.',
      marcar: [
        { alvo: { texto: /Maiores diferenças/ }, legenda: 'Recontar' },
        { alvo: { css: 'label:has-text("Produtos que não foram contados") select' }, legenda: 'Manter ou zerar' },
        { alvo: { css: 'label:has-text("Motivo da quebra") select' }, legenda: 'Motivo' },
        { alvo: { papel: 'button', nome: 'Gerar balanço' }, legenda: 'Gera o ajuste' },
      ],
      depois: [{ tipo: 'clicar', alvo: { papel: 'button', nome: 'Continuar contando', exato: true }, seguro: true, forcar: true, espera: 1000 }], // a legenda fica por cima: clique forçado
      dica: 'O balanço salva sozinho a cada contagem: dá pra parar e continuar depois.',
    },
    {
      // Volta para a lista pelo botão (o menu na mesma tela não sai da contagem).
      antes: [{ tipo: 'clicar', alvo: { css: 'button[aria-label="Voltar"]' }, seguro: true, espera: 3000 }],
      titulo: 'Contar pelo celular',
      texto: 'E pra contar andando pela loja, abre o Balanço no celular: cada pessoa conta com o próprio celular e tudo cai aqui no mesmo balanço.',
      marcar: [{ alvo: { papel: 'link', nome: 'abrir o Balanço no celular' }, legenda: 'No celular' }],
    },
  ],
};
