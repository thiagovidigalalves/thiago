// Emitir nota fiscal (pedido do dono, 24/11/2026): os 3 jeitos, do mais fácil ao último. Gravado na Demonstração,
// que tem o fiscal ligado SÓ para mostrar (FiscalConfig em homologação, sem cadastro no serviço de emissão).
// NUNCA transmite: no fim da venda escolhe "3 · sem documento"; no F4 só marca os botões (lá o clique já emite);
// em Vendas abre "Emitir NF-e · Venda" e clica em Cancelar.
// A venda é de verdade (cliente fictícia Joana Exemplo, R$ 80 em dinheiro).
module.exports = {
  id: 'emitir-nota',
  ordem: 50,
  grupo: 'Fiscal',
  titulo: 'Emitir nota fiscal (NFC-e e NF-e)',
  gravaDados: true,
  valoresReais: true, // R$ 80 do começo ao fim
  manter: ['Joana Exemplo', '25153507', 'FONE DE OUVIDO SEM FIO TWS M25', '80'],
  assunto: {"chave": ["nota", "nfe", "nf-e", "nfce", "nfc-e", "cupom", "fiscal", "nota fiscal", "cupom fiscal"], "acoes": ["emitir", "emito", "emite", "gerar", "tirar", "fazer", "transformar", "mandar", "como"], "rotas": ["/pdv", "/vendas", "/fiscal/gerados"]}, // como o Thiaguinho acha o vídeo pela pergunta
  resumo: 'Os 3 jeitos de emitir a nota: no fim da venda no PDV, depois pelo F4 do PDV, ou em Vendas.',
  fala: 'Oi! Aqui é o Thiago, da Thiago Informática. Neste vídeo eu vou te mostrar como emitir a nota fiscal, do jeito mais fácil: direto no caixa. Bora lá!',
  antesDeComecar: 'A empresa precisa estar com o fiscal configurado (certificado digital) e os produtos com NCM.',
  passos: [
    {
      ir: '/pdv',
      espera: 15000,
      titulo: 'Abra o PDV',
      texto: 'No menu, clica em Comercial, PDV. Vou fazer uma venda com nota. Clica em Nova venda.',
      marcar: [{ alvo: { papel: 'button', nome: /Nova venda/ }, legenda: 'Nova venda' }],
    },
    {
      antes: [
        { tipo: 'clicar', alvo: { papel: 'button', nome: /Nova venda/ }, seguro: true, espera: 1800 },
        { tipo: 'tecla', tecla: 'F10', espera: 2000 },
        { tipo: 'preencher', alvo: { placeholder: 'Nome, telefone, CPF/CNPJ ou endereço...', dentro: 'dialog' }, valor: 'Joana Exemplo', espera: 3500 },
        { tipo: 'esperar', alvo: { papel: 'button', nome: /^Joana Exemplo/, dentro: 'dialog' }, espera: 300 },
        { tipo: 'clicar', alvo: { papel: 'button', nome: /^Joana Exemplo/, dentro: 'dialog' }, seguro: true, espera: 2000 },
      ],
      titulo: 'Escolha o cliente (F10)',
      texto: 'Aperta F10 e escolhe o cliente. Pra nota fiscal, o cadastro dele tem que estar completo, com CPF e endereço.',
      marcar: [{ alvo: { css: 'button:has-text("F10"):has-text("Joana Exemplo")' }, legenda: 'Cliente' }],
    },
    {
      antes: [
        { tipo: 'clicar', alvo: { placeholder: 'Código ou produto' }, seguro: true, espera: 600 },
        { tipo: 'preencher', alvo: { placeholder: 'Código ou produto' }, valor: '25153507', espera: 800 },
        { tipo: 'tecla', tecla: 'Enter', espera: 2500 },
      ],
      titulo: 'Lance o produto',
      texto: 'Bipa o produto, ou digita o código e aperta Enter.',
      marcar: [{ alvo: { texto: 'FONE DE OUVIDO SEM FIO TWS M25', exato: true }, legenda: 'Produto' }],
    },
    {
      antes: [
        { tipo: 'tecla', tecla: 'F9', espera: 2500 },
        { tipo: 'preencher', alvo: { css: 'input[data-payment-amount]' }, valor: '80' },
        { tipo: 'clicar', alvo: { papel: 'button', nome: /Dinheiro/ }, seguro: true, espera: 1500 },
      ],
      titulo: 'Receba (F9)',
      texto: 'Aperta F9, escolhe a forma de pagamento e confirma.',
      marcar: [{ alvo: { papel: 'button', nome: /Confirmar/ }, legenda: 'Confirmar (Enter)' }],
      depois: [{ tipo: 'tecla', tecla: 'Enter', espera: 6000 }],
    },
    {
      titulo: 'Escolha a nota: 1, 2 ou 3',
      texto: 'Agora ele pergunta o documento. Um, cupom fiscal, a NFC-e. Dois, nota fiscal, a NF-e. Ou três, venda sem nota. Apertou um ou dois, a nota é emitida na hora. Aqui eu vou apertar três, pra te mostrar como emitir depois.',
      marcar: [
        { alvo: { papel: 'button', nome: /Cupom fiscal \(NFC-e\)/, dentro: 'dialog' }, legenda: '1 · Cupom fiscal' },
        { alvo: { papel: 'button', nome: /Nota fiscal \(NF-e\)/, dentro: 'dialog' }, legenda: '2 · Nota fiscal' },
        { alvo: { papel: 'button', nome: /sem documento fiscal/, dentro: 'dialog' }, legenda: '3 · Sem nota' },
      ],
      depois: [
        { tipo: 'tecla', tecla: '3', espera: 2500 },
        { tipo: 'clicar', alvo: { papel: 'button', nome: /Não imprimir/ }, seguro: true, espera: 2500 },
      ],
    },
    {
      antes: [
        { tipo: 'tecla', tecla: 'F4', espera: 3000 },
        { tipo: 'esperar', alvo: { papel: 'button', nome: /NF-e · Não emitida/, dentro: 'dialog' }, espera: 800 },
        { tipo: 'preencher', alvo: { placeholder: 'Buscar venda, cliente ou valor', dentro: 'dialog' }, valor: 'Joana Exemplo', espera: 3500 },
      ],
      titulo: 'Emitir depois: F4 no PDV',
      texto: 'Ficou sem nota, ou a nota não foi? No próprio PDV, aperta F4, Vendas, e procura a venda. Na linha dela, clica em NFC-e ou em NF-e, e em alguns segundos a nota é autorizada.',
      marcar: [
        { alvo: { papel: 'button', nome: /NFC-e · Não emitida/, dentro: 'dialog' }, legenda: 'Cupom' },
        { alvo: { papel: 'button', nome: /NF-e · Não emitida/, dentro: 'dialog' }, legenda: 'Nota' },
      ],
    },
    {
      ir: '/vendas',
      espera: 10000,
      semMenu: true, // vem do PDV, que é tela cheia sem o menu lateral: abre direto com a cortina de passo
      titulo: 'Ou em Vendas',
      texto: 'E dá também fora do caixa, em Comercial, Vendas. Na linha da venda tem os botões NF-e e NFC-e.',
      marcar: [
        { alvo: { papel: 'button', nome: 'NF-e', exato: true }, legenda: 'NF-e' },
        { alvo: { papel: 'button', nome: 'NFC-e', exato: true }, legenda: 'NFC-e' },
      ],
    },
    {
      antes: [
        { tipo: 'clicar', alvo: { papel: 'button', nome: 'NF-e', exato: true }, seguro: true, espera: 1000 },
        { tipo: 'esperar', alvo: { papel: 'button', nome: 'Continuar emissão', dentro: 'dialog' }, espera: 500 },
      ],
      titulo: 'Clique e continue',
      texto: 'Clicou, aparece a venda: é só clicar em Continuar emissão e pronto.',
      marcar: [{ alvo: { papel: 'button', nome: 'Continuar emissão', dentro: 'dialog' }, legenda: 'Continuar emissão' }],
      depois: [{ tipo: 'clicar', alvo: { papel: 'button', nome: 'Cancelar', exato: true, dentro: 'dialog' }, seguro: true, espera: 1500 }],
    },
    {
      ir: '/fiscal/gerados',
      espera: 8000,
      titulo: 'Notas emitidas',
      texto: 'As notas autorizadas ficam em Fiscal, Notas emitidas: lá você imprime, baixa o XML ou manda pro cliente. E se der algum erro, a nota vai pra Corrigir pendências.',
      marcar: [{ alvo: { papel: 'heading', nome: 'Notas emitidas' }, legenda: 'Notas emitidas' }],
      atencao: 'Nota emitida vale para a Receita. Confira o cliente e os valores antes de continuar.',
    },
  ],
};
