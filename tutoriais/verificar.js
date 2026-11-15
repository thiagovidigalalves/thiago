#!/usr/bin/env node
/**
 * Confere os roteiros sem abrir o sistema (não precisa de login).
 * Uso: node tutoriais/verificar.js
 * Aponta: id repetido, passo sem título/texto, alvo inválido, ação sem alvo, print faltando.
 */
const fs = require('fs');
const path = require('path');

const PASTA = path.join(__dirname, 'roteiros');
const IMG = path.join(__dirname, '..', 'ajuda', 'img');
const TIPOS_ALVO = ['papel', 'rotulo', 'placeholder', 'texto', 'titulo', 'campo', 'css'];
const TIPOS_ACAO = ['clicar', 'preencher', 'tecla'];
let erros = 0, avisos = 0;
const erro = m => { erros++; console.log('  ✖ ' + m); };
const aviso = m => { avisos++; console.log('  ⚠ ' + m); };

function alvoValido(a) {
  if (typeof a === 'string') return a.trim().length > 0;
  return a && typeof a === 'object' && TIPOS_ALVO.some(t => a[t] !== undefined);
}

const ids = new Map();
let semPrint = 0, totalPassos = 0;
for (const arq of fs.readdirSync(PASTA).filter(f => f.endsWith('.js')).sort()) {
  let r;
  try { r = require(path.join(PASTA, arq)); } catch (e) { console.log(arq); erro('não abre: ' + e.message); continue; }
  console.log(`${arq} — ${r.titulo || '(sem título)'}`);
  if (!r.id || !/^[a-z0-9-]+$/.test(r.id)) erro('id ausente ou com caracteres inválidos (use letras minúsculas, números e hífen)');
  if (ids.has(r.id)) erro(`id "${r.id}" repetido (também em ${ids.get(r.id)})`); else ids.set(r.id, arq);
  for (const c of ['titulo', 'grupo', 'resumo']) if (!r[c]) erro(`falta "${c}"`);
  if (!Array.isArray(r.passos) || !r.passos.length) { erro('sem passos'); continue; }
  if (r.passos.length > 9) aviso(`${r.passos.length} passos: considere dividir em dois tutoriais`);
  if (r.precisaLogin !== false && !r.passos[0].ir) erro('o passo 1 precisa de "ir" (a página onde o tutorial começa)');
  r.passos.forEach((p, i) => {
    const n = `passo ${i + 1}`;
    totalPassos++;
    if (!p.titulo) erro(`${n}: sem título`);
    if (!p.texto) erro(`${n}: sem texto`);
    if (p.ir && !p.ir.startsWith('/')) erro(`${n}: "ir" deve começar com "/"`);
    (p.marcar || []).forEach((m, j) => { if (!alvoValido(m.alvo)) erro(`${n}: marcação ${j + 1} com alvo inválido`); });
    for (const lista of ['antes', 'depois']) (p[lista] || []).forEach((a, j) => {
      if (!TIPOS_ACAO.includes(a.tipo)) erro(`${n}: ${lista}[${j}] com tipo "${a.tipo}" (use ${TIPOS_ACAO.join('/')})`);
      if (a.tipo !== 'tecla' && !alvoValido(a.alvo)) erro(`${n}: ${lista}[${j}] sem alvo válido`);
      if (a.tipo === 'preencher' && a.valor === undefined) erro(`${n}: ${lista}[${j}] preencher sem "valor"`);
    });
    if (!fs.existsSync(path.join(IMG, r.id, `passo-${i + 1}.png`))) semPrint++;
  });
}
console.log(`\n${ids.size} tutoriais, ${totalPassos} passos · ${totalPassos - semPrint} com print, ${semPrint} sem print · ${erros} erro(s), ${avisos} aviso(s).`);
process.exit(erros ? 1 : 0);
