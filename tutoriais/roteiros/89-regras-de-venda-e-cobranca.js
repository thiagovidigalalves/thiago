module.exports = {
  id: 'regras-de-venda-e-cobranca',
  ordem: 89,
  grupo: 'Configurações',
  titulo: 'Regras: estoque na venda, cadastro de clientes, multa e juros',
  resumo: 'Bloqueie venda sem estoque, evite cliente repetido e cobre multa e juros de atraso.',
  passos: [
    {
      ir: '/configuracoes/vendas',
      titulo: 'Bloquear venda sem estoque',
      texto: 'Em Configurações › Vendas, ligue "Bloquear vendas sem estoque" para o sistema não deixar vender produto que não tem. Desligado, o estoque pode ficar negativo. Clique em "Salvar configuração".',
      marcar: [{ alvo: { rotulo: 'Bloquear venda com estoque insuficiente' } }],
    },
    {
      ir: '/configuracoes/cadastros',
      titulo: 'Cliente com nome ou CPF repetido',
      texto: 'Em Configurações › Cadastros, escolha se pode cadastrar dois clientes com o mesmo nome ou o mesmo CPF/CNPJ. Clique em "Salvar configurações".',
      marcar: [{ alvo: { texto: 'Permitir CPF ou CNPJ repetido' } }],
    },
    {
      ir: '/configuracoes/financeiro',
      titulo: 'Multa e juros de atraso',
      texto: 'Em Configurações › Financeiro, aba "Multa e juros", ligue a cobrança, informe a multa (%), os juros ao mês (%) e os dias de carência. Na aba "Avisos no caixa", escolha se o caixa precisa da liberação do administrador para vender a quem está atrasado.',
      marcar: [{ alvo: { papel: 'tab', nome: 'Multa e juros' } }],
      dica: 'Só o administrador da empresa consegue mudar estas regras.',
    },
  ],
};
