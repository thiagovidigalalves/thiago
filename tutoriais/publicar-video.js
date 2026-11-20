#!/usr/bin/env node
/**
 * Publica um vídeo pronto no Thiaguinho (Super Admin › Vídeos do Thiaguinho), sem mexer no código do app.
 *
 * Uso: node tutoriais/publicar-video.js <id> [<id> ...]
 *   - sobe ajuda/videos/<id>.mp4 e <id>.jpg pelo envio de arquivos do próprio sistema (sessão do robô);
 *   - sobe também a cópia leve (ajuda/videos-web) para o envio no WhatsApp; --leve completa as que faltam;
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

// Termos para o Thiaguinho achar o vídeo pela pergunta. Sem `assunto` no roteiro, tira do título:
// verbos viram `acoes` e o resto (substantivos) vira `chave`.
const VERBOS = /^(cadastrar|fazer|abrir|emitir|consultar|lan[çc]ar|dar|configurar|conectar|entrar|criar|gerar|enviar|imprimir|ajustar|corrigir|inutilizar|fechar|conferir|usar|ver|receber|pagar|agradecer|editar|mudar|trocar|cobrar|baixar|importar|exportar|definir|acompanhar|vender|devolver|recuperar|esqueci|transformar)$/i;
const PARADA = new Set('o a os as um uma de do da dos das no na nos nas em e ou pra para com sem seu sua meu minha como que por pelo pela se ao aos'.split(' '));
function termos(r) {
  const a = r.assunto || {};
  if (a.chave && a.chave.length) return { chave: a.chave, acoes: a.acoes || [] };
  const ws = r.titulo.toLowerCase().replace(/[^a-zà-ÿ0-9 ]/g, ' ').split(/\s+/).filter(w => w.length >= 3 && !PARADA.has(w));
  const acoes = ws.filter(w => VERBOS.test(w));
  // Palavras que aparecem em muitos títulos (cliente, venda...) só contam se forem o único assunto.
  const COMUM = /^(clientes?|vendas?|sistema|contas?|tela|dados|dia|volta|leva|chamar|novo|nova|mail)$/;
  let chave = ws.filter(w => !VERBOS.test(w));
  if (chave.some(w => !COMUM.test(w))) chave = chave.filter(w => !COMUM.test(w));
  // Ações comuns de quem pergunta; "excluir cliente" não cai num vídeo que não ensina a excluir.
  const COMUNS = ['funciona', 'usar', 'fazer', 'faço', 'ver', 'abrir', 'configurar', 'consultar', 'lançar', 'cadastrar', 'mexer', 'ligar', 'mudar', 'criar'];
  return { chave, acoes: [...new Set([...acoes, ...COMUNS])] };
}

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
  // --remover <id>: tira o vídeo do Thiaguinho (ex.: vídeo com erro, até sair a versão corrigida).
  const remover = process.argv[2] === '--remover';
  const ids = process.argv.slice(remover ? 3 : 2);
  if (!ids.length) { console.log('Uso: node tutoriais/publicar-video.js <id> [<id> ...]'); process.exit(1); }
  const tok = token();
  const roteiros = C.carregarRoteiros([]);
  const lista = await api('GET', 'SystemSettings?sort=-created_date&limit=1', tok);
  const cfg = (Array.isArray(lista) ? lista : lista.items || [])[0];
  if (!cfg) throw new Error('SystemSettings não encontrado.');
  let videos = cfg.videos_tutoriais || [];
  if (process.argv[2] === '--termos') {
    videos = videos.map(v => { const id = String(v.id).replace(/^tut-/, ''); const r = roteiros.find(x => x.id === id); if (!r) return v; const a = r.assunto || {}; return { ...v, ...termos(r), categoria: r.grupo, rotas: a.rotas || v.rotas }; });
    await api('PUT', `SystemSettings/${cfg.id}`, tok, { videos_tutoriais: videos });
    for (const v of videos) console.log(`${v.id}: chave=${(v.chave || []).join(',')} | acoes=${(v.acoes || []).join(',')}`);
    return;
  }
  // --leve [ids]: sobe a cópia leve (ajuda/videos-web) dos vídeos já publicados, para o envio no WhatsApp.
  if (process.argv[2] === '--leve') {
    const so = process.argv.slice(3);
    for (const v of videos) {
      const id = String(v.id).replace(/^tut-/, ''), web = path.join(RAIZ, 'ajuda', 'videos-web', id + '.mp4');
      if ((so.length && !so.includes(id)) || (!so.length && v.video_leve) || !fs.existsSync(web)) continue;
      v.video_leve = await subir(web, tok);
      console.log(`✅ ${id}: leve (${(fs.statSync(web).size / 1048576).toFixed(1)} MB)`);
    }
    await api('PUT', `SystemSettings/${cfg.id}`, tok, { videos_tutoriais: videos });
    console.log(`Com cópia leve: ${videos.filter(v => v.video_leve).length} de ${videos.length}`);
    return;
  }
  if (remover) {
    videos = videos.filter(v => !ids.includes(String(v.id).replace(/^tut-/, '')));
    await api('PUT', `SystemSettings/${cfg.id}`, tok, { videos_tutoriais: videos });
    console.log(`🗑️ Removido(s) do Thiaguinho: ${ids.join(', ')} · ficam ${videos.length}`);
    return;
  }
  for (const id of ids) {
    const r = roteiros.find(x => x.id === id);
    const mp4 = path.join(RAIZ, 'ajuda', 'videos', id + '.mp4'), jpg = path.join(RAIZ, 'ajuda', 'videos', id + '.jpg');
    if (!r || !fs.existsSync(mp4)) { console.log(`✘ ${id}: falta o roteiro ou o vídeo`); continue; }
    const video = await subir(mp4, tok);
    const capa = fs.existsSync(jpg) ? await subir(jpg, tok) : '';
    // Cópia leve (1024 px, crf 30) para mandar no WhatsApp do cliente: gasta menos internet dele.
    const web = path.join(RAIZ, 'ajuda', 'videos-web', id + '.mp4');
    if (!fs.existsSync(web)) { fs.mkdirSync(path.dirname(web), { recursive: true }); require('child_process').execFileSync('ffmpeg', ['-y', '-v', 'error', '-i', mp4, '-vf', 'scale=1024:-2', '-c:v', 'libx264', '-crf', '30', '-preset', 'medium', '-c:a', 'aac', '-b:a', '96k', '-movflags', '+faststart', web]); }
    const video_leve = await subir(web, tok);
    const a = r.assunto || {};
    const item = {
      id: 'tut-' + id, titulo: r.titulo, categoria: r.grupo,
      rotas: a.rotas || [...new Set(r.passos.map(p => p.ir).filter(Boolean).map(x => x.split('?')[0]))].slice(0, 4),
      ...termos(r),
      palavras: (a.palavras || [r.titulo.toLowerCase()]).slice(0, 30),
      video, video_leve, capa, gerado_pelo_robo: true,
    };
    videos = [...videos.filter(v => v.id !== item.id), item];
    console.log(`✅ ${id} → Thiaguinho (${item.rotas.join(', ')})`);
  }
  await api('PUT', `SystemSettings/${cfg.id}`, tok, { videos_tutoriais: videos });
  console.log(`Vídeos no Thiaguinho: ${videos.length}`);
})().catch(e => { console.error('Erro: ' + e.stack); process.exit(1); });
