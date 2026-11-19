#!/usr/bin/env node
/**
 * Grava uma animação HTML (tutoriais/animacoes/*.html) como vídeo MP4, com efeitos sonoros e música.
 *
 * Uso: node tutoriais/animar.js vinheta            -> ajuda/videos/vinheta.mp4 (+ vinheta.png)
 *      node tutoriais/animar.js apresentacao        -> ajuda/videos/apresentacao.mp4
 *
 * A página define window.DURACAO (segundos) e window.comecar(). Se definir window.SONS =
 * [{ t: 0.3, som: 'transicao' }, { t: 1.2, fala: 'Texto para a voz' }], o robô coloca os efeitos
 * de tutoriais/audio/<som>.mp3 e as falas (ElevenLabs, mesma chave do video.js) nesses momentos.
 * window.CAPA (segundos) = momento do quadro usado como imagem de capa.
 */
const fs = require('fs');
const path = require('path');
const os = require('os');
const { execFileSync } = require('child_process');
const { chromium } = require('playwright');

const RAIZ = path.resolve(__dirname, '..');
const PASTA = path.join(__dirname, 'animacoes');
const SONS = path.join(__dirname, 'audio');
const SAIDA = path.join(RAIZ, 'ajuda', 'videos');
const W = 1920, H = 1080;
const espera = ms => new Promise(r => setTimeout(r, ms));
const duracao = f => Number(execFileSync('ffprobe', ['-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', f]).toString().trim()) || 0;

/** Efeitos simples gerados na hora, caso não haja arquivo em tutoriais/audio/ (troque por efeitos do ElevenLabs). */
function garantirSons() {
  fs.mkdirSync(SONS, { recursive: true });
  const gerar = (nome, args) => { const f = path.join(SONS, nome + '.mp3'); if (!fs.existsSync(f)) execFileSync('ffmpeg', ['-y', '-v', 'error', ...args, f]); };
  gerar('transicao', ['-f', 'lavfi', '-i', 'anoisesrc=d=0.7:c=pink:a=0.3', '-af', 'highpass=f=300,lowpass=f=4000,afade=t=in:d=0.35,afade=t=out:st=0.35:d=0.35']);
  gerar('impacto', ['-f', 'lavfi', '-i', 'sine=frequency=55:duration=1.2', '-f', 'lavfi', '-i', 'anoisesrc=d=0.25:c=brown:a=0.5', '-filter_complex', '[0]volume=1.6,afade=t=out:st=0.05:d=1.1[a];[1]afade=t=out:st=0.02:d=0.22[b];[a][b]amix=inputs=2:normalize=0']);
  gerar('brilho', ['-f', 'lavfi', '-i', "aevalsrc='0.25*sin(2*PI*(1400+2600*t)*t)*exp(-3*t)':d=0.9"]);
  gerar('pop', ['-f', 'lavfi', '-i', "aevalsrc='0.5*sin(2*PI*(900-500*t)*t)*exp(-18*t)':d=0.25"]);
  gerar('clique', ['-f', 'lavfi', '-i', 'sine=frequency=1800:duration=0.05', '-af', 'afade=t=out:st=0.01:d=0.04,volume=0.6']);
}

(async () => {
  const nome = process.argv[2];
  const html = path.join(PASTA, `${nome}.html`);
  if (!nome || !fs.existsSync(html)) { console.log('Uso: node tutoriais/animar.js <nome>  (arquivo em tutoriais/animacoes/<nome>.html)'); process.exit(1); }
  garantirSons();
  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'anim-'));
  const browser = await chromium.launch();
  const context = await browser.newContext({ viewport: { width: W, height: H }, recordVideo: { dir: tmp, size: { width: W, height: H } } });
  const page = await context.newPage();
  const t0 = Date.now();
  await page.goto('file://' + html, { waitUntil: 'load' });
  await page.evaluate(() => document.fonts.ready);
  await espera(600);
  const dur = await page.evaluate(() => window.DURACAO || 5);
  const capa = await page.evaluate(() => window.CAPA || null);
  const sons = await page.evaluate(() => window.SONS || null);
  const inicio = (Date.now() - t0) / 1000;
  await page.evaluate(() => window.comecar && window.comecar());
  if (capa != null) {
    await espera(capa * 1000);
    fs.mkdirSync(SAIDA, { recursive: true });
    await page.screenshot({ path: path.join(SAIDA, `${nome}.png`) });
    await espera(Math.max(0, (dur - capa) * 1000));
  } else await espera(dur * 1000);
  const video = page.video();
  await context.close(); await browser.close();
  const bruto = await video.path();

  // Efeitos padrão da vinheta, se a página não definir os seus.
  const lista = sons || [{ t: 0.25, som: 'transicao' }, { t: 1.05, som: 'impacto' }, { t: 1.55, som: 'brilho' }, { t: 2.6, som: 'pop' }];
  const entradas = [], filtros = [], rotulos = [];
  let nIn = 0;
  for (const s of lista) {
    let arq = s.som ? path.join(SONS, s.som + '.mp3') : null;
    if (s.fala) { try { arq = require('./video-voz.js').falar(s.fala).arquivo; } catch { arq = null; } }
    if (!arq || !fs.existsSync(arq)) continue;
    const k = ++nIn, ms = Math.round(s.t * 1000);
    entradas.push('-i', arq);
    filtros.push(`[${k}:a]adelay=${ms}|${ms},volume=${s.vol ?? 1}[s${k}]`); rotulos.push(`[s${k}]`);
  }
  const musica = ['musica.mp3', 'musica.wav'].map(f => path.join(SONS, f)).find(f => fs.existsSync(f));
  if (musica && lista.some(s => s.fala)) {
    const k = ++nIn; entradas.push('-stream_loop', '-1', '-i', musica);
    filtros.push(`[${k}:a]volume=0.18,atrim=0:${dur},afade=t=out:st=${Math.max(0, dur - 1.5)}:d=1.5[mus]`); rotulos.push('[mus]');
  }
  const saida = path.join(SAIDA, `${nome}.mp4`);
  const args = ['-y', '-v', 'error', '-ss', inicio.toFixed(2), '-i', bruto, ...entradas];
  if (rotulos.length) {
    filtros.push(`${rotulos.join('')}amix=inputs=${rotulos.length}:normalize=0,apad[a]`);
    args.push('-filter_complex', filtros.join(';'), '-map', '0:v', '-map', '[a]', '-c:a', 'aac', '-b:a', '160k');
  }
  args.push('-t', String(dur), '-r', '30', '-c:v', 'libx264', '-preset', 'medium', '-crf', '20', '-pix_fmt', 'yuv420p', '-movflags', '+faststart', saida);
  execFileSync('ffmpeg', args, { stdio: 'inherit' });
  fs.rmSync(tmp, { recursive: true, force: true });
  console.log(`✅ ${path.relative(RAIZ, saida)} · ${duracao(saida).toFixed(1)} s · ${(fs.statSync(saida).size / 1048576).toFixed(1)} MB`);
})();
