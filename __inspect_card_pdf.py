import pymupdf as fitz
from pathlib import Path
pdf = Path(r"c:\Users\2396736\Downloads\portfolio-emmanuel-ricard\assets\carte_d'affaire_ricard_emmanuel.pdf")
doc = fitz.open(pdf)
print('pages', doc.page_count)
for i in range(doc.page_count):
    p = doc.load_page(i)
    print('page', i+1, 'size', p.rect.width, p.rect.height)
    pix = p.get_pixmap(matrix=fitz.Matrix(2,2), alpha=False)
    out = pdf.parent / f'card-page-{i+1}.png'
    pix.save(str(out))
    print('saved', out)
