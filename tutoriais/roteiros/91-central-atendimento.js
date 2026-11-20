// Central de Atendimento (/atendimento), Super Admin. Vídeo SÓ do Super Admin (somente_admin).
// São grupos REAIS de clientes: o robô NUNCA clica em Atender, Transferir, Finalizar, IA, enviar, áudio, 📎, 🎬 ou ↩,
// não digita na conversa e só abre conversa RESOLVIDA (abrir uma com mensagem nova zeraria o "não lidas").
// Nomes viram fictícios (lista de nomes do suporte); o texto das conversas e o painel da empresa ficam desfocados (`borrar`).
const CONVERSA = 'main p.whitespace-pre-wrap, main p.italic, main p.my-2 span, main p.mx-auto b, section span.truncate[class*="text-[13px]"], main aside';
module.exports = {
  id: 'central-atendimento',
  ordem: 91,
  grupo: 'Super Admin',
  titulo: 'Central de Atendimento',
  somente_admin: true,
  superAdmin: true,
  borrar: CONVERSA,
  assunto: { chave: ['central de atendimento', 'atendimento', 'atender', 'fila', 'etiqueta', 'transferir'], acoes: ['usar', 'funciona', 'atender', 'abrir', 'como'], rotas: ['/atendimento'] },
  resumo: 'As conversas dos grupos de suporte num lugar só: fila da IA, atender, etiquetas, dados da empresa e relatórios.',
  fala: 'Oi! Aqui é o Thiago. Neste vídeo eu vou te mostrar a Central de Atendimento, onde ficam as conversas dos grupos de suporte, igual um WhatsApp, só que com a IA ajudando. Bora lá!',
  passos: [
    {
      ir: '/atendimento',
      espera: 6000,
      titulo: 'Abra a Central de Atendimento',
      texto: 'Em Super Admin, Suporte em grupos, clica em Abrir a Central de Atendimento. Do lado esquerdo ficam as conversas, e aqui em cima a busca por grupo, empresa ou mensagem.',
      marcar: [{ alvo: { placeholder: 'Buscar grupo, empresa ou mensagem' }, legenda: 'Busca' }],
    },
    {
      titulo: 'Fila, Aguardando, Atendendo e Resolvidos',
      texto: 'Na Fila IA estão as conversas que o Thiaguinho está cuidando. Aguardando é quem precisa de gente, Atendendo é o que já está com alguém, e Resolvidos é o que já terminou.',
      marcar: [
        { alvo: { papel: 'button', nome: /Fila IA/ }, legenda: 'IA cuidando' },
        { alvo: { papel: 'button', nome: /Aguardando/ }, legenda: 'Precisa de gente' },
        { alvo: { papel: 'button', nome: /Atendendo/ }, legenda: 'Com atendente' },
        { alvo: { papel: 'button', nome: /Resolvidos/ }, legenda: 'Terminou' },
      ],
    },
    {
      antes: [
        { tipo: 'clicar', alvo: { papel: 'button', nome: /Resolvidos/ }, seguro: true, espera: 3000 },
        { tipo: 'clicar', alvo: { css: 'section .overflow-y-auto > button' }, seguro: true, espera: 4000 },
      ],
      titulo: 'A conversa',
      texto: 'Clicando numa conversa, ela abre do lado, igual no WhatsApp. Numa conversa aberta aparecem em cima os botões Atender, que manda a sua apresentação no grupo e a IA para de responder, Transferir e Finalizar.',
      marcar: [{ alvo: { css: 'main header' }, legenda: 'Atender, Transferir, Finalizar' }],
    },
    {
      titulo: 'Etiquetas',
      texto: 'Aqui embaixo do nome ficam as etiquetas: um clique marca a conversa, pra achar depois e aparecer nos relatórios.',
      marcar: [{ alvo: { css: 'main button[title^="Marcar com"]' }, legenda: 'Etiquetas' }],
    },
    {
      titulo: 'Responder, nota interna e vídeo',
      texto: 'Embaixo você escreve a resposta. Digitando barra, aparecem as respostas rápidas. O botão amarelo é a nota interna, que o cliente não vê, e o da claquete manda um vídeo tutorial.',
      marcar: [
        { alvo: { css: 'main textarea' }, legenda: 'Resposta ( / = rápidas)' },
        { alvo: { css: 'main button[title="Nota interna (o cliente não vê)"]' }, legenda: 'Nota interna' },
        { alvo: { css: 'main button[title="Vídeo tutorial"]' }, legenda: 'Vídeo' },
      ],
    },
    {
      titulo: 'Dados da empresa',
      texto: 'Do lado direito aparecem os dados da empresa no sistema: a mensalidade, os módulos e o que ela anda usando, pra você atender já sabendo quem é. No celular, é o botão de informação.',
      marcar: [{ alvo: { css: 'main aside' }, legenda: 'Dados da empresa' }],
    },
    {
      antes: [{ tipo: 'clicar', alvo: { css: 'nav button[aria-label="Grupos"]' }, seguro: true, espera: 3500 }],
      titulo: 'Grupos',
      texto: 'No ícone de pessoas ficam só os grupos ligados no suporte. Clicando num grupo, aparecem os atendimentos dele.',
      marcar: [{ alvo: { placeholder: 'Buscar grupo ou empresa' }, legenda: 'Grupos ligados' }],
    },
    {
      antes: [{ tipo: 'clicar', alvo: { css: 'nav button[aria-label="Relatórios"]' }, seguro: true, espera: 5000 }],
      titulo: 'Relatórios',
      texto: 'E nos Relatórios você vê os tempos de resposta, quem atendeu, quanto a IA resolveu sozinha e os assuntos, em sete, trinta ou noventa dias. As mensagens prontas e a pesquisa de satisfação se configuram em Suporte em grupos.',
      marcar: [{ alvo: { papel: 'button', nome: '30 dias', exato: true }, legenda: '7, 30 ou 90 dias' }],
    },
  ],
};
