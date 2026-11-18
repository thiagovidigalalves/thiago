module.exports = {
  id: 'conciliacao-bancaria',
  ordem: 47,
  grupo: 'Financeiro',
  titulo: 'Conciliação bancária (extrato × sistema)',
  resumo: 'Confira se o extrato do banco bate com o que foi lançado no sistema.',
  antesDeComecar: 'A conta do banco precisa estar cadastrada em Financeiro › Contas.',
  passos: [
    {
      ir: '/financeiro/conciliacao',
      desfocarTudo: true,
      titulo: 'Escolha a conta e envie o extrato',
      texto: 'Em Financeiro › Conciliação bancária, escolha a conta e clique em "Enviar extrato" (arquivo OFX, CSV, PDF ou até foto). Conta Sicoob automática: use "Puxar do Sicoob".',
      marcar: [{ alvo: { papel: 'heading', nome: 'Conciliação bancária' } }],
    },
    {
      desfocarTudo: true,
      titulo: 'Confira linha por linha',
      texto: 'O sistema junta o que é igual. Em "Confirme", clique em "Confirmar" ou "Não é". Em "Só no banco", clique em "Lançar" para registrar o que faltou (ex.: tarifa) ou "Ignorar".',
      marcar: [{ alvo: { papel: 'button', nome: /Para conferir/ } }],
      dica: 'O cartão "Diferença" mostra "Bateu" quando o saldo do banco e o do sistema ficam iguais.',
    },
    {
      desfocarTudo: true,
      titulo: 'Maquininhas: caiu certo?',
      texto: 'Clique em "Cartões" para ver, por dia, quanto as maquininhas deveriam depositar (já sem a taxa) e quanto caiu de verdade no banco.',
      marcar: [{ alvo: { papel: 'button', nome: 'Cartões', exato: true } }],
    },
  ],
};
