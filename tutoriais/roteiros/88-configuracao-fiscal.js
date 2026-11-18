module.exports = {
  id: 'configuracao-fiscal',
  ordem: 88,
  grupo: 'Configurações',
  titulo: 'Configuração fiscal (para emitir notas)',
  resumo: 'Certificado digital, regime de tributação, CFOP, série e numeração das notas.',
  antesDeComecar: 'Faça junto com o seu contador. Tenha o certificado digital A1 (arquivo e senha).',
  passos: [
    {
      ir: '/configuracoes/fiscal',
      desfocarCampos: true,
      titulo: 'Veja o que falta',
      texto: 'Em Configurações › Fiscal, o quadro "Pronto para emitir?" mostra quantos passos faltam. Quando estiver tudo certo aparece "Tudo pronto para emitir notas".',
      marcar: [{ alvo: { papel: 'heading', nome: 'Configuração Fiscal' } }],
    },
    {
      desfocarCampos: true,
      titulo: 'Envie o certificado digital',
      texto: 'Em "Emissor fiscal integrado", escolha o arquivo do certificado A1, digite a senha e clique em "Enviar certificado". Envie também o logo que sai na nota (DANFE).',
      marcar: [{ alvo: { placeholder: 'Senha do A1' } }],
    },
    {
      desfocarCampos: true,
      titulo: 'Regime, CFOP, série e ambiente',
      texto: 'Confira o regime tributário (Simples Nacional ou MEI), a tributação padrão (CSOSN, CFOP, PIS e COFINS), a série e o próximo número das notas. Comece em "Homologação" (teste) e passe para "Produção" quando o contador liberar.',
      marcar: [{ alvo: { texto: 'Regime tributário', exato: true } }],
      atencao: 'Em "Produção" as notas valem de verdade para a Receita.',
    },
    {
      desfocarCampos: true,
      titulo: 'Clique em "Salvar configuração fiscal"',
      texto: 'Clique em "Salvar configuração fiscal" no final da página.',
      marcar: [{ alvo: { papel: 'button', nome: 'Salvar configuração fiscal' } }],
    },
  ],
};
