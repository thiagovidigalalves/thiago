#!/usr/bin/env node
/**
 * CONFERÊNCIA DOS TUTORIAIS — rode sempre que o sistema mudar (módulo novo, tela nova, campo novo).
 *
 *   node tutoriais/conferir.js            -> só confere e gera o relatório (não troca nada)
 *   node tutoriais/conferir.js --aplicar  -> também troca os prints que mudaram e regera a Central
 *
 * O que faz:
 *  1. Tira todos os prints de novo numa pasta separada (tutoriais/.conferencia), com o mesmo desfoque.
 *  2. Compara com os prints atuais e lista o que MUDOU, o que é NOVO e os passos que QUEBRARAM
 *     (botão/campo sumiu ou mudou de nome = o roteiro precisa ser ajustado).
 *  3. Abre o menu do sistema e lista as telas que ainda NÃO TÊM tutorial (módulo novo).
 *  4. Escreve tutoriais/relatorio-conferencia.md com tudo isso.
 * Usa o mesmo login do capturar.js (sessão salva, TUTORIAL_LINK ou usuário/senha) e TUTORIAL_VER_EMPRESA.
 */
const fs = require('fs');
const path = require('path');
const { execFileSync, spawnSync } = require('child_process');
const { chromium } = require('playwright');

const AQUI = __dirname, RAIZ = path.resolve(AQUI, '..');
const PASTA = path.join(AQUI, '.conferencia');
const URL_BASE = (process.env.TUTORIAL_URL || 'https://melhorsistema.thiagoinformatica.com.br').replace(/\/$/, '');
const SESSAO = path.join(AQUI, '.sessao.json');
const aplicar = process.argv.includes('--aplicar');

function roteiros() {
  return fs.readdirSync(path.join(AQUI, 'roteiros')).filter(f => f.endsWith('.js'))
    .map(f => { delete require.cache[require.resolve(path.join(AQUI, 'roteiros', f))]; return require(path.join(AQUI, 'roteiros', f)); });
}

/** Abre todos os grupos e subgrupos do menu lateral e devolve as telas (rota + nome). */
async function telasDoMenu() {
  if (!fs.existsSync(SESSAO)) return null;
  const browser = await chromium.launch();
  const page = await (await browser.newContext({ viewport: { width: 1366, height: 900 }, storageState: SESSAO })).newPage();
  const emp = process.env.TUTORIAL_VER_EMPRESA;
  await page.goto(URL_BASE + '/' + (emp ? '?empresa=' + emp : ''), { waitUntil: 'load' }).catch(() => {});
  await page.waitForTimeout(6000);
  const telas = new Map();
  const colher = async () => {
    for (const l of await page.locator('aside nav a[href]').evaluateAll(as => as.map(a => [a.getAttribute('href'), a.innerText.trim(), a.className.includes('opacity-60')])))
      if (l[0] && !l[0].startsWith('http') && !l[2]) telas.set(l[0].split('?')[0], l[1]);
  };
  const grupos = await page.locator('aside nav > div > button[aria-expanded]').count();
  for (let g = 0; g < grupos; g++) {
    const bt = page.locator('aside nav > div > button[aria-expanded]').nth(g);
    if ((await bt.getAttribute('aria-expanded')) !== 'true') await bt.click().catch(() => {});
    await page.waitForTimeout(300);
    const subs = page.locator('aside nav .sidebar-subgroup > button[aria-expanded]');
    const ns = await subs.count();
    await colher();
    for (let s = 0; s < ns; s++) { await subs.nth(s).click().catch(() => {}); await page.waitForTimeout(250); await colher(); }
  }
  await colher();
  await browser.close();
  return [...telas].map(([rota, nome]) => ({ rota, nome }));
}

(async () => {
  fs.rmSync(PASTA, { recursive: true, force: true });
  console.log('1/3 Tirando os prints de novo (pasta separada)...');
  spawnSync('node', [path.join(AQUI, 'capturar.js')], { stdio: 'inherit', env: { ...process.env, TUTORIAL_SAIDA: PASTA } });
  const captura = JSON.parse(fs.readFileSync(path.join(PASTA, '.ultima-captura.json'), 'utf8'));

  console.log('2/3 Comparando com os prints atuais...');
  const cmp = JSON.parse(execFileSync('python3', [path.join(AQUI, 'comparar.py')]).toString());

  // Passos que quebraram: existiam antes e agora não saíram (botão/campo mudou ou sumiu).
  const quebrados = [];
  for (const r of roteiros()) r.passos.forEach((p, i) => {
    const rel = `${r.id}/passo-${i + 1}.png`;
    if (!p.semPrint && fs.existsSync(path.join(RAIZ, 'ajuda', 'img', rel)) && !fs.existsSync(path.join(PASTA, rel))) quebrados.push({ print: rel, passo: p.titulo });
  });

  console.log('3/3 Conferindo o menu do sistema (telas sem tutorial)...');
  const menu = await telasDoMenu().catch(() => null);
  const cobertas = new Set(roteiros().flatMap(r => r.passos.map(p => (p.ir || '').split('?')[0]).filter(Boolean)));
  const semTutorial = (menu || []).filter(t => !cobertas.has(t.rota) && !t.rota.startsWith('/recurso-bloqueado'));

  const hoje = new Date().toLocaleString('pt-BR');
  const md = [
    `# Conferência dos tutoriais — ${hoje}`, '',
    `- Prints iguais: **${cmp.igual}**`,
    `- Prints que **mudaram**: **${cmp.mudou.length}**${aplicar ? ' (já trocados)' : ''}`,
    `- Passos que **quebraram** (roteiro precisa de ajuste): **${quebrados.length}**`,
    `- Telas do menu **sem tutorial**: **${menu ? semTutorial.length : '? (sem login salvo)'}**`,
    `- Tutoriais pulados por falta de login: ${captura.filter(c => c.motivo === 'sem login').map(c => c.id).join(', ') || 'nenhum'}`, '',
    '## Prints que mudaram', ...(cmp.mudou.length ? cmp.mudou.map(m => `- \`${m.print}\` — ${Math.round(m.diferenca * 100)}% diferente`) : ['- nenhum']), '',
    '## Passos que quebraram (ver o que mudou na tela e ajustar o roteiro)', ...(quebrados.length ? quebrados.map(q => `- \`${q.print}\` — ${q.passo}`) : ['- nenhum']), '',
    '## Telas do menu sem tutorial (criar roteiro novo)', ...(semTutorial.length ? semTutorial.map(t => `- ${t.nome} — \`${t.rota}\``) : ['- nenhuma']), '',
    '## Depois de ajustar', '1. Revisar a privacidade dos prints novos (nada de dado de cliente legível).',
    '2. `node tutoriais/gerar-ajuda.js` e republicar a Central (mesmo link).',
  ].join('\n');
  fs.writeFileSync(path.join(AQUI, 'relatorio-conferencia.md'), md + '\n');

  if (aplicar) {
    for (const rel of [...cmp.mudou.map(m => m.print), ...cmp.novo]) {
      fs.mkdirSync(path.dirname(path.join(RAIZ, 'ajuda', 'img', rel)), { recursive: true });
      fs.copyFileSync(path.join(PASTA, rel), path.join(RAIZ, 'ajuda', 'img', rel));
    }
    execFileSync('node', [path.join(AQUI, 'gerar-ajuda.js')], { stdio: 'inherit' });
  }
  console.log('\n' + md.split('\n').slice(0, 8).join('\n') + '\n\nRelatório completo: tutoriais/relatorio-conferencia.md');
})();
