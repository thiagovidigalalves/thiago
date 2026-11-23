// WhatsApp: mensagens e exceções (versão 2026.11.23.860). Gravado na Demonstração: o campo inserido na mensagem NÃO é
// salvo (no fim clica em Restaurar padrão); a exceção é salva de verdade na cliente fictícia "Joana Exemplo" (sem
// telefone) e depois tirada pela lixeira, para a Demonstração ficar como estava. Nenhum WhatsApp é enviado.
module.exports = {
  id: 'whatsapp-mensagens-excecoes',
  ordem: 83,
  grupo: 'WhatsApp',
  titulo: 'WhatsApp: mensagens e exceções',
  gravaDados: true,
  manter: ['Joana Exemplo'],
  assunto: { chave: ['mensagem do whatsapp', 'mensagens do whatsapp', 'exceção', 'exceções', 'excecao', 'não receber', 'nao receber', 'não mandar', 'relatório das mensagens', 'falharam'], acoes: ['editar', 'mudar', 'alterar', 'tirar', 'bloquear', 'parar', 'como', 'ver'], rotas: ['/configuracoes/whatsapp', '/whatsapp/cobrancas'] },
  resumo: 'Edite as mensagens vendo como o cliente recebe, escolha quem não recebe mensagem automática e veja o relatório do que chegou.',
  fala: 'Oi! Aqui é o Thiago, da Thiago Informática. Neste vídeo eu vou te mostrar as mensagens do WhatsApp, como deixar um cliente de fora das mensagens automáticas, e o relatório do que chegou. Bora lá!',
  passos: [
    {
      ir: '/configuracoes/whatsapp',
      espera: 6000,
      titulo: 'Abra Configurações e mensagens',
      texto: 'No menu, clica em WhatsApp, Configurações e mensagens. Aqui em cima tem sete cartões: Conexão e envio, Vendas, Cobranças, Relacionamento, Pós-venda e avaliação, Fiscal e contador, e Exceções.',
      marcar: [{ alvo: { css: '[role=tablist]' }, legenda: '7 abas' }],
    },
    {
      antes: [{ tipo: 'clicar', alvo: { papel: 'tab', nome: /Vendas/ }, seguro: true, espera: 2500 }],
      titulo: 'Cada mensagem com a prévia',
      texto: 'Clica em Vendas. Cada mensagem tem o texto aqui na esquerda e, do lado direito, o celular mostrando como o cliente recebe.',
      marcar: [
        { alvo: { css: 'textarea' }, legenda: 'Texto' },
        { alvo: { css: '[aria-label="Prévia no celular"]' }, legenda: 'Como o cliente recebe' },
      ],
    },
    {
      antes: [
        { tipo: 'clicar', alvo: { css: 'textarea' }, seguro: true, espera: 600 },
        { tipo: 'tecla', tecla: 'Control+End', espera: 400 },
        { tipo: 'clicar', alvo: { papel: 'button', nome: '{total}', exato: true }, seguro: true, espera: 1200 },
      ],
      titulo: 'Toque num campo azul',
      texto: 'Pra colocar um dado automático, clica no texto onde você quer e toca num campo azul, por exemplo o total. Ele entra no texto, e o celular do lado já atualiza na hora.',
      marcar: [
        { alvo: { papel: 'button', nome: '{total}', exato: true }, legenda: 'Campo' },
        { alvo: { css: '[aria-label="Prévia no celular"]' }, legenda: 'Atualiza na hora' },
      ],
    },
    {
      titulo: 'Salvar ou voltar ao padrão',
      texto: 'Gostou, é só clicar em Salvar. Se quiser o texto original de volta, clica em Restaurar padrão.',
      marcar: [
        { alvo: { papel: 'button', nome: 'Salvar', exato: true }, legenda: 'Salvar' },
        { alvo: { papel: 'button', nome: 'Restaurar padrão' }, legenda: 'Restaurar padrão' },
      ],
      depois: [{ tipo: 'clicar', alvo: { papel: 'button', nome: 'Restaurar padrão' }, seguro: true, espera: 1500 }],
    },
    {
      antes: [
        { tipo: 'clicar', alvo: { papel: 'tab', nome: /Exceções/ }, seguro: true, espera: 3500 },
        { tipo: 'preencher', alvo: { placeholder: 'Procurar cliente pelo nome ou telefone' }, valor: 'Joana Exemplo', espera: 4000 },
      ],
      titulo: 'Exceções: procure o cliente',
      texto: 'Agora a aba Exceções. Aqui você escolhe quem não recebe mensagem automática. Procura o cliente pelo nome.',
      marcar: [{ alvo: { css: 'button:has(b:text-is("Joana Exemplo"))' }, legenda: 'Cliente' }],
    },
    {
      antes: [
        { tipo: 'clicar', alvo: { css: 'button:has(b:text-is("Joana Exemplo"))' }, seguro: true, espera: 1500 },
        { tipo: 'clicar', alvo: { css: 'button[aria-pressed]:has-text("Aniversário")' }, seguro: true, espera: 900 },
      ],
      titulo: 'Marque o que ele não recebe',
      texto: 'Clica no cliente e marca o que ele não deve receber: cobrança, aniversário, pós-venda, ou nenhuma mensagem. Depois, Salvar exceção.',
      marcar: [
        { alvo: { css: 'div.flex-wrap:has(> button[aria-pressed])' }, legenda: 'Não recebe' },
        { alvo: { papel: 'button', nome: 'Salvar exceção' }, legenda: 'Salvar exceção' },
      ],
      depois: [{ tipo: 'clicar', alvo: { papel: 'button', nome: 'Salvar exceção' }, espera: 5000 }],
    },
    {
      antes: [{ tipo: 'clicar', alvo: { css: 'li:has-text("Joana Exemplo") button:has-text("Pós-venda")' }, espera: 5000 }],
      titulo: 'Clientes em exceção',
      texto: 'Pronto, ela aparece em Clientes em exceção. Tocando no selo, liga ou desliga cada mensagem. Isso vale pro envio automático, pro envio em lote e pra Central de cobrança, onde ela aparece com o selo Exceção e fica fora do lote.',
      marcar: [{ alvo: { css: 'li:has-text("Joana Exemplo")' }, legenda: 'Em exceção' }],
    },
    {
      titulo: 'Lixeira: volta a receber tudo',
      texto: 'E se ela puder receber tudo de novo, é só clicar na lixeira.',
      marcar: [{ alvo: { css: 'button[aria-label="Tirar Joana Exemplo das exceções"]' }, legenda: 'Voltar a receber' }],
      depois: [{ tipo: 'clicar', alvo: { css: 'button[aria-label="Tirar Joana Exemplo das exceções"]' }, espera: 5000 }],
    },
    {
      ir: '/whatsapp/cobrancas',
      espera: 7000,
      antes: [{ tipo: 'clicar', alvo: { papel: 'heading', nome: 'Relatório das mensagens' }, seguro: true, espera: 1500 }],
      titulo: 'Relatório das mensagens',
      texto: 'Agora em WhatsApp, Cobranças, aqui embaixo tem o Relatório das mensagens. Os números Todas, Chegaram, Lidas, Na fila e Falharam filtram a lista.',
      marcar: [{ alvo: { css: '[aria-label="Filtrar por situação"]' }, legenda: 'Toque para filtrar' }],
    },
    {
      antes: [
        { tipo: 'clicar', alvo: { css: '[aria-label="Filtrar por situação"] button:has-text("Falharam")' }, seguro: true, espera: 3500 },
        { tipo: 'clicar', alvo: { texto: 'Ver mensagem', exato: true }, seguro: true, espera: 1200 },
      ],
      titulo: 'Ver a mensagem e o motivo da falha',
      texto: 'Clicando em Falharam, aparece só o que não chegou, com o motivo do lado. E em Ver mensagem você lê o texto que foi.',
      marcar: [{ alvo: { texto: 'Ver mensagem', exato: true }, legenda: 'Ver mensagem' }],
    },
    {
      antes: [{ tipo: 'clicar', alvo: { texto: /número\(s\) com falha/ }, seguro: true, espera: 1500 }],
      titulo: 'Números com falha',
      texto: 'E aqui o aviso dos números com falha mostra quem tem telefone sem WhatsApp. Depois de duas falhas, a régua para de tentar aquele número até você corrigir o cadastro.',
      marcar: [{ alvo: { texto: /número\(s\) com falha/ }, legenda: 'Corrigir o telefone' }],
    },
  ],
};
