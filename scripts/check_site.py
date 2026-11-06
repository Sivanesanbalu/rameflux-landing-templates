#!/usr/bin/env python3
"""Lightweight dependency-free smoke tests for GitHub Actions."""
import re
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import unquote, urlparse

ROOT = Path(__file__).resolve().parents[1]
SITE = ROOT / 'out'

class PageParser(HTMLParser):
    def __init__(self):
        super().__init__()
        self.ids = set()
        self.links = []
        self.tags = set()
    def handle_starttag(self, tag, attrs):
        self.tags.add(tag)
        attrs = dict(attrs)
        if 'id' in attrs:
            self.ids.add(attrs['id'])
        for key in ('href', 'src'):
            if key in attrs:
                self.links.append(attrs[key])


def test_page(page):
    parser = PageParser()
    parser.feed(page.read_text(encoding='utf-8'))
    assert not (parser.tags & {'video', 'animate', 'animatetransform', 'animatemotion'}), f'{page}: motion element'
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

routes = ('', 'hot', 'categories', 'categories/landing-pages', 'membership', 'billing')
for route in routes:
    page = SITE / route / 'index.html'
    assert page.is_file(), f'Missing static page: {route or "/"}'

pages = sorted(SITE.rglob('*.html'))
for page in pages:
    test_page(page)

css = (ROOT / 'app' / 'globals.css').read_text()
assert not re.search(r'@keyframes\b|\b(?:animation|transition|scroll-behavior)\s*:', css, re.I)
print(f'OK — verified static routes, links and motion-free styles across {len(pages)} HTML files.')
