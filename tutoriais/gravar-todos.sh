#!/usr/bin/env bash
# Grava e publica (Thiaguinho) os vídeos explicativos de todos os roteiros que ainda não têm vídeo.
# Uso: bash tutoriais/gravar-todos.sh [ids...]   (sem ids = todos os que faltam)
cd "$(dirname "$0")/.."
ids="$*"
[ -z "$ids" ] && ids=$(node -e "const C=require('./tutoriais/capturar.js');const fs=require('fs');console.log(C.carregarRoteiros([]).map(r=>r.id).filter(id=>!fs.existsSync('ajuda/videos/'+id+'.mp4')).join(' '))")
for id in $ids; do
  echo "=== $id"
  saida=$(TUTORIAL_VER_EMPRESA=EMP_DEMOTHGE_STOR01 TUTORIAL_PAUSA=0 node tutoriais/video.js $id 2>&1)
  echo "$saida" | grep -E "✅|✖|não achei|segurança"
  if echo "$saida" | grep -q "✅" && ! echo "$saida" | grep -q "✖"; then
    rm -f ajuda/videos-web/$id.mp4  # cópia leve antiga: o publicar refaz a partir do vídeo novo
    node tutoriais/publicar-video.js $id 2>&1 | grep -E "✅|✘|Erro"
  else
    echo "   (não publiquei $id: conferir)"
  fi
  sleep ${PAUSA_ENTRE:-8}  # PAUSA_ENTRE=60 evita o limite de acessos do Base44
done
echo FIM
