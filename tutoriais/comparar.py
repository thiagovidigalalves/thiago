"""Compara os prints novos (tutoriais/.conferencia) com os atuais (ajuda/img) e diz o que mudou.
Uso: python3 tutoriais/comparar.py  -> imprime JSON {mudou:[], novo:[], igual:n}
Mudança = mais de 3% da imagem diferente (ignora pequenas variações do desfoque e de horário)."""
import json, pathlib, sys
from PIL import Image, ImageChops

raiz = pathlib.Path(__file__).resolve().parent
novos, atuais = raiz / '.conferencia', raiz.parent / 'ajuda' / 'img'
LIMITE = float(sys.argv[1]) if len(sys.argv) > 1 else 0.03

def reduzir(p):
    im = Image.open(p).convert('L')
    return im.resize((320, max(1, round(im.height * 320 / im.width))))

saida = {'mudou': [], 'novo': [], 'igual': 0}
for n in sorted(novos.rglob('*.png')):
    rel = n.relative_to(novos).as_posix()
    a = atuais / rel
    if not a.exists():
        saida['novo'].append(rel); continue
    x, y = reduzir(n), reduzir(a)
    if x.size != y.size:
        saida['mudou'].append({'print': rel, 'diferenca': 1.0}); continue
    dif = ImageChops.difference(x, y).point(lambda v: 255 if v > 40 else 0)
    frac = sum(dif.histogram()[255:]) / (x.width * x.height)
    if frac > LIMITE: saida['mudou'].append({'print': rel, 'diferenca': round(frac, 3)})
    else: saida['igual'] += 1
print(json.dumps(saida, ensure_ascii=False))
