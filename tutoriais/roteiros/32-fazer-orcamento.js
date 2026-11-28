// Orçamento feito DE VERDADE na Demonstração (pedido do dono, 27/11/2026): orçamento da cliente fictícia Joana Exemplo
// (sem telefone: nada vai para WhatsApp) com o fone e a emenda de rede, salvo; depois vira venda no PDV pelo F2
// (Orçamentos › Transferir), recebida no Pix e finalizada SEM nota ("3" e "Não imprimir"). O "Faturar no PDV" da lista
// não é usado no vídeo porque abre o PDV sem o ?empresa= (o robô cairia em outra empresa).
module.exports = {
  id: 'fazer-orcamento',
  ordem: 32,
  grupo: 'Comercial',
  titulo: 'Fazer um orçamento e transformar em venda',
  gravaDados: true,
  valoresReais: true, // R$ 80 + R$ 5 = R$ 85 do orçamento até a venda
  manter: ['Joana Exemplo', '25153507', 'FONE DE OUVIDO SEM FIO TWS M25', 'FONE DE OUVIDO', 'Emenda Rj45', 'Emenda Rj45 8×8 Cat5 Cat6 1 Gbps Emenda Cabo De Rede 1 Uni', 'Emenda Rj45 8x8 Cat5 Cat6 1 Gbps Emenda Cabo De Rede 1 Uni'],
  assunto: {"chave": ["orçamento", "orcamento", "orçamentos", "proposta", "faturar orçamento", "transformar em venda"], "acoes": ["fazer", "faço", "criar", "lançar", "mandar", "enviar", "imprimir", "faturar", "transformar", "como"], "rotas": ["/cadastros/orcamentos"]},
  resumo: 'Monte o orçamento, salve, mande pro cliente e, quando ele aprovar, transforme em venda no caixa.',
  fala: 'Oi! Aqui é o Thiago, da Thiago Informática. Neste vídeo eu vou fazer um orçamento de verdade, salvar, e depois transformar ele em venda no caixa. Bora lá!',
  antesDeComecar: 'Ter os produtos cadastrados. O cliente pode ser cadastrado na hora, dentro do orçamento.',
  passos: [
    {
      ir: '/cadastros/orcamentos',
      espera: 7000,
      titulo: 'Abra Orçamentos',
      texto: 'No menu, clica em Comercial, Orçamentos. Aqui ficam todos os orçamentos. Pra fazer um novo, é no Novo orçamento.',
      marcar: [{ alvo: { papel: 'button', nome: 'Novo orçamento' }, legenda: 'Novo orçamento' }],
    },
    {
      antes: [
        { tipo: 'clicar', alvo: { papel: 'button', nome: 'Novo orçamento' }, seguro: true, espera: 1800 },
        { tipo: 'preencher', alvo: { placeholder: 'Buscar cliente por nome ou CPF/CNPJ', dentro: 'dialog' }, valor: 'Joana Exemplo', espera: 2500 },
        { tipo: 'esperar', alvo: { css: 'button:has(span:text-is("Joana Exemplo"))', dentro: 'dialog' }, espera: 300 },
        { tipo: 'clicar', alvo: { css: 'button:has(span:text-is("Joana Exemplo"))', dentro: 'dialog' }, seguro: true, espera: 1500 },
      ],
      titulo: 'Escolha o cliente',
      texto: 'Clica em Novo orçamento. Primeiro o cliente: digita o nome e clica nele. Se ainda não tem cadastro, aparece o Cadastrar cliente, e você cadastra ali mesmo.',
      marcar: [{ alvo: { texto: 'Joana Exemplo', exato: true, dentro: 'dialog' }, legenda: 'Cliente' }],
    },
    {
      antes: [
        { tipo: 'preencher', alvo: { placeholder: 'Buscar produto por nome ou código', dentro: 'dialog' }, valor: 'TWS M25', espera: 1500 },
        { tipo: 'esperar', alvo: { css: 'button:has-text("TWS M25"):not(.orc-cadastrar-rapido)', dentro: 'dialog' }, espera: 300 },
        { tipo: 'clicar', alvo: { css: 'button:has-text("TWS M25"):not(.orc-cadastrar-rapido)', dentro: 'dialog' }, seguro: true, espera: 1200 },
        { tipo: 'preencher', alvo: { placeholder: 'Buscar produto por nome ou código', dentro: 'dialog' }, valor: 'Emenda Rj45', espera: 1500 },
        { tipo: 'esperar', alvo: { css: 'button:has(span:text-matches("^Emenda Rj45"))', dentro: 'dialog' }, espera: 300 },
        { tipo: 'clicar', alvo: { css: 'button:has(span:text-matches("^Emenda Rj45"))', dentro: 'dialog' }, seguro: true, espera: 1200 },
      ],
      titulo: 'Adicione os produtos',
      texto: 'Agora os produtos. Digita o nome ou o código e clica nele. Repete pra cada produto: aqui foram o fone e a emenda de rede. O total já vai somando embaixo.',
      marcar: [
        { alvo: { texto: 'FONE DE OUVIDO SEM FIO TWS M25', exato: true, dentro: 'dialog' }, legenda: 'Fone' },
        { alvo: { texto: /^Emenda Rj45/, dentro: 'dialog' }, legenda: 'Emenda' },
        { alvo: { texto: 'Total geral', exato: true, dentro: 'dialog' }, legenda: 'Total' },
      ],
    },
    {
      titulo: 'Desconto, serviço e validade',
      texto: 'Se quiser, dá desconto no item ou no total. Nos botões Serviço e Mensalidade você coloca um serviço no orçamento. E confere a validade: até quando o orçamento vale.',
      marcar: [
        { alvo: { papel: 'button', nome: 'Serviço', exato: true, dentro: 'dialog' }, legenda: 'Serviço' },
        { alvo: { campo: 'Validade', dentro: 'dialog' }, legenda: 'Validade' },
      ],
    },
    {
      titulo: 'Salve o orçamento',
      texto: 'Tudo certo? Clica em Salvar. Aqui também dá pra imprimir em A4, oitenta milímetros ou PDF, ou mandar no WhatsApp: o cliente recebe um link pra ver e aprovar.',
      marcar: [
        { alvo: { papel: 'button', nome: 'WhatsApp', exato: true, dentro: 'dialog' }, legenda: 'Mandar pro cliente' },
        { alvo: { papel: 'button', nome: 'Salvar', exato: true, dentro: 'dialog' }, legenda: 'Salvar' },
      ],
      depois: [{ tipo: 'clicar', alvo: { papel: 'button', nome: 'Salvar', exato: true, dentro: 'dialog' }, aguardarFechar: true, espera: 2500 }],
    },
    {
      antes: [{ tipo: 'preencher', alvo: { placeholder: 'Buscar por cliente ou número' }, valor: 'Joana Exemplo', espera: 3000 }],
      titulo: 'Orçamento salvo',
      texto: 'Pronto, o orçamento está salvo, aqui na lista, em aberto. Na linha dele tem o botão de imprimir e o de mandar no WhatsApp com o link pro cliente assinar.',
      marcar: [
        { alvo: { css: 'tbody tr:has-text("Joana Exemplo")' }, legenda: 'Em aberto' },
        { alvo: { titulo: 'Imprimir/PDF' }, legenda: 'Imprimir' },
      ],
    },
    {
      ir: '/pdv',
      espera: 15000,
      titulo: 'Cliente aprovou? Vá ao caixa',
      texto: 'O cliente aprovou? Agora vira venda. No menu, clica em Comercial, PDV, e depois em Nova venda.',
      marcar: [{ alvo: { papel: 'button', nome: /Nova venda/ }, legenda: 'Nova venda' }],
      depois: [{ tipo: 'clicar', alvo: { papel: 'button', nome: 'Nova venda' }, seguro: true, espera: 1800 }],
    },
    {
      antes: [
        { tipo: 'tecla', tecla: 'F2', espera: 3500 },
        { tipo: 'preencher', alvo: { placeholder: 'Buscar por cliente ou número', dentro: 'dialog' }, valor: 'Joana Exemplo', espera: 2500 },
      ],
      titulo: 'Orçamentos no caixa (F2)',
      texto: 'Aperta F2, Orçamentos, e procura o cliente. Na linha do orçamento, clica em Transferir.',
      marcar: [{ alvo: { papel: 'button', nome: 'Transferir', dentro: 'dialog' }, legenda: 'Transferir' }],
      depois: [{ tipo: 'clicar', alvo: { papel: 'button', nome: 'Transferir', dentro: 'dialog' }, seguro: true, espera: 3000 }],
    },
    {
      titulo: 'Os produtos já vieram',
      texto: 'Pronto: os produtos do orçamento já vieram pra venda, com o cliente. Agora é só receber.',
      marcar: [
        { alvo: { texto: 'FONE DE OUVIDO SEM FIO TWS M25', exato: true }, legenda: 'Do orçamento' },
        { alvo: { texto: 'TOTAL A RECEBER', exato: true }, legenda: 'Total' },
      ],
    },
    {
      antes: [
        { tipo: 'tecla', tecla: 'F9', espera: 2500 },
        { tipo: 'clicar', alvo: { papel: 'button', nome: /PIX(?! SICOOB)/, dentro: 'dialog' }, seguro: true, espera: 1500 },
      ],
      titulo: 'Receba e finalize',
      texto: 'Aperta F9, escolhe a forma, aqui foi Pix, e Enter. Venda sem nota: tecla três, e Não imprimir.',
      marcar: [{ alvo: { papel: 'button', nome: /PIX(?! SICOOB)/, dentro: 'dialog' }, legenda: 'Pix' }],
      depois: [
        { tipo: 'tecla', tecla: 'Enter', espera: 5000 },
        { tipo: 'tecla', tecla: '3', espera: 2500 },
        { tipo: 'clicar', alvo: { papel: 'button', nome: /Não imprimir/ }, seguro: true, opcional: true, espera: 2500 },
      ],
    },
    {
      ir: '/cadastros/orcamentos',
      espera: 7000,
      semMenu: true, // vem do PDV, que é tela cheia sem o menu lateral
      antes: [
        { tipo: 'escolher', alvo: { css: 'select:has(option[value="faturado"])' }, valor: 'Todos status', espera: 1500 },
        { tipo: 'preencher', alvo: { placeholder: 'Buscar por cliente ou número' }, valor: 'Joana Exemplo', espera: 3000 },
      ],
      titulo: 'Virou venda',
      texto: 'E voltando em Orçamentos, escolhendo Todos status, o orçamento já não está mais em aberto: virou venda.',
      marcar: [{ alvo: { css: 'tbody tr:has-text("Joana Exemplo")' }, legenda: 'Virou venda' }],
      dica: 'Fora do caixa, o botão "Faturar no PDV" da linha também leva o orçamento para o caixa.',
    },
  ],
};
