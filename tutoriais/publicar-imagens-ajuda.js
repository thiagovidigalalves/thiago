#!/usr/bin/env node
/**
 * Sobe os prints dos passos (ajuda/img-web/<id>/passo-N.webp) para os arquivos do sistema e gera o mapa
 * usado pela Ajuda de DENTRO do sistema (Utilitários › Ajuda), pedido do dono em 20/11/2026.
 *
 * Uso: node tutoriais/publicar-imagens-ajuda.js
 *   - só sobe o que é novo ou mudou (guarda o sha de cada imagem em tutoriais/imagens-ajuda.json);
 *   - grava tutoriais/imagens-ajuda.js (mapa "img-web/..." -> link), que vai para o app em
 *     base44/shared/tutoriaisAjuda/imagens.js.
 * Rode depois de capturar prints novos (junto com o gerar-ajuda.js).
 */
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const C = require('./capturar.js');

const APP = '6a8469ea2eec118b03c63b1e';
const API = `https://base44.app/api/apps/${APP}`;
const RAIZ = path.resolve(__dirname, '..');
const PASTA = path.join(RAIZ, 'ajuda', 'img-web');
const CACHE = path.join(__dirname, 'imagens-ajuda.json');
const SAIDA = path.join(__dirname, 'imagens-ajuda.js');

function token() {
  const s = JSON.parse(fs.readFileSync(C.SESSAO, 'utf8'));
  for (const o of s.origins || []) for (const i of o.localStorage || []) if (/token/i.test(i.name) && String(i.value || '').length > 40) return String(i.value).replace(/^"|"$/g, '');
  throw new Error('Sem sessão do robô (tutoriais/.sessao.json).');
}
async function subir(arquivo, tok) {
  for (let t = 1; t <= 3; t++) {
    const fd = new FormData();
    fd.append('file', new Blob([fs.readFileSync(arquivo)], { type: 'image/webp' }), path.basename(arquivo));
    const r = await fetch(`${API}/integration-endpoints/Core/UploadFile`, { method: 'POST', headers: { Authorization: 'Bearer ' + tok }, body: fd });
    const j = await r.json().catch(() => ({}));
    if (r.ok && j.file_url) return j.file_url;
    if (t === 3) throw new Error(`Falhou ${path.basename(arquivo)}: ${r.status} ${JSON.stringify(j).slice(0, 160)}`);
    await new Promise((ok) => setTimeout(ok, 2000 * t));
  }
}

(async () => {
  const tok = token();
  const cache = fs.existsSync(CACHE) ? JSON.parse(fs.readFileSync(CACHE, 'utf8')) : {};
  const arquivos = [];
  for (const id of fs.readdirSync(PASTA).sort()) {
    const dir = path.join(PASTA, id);
    if (!fs.statSync(dir).isDirectory()) continue;
    for (const f of fs.readdirSync(dir).filter((x) => x.endsWith('.webp')).sort()) arquivos.push(`img-web/${id}/${f}`);
  }
  let novos = 0;
  for (const rel of arquivos) {
    const abs = path.join(RAIZ, 'ajuda', rel);
    const sha = crypto.createHash('sha1').update(fs.readFileSync(abs)).digest('hex');
    if (cache[rel]?.sha === sha && cache[rel]?.url) continue;
    cache[rel] = { sha, url: await subir(abs, tok) };
    novos++;
    if (novos % 20 === 0) { fs.writeFileSync(CACHE, JSON.stringify(cache, null, 1)); console.log(`   ${novos} enviadas…`); }
  }
  for (const k of Object.keys(cache)) if (!arquivos.includes(k)) delete cache[k];
  fs.writeFileSync(CACHE, JSON.stringify(cache, null, 1));
  const mapa = Object.fromEntries(Object.entries(cache).map(([k, v]) => [k, v.url]));
  fs.writeFileSync(SAIDA, '// Gerado por tutoriais/publicar-imagens-ajuda.js: print de cada passo (caminho -> link nos arquivos do sistema).\n'
    + 'export const IMAGENS_AJUDA = ' + JSON.stringify(mapa) + ';\n');
  console.log(`✅ ${arquivos.length} imagens no mapa (${novos} enviadas agora) → tutoriais/imagens-ajuda.js`);
})().catch((e) => { console.error('Erro: ' + e.message); process.exit(1); });
