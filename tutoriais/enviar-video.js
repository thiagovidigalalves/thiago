#!/usr/bin/env node
/**
 * Envia um vídeo tutorial para o WhatsApp de um cliente, pelo número do suporte (Super Admin / Thiago Informática).
 * Uso (só quando o dono pedir, com o número que ele passar):
 *   node tutoriais/enviar-video.js <id-do-video> <telefone com DDD> ["Nome do cliente"]
 * Ex.: node tutoriais/enviar-video.js grade-de-produtos 34999990000 "Maria"
 * Por enquanto vai só o link (pedido do dono); o arquivo do vídeo vai junto se a chave
 * "Mandar o arquivo do vídeo junto" (SystemSettings.videos_whatsapp_com_arquivo) estiver ligada.
 * Mensagem: "Oi, Maria! Segue o vídeo ... <link curto /v/<id>> ... é só chamar no grupo de suporte."
 */
const fs = require('fs');
const C = require('./capturar.js');
const APP = '6a8469ea2eec118b03c63b1e', API = `https://base44.app/api/apps/${APP}`;
const ORIGEM = 'https://thgestor.thiagoinformatica.com.br'; // mesmo PUBLIC_APP_ORIGIN do app

function token() {
  const s = JSON.parse(fs.readFileSync(C.SESSAO, 'utf8'));
  for (const o of s.origins || []) for (const i of o.localStorage || []) if (/token/i.test(i.name) && String(i.value || '').length > 40) return i.value.replace(/^"|"$/g, '');
  throw new Error('Sem sessão do robô (tutoriais/.sessao.json).');
}
(async () => {
  const [id, tel, nome = ''] = process.argv.slice(2);
  if (!id || !tel) { console.log('Uso: node tutoriais/enviar-video.js <id> <telefone> ["Nome"]'); process.exit(1); }
  const tok = token(), h = { Authorization: 'Bearer ' + tok, 'X-App-Id': APP, 'Content-Type': 'application/json' };
  const ss = (await (await fetch(`${API}/entities/SystemSettings?limit=1`, { headers: h })).json())[0] || {};
  const v = (ss.videos_tutoriais || []).find(x => [id, 'tut-' + id].includes(x.id));
  if (!v) throw new Error(`Vídeo "${id}" não está publicado no Thiaguinho.`);
  let numero = String(tel).replace(/\D/g, ''); if (numero.length <= 11) numero = '55' + numero;
  const link = `${ORIGEM}/v/${id.replace(/^tut-/, '')}`;
  const primeiro = String(nome).trim().split(/\s+/)[0];
  const texto = [`Olá${primeiro ? ', ' + primeiro : ''}! 👋`, '', 'Separei um vídeo rapidinho pra te ajudar:', `🎬 *${v.titulo}*`, '', 'Qualquer dúvida, é só chamar no grupo de suporte. 😉', '_Thiago Informática_ 💙', '', link].join('\n');
  const empresa = ss.whatsapp_admin_sessao_empresa || ss.whatsapp_admin_empresa;
  const r = await fetch(`${API}/functions/whatsappApi`, { method: 'POST', headers: h, body: JSON.stringify({ action: 'enviar', company_id: empresa, numero, texto, ...(ss.videos_whatsapp_com_arquivo ? { video: v.video_leve || v.video, capa: v.capa_mini } : {}), origem: 'Vídeo tutorial (suporte)', tipo: 'suporte', cliente: nome }) });
  const d = await r.json().catch(() => ({}));
  if (d.enviado) console.log(`✅ Enviado para ${numero}: ${v.titulo} (${link})`);
  else console.log(`✘ Não enviou pelo sistema (${r.status} ${d.error || (d.habilitado === false ? 'WhatsApp do sistema desligado' : '')}). Link para mandar na mão: ${link}`);
})().catch(e => { console.error('Erro: ' + e.message); process.exit(1); });
