#!/usr/bin/env node
/**
 * Gera o texto de um arquivo de tutoriais da Ajuda de DENTRO do sistema (base44/shared/tutoriaisAjuda/pN.js)
 * a partir dos roteiros, no mesmo formato dos que já estão lá.
 *
 * Uso: node tutoriais/ajuda-sistema.js <saida.js> <id> [id...]
 *   ex.: node tutoriais/ajuda-sistema.js /tmp/p5.js funcionarios-salario ... balanco
 * Roteiro com `somente_admin` nunca entra (vídeo/tutorial interno da equipe).
 */
const fs = require('fs');
const C = require('./capturar.js');

const [saida, ...ids] = process.argv.slice(2);
if (!saida || !ids.length) { console.log('Uso: node tutoriais/ajuda-sistema.js <saida.js> <id> [id...]'); process.exit(1); }
const roteiros = C.carregarRoteiros(ids).filter((r) => !r.somente_admin);
const faltou = ids.filter((id) => !roteiros.some((r) => r.id === id));
if (faltou.length) { console.error('Sem roteiro (ou só do Super Admin): ' + faltou.join(', ')); process.exit(1); }
const lista = ids.map((id) => roteiros.find((r) => r.id === id)).map((r) => ({
  id: r.id, grupo: r.grupo, titulo: r.titulo, resumo: r.resumo || '',
  passos: r.passos.map((p, i) => ({ titulo: p.titulo, texto: p.texto, ...(p.dica ? { dica: p.dica } : {}), img: `img-web/${r.id}/passo-${i + 1}.webp` })),
}));
fs.writeFileSync(saida, 'export default ' + JSON.stringify(lista) + ';\n');
console.log(`✅ ${lista.length} tutorial(is) → ${saida}`);
