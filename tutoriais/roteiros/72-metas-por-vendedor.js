module.exports = {
  id: 'metas-por-vendedor',
  ordem: 72,
  grupo: 'Relatórios',
  titulo: 'Metas do mês por vendedor',
  resumo: 'Defina a meta de cada vendedor e acompanhe quanto falta por dia para bater.',
  antesDeComecar: 'Os vendedores precisam estar cadastrados em Cadastros › Usuários.',
  passos: [
    {
      ir: '/relatorios/metas-vendedores',
      titulo: 'Abra "Metas por vendedor"',
      texto: 'No menu, clique em Relatórios › Vendas › Metas por vendedor. Aparece quanto cada um já vendeu no mês e o ritmo.',
      marcar: [{ alvo: { papel: 'heading', nome: 'Metas por vendedor' } }],
    },
    {
      titulo: 'Digite a meta de cada vendedor',
      texto: 'Na coluna "Meta do mês", digite o valor da meta do vendedor e aperte Enter para salvar.',
      marcar: [{ alvo: { rotulo: 'Meta do mês' } }],
      dica: 'No mês seguinte, use "Copiar do mês anterior" para repetir as metas sem digitar tudo de novo.',
    },
    {
      titulo: 'Acompanhe a projeção e o "falta por dia"',
      texto: '"Projeção do mês" mostra quanto a loja vai vender se continuar no ritmo de hoje. "Falta por dia" diz quanto precisa vender por dia para bater a meta.',
      marcar: [{ alvo: { texto: 'Falta por dia', exato: true } }],
    },
  ],
};
