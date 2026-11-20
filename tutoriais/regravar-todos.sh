#!/usr/bin/env bash
# Regrava TODOS os vídeos explicativos (ex.: mudou a fala final), publica cada um no Thiaguinho e faz a cópia leve da Central.
# Retoma de onde parou: pula os que já foram regravados depois do arquivo-marca (tutoriais/.regravar-desde).
cd "$(dirname "$0")/.."
[ -f tutoriais/.regravar-desde ] || touch tutoriais/.regravar-desde
( while true; do for pid in $(pgrep -f "node tutoriais/video.js"); do et=$(ps -o etimes= -p $pid | tr -d ' '); [ -n "$et" ] && [ "$et" -gt 900 ] && kill $pid; done; sleep 30; done ) & VIG=$!
ids=$(node -e "const C=require('./tutoriais/capturar.js');console.log(C.carregarRoteiros([]).map(r=>r.id).join(' '))")
for id in $ids; do
  if [ ajuda/videos/$id.mp4 -nt tutoriais/.regravar-desde ]; then continue; fi
  bash tutoriais/gravar-todos.sh $id | grep -E "===|✅|✖|não publiquei"
  if [ ajuda/videos/$id.mp4 -nt tutoriais/.regravar-desde ]; then
    ffmpeg -y -v error -i ajuda/videos/$id.mp4 -vf "scale=1024:-2" -c:v libx264 -preset slow -crf 30 -c:a aac -b:a 64k -ac 1 -movflags +faststart ajuda/videos-web/$id.mp4
    cp ajuda/videos/$id.jpg ajuda/videos-web/ 2>/dev/null
  fi
done
kill $VIG
node tutoriais/gerar-ajuda.js | tail -1
echo REGRAVACAO-FIM
