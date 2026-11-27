// Conciliação bancária (Financeiro › Banco e organização › Conciliação bancária).
// LIMITE (27/11/2026): para lançar de verdade precisa de um extrato do banco. O "Enviar extrato" abre a janela de
// escolher arquivo do computador (o robô não tem ação de enviar arquivo) e o "Puxar do Sicoob" só existe com banco
// vinculado, que a Demonstração não tem. Por isso o vídeo mostra cada botão até o último clique antes do banco/arquivo:
// Confirmar / Não é / Lançar / Ignorar só são marcados. Quando houver extrato na Demonstração, dá para trocar os
// `marcar` dos passos 4 e 5 por cliques (gravaDados já está ligado).
module.exports = {
  id: 'conciliacao-bancaria',
  ordem: 47,
  grupo: 'Financeiro',
  titulo: 'Conciliação bancária (extrato × sistema)',
  gravaDados: true,
  assunto: { chave: ['conciliacao', 'conciliar', 'extrato', 'ofx', 'banco bateu', 'maquininha caiu'], acoes: ['conferir', 'fazer', 'enviar', 'como', 'bater'], rotas: ['/financeiro/conciliacao'] },
  resumo: 'Confira se o extrato do banco bate com o que foi lançado no sistema.',
  fala: 'Oi! Aqui é o Thiago, da Thiago Informática. Neste vídeo eu vou te mostrar a conciliação bancária: como conferir se o extrato do banco bate com o que está no sistema. Bora lá!',
  antesDeComecar: 'A conta do banco precisa estar cadastrada em Financeiro › Contas, com o saldo inicial conferido.',
  passos: [
    {
      ir: '/financeiro/conciliacao',
      espera: 7000,
      desfocarTudo: true,
      titulo: 'Escolha a conta',
      texto: 'No menu, clica em Financeiro, Banco e organização, Conciliação bancária. Em cima ficam as suas contas: clica na conta do banco que você quer conferir.',
      marcar: [{ alvo: { papel: 'heading', nome: 'Conciliação bancária' }, legenda: 'Conciliação' }],
    },
    {
      desfocarTudo: true,
      titulo: 'Saldo do banco × saldo do sistema',
      texto: 'Aqui aparecem três cartões: o saldo no banco, o saldo no sistema, e a Diferença. Quando os dois ficam iguais, a diferença mostra Bateu.',
      marcar: [{ alvo: { texto: 'Diferença', exato: true }, legenda: 'Diferença' }],
    },
    {
      desfocarTudo: true,
      titulo: 'Envie o extrato',
      texto: 'Clica em Enviar extrato e escolhe o arquivo do banco: pode ser OFX, CSV, PDF, ou até a foto do extrato. Se a conta é Sicoob ligada ao sistema, aparece o botão Puxar do Sicoob, e ele busca sozinho.',
      marcar: [{ alvo: { papel: 'button', nome: /Enviar extrato/ }, legenda: 'Enviar extrato' }],
      atencao: 'O botão abre a escolha de arquivo do seu computador: baixe o extrato no site ou app do banco antes.',
    },
    {
      desfocarTudo: true,
      antes: [{ tipo: 'clicar', alvo: { papel: 'button', nome: /Para conferir/ }, seguro: true, espera: 1500 }],
      titulo: 'Confirme o que é igual',
      texto: 'O sistema junta sozinho o que é igual nos dois lados. Em Confirme, ele sugere: é esse lançamento? Clica em Confirmar, ou em Não é.',
      marcar: [{ alvo: { papel: 'button', nome: /🟡 Confirme/ }, legenda: 'Confirme' }],
    },
    {
      desfocarTudo: true,
      titulo: 'O que só está no banco',
      texto: 'Em Só no banco ficam as coisas que caíram no banco e não estão no sistema, como uma tarifa. Clica em Lançar, escolhe o plano de contas, e pronto. Ou em Ignorar, se não precisa lançar.',
      marcar: [{ alvo: { papel: 'button', nome: /🔴 Só no banco/ }, legenda: 'Só no banco' }],
      dica: 'O que você confirmou fica em "🟢 Conferidos". Fechou o mês e bateu? Use "Fechar" no quadro do contador.',
    },
    {
      desfocarTudo: true,
      antes: [{ tipo: 'clicar', alvo: { papel: 'button', nome: /Cartões/ }, seguro: true, espera: 2500 }],
      titulo: 'Maquininhas: caiu certo?',
      texto: 'E clicando em Cartões, você vê por dia quanto a maquininha devia depositar, já sem a taxa, e quanto caiu de verdade no banco.',
      marcar: [{ alvo: { papel: 'button', nome: /Cartões/ }, legenda: 'Cartões' }],
    },
  ],
};
