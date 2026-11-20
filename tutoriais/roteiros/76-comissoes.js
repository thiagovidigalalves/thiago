module.exports = {
  id: 'comissoes',
  ordem: 76,
  grupo: 'Relatórios',
  titulo: 'Comissões dos funcionários',
  resumo: 'Veja quanto cada vendedor e técnico vendeu e quanto ganhou de comissão.',
  antesDeComecar: 'A porcentagem de comissão é definida no cadastro de cada funcionário (Cadastros › Pessoas › Usuários).',
  passos: [
    {
      ir: '/relatorios/funcionarios/comissoes',
      titulo: 'Escolha o período',
      texto: 'Em Relatórios › Funcionários › Comissões, clique em "Este mês" ou "Mês passado" (o mais comum para pagar a comissão).',
      marcar: [{ alvo: { papel: 'button', nome: 'Mês passado', exato: true } }],
    },
    {
      titulo: 'Veja quanto cada um ganhou',
      texto: 'Os blocos "Vendedores" e "Técnicos/Mecânicos" mostram o total de cada pessoa. Clique na pessoa para ver venda por venda.',
      marcar: [{ alvo: { papel: 'heading', nome: /Comissões/ } }],
      dica: 'O selo "Bate com o Dashboard" confirma que os números estão certos.',
    },
  ],
};
