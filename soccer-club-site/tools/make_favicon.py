"""
make_favicon.py — Generate favicon.ico and apple-touch icon from images/crest.png

Usage:
  python tools/make_favicon.py
Outputs:
  - favicon.ico (16,32,48,64)
  - images/crest-180.png
"""
from PIL import Image
import os

BASE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(BASE)

def main():
  crest = os.path.join(ROOT, "images", "crest.png")
  if not os.path.exists(crest):
    print("Missing images/crest.png — place your official crest there first.")
    return
  img = Image.open(crest).convert("RGBA")
  size = max(img.size)
  canvas = Image.new("RGBA", (size, size), (255,255,255,0))
  canvas.paste(img, ((size - img.width)//2, (size - img.height)//2), img if img.mode == "RGBA" else None)
  apple = canvas.resize((180,180), Image.LANCZOS)
  apple.save(os.path.join(ROOT, "images", "crest-180.png"), format="PNG")
  ico_sizes = [(16,16),(32,32),(48,48),(64,64)]
  canvas.save(os.path.join(ROOT, "favicon.ico"), sizes=ico_sizes)
  print("Generated favicon.ico and images/crest-180.png")

if __name__ == "__main__":
  main()
