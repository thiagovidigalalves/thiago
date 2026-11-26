#!/usr/bin/env node
/**
 * Publica as PROPAGANDAS (vídeos em pé, para status) em Super Admin › Vídeos do Thiaguinho, para o dono
 * mandar para os números que quiser pelo botão 📲 Enviar (ou "manda a propaganda das lojas para 34 9...").
 * Ficam `somente_admin`: só o Super Admin vê; nunca aparecem para as empresas nem na Central de Ajuda.
 *
 * Uso: node tutoriais/publicar-propaganda.js promo-loja-status [promo-whatsapp-status ...]
 */
const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');
const C = require('./capturar.js');

const RAIZ = path.resolve(__dirname, '..');
const APP = '6a8469ea2eec118b03c63b1e';
const API = `https://base44.app/api/apps/${APP}`;
const PROPAGANDAS = {
  'promo-loja-status': { titulo: 'Propaganda para lojas (status, 1 min 30 s)', palavras: ['propaganda', 'propaganda loja', 'propaganda das lojas', 'vantagens', 'status loja'] },
  'promo-whatsapp-status': { titulo: 'Propaganda das ferramentas de WhatsApp (status, 1 min)', palavras: ['propaganda whatsapp', 'propaganda do whatsapp', 'cliente que sumiu', 'avaliação', 'aniversário'] },
  'promo-autoescola-status': { titulo: 'Propaganda do TH Autoescola (status, 1 min 24 s)', palavras: ['propaganda autoescola', 'th autoescola', 'autoescola', 'propaganda da autoescola'] },
  'promo-status': { titulo: 'Propaganda do THGestor (status, 1 min)', palavras: ['propaganda', 'propaganda do sistema', 'apresentação', 'thgestor'] },
};

function token() {
  const s = JSON.parse(fs.readFileSync(C.SESSAO, 'utf8'));
  for (const o of s.origins || []) for (const i of o.localStorage || []) if (/token/i.test(i.name) && String(i.value || '').length > 40) return i.value.replace(/^"|"$/g, '');
  throw new Error('Sem sessão do robô (tutoriais/.sessao.json). Entre de novo com TUTORIAL_LINK.');
}
async function subir(arquivo, tok) {
  const fd = new FormData();
  fd.append('file', new Blob([fs.readFileSync(arquivo)]), path.basename(arquivo));
  const r = await fetch(`${API}/integration-endpoints/Core/UploadFile`, { method: 'POST', headers: { Authorization: 'Bearer ' + tok }, body: fd });
  const j = await r.json().catch(() => ({}));
  if (!r.ok || !j.file_url) throw new Error(`Falhou o envio de ${path.basename(arquivo)}: ${r.status}`);
  return j.file_url;
}
async function api(metodo, rota, tok, corpo) {
  const r = await fetch(`${API}/entities/${rota}`, { method: metodo, headers: { Authorization: 'Bearer ' + tok, 'X-App-Id': APP, 'Content-Type': 'application/json' }, body: corpo ? JSON.stringify(corpo) : undefined });
  const j = await r.json().catch(() => ({}));
  if (!r.ok) throw new Error(`${metodo} ${rota}: ${r.status}`);
  return j;
}

(async () => {
  const ids = process.argv.slice(2);
  if (!ids.length) { console.log('Uso: node tutoriais/publicar-propaganda.js <id> [...]  (ids: ' + Object.keys(PROPAGANDAS).join(', ') + ')'); process.exit(1); }
  const tok = token();
  const lista = await api('GET', 'SystemSettings?sort=-created_date&limit=1', tok);
  const cfg = (Array.isArray(lista) ? lista : lista.items || [])[0];
  let videos = cfg.videos_tutoriais || [];
  for (const id of ids) {
    const info = PROPAGANDAS[id], mp4 = path.join(RAIZ, 'ajuda', 'videos', id + '.mp4');
    if (!info || !fs.existsSync(mp4)) { console.log(`✘ ${id}: não conheço essa propaganda ou falta o vídeo`); continue; }
    // Capa: o quadro guardado pelo animar.js (.png) vira .jpg. Cópia leve em pé (720 px de largura) para o WhatsApp.
    const png = path.join(RAIZ, 'ajuda', 'videos', id + '.png'), jpg = path.join(RAIZ, 'ajuda', 'videos', id + '.jpg');
    if (fs.existsSync(png)) execFileSync('ffmpeg', ['-y', '-v', 'error', '-i', png, '-vf', 'scale=720:-2', '-q:v', '4', jpg]);
    const web = path.join(RAIZ, 'ajuda', 'videos-web', id + '.mp4');
    fs.mkdirSync(path.dirname(web), { recursive: true });
    execFileSync('ffmpeg', ['-y', '-v', 'error', '-i', mp4, '-vf', 'scale=720:-2', '-c:v', 'libx264', '-crf', '28', '-preset', 'medium', '-c:a', 'aac', '-b:a', '96k', '-movflags', '+faststart', web]);
    const item = {
      id, titulo: info.titulo, categoria: 'Propaganda', rotas: [], chave: ['propaganda'], acoes: [],
      palavras: info.palavras, video: await subir(mp4, tok), video_leve: await subir(web, tok),
      capa: fs.existsSync(jpg) ? await subir(jpg, tok) : '', somente_admin: true, propaganda: true, gerado_pelo_robo: true,
    };
    videos = [item, ...videos.filter(v => v.id !== item.id && v.id !== 'promo-' + id)];
    console.log(`✅ ${id} → Super Admin › Vídeos do Thiaguinho (só Super Admin) · leve ${(fs.statSync(web).size / 1048576).toFixed(1)} MB`);
  }
  await api('PUT', `SystemSettings/${cfg.id}`, tok, { videos_tutoriais: videos });
})().catch(e => { console.error('Erro:', e.message); process.exit(1); });
