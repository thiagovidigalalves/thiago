// Balanço do estoque (Estoque › Balanço), feito DE VERDADE na Demonstração (pedido do dono, 27/11/2026):
// cria um balanço novo "Balanço da vitrine", conta bipando o código (cada bip soma 1), com a quantidade do lado
// e digitando direto na lista, revisa e GERA (a pergunta do navegador é aceita: aceitarConfirmacao).
// Os produtos não contados ficam como estão ("Manter o estoque como está").
// O exemplo "Balanço da equipe (exemplo)" (Ana Souza e Carlos Lima contando) NÃO é mexido: fica aberto para os vídeos.
const FONE = 'FONE DE OUVIDO SEM FIO TWS M25';
const EMENDA = 'Emenda Rj45 8x8 Cat5 Cat6 1 Gbps Emenda Cabo De Rede 1 Uni';
const NOME = 'Balanço da vitrine';
const bip = { placeholder: 'Bipe o código de barras (ou digite o código e Enter)' };
module.exports = {
  id: 'balanco',
  ordem: 36.5,
  grupo: 'Estoque',
  titulo: 'Balanço do estoque',
  gravaDados: true,
  valoresReais: true,
  aceitarConfirmacao: true, // "Gerar o balanço nº X? O estoque de N produto(s) será ajustado." (pergunta do navegador)
  manter: [NOME, 'Balanço da equipe (exemplo)', 'Ana Souza', 'Carlos Lima', FONE, EMENDA, '25153507'],
  assunto: { chave: ['balanco', 'balanço', 'inventario', 'inventário', 'contagem', 'contar estoque'], acoes: ['fazer', 'como', 'contar', 'gerar', 'abrir', 'usar'], rotas: ['/estoque/balanco', '/appbalanco'] },
  resumo: 'Conte o estoque bipando, digitando ou pela foto com IA, com a equipe toda junto, e no final gere o ajuste de uma vez.',
  fala: 'Oi! Aqui é o Thiago, da Thiago Informática. Neste vídeo eu vou fazer um balanço do estoque de verdade: contar bipando, digitando, e no final gerar o ajuste. Bora lá!',
  passos: [
    {
      ir: '/estoque/balanco',
      espera: 5000,
      titulo: 'Abra o Balanço',
      texto: 'No menu, clica em Estoque, Balanço. Aqui ficam os balanços: os que estão em contagem e os que já foram gerados. Pra começar um, é em Novo balanço.',
      marcar: [{ alvo: { papel: 'button', nome: 'Novo balanço' }, legenda: 'Novo balanço' }],
    },
    {
      antes: [
        { tipo: 'clicar', alvo: { papel: 'button', nome: 'Novo balanço' }, seguro: true, espera: 1200 },
        { tipo: 'preencher', alvo: { css: 'label:has-text("Nome") input' }, valor: NOME, espera: 700 },
        { tipo: 'escolher', alvo: { css: 'label:has-text("O que vai contar") select' }, valor: 'Todo o estoque', espera: 600 },
      ],
      titulo: 'Nome e o que vai contar',
      texto: 'Dá um nome pro balanço e escolhe o que vai contar: o estoque todo, um grupo, uma marca ou um fornecedor. Depois clica em Começar a contar.',
      marcar: [
        { alvo: { css: 'label:has-text("Nome") input' }, legenda: 'Nome' },
        { alvo: { css: 'label:has-text("O que vai contar") select' }, legenda: 'O que contar' },
        { alvo: { papel: 'button', nome: 'Começar a contar' }, legenda: 'Começar' },
      ],
      depois: [{ tipo: 'clicar', alvo: { papel: 'button', nome: 'Começar a contar' }, seguro: true, espera: 4000 }],
    },
    {
      antes: [
        { tipo: 'esperar', alvo: bip, espera: 800 },
        { tipo: 'preencher', alvo: bip, valor: '25153507', espera: 600 },
        { tipo: 'tecla', tecla: 'Enter', espera: 1500 },
      ],
      titulo: 'Bipe o código',
      texto: 'Na contagem, é só bipar o código de barras: cada bip soma um. Sem leitor, digita o código e aperta Enter.',
      marcar: [{ alvo: bip, legenda: 'Bipe aqui' }],
    },
    {
      antes: [
        { tipo: 'preencher', alvo: { css: 'label:has-text("Qtd") input' }, valor: '9', espera: 500 },
        { tipo: 'preencher', alvo: bip, valor: '25153507', espera: 500 },
        { tipo: 'clicar', alvo: { papel: 'button', nome: 'Somar', exato: true }, seguro: true, espera: 1800 },
      ],
      titulo: 'Muitos iguais? Quantidade do lado',
      texto: 'Tem muitos iguais? Põe a quantidade do lado, aqui nove, bipa e clica em Somar. Agora já são dez fones. Ou digita nove x e o código, que soma nove direto.',
      marcar: [
        { alvo: { css: 'label:has-text("Qtd") input' }, legenda: 'Quantidade' },
        { alvo: { papel: 'button', nome: 'Somar', exato: true }, legenda: 'Somar' },
      ],
    },
    {
      antes: [
        { tipo: 'preencher', alvo: { placeholder: 'Buscar produto' }, valor: 'Emenda', espera: 1500 },
        { tipo: 'preencher', alvo: { css: `input[aria-label="Contado de ${EMENDA}"]` }, valor: '25', espera: 1500 },
      ],
      titulo: 'Ou digite direto na lista',
      texto: 'Também dá pra buscar o produto na lista e digitar a quantidade contada direto na linha. Aqui, vinte e cinco emendas.',
      marcar: [{ alvo: { css: `input[aria-label="Contado de ${EMENDA}"]` }, legenda: 'Contado' }],
    },
    {
      titulo: 'A equipe contando junto',
      texto: 'Aqui aparece quem está contando, ao vivo, e as últimas contagens. Vários celulares contam ao mesmo tempo, e um não apaga o do outro: tudo vai somando. E salva sozinho a cada contagem.',
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
      antes: [
        { tipo: 'clicar', alvo: { papel: 'button', nome: 'Revisar e gerar' }, seguro: true, espera: 1500 },
        { tipo: 'escolher', alvo: { css: 'label:has-text("Produtos que não foram contados") select' }, valor: 'Manter o estoque como está', espera: 600 },
      ],
      titulo: 'Revisar e gerar',
      texto: 'Terminou? Clica em Revisar e gerar. Aqui aparecem as maiores diferenças, pra recontar antes. Escolhe se os produtos não contados ficam como estão, ou vão pra zero, e o motivo da quebra.',
      marcar: [
        { alvo: { texto: /Maiores diferenças/ }, legenda: 'Recontar' },
        { alvo: { css: 'label:has-text("Produtos que não foram contados") select' }, legenda: 'Manter ou zerar' },
        { alvo: { css: 'label:has-text("Motivo da quebra") select' }, legenda: 'Motivo' },
      ],
    },
    {
      titulo: 'Clique em Gerar balanço',
      texto: 'Tudo conferido? Clica em Gerar balanço e confirma. O estoque de cada produto contado é ajustado de uma vez.',
      marcar: [{ alvo: { papel: 'button', nome: 'Gerar balanço' }, legenda: 'Gerar balanço' }],
      depois: [{ tipo: 'clicar', alvo: { papel: 'button', nome: 'Gerar balanço' }, forcar: true, espera: 2000 }],
      atencao: 'Escolheu "Zerar o estoque"? Todos os produtos que não foram contados vão para zero.',
    },
    {
      antes: [{ tipo: 'esperar', alvo: { texto: /gerado em/ }, espera: 1000 }],
      titulo: 'Balanço gerado',
      texto: 'Pronto, balanço gerado! A tela mostra a data e as diferenças. Dá pra baixar tudo no Excel.',
      marcar: [
        { alvo: { texto: /gerado em/ }, legenda: 'Gerado' },
        { alvo: { papel: 'button', nome: 'Excel' }, legenda: 'Excel' },
      ],
    },
    {
      antes: [{ tipo: 'clicar', alvo: { css: 'button[aria-label="Voltar"]' }, seguro: true, espera: 3000 }],
      titulo: 'Na lista e no celular',
      texto: 'De volta à lista, o balanço aparece como Gerado. E pra contar andando pela loja, abre o Balanço no celular: cada pessoa conta com o próprio celular e tudo cai no mesmo balanço.',
      marcar: [
        { alvo: { texto: NOME }, legenda: 'Gerado' },
        { alvo: { papel: 'link', nome: 'abrir o Balanço no celular' }, legenda: 'No celular' },
      ],
      dica: 'Gerou errado? A lixeira no cartão do balanço exclui e desfaz o ajuste do estoque.',
    },
  ],
};
