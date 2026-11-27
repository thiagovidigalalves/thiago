// Serviços, status e equipamentos feitos DE VERDADE na Demonstração (pedido do dono, 27/11/2026): cadastra o serviço
// "Limpeza interna" (R$ 80, 10% de comissão), o status "Aguardando aprovação" e o equipamento da cliente fictícia
// "Joana Exemplo" (sem telefone). Os nomes dos campos mudam pelo ramo (Equipamento/Observação ou Veículo/Placa).
module.exports = {
  id: 'servicos-e-equipamentos',
  ordem: 25,
  grupo: 'Cadastros',
  titulo: 'Serviços, status e equipamentos (para a OS)',
  gravaDados: true,
  valoresReais: true, // R$ 80 e 10% do começo ao fim
  manter: ['Limpeza interna', '80', '80,00', 'Aguardando aprovação', 'Joana Exemplo', 'Notebook Lenovo IdeaPad 3', 'Série EX12345'],
  assunto: { chave: ['servico', 'servicos', 'status da os', 'equipamento', 'veiculo', 'comissao do servico'], acoes: ['cadastrar', 'criar', 'novo', 'colocar', 'como'], rotas: ['/cadastros/servicos', '/cadastros/veiculos'] },
  resumo: 'Cadastre os serviços com preço e comissão, os status da OS e os equipamentos dos clientes.',
  fala: 'Oi! Aqui é o Thiago, da Thiago Informática. Neste vídeo eu vou cadastrar de verdade um serviço, um status de OS e o equipamento de uma cliente. Bora lá!',
  passos: [
    {
      ir: '/cadastros/servicos',
      espera: 6000,
      titulo: 'Abra Serviços e Status',
      texto: 'No menu, clica em Cadastros, Serviços, Serviços e Status. Aqui ficam os serviços que você faz, com o preço e a comissão do técnico.',
      marcar: [{ alvo: { papel: 'button', nome: 'Serviços', exato: true }, legenda: 'Serviços' }],
    },
    {
      antes: [
        { tipo: 'preencher', alvo: { placeholder: 'Nome do serviço' }, valor: 'Limpeza interna', espera: 500 },
        { tipo: 'preencher', alvo: { placeholder: 'Preço opcional' }, valor: '80', espera: 500 },
        { tipo: 'preencher', alvo: { placeholder: 'Comissão (%)' }, valor: '10', espera: 800 },
      ],
      titulo: 'Nome, preço e comissão',
      texto: 'Digita o nome do serviço, o preço, se ele tem preço fixo, e a comissão do técnico. Depois clica em Cadastrar.',
      marcar: [
        { alvo: { placeholder: 'Nome do serviço' }, legenda: 'Serviço' },
        { alvo: { placeholder: 'Preço opcional' }, legenda: 'Preço' },
        { alvo: { placeholder: 'Comissão (%)' }, legenda: 'Comissão' },
      ],
      depois: [{ tipo: 'clicar', alvo: { papel: 'button', nome: 'Cadastrar', exato: true }, espera: 2500 }],
      dica: 'Sem preço, o valor é digitado na hora, em cada OS.',
    },
    {
      titulo: 'O serviço já está na lista',
      texto: 'Pronto, o serviço já aparece na lista com o preço. A comissão dá pra mudar aqui mesmo, direto na linha.',
      marcar: [{ alvo: { texto: 'Limpeza interna', exato: true }, legenda: 'Serviço salvo' }],
    },
    {
      antes: [
        { tipo: 'clicar', alvo: { papel: 'button', nome: 'Status', exato: true }, seguro: true, espera: 1500 },
        { tipo: 'preencher', alvo: { placeholder: 'Nome do status' }, valor: 'Aguardando aprovação', espera: 800 },
      ],
      titulo: 'Status da OS',
      texto: 'Agora clica em Status. São as etapas que a OS passa. Digita o nome, aqui Aguardando aprovação, e clica em Cadastrar.',
      marcar: [
        { alvo: { placeholder: 'Nome do status' }, legenda: 'Status novo' },
        { alvo: { papel: 'button', nome: 'Cadastrar', exato: true }, legenda: 'Cadastrar' },
      ],
      depois: [{ tipo: 'clicar', alvo: { papel: 'button', nome: 'Cadastrar', exato: true }, espera: 2500 }],
    },
    {
      titulo: 'O status já está na lista',
      texto: 'Pronto, o status novo já aparece aqui, e na OS ele já fica pra escolher.',
      marcar: [{ alvo: { texto: 'Aguardando aprovação', exato: true }, legenda: 'Status salvo' }],
    },
    {
      ir: '/cadastros/veiculos',
      espera: 5000,
      antes: [
        { tipo: 'preencher', alvo: { placeholder: /Equipamento e modelo|Marca e modelo/ }, valor: 'Notebook Lenovo IdeaPad 3', espera: 500 },
        { tipo: 'preencher', alvo: { placeholder: /Observação \(opcional\)|Placa \(opcional\)/ }, valor: 'Série EX12345', espera: 500 },
        { tipo: 'escolher', alvo: { css: 'select:has(option:text-is("Selecione o cliente"))' }, valor: 'Joana Exemplo', espera: 800 },
      ],
      titulo: 'Equipamentos dos clientes',
      texto: 'Agora os equipamentos. No menu, clica em Cadastros, Serviços, Equipamentos. Digita o equipamento e o modelo, uma observação, como o número de série, e escolhe o cliente.',
      marcar: [
        { alvo: { placeholder: /Equipamento e modelo|Marca e modelo/ }, legenda: 'Equipamento' },
        { alvo: { css: 'select:has(option:text-is("Selecione o cliente"))' }, legenda: 'Cliente' },
      ],
      dica: 'Na oficina, aqui aparece Veículo e Placa no lugar de Equipamento e Observação.',
    },
    {
      titulo: 'Clique em Cadastrar',
      texto: 'Clica em Cadastrar. Pronto: quando a Joana chegar pra abrir uma OS, o notebook dela já aparece pra escolher.',
      marcar: [{ alvo: { papel: 'button', nome: 'Cadastrar', exato: true }, legenda: 'Cadastrar' }],
      depois: [
        { tipo: 'clicar', alvo: { papel: 'button', nome: 'Cadastrar', exato: true }, espera: 2500 },
        { tipo: 'preencher', alvo: { placeholder: /^Buscar (equipamento|veículo)/ }, valor: 'Joana Exemplo', espera: 2000 },
      ],
    },
    {
      titulo: 'O equipamento já está na lista',
      texto: 'E na lista já está o notebook, ligado à cliente.',
      marcar: [{ alvo: { css: 'tbody tr:has-text("Notebook Lenovo IdeaPad 3")' }, legenda: 'Equipamento salvo' }],
    },
  ],
};
