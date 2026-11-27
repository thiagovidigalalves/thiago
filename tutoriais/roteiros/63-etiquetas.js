// Etiquetas feitas DE VERDADE na Demonstração (pedido do dono, 27/11/2026): escolhe o modelo, adiciona o FONE (pelo
// código + Enter) e a Emenda RJ45 (marcando a caixinha), põe a quantidade de cada um e confere a prévia.
// O robô NÃO clica em "Imprimir etiquetas" / "Imprimir uma de teste" (abre a impressora do navegador): só mostra.
const FONE = 'FONE DE OUVIDO SEM FIO TWS M25';
const EMENDA = 'Emenda Rj45 8x8 Cat5 Cat6 1 Gbps Emenda Cabo De Rede 1 Uni';
module.exports = {
  id: 'etiquetas',
  ordem: 63,
  grupo: 'Estoque',
  titulo: 'Imprimir etiquetas de preço',
  gravaDados: true,
  valoresReais: true,
  manter: [FONE, EMENDA, '25153507'],
  assunto: { chave: ['etiqueta', 'etiquetas', 'etiqueta de preço', 'código de barras', 'gôndola'], acoes: ['imprimir', 'fazer', 'gerar', 'tirar', 'como'], rotas: ['/estoque/etiquetas'] },
  resumo: 'Escolha o modelo, adicione os produtos, diga quantas etiquetas de cada e confira a prévia antes de imprimir.',
  fala: 'Oi! Aqui é o Thiago, da Thiago Informática. Neste vídeo eu vou montar as etiquetas de preço de verdade: escolher o modelo, os produtos e conferir antes de imprimir. Bora lá!',
  antesDeComecar: 'Ter a impressora de etiquetas instalada no computador.',
  passos: [
    {
      ir: '/estoque/etiquetas',
      espera: 6000,
      titulo: 'Abra as Etiquetas',
      texto: 'No menu, clica em Estoque, Etiquetas. Escolhe o tipo: etiqueta de código, de produto, ou de gôndola, pra prateleira.',
      marcar: [
        { alvo: { papel: 'button', nome: /Etiquetas de código/ }, legenda: 'Código' },
        { alvo: { papel: 'button', nome: /Etiquetas de produto/ }, legenda: 'Produto' },
        { alvo: { papel: 'button', nome: /Etiquetas de gôndola/ }, legenda: 'Gôndola' },
      ],
    },
    {
      antes: [{ tipo: 'clicar', alvo: { papel: 'button', nome: /Etiquetas de produto/ }, seguro: true, espera: 1500 }],
      titulo: 'Escolha o modelo',
      texto: 'Clicou em Etiquetas de produto, aparecem os modelos. Clica no do papel que você usa: o tamanho aparece em milímetros.',
      marcar: [{ alvo: { papel: 'button', nome: /mm/ }, legenda: 'Modelo' }],
      depois: [{ tipo: 'clicar', alvo: { papel: 'button', nome: /mm/ }, seguro: true, espera: 2500 }],
    },
    {
      antes: [
        { tipo: 'preencher', alvo: { placeholder: 'Digite nome, código ou bipe a etiqueta...' }, valor: '25153507', espera: 2000 },
        { tipo: 'tecla', tecla: 'Enter', espera: 1500 },
      ],
      titulo: 'Bipe ou digite o código',
      texto: 'Agora os produtos. Bipa a etiqueta, ou digita o código e aperta Enter: o produto já entra na seleção com uma etiqueta.',
      marcar: [{ alvo: { placeholder: 'Digite nome, código ou bipe a etiqueta...' }, legenda: 'Buscar ou bipar' }],
    },
    {
      antes: [
        { tipo: 'preencher', alvo: { placeholder: 'Digite nome, código ou bipe a etiqueta...' }, valor: 'Emenda', espera: 2000 },
        { tipo: 'clicar', alvo: { css: `input[aria-label="Selecionar ${EMENDA}"]` }, seguro: true, espera: 900 },
      ],
      titulo: 'Ou marque a caixinha',
      texto: 'Ou digita o nome e marca a caixinha do produto. Pode buscar outro depois, que a seleção fica guardada.',
      marcar: [{ alvo: { css: `input[aria-label="Selecionar ${EMENDA}"]` }, legenda: 'Marcado' }],
    },
    {
      antes: [
        { tipo: 'preencher', alvo: { css: `input[aria-label="Quantidade de etiquetas ${EMENDA}"]` }, valor: '4', espera: 900 },
        { tipo: 'clicar', alvo: { papel: 'button', nome: 'Limpar busca' }, seguro: true, espera: 1500 }, // sem busca, a lista mostra os selecionados
        { tipo: 'preencher', alvo: { css: `input[aria-label="Quantidade de etiquetas ${FONE}"]` }, valor: '3', espera: 900 },
      ],
      titulo: 'Quantas etiquetas de cada',
      texto: 'Na coluna Quantidade de etiquetas, digita quantas quer de cada produto. Clicando em Limpar busca, a lista mostra tudo que você já marcou.',
      marcar: [
        { alvo: { css: `input[aria-label="Quantidade de etiquetas ${FONE}"]` }, legenda: 'Quantidade' },
        { alvo: { css: '[role="status"]' }, legenda: 'Total' },
      ],
    },
    {
      titulo: 'Só o que mudou de preço',
      texto: 'Dica boa: pra etiquetar só o que mudou de preço, clica em Preço alterado por data, escolhe o período e clica em Aplicar filtros. Ou Estoque movimentado por data, pra etiquetar o que chegou.',
      marcar: [
        { alvo: { papel: 'button', nome: 'Preço alterado por data' }, legenda: 'Mudou de preço' },
        { alvo: { papel: 'button', nome: 'Estoque movimentado por data' }, legenda: 'Chegou' },
      ],
    },
    {
      antes: [
        { tipo: 'clicar', alvo: { papel: 'button', nome: 'Conferir etiquetas' }, seguro: true, espera: 2500 },
        { tipo: 'esperar', alvo: { texto: /Prévia pronta/ }, espera: 1200 },
      ],
      titulo: 'Confira a prévia',
      texto: 'Clica em Conferir etiquetas. Aparece a prévia da folha, com quantas etiquetas e quantas folhas. Já usou parte da folha? Em Pular posições você diz quantas já foram.',
      marcar: [
        { alvo: { texto: /Prévia pronta/ }, legenda: 'Prévia' },
        { alvo: { css: 'label:has-text("Pular posições") input' }, legenda: 'Pular posições' },
      ],
    },
    {
      titulo: 'Imprima',
      texto: 'Na primeira vez, clica em Imprimir uma de teste, pra ver se ficou alinhado. Ficou bom? Clica em Imprimir etiquetas. Se precisar acertar, é em Ajustar impressão.',
      marcar: [
        { alvo: { papel: 'button', nome: 'Imprimir uma de teste' }, legenda: 'Teste' },
        { alvo: { papel: 'button', nome: 'Imprimir etiquetas' }, legenda: 'Imprimir' },
        { alvo: { papel: 'button', nome: 'Ajustar impressão' }, legenda: 'Ajustar' },
      ],
      dica: 'Imprima em tamanho real (100%), sem "ajustar à página". Depois de uma entrada de mercadoria, o botão Etiquetas já traz os produtos que chegaram.',
    },
  ],
};
