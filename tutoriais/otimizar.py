"""Gera cópias leves (WebP, 1600px) dos prints para a Central de Ajuda carregar rápido no celular.
Uso: python3 tutoriais/otimizar.py   (o gerar-ajuda.js chama sozinho)"""
import pathlib
from PIL import Image
raiz = pathlib.Path(__file__).resolve().parent.parent / 'ajuda'
feitos = 0
for png in (raiz / 'img').rglob('*.png'):
    webp = raiz / 'img-web' / png.relative_to(raiz / 'img').with_suffix('.webp')
    if webp.exists() and webp.stat().st_mtime >= png.stat().st_mtime:
        continue
    webp.parent.mkdir(parents=True, exist_ok=True)
    im = Image.open(png).convert('RGB')
    if im.width > 1600:
        im = im.resize((1600, round(im.height * 1600 / im.width)), Image.LANCZOS)
    im.save(webp, 'WEBP', quality=80, method=6)
    feitos += 1
# remove versões leves de prints que não existem mais
for webp in (raiz / 'img-web').rglob('*.webp'):
    if not (raiz / 'img' / webp.relative_to(raiz / 'img-web')).with_suffix('.png').exists():
        webp.unlink()
print(f'{feitos} imagem(ns) otimizada(s).')
