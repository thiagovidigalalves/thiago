// Ordem de serviço feita DE VERDADE na Demonstração (pedido do dono, 27/11/2026): OS da cliente fictícia Joana Exemplo
// (sem telefone: nenhum aviso vai para WhatsApp), com equipamento, defeito, laudo, um serviço e uma peça; salva aberta,
// depois muda o status para Concluída e é recebida no caixa (PDV › Ordens de serviço › Receber), em dinheiro, SEM nota
// ("3" = OS sem documento fiscal, e "Não imprimir"). O "Receber OS no caixa" da tela de OS não é usado porque abre o
// PDV sem o ?empresa= (o robô cairia em outra empresa).
module.exports = {
  id: 'ordem-de-servico',
  ordem: 33,
  grupo: 'Comercial',
  titulo: 'Ordem de serviço: abrir, concluir e receber',
  gravaDados: true,
  valoresReais: true, // R$ 40 do serviço + R$ 80 da peça = R$ 120
  manter: ['Joana Exemplo', 'Fone de ouvido TWS M25', 'Fone não conecta no celular', 'Pareamento refeito e limpeza dos contatos', 'Limpeza e pareamento do fone', 'FONE DE OUVIDO SEM FIO TWS M25', '25153507', '40'],
  assunto: {"chave": ["ordem", "os", "servico", "serviço", "ordem de serviço", "conserto", "laudo", "receber os"], "acoes": ["abrir", "abro", "fazer", "faço", "lançar", "criar", "nova", "cadastrar", "funciona", "usar", "concluir", "finalizar", "receber"], "rotas": ["/comercial/ordens-servico"]}, // como o Thiaguinho acha o vídeo
  resumo: 'Abra a OS com cliente, equipamento, defeito, serviço e peça; conclua quando ficar pronta e receba no caixa.',
  fala: 'Oi! Aqui é o Thiago, da Thiago Informática. Neste vídeo eu vou abrir uma ordem de serviço de verdade, concluir o serviço e receber no caixa. Bora lá!',
  antesDeComecar: 'Ter os produtos (peças) cadastrados. Os serviços podem ser escritos na hora ou cadastrados antes em Cadastros › Serviços. Os nomes dos campos mudam conforme o ramo: oficina mostra "Veículo/Placa/Mecânico"; assistência técnica mostra "Equipamento/Técnico".',
  passos: [
    {
      ir: '/comercial/ordens-servico',
      espera: 8000,
      titulo: 'Abra Ordens de Serviço',
      texto: 'No menu, clica em Comercial, Ordens de Serviço. Aqui ficam todas as ordens. Pra abrir uma, é no Nova ordem.',
      marcar: [{ alvo: { papel: 'button', nome: 'Nova ordem', exato: true }, legenda: 'Nova ordem' }],
    },
    {
      antes: [
        { tipo: 'clicar', alvo: { papel: 'button', nome: 'Nova ordem', exato: true }, seguro: true, espera: 2000 },
        { tipo: 'preencher', alvo: { css: '#os-client-search' }, valor: 'Joana Exemplo', espera: 2500 },
        { tipo: 'esperar', alvo: { css: 'div.relative:has(#os-client-search) button:text-is("Joana Exemplo")' }, espera: 300 },
        { tipo: 'clicar', alvo: { css: 'div.relative:has(#os-client-search) button:text-is("Joana Exemplo")' }, seguro: true, espera: 1500 },
      ],
      titulo: 'Escolha o cliente',
      texto: 'Clica em Nova ordem. Digita o nome do cliente e clica nele. Se for cliente novo, aparece o Cadastrar cliente ali mesmo.',
      marcar: [{ alvo: { texto: 'Cliente selecionado:' }, legenda: 'Cliente' }],
    },
    {
      antes: [
        { tipo: 'preencher', alvo: { placeholder: /Veículo \(modelo\/marca\)|Equipamento e modelo/ }, valor: 'Fone de ouvido TWS M25', espera: 800 },
        { tipo: 'preencher', alvo: { css: '#os-mobile-vehicle textarea' }, valor: 'Fone não conecta no celular', espera: 800 },
        { tipo: 'preencher', alvo: { placeholder: /^Laudo técnico deste/ }, valor: 'Pareamento refeito e limpeza dos contatos', espera: 800 },
      ],
      titulo: 'Equipamento, defeito e laudo',
      texto: 'Agora o equipamento, ou o veículo, com o modelo. É o único campo obrigatório, por isso tem o asterisco. Embaixo, o defeito que o cliente falou e, depois de olhar, o laudo técnico.',
      marcar: [
        { alvo: { placeholder: /Veículo \(modelo\/marca\)|Equipamento e modelo/ }, legenda: 'Equipamento *' },
        { alvo: { css: '#os-mobile-vehicle textarea' }, legenda: 'Defeito' },
        { alvo: { placeholder: /^Laudo técnico deste/ }, legenda: 'Laudo' },
      ],
    },
    {
      antes: [
        { tipo: 'clicar', alvo: { papel: 'button', nome: 'Adicionar serviço' }, seguro: true, espera: 1000 },
        { tipo: 'preencher', alvo: { papel: 'combobox', nome: 'Buscar serviço' }, valor: 'Limpeza e pareamento do fone', espera: 800 },
        { tipo: 'tecla', tecla: 'Escape', espera: 400 },
        { tipo: 'preencher', alvo: { rotulo: 'Valor do serviço em reais' }, valor: '40', espera: 800 },
      ],
      titulo: 'Adicione o serviço',
      texto: 'Clica em Adicionar serviço. Escreve o serviço, ou busca um que já tem cadastro, e coloca o valor. O técnico do serviço é opcional: escolhe ele se ganha comissão.',
      marcar: [
        { alvo: { papel: 'combobox', nome: 'Buscar serviço' }, legenda: 'Serviço' },
        { alvo: { rotulo: 'Valor do serviço em reais' }, legenda: 'Valor' },
      ],
    },
    {
      antes: [
        { tipo: 'clicar', alvo: { papel: 'button', nome: 'Adicionar produto' }, seguro: true, espera: 1000 },
        { tipo: 'preencher', alvo: { papel: 'combobox', nome: 'Buscar produto' }, valor: '25153507', espera: 1500 },
        { tipo: 'tecla', tecla: 'Enter', espera: 1500 },
      ],
      titulo: 'Adicione as peças',
      texto: 'Agora as peças. Clica em Adicionar produto, bipa ou digita o código e aperta Enter. A peça sai do estoque quando a OS é recebida no caixa.',
      marcar: [{ alvo: { papel: 'combobox', nome: 'Buscar produto' }, legenda: 'Peça' }],
      dica: 'Use "+ Adicionar fotos" para guardar fotos de antes, durante e depois do serviço.',
    },
    {
      titulo: 'Salve a ordem',
      texto: 'Tudo certo? Clica em Salvar ordem. Se o cliente ainda vai aprovar o preço, é no Gerar orçamento, que você manda no WhatsApp ou imprime.',
      marcar: [
        { alvo: { papel: 'button', nome: 'Gerar orçamento' }, legenda: 'Orçamento' },
        { alvo: { papel: 'button', nome: /Salvar ordem/ }, legenda: 'Salvar ordem' },
      ],
      depois: [
        { tipo: 'clicar', alvo: { papel: 'button', nome: /Salvar ordem/ }, espera: 5000 },
        { tipo: 'tecla', tecla: 'Escape', espera: 1500 }, // fecha a pergunta de imprimir/avisar, se aparecer
      ],
    },
    {
      antes: [
        { tipo: 'preencher', alvo: { css: 'input[data-os-busca]' }, valor: 'Joana Exemplo', espera: 2000 },
        { tipo: 'tecla', tecla: 'Enter', espera: 3000 },
      ],
      titulo: 'A OS está aberta',
      texto: 'Pronto, a OS está salva, aqui na lista. Quando o serviço ficar pronto, clica no lápis pra editar.',
      marcar: [
        { alvo: { css: 'tbody tr:has-text("Joana Exemplo")' }, legenda: 'OS aberta' },
        { alvo: { css: 'tbody tr:has-text("Joana Exemplo") button[title="Editar"]:not([disabled])' }, legenda: 'Editar' },
      ],
    },
    {
      antes: [
        { tipo: 'clicar', alvo: { css: 'tbody tr:has-text("Joana Exemplo") button[title="Editar"]:not([disabled])' }, seguro: true, espera: 2500 },
        { tipo: 'escolher', alvo: { css: 'label:has-text("Status") > select' }, valor: 'Concluída', espera: 1200 },
      ],
      titulo: 'Serviço pronto: Concluída',
      texto: 'Serviço pronto? Abre a OS, muda o Status pra Concluída, e clica em Salvar ordem.',
      marcar: [
        { alvo: { css: 'label:has-text("Status") > select' }, legenda: 'Concluída' },
        { alvo: { papel: 'button', nome: /Salvar ordem/ }, legenda: 'Salvar ordem' },
      ],
      depois: [
        { tipo: 'clicar', alvo: { papel: 'button', nome: /Salvar ordem/ }, espera: 5000 },
        { tipo: 'tecla', tecla: 'Escape', espera: 1500 },
      ],
    },
    {
      ir: '/pdv',
      espera: 15000,
      antes: [{ tipo: 'clicar', alvo: { papel: 'button', nome: 'Ordens de serviço' }, seguro: true, espera: 5000 }],
      titulo: 'Receba no caixa',
      texto: 'Agora o cliente veio buscar. No menu, clica em Comercial, PDV, e na tela do caixa clica em Ordens de serviço. Na linha da OS, é o botão de receber.',
      marcar: [{ alvo: { css: '[aria-label="Ordens de serviço sobre o caixa"] tr:has-text("Joana Exemplo") button[title="Receber OS no caixa"]:not([disabled])' }, legenda: 'Receber' }],
      depois: [{ tipo: 'clicar', alvo: { css: '[aria-label="Ordens de serviço sobre o caixa"] tr:has-text("Joana Exemplo") button[title="Receber OS no caixa"]:not([disabled])' }, seguro: true, espera: 4000 }],
    },
    {
      titulo: 'A OS vem para a venda',
      texto: 'Pronto: o serviço e a peça da OS já vieram pra venda, com o cliente. É só receber.',
      marcar: [{ alvo: { texto: 'TOTAL A RECEBER', exato: true }, legenda: 'Total da OS' }],
    },
    {
      antes: [
        { tipo: 'tecla', tecla: 'F9', espera: 2500 },
        { tipo: 'clicar', alvo: { papel: 'button', nome: 'Dinheiro', dentro: 'dialog' }, seguro: true, espera: 1500 },
      ],
      titulo: 'Receba e finalize',
      texto: 'Aperta F9, escolhe a forma, aqui foi Dinheiro, e Enter. Sem nota: tecla três, OS sem documento fiscal, e Não imprimir.',
      marcar: [{ alvo: { papel: 'button', nome: /Confirmar/, dentro: 'dialog' }, legenda: 'Confirmar (Enter)' }],
      depois: [
        { tipo: 'tecla', tecla: 'Enter', espera: 5000 },
        { tipo: 'tecla', tecla: '3', espera: 2500 },
        { tipo: 'clicar', alvo: { papel: 'button', nome: /Não imprimir/ }, seguro: true, espera: 2500 },
      ],
    },
    {
      ir: '/comercial/ordens-servico',
      espera: 8000,
      semMenu: true, // vem do PDV, que é tela cheia sem o menu lateral
      antes: [
        { tipo: 'preencher', alvo: { css: 'input[data-os-busca]' }, valor: 'Joana Exemplo', espera: 2000 },
        { tipo: 'tecla', tecla: 'Enter', espera: 3000 },
      ],
      titulo: 'OS recebida',
      texto: 'E lá em Ordens de Serviço, a OS já aparece recebida no caixa, ligada à venda.',
      marcar: [{ alvo: { css: 'tbody tr:has-text("Joana Exemplo")' }, legenda: 'Recebida' }],
    },
  ],
};
