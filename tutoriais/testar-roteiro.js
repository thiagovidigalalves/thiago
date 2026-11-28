#!/usr/bin/env node
// Teste rápido de roteiro (sem gravar vídeo nem voz): roda as ações de cada passo e confere se as marcações aparecem.
// Uso: node tutoriais/testar-roteiro.js <id> [até-o-passo] [print-final.png]
// ATENÇÃO: lança de verdade (como o vídeo). Só na Demonstração (ou Thiago Informática com gravaNaThiago).
const C = require('./capturar.js'); const { chromium } = require('playwright'); const fs = require('fs'); const path = require('path');
const dir = path.join(__dirname, 'roteiros');
const [id, ate, out] = process.argv.slice(2);
const f = fs.readdirSync(dir).find(f => f.endsWith('.js') && require(path.join(dir, f)).id === id);
if (!f) { console.log('roteiro não achado: ' + id); process.exit(1); }
const r = require(path.join(dir, f));
process.env.TUTORIAL_VER_EMPRESA = r.empresa || process.env.TUTORIAL_VER_EMPRESA || 'EMP_DEMOTHGE_STOR01';
(async () => {
  const b = await chromium.launch(); const ctx = await b.newContext({ storageState: C.SESSAO, viewport: { width: 1366, height: 768 }, locale: 'pt-BR' });
  const p = await ctx.newPage(); p.on('dialog', d => d.accept().catch(() => {}));
  let falhas = 0; const n = Math.min(Number(ate || r.passos.length), r.passos.length);
  for (let i = 0; i < n; i++) {
    const s = r.passos[i];
    if (s.ir) { await p.goto(C.URL_BASE + C.comEmpresa(s.ir), { waitUntil: 'load' }).catch(() => {}); await p.waitForTimeout(s.espera || 6000); }
    let ok = true;
    for (const a of s.antes || []) { try { await C.executar(p, a, r); } catch (e) { ok = false; falhas++; console.log(`✖ passo ${i + 1} antes ${JSON.stringify(a.alvo || a.tecla)} — ${e.message.split('\n')[0]}`); break; } }
    for (const m of s.marcar || []) { const v = await C.achar(p, m.alvo).waitFor({ state: 'visible', timeout: 5000 }).then(() => true).catch(() => false); if (!v) { falhas++; console.log(`✖ passo ${i + 1} marca ${JSON.stringify(m.alvo)}`); } }
    for (const a of s.depois || []) { try { await C.executar(p, a, r); } catch (e) { ok = false; falhas++; console.log(`✖ passo ${i + 1} depois ${JSON.stringify(a.alvo || a.tecla)} — ${e.message.split('\n')[0]}`); break; } }
    console.log(`${ok ? '✔' : '…'} passo ${i + 1}: ${s.titulo}`);
    if (!ok) { await p.screenshot({ path: out || `/tmp/teste-${id}-${i + 1}.png` }); break; }
  }
  if (out) await p.screenshot({ path: out });
  console.log(falhas ? `RESULTADO ${id}: ${falhas} problema(s)` : `RESULTADO ${id}: OK`);
  await b.close();
})();
