// Contas a receber feito DE VERDADE na Demonstração (pedido do dono, 21/11/2026): lança a conta da cliente fictícia
// "Mariana Exemplo" (sem telefone: nada vai para WhatsApp), dá baixa no caixa pelo F1 Recebimentos (dinheiro)
// e mostra a conta como paga. O PDV é aberto pelo menu com a empresa certa (o botão "Receber no caixa" abre o PDV
// sem o ?empresa= do Super Admin, por isso a baixa é mostrada pelo F1).
// 27/11/2026: acrescentados os outros jeitos de lançar: parcelado (Joana Exemplo, 3x, 1ª parcela já vencida, que
// alimenta a Central de cobrança) e "Já foi recebido agora" (lança já pago, com a forma). O "Receber com Pix" depende
// do Pix do banco vinculado (a Demonstração não tem): só é marcado.
module.exports = {
  id: 'contas-a-receber',
  ordem: 40,
  grupo: 'Financeiro',
  titulo: 'Contas a receber: lançar, parcelar e dar baixa',
  gravaDados: true,
  valoresReais: true, // R$ 150 do começo ao fim
  manter: ['Mariana Exemplo', 'Joana Exemplo', 'Conserto de notebook', 'Notebook usado parcelado', 'Formatação com backup', '150,00', '900,00', '300,00', '120,00'],
  assunto: {"chave": ["receber", "recebimento", "fiado", "crediario", "crediário", "baixa"], "acoes": ["lançar", "lanço", "baixa", "baixar", "receber", "registrar", "cadastrar", "dar", "quitar", "pagou"]}, // como o Thiaguinho acha o vídeo pela pergunta
  resumo: 'Lance o que o cliente vai te pagar e dê baixa no caixa quando ele pagar.',
  fala: 'Oi! Aqui é o Thiago, da Thiago Informática. Neste vídeo eu vou lançar contas a receber de verdade: uma simples, uma parcelada e uma que já foi paga, e depois dar baixa quando a cliente vier pagar. Bora lá!', // abertura do vídeo, no jeito de falar do Thiago
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
      texto: 'Pronto, a conta está aqui, em aberto. Quando o cliente vier pagar, a baixa é feita no caixa. Mas antes, olha os outros jeitos de lançar.',
      marcar: [{ alvo: { css: 'tbody tr:has-text("Mariana Exemplo")' }, legenda: 'Em aberto' }],
    },
    {
      antes: [
        { tipo: 'clicar', alvo: { papel: 'button', nome: 'Nova conta' }, seguro: true, espera: 1800 },
        { tipo: 'preencher', alvo: { placeholder: 'Digite o nome do cliente...', dentro: 'dialog' }, valor: 'Joana Exemplo', espera: 2500 },
        { tipo: 'clicar', alvo: { texto: 'Joana Exemplo', exato: true, dentro: 'dialog' }, seguro: true, espera: 1200 },
        { tipo: 'preencher', alvo: { css: 'div.space-y-1:has(label:text-is("Descrição")) input', dentro: 'dialog' }, valor: 'Notebook usado parcelado' },
        { tipo: 'preencher', alvo: { campo: 'Quantidade de parcelas', dentro: 'dialog' }, valor: '3' },
        { tipo: 'preencher', alvo: { campo: 'Vencimento', dentro: 'dialog' }, valor: '2026-11-10' },
        { tipo: 'preencher', alvo: { css: 'div.space-y-1:has(label:has-text("Valor total")) input', dentro: 'dialog' }, valor: '900' },
        { tipo: 'clicar', alvo: { css: 'div.space-y-1:has(label:text-is("Descrição")) input', dentro: 'dialog' }, seguro: true, espera: 800 },
      ],
      titulo: 'Conta parcelada',
      texto: 'Agora uma parcelada: Nova conta, a cliente, a descrição, e em Quantidade de parcelas coloca três. Coloca o valor total e o vencimento da primeira. Ele divide sozinho: três de trezentos, uma por mês.',
      marcar: [
        { alvo: { campo: 'Quantidade de parcelas', dentro: 'dialog' }, legenda: '3 parcelas' },
        { alvo: { css: 'div.space-y-1:has(label:has-text("Valor total")) input', dentro: 'dialog' }, legenda: 'R$ 900' },
        { alvo: { texto: /^Parcelado:/, dentro: 'dialog' }, legenda: '3x de R$ 300' },
      ],
      depois: [{ tipo: 'clicar', alvo: { papel: 'button', nome: 'Salvar', exato: true, dentro: 'dialog' }, aguardarFechar: true, espera: 4000 }],
      dica: 'Boleto, crediário ou carnê: informe o valor total e o sistema divide nas parcelas.',
    },
    {
      antes: [{ tipo: 'preencher', alvo: { placeholder: 'Nome do cliente' }, valor: 'Joana Exemplo', espera: 4000 }],
      titulo: 'As três parcelas',
      texto: 'Pronto: três contas, uma pra cada mês. A primeira já venceu, por isso fica vermelha, e já aparece na Central de cobrança.',
      marcar: [{ alvo: { css: 'tbody tr:has-text("Notebook usado parcelado")' }, legenda: 'Parcela 1/3' }],
    },
    {
      antes: [
        { tipo: 'clicar', alvo: { papel: 'button', nome: 'Nova conta' }, seguro: true, espera: 1800 },
        { tipo: 'preencher', alvo: { placeholder: 'Digite o nome do cliente...', dentro: 'dialog' }, valor: 'Mariana Exemplo', espera: 2500 },
        { tipo: 'clicar', alvo: { texto: 'Mariana Exemplo', exato: true, dentro: 'dialog' }, seguro: true, espera: 1200 },
        { tipo: 'preencher', alvo: { css: 'div.space-y-1:has(label:text-is("Descrição")) input', dentro: 'dialog' }, valor: 'Formatação com backup' },
        { tipo: 'preencher', alvo: { css: 'div.space-y-1:has(label:has-text("Valor total")) input', dentro: 'dialog' }, valor: '120' },
        { tipo: 'clicar', alvo: { papel: 'button', nome: /Já foi recebido agora/, dentro: 'dialog' }, seguro: true, espera: 1000 },
        { tipo: 'clicar', alvo: { papel: 'combobox', nome: 'Selecione a forma usada no pagamento', dentro: 'dialog' }, seguro: true, espera: 1000 },
        { tipo: 'clicar', alvo: { papel: 'option', nome: /^Dinheiro/ }, seguro: true, espera: 1000 },
      ],
      titulo: 'Já recebeu na hora?',
      texto: 'E se a cliente já pagou na hora? Lança a conta e liga Já foi recebido agora. Escolhe a forma de pagamento, aqui dinheiro, e salva. A conta já entra paga.',
      marcar: [
        { alvo: { papel: 'button', nome: /Já foi recebido agora/, dentro: 'dialog' }, legenda: 'Já recebido' },
        { alvo: { papel: 'combobox', nome: /Dinheiro|Selecione a forma/, dentro: 'dialog' }, legenda: 'Forma' },
      ],
      depois: [{ tipo: 'clicar', alvo: { papel: 'button', nome: 'Salvar', exato: true, dentro: 'dialog' }, aguardarFechar: true, espera: 4000 }],
    },
    {
      antes: [{ tipo: 'preencher', alvo: { placeholder: 'Nome do cliente' }, valor: 'Mariana Exemplo', espera: 4000 }, { tipo: 'esperar', alvo: { css: "tbody tr:has-text(\"Conserto de notebook\") button[title=\"Receber no caixa (PDV)\"]" }, limite: 60000, espera: 500 }],
      titulo: 'Receber no caixa ou no Pix',
      texto: 'Na linha da conta em aberto tem dois botões: o verde, Receber no caixa, e o do QR Code, Receber com Pix, que manda o Pix pro cliente e dá baixa sozinho quando ele paga. O Pix precisa do banco ligado ao sistema.',
      marcar: [
        { alvo: { css: 'tbody tr:has-text("Conserto de notebook") button[title="Receber no caixa (PDV)"]' }, legenda: 'Receber no caixa' },
        { alvo: { css: 'tbody tr:has-text("Conserto de notebook") button[title^="Receber com Pix"]' }, legenda: 'Receber com Pix' },
      ],
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
      texto: 'Agora a baixa. No caixa, aperta F1, Recebimentos, e busca o cliente. Aparece tudo o que ele deve.',
      marcar: [{ alvo: { texto: 'Conserto de notebook', exato: true, dentro: 'dialog' }, legenda: 'A conta dele' }],
    },
    {
      antes: [{ tipo: 'clicar', alvo: { css: 'div:has(> span:text("Marcar todas as parcelas")) input[type=checkbox]', dentro: 'dialog' }, seguro: true, forcar: true, espera: 1200 }],
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
      texto: 'E voltando em Contas a Receber, na aba Pagas, as duas contas da Mariana já aparecem pagas, e o dinheiro entrou no caixa do dia.',
      marcar: [{ alvo: { css: 'tbody tr:has-text("Mariana Exemplo")' }, legenda: 'Paga' }],
    },
  ],
};
