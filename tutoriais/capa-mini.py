#!/usr/bin/env python3
"""Capa pequena (640x360 JPG) com botão ▶ (a capa do vídeo já tem o título), para o WhatsApp mostrar no lugar do vídeo enquanto carrega.
Uso: python3 tutoriais/capa-mini.py <capa.jpg> <saida.jpg> "<título>" """
import sys
from PIL import Image, ImageDraw
ent, sai, titulo = sys.argv[1], sys.argv[2], sys.argv[3] if len(sys.argv) > 3 else ''
W, H = 640, 360
img = Image.open(ent).convert('RGB').resize((W, H), Image.LANCZOS)
# escurece de leve e mais embaixo, para o título aparecer
sombra = Image.new('L', (W, H), 0); d = ImageDraw.Draw(sombra)
for y in range(H): d.line([(0, y), (W, y)], fill=40)
img = Image.composite(Image.new('RGB', (W, H), (2, 8, 35)), img, sombra)
d = ImageDraw.Draw(img, 'RGBA')
cx, cy, r = int(W * 0.74), int(H * 0.5), 40  # em cima da tela do sistema, sem cobrir o título
d.ellipse([cx - r - 6, cy - r - 6, cx + r + 6, cy + r + 6], fill=(255, 255, 255, 60))
d.ellipse([cx - r, cy - r, cx + r, cy + r], fill=(227, 38, 47, 245))
d.polygon([(cx - 15, cy - 24), (cx - 15, cy + 24), (cx + 26, cy)], fill=(255, 255, 255, 255))
img.save(sai, 'JPEG', quality=72, optimize=True, progressive=False)
