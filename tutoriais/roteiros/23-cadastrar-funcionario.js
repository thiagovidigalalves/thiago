// Cadastrar funcionário feito DE VERDADE na Demonstração (pedido do dono, 21/11/2026 e 27/11/2026): funcionário fictício
// "Carlos Exemplo Souza", acesso por usuário e senha (sem e-mail e SEM WhatsApp: nada vai para ninguém), perfil Vendedor.
// Depois de cadastrar, edita e coloca o salário e a comissão na aba 💼 Funcionário (ela só abre depois do primeiro salvar).
module.exports = {
  id: 'cadastrar-funcionario',
  ordem: 23,
  grupo: 'Cadastros',
  titulo: 'Cadastrar funcionário, permissões, salário e comissão',
  gravaDados: true,
  valoresReais: true, // salário e comissão fictícios, coerentes do começo ao fim
  aceitarConfirmacao: true,
  manter: ['Carlos Exemplo Souza', 'carlos.exemplo', '1800', '1.800,00', 'Vendedor'],
  assunto: { chave: ['funcionario', 'usuario', 'vendedor', 'permissao', 'permissoes', 'acesso', 'login', 'senha do funcionario'], acoes: ['cadastrar', 'criar', 'novo', 'colocar', 'liberar', 'como', 'dar acesso'], rotas: ['/cadastros/usuarios'] },
  resumo: 'Crie o acesso do funcionário, escolha o que ele pode ver e fazer, e coloque o salário e a comissão.',
  fala: 'Oi! Aqui é o Thiago, da Thiago Informática. Neste vídeo eu vou cadastrar um funcionário de verdade: o acesso, as permissões, o salário e a comissão. Bora lá!',
  antesDeComecar: 'Só o administrador da empresa consegue cadastrar usuários.',
  passos: [
    {
      ir: '/cadastros/usuarios',
      espera: 6000,
      titulo: 'Abra Usuários',
      texto: 'No menu, clica em Cadastros, Pessoas, Usuários. Aqui ficam todos que usam o sistema. Pra cadastrar, é no botão Novo usuário.',
      marcar: [{ alvo: { papel: 'button', nome: 'Novo usuário' }, legenda: 'Novo usuário' }],
    },
    {
      antes: [
        { tipo: 'clicar', alvo: { papel: 'button', nome: 'Novo usuário' }, seguro: true, espera: 1800 },
        { tipo: 'escolher', alvo: { rotulo: 'Perfil de acesso', dentro: 'dialog' }, valor: '🛒 Vendedor', espera: 1000 },
      ],
      titulo: 'Escolha o perfil',
      texto: 'Clicou em Novo usuário, a primeira coisa é o Perfil de acesso. Escolhe o que a pessoa faz: vendedor, caixa, gerente, técnico. Aqui eu escolhi Vendedor, e o sistema já libera as telas certas.',
      marcar: [{ alvo: { rotulo: 'Perfil de acesso', dentro: 'dialog' }, legenda: 'Vendedor' }],
    },
    {
      antes: [
        { tipo: 'preencher', alvo: { campo: 'Nome', dentro: 'dialog' }, valor: 'Carlos Exemplo Souza', espera: 600 },
        { tipo: 'escolher', alvo: { rotulo: 'Tipo de acesso', dentro: 'dialog' }, valor: 'Por usuário e senha (sem e-mail · o admin define)', espera: 1000 },
      ],
      titulo: 'Nome e como ele vai entrar',
      texto: 'Digita o nome. Em Como o funcionário vai entrar, se ele não tem e-mail, escolhe Por usuário e senha: você mesmo cria o usuário e a senha dele.',
      marcar: [
        { alvo: { campo: 'Nome', dentro: 'dialog' }, legenda: 'Nome' },
        { alvo: { rotulo: 'Tipo de acesso', dentro: 'dialog' }, legenda: 'Usuário e senha' },
      ],
      dica: 'Escolheu "Por e-mail"? Ele recebe um convite no e-mail e cria a própria senha.',
    },
    {
      antes: [
        { tipo: 'preencher', alvo: { placeholder: 'ex.: joao.silva', dentro: 'dialog' }, valor: 'carlos.exemplo', espera: 600 },
        { tipo: 'preencher', alvo: { placeholder: 'Defina uma senha', dentro: 'dialog' }, valor: 'Exemplo@2026', espera: 800 },
      ],
      titulo: 'Usuário e senha',
      texto: 'Coloca o usuário, sem espaço, e uma senha. Logo embaixo aparece certinho como ele vai entrar no sistema.',
      marcar: [
        { alvo: { placeholder: 'ex.: joao.silva', dentro: 'dialog' }, legenda: 'Usuário' },
        { alvo: { placeholder: 'Defina uma senha', dentro: 'dialog' }, legenda: 'Senha' },
      ],
      atencao: 'Não coloque o WhatsApp de ninguém aqui só pra testar: é por ele que vai a agenda do dia.',
    },
    {
      antes: [{ tipo: 'clicar', alvo: { papel: 'tab', nome: 'Permissões', dentro: 'dialog' }, seguro: true, espera: 1500 }],
      titulo: 'Confira as permissões',
      texto: 'Agora clica na aba Permissões. Em cima ficam as telas que ele pode abrir, e embaixo o que ele pode fazer, como dar desconto ou excluir venda. Ligado pode, desligado não pode.',
      marcar: [
        { alvo: { papel: 'tab', nome: 'Permissões', dentro: 'dialog' }, legenda: 'Permissões' },
        { alvo: { papel: 'heading', nome: /O que pode fazer/, dentro: 'dialog' }, legenda: 'O que pode fazer' },
      ],
    },
    {
      titulo: 'Clique em Cadastrar',
      texto: 'Tudo certo? Clica em Cadastrar. Pronto, o funcionário já pode entrar.',
      marcar: [{ alvo: { papel: 'button', nome: 'Cadastrar', exato: true, dentro: 'dialog' }, legenda: 'Cadastrar' }],
      depois: [{ tipo: 'clicar', alvo: { papel: 'button', nome: 'Cadastrar', exato: true, dentro: 'dialog' }, aguardarFechar: true, espera: 2500 }],
    },
    {
      antes: [{ tipo: 'preencher', alvo: { placeholder: 'Buscar por nome ou e-mail' }, valor: 'Carlos Exemplo', espera: 2500 }],
      titulo: 'Ele já está na lista',
      texto: 'Olha ele aqui na lista, com o perfil Vendedor e o usuário pra entrar. Agora vamos colocar o salário e a comissão: clica no lápis de editar.',
      marcar: [{ alvo: { css: 'tr:has-text("Carlos Exemplo Souza") button[title="Editar"]' }, legenda: 'Editar' }],
      depois: [{ tipo: 'clicar', alvo: { css: 'tr:has-text("Carlos Exemplo Souza") button[title="Editar"]' }, seguro: true, espera: 2500 }],
    },
    {
      antes: [
        { tipo: 'clicar', alvo: { papel: 'tab', nome: '💼 Funcionário', dentro: 'dialog' }, seguro: true, espera: 3000 },
        { tipo: 'esperar', alvo: { texto: 'É funcionário (recebe salário pela empresa)', dentro: 'dialog' }, espera: 500 },
        { tipo: 'clicar', alvo: { css: 'label:has-text("É funcionário") input[type=checkbox]', dentro: 'dialog' }, seguro: true, espera: 1200 },
        { tipo: 'preencher', alvo: { css: 'label:has-text("Salário da carteira") input', dentro: 'dialog' }, valor: '1800', espera: 500 },
        { tipo: 'preencher', alvo: { css: 'label:has-text("Dia de pagamento") input', dentro: 'dialog' }, valor: '5', espera: 800 },
      ],
      titulo: 'Salário e dia de pagamento',
      texto: 'Na aba Funcionário, marca: É funcionário. Coloca o salário da carteira e o dia de pagamento. O salário já vai sozinho pro Contas a pagar, todo mês.',
      marcar: [
        { alvo: { texto: 'É funcionário (recebe salário pela empresa)', dentro: 'dialog' }, legenda: 'É funcionário' },
        { alvo: { css: 'label:has-text("Salário da carteira") input', dentro: 'dialog' }, legenda: 'Salário' },
        { alvo: { css: 'label:has-text("Dia de pagamento") input', dentro: 'dialog' }, legenda: 'Dia' },
      ],
    },
    {
      antes: [
        { tipo: 'preencher', alvo: { css: 'label:has-text("Comissão por produtos") input', dentro: 'dialog' }, valor: '3', espera: 600 },
        { tipo: 'clicar', alvo: { papel: 'button', nome: /Salário \+ comissão/, dentro: 'dialog' }, seguro: true, espera: 800 },
      ],
      titulo: 'Comissão',
      texto: 'Descendo um pouco, em Comissão dele: coloca a porcentagem sobre os produtos, aqui três por cento, e escolhe Salário mais comissão. A comissão soma sozinha pelas vendas dele.',
      marcar: [
        { alvo: { css: 'label:has-text("Comissão por produtos") input', dentro: 'dialog' }, legenda: '3% nos produtos' },
        { alvo: { papel: 'button', nome: /Salário \+ comissão/, dentro: 'dialog' }, legenda: 'Salário + comissão' },
      ],
    },
    {
      titulo: 'Salve',
      texto: 'Agora é só clicar em Salvar. Pronto: o Carlos já entra no sistema, aparece no menu Funcionários e o salário cai no Contas a pagar.',
      marcar: [{ alvo: { papel: 'button', nome: 'Salvar', exato: true, dentro: 'dialog' }, legenda: 'Salvar' }],
      depois: [{ tipo: 'clicar', alvo: { papel: 'button', nome: 'Salvar', exato: true, dentro: 'dialog' }, aguardarFechar: true, espera: 2500 }],
      atencao: 'Funcionário saiu da empresa? Edite o usuário e desligue "Ativo" para bloquear o acesso.',
      dica: 'Passe pra ele o usuário e a senha (veja o tutorial "Entrar como funcionário").',
    },
  ],
};
