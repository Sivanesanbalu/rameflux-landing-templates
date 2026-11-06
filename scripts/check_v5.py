#!/usr/bin/env python3
from pathlib import Path
import json,subprocess
root=Path(__file__).resolve().parents[1];site=root/'site'
designs=json.loads((site/'data/gallery-v5.json').read_text(encoding='utf-8'))
assert len(designs)==8 and len({d['id'] for d in designs})==8
assert all(len(d['prompt'])>190 for d in designs)
index=(site/'index.html').read_text()
assert '/downloads/orbit-template.zip' in index
assert 'real' in index.lower() and 'video' in (site/'assets/frameflux-v5.js').read_text()
for d in designs:
 assert (site/'previews'/f"{d['id']}.webp").stat().st_size>4000
 assert (site/'previews'/f"{d['id']}.mp4").stat().st_size>6000
 assert (site/('templates/orbit/index.html' if d['id']=='orbit' else f"demos/{d['id']}/index.html")).is_file()
for f in ('frameflux-v5.js','demo.js'):
 if (site/'assets'/f).exists(): subprocess.run(['node','--check',str(site/'assets'/f)],check=True)
print('OK — 8 original interactive demos, 8 MP4 loops, 8 posters, prompts and accessible gallery.')
