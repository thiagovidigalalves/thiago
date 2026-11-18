module.exports = {
  id: 'o-que-fazer-hoje',
  ordem: 90,
  grupo: 'Utilitários',
  titulo: 'O que fazer hoje',
  resumo: 'Um resumo do dia: OS atrasadas, contas vencendo, orçamentos e estoque acabando.',
  passos: [
    {
      ir: '/hoje',
      titulo: 'Abra "O que fazer hoje"',
      texto: 'No menu, clique em Utilitários › O que fazer hoje. A tela mostra quantos assuntos precisam da sua atenção hoje.',
      marcar: [{ alvo: { papel: 'heading', nome: /Bom dia|Boa tarde|Boa noite/ } }],
      desfocarTudo: false,
    },
    {
      titulo: 'Resolva pelos atalhos',
      texto: 'Cada quadro tem um botão que leva direto para resolver: "Cobrar no WhatsApp", "Abrir contas a pagar", "Mandar parabéns", "Ver produtos"...',
      marcar: [{ alvo: { papel: 'button', nome: 'Atualizar', exato: true } }],
      dica: 'Comece o dia por esta tela: em 2 minutos você sabe tudo o que precisa fazer.',
    },
  ],
};
