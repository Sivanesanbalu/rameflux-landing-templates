#!/usr/bin/env python3
"""Dependency-free checks for the original gallery and source-code product."""
from pathlib import Path
from html.parser import HTMLParser
import re

ROOT=Path(__file__).resolve().parents[1]
SITE=ROOT/'site'
HTML=(SITE/'index.html').read_text()
JS=(SITE/'assets/gallery-v3.js').read_text()
CSS=(SITE/'assets/gallery-v3.css').read_text()

class IDs(HTMLParser):
    def __init__(self):
        super().__init__();self.ids=[]
    def handle_starttag(self, tag, attrs):
        attrs=dict(attrs)
        if 'id' in attrs: self.ids.append(attrs['id'])

parser=IDs();parser.feed(HTML)
assert len(parser.ids)==len(set(parser.ids)), 'Duplicate HTML ids'
for required in ('#designGrid','#categories','#detailDialog','#detailPrompt','#searchInput','#priceFilter','#free-drop'):
    assert required[1:] in parser.ids, f'Missing element: {required}'
assert len(re.findall(r"\{id:'[a-z-]+',title:", JS))==12, 'Expect exactly 12 gallery concepts'
assert "onerror=\"this.hidden=true\"" in JS, 'Remote photos need a visual fallback'
assert 'prefers-reduced-motion' in CSS, 'Provide motion accessibility fallback'
assert 'https://lovable.dev/#prompt=' in JS, 'Missing prompt handoff'
assert 'orbit-template.zip' in HTML, 'Real free download must be accessible'
assert 'design concepts' in HTML.lower(), 'Concepts must be labeled honestly'
assert len(JS)>8000 and len(CSS)>13000, 'Gallery assets unexpectedly truncated'
print('PASS — gallery UI, 12 designs, accessible motion fallback, prompt handoff, original Orbit download')
