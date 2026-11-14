#!/usr/bin/env node
/**
 * Gera a Central de Ajuda (ajuda/index.html) a partir dos roteiros + prints capturados.
 * Uso: node tutoriais/gerar-ajuda.js
 * O resultado é uma página única, sem dependências, que pode ser hospedada junto do sistema
 * (ex.: /ajuda/#clientes) ou aberta direto no navegador.
 */
const fs = require('fs');
const path = require('path');

const RAIZ = path.resolve(__dirname, '..');
const PASTA_ROTEIROS = path.join(__dirname, 'roteiros');
const SAIDA = path.join(RAIZ, 'ajuda', 'index.html');

const roteiros = fs.readdirSync(PASTA_ROTEIROS).filter(f => f.endsWith('.js'))
  .map(f => require(path.join(PASTA_ROTEIROS, f)))
  .sort((a, b) => (a.ordem || 99) - (b.ordem || 99));

const dados = roteiros.map(r => ({
  id: r.id, grupo: r.grupo || 'Outros', titulo: r.titulo, resumo: r.resumo || '', antes: r.antesDeComecar || '',
  passos: r.passos.map((p, i) => {
    const img = `img/${r.id}/passo-${i + 1}.png`;
    return { titulo: p.titulo, texto: p.texto || '', dica: p.dica || '', atencao: p.atencao || '',
      img: fs.existsSync(path.join(RAIZ, 'ajuda', img)) ? img : '' };
  }),
}));

const html = `<!doctype html>
<html lang="pt-BR">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Central de Ajuda</title>
<style>
:root{--azul:#0b1a4a;--azul2:#1d3a8a;--vermelho:#ef4444;--fundo:#f4f6fb;--card:#fff;--texto:#1f2937;--suave:#6b7280;--borda:#e5e7eb;--dica:#ecfdf5;--dica-b:#10b981;--aten:#fff7ed;--aten-b:#f97316}
*{box-sizing:border-box}
body{margin:0;font-family:system-ui,-apple-system,"Segoe UI",Roboto,Arial,sans-serif;background:var(--fundo);color:var(--texto);font-size:17px;line-height:1.55}
a{color:inherit}
header{background:linear-gradient(135deg,var(--azul),var(--azul2));color:#fff;padding:22px 20px 26px}
header .wrap{max-width:1180px;margin:0 auto}
header h1{margin:0 0 4px;font-size:26px}
header p{margin:0 0 14px;opacity:.85}
#busca{width:100%;max-width:560px;padding:13px 16px;border-radius:12px;border:0;font-size:17px;outline:none;box-shadow:0 4px 14px rgba(0,0,0,.2)}
.layout{max-width:1180px;margin:0 auto;display:grid;grid-template-columns:270px 1fr;gap:24px;padding:24px 20px 60px}
nav{position:sticky;top:16px;align-self:start;background:var(--card);border:1px solid var(--borda);border-radius:14px;padding:12px;max-height:calc(100vh - 32px);overflow:auto}
nav h3{font-size:12px;text-transform:uppercase;letter-spacing:.06em;color:var(--suave);margin:14px 8px 6px}
nav h3:first-child{margin-top:4px}
nav a{display:block;text-decoration:none;padding:8px 10px;border-radius:9px;font-size:15px}
nav a:hover{background:#eef2ff}
nav a.ativo{background:var(--azul);color:#fff;font-weight:600}
main{min-width:0}
.inicio h2{margin-top:0}
.grade{display:grid;grid-template-columns:repeat(auto-fill,minmax(250px,1fr));gap:14px}
.cartao{background:var(--card);border:1px solid var(--borda);border-radius:14px;padding:16px;text-decoration:none;display:block;transition:.15s}
.cartao:hover{border-color:var(--azul2);box-shadow:0 6px 18px rgba(29,58,138,.12);transform:translateY(-2px)}
.cartao small{color:var(--suave);font-size:12px;text-transform:uppercase;letter-spacing:.05em}
.cartao b{display:block;margin:4px 0;font-size:17px}
.cartao span{color:var(--suave);font-size:15px}
.cartao em{display:inline-block;margin-top:8px;font-style:normal;font-size:13px;color:var(--azul2);font-weight:600}
.tutorial h2{margin:0 0 4px;font-size:28px}
.tutorial .resumo{color:var(--suave);margin:0 0 18px}
.voltar{display:inline-block;margin-bottom:12px;font-size:15px;color:var(--azul2);text-decoration:none}
.indice{background:var(--card);border:1px solid var(--borda);border-radius:14px;padding:14px 18px;margin-bottom:22px}
.indice ol{margin:6px 0 0;padding-left:22px}
.indice li{margin:3px 0}
.indice a{text-decoration:none;color:var(--azul2)}
.passo{background:var(--card);border:1px solid var(--borda);border-radius:16px;padding:20px;margin-bottom:20px;scroll-margin-top:14px}
.passo-topo{display:flex;gap:14px;align-items:flex-start}
.num{flex:0 0 auto;width:42px;height:42px;border-radius:50%;background:var(--vermelho);color:#fff;font-weight:800;font-size:20px;display:flex;align-items:center;justify-content:center;border:3px solid #fff;box-shadow:0 2px 8px rgba(239,68,68,.45)}
.passo h3{margin:6px 0 4px;font-size:20px}
.passo p{margin:0}
.passo img{display:block;width:100%;margin-top:14px;border-radius:12px;border:1px solid var(--borda);cursor:zoom-in;box-shadow:0 4px 16px rgba(0,0,0,.08)}
.caixa{margin-top:12px;padding:11px 14px;border-radius:10px;font-size:16px}
.caixa.dica{background:var(--dica);border-left:5px solid var(--dica-b)}
.caixa.aten{background:var(--aten);border-left:5px solid var(--aten-b)}
.antes{background:#eff6ff;border-left:5px solid #3b82f6;padding:11px 14px;border-radius:10px;margin-bottom:18px}
.sem-img{margin-top:14px;padding:22px;border:2px dashed var(--borda);border-radius:12px;color:var(--suave);text-align:center;font-size:15px}
.fim{text-align:center;background:var(--card);border:1px solid var(--borda);border-radius:16px;padding:22px}
.fim b{font-size:20px}
.nav-tut{display:flex;justify-content:space-between;gap:10px;margin-top:16px}
.nav-tut a{background:var(--azul);color:#fff;text-decoration:none;padding:10px 16px;border-radius:10px;font-weight:600;font-size:15px}
#zoom{position:fixed;inset:0;background:rgba(0,0,0,.85);display:none;align-items:center;justify-content:center;padding:16px;z-index:10;cursor:zoom-out}
#zoom img{max-width:100%;max-height:100%;border-radius:8px}
.vazio{color:var(--suave)}
@media (max-width:860px){.layout{grid-template-columns:1fr;padding:16px}nav{position:static;max-height:none}body.lendo nav{display:none}.passo{padding:14px}.tutorial h2{font-size:23px}}
@media print{header,nav,.nav-tut,.voltar{display:none}.layout{display:block}.passo{break-inside:avoid}}
</style>
</head>
<body>
<header><div class="wrap">
  <h1>Central de Ajuda</h1>
  <p>Tutoriais passo a passo, com imagens. Siga os números vermelhos na tela.</p>
  <input id="busca" type="search" placeholder="O que você quer fazer? Ex.: cadastrar cliente, fazer venda...">
</div></header>
<div class="layout">
  <nav id="menu"></nav>
  <main id="conteudo"></main>
</div>
<div id="zoom"><img alt=""></div>
<script>
const TUTORIAIS = ${JSON.stringify(dados)};
const $ = s => document.querySelector(s);
const esc = s => String(s).replace(/[&<>"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const norm = s => String(s).normalize('NFD').replace(/[\\u0300-\\u036f]/g,'').toLowerCase();
const grupos = [...new Set(TUTORIAIS.map(t => t.grupo))];

function menu(atual){
  $('#menu').innerHTML = '<a href="#" class="'+(atual?'':'ativo')+'">🏠 Início</a>' + grupos.map(g =>
    '<h3>'+esc(g)+'</h3>' + TUTORIAIS.filter(t=>t.grupo===g).map(t =>
      '<a href="#'+t.id+'" class="'+(t.id===atual?'ativo':'')+'">'+esc(t.titulo)+'</a>').join('')).join('');
}
function cartoes(lista){
  if(!lista.length) return '<p class="vazio">Nenhum tutorial encontrado. Tente outra palavra.</p>';
  return '<div class="grade">'+lista.map(t =>
    '<a class="cartao" href="#'+t.id+'"><small>'+esc(t.grupo)+'</small><b>'+esc(t.titulo)+'</b><span>'+esc(t.resumo)+'</span><br><em>'+t.passos.length+' passos →</em></a>').join('')+'</div>';
}
function inicio(filtro){
  document.body.classList.remove('lendo');
  menu('');
  const q = norm(filtro||'').split(/\\s+/).filter(Boolean);
  const lista = q.length ? TUTORIAIS.filter(t => { const txt = norm([t.titulo,t.resumo,t.grupo,...t.passos.map(p=>p.titulo+' '+p.texto)].join(' ')); return q.every(w=>txt.includes(w)); }) : TUTORIAIS;
  $('#conteudo').innerHTML = '<section class="inicio">' + (q.length ? '<h2>Resultados</h2>'+cartoes(lista)
    : grupos.map(g => '<h2>'+esc(g)+'</h2>'+cartoes(TUTORIAIS.filter(t=>t.grupo===g))).join('')) + '</section>';
}
function tutorial(t){
  document.body.classList.add('lendo');
  menu(t.id);
  const i = TUTORIAIS.indexOf(t), ant = TUTORIAIS[i-1], prox = TUTORIAIS[i+1];
  $('#conteudo').innerHTML = '<article class="tutorial">'
   + '<a class="voltar" href="#">← Todos os tutoriais</a>'
   + '<h2>'+esc(t.titulo)+'</h2><p class="resumo">'+esc(t.resumo)+'</p>'
   + (t.antes ? '<div class="antes"><b>Antes de começar:</b> '+esc(t.antes)+'</div>' : '')
   + '<div class="indice"><b>Neste tutorial:</b><ol>'+t.passos.map((p,n)=>'<li><a href="#'+t.id+'/'+(n+1)+'">'+esc(p.titulo)+'</a></li>').join('')+'</ol></div>'
   + t.passos.map((p,n) => '<section class="passo" id="p'+(n+1)+'"><div class="passo-topo"><div class="num">'+(n+1)+'</div><div>'
      + '<h3>'+esc(p.titulo)+'</h3><p>'+esc(p.texto)+'</p></div></div>'
      + (p.img ? '<img loading="lazy" src="'+p.img+'" alt="Passo '+(n+1)+': '+esc(p.titulo)+'">' : '<div class="sem-img">Imagem deste passo ainda não capturada.</div>')
      + (p.atencao ? '<div class="caixa aten">⚠️ <b>Atenção:</b> '+esc(p.atencao)+'</div>' : '')
      + (p.dica ? '<div class="caixa dica">💡 <b>Dica:</b> '+esc(p.dica)+'</div>' : '')
      + '</section>').join('')
   + '<div class="fim"><b>✅ Pronto!</b><br>Ficou com dúvida? Fale com o suporte.</div>'
   + '<div class="nav-tut">'+(ant?'<a href="#'+ant.id+'">← '+esc(ant.titulo)+'</a>':'<span></span>')+(prox?'<a href="#'+prox.id+'">'+esc(prox.titulo)+' →</a>':'')+'</div>'
   + '</article>';
}
function rota(){
  const [id, passo] = location.hash.slice(1).split('/');
  const t = TUTORIAIS.find(x => x.id === id);
  if (t) { tutorial(t); const alvo = passo && document.getElementById('p'+passo); alvo ? alvo.scrollIntoView() : scrollTo(0,0); }
  else inicio($('#busca').value);
}
$('#busca').addEventListener('input', e => { if (location.hash) history.replaceState(null,'',' '); inicio(e.target.value); });
$('#conteudo').addEventListener('click', e => { if (e.target.matches('.passo img')) { $('#zoom img').src = e.target.src; $('#zoom').style.display = 'flex'; } });
$('#zoom').addEventListener('click', () => $('#zoom').style.display = 'none');
addEventListener('hashchange', rota);
rota();
</script>
</body>
</html>`;

fs.mkdirSync(path.dirname(SAIDA), { recursive: true });
fs.writeFileSync(SAIDA, html);
const total = dados.reduce((s, t) => s + t.passos.length, 0), comImg = dados.reduce((s, t) => s + t.passos.filter(p => p.img).length, 0);
console.log(`Central de Ajuda gerada: ${path.relative(RAIZ, SAIDA)} — ${dados.length} tutoriais, ${comImg}/${total} passos com imagem.`);
