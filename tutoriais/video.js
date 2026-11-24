#!/usr/bin/env node
/**
 * VÍDEOS DOS TUTORIAIS — o robô faz o tutorial no sistema enquanto grava a tela, com:
 *  - abertura com a logo e o nome do tutorial, encerramento "Pronto!";
 *  - mouse animado indo até cada botão, clique com som, bolinha vermelha aparecendo;
 *  - legenda embaixo com o passo e o texto;
 *  - narração com voz do ElevenLabs (texto do próprio roteiro) + efeitos (clique, transição) e música de fundo.
 *
 * Uso:   node tutoriais/video.js cadastrar-cliente [outro-id ...]
 * Saída: ajuda/videos/<id>.mp4 (+ <id>.jpg de capa)
 *
 * Variáveis:
 *   ELEVENLABS_VOZ      id da voz no ElevenLabs (padrão abaixo). A chave vai como "network secret" do ambiente
 *                       (host api.elevenlabs.io, header xi-api-key): o proxy coloca a chave, o código nunca a vê.
 *   ELEVENLABS_MODELO   padrão eleven_multilingual_v2
 *   TUTORIAL_SEM_VOZ=1  gera o vídeo sem narração (só legenda e efeitos), para testar.
 *   TUTORIAL_VER_EMPRESA, TUTORIAL_URL: iguais ao capturar.js (usa a mesma sessão salva).
 *
 * Privacidade: o desfoque roda ANTES de cada quadro (a cada mudança da tela) e a tela fica coberta
 * enquanto carrega. Mesmo assim, revise o vídeo antes de publicar (veja conferir-video no CLAUDE.md).
 */
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const { execFileSync } = require('child_process');
const { chromium } = require('playwright');
const C = require('./capturar.js');

const RAIZ = path.resolve(__dirname, '..');
const SAIDA = path.join(RAIZ, 'ajuda', 'videos');
const CACHE = path.join(__dirname, '.cache-audio');
const SONS = path.join(__dirname, 'audio');
const W = 1366, H = 768;

const duracao = f => Number(execFileSync('ffprobe', ['-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', f]).toString().trim()) || 0;
const espera = ms => new Promise(r => setTimeout(r, ms));

const { falar } = require('./video-voz.js');

/** Efeitos sonoros. Usa os arquivos de tutoriais/audio/ se existirem (ex.: gerados no ElevenLabs); senão cria simples. */
function sons() {
  fs.mkdirSync(SONS, { recursive: true });
  const clique = path.join(SONS, 'clique.mp3'), transicao = path.join(SONS, 'transicao.mp3');
  if (!fs.existsSync(clique)) execFileSync('ffmpeg', ['-y', '-v', 'error', '-f', 'lavfi', '-i', 'sine=frequency=1800:duration=0.05', '-af', 'afade=t=out:st=0.01:d=0.04,volume=0.6', clique]);
  if (!fs.existsSync(transicao)) execFileSync('ffmpeg', ['-y', '-v', 'error', '-f', 'lavfi', '-i', 'anoisesrc=d=0.55:c=pink:a=0.25', '-af', 'highpass=f=400,lowpass=f=3500,afade=t=in:d=0.25,afade=t=out:st=0.3:d=0.25', transicao]);
  // Pedido do dono: nada de "assovio" (whoosh). Troca de tela com um toque de clique suave.
  const toque = path.join(SONS, 'toque.mp3'); const transicaoBonita = fs.existsSync(toque) ? toque : transicao;
  const musica = ['musica.mp3', 'musica.wav'].map(f => path.join(SONS, f)).find(f => fs.existsSync(f)) || null;
  return { clique, transicao: transicaoBonita, musica };
}

/** Script que roda em toda página: cortina, legenda, cursor e desfoque antes de cada quadro. */
function scriptDaPagina(logoDataUri) {
  const extras = C.lerExtrasPrivacidade();
  return `
  (() => {
    window.__desfocar = ${C.desfocarNaPagina.toString()};
    window.__desfArgs = { extras: ${JSON.stringify(extras)}, tudo: true, campos: true, fantasia: ${process.env.TUTORIAL_FANTASIA !== '0'} }; // começa no modo mais rígido
    const css = \`
      #__cortina{position:fixed;inset:0;pointer-events:none;z-index:2147483646;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:18px;
        background:radial-gradient(circle at 30% 20%,#1c3a96,#0c1f5c 60%,#081440);color:#fff;font:600 22px/1.3 system-ui,sans-serif;transition:opacity .35s}
      #__cortina img{height:130px;filter:drop-shadow(0 6px 18px rgba(0,0,0,.35))}
      #__cortina b{font:800 40px/1.15 system-ui,sans-serif;max-width:900px;text-align:center}
      #__cortina span{opacity:.8;font-weight:500;max-width:820px;text-align:center}
      #__cortina.saindo{opacity:0}
      #__cortina:not(.saindo) ~ #__cursor{opacity:0}
      #__legenda{position:fixed;left:50%;bottom:22px;transform:translateX(-50%);z-index:2147483645;display:flex;gap:14px;align-items:flex-start;
        width:min(1100px,92vw);background:rgba(10,18,45,.92);color:#fff;border-radius:16px;padding:14px 18px;box-shadow:0 10px 30px rgba(0,0,0,.35);
        font:500 18px/1.4 system-ui,sans-serif;transition:opacity .3s,transform .3s}
      #__legenda.oculta{opacity:0;transform:translate(-50%,20px)}
      #__legenda.topo{bottom:auto;top:22px}
      #__legenda .n{flex:0 0 auto;width:38px;height:38px;border-radius:50%;background:#ef4444;color:#fff;font:800 19px/38px system-ui;text-align:center;border:3px solid #fff}
      #__legenda b{display:block;font-size:20px;margin-bottom:2px}
      #__cursor{position:fixed;z-index:2147483647;width:30px;height:30px;pointer-events:none;transition:left .9s cubic-bezier(.4,0,.2,1),top .9s cubic-bezier(.4,0,.2,1);filter:drop-shadow(0 2px 3px rgba(0,0,0,.45))}
      .__onda{position:fixed;z-index:2147483647;width:16px;height:16px;margin:-8px 0 0 -8px;border-radius:50%;border:3px solid #ef4444;pointer-events:none;animation:__onda .55s ease-out forwards}
      @keyframes __onda{to{transform:scale(4);opacity:0}}
      #__tutorial_marcas > *{animation:__pop .35s cubic-bezier(.3,1.6,.5,1)}
      @keyframes __pop{from{transform:scale(.6);opacity:0}}
    \`;
    let pend = false, livreEm = 0;
    // Tela pesada (milhares de linhas): se uma passada demora, espera antes da próxima (não trava a página).
    const tick = () => { pend = false; const t0 = performance.now(); if (t0 < livreEm) return; try {
      window.__desfocar(window.__desfArgs);
      // Esconde a faixa de Super Admin.
      const w = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
      for (let n; (n = w.nextNode());) { if (!/Modo superadmin/i.test(n.textContent)) continue; let el = n.parentElement;
        while (el.parentElement && el.parentElement !== document.body && el.parentElement.getBoundingClientRect().height < 140) el = el.parentElement;
        el.style.setProperty('display','none','important'); }
    } catch (e) {} const d = performance.now() - t0; livreEm = d > 40 ? performance.now() + d * 6 : 0; };
    // MutationObserver roda antes da tela ser pintada: o dado novo já aparece desfocado.
    new MutationObserver(() => { if (!pend) { pend = true; queueMicrotask(tick); } })
      .observe(document, { childList: true, subtree: true, characterData: true });
    setInterval(tick, 200); // campos preenchidos (o valor do input não gera mutação)
    const montar = () => {
      if (!document.body || document.getElementById('__cortina')) return;
      const st = document.createElement('style'); st.textContent = css; document.head.appendChild(st);
      const c = document.createElement('div'); c.id = '__cortina';
      c.innerHTML = '${logoDataUri ? `<img src="${logoDataUri}" alt="">` : ''}<b id="__cortina_t">Central de Ajuda</b><span id="__cortina_s"></span>';
      const t = sessionStorage.getItem('__cortina_t'); if (t) { c.querySelector('#__cortina_t').textContent = t; c.querySelector('#__cortina_s').textContent = sessionStorage.getItem('__cortina_s') || ''; }
      document.body.appendChild(c);
      const cur = document.createElement('div'); cur.id = '__cursor';
      cur.innerHTML = '<svg viewBox="0 0 24 24" width="30" height="30"><path d="M4 2l16 9-7 2-3 7z" fill="#fff" stroke="#111" stroke-width="1.6" stroke-linejoin="round"/></svg>';
      cur.style.left = (sessionStorage.getItem('__cx') || ${W / 2}) + 'px'; cur.style.top = (sessionStorage.getItem('__cy') || ${H / 2}) + 'px';
      document.body.appendChild(cur);
      const l = document.createElement('div'); l.id = '__legenda'; l.className = 'oculta'; l.innerHTML = '<div class="n"></div><div><b></b><span></span></div>';
      document.body.appendChild(l);
      tick();
    };
    if (document.body) montar(); else document.addEventListener('DOMContentLoaded', montar);
    new MutationObserver(montar).observe(document.documentElement, { childList: true });
  })();`;
}

async function cortina(page, mostrar, titulo, sub) {
  await page.evaluate(([mostrar, titulo, sub]) => {
    if (titulo !== undefined) { sessionStorage.setItem('__cortina_t', titulo); sessionStorage.setItem('__cortina_s', sub || ''); }
    const c = document.getElementById('__cortina'); if (!c) return;
    if (titulo !== undefined) { c.querySelector('#__cortina_t').textContent = titulo; c.querySelector('#__cortina_s').textContent = sub || ''; }
    c.style.display = 'flex'; requestAnimationFrame(() => c.classList.toggle('saindo', !mostrar));
    if (!mostrar) setTimeout(() => { if (c.classList.contains('saindo')) c.style.display = 'none'; }, 400);
  }, [mostrar, titulo, sub]).catch(() => {});
  await espera(420);
}

async function legenda(page, n, titulo, texto) {
  await page.evaluate(([n, titulo, texto]) => {
    const l = document.getElementById('__legenda'); if (!l) return;
    if (!titulo) { l.classList.add('oculta'); return; }
    l.querySelector('.n').textContent = n; l.querySelector('.n').style.display = n ? 'block' : 'none';
    l.querySelector('b').textContent = titulo; l.querySelector('span').textContent = texto || '';
    l.classList.remove('oculta');
  }, [n, titulo, texto]).catch(() => {});
}

async function moverCursor(page, x, y) {
  await page.evaluate(([x, y]) => { const c = document.getElementById('__cursor'); if (c) { c.style.left = x + 'px'; c.style.top = y + 'px'; } sessionStorage.setItem('__cx', x); sessionStorage.setItem('__cy', y); }, [x, y]).catch(() => {});
  await espera(700);
}

async function onda(page) {
  await page.evaluate(() => { const c = document.getElementById('__cursor'); if (!c) return; const o = document.createElement('div'); o.className = '__onda'; o.style.left = (parseFloat(c.style.left) + 4) + 'px'; o.style.top = (parseFloat(c.style.top) + 3) + 'px'; document.body.appendChild(o); setTimeout(() => o.remove(), 600); }).catch(() => {});
}

/** Tira as marcações sem tirar o desfoque (no vídeo o desfoque nunca sai). */
async function tirarMarcas(page) {
  await page.evaluate(() => { document.getElementById('__tutorial_marcas')?.remove(); document.querySelectorAll('[data-tutorial-alvo]').forEach(e => e.removeAttribute('data-tutorial-alvo')); }).catch(() => {});
}

/** "No menu, clique em Cadastros › Clientes." -> ['Cadastros', 'Clientes'] */
function caminhoDoMenu(texto) {
  const m = /clique em ([^.:]+?›[^.:]+?)(?:[.:]|$)/.exec(texto || '');
  return m ? m[1].split('›').map(x => x.trim().replace(/^"|"$/g, '')).filter(Boolean) : null;
}

/** Descobre (numa aba que NÃO é gravada) o caminho real no menu até a rota: grupo › subgrupo › item. */
async function descobrirMenu(browser, rota, grupo) {
  const ctx = await browser.newContext({ viewport: { width: W, height: H }, locale: 'pt-BR', ...(fs.existsSync(C.SESSAO) ? { storageState: C.SESSAO } : {}) });
  try {
    const pg = await ctx.newPage();
    await pg.goto(C.URL_BASE + C.comEmpresa('/'), { waitUntil: 'load' });
    const menu = pg.locator('aside').first();
    await menu.waitFor({ state: 'visible', timeout: 20000 });
    await espera(1500);
    const rotaSo = rota.split('?')[0];
    const link = () => menu.locator(`a[href="${rotaSo}"], a[href^="${rotaSo}?"]`).first();
    const visiveis = async () => (await menu.locator('button:visible').allInnerTexts()).map(t => t.trim()).filter(Boolean);
    const nomeLink = async () => (await link().innerText()).trim().split('\n')[0];
    if (await link().isVisible().catch(() => false)) return [await nomeLink()];
    const esc = t => String(t).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const botao = t => menu.locator('button:visible').filter({ hasText: new RegExp('^\\s*' + esc(t) + '\\s*$') }).first();
    // Tenta o grupo indicado e, se não achar a tela nele, cada grupo do menu (o texto do passo pode não dizer o caminho).
    const grupos = [grupo, ...(await visiveis())].filter((g, k, l) => g && l.indexOf(g) === k && !/^(Modo escuro|Sair|Super Admin)$/i.test(g));
    for (const gr of grupos) {
      const antes = new Set(await visiveis());
      if (!(await botao(gr).isVisible().catch(() => false))) continue;
      await botao(gr).click().catch(() => {}); await espera(700);
      if (await link().isVisible().catch(() => false)) return [gr, await nomeLink()];
      for (const sub of (await visiveis()).filter(t => !antes.has(t))) {
        await botao(sub).click().catch(() => {}); await espera(600);
        if (await link().isVisible().catch(() => false)) return [gr, sub, await nomeLink()];
      }
      await botao(gr).click().catch(() => {}); await espera(500); // fecha e tenta o próximo
    }
    return null;
  } catch { return null; } finally { await ctx.close(); }
}

const normFala = x => String(x || '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
/** Segundo (dentro da fala) em que a voz diz a letra i do texto: pelo alinhamento do ElevenLabs, ou estimado. */
function tempoDaLetra(fala, i) {
  const c = fala.alinha && fala.alinha[i];
  if (c && typeof c.start === 'number') return c.start;
  return fala.dur * (i / Math.max(1, String(fala.falado || fala.texto || '').length));
}
/** Procura a palavra na fala a partir de `pos`: { t: segundo em que é dita, fim: posição depois dela } ou null. */
function quandoDiz(fala, palavra, pos = 0) {
  if (!palavra || typeof palavra !== 'string' || palavra.length < 3) return null;
  const i = normFala(fala.falado || fala.texto).indexOf(normFala(palavra), pos);
  return i < 0 ? null : { t: tempoDaLetra(fala, i), fim: i + palavra.length };
}
/** Em que segundo a fala diz cada nome do caminho do menu (o clique acontece junto com a palavra). */
function temposDoMenu(fala, caminho, inicio) {
  let pos = 0, ult = inicio + 0.3; const out = [];
  for (const nome of caminho) {
    const q = quandoDiz(fala, nome, pos);
    let tt = q ? inicio + q.t + 0.15 : ult + 0.9;
    if (q) pos = q.fim;
    tt = Math.max(tt, ult + 0.6); out.push(tt); ult = tt;
  }
  return out;
}

/** Mostra no vídeo o caminho pelo menu lateral: o cursor vai em cada nível e clica. */
async function andarNoMenu(page, caminho, som, clique, tempos, agora) {
  const menu = page.locator('aside').first();
  for (let k = 0; k < caminho.length; k++) {
    // Clica junto com a voz: espera a hora em que a fala diz o nome do item (pedido do dono, 23/11/2026).
    if (tempos && agora && tempos[k] != null) { const falta = tempos[k] - 0.7 - agora(); if (falta > 0) await espera(falta * 1000); }
    const nome = caminho[k], ultimo = k === caminho.length - 1;
    const el = (ultimo ? menu.locator('a:visible') : menu.locator('button:visible')).filter({ hasText: nome }).first();
    await el.waitFor({ state: 'visible', timeout: k ? 5000 : 15000 }).catch(() => {});
    if (!(await el.isVisible().catch(() => false))) { console.log(`   (menu: não achei "${nome}")`); return false; }
    const ehUltimoProx = k + 1 === caminho.length - 1;
    const proximo = !ultimo && await (ehUltimoProx ? menu.locator('a:visible') : menu.locator('button:visible')).filter({ hasText: caminho[k + 1] }).first().isVisible().catch(() => false);
    const b = await el.boundingBox(); if (!b) return false;
    await moverCursor(page, b.x + Math.min(40, b.width / 2), b.y + b.height / 2);
    if (proximo) { await espera(300); continue; } // grupo já aberto: só passa o mouse
    som(clique, 0.9); await onda(page);
    await el.click().catch(() => {});
    await espera(ultimo ? 1800 : 250);
  }
  return true;
}

/** Se o sistema mostrar "Rate limit exceeded" (muitos acessos), cobre com a cortina, espera e recarrega. */
async function semErroDeLimite(page) {
  for (let k = 0; k < 4; k++) {
    const erro = await page.getByText(/Rate limit exceeded|Não foi possível conferir o acesso/i).first().isVisible().catch(() => false);
    if (!erro) return;
    console.log('   (limite de acessos do sistema: espero e recarrego)'); // aparece no log: vídeo fica com cortina
    await cortina(page, true);
    await espera(20000);
    await page.reload({ waitUntil: 'load' }).catch(() => {});
    await espera(3500);
    await C.prepararTela(page).catch(() => {});
    await cortina(page, false);
  }
}

/** Espera a tela terminar de carregar (some o "Carregando…"), até ~25 s, antes de narrar. */
async function esperarCarregar(page) {
  // Espera a tela abrir de verdade: nenhum "Carregando…" VISÍVEL, nem "demorando para responder", nem tela em branco.
  // Precisa ficar livre duas vezes seguidas (o PDV carrega em duas etapas).
  const ocupada = () => page.evaluate(() => {
    const txt = (document.body?.innerText || '').trim();
    if (txt.length < 40) return true;
    for (const el of document.querySelectorAll('body *')) {
      const proprio = [...el.childNodes].filter(n => n.nodeType === 3).map(n => n.textContent).join(' ').trim();
      if (!/^Carregando|demorando para responder/i.test(proprio)) continue;
      if (el.closest('#__cortina,#__legenda')) continue;
      const r = el.getBoundingClientRect(), st = getComputedStyle(el);
      if (r.width > 0 && r.height > 0 && st.visibility !== 'hidden' && st.display !== 'none' && Number(st.opacity) > 0.05) return true;
    }
    return false;
  }).catch(() => false);
  let livre = 0;
  for (let k = 0; k < 90 && livre < 2; k++) { livre = (await ocupada()) ? 0 : livre + 1; await espera(500); }
}

/** Super Admin vendo a Demonstração: depois do clique no menu, a faixa "acessando: <empresa>" tem que continuar. */
async function naEmpresaCerta(page) {
  if (!process.env.TUTORIAL_VER_EMPRESA) return true;
  if (page.url().includes('empresa=')) return true;
  // O sistema guarda a empresa aberta pelo Super Admin no sessionStorage (a faixa "acessando" fica escondida no vídeo).
  return page.evaluate((e) => sessionStorage.getItem('melhor-sistema:empresa-superadmin') === e, process.env.TUTORIAL_VER_EMPRESA).catch(() => false);
}

/** Ação do roteiro mostrada no vídeo: o cursor vai até o alvo, clique com som e onda; campo é digitado letra a letra. */
async function executarVisivel(page, a, r, som, clique) {
  if (a.soSemGravar && process.env.TUTORIAL_SEM_GRAVAR !== '1') return;
  if (a.tipo === 'tecla' || a.tipo === 'esperar' || !a.alvo) return C.executar(page, a, r);
  const c = await centro(page, a.alvo).catch(() => null);
  if (c) await moverCursor(page, c[0], c[1]);
  if (a.tipo === 'clicar' || a.tipo === 'escolher' || a.tipo === 'preencher') { som(clique, 0.9); await onda(page); }
  if (a.tipo === 'preencher' && c) {
    try {
      const el = C.achar(page, a.alvo);
      await el.click({ force: true }).catch(() => {});
      await el.fill('');
      await el.pressSequentially(String(a.valor || ''), { delay: 55 });
      await espera(a.espera || 600);
      return;
    } catch { /* cai no jeito normal */ }
  }
  return C.executar(page, a, r);
}

async function centro(page, alvo) {
  const el = C.achar(page, alvo);
  await el.waitFor({ state: 'visible', timeout: 15000 });
  await el.scrollIntoViewIfNeeded().catch(() => {});
  const b = await el.boundingBox();
  return b ? [b.x + b.width / 2, b.y + b.height / 2] : null;
}

async function gravar(r, s) {
  // Roteiro pode pedir outra empresa (autorizada pelo dono), ex.: Entrada de NF-e usa a Thiago Informática.
  if (r.empresa) process.env.TUTORIAL_VER_EMPRESA = r.empresa;
  // Tela do Super Admin (fora de qualquer empresa): grava sem abrir a Demonstração.
  if (r.superAdmin) { process.env.TUTORIAL_VER_EMPRESA = ''; process.env.TUTORIAL_ADMIN = '1'; }
  const logo = ['logo.webp', 'logo.png'].map(f => path.join(RAIZ, 'ajuda', f)).find(f => fs.existsSync(f));
  const logoUri = logo ? `data:image/${logo.endsWith('png') ? 'png' : 'webp'};base64,${fs.readFileSync(logo).toString('base64')}` : '';

  // 1) Narração antes de gravar: assim cada passo fica na tela o tempo exato da fala.
  // Jeito de falar aprovado pelo dono: conversa, como o Thiago explicando para o cliente (nada de "Passo 1.").
  // O roteiro pode trazer `fala` (no tutorial ou no passo) para usar um texto próprio.
  const natural = t => String(t || '').replace(/CPF\/CNPJ/g, 'CPF ou CNPJ').replace(/\s*›\s*/g, ', depois em ').replace(/["“”]/g, '').replace(/\s+/g, ' ').trim();
  const minusc = t => t.charAt(0).toLowerCase() + t.slice(1);
  const textoIntro = r.fala || `Oi! Aqui é o Thiago, da Thiago Informática. Neste vídeo eu vou te mostrar como ${minusc(natural(r.titulo))}. ${natural(r.resumo)}`;
  const falaIntro = falar(textoIntro);
  // Abertura animada (efeitos da apresentação aprovada) com a fala de abertura: empolga antes do passo a passo.
  const dirAbertura = fs.mkdtempSync(path.join(require('os').tmpdir(), 'abertura-'));
  let abertura = null;
  if (process.env.TUTORIAL_SEM_ABERTURA !== '1') {
    const img = [path.join(__dirname, '.limpo', r.id, 'passo-1.png'), path.join(RAIZ, 'ajuda', 'img', r.id, 'passo-1.png')].find(f => fs.existsSync(f));
    const dados = { titulo: r.titulo, grupo: r.grupo, resumo: r.resumo, img: img ? path.relative(path.join(__dirname, 'animacoes'), img) : '', fala: textoIntro, falaDur: falaIntro.dur };
    try {
      execFileSync('node', [path.join(__dirname, 'animar.js'), 'abertura-tutorial', JSON.stringify(dados), 'abertura'], { env: { ...process.env, ANIMAR_SAIDA: dirAbertura }, stdio: ['ignore', 'ignore', 'inherit'] });
      abertura = path.join(dirAbertura, 'abertura.mp4');
      console.log('   ✨ abertura animada pronta');
    } catch (e) { console.log('   (sem abertura animada: ' + String(e.message).split('\n')[0] + ')'); }
  }
  const LIGA = ['Primeiro', 'Agora', 'Depois', 'Em seguida', 'Agora', 'Depois', 'Em seguida', 'Agora', 'Depois'];
  const falas = r.passos.map((p, i) => { const t = p.fala || [
    (i === r.passos.length - 1 && i > 0 ? 'E pra finalizar' : LIGA[i % LIGA.length]) + ', ' + minusc(natural(p.texto)),
    p.dica ? 'Uma dica: ' + minusc(natural(p.dica)) : '',
  ].filter(Boolean).join(' '); const f = { ...falar(t), texto: t }; f.alinha = require('./video-voz.js').alinhar(f.arquivo, f.falado || t); return f; });
  const falaFim = falar('Pronto! Viu como é fácil? Qualquer dúvida, é só chamar no grupo de suporte.');

  const dirTmp = fs.mkdtempSync(path.join(require('os').tmpdir(), 'video-'));
  const browser = await chromium.launch();
  const context = await browser.newContext({
    viewport: { width: W, height: H }, locale: 'pt-BR', recordVideo: { dir: dirTmp, size: { width: W, height: H } },
    ...(fs.existsSync(C.SESSAO) ? { storageState: C.SESSAO } : {}),
  });
  await context.addInitScript({ content: scriptDaPagina(logoUri) });
  const page = await context.newPage();
  // Pergunta do navegador ("Tem certeza?"): só aceita se o roteiro pedir (ex.: ligar o Modo treino do PDV).
  page.on('dialog', d => (r.aceitarConfirmacao ? d.accept() : d.dismiss()).catch(() => {}));
  // Antes de abrir qualquer tela: o que o roteiro manda manter (nomes/valores da Demonstração) não vira dado inventado.
  await C.instalarManter(context, page, r.manter, !!r.valoresReais);
  const t0 = Date.now();
  let corte = 0;
  const eventos = [];
  const agora = () => (Date.now() - t0) / 1000;
  const som = (arquivo, vol = 1) => arquivo && eventos.push({ t: agora(), arquivo, vol });
  // Tela demorando para abrir: a espera é cortada do vídeo (pedido do dono). Só corta o que passa do fim da fala,
  // para a voz nunca ser cortada; os sons depois do corte andam junto (a voz sempre bate com a tela).
  const cortes = [];
  const cortarEspera = async (fn, livreDesde = 0, manter = 0.4) => { const a = agora(); await fn(); const b = agora(); const ini = Math.max(a + manter, livreDesde); if (b - 0.2 - ini > 1) cortes.push([ini, b - 0.2]); };
  const fimDaFala = (inicio, fala) => (inicio === null ? 0 : inicio + fala.dur + 0.3);

  try {
    // 2) Abertura: logo + título enquanto a primeira tela carrega.
    await page.evaluate(([t, sub]) => { sessionStorage.setItem('__cortina_t', t); sessionStorage.setItem('__cortina_s', sub); }, [r.titulo, r.resumo || '']).catch(() => {});
    // Passo 1 "No menu, clique em X › Y": o vídeo começa no início e mostra o caminho pelo menu.
    // Pedido do dono: TODO passo que muda de tela mostra o caminho pelo menu (cursor, clique visível), não só o 1º.
    // Caminhos já descobertos ficam guardados (cada descoberta abre o sistema e gasta o limite de acessos).
    const CACHE_MENU = path.join(__dirname, '.cache-menu.json');
    const cacheMenu = fs.existsSync(CACHE_MENU) ? JSON.parse(fs.readFileSync(CACHE_MENU, 'utf8')) : {};
    const menus = []; let descobriu = false;
    for (const p of r.passos) {
      if (r.precisaLogin === false || !p.ir || r.semMenu || p.semMenu) { menus.push(null); continue; } // semMenu no passo: vem de tela sem menu lateral (ex.: PDV)
      const rota = p.ir.split('?')[0];
      if (!(rota in cacheMenu)) { const dica = caminhoDoMenu(p.texto); cacheMenu[rota] = await descobrirMenu(browser, p.ir, (dica && dica[0]) || r.grupo); descobriu = true; }
      menus.push(cacheMenu[rota]);
    }
    fs.writeFileSync(CACHE_MENU, JSON.stringify(cacheMenu, null, 1));
    if (descobriu) await espera(30000); // deixa o limite de acessos do sistema respirar antes de gravar
    const menu1 = menus[0];
    console.log('   menu: ' + menus.map((m, k) => r.passos[k].ir ? `${k + 1}: ${m ? m.join(' › ') : 'abre direto'}` : '').filter(Boolean).join(' | '));
    const primeira = menu1 ? '/' : (r.passos.find(p => p.ir)?.ir || '/');
    await page.goto(C.URL_BASE + (r.precisaLogin === false ? primeira : C.comEmpresa(primeira)), { waitUntil: 'load' }).catch(() => {});
    await cortina(page, true, r.titulo, r.resumo || '');
    // Nomes reais da empresa -> fictícios (a cortina cobre a tela enquanto carrega).
    if (r.precisaLogin !== false) await C.instalarNomes(context, page, await C.carregarNomesReais(page));
    // A fala de abertura vai na abertura animada (antes); aqui o vídeo já começa no passo 1.
    await C.prepararTela(page);
    corte = Math.max(0, agora() - 0.3);

    for (let i = 0; i < r.passos.length; i++) {
      const p = r.passos[i], n = i + 1, fala = falas[i];
      await page.evaluate(a => { window.__desfArgs = a; }, { extras: C.lerExtrasPrivacidade(), tudo: !!p.desfocarTudo, campos: !!p.desfocarCampos, fantasia: process.env.TUTORIAL_FANTASIA !== '0', borrar: p.borrar || r.borrar || '' }).catch(() => {});
      let inicio = null;
      if (p.ir && i > 0 && menus[i]) {
        // Fecha janela aberta (o menu fica atrás dela) e mostra o caminho pelo menu com a fala já começando.
        await page.keyboard.press('Escape').catch(() => {}); await espera(300);
        await tirarMarcas(page);
        // A fala começa junto com o caminho pelo menu: "clica em Cadastros" e o clique em Cadastros na mesma hora.
        await legenda(page, n, p.titulo, p.texto);
        inicio = agora(); som(fala.arquivo);
        const foi = await andarNoMenu(page, menus[i], som, s.clique, temposDoMenu(fala, menus[i], inicio), agora);
        await cortarEspera(async () => {
          await espera(1500);
          if (!foi || !(await naEmpresaCerta(page)) || !page.url().split('?')[0].endsWith(p.ir.split('?')[0])) {
            // Recarrega rápido na tela certa (sem segurar a cortina enquanto a fala corre).
            console.log(`   (passo ${n}: recarreguei a tela — ${!foi ? 'menu não abriu' : 'empresa/rota diferente'})`);
            await page.goto(C.URL_BASE + C.comEmpresa(p.ir), { waitUntil: 'load' }).catch(() => {}); await espera(2500); await C.prepararTela(page).catch(() => {});
            await cortina(page, false); // a página nova abre com a cortina de título: tira
          }
          await esperarCarregar(page);
        }, fimDaFala(inicio, fala), 0.6);
      } else if (p.ir && i > 0) {
        await legenda(page, '', '');
        await cortina(page, true, `Passo ${n}`, p.titulo); som(s.transicao, 0.7);
        await cortarEspera(async () => {
          await page.goto(C.URL_BASE + (r.precisaLogin === false ? p.ir : C.comEmpresa(p.ir)), { waitUntil: 'load' }).catch(() => {});
          await espera(p.espera || 3000); await esperarCarregar(page);
        }, 0, 1.5);
      }
      if (i === 0 && menu1) {
        await cortarEspera(async () => { await C.prepararTela(page); await esperarCarregar(page); await page.locator('aside button:visible').first().waitFor({ timeout: 40000 }).catch(() => {}); await espera(600); }, 0, 1.2); // primeira tela abrindo atrás da capa
        await espera(400);
        await cortina(page, false);
        // Caminho pelo menu junto com a fala: cada clique acontece quando a voz diz o nome (pedido do dono, 23/11/2026).
        await legenda(page, n, p.titulo, p.texto);
        inicio = agora(); som(fala.arquivo);
        const foi = await andarNoMenu(page, menu1, som, s.clique, temposDoMenu(fala, menu1, inicio), agora);
        // Super admin vendo a empresa de demonstração: o clique no menu perde o ?empresa=; recarrega na mesma tela.
        await cortarEspera(async () => {
          await espera(1500);
          if (!foi || !(await naEmpresaCerta(page)) || !page.url().split('?')[0].endsWith(p.ir.split('?')[0])) { await page.goto(C.URL_BASE + C.comEmpresa(p.ir), { waitUntil: 'load' }).catch(() => {}); await espera(p.espera || 3000); await cortina(page, false); }
          await esperarCarregar(page);
        }, fimDaFala(inicio, fala), 0.6);
      }
      await cortarEspera(async () => { await semErroDeLimite(page); await esperarCarregar(page); }, fimDaFala(inicio, fala));
      // A fala começa ANTES das ações do passo: o que a voz diz acontece na tela ao mesmo tempo (pedido do dono).
      if (inicio === null) {
        await cortina(page, false);
        await legenda(page, n, p.titulo, p.texto);
        inicio = agora(); som(fala.arquivo);
      }
      let posFala = 0;
      for (const a of p.antes || []) {
        // Clique junto com a voz: se a fala diz o nome do botão ("clica em Nova conta"), espera essa hora (no máx. 6 s).
        const nomeAlvo = a.tipo === 'clicar' && a.alvo && typeof a.alvo.nome === 'string' ? a.alvo.nome : null;
        const q = nomeAlvo ? quandoDiz(fala, nomeAlvo, posFala) : null;
        if (q) { posFala = q.fim; const falta = inicio + q.t - 0.6 - agora(); if (falta > 0) await espera(Math.min(6, falta) * 1000); }
        await executarVisivel(page, a, r, som, s.clique);
      }
      await C.prepararTela(page);
      await espera(400);
      // Página recarregou sozinha no meio do passo (ex.: limite de acessos, tela que recarrega): tira a cortina.
      await cortina(page, false);
      // Mouse até o primeiro alvo, depois as bolinhas.
      const marcas = (p.marcar || []).map((m, j) => ({ ...m, numero: p.marcar.length > 1 ? `${n}${String.fromCharCode(97 + j)}` : n }));
      if (marcas.length) {
        const c1 = await centro(page, marcas[0].alvo).catch(() => null);
        if (c1) await moverCursor(page, c1[0], c1[1]);
        const caixas = await C.marcar(page, marcas).catch(e => { console.log(`   (passo ${n}: não achei o alvo — ${String(e.message).split('\n')[0]})`); return []; });
        // Botão marcado lá embaixo: a legenda sobe para não cobrir.
        const embaixo = caixas.some(c => c.y + c.height > H - 190);
        await page.evaluate(t => document.getElementById('__legenda')?.classList.toggle('topo', t), embaixo).catch(() => {});
      }
      await espera(Math.max(900, (fala.dur + 0.6 - (agora() - inicio)) * 1000));
      await tirarMarcas(page);
      // Ações do passo (ex.: clicar em "Novo cliente"), com mouse e som de clique.
      for (const a of p.depois || []) {
        // Salvar que demora: a espera da janela fechar é cortada do vídeo.
        if (a.aguardarFechar) await cortarEspera(() => executarVisivel(page, a, r, som, s.clique), fimDaFala(inicio, fala), 1.5);
        else await executarVisivel(page, a, r, som, s.clique);
      }
      console.log(`   🎬 passo ${n}: ${p.titulo}`);
    }
    // 3) Encerramento.
    await legenda(page, '', '');
    await cortina(page, true, 'Pronto! ✅', 'Ficou com dúvida? É só chamar no grupo de suporte.');
    som(s.transicao, 0.7); som(falaFim.arquivo);
    await espera((falaFim.dur + 0.8) * 1000);
  } finally {
    var fimWall = agora();
    const video = page.video();
    await context.close(); await browser.close();
    var bruto = await video.path();
  }

  // 4) Junta vídeo + narração + efeitos + música (ffmpeg).
  fs.mkdirSync(SAIDA, { recursive: true });
  const final = path.join(SAIDA, `${r.id}.mp4`);
  // A gravação do navegador perde quadros quando a tela trava: o vídeo é esticado para o relógio real
  // (k), e as esperas longas são cortadas. Cada som anda junto com o corte: a voz sempre bate com a tela.
  const durBruto = duracao(bruto), k = fimWall > 0 && durBruto > 0 ? fimWall / durBruto : 1;
  const cortesOk = cortes.map(([a, b]) => [Math.max(a, corte), b]).filter(([a, b]) => b - a > 0.5);
  const cortado = cortesOk.reduce((t, [a, b]) => t + (b - a), 0);
  const novoT = t => { let x = t - corte; for (const [a, b] of cortesOk) { if (t >= b) x -= (b - a); else if (t > a) x -= (t - a); } return Math.max(0, x); };
  const total = fimWall - corte - cortado;
  if (Math.abs(k - 1) > 0.01) console.log(`   (relógio: vídeo esticado ${(k * 100 - 100).toFixed(1)}%)`);
  if (cortesOk.length) console.log(`   ✂ ${cortesOk.length} espera(s) cortada(s): ${cortado.toFixed(1)} s`);
  const sel = cortesOk.length ? `,select='not(${cortesOk.map(([a, b]) => `between(t,${(a - corte).toFixed(2)},${(b - corte).toFixed(2)})`).join('+')})',setpts=N/25/TB` : '';
  const args = ['-y', '-v', 'error', '-i', bruto];
  const filtros = [`[0:v]setpts=(PTS-STARTPTS)*${k.toFixed(5)},fps=25,trim=start=${corte.toFixed(2)},setpts=PTS-STARTPTS${sel}[vout]`], rotulos = [];
  eventos.forEach((e, k) => {
    args.push('-i', e.arquivo);
    const ms = Math.round(novoT(e.t) * 1000);
    filtros.push(`[${k + 1}:a]adelay=${ms}|${ms},volume=${e.vol}[a${k}]`); rotulos.push(`[a${k}]`);
  });
  if (s.musica) {
    args.push('-stream_loop', '-1', '-i', s.musica);
    const k = eventos.length + 1;
    filtros.push(`[${k}:a]volume=0.12,atrim=0:${total.toFixed(2)},afade=t=in:d=1.5,afade=t=out:st=${Math.max(0, total - 2).toFixed(2)}:d=2[mus]`); rotulos.push('[mus]');
  }
  if (rotulos.length) {
    filtros.push(`${rotulos.join('')}amix=inputs=${rotulos.length}:normalize=0:dropout_transition=0,apad[aout]`);
    args.push('-filter_complex', filtros.join(';'), '-map', '[vout]', '-map', '[aout]', '-c:a', 'aac', '-b:a', '128k');
  } else { args.push('-f', 'lavfi', '-i', 'anullsrc=r=44100:cl=stereo', '-filter_complex', filtros.join(';'), '-map', '[vout]', '-map', '1:a', '-c:a', 'aac'); }
  args.push('-t', total.toFixed(2), '-c:v', 'libx264', '-preset', 'veryfast', '-crf', '24', '-pix_fmt', 'yuv420p', '-movflags', '+faststart', final);
  execFileSync('ffmpeg', args, { stdio: 'inherit' });
  // Vinheta da Thiago Informática antes do tutorial (se existir ajuda/videos/vinheta.mp4).
  const vinheta = path.join(SAIDA, 'vinheta.mp4');
  const partes = [fs.existsSync(vinheta) && process.env.TUTORIAL_SEM_VINHETA !== '1' ? vinheta : null, abertura && fs.existsSync(abertura) ? abertura : null].filter(Boolean);
  if (partes.length) {
    const junto = final.replace(/\.mp4$/, '.tmp.mp4');
    const todas = [...partes, final];
    const ent = todas.flatMap(f => ['-i', f]);
    const fil = todas.map((_, k) => `[${k}:v]scale=${W}:${H},fps=25,setsar=1[v${k}];[${k}:a]aresample=44100[a${k}]`).join(';') + ';' + todas.map((_, k) => `[v${k}][a${k}]`).join('') + `concat=n=${todas.length}:v=1:a=1[v][a]`;
    execFileSync('ffmpeg', ['-y', '-v', 'error', ...ent, '-filter_complex', fil,
      '-map', '[v]', '-map', '[a]', '-c:v', 'libx264', '-preset', 'veryfast', '-crf', '24', '-pix_fmt', 'yuv420p', '-c:a', 'aac', '-b:a', '128k', '-movflags', '+faststart', junto], { stdio: 'inherit' });
    fs.renameSync(junto, final);
  }
  execFileSync('ffmpeg', ['-y', '-v', 'error', '-ss', '7.5', '-i', final, '-frames:v', '1', '-q:v', '4', path.join(SAIDA, `${r.id}.jpg`)]);
  fs.rmSync(dirTmp, { recursive: true, force: true });
  const mb = (fs.statSync(final).size / 1048576).toFixed(1);
  console.log(`   ✅ ${path.relative(RAIZ, final)} · ${total.toFixed(0)} s · ${mb} MB · ${eventos.filter(e => e.arquivo && e.arquivo.includes('.cache-audio')).length} falas`);
}

(async () => {
  const ids = process.argv.slice(2);
  if (!ids.length) { console.log('Uso: node tutoriais/video.js <id-do-tutorial> [...]'); process.exit(1); }
  const roteiros = C.carregarRoteiros(ids);
  const s = sons();
  for (const r of roteiros) {
    console.log(`\n▶ Vídeo: ${r.titulo}`);
    try { await gravar(r, s); } catch (e) { console.log('   ✖ ' + String(e.message).split('\n').slice(0, 12).join(' | ')); }
    await espera(Number(process.env.TUTORIAL_PAUSA || 8000));
  }
})();
