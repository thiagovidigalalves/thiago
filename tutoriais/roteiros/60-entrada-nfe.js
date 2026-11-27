// Entrada de NF-e feita DE VERDADE na THIAGO INFORMATICA (pedido/autorização do dono, 27/11/2026): é a única empresa
// com notas da SEFAZ. O robô importa uma nota que já está "Pronta para importar" (XML completo; assim NÃO precisa dar
// a Ciência da Operação, que é um evento na SEFAZ e não se desfaz), cadastra de uma vez os produtos que não têm
// cadastro, passa pelo financeiro e pela gerência de custos e confirma a entrada.
// No FIM ele DESFAZ: "Reabrir" (estorna estoque e contas a pagar) e "Excluir nota" (apaga a importação reaberta).
// O Reabrir é sempre o da PRIMEIRA linha do histórico (o histórico vem do mais novo para o mais antigo, e a primeira
// linha é a nota que acabou de ser importada); se a primeira linha não estiver "confirmada", o passo falha e nada é estornado.
// Fornecedores e produtos viram nomes fictícios na tela (padrão do capturar.js); valores ficam desfocados.
module.exports = {
  id: 'entrada-nfe',
  ordem: 60,
  grupo: 'Estoque',
  titulo: 'Dar entrada na nota do fornecedor (NF-e)',
  // Pedido do dono: este tutorial usa a THIAGO INFORMATICA (tem notas de verdade na SEFAZ); a demonstração não tem.
  empresa: 'EMP_MT236D4F_KRZBER',
  gravaDados: true,
  gravaNaThiago: true, // autorizado pelo dono: lança na THIAGO INFORMATICA e desfaz no fim (passos 13 e 14)
  // O que o estorno da tela NÃO desfaz sozinho (conferir depois de cada gravação):
  desfazer: [
    'Produtos NOVOS que a entrada cadastrou ("Cadastrar marcados") continuam no cadastro, com estoque zero depois do estorno: excluir em Cadastros › Produtos (lixeira "Inativar ou excluir com conferência").',
    'Grupo/subgrupo/unidade criados na hora (se algum foi criado) continuam no cadastro.',
    'Conferir em Financeiro › Contas a pagar que as parcelas da nota sumiram (o Reabrir estorna) e em Estoque › Entrada de NF-e que a nota voltou para "Pronta para importar".',
    'Se a nota estava na lista "A comprar", os itens que passaram para "Chegou" podem precisar do "Desfazer chegada".',
  ],
  assunto: { chave: ['entrada de nota', 'entrada de nf-e', 'nota do fornecedor', 'nota de compra', 'xml', 'importar nota', 'sefaz'], acoes: ['dar', 'lançar', 'importar', 'fazer', 'como', 'entrada'], rotas: ['/estoque/entrada-dfe', '/estoque/entrada-xml'] },
  resumo: 'As notas de compra chegam sozinhas da SEFAZ: importe, ligue ou cadastre os produtos, confira o financeiro e confirme a entrada.',
  fala: 'Oi! Aqui é o Thiago, da Thiago Informática. Neste vídeo eu vou dar entrada numa nota de fornecedor de verdade, que chegou sozinha da SEFAZ: produtos, financeiro, custos, tudo. Bora lá!',
  antesDeComecar: 'Precisa do certificado digital cadastrado. Sem ele, use o botão "Importar XML" com o arquivo que o fornecedor mandou.',
  passos: [
    {
      ir: '/estoque/entrada-dfe',
      espera: 6000,
      desfocarTudo: true,
      titulo: 'Abra a Entrada de NF-e',
      texto: 'No menu, clica em Estoque, Entrada de NF-e. Aqui aparecem as notas que os fornecedores emitiram pro CNPJ da sua loja. Pra buscar as mais novas na SEFAZ, é em Atualizar agora.',
      marcar: [
        { alvo: { texto: 'NF-e Recebidas — SEFAZ', exato: true }, legenda: 'Notas da SEFAZ' },
        { alvo: { papel: 'button', nome: /Atualizar agora/ }, legenda: 'Atualizar agora' },
      ],
    },
    {
      desfocarTudo: true,
      antes: [{ tipo: 'escolher', alvo: { css: 'select[aria-label="Situação"]' }, valor: 'Pronta para importar', espera: 2000 }],
      titulo: 'Ache a nota',
      texto: 'Busca pelo fornecedor, CNPJ, número ou chave, ou filtra pela situação: aqui, Pronta para importar. O olhinho, Visualizar, mostra a nota antes.',
      marcar: [
        { alvo: { placeholder: 'Fornecedor, CNPJ, nº ou chave' }, legenda: 'Buscar' },
        { alvo: { css: 'select[aria-label="Situação"]' }, legenda: 'Situação' },
        { alvo: { titulo: 'Visualizar' }, legenda: 'Ver a nota' },
      ],
    },
    {
      desfocarTudo: true,
      titulo: 'Clique em Importar',
      texto: 'Na linha da nota, clica em Importar. Se a nota ainda está aguardando o XML, ele pede pra confirmar: é só a Ciência da Operação, que libera o arquivo da nota.',
      marcar: [{ alvo: { papel: 'button', nome: /^Importar$/ }, legenda: 'Importar' }],
      depois: [
        { tipo: 'clicar', alvo: { papel: 'button', nome: /^Importar$/ }, espera: 4000 },
        { tipo: 'esperar', alvo: { papel: 'button', nome: /^2\. Produtos e quantidades/ }, espera: 2000 },
      ],
    },
    {
      desfocarTudo: true,
      titulo: '1. Fornecedor',
      texto: 'Abre a importação em etapas. Primeiro o fornecedor: o sistema acha pelo CNPJ. Se ainda não tem cadastro, ele é cadastrado com os dados da nota.',
      marcar: [
        { alvo: { papel: 'button', nome: /^1\. Fornecedor/ }, legenda: 'Etapa 1' },
        { alvo: { papel: 'button', nome: /^2\. Produtos e quantidades/ }, legenda: 'Etapa 2' },
      ],
      depois: [{ tipo: 'clicar', alvo: { papel: 'button', nome: /^2\. Produtos e quantidades/ }, seguro: true, espera: 2500 }],
    },
    {
      desfocarTudo: true,
      titulo: '2. Produtos: vincular',
      texto: 'Agora os produtos. O que você já comprou antes vem ligado sozinho, em verde. Produto que já tem no estoque com outro nome? Clica em Vincular e escolhe o seu produto: das próximas vezes ele já vem ligado.',
      marcar: [
        { alvo: { css: '[role="progressbar"][aria-label="Produtos conferidos"]' }, legenda: 'Conferidos' },
        { alvo: { css: 'input[aria-label="Conversão por item"]' }, legenda: 'Conversão (caixa → unidade)' },
      ],
      dica: 'Veio em caixa? Em "Conv. ×" diga quantas unidades vêm em cada caixa, e o estoque entra certinho.',
    },
    {
      desfocarTudo: true,
      antes: [{ tipo: 'clicar', alvo: { css: 'input[aria-label="Marcar todos"]' }, seguro: true, espera: 900 }],
      titulo: 'Cadastrar o que não tem',
      texto: 'Produto que ainda não tem cadastro aparece em vermelho. Dá pra cadastrar um por um no botão Cadastrar, ou marcar todos e clicar em Cadastrar marcados, de uma vez.',
      marcar: [{ alvo: { papel: 'button', nome: /Cadastrar marcados/ }, legenda: 'Cadastrar marcados' }],
      depois: [{ tipo: 'clicar', alvo: { papel: 'button', nome: /Cadastrar marcados/ }, seguro: true, espera: 1500 }],
    },
    {
      desfocarTudo: true,
      antes: [{ tipo: 'escolher', alvo: { css: 'select[aria-label="Unidade do lote"]', dentro: 'dialog' }, valor: 'UN — Unidade', espera: 800 }],
      titulo: 'Grupo e unidade de todos',
      texto: 'Escolhe o grupo e a unidade, que vão pra todos os marcados. Os nomes ficam os da nota. Clica em Cadastrar todos: eles são gravados quando você confirmar a entrada.',
      marcar: [
        { alvo: { css: 'select[aria-label="Unidade do lote"]', dentro: 'dialog' }, legenda: 'Unidade' },
        { alvo: { papel: 'button', nome: 'Cadastrar todos', dentro: 'dialog' }, legenda: 'Cadastrar todos' },
      ],
      depois: [{ tipo: 'clicar', alvo: { papel: 'button', nome: 'Cadastrar todos', dentro: 'dialog' }, aguardarFechar: true, espera: 1500 }],
    },
    {
      desfocarTudo: true,
      titulo: '3. Cobranças',
      texto: 'Tudo ligado ou cadastrado? Clica em Conferir financeiro. Aparecem as parcelas que vieram na nota, que vão pro contas a pagar. Dá pra mudar a data e o valor.',
      marcar: [{ alvo: { papel: 'button', nome: /Conferir financeiro/ }, legenda: 'Conferir financeiro' }],
      depois: [{ tipo: 'clicar', alvo: { papel: 'button', nome: /Conferir financeiro/ }, seguro: true, espera: 2500 }],
    },
    {
      desfocarTudo: true,
      titulo: 'Parcelas da nota',
      texto: 'Confere as parcelas e clica em Gerência de custos.',
      marcar: [{ alvo: { papel: 'button', nome: /Gerência de custos →/ }, legenda: 'Gerência de custos' }],
      depois: [{ tipo: 'clicar', alvo: { papel: 'button', nome: /Gerência de custos →/ }, seguro: true, espera: 2500 }],
    },
    {
      desfocarTudo: true,
      antes: [{ tipo: 'clicar', alvo: { papel: 'button', nome: 'Manter preços atuais' }, seguro: true, espera: 1200 }],
      titulo: '4. Gerência de custos',
      texto: 'Aqui aparece o custo real de cada produto, já com frete e impostos. Você pode aplicar um markup pra todos, ou manter os preços atuais.',
      marcar: [
        { alvo: { papel: 'button', nome: 'Aplicar markup a todos' }, legenda: 'Markup para todos' },
        { alvo: { papel: 'button', nome: 'Manter preços atuais' }, legenda: 'Manter preços' },
      ],
    },
    {
      desfocarTudo: true,
      titulo: 'Confirme a entrada',
      texto: 'Tudo conferido? Clica em Confirmar entrada da nota. O estoque sobe, o custo é atualizado e as parcelas vão pro contas a pagar.',
      marcar: [{ alvo: { papel: 'button', nome: /Confirmar entrada da nota/ }, legenda: 'Confirmar entrada' }],
      depois: [
        { tipo: 'clicar', alvo: { papel: 'button', nome: /Confirmar entrada da nota/ }, espera: 3000 },
        { tipo: 'esperar', alvo: { texto: 'Entradas XML', exato: true }, espera: 2500 },
      ],
    },
    {
      desfocarTudo: true,
      titulo: 'Entrada confirmada',
      texto: 'Pronto! A nota aparece no histórico como confirmada. Recebeu o XML por e-mail? Também dá pra dar entrada pelo arquivo, em Importar XML.',
      marcar: [{ alvo: { css: 'table tbody tr:first-child' }, legenda: 'Confirmada' }],
    },
    {
      desfocarTudo: true,
      titulo: 'Errou? Reabrir',
      texto: 'Lançou errado? Clica em Reabrir na linha da nota: o estoque e as contas a pagar são estornados, e você escolhe se edita a nota ou exclui.',
      marcar: [{ alvo: { css: 'table tbody tr:first-child button:has-text("Reabrir")' }, legenda: 'Reabrir (estorna)' }],
      // DESFAZER (autorizado pelo dono): estorna a entrada que o vídeo acabou de lançar.
      depois: [
        { tipo: 'clicar', alvo: { css: 'table tbody tr:first-child button:has-text("Reabrir")' }, espera: 3000 },
        { tipo: 'esperar', alvo: { papel: 'button', nome: /Excluir nota/, dentro: 'dialog' }, espera: 1500 },
      ],
    },
    {
      desfocarTudo: true,
      titulo: 'Editar ou excluir',
      texto: 'Nota reaberta. Em Editar nota, você corrige e confirma de novo. Em Excluir nota, a importação é apagada, e a nota volta pra lista, pronta pra importar.',
      marcar: [
        { alvo: { papel: 'button', nome: /Editar nota/, dentro: 'dialog' }, legenda: 'Editar' },
        { alvo: { papel: 'button', nome: /Excluir nota/, dentro: 'dialog' }, legenda: 'Excluir' },
      ],
      // DESFAZER (autorizado pelo dono): apaga a importação reaberta (fica registrado na Auditoria).
      depois: [
        { tipo: 'clicar', alvo: { papel: 'button', nome: /Excluir nota/, dentro: 'dialog' }, espera: 1500 },
        { tipo: 'clicar', alvo: { papel: 'button', nome: 'Confirmar', exato: true, dentro: 'dialog' }, aguardarFechar: true, espera: 2500 },
      ],
      atencao: 'Reabrir estorna o estoque e o financeiro dessa nota. Se alguma parcela já foi paga, o sistema avisa antes.',
    },
  ],
};
