// PDV › Modo treino (versão 2026.11.20.777): o funcionário pratica vendas e NADA é gravado (estoque, caixa, financeiro,
// Pix, boleto e nota continuam iguais). Gravado na Demonstração. O robô aceita a pergunta "Ligar o MODO TREINO?"
// (aceitarConfirmacao) e faz uma venda de treino de verdade: no treino nada vai para o servidor.
module.exports = {
  id: 'modo-treino-pdv',
  ordem: 30.5,
  grupo: 'Comercial',
  titulo: 'Modo treino no PDV',
  aceitarConfirmacao: true,
  valoresReais: true, // R$ 420, 500 e 80 de troco: a conta tem que fechar
  manter: ['Tenis Penalty Max'],
  assunto: { chave: ['treino', 'treinar', 'modo treino', 'praticar', 'funcionario novo', 'ensinar'], acoes: ['usar', 'ligar', 'fazer', 'treinar', 'como', 'praticar', 'ensinar'], rotas: ['/pdv'] },
  resumo: 'Funcionário novo pratica vendas no caixa sem medo: no treino nada é gravado.',
  fala: 'Oi! Aqui é o Thiago, da Thiago Informática. Neste vídeo eu vou te mostrar o Modo treino do PDV: o funcionário novo pratica vendas à vontade, e nada é gravado. Bora lá!',
  passos: [
    {
      ir: '/pdv',
      espera: 8000,
      titulo: 'Abra o PDV',
      texto: 'Abre o PDV pelo menu. Aqui no canto de baixo tem o botão laranja Modo treino.',
      marcar: [{ alvo: { papel: 'button', nome: /Modo treino/ }, legenda: 'Modo treino' }],
    },
    {
      antes: [{ tipo: 'clicar', alvo: { papel: 'button', nome: /Modo treino/ }, seguro: true, espera: 2000 }],
      titulo: 'Ligue o treino',
      texto: 'Clica nele e confirma. Pronto: aparece essa faixa listrada lá em cima, Modo treino, nada é gravado. Assim todo mundo sabe que é só treino.',
      marcar: [
        { alvo: { texto: /MODO TREINO · nada é gravado/ }, legenda: 'Só treino' },
        { alvo: { papel: 'button', nome: 'Sair do treino', exato: true }, legenda: 'Sair' },
      ],
    },
    {
      antes: [
        { tipo: 'clicar', alvo: { papel: 'button', nome: /Nova venda/ }, seguro: true, espera: 1500 },
        { tipo: 'preencher', alvo: { placeholder: 'Código ou produto' }, valor: '10006306' },
        { tipo: 'tecla', tecla: 'Enter', espera: 2500 },
      ],
      titulo: 'Faça uma venda de treino',
      texto: 'Agora é vender igualzinho: bipa o produto ou digita o código, e ele entra na venda.',
      marcar: [{ alvo: { texto: 'Tenis Penalty Max', exato: true }, legenda: 'Produto lançado' }],
    },
    {
      antes: [
        { tipo: 'tecla', tecla: 'F9', espera: 2000 },
        { tipo: 'preencher', alvo: { css: 'input[data-payment-amount]' }, valor: '500' },
        { tipo: 'clicar', alvo: { papel: 'button', nome: /Dinheiro/ }, seguro: true, espera: 1500 },
      ],
      titulo: 'Receba e veja o troco',
      texto: 'Aperta F9, coloca quanto o cliente deu, escolhe Dinheiro, e o sistema já mostra o troco. Depois é só confirmar.',
      marcar: [
        { alvo: { texto: /TROCO A DEVOLVER/ }, legenda: 'Troco' },
        { alvo: { papel: 'button', nome: /Confirmar/ }, legenda: 'Confirmar' },
      ],
      depois: [{ tipo: 'tecla', tecla: 'Enter', espera: 2500 }],
    },
    {
      titulo: 'Venda de treino concluída',
      texto: 'Olha o recibo: venda de treino concluída. No treino não entra no caixa, não baixa o estoque, não gera conta, nem Pix, boleto ou nota.',
      marcar: [
        { alvo: { texto: 'Venda de treino concluída!', exato: true }, legenda: 'Nada foi gravado' },
        { alvo: { texto: /não baixa o estoque/ }, legenda: 'Estoque e caixa iguais' },
      ],
      depois: [{ tipo: 'clicar', alvo: { papel: 'button', nome: 'Nova venda de treino' }, seguro: true, espera: 1200 }],
    },
    {
      titulo: 'Sair do treino',
      texto: 'Terminou de treinar? Clica em Sair do treino e o caixa volta ao normal. Pra liberar o Modo treino na sua loja, é só pedir pro suporte.',
      marcar: [{ alvo: { papel: 'button', nome: 'Sair do treino', exato: true }, legenda: 'Volta ao normal' }],
      depois: [{ tipo: 'clicar', alvo: { papel: 'button', nome: 'Sair do treino', exato: true }, seguro: true, espera: 1500 }],
    },
  ],
};
