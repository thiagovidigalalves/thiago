#!/bin/bash
# Mutirão (27/11/2026, pedido do dono): grava uma lista de vídeos em sequência, um de cada vez (limite de acessos).
# Uso: bash tutoriais/lote-videos.sh id1 id2 ...   → logs em tutoriais/.lote/<id>.log ; NÃO publica (confiro antes).
cd "$(dirname "$0")"; mkdir -p .lote
for id in "$@"; do
  echo "== $id $(date +%H:%M)"
  TUTORIAL_VER_EMPRESA=EMP_DEMOTHGE_STOR01 TUTORIAL_PAUSA=0 timeout 1500 node video.js "$id" > ".lote/$id.log" 2>&1
  r=$?; f=$(grep -c "não achei\|Erro\|erro\|✖" ".lote/$id.log"); echo "   fim $id código=$r avisos=$f $(grep -o '✅.*' .lote/$id.log)"
  sleep 20
done
echo "== LOTE TERMINOU $(date +%H:%M)"
