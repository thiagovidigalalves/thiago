module.exports = {
  id: 'arquivos-contador',
  ordem: 52,
  grupo: 'Fiscal',
  titulo: 'Mandar os arquivos do mês para o contador',
  resumo: 'Baixe o pacote com todos os XMLs do mês ou envie o acesso ao contador.',
  passos: [
    {
      ir: '/fiscal/exportar-xmls',
      titulo: 'Abra "Arquivos para contador"',
      texto: 'No menu, clique em Fiscal › Arquivos para contador.',
      marcar: [{ alvo: { papel: 'heading', nome: 'Arquivos para contador' } }],
    },
    {
      titulo: 'Escolha o mês',
      texto: 'Clique em "Mês passado" (o mais comum: o contador fecha o mês anterior) ou escolha as datas em Início e Fim.',
      marcar: [{ alvo: { papel: 'button', nome: 'Mês passado' } }],
      depois: [{ tipo: 'clicar', alvo: { papel: 'button', nome: 'Mês passado' } }],
    },
    {
      titulo: 'Baixe o pacote ZIP',
      texto: 'Confira os totais e clique em "Baixar pacote contábil ZIP". Depois é só mandar esse arquivo para o contador.',
      marcar: [{ alvo: { papel: 'button', nome: /Baixar pacote contábil ZIP/ } }],
    },
    {
      titulo: 'Ou envie o acesso pelo WhatsApp',
      texto: 'Prefere que o contador baixe sozinho? Clique em "Enviar acesso ao contador pelo WhatsApp". Ele entra no Portal do Contador e pega os arquivos.',
      marcar: [{ alvo: { papel: 'button', nome: /Enviar acesso ao contador/ } }],
    },
  ],
};
