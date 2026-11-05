#!/usr/bin/env python3
"""Package the same files served by the live Orbit demo."""
from pathlib import Path
from zipfile import ZipFile, ZIP_DEFLATED

ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / 'site' / 'templates' / 'orbit'
DEST = ROOT / 'site' / 'downloads' / 'orbit-template.zip'
DEST.parent.mkdir(parents=True, exist_ok=True)
with ZipFile(DEST, 'w', ZIP_DEFLATED) as zf:
    for path in sorted(SOURCE.iterdir()):
        if path.is_file():
            zf.write(path, arcname=f'orbit/{path.name}')
print(f'Created {DEST} ({DEST.stat().st_size:,} bytes)')
