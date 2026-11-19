#!/usr/bin/env node
/**
 * Gera a Central de Ajuda (ajuda/index.html) a partir dos roteiros + prints capturados.
 * Uso: node tutoriais/gerar-ajuda.js
 * O resultado é uma página única, sem dependências, que pode ser hospedada junto do sistema
 * (ex.: /ajuda/#cadastrar-cliente) ou aberta direto no navegador. A logo fica em ajuda/logo.webp.
 */
const fs = require('fs');
const { execFileSync } = require('child_process');
const path = require('path');

const RAIZ = path.resolve(__dirname, '..');
const PASTA_ROTEIROS = path.join(__dirname, 'roteiros');
const SAIDA = path.join(RAIZ, 'ajuda', 'index.html');

const roteiros = fs.readdirSync(PASTA_ROTEIROS).filter(f => f.endsWith('.js'))
  .map(f => require(path.join(PASTA_ROTEIROS, f)))
  .sort((a, b) => (a.ordem || 99) - (b.ordem || 99));

// Cópias leves (WebP) para o celular; se o Python/Pillow não existir, usa os PNG originais.
let web = false;
try { execFileSync('python3', [path.join(__dirname, 'otimizar.py')], { stdio: 'inherit' }); web = true; } catch { console.log('Sem Python/Pillow: usando os PNG originais.'); }

const dados = roteiros.map(r => ({
  id: r.id, grupo: r.grupo || 'Outros', titulo: r.titulo, resumo: r.resumo || '', antes: r.antesDeComecar || '',
  destaque: !!r.destaque,
  video: fs.existsSync(path.join(RAIZ, 'ajuda', 'videos', r.id + '.mp4')) ? `videos/${r.id}.mp4` : '',
  capa: fs.existsSync(path.join(RAIZ, 'ajuda', 'videos', r.id + '.jpg')) ? `videos/${r.id}.jpg` : '',
  passos: r.passos.map((p, i) => {
    const png = `img/${r.id}/passo-${i + 1}.png`, webp = `img-web/${r.id}/passo-${i + 1}.webp`;
    const img = web && fs.existsSync(path.join(RAIZ, 'ajuda', webp)) ? webp : png;
    return { titulo: p.titulo, texto: p.texto || '', dica: p.dica || '', atencao: p.atencao || '',
      img: !p.semPrint && fs.existsSync(path.join(RAIZ, 'ajuda', img)) ? img : '', semPrint: !!p.semPrint };
  }),
}));

// Os mais procurados aparecem em destaque no início (marque `destaque: true` no roteiro).
const MAIS_PROCURADOS = ['vender-no-pdv', 'cadastrar-cliente', 'cadastrar-produto', 'emitir-nota', 'contas-a-receber', 'caixa-sangria-fechamento'];
const LOGO = fs.existsSync(path.join(RAIZ, 'ajuda', 'logo.webp')) ? 'logo.webp' : (fs.existsSync(path.join(RAIZ, 'ajuda', 'logo.png')) ? 'logo.png' : '');

// Ícones de traço simples (24x24), um por grupo do menu do sistema.
const ICONES = {
  'Primeiros passos': '<path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/><path d="m10 17 5-5-5-5"/><path d="M15 12H3"/>',
  'Cadastros': '<rect x="8" y="2" width="8" height="4" rx="1"/><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><path d="M9 12h6M9 16h6"/>',
  'Comercial': '<circle cx="9" cy="20" r="1.5"/><circle cx="18" cy="20" r="1.5"/><path d="M2 3h3l2.6 12.4a2 2 0 0 0 2 1.6h8.8a2 2 0 0 0 2-1.6L22 7H6"/>',
  'Financeiro': '<path d="M19 7V5a2 2 0 0 0-2-2H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v4h-3a2 2 0 0 0 0 4h3v3a1 1 0 0 1-1 1H5a2 2 0 0 1-2-2V5"/>',
  'Fiscal': '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6M8 13h8M8 17h5"/>',
  'Estoque': '<path d="M21 8 12 3 3 8v8l9 5 9-5z"/><path d="m3 8 9 5 9-5M12 13v8"/>',
  'Relatórios': '<path d="M3 3v18h18"/><path d="M8 17v-5M13 17V8M18 17v-9"/>',
  'Configurações': '<path d="M4 21v-7M4 10V3M12 21v-9M12 8V3M20 21v-5M20 12V3M1 14h6M9 8h6M17 16h6"/>',
  'WhatsApp': '<path d="M21 11.5a8.4 8.4 0 0 1-12.4 7.4L3 21l2.1-5.4A8.4 8.4 0 1 1 21 11.5z"/>',
  'Outros': '<circle cx="12" cy="12" r="9"/><path d="M12 8v4l3 2"/>',
};
const icone = g => `<svg viewBox="0 0 24 24" aria-hidden="true">${ICONES[g] || ICONES.Outros}</svg>`;

const html = `<!doctype html>
<html lang="pt-BR">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>Central de Ajuda</title>
<meta name="claude:viewport-fit-sides" content="cover">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Sora:wght@600;700;800&display=swap">
<style>
/* Layout: faixa clara com a logo no canto, busca grande; menu lateral por grupo + conteúdo.
   Cores tiradas da logo da Thiago Informática (azul-marinho e vermelho). */
:root{
  --marinho:#0c1f5c; --marinho-2:#1c3a96; --vermelho:#d7262e; --vermelho-suave:#fde8e8;
  --fundo:#f3f5fa; --card:#ffffff; --texto:#1b2235; --suave:#5d6680; --borda:#e1e6f0;
  --tinta-icone:#e8edfa; --hover:#eef2fb; --dica:#e9f8f1; --dica-b:#14986a; --aten:#fff3e6; --aten-b:#e0730d;
  --antes:#edf3ff; --antes-b:#3d6fe0; --faixa:#ffffff; --sombra:0 10px 30px rgba(12,31,92,.08);
  --f-titulo:"Sora","Segoe UI",system-ui,sans-serif; --f-texto:"Inter","Segoe UI",system-ui,-apple-system,Roboto,Arial,sans-serif;
  color-scheme:light;
}
@media (prefers-color-scheme:dark){:root:not([data-theme="light"]){
  --marinho:#9db4ff; --marinho-2:#7d9bff; --vermelho:#ff5a61; --vermelho-suave:#3a1719;
  --fundo:#0b1020; --card:#141b30; --texto:#e6e9f2; --suave:#99a3bd; --borda:#26304b;
  --tinta-icone:#1d2847; --hover:#1b2440; --dica:#0d2a22; --dica-b:#33c793; --aten:#2e1e0d; --aten-b:#f5a04d;
  --antes:#14213f; --antes-b:#7d9bff; --faixa:#121a2e; --sombra:0 10px 30px rgba(0,0,0,.35); color-scheme:dark}}
:root[data-theme="dark"]{
  --marinho:#9db4ff; --marinho-2:#7d9bff; --vermelho:#ff5a61; --vermelho-suave:#3a1719;
  --fundo:#0b1020; --card:#141b30; --texto:#e6e9f2; --suave:#99a3bd; --borda:#26304b;
  --tinta-icone:#1d2847; --hover:#1b2440; --dica:#0d2a22; --dica-b:#33c793; --aten:#2e1e0d; --aten-b:#f5a04d;
  --antes:#14213f; --antes-b:#7d9bff; --faixa:#121a2e; --sombra:0 10px 30px rgba(0,0,0,.35); color-scheme:dark}
*{box-sizing:border-box}
html{scroll-behavior:smooth}
@media (prefers-reduced-motion:reduce){html{scroll-behavior:auto}*{transition:none!important}}
body{margin:0;font-family:var(--f-texto);background:var(--fundo);color:var(--texto);font-size:17px;line-height:1.6}
a{color:inherit}
svg{width:22px;height:22px;fill:none;stroke:currentColor;stroke-width:2;stroke-linecap:round;stroke-linejoin:round;flex:0 0 auto}
.gutter{padding-left:max(16px,env(safe-area-inset-left,0px));padding-right:max(16px,env(safe-area-inset-right,0px))}
.wrap{max-width:1200px;margin:0 auto}

/* Faixa do topo: logo no canto esquerdo */
header{background:var(--faixa);border-bottom:1px solid var(--borda);position:relative;overflow:hidden}
header::after{content:"";position:absolute;inset:auto 0 0 0;height:4px;background:linear-gradient(90deg,var(--marinho) 0 70%,var(--vermelho) 70% 100%)}
.topo{display:flex;align-items:center;justify-content:space-between;gap:16px;padding-block:14px}
.logo{display:flex;align-items:center;gap:12px;text-decoration:none}
.logo img{height:68px;width:auto;display:block;background:#fff;border-radius:12px;padding:4px 8px}
.logo span{font:600 13px/1.2 var(--f-texto);color:var(--suave);border-left:1px solid var(--borda);padding-left:12px}
.topo .suporte{font-size:14px;color:var(--suave)}
.hero{padding-block:18px 30px}
.hero h1{font:800 clamp(28px,4.2vw,44px)/1.1 var(--f-titulo);margin:0 0 6px;color:var(--marinho);text-wrap:balance;letter-spacing:-.01em}
.hero p{margin:0 0 18px;color:var(--suave);max-width:60ch}
.busca{position:relative;max-width:640px}
.busca svg{position:absolute;left:16px;top:50%;transform:translateY(-50%);color:var(--suave)}
#busca{width:100%;padding:16px 18px 16px 50px;border-radius:14px;border:2px solid var(--borda);background:var(--card);color:var(--texto);font:500 17px var(--f-texto);outline:none;box-shadow:var(--sombra)}
#busca:focus{border-color:var(--marinho-2)}
.chips{display:flex;flex-wrap:wrap;gap:8px;margin-top:12px}
.chips button{border:1px solid var(--borda);background:var(--card);color:var(--texto);border-radius:999px;padding:6px 12px;font:500 14px var(--f-texto);cursor:pointer}
.chips button:hover,.chips button:focus-visible{border-color:var(--marinho-2);outline:none}

.layout{display:grid;grid-template-columns:260px minmax(0,1fr);gap:28px;padding-block:26px 64px}
nav{position:sticky;top:max(16px,env(safe-area-inset-top,0px));align-self:start;background:var(--card);border:1px solid var(--borda);border-radius:16px;padding:10px;max-height:calc(100vh - 32px);overflow:auto}
nav h3{display:flex;align-items:center;gap:8px;font:700 12px var(--f-texto);text-transform:uppercase;letter-spacing:.07em;color:var(--suave);margin:14px 8px 4px}
nav h3 svg{width:16px;height:16px}
nav a{display:block;text-decoration:none;padding:7px 10px 7px 32px;border-radius:9px;font-size:15px;line-height:1.35}
nav a.inicio{padding-left:10px;font-weight:600}
nav a:hover,nav a:focus-visible{background:var(--hover);outline:none}
nav a.ativo{background:var(--marinho);color:var(--card);font-weight:600}
main{min-width:0}

/* Início */
.secao{display:grid;gap:14px;margin-bottom:34px}
.secao-titulo{display:flex;align-items:center;gap:10px;font:700 22px var(--f-titulo);margin:0;color:var(--texto)}
.secao-titulo .ic{width:38px;height:38px;border-radius:11px;display:grid;place-items:center;background:var(--tinta-icone);color:var(--marinho)}
.grade{display:grid;grid-template-columns:repeat(auto-fill,minmax(240px,1fr));gap:14px}
.cartao{display:grid;grid-template-rows:auto 1fr auto;gap:6px;background:var(--card);border:1px solid var(--borda);border-radius:16px;padding:18px;text-decoration:none;transition:transform .15s,box-shadow .15s,border-color .15s}
.cartao:hover,.cartao:focus-visible{transform:translateY(-2px);box-shadow:var(--sombra);border-color:var(--marinho-2);outline:none}
.cartao b{font:700 17px/1.3 var(--f-titulo)}
.cartao span{color:var(--suave);font-size:15px;line-height:1.45}
.cartao em{font-style:normal;font-size:13px;font-weight:600;color:var(--marinho-2);display:flex;align-items:center;gap:6px}
.cartao em i{font-style:normal;background:var(--vermelho-suave);color:var(--vermelho);border-radius:999px;padding:1px 8px}
.destaques .cartao{border-top:4px solid var(--vermelho)}
.destaques .cartao .ic{width:42px;height:42px;border-radius:12px;display:grid;place-items:center;background:var(--tinta-icone);color:var(--marinho);margin-bottom:6px}
.vazio{color:var(--suave)}

/* Tutorial */
.voltar{display:inline-flex;align-items:center;gap:6px;margin-bottom:12px;font-size:15px;font-weight:600;color:var(--marinho-2);text-decoration:none}
.cab-tut{display:flex;gap:14px;align-items:flex-start;margin-bottom:18px}
.cab-tut .ic{width:52px;height:52px;border-radius:14px;display:grid;place-items:center;background:var(--marinho);color:var(--card)}
.cab-tut .ic svg{width:26px;height:26px}
.cab-tut small{font:700 12px var(--f-texto);text-transform:uppercase;letter-spacing:.07em;color:var(--suave)}
.tutorial h2{font:800 clamp(24px,3vw,32px)/1.2 var(--f-titulo);margin:2px 0 4px;text-wrap:balance}
.tutorial .resumo{color:var(--suave);margin:0}
.video{display:grid;gap:6px;margin-bottom:18px}
.video video{width:100%;aspect-ratio:16/9;border-radius:16px;background:#000;box-shadow:var(--sombra)}
.video small{color:var(--suave);font-size:14px}
.cartao em .v{background:var(--marinho);color:var(--card)}
.antes{background:var(--antes);border-left:5px solid var(--antes-b);padding:12px 16px;border-radius:12px;margin-bottom:18px}
.indice{background:var(--card);border:1px solid var(--borda);border-radius:16px;padding:14px 18px;margin-bottom:22px}
.indice ol{margin:8px 0 0;padding:0;list-style:none;display:grid;gap:6px;counter-reset:p}
.indice li{counter-increment:p;display:flex;gap:10px;align-items:baseline}
.indice li::before{content:counter(p);flex:0 0 auto;width:24px;height:24px;border-radius:50%;background:var(--vermelho);color:#fff;font:700 13px/24px var(--f-texto);text-align:center}
.indice a{text-decoration:none;color:var(--marinho-2);font-weight:500}
.passo{background:var(--card);border:1px solid var(--borda);border-radius:18px;padding:20px;margin-bottom:18px;scroll-margin-top:16px;display:grid;gap:14px}
.passo-topo{display:flex;gap:14px;align-items:flex-start}
.num{flex:0 0 auto;width:44px;height:44px;border-radius:50%;background:var(--vermelho);color:#fff;font:800 20px var(--f-titulo);display:grid;place-items:center;border:3px solid var(--card);box-shadow:0 3px 10px rgba(215,38,46,.4)}
.passo h3{margin:6px 0 4px;font:700 20px/1.3 var(--f-titulo)}
.passo p{margin:0;max-width:70ch}
.passo img{display:block;width:100%;border-radius:12px;border:1px solid var(--borda);cursor:zoom-in;box-shadow:var(--sombra)}
.caixa{display:flex;gap:10px;align-items:flex-start;padding:12px 14px;border-radius:12px;font-size:16px}
.caixa svg{margin-top:2px;width:20px;height:20px}
.caixa.dica{background:var(--dica);border-left:5px solid var(--dica-b)} .caixa.dica svg{color:var(--dica-b)}
.caixa.aten{background:var(--aten);border-left:5px solid var(--aten-b)} .caixa.aten svg{color:var(--aten-b)}
.sem-img{padding:22px;border:2px dashed var(--borda);border-radius:12px;color:var(--suave);text-align:center;font-size:15px}
.fim{display:grid;justify-items:center;gap:4px;text-align:center;background:var(--card);border:1px solid var(--borda);border-radius:18px;padding:24px}
.fim b{font:800 22px var(--f-titulo);color:var(--marinho)}
.fim .ok{width:48px;height:48px;border-radius:50%;display:grid;place-items:center;background:var(--dica);color:var(--dica-b)}
.nav-tut{display:flex;flex-wrap:wrap;justify-content:space-between;gap:10px;margin-top:16px}
.nav-tut a{background:var(--marinho);color:var(--card);text-decoration:none;padding:11px 16px;border-radius:12px;font-weight:600;font-size:15px}
.nav-tut a:focus-visible{outline:3px solid var(--vermelho);outline-offset:2px}
#zoom{position:fixed;inset:0;background:rgba(5,10,25,.88);display:none;align-items:center;justify-content:center;padding:max(16px,env(safe-area-inset-top,0px)) max(16px,env(safe-area-inset-right,0px)) max(16px,env(safe-area-inset-bottom,0px)) max(16px,env(safe-area-inset-left,0px));z-index:10;cursor:zoom-out}
#zoom img{max-width:100%;max-height:100%;border-radius:8px}
footer{border-top:1px solid var(--borda);padding-block:20px;color:var(--suave);font-size:14px}
footer .wrap{display:flex;flex-wrap:wrap;gap:10px;align-items:center;justify-content:space-between}
footer img{height:34px;background:#fff;border-radius:8px;padding:2px 6px}
@media (max-width:880px){
  .layout{grid-template-columns:1fr;padding-block:18px 48px}
  nav{position:static;max-height:none} body.lendo nav{display:none}
  .passo{padding:14px} .topo .suporte{display:none} .logo img{height:52px}
}
</style>
</head>
<body>
<header>
  <div class="wrap gutter">
    <div class="topo">
      <a class="logo" href="#">${LOGO ? `<img src="${LOGO}" alt="Thiago Informática Sistemas">` : '<b>Thiago Informática</b>'}<span>Central de Ajuda<br>THGestor</span></a>
      <div class="suporte">Dúvida? Fale com o suporte da Thiago Informática.</div>
    </div>
    <div class="hero">
      <h1>Como podemos ajudar?</h1>
      <p>Tutoriais passo a passo, com a imagem de cada tela. É só seguir as bolinhas vermelhas numeradas.</p>
      <div class="busca">
        <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg>
        <input id="busca" type="search" aria-label="Buscar tutorial" placeholder="O que você quer fazer? Ex.: fazer venda, emitir nota...">
      </div>
      <div class="chips" aria-label="Buscas rápidas">
        <button type="button" data-q="venda">Fazer venda</button><button type="button" data-q="cliente">Cadastrar cliente</button><button type="button" data-q="nota">Nota fiscal</button><button type="button" data-q="caixa">Caixa</button><button type="button" data-q="estoque">Estoque</button>
      </div>
    </div>
  </div>
</header>
<div class="wrap gutter">
  <div class="layout">
    <nav id="menu" aria-label="Tutoriais por assunto"></nav>
    <main id="conteudo"></main>
  </div>
</div>
<footer><div class="wrap gutter">${LOGO ? `<img src="${LOGO}" alt="">` : ''}<span>Central de Ajuda do THGestor · Thiago Informática Sistemas</span></div></footer>
<div id="zoom" role="dialog" aria-label="Imagem ampliada"><img alt=""></div>
<script>
const TUTORIAIS = ${JSON.stringify(dados)};
const DESTAQUES = ${JSON.stringify(MAIS_PROCURADOS)};
const ICONES = ${JSON.stringify(Object.fromEntries(Object.keys(ICONES).map(g => [g, icone(g)])))};
const $ = s => document.querySelector(s);
const esc = s => String(s).replace(/[&<>"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const norm = s => String(s).normalize('NFD').replace(/[\\u0300-\\u036f]/g,'').toLowerCase();
const ic = g => ICONES[g] || ICONES.Outros;
const grupos = [...new Set(TUTORIAIS.map(t => t.grupo))];
const SVG_DICA = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 18h6M10 22h4M12 2a7 7 0 0 0-4 12.7c.6.5 1 1.3 1 2.3h6c0-1 .4-1.8 1-2.3A7 7 0 0 0 12 2z"/></svg>';
const SVG_ATEN = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0zM12 9v4M12 17h.01"/></svg>';
const SVG_OK = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20 6 9 17l-5-5"/></svg>';

function menu(atual){
  $('#menu').innerHTML = '<a href="#" class="inicio '+(atual?'':'ativo')+'">Início</a>' + grupos.map(g =>
    '<h3>'+ic(g)+esc(g)+'</h3>' + TUTORIAIS.filter(t=>t.grupo===g).map(t =>
      '<a href="#'+t.id+'" class="'+(t.id===atual?'ativo':'')+'">'+esc(t.titulo)+'</a>').join('')).join('');
}
const passosCom = t => t.passos.length + ' passo' + (t.passos.length > 1 ? 's' : '');
function cartoes(lista, comIcone){
  if(!lista.length) return '<p class="vazio">Nenhum tutorial encontrado. Tente outra palavra, como "venda", "cliente" ou "nota".</p>';
  return '<div class="grade">'+lista.map(t =>
    '<a class="cartao" href="#'+t.id+'">'+(comIcone?'<div class="ic">'+ic(t.grupo)+'</div>':'')+'<b>'+esc(t.titulo)+'</b><span>'+esc(t.resumo)+'</span><em><i>'+passosCom(t)+'</i>'+(t.video?'<i class="v">▶ vídeo</i>':'')+'Ver tutorial →</em></a>').join('')+'</div>';
}
function inicio(filtro){
  document.body.classList.remove('lendo');
  menu('');
  const q = norm(filtro||'').split(/\\s+/).filter(Boolean);
  if (q.length) {
    const lista = TUTORIAIS.filter(t => { const txt = norm([t.titulo,t.resumo,t.grupo,...t.passos.map(p=>p.titulo+' '+p.texto)].join(' ')); return q.every(w=>txt.includes(w)); });
    $('#conteudo').innerHTML = '<section class="secao"><h2 class="secao-titulo">Resultados para “'+esc(filtro)+'”</h2>'+cartoes(lista, true)+'</section>';
    return;
  }
  const dest = DESTAQUES.map(id => TUTORIAIS.find(t => t.id === id)).filter(Boolean);
  $('#conteudo').innerHTML =
    (dest.length ? '<section class="secao destaques"><h2 class="secao-titulo">Mais procurados</h2>'+cartoes(dest, true)+'</section>' : '') +
    grupos.map(g => '<section class="secao"><h2 class="secao-titulo"><span class="ic">'+ic(g)+'</span>'+esc(g)+'</h2>'+cartoes(TUTORIAIS.filter(t=>t.grupo===g))+'</section>').join('');
}
function tutorial(t){
  document.body.classList.add('lendo');
  menu(t.id);
  const i = TUTORIAIS.indexOf(t), ant = TUTORIAIS[i-1], prox = TUTORIAIS[i+1];
  $('#conteudo').innerHTML = '<article class="tutorial">'
   + '<a class="voltar" href="#">← Todos os tutoriais</a>'
   + '<div class="cab-tut"><div class="ic">'+ic(t.grupo)+'</div><div><small>'+esc(t.grupo)+' · '+passosCom(t)+'</small><h2>'+esc(t.titulo)+'</h2><p class="resumo">'+esc(t.resumo)+'</p></div></div>'
   + (t.video ? '<div class="video"><video controls preload="none" playsinline'+(t.capa?' poster="'+t.capa+'"':'')+' src="'+t.video+'"></video><small>Assista ao vídeo com narração ou siga os passos com imagens logo abaixo.</small></div>' : '')
   + (t.antes ? '<div class="antes"><b>Antes de começar:</b> '+esc(t.antes)+'</div>' : '')
   + '<div class="indice"><b>Neste tutorial</b><ol>'+t.passos.map((p,n)=>'<li><a href="#'+t.id+'/'+(n+1)+'">'+esc(p.titulo)+'</a></li>').join('')+'</ol></div>'
   + t.passos.map((p,n) => '<section class="passo" id="p'+(n+1)+'"><div class="passo-topo"><div class="num">'+(n+1)+'</div><div>'
      + '<h3>'+esc(p.titulo)+'</h3><p>'+esc(p.texto)+'</p></div></div>'
      + (p.img ? '<img loading="lazy" src="'+p.img+'" alt="Passo '+(n+1)+': '+esc(p.titulo)+'">' : p.semPrint ? '' : '<div class="sem-img">Imagem deste passo ainda não capturada.</div>')
      + (p.atencao ? '<div class="caixa aten">'+SVG_ATEN+'<div><b>Atenção:</b> '+esc(p.atencao)+'</div></div>' : '')
      + (p.dica ? '<div class="caixa dica">'+SVG_DICA+'<div><b>Dica:</b> '+esc(p.dica)+'</div></div>' : '')
      + '</section>').join('')
   + '<div class="fim"><div class="ok">'+SVG_OK+'</div><b>Pronto!</b><span>Ficou com dúvida? Fale com o suporte da Thiago Informática.</span></div>'
   + '<div class="nav-tut">'+(ant?'<a href="#'+ant.id+'">← '+esc(ant.titulo)+'</a>':'<span></span>')+(prox?'<a href="#'+prox.id+'">'+esc(prox.titulo)+' →</a>':'')+'</div>'
   + '</article>';
}
function rota(){
  const [id, passo] = location.hash.slice(1).split('/');
  const t = TUTORIAIS.find(x => x.id === id);
  if (t) { tutorial(t); const alvo = passo && document.getElementById('p'+passo); alvo ? alvo.scrollIntoView() : scrollTo(0,0); }
  else inicio($('#busca').value);
}
$('#busca').addEventListener('input', e => { if (location.hash) history.replaceState(null,'',location.pathname); inicio(e.target.value); });
document.querySelectorAll('.chips button').forEach(b => b.addEventListener('click', () => { $('#busca').value = b.dataset.q; if (location.hash) history.replaceState(null,'',location.pathname); inicio(b.dataset.q); $('#conteudo').scrollIntoView(); }));
$('#conteudo').addEventListener('click', e => { if (e.target.matches('.passo img')) { $('#zoom img').src = e.target.src; $('#zoom').style.display = 'flex'; } });
$('#zoom').addEventListener('click', () => $('#zoom').style.display = 'none');
addEventListener('keydown', e => { if (e.key === 'Escape') $('#zoom').style.display = 'none'; });
addEventListener('hashchange', rota);
rota();
</script>
</body>
</html>`;

fs.mkdirSync(path.dirname(SAIDA), { recursive: true });
fs.writeFileSync(SAIDA, html);
const total = dados.reduce((s, t) => s + t.passos.filter(p => !p.semPrint).length, 0), comImg = dados.reduce((s, t) => s + t.passos.filter(p => p.img).length, 0);
console.log(`Central de Ajuda gerada: ${path.relative(RAIZ, SAIDA)} — ${dados.length} tutoriais, ${comImg}/${total} passos com imagem.`);
