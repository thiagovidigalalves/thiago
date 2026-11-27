// Funcionários: comissão automática feita DE VERDADE na Demonstração (pedido do dono, 27/11/2026). A regra da comissão
// agora fica no cadastro de cada funcionário (Cadastros › Usuários › aba 💼 Funcionário), não mais em Configurações.
// O robô edita a Mayara (fictícia), coloca 3% nos produtos e 10% nos serviços, escolhe "Salário + comissão" e
// "Quando vende", SALVA e mostra o quadro da comissão no Painel.
module.exports = {
  id: 'funcionarios-comissao',
  ordem: 48.3,
  grupo: 'Funcionários',
  titulo: 'Funcionários: comissão automática',
  gravaDados: true,
  valoresReais: true, // valores da Demonstração (fictícios e coerentes): não inventa outros
  manter: ['Mayara', 'JOAO PAULO', 'Jonathan', 'Rafael Arantes', 'Rafael'],
  assunto: { chave: ['comissao', 'comissoes', 'funcionario', 'vendedor', 'tecnico', 'meta'], acoes: ['funciona', 'calcular', 'pagar', 'ver', 'como', 'automatica', 'colocar', 'cadastrar'], rotas: ['/funcionarios', '/cadastros/usuarios'] },
  resumo: 'Coloque a comissão no cadastro do funcionário: ela soma sozinha pelas vendas e OS e cai no Contas a pagar.',
  fala: 'Oi! Aqui é o Thiago, da Thiago Informática. Neste vídeo eu vou colocar a comissão de um funcionário de verdade, e te mostrar como ela soma sozinha, sem você calcular nada. Bora lá!',
  passos: [
    {
      ir: '/cadastros/usuarios',
      espera: 6000,
      antes: [{ tipo: 'preencher', alvo: { placeholder: 'Buscar por nome ou e-mail' }, valor: 'Mayara', espera: 2500 }],
      titulo: 'Abra o cadastro do funcionário',
      texto: 'No menu, clica em Cadastros, Pessoas, Usuários. Busca o funcionário e clica no lápis de editar. Aqui eu vou usar a Mayara.',
      marcar: [{ alvo: { css: 'tr:has-text("Mayara") button[title="Editar"]' }, legenda: 'Editar' }],
      depois: [{ tipo: 'clicar', alvo: { css: 'tr:has-text("Mayara") button[title="Editar"]' }, seguro: true, espera: 2500 }],
    },
    {
      antes: [
        { tipo: 'clicar', alvo: { papel: 'tab', nome: '💼 Funcionário', dentro: 'dialog' }, seguro: true, espera: 3000 },
        { tipo: 'esperar', alvo: { texto: /💰 Comissão dele/, dentro: 'dialog' }, espera: 500 },
      ],
      titulo: 'Aba Funcionário: Comissão dele',
      texto: 'Clica na aba Funcionário e desce até Comissão dele. Primeiro escolhe como ele recebe: Salário mais comissão, ou o Salário é o mínimo, e a comissão só entra no que passar do salário.',
      marcar: [
        { alvo: { papel: 'button', nome: /Salário \+ comissão/, dentro: 'dialog' }, legenda: 'Salário + comissão' },
        { alvo: { papel: 'button', nome: /Salário é o mínimo/, dentro: 'dialog' }, legenda: 'Salário é o mínimo' },
      ],
      depois: [{ tipo: 'clicar', alvo: { papel: 'button', nome: /Salário \+ comissão/, dentro: 'dialog' }, seguro: true, espera: 800 }],
    },
    {
      antes: [{ tipo: 'clicar', alvo: { papel: 'button', nome: /Quando vende/, dentro: 'dialog' }, seguro: true, espera: 800 }],
      titulo: 'Quando a comissão conta',
      texto: 'Depois, quando a comissão conta: quando vende, quando a OS é entregue, ou só quando o cliente paga. Aqui eu deixei Quando vende.',
      marcar: [
        { alvo: { papel: 'button', nome: /Quando vende/, dentro: 'dialog' }, legenda: 'Quando vende' },
        { alvo: { papel: 'button', nome: /Quando o cliente paga/, dentro: 'dialog' }, legenda: 'Quando paga' },
      ],
    },
    {
      antes: [
        { tipo: 'preencher', alvo: { css: 'label:has-text("Comissão por serviços") input', dentro: 'dialog' }, valor: '10', espera: 500 },
        { tipo: 'preencher', alvo: { css: 'label:has-text("Comissão por produtos") input', dentro: 'dialog' }, valor: '3', espera: 800 },
      ],
      titulo: 'A porcentagem',
      texto: 'Agora a porcentagem: sobre os serviços, aqui dez por cento, e sobre os produtos, três por cento. Se quiser, coloca uma meta: passou de tanto, ganha mais.',
      marcar: [
        { alvo: { css: 'label:has-text("Comissão por serviços") input', dentro: 'dialog' }, legenda: 'Serviços 10%' },
        { alvo: { css: 'label:has-text("Comissão por produtos") input', dentro: 'dialog' }, legenda: 'Produtos 3%' },
      ],
    },
    {
      titulo: 'Só ganha se bater a meta',
      texto: 'E tem a opção: Só ganha comissão se bater a meta. Marcou, quem não bater a meta do mês recebe só o salário.',
      marcar: [{ alvo: { texto: 'Só ganha comissão se bater a meta', dentro: 'dialog' }, legenda: 'Opção da meta' }],
    },
    {
      titulo: 'Salve',
      texto: 'Clica em Salvar. Pronto, a comissão dele já está valendo.',
      marcar: [{ alvo: { papel: 'button', nome: 'Salvar', exato: true, dentro: 'dialog' }, legenda: 'Salvar' }],
      depois: [{ tipo: 'clicar', alvo: { papel: 'button', nome: 'Salvar', exato: true, dentro: 'dialog' }, aguardarFechar: true, espera: 3000 }],
    },
    {
      ir: '/funcionarios',
      espera: 7000,
      antes: [{ tipo: 'clicar', alvo: { papel: 'button', nome: 'Próximo pagamento', exato: true }, seguro: true, espera: 4000 }],
      titulo: 'Comissão do mês até agora',
      texto: 'Agora no menu, Funcionários, Painel. No cartão de cada um, esse quadro verde é a comissão do mês até agora. Ela soma sozinha pelas vendas e pelas ordens de serviço.',
      marcar: [{ alvo: { texto: /Comissão de .* até agora/ }, legenda: 'Soma sozinha' }],
    },
    {
      titulo: 'Fecha sozinha no fim do mês',
      texto: 'No fim do mês ela fecha sozinha e cai no Contas a pagar, no plano Comissões, vencendo no dia do pagamento. Se uma venda for cancelada depois, vira um ajuste no mês seguinte.',
      marcar: [{ alvo: { texto: /entra no dia 1º/ }, legenda: 'Entra no Contas a pagar' }],
    },
  ],
};
