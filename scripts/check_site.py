#!/usr/bin/env python3
"""Lightweight dependency-free smoke tests for GitHub Actions."""
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import unquote, urlparse

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
assert SITE / 'index.html' in pages, 'Missing homepage'
for page in pages:
    test_page(page)
print(f'OK — verified links and assets on {len(pages)} public HTML page(s).')
