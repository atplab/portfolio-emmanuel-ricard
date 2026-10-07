import fitz
from pathlib import Path
pdf = Path(r'c:\Users\2396736\Downloads\portfolio-emmanuel-ricard\assets\Ricard_Emmanuel_CV.pdf')
out = Path(r'c:\Users\2396736\Downloads\portfolio-emmanuel-ricard\assets\card-preview')
out.mkdir(exist_ok=True)
doc = fitz.open(pdf)
print('pages', doc.page_count)
for i in range(doc.page_count):
    page = doc.load_page(i)
    rect = page.rect
    print('page', i+1, 'size', rect.width, rect.height)
    pix = page.get_pixmap(matrix=fitz.Matrix(2, 2), alpha=False)
    path = out / f'page-{i+1}.png'
    pix.save(str(path))
    print('saved', path)
