module.exports = {
  id: 'impressoras',
  ordem: 81,
  grupo: 'Configurações',
  titulo: 'Configurar a impressora de cupom',
  resumo: 'Cadastre a impressora (cupom 80mm ou A4) e escolha se imprime sozinho.',
  antesDeComecar: 'A impressora precisa estar instalada e compartilhada no Windows.',
  passos: [
    {
      ir: '/configuracoes/impressoras',
      titulo: 'Clique em "Nova impressora"',
      texto: 'No menu, clique em Configurações › Impressoras e depois em "Nova impressora".',
      marcar: [{ alvo: { papel: 'button', nome: 'Nova impressora' } }],
      depois: [{ tipo: 'clicar', alvo: { papel: 'button', nome: 'Nova impressora' }, espera: 1500 }],
    },
    {
      titulo: 'Apelido e impressora',
      texto: 'Dê um apelido (ex.: Cupom Balcão) e escolha a impressora. No aplicativo TH Gestor, o botão "Listar" mostra as impressoras do computador.',
      marcar: [
        { alvo: { placeholder: 'Ex.: Cupom Balcão', dentro: 'dialog' }, legenda: 'Apelido' },
        { alvo: { papel: 'button', nome: 'Listar', dentro: 'dialog' }, legenda: 'Achar impressora' },
      ],
    },
    {
      titulo: 'Formato e comportamento',
      texto: 'Escolha "Bobina (cupom 80mm)" ou "Folha A4", e se nas vendas o sistema deve perguntar, imprimir direto ou não imprimir.',
      marcar: [{ alvo: { texto: 'Comportamento nas vendas', dentro: 'dialog' } }],
    },
    {
      titulo: 'Salve e teste',
      texto: 'Ligue "Impressora padrão" e clique em "Salvar". Depois use o botão "Imprimir teste" na lista para conferir.',
      marcar: [{ alvo: { papel: 'button', nome: 'Salvar', exato: true, dentro: 'dialog' } }],
    },
  ],
};
