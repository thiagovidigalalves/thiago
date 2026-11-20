// Funcionários: comissão automática (só mostra; nada é salvo).
module.exports = {
  id: 'funcionarios-comissao',
  ordem: 48.3,
  grupo: 'Funcionários',
  titulo: 'Funcionários: comissão automática',
  valoresReais: true, // valores da Demonstração (fictícios e coerentes): não inventa outros
  manter: ['Mayara', 'JOAO PAULO', 'Jonathan', 'Rafael Arantes', 'Rafael'],
  assunto: { chave: ['comissao', 'comissoes', 'funcionario', 'vendedor', 'tecnico'], acoes: ['funciona', 'calcular', 'pagar', 'ver', 'como', 'automatica'], rotas: ['/funcionarios', '/funcionarios/configuracoes'] },
  resumo: 'A comissão soma sozinha pelas vendas e OS e cai no Contas a pagar no dia do pagamento.',
  fala: 'Oi! Aqui é o Thiago, da Thiago Informática. Neste vídeo eu vou te mostrar a comissão automática: você não precisa calcular nada, o sistema soma sozinho. Bora lá!',
  passos: [
    {
      ir: '/funcionarios',
      espera: 6000,
      titulo: 'Comissão do mês até agora',
      texto: 'No Painel dos funcionários, olha esse quadro verde: é a comissão do mês até agora. Ela soma sozinha pelas vendas e pelas ordens de serviço, com a mesma conta do relatório de comissões.',
      marcar: [{ alvo: { texto: /Comissão de .* até agora/ }, legenda: 'Soma sozinha' }],
    },
    {
      titulo: 'Fecha sozinha no fim do mês',
      texto: 'No fim do mês ela fecha sozinha e cai no Contas a pagar, no plano Comissões, vencendo no dia do pagamento. Se uma venda for cancelada depois, vira um ajuste no mês seguinte.',
      marcar: [{ alvo: { texto: /em andamento/ }, legenda: 'Entra no Contas a pagar' }],
    },
    {
      ir: '/funcionarios/configuracoes',
      espera: 5000,
      titulo: 'Só paga se bater a meta',
      texto: 'E em Funcionários, Configurações, tem a opção: Só paga comissão se bater a meta. Ligou, quem não bater a meta do mês fica sem comissão naquele mês.',
      marcar: [{ alvo: { texto: /bater a meta/ }, legenda: 'Opção da meta' }],
    },
  ],
};
