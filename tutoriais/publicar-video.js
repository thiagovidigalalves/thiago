#!/usr/bin/env node
/**
 * Publica um vídeo pronto no Thiaguinho (Super Admin › Vídeos do Thiaguinho), sem mexer no código do app.
 *
 * Uso: node tutoriais/publicar-video.js <id> [<id> ...]
 *   - sobe ajuda/videos/<id>.mp4 e <id>.jpg pelo envio de arquivos do próprio sistema (sessão do robô);
 *   - grava/atualiza o item em SystemSettings.videos_tutoriais: titulo, rotas, chave, acoes, palavras, video, capa.
 * Os termos que o Thiaguinho usa para achar o vídeo vêm do roteiro (`assunto: { chave, acoes, palavras }`).
 * Pedido do dono: todo vídeo novo vai automático para o Thiaguinho (e a Central de Ajuda é republicada à parte).
 */
const fs = require('fs');
const path = require('path');
const C = require('./capturar.js');

const APP = '6a8469ea2eec118b03c63b1e';
const API = `https://base44.app/api/apps/${APP}`;
const RAIZ = path.resolve(__dirname, '..');

function token() {
  const s = JSON.parse(fs.readFileSync(C.SESSAO, 'utf8'));
  for (const o of s.origins || []) for (const i of o.localStorage || []) if (/token/i.test(i.name) && i.value.length > 40) return i.value.replace(/^"|"$/g, '');
  throw new Error('Sem sessão do robô (tutoriais/.sessao.json). Entre de novo com TUTORIAL_LINK.');
}

async function subir(arquivo, tok) {
  const fd = new FormData();
  fd.append('file', new Blob([fs.readFileSync(arquivo)]), path.basename(arquivo));
  const r = await fetch(`${API}/integration-endpoints/Core/UploadFile`, { method: 'POST', headers: { Authorization: 'Bearer ' + tok }, body: fd });
  const j = await r.json().catch(() => ({}));
  if (!r.ok || !j.file_url) throw new Error(`Falhou o envio de ${path.basename(arquivo)}: ${r.status} ${JSON.stringify(j).slice(0, 200)}`);
  return j.file_url;
}

async function api(metodo, rota, tok, corpo) {
  const r = await fetch(`${API}/entities/${rota}`, { method: metodo, headers: { Authorization: 'Bearer ' + tok, 'X-App-Id': APP, 'Content-Type': 'application/json' }, body: corpo ? JSON.stringify(corpo) : undefined });
  const j = await r.json().catch(() => ({}));
  if (!r.ok) throw new Error(`${metodo} ${rota}: ${r.status} ${JSON.stringify(j).slice(0, 200)}`);
  return j;
}

(async () => {
  const ids = process.argv.slice(2);
  if (!ids.length) { console.log('Uso: node tutoriais/publicar-video.js <id> [<id> ...]'); process.exit(1); }
  const tok = token();
  const roteiros = C.carregarRoteiros();
  const lista = await api('GET', 'SystemSettings?sort=-created_date&limit=1', tok);
  const cfg = (Array.isArray(lista) ? lista : lista.items || [])[0];
  if (!cfg) throw new Error('SystemSettings não encontrado.');
  let videos = cfg.videos_tutoriais || [];
  for (const id of ids) {
    const r = roteiros.find(x => x.id === id);
    const mp4 = path.join(RAIZ, 'ajuda', 'videos', id + '.mp4'), jpg = path.join(RAIZ, 'ajuda', 'videos', id + '.jpg');
    if (!r || !fs.existsSync(mp4)) { console.log(`✘ ${id}: falta o roteiro ou o vídeo`); continue; }
    const video = await subir(mp4, tok);
    const capa = fs.existsSync(jpg) ? await subir(jpg, tok) : '';
    const a = r.assunto || {};
    const item = {
      id: 'tut-' + id, titulo: r.titulo, categoria: r.grupo,
      rotas: a.rotas || [...new Set(r.passos.map(p => p.ir).filter(Boolean).map(x => x.split('?')[0]))].slice(0, 4),
      chave: a.chave || [], acoes: a.acoes || [],
      palavras: (a.palavras || [r.titulo.toLowerCase()]).slice(0, 30),
      video, capa, gerado_pelo_robo: true,
    };
    videos = [...videos.filter(v => v.id !== item.id), item];
    console.log(`✅ ${id} → Thiaguinho (${item.rotas.join(', ')})`);
  }
  await api('PUT', `SystemSettings/${cfg.id}`, tok, { videos_tutoriais: videos });
  console.log(`Vídeos no Thiaguinho: ${videos.length}`);
})().catch(e => { console.error('Erro: ' + e.message); process.exit(1); });
