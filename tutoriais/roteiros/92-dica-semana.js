// Super Admin › Suporte › Dica da semana (/admin/dica-semana). Vídeo SÓ do Super Admin (somente_admin).
// A lista tem empresas de clientes de verdade: nomes viram fictícios e a lista, os números e os envios ficam desfocados.
// O robô NÃO clica em Salvar, "Teste no meu WhatsApp" nem "Enviar agora" (só marca); a prévia é a da Demonstração.
module.exports = {
  id: 'dica-semana',
  ordem: 92,
  grupo: 'Super Admin',
  titulo: 'Dica da semana no WhatsApp',
  somente_admin: true,
  superAdmin: true,
  borrar: 'div.divide-y span[class*="text-[11px]"], div.divide-y b.truncate, table tbody td, section p[class*="text-[11px]"]',
  assunto: { chave: ['dica da semana', 'dica', 'dicas'], acoes: ['configurar', 'ligar', 'usar', 'funciona', 'como', 'mandar'], rotas: ['/admin/dica-semana'] },
  resumo: 'Uma dica curta do THGestor com o vídeo, toda semana, no WhatsApp das empresas que você marcar.',
  fala: 'Oi! Aqui é o Thiago. Neste vídeo eu vou te mostrar a Dica da semana: uma dica curta do sistema, com o vídeo, que chega no WhatsApp das empresas toda semana. Bora lá!',
  passos: [
    {
      ir: '/admin/dica-semana',
      espera: 6000,
      titulo: 'Abra a Dica da semana',
      texto: 'No Super Admin, vai em Suporte, Dica da semana. Aqui em cima você liga ou desliga o envio.',
      marcar: [{ alvo: { css: 'label.rounded-2xl:has(input[type="checkbox"])' }, legenda: 'Liga e desliga' }],
    },
    {
      titulo: 'Dia e hora',
      texto: 'Escolhe o dia da semana e a partir de que hora. As dicas saem aos poucos, com intervalo, pra não bloquear o WhatsApp. E dá pra mandar o vídeo junto.',
      marcar: [
        { alvo: { css: 'label:has-text("Dia") select' }, legenda: 'Dia' },
        { alvo: { css: 'label:has-text("A partir de") select' }, legenda: 'Hora' },
        { alvo: { texto: /Mandar o vídeo junto/ }, legenda: 'Vídeo junto' },
      ],
    },
    {
      titulo: 'Quem recebe',
      texto: 'Em Quem recebe, você marca as empresas. Cada uma recebe um vídeo que ainda não viu, do segmento dela.',
      marcar: [{ alvo: { placeholder: 'Buscar empresa' }, legenda: 'Marque as empresas' }],
    },
    {
      antes: [
        { tipo: 'preencher', alvo: { placeholder: 'Buscar empresa' }, valor: 'TH Gestor', espera: 1200 },
        { tipo: 'clicar', alvo: { papel: 'button', nome: 'Ver prévia', exato: true }, seguro: true, espera: 4000 },
      ],
      titulo: 'Como chega no WhatsApp',
      texto: 'Clicando em Ver prévia, aparece do lado como a mensagem chega no WhatsApp. Antes de liberar, use o Teste no meu WhatsApp pra ver no seu celular.',
      marcar: [
        { alvo: { texto: 'Como chega no WhatsApp', exato: true }, legenda: 'Prévia' },
        { alvo: { papel: 'button', nome: 'Teste no meu WhatsApp' }, legenda: 'Teste' },
      ],
    },
    {
      titulo: 'Os textos das dicas',
      texto: 'E em Textos das dicas, cada vídeo tem uma frase curta. Deixando vazio, vai o texto padrão. Depois de mudar, é só salvar.',
      marcar: [
        { alvo: { texto: 'Textos das dicas', exato: true }, legenda: 'Uma frase por vídeo' },
        { alvo: { papel: 'button', nome: 'Salvar textos' }, legenda: 'Salvar' },
      ],
    },
  ],
};
