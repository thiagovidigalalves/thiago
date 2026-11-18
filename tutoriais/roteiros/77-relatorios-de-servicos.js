module.exports = {
  id: 'relatorios-de-servicos',
  ordem: 77,
  grupo: 'Relatórios',
  titulo: 'Relatórios de serviços: OS por técnico, BI OS e comparativo',
  resumo: 'Veja quanto cada técnico produziu e se a oficina está fazendo mais ou menos serviços.',
  passos: [
    {
      ir: '/relatorios/servicos/os-por-mecanico',
      titulo: 'OS por técnico',
      texto: 'Em Relatórios › Serviços › OS por técnico, escolha o período e o técnico. Aparecem quantas OS, serviços e peças cada um fez.',
      marcar: [{ alvo: { papel: 'button', nome: 'Este mês', exato: true } }],
    },
    {
      ir: '/relatorios/servicos/bi-ordem-servico',
      titulo: 'BI OS: a visão do gerente',
      texto: 'O BI OS mostra o resultado das ordens de serviço: total, quanto foi peça e quanto foi serviço, e quanto cada profissional produziu. Escolha o período e clique em "Aplicar filtros".',
      marcar: [{ alvo: { papel: 'button', nome: 'Mês atual', exato: true } }],
      dica: '"Imprimir BI" gera o relatório para guardar.',
    },
    {
      ir: '/relatorios/servicos/comparativo',
      titulo: 'Comparativo de serviços',
      texto: 'Clique em "Este mês × mês passado". O sistema compara os dois períodos por serviço, por técnico e por peça. Clique numa linha para ver o detalhe no BI OS.',
      marcar: [{ alvo: { papel: 'button', nome: /Este mês × mês passado/ } }],
    },
  ],
};
