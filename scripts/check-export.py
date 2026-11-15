"""Validate generated routes, anchors, local assets and heading structure."""
from pathlib import Path
from urllib.parse import urlparse, unquote
from html.parser import HTMLParser

class Page(HTMLParser):
    def __init__(self, text):
        super().__init__(); self.links=[]; self.assets=[]; self.ids=set(); self.h1=0; self.feed(text)
    def handle_starttag(self, tag, attrs):
        attrs=dict(attrs)
        if tag=='h1': self.h1+=1
        if 'id' in attrs: self.ids.add(attrs['id'])
        if tag=='a' and attrs.get('href'): self.links.append(attrs['href'])
        if tag in ('img','script') and attrs.get('src'): self.assets.append(attrs['src'])

root=Path('out')
parsed={p:Page(p.read_text()) for p in root.rglob('*.html')}
errors=[];count=0
for file,page in parsed.items():
    if file.name=='404.html' or '_not-found' in str(file): continue
    count+=1
    if page.h1!=1: errors.append(f'{file}: expected one h1, got {page.h1}')
    for href in page.links:
        u=urlparse(href)
        if u.scheme or u.netloc: continue
        if not u.path: target=file
        elif u.path.startswith('/'):
            p=root/u.path.lstrip('/')
            candidates=[p,p.with_suffix('.html'),p/'index.html']
            target=next((c for c in candidates if c.is_file()),None)
        else: continue
        if target is None or target not in parsed:
            errors.append(f'{file}: missing page {href}'); continue
        if u.fragment and unquote(u.fragment) not in parsed[target].ids:
            errors.append(f'{file}: missing anchor {href}')
    for src in page.assets:
        u=urlparse(src)
        if src.startswith('/') and not (root/u.path.lstrip('/')).is_file():errors.append(f'{file}: missing asset {src}')
print(f'Checked {count} pages, internal links, anchors, scripts, and images.')
if errors:
    print('\n'.join(sorted(set(errors))));raise SystemExit(1)
print('All checks passed.')
