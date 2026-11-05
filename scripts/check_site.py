#!/usr/bin/env python3
"""Lightweight dependency-free smoke tests for GitHub Actions."""
import json
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import unquote, urlparse
from zipfile import ZipFile

ROOT = Path(__file__).resolve().parents[1]
SITE = ROOT / 'site'

class PageParser(HTMLParser):
    def __init__(self):
        super().__init__()
        self.ids = set()
        self.links = []
    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if 'id' in attrs:
            self.ids.add(attrs['id'])
        for key in ('href', 'src'):
            if key in attrs:
                self.links.append(attrs[key])


def test_page(page):
    parser = PageParser()
    parser.feed(page.read_text(encoding='utf-8'))
    for link in parser.links:
        if not link or link.startswith(('http:', 'https:', 'mailto:', 'data:', 'javascript:')):
            continue
        parsed = urlparse(link)
        if not parsed.path and parsed.fragment:
            assert parsed.fragment in parser.ids, f'{page}: broken anchor #{parsed.fragment}'
            continue
        if not parsed.path:
            continue
        path = unquote(parsed.path)
        target = SITE / path.lstrip('/') if path.startswith('/') else page.parent / path
        if path == '/':
            target = SITE / 'index.html'
        if target.is_dir():
            target = target / 'index.html'
        assert target.is_file(), f'{page}: missing asset {link}'

pages = sorted(SITE.rglob('*.html'))
assert len(pages) >= 2, 'Storefront and Orbit preview must both exist'
for page in pages:
    test_page(page)

lottie = SITE / 'templates/orbit/orbit-pulse.json'
assert isinstance(json.loads(lottie.read_text(encoding='utf8'))['layers'], list)
zip_path = SITE / 'downloads/orbit-template.zip'
with ZipFile(zip_path) as archive:
    assert archive.testzip() is None, 'Corrupted Orbit ZIP'
    source_names = {f'orbit/{file.name}' for file in (SITE / 'templates/orbit').iterdir() if file.is_file()}
    assert set(archive.namelist()) == source_names, 'ZIP does not match live template source files'

assert len((SITE / 'data/orbit-prompt.txt').read_text().strip()) > 500
print(f'OK — verified {len(pages)} HTML pages, original Lottie JSON, links, free prompt, matching source ZIP.')
