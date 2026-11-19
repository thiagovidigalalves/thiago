#!/usr/bin/env node
/**
 * Captura os prints dos tutoriais, com a bolinha numerada e o destaque no lugar certo.
 *
 * Uso:
 *   node tutoriais/capturar.js                 -> captura todos os roteiros
 *   node tutoriais/capturar.js clientes pdv    -> captura só esses roteiros
 *
 * Variáveis de ambiente:
 *   TUTORIAL_URL    endereço do sistema (padrão: https://melhorsistema.thiagoinformatica.com.br)
 *   TUTORIAL_EMAIL  e-mail de um usuário de DEMONSTRAÇÃO (nunca use empresa de cliente real)
 *   TUTORIAL_SENHA  senha desse usuário
 *   (ou login de funcionário: TUTORIAL_EMPRESA = código/CNPJ da empresa demo, TUTORIAL_USUARIO e TUTORIAL_SENHA)
 *
 * Segurança: o robô NUNCA clica em botões que gravam ou apagam dados
 * (Salvar, Excluir, Finalizar, Emitir, Enviar...). Esses botões só recebem a bolinha.
 * Um roteiro só pode passar disso se declarar `gravaDados: true` (use apenas na empresa de demonstração).
 */
const fs = require('fs');
const path = require('path');
const { chromium } = require('playwright');

const RAIZ = path.resolve(__dirname, '..');
const PASTA_ROTEIROS = path.join(__dirname, 'roteiros');
// TUTORIAL_SAIDA: captura numa pasta separada (usado pelo conferir.js para comparar antes de trocar).
const PASTA_IMG = process.env.TUTORIAL_SAIDA ? path.resolve(process.env.TUTORIAL_SAIDA) : path.join(RAIZ, 'ajuda', 'img');
const SESSAO = path.join(__dirname, '.sessao.json');
const URL_BASE = (process.env.TUTORIAL_URL || 'https://melhorsistema.thiagoinformatica.com.br').replace(/\/$/, '');
const BOTOES_PERIGOSOS = /salvar|gravar|cadastrar|excluir|apagar|remover|inativar|finalizar|emitir|emiss[aã]o|enviar|confirmar|cancelar venda|cancelar nota|estornar|inutilizar|pagar|baixar|transmitir|faturar|lan[cç]ar|faltam r\$|gerar|manifestar|arquivar|importar|reabrir|estornar|aplicar margem|substitui|restaurar|conectar|cancelar fila|pausar|encerrar|definir padr|imprimir teste|devolver|transformar em venda/i;
// Dentro de uma janela (dialog), estes também gravam dados:
const BOTOES_PERIGOSOS_JANELA = /abrir caixa|fechar caixa|continuar|ok$|sim$/i;

function carregarRoteiros(filtro) {
  return fs.readdirSync(PASTA_ROTEIROS)
    .filter(f => f.endsWith('.js'))
    .map(f => require(path.join(PASTA_ROTEIROS, f)))
    .filter(r => !filtro.length || filtro.includes(r.id))
    .sort((a, b) => (a.ordem || 99) - (b.ordem || 99));
}

/** Localiza um elemento a partir do seletor do roteiro (texto ou seletor Playwright). */
function achar(page, alvo) {
  if (typeof alvo === 'string') return page.locator(alvo).first();
  // `dentro: 'dialog'` procura só dentro da janela aberta (evita achar o botão de trás).
  const base = alvo.dentro === 'dialog' ? page.getByRole('dialog').last() : page;
  if (alvo.papel) return base.getByRole(alvo.papel, { name: alvo.nome, exact: !!alvo.exato }).first();
  if (alvo.rotulo) return base.getByLabel(alvo.rotulo, { exact: !!alvo.exato }).first();
  if (alvo.placeholder) return base.getByPlaceholder(alvo.placeholder, { exact: !!alvo.exato }).first();
  if (alvo.texto) return base.getByText(alvo.texto, { exact: !!alvo.exato }).first();
  if (alvo.titulo) return base.locator(`[title="${alvo.titulo}"]`).first();
  // `campo`: rótulo que não está ligado ao campo (<Label> sem htmlFor) -> pega o primeiro campo depois dele.
  if (alvo.campo) return base.locator('label', { hasText: alvo.campo }).first()
    .locator('xpath=following::*[self::input or self::textarea or self::select or @role="combobox"][1]');
  if (alvo.css) return base.locator(alvo.css).first();
  throw new Error('alvo inválido: ' + JSON.stringify(alvo));
}

/** Desenha bolinhas numeradas + contorno sobre os elementos. */
async function marcar(page, marcas) {
  const caixas = [];
  for (const m of marcas) {
    const el = achar(page, m.alvo);
    await el.waitFor({ state: 'visible', timeout: 15000 });
    await el.scrollIntoViewIfNeeded().catch(() => {});
    await el.evaluate(e => e.setAttribute('data-tutorial-alvo', '')).catch(() => {});
    const b = await el.boundingBox();
    const janela = await el.evaluate(e => { const d = e.closest('[role="dialog"]'); if (!d) return null; const r = d.getBoundingClientRect(); return { x: r.x, y: r.y, width: r.width, height: r.height }; }).catch(() => null);
    if (b) caixas.push({ ...b, numero: m.numero, legenda: m.legenda || '', janela });
  }
  await page.evaluate(caixas => {
    const camada = document.createElement('div');
    window.__bolas = [];
    camada.id = '__tutorial_marcas';
    camada.style.cssText = 'position:fixed;inset:0;pointer-events:none;z-index:2147483647;';
    for (const c of caixas) {
      const pad = 6;
      const box = document.createElement('div');
      box.style.cssText = `position:fixed;left:${c.x - pad}px;top:${c.y - pad}px;width:${c.width + pad * 2}px;height:${c.height + pad * 2}px;border:3px solid #ef4444;border-radius:10px;box-shadow:0 0 0 4px rgba(239,68,68,.25);`;
      camada.appendChild(box);
      const r = 17;
      // Bolinha no canto de cima à direita (os rótulos ficam à esquerda, então não cobre texto).
      let cx = c.x + c.width + pad - r - 2, cy = c.y - pad - r;
      cx = Math.min(Math.max(4, cx), innerWidth - r * 2 - 4); cy = Math.max(4, cy);
      // Se encostar numa bolinha já desenhada, vai para o canto esquerdo da caixa.
      const encosta = (x, y) => (window.__bolas || []).some(b => Math.abs(b[0] - x) < r * 2 + 4 && Math.abs(b[1] - y) < r * 2 + 4);
      if (encosta(cx, cy)) { cx = Math.max(4, c.x - pad - r); cy = Math.max(4, c.y - pad - r); }
      (window.__bolas = window.__bolas || []).push([cx, cy]);
      const bola = document.createElement('div');
      bola.textContent = c.numero;
      bola.style.cssText = `position:fixed;left:${cx}px;top:${cy}px;width:${r * 2}px;height:${r * 2}px;border-radius:50%;background:#ef4444;color:#fff;font:700 18px/34px Arial,sans-serif;text-align:center;border:3px solid #fff;box-shadow:0 3px 10px rgba(0,0,0,.35);`;
      camada.appendChild(bola);
      if (c.legenda) {
        const tag = document.createElement('div');
        tag.textContent = c.legenda;
        tag.style.cssText = 'position:fixed;left:0;top:0;max-width:260px;background:#111827;color:#fff;font:600 14px/1.3 Arial,sans-serif;padding:7px 11px;border-radius:8px;box-shadow:0 4px 12px rgba(0,0,0,.3);white-space:nowrap;';
        camada.appendChild(tag);
        document.body.appendChild(camada);
        const w = tag.offsetWidth, h = tag.offsetHeight;
        // Tenta: direita, embaixo, em cima, esquerda — o primeiro lugar que não cobre outra marcação.
        const bate = (l, t) => caixas.some(o => o !== c && l < o.x + o.width + 10 && l + w > o.x - 10 && t < o.y + o.height + 10 && t + h > o.y - 10);
        const opcoes = [
          [c.x + c.width + pad + 14, c.y + c.height / 2 - h / 2],
          [c.x - pad, c.y + c.height + pad + 10],
          [c.x - pad, c.y - pad - h - 10],
          [c.x - pad - 14 - w, c.y + c.height / 2 - h / 2],
        ].filter(([l, t]) => l > 4 && l + w < innerWidth - 4 && t > 4 && t + h < innerHeight - 4);
        const [left, top] = opcoes.find(([l, t]) => !bate(l, t)) || opcoes[0] || [c.x - pad, c.y + c.height + pad + 10];
        tag.style.left = left + 'px';
        tag.style.top = top + 'px';
      }
    }
    document.body.appendChild(camada);
  }, caixas);
  return caixas;
}

/**
 * Recorta o print em volta das marcações (aproxima a imagem para o cliente enxergar melhor),
 * mantendo pelo menos 960x540 da tela para dar contexto. `telaInteira: true` no passo desliga.
 */
function recorte(caixas, passo, tela) {
  if (!caixas.length || passo.telaInteira) return undefined;
  const M = 60, MIN_W = 1100, MIN_H = 619;
  let x1 = Math.min(...caixas.map(c => c.x)) - M - 50, y1 = Math.min(...caixas.map(c => c.y)) - M;
  let x2 = Math.max(...caixas.map(c => c.x + c.width)) + M + (caixas.some(c => c.legenda) ? 280 : 0), y2 = Math.max(...caixas.map(c => c.y + c.height)) + M; // +280: legendas à direita
  // Dentro de uma janela: mostra a janela inteira (se couber na tela), para o cliente se localizar.
  const jan = caixas.find(c => c.janela)?.janela;
  if (jan && jan.height <= tela.height) { x1 = Math.min(x1, jan.x - 20); y1 = Math.min(y1, jan.y - 20); x2 = Math.max(x2, jan.x + jan.width + 20); y2 = Math.max(y2, jan.y + jan.height + 20); }
  let w = Math.max(x2 - x1, MIN_W), h = Math.max(y2 - y1, MIN_H);
  if (w / h > 16 / 9) h = w * 9 / 16; else w = h * 16 / 9;   // mantém o formato 16:9
  w = Math.min(w, tela.width); h = Math.min(h, tela.height);
  const cx = (x1 + x2) / 2, cy = (y1 + y2) / 2;
  const x = Math.max(0, Math.min(cx - w / 2, tela.width - w)), y = Math.max(0, Math.min(cy - h / 2, tela.height - h));
  return { x, y, width: w, height: h };
}

/**
 * Privacidade: desfoca dados reais (nomes nas tabelas, valores em R$, CPF/CNPJ, telefone, e-mail)
 * antes do print, para a central não mostrar dados de clientes. Ligado por padrão;
 * desligue com TUTORIAL_DESFOCAR=0 (só numa empresa 100% fictícia). Os campos marcados ficam nítidos.
 */
async function desfocarDados(page, passo = {}) {
  if (process.env.TUTORIAL_DESFOCAR === '0') return;
  const extras = lerExtrasPrivacidade();
  await page.evaluate(desfocarNaPagina, { extras, tudo: !!passo.desfocarTudo, campos: !!passo.desfocarCampos });
}

/** Roda dentro da página. Exportada para o vídeo aplicar o desfoque antes de cada quadro. */
function desfocarNaPagina({ extras, tudo, campos }) {
    const SENSIVEL = /…\s?\d{4,}|\b\d{5,}\b|\bDoc\.?\s?\d+|\b[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}\b|R\$\s?-?[\d.,]+(\s?mil)?|\b\d{1,3}(\.\d{3})*,\d{2}\b|\b\d+([.,]\d+)?\s?mil\b|\bOS\s?\d{2,}|\bn[ºo°]\s?\d{2,}|#\d{3,}|\d+\s+\S+\(\S+\)\s+encontrad|Todo dia \d+|R\$\s?-?[\d.]+,\d{2}|\d{3}\.\d{3}\.\d{3}-\d{2}|\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}|\(?\d{2}\)?\s?9?\d{4}-?\d{4}|[\w.+-]+@[\w-]+\.[\w.]+|\b[A-Z]{3}-?\d[A-Z0-9]\d{2}\b/;
    const marcados = [...document.querySelectorAll('[data-tutorial-alvo]')];
    // Protege o elemento marcado e quem o contém; o que está DENTRO dele ainda é desfocado se for dado sensível.
    const protegido = el => el.closest('#__tutorial_marcas,#__cortina,#__legenda,#__cursor') || marcados.some(m => m === el || el.contains(m));
    const protegidoForte = el => protegido(el) || marcados.some(m => m.contains(el));
    const borrar = el => { if (!protegido(el) && !el.closest('aside')) el.setAttribute('data-tutorial-blur', ''); };
    const borrarForte = el => { if (!protegidoForte(el) && !el.closest('aside')) el.setAttribute('data-tutorial-blur', ''); };
    document.querySelectorAll('tbody td, [role="row"] [role="cell"], [role="dialog"] li').forEach(borrarForte);
    // Campos preenchidos com dados reais (CNPJ, telefone, endereço...): o valor não é texto da página, então confere o input.
    document.querySelectorAll('input, textarea').forEach(i => {
      const v = String(i.value || '');
      // Valores fictícios digitados pelos próprios tutoriais continuam legíveis.
      const DEMO = ['Maria da Silva', 'maria@minhaloja.com.br', 'Mouse sem fio', 'senha1234', 'contas'];
      if (DEMO.includes(v.trim())) return;
      // Dado real em campo: desfoca mesmo que seja o campo marcado (a bolinha e o contorno continuam nítidos).
      if (campos ? v.trim() : (SENSIVEL.test(v) || /\d{8,}/.test(v.replace(/\D/g, '')))) i.setAttribute('data-tutorial-blur', '');
    });
    // `desfocarTudo`: só o menu e o que está marcado ficam nítidos (ex.: Dashboard com números da empresa).
    // Mantém legível só a "estrutura" da tela: títulos, cabeçalhos de coluna, rótulos de campo e abas.
    const ESTRUTURA = 'h1,h2,h3,th,label,[role="tab"],nav,[role="navigation"]';
    if (tudo) document.querySelectorAll('body *').forEach(e => {
      // Elemento com texto próprio (mesmo misturado com <b>, <span>...) também entra.
      const temTextoProprio = [...e.childNodes].some(c => c.nodeType === 3 && c.textContent.trim());
      if ((e.children.length && !temTextoProprio) || !e.textContent.trim()) return;
      const titulo = e.closest('h2,h3');
      if (titulo && (titulo.textContent.length > 40 || /\d/.test(titulo.textContent))) { borrarForte(e); return; }
      if (e.closest(ESTRUTURA)) return;
      borrarForte(e);
    });
    // Gráficos (revelam o tamanho do faturamento): qualquer svg/canvas grande.
    document.querySelectorAll('svg, canvas').forEach(g => { const r = g.getBoundingClientRect(); if (r.width > 150 && r.height > 80) borrar(g); });
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    const extra = t => extras.some(x => t.includes(x));
    for (let n; (n = walker.nextNode());) {
      const t = n.textContent;
      if (!n.parentElement || n.parentElement.closest('#__tutorial_marcas,#__cortina,#__legenda')) continue;
      if (extra(t)) n.parentElement.setAttribute('data-tutorial-blur', '');
      else if (SENSIVEL.test(t)) borrar(n.parentElement);
    }
    // O React divide textos como "Venda #" + "32486" em pedaços: confere também o texto próprio de cada elemento.
    document.querySelectorAll('body *').forEach(el => {
      if (el.closest('#__tutorial_marcas,#__cortina,#__legenda,#__cursor') || ['SCRIPT', 'STYLE'].includes(el.tagName)) return;
      const proprio = [...el.childNodes].filter(c => c.nodeType === 3).map(c => c.textContent).join('');
      if (proprio.trim() && proprio.length < 300 && SENSIVEL.test(proprio)) borrar(el);
      const inteiro = el.textContent || '';
      if (inteiro.length < 120 && el.children.length <= 4 && extra(inteiro)) el.setAttribute('data-tutorial-blur', '');
    });
    if (!document.getElementById('__tutorial_blur')) {
      const st = document.createElement('style');
      st.id = '__tutorial_blur';
      st.textContent = '[data-tutorial-blur]{filter:blur(9px)!important}';
      document.head.appendChild(st);
    }
}

function lerExtrasPrivacidade() {
  try { return JSON.parse(fs.readFileSync(path.join(__dirname, 'privacidade.json'), 'utf8')).textos || []; } catch { return []; }
}

async function limparMarcas(page) {
  await page.evaluate(() => {
    document.getElementById('__tutorial_blur')?.remove();
    document.querySelectorAll('[data-tutorial-blur]').forEach(e => e.removeAttribute('data-tutorial-blur'));
    document.querySelectorAll('[data-tutorial-alvo]').forEach(e => e.removeAttribute('data-tutorial-alvo'));
  });
  await page.evaluate(() => document.getElementById('__tutorial_marcas')?.remove());
}

async function executar(page, acao, roteiro) {
  if (!acao) return;
  const el = achar(page, acao.alvo);
  if (acao.clicar !== undefined || acao.tipo === 'clicar') {
    const texto = (await el.innerText().catch(() => '')) + ' ' + (await el.getAttribute('aria-label').catch(() => '') || '');
    const naJanela = await el.evaluate(e => !!e.closest('[role="dialog"],[role="alertdialog"]')).catch(() => false);
    // `seguro: true` = botão que só abre uma janela de conferência (não grava nada sozinho).
    if (!acao.seguro && (BOTOES_PERIGOSOS.test(texto) || (naJanela && BOTOES_PERIGOSOS_JANELA.test(texto.trim()))) && !roteiro.gravaDados) {
      console.log(`   (segurança) não cliquei em "${texto.trim()}" — só marquei.`);
      return;
    }
    await el.click();
  } else if (acao.tipo === 'preencher') {
    await el.fill(acao.valor || '');
  } else if (acao.tipo === 'escolher') {
    await el.selectOption({ label: acao.valor });
  } else if (acao.tipo === 'tecla') {
    await page.keyboard.press(acao.tecla);
  }
  await page.waitForTimeout(acao.espera || 900);
}

/** Super Admin vendo uma empresa: TUTORIAL_VER_EMPRESA=EMP_... acrescenta ?empresa= em cada página. */
function comEmpresa(rota) {
  const emp = process.env.TUTORIAL_VER_EMPRESA;
  if (!emp) return rota;
  return rota + (rota.includes('?') ? '&' : '?') + 'empresa=' + encodeURIComponent(emp);
}

/** Deixa a tela "limpa" para o print: espera carregar e esconde a faixa de Super Admin. */
async function prepararTela(page) {
  await page.waitForFunction(() => !document.querySelector('.animate-spin, [aria-busy="true"]'), null, { timeout: 15000 }).catch(() => {});
  await page.evaluate(() => {
    const w = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    for (let n; (n = w.nextNode());) {
      if (!/Modo superadmin/i.test(n.textContent)) continue;
      let el = n.parentElement;
      while (el.parentElement && el.parentElement !== document.body && el.parentElement.getBoundingClientRect().height < 140) el = el.parentElement;
      el.style.setProperty('display', 'none', 'important');
    }
  });
  await page.waitForTimeout(200);
}

async function entrar(context, page) {
  const email = process.env.TUTORIAL_EMAIL, senha = process.env.TUTORIAL_SENHA;
  await page.goto(URL_BASE + '/', { waitUntil: 'load' }).catch(() => {});
  await page.waitForTimeout(2500);
  if (!/\/login/.test(page.url())) return true; // sessão salva ainda vale
  // Link de acesso único (gerado pela plataforma Base44 para o dono do app). Vale ~60 segundos.
  if (process.env.TUTORIAL_LINK) {
    const link = new URL(process.env.TUTORIAL_LINK);
    const destino = new URL(URL_BASE + '/' + link.search);
    await page.goto(destino.toString(), { waitUntil: 'load' }).catch(() => {});
    await page.waitForTimeout(6000);
    if (/\/login/.test(page.url())) { console.log('O link de acesso não funcionou (pode ter expirado).'); return false; }
    await context.storageState({ path: SESSAO });
    return true;
  }
  const empresa = process.env.TUTORIAL_EMPRESA, usuario = process.env.TUTORIAL_USUARIO;
  if (empresa && usuario && senha) {
    // Login de funcionário: código/CNPJ da empresa + usuário + senha (não precisa de e-mail).
    await page.goto(URL_BASE + '/entrar-funcionario', { waitUntil: 'load' });
    await page.waitForTimeout(2000);
    await page.getByPlaceholder('EMP_... ou 00.000.000/0001-00').fill(empresa);
    await page.getByPlaceholder('ex.: joao.silva').fill(usuario);
  } else if (email && senha) {
    await page.getByPlaceholder('seu@email.com').fill(email);
  } else return false;
  await page.locator('input[type="password"]').first().fill(senha);
  await page.getByRole('button', { name: /^Entrar( com e-mail)?$/ }).first().click();
  await page.waitForURL(u => !/\/login/.test(String(u)), { timeout: 30000 }).catch(() => {});
  await page.waitForTimeout(3000);
  if (/\/login|mfa|verifica/i.test(page.url())) {
    console.log('Não consegui entrar (senha errada ou verificação em duas etapas ligada para esse usuário).');
    return false;
  }
  await context.storageState({ path: SESSAO });
  return true;
}

async function main() {
  const roteiros = carregarRoteiros(process.argv.slice(2));
  if (!roteiros.length) { console.log('Nenhum roteiro encontrado.'); return; }
  const browser = await chromium.launch();
  const context = await browser.newContext({
    viewport: { width: 1366, height: 768 },
    deviceScaleFactor: 2,
    locale: 'pt-BR',
    ...(fs.existsSync(SESSAO) ? { storageState: SESSAO } : {}),
  });
  const page = await context.newPage();
  let logado = null;
  const relatorio = [];

  for (const r of roteiros) {
    console.log(`\n▶ ${r.titulo}`);
    if (r.precisaLogin !== false) {
      if (logado === null) logado = await entrar(context, page);
      if (!logado) { console.log('   pulado: precisa de login (defina TUTORIAL_EMAIL e TUTORIAL_SENHA, ou TUTORIAL_EMPRESA, TUTORIAL_USUARIO e TUTORIAL_SENHA).'); relatorio.push({ id: r.id, ok: false, motivo: 'sem login' }); continue; }
    }
    const pasta = path.join(PASTA_IMG, r.id);
    fs.mkdirSync(pasta, { recursive: true });
    let falhas = 0;
    for (let i = 0; i < r.passos.length; i++) {
      const p = r.passos[i];
      const n = i + 1;
      let ok = false, erroFinal;
      for (let tentativa = 1; tentativa <= 2 && !ok; tentativa++) {
       try {
        if (tentativa > 1) { await limparMarcas(page).catch(() => {}); await page.keyboard.press('Escape').catch(() => {}); await page.waitForTimeout(4000); if (!p.ir) throw erroFinal; }
        if (p.ir) { await page.waitForTimeout(Number(process.env.TUTORIAL_PAUSA_TELA || 3000)); await page.goto(URL_BASE + comEmpresa(p.ir), { waitUntil: 'load' }).catch(() => {}); await page.waitForTimeout(p.espera || 3500); }
        for (const a of p.antes || []) await executar(page, a, r);
        await prepararTela(page);
        if (p.semPrint) { console.log(`   – passo ${n}: ${p.titulo} (só texto)`); for (const a of p.depois || []) await executar(page, a, r); ok = true; continue; }
        const marcas = (p.marcar || []).map((m, j) => ({ ...m, numero: p.marcar.length > 1 ? `${n}${String.fromCharCode(97 + j)}` : n }));
        const caixas = marcas.length ? await marcar(page, marcas) : [];
        await desfocarDados(page, p);
        // Segunda passada: pega o que a tela terminou de carregar depois da primeira.
        await page.waitForTimeout(1200);
        await desfocarDados(page, p);
        await page.waitForTimeout(300);
        await page.screenshot({ path: path.join(pasta, `passo-${n}.png`), clip: recorte(caixas, p, page.viewportSize()) });
        await limparMarcas(page);
        console.log(`   ✔ passo ${n}: ${p.titulo}`);
        for (const a of p.depois || []) await executar(page, a, r);
        ok = true;
       } catch (e) { erroFinal = e; }
      }
      try {
        if (!ok) throw erroFinal;
      } catch (e) {
        falhas++;
        console.log(`   ✖ passo ${n}: ${p.titulo} — ${String(e?.message || e).split('\n')[0]}`);
        // Nunca salva print de passo que falhou (sairia sem marcação e sem o desfoque dos dados).
        fs.rmSync(path.join(pasta, `passo-${n}.png`), { force: true });
        await limparMarcas(page).catch(() => {});
      }
    }
    relatorio.push({ id: r.id, ok: falhas === 0, falhas });
    // Pausa entre tutoriais para não estourar o limite de consultas do Base44 (210 por minuto por usuário).
    await page.waitForTimeout(Number(process.env.TUTORIAL_PAUSA || 8000));
  }
  fs.writeFileSync(path.join(process.env.TUTORIAL_SAIDA ? PASTA_IMG : __dirname, '.ultima-captura.json'), JSON.stringify(relatorio, null, 2));
  await browser.close();
  console.log('\nPronto. Agora rode: node tutoriais/gerar-ajuda.js');
}

module.exports = { URL_BASE, SESSAO, BOTOES_PERIGOSOS, BOTOES_PERIGOSOS_JANELA, carregarRoteiros, achar, marcar, desfocarDados, desfocarNaPagina, lerExtrasPrivacidade, limparMarcas, executar, comEmpresa, prepararTela, entrar };
if (require.main === module) main();
