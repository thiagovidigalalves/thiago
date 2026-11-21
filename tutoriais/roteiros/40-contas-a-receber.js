// Contas a receber feito DE VERDADE na Demonstração (pedido do dono, 21/11/2026): lança a conta da cliente fictícia
// "Mariana Exemplo" (sem telefone: nada vai para WhatsApp), dá baixa no caixa pelo F1 Recebimentos (dinheiro)
// e mostra a conta como paga. O PDV é aberto pelo menu com a empresa certa (o botão "Receber no caixa" abre o PDV
// sem o ?empresa= do Super Admin, por isso a baixa é mostrada pelo F1).
module.exports = {
  id: 'contas-a-receber',
  ordem: 40,
  grupo: 'Financeiro',
  titulo: 'Contas a receber: lançar e dar baixa',
  gravaDados: true,
  valoresReais: true, // R$ 150 do começo ao fim
  manter: ['Mariana Exemplo', 'Conserto de notebook', '150'],
  assunto: {"chave": ["receber", "recebimento", "fiado", "crediario", "crediário", "baixa"], "acoes": ["lançar", "lanço", "baixa", "baixar", "receber", "registrar", "cadastrar", "dar", "quitar", "pagou"]}, // como o Thiaguinho acha o vídeo pela pergunta
  resumo: 'Lance o que o cliente vai te pagar e dê baixa no caixa quando ele pagar.',
  fala: 'Oi! Aqui é o Thiago, da Thiago Informática. Neste vídeo eu vou lançar uma conta a receber de verdade e depois dar baixa quando a cliente vier pagar. Bora lá!', // abertura do vídeo, no jeito de falar do Thiago
  passos: [
    {
      ir: '/financeiro/contas-receber',
      espera: 6000,
      titulo: 'Abra Contas a Receber',
      texto: 'No menu, clica em Financeiro, Contas a Receber. Aqui em cima você vê o que já recebeu, o que falta receber e o que está atrasado.',
      marcar: [{ alvo: { papel: 'button', nome: 'Nova conta' }, legenda: 'Nova conta' }],
    },
    {
      antes: [
        { tipo: 'clicar', alvo: { papel: 'button', nome: 'Nova conta' }, seguro: true, espera: 1800 },
        { tipo: 'preencher', alvo: { placeholder: 'Digite o nome do cliente...', dentro: 'dialog' }, valor: 'Mariana Exemplo', espera: 2500 },
        { tipo: 'clicar', alvo: { texto: 'Mariana Exemplo', exato: true, dentro: 'dialog' }, seguro: true, espera: 1200 },
      ],
      titulo: 'Escolha o cliente',
      texto: 'Clica em Nova conta e digita o nome do cliente. Ele aparece na lista, é só clicar. Se ainda não tiver cadastro, dá pra cadastrar ali mesmo.',
      marcar: [{ alvo: { texto: 'Mariana Exemplo', exato: true, dentro: 'dialog' }, legenda: 'Cliente' }],
    },
    {
      antes: [
        { tipo: 'preencher', alvo: { css: 'div.space-y-1:has(label:text-is("Descrição")) input', dentro: 'dialog' }, valor: 'Conserto de notebook' },
        { tipo: 'preencher', alvo: { css: 'div.space-y-1:has(label:has-text("Valor total")) input', dentro: 'dialog' }, valor: '150' },
      ],
      titulo: 'Descrição, valor e vencimento',
      texto: 'Escreve do que é, coloca o valor e o vencimento. Se for parcelado, é só mudar a quantidade de parcelas que ele divide sozinho. Depois clica em Salvar.',
      marcar: [
        { alvo: { css: 'div.space-y-1:has(label:has-text("Valor total")) input', dentro: 'dialog' }, legenda: 'R$ 150' },
        { alvo: { papel: 'button', nome: 'Salvar', exato: true, dentro: 'dialog' }, legenda: 'Salvar' },
      ],
      depois: [{ tipo: 'clicar', alvo: { papel: 'button', nome: 'Salvar', exato: true, dentro: 'dialog' }, espera: 4000 }],
    },
    {
      antes: [{ tipo: 'preencher', alvo: { placeholder: 'Nome do cliente' }, valor: 'Mariana Exemplo', espera: 4000 }],
      titulo: 'A conta já está lançada',
      texto: 'Pronto, a conta está aqui, em aberto. Quando o cliente vier pagar, a baixa é feita no caixa.',
      marcar: [{ alvo: { css: 'tbody tr:has-text("Mariana Exemplo")' }, legenda: 'Em aberto' }],
    },
    {
      ir: '/pdv',
      espera: 20000,
      antes: [
        { tipo: 'tecla', tecla: 'F1', espera: 3500 },
        { tipo: 'preencher', alvo: { placeholder: 'Nome, telefone, CPF/CNPJ ou endereço...', dentro: 'dialog' }, valor: 'Mariana Exemplo', espera: 3000 },
        { tipo: 'clicar', alvo: { papel: 'button', nome: /^Mariana Exemplo/, dentro: 'dialog' }, seguro: true, espera: 3000 },
      ],
      titulo: 'Recebimentos no caixa',
      texto: 'No caixa, aperta F1, Recebimentos, e busca o cliente. Aparece tudo o que ele deve.',
      marcar: [{ alvo: { texto: 'Conserto de notebook', exato: true, dentro: 'dialog' }, legenda: 'A conta dele' }],
    },
    {
      antes: [{ tipo: 'clicar', alvo: { papel: 'checkbox', nome: /Marcar todas as parcelas/, dentro: 'dialog' }, seguro: true, forcar: true, espera: 1200 }],
      titulo: 'Marque e envie ao caixa',
      texto: 'Marca a parcela que ele está pagando e clica em Enviar ao caixa.',
      marcar: [{ alvo: { papel: 'button', nome: /Enviar ao caixa/, dentro: 'dialog' }, legenda: 'Enviar ao caixa' }],
      depois: [{ tipo: 'clicar', alvo: { papel: 'button', nome: /Enviar ao caixa/, dentro: 'dialog' }, espera: 3000 }],
    },
    {
      antes: [
        { tipo: 'tecla', tecla: 'F9', espera: 2500 },
        { tipo: 'clicar', alvo: { papel: 'button', nome: /Dinheiro/ }, seguro: true, espera: 1500 },
      ],
      titulo: 'Receba e confirme',
      texto: 'Aperta F9, escolhe a forma, aqui foi dinheiro, e confirma. Pronto: baixa dada.',
      marcar: [{ alvo: { papel: 'button', nome: /Confirmar/ }, legenda: 'Confirmar (Enter)' }],
      depois: [
        { tipo: 'tecla', tecla: 'Enter', espera: 4500 },
        { tipo: 'clicar', alvo: { papel: 'button', nome: /Não imprimir/ }, seguro: true, espera: 2000 },
      ],
    },
    {
      ir: '/financeiro/contas-receber',
      espera: 6000,
      antes: [
        { tipo: 'clicar', alvo: { papel: 'button', nome: 'Pagas', exato: true }, seguro: true, espera: 2500 },
        { tipo: 'preencher', alvo: { placeholder: 'Nome do cliente' }, valor: 'Mariana Exemplo', espera: 4000 },
      ],
      titulo: 'A conta ficou paga',
      texto: 'E voltando em Contas a Receber, na aba Pagas, a conta já aparece paga, e o dinheiro entrou no caixa do dia.',
      marcar: [{ alvo: { css: 'tbody tr:has-text("Mariana Exemplo")' }, legenda: 'Paga' }],
      dica: 'Recebeu na hora, junto com o lançamento? Ligue "Já foi recebido agora" e informe a forma de pagamento.',
    },
  ],
};
