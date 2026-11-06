#!/usr/bin/env python3
"""Record original standalone HTML demos into MP4 gallery previews and WebP posters."""
from pathlib import Path
import http.server, threading, subprocess, tempfile, time, json
from functools import partial
from PIL import Image
from playwright.sync_api import sync_playwright

ROOT=Path(__file__).resolve().parents[1]; SITE=ROOT/'site'
SCENES=json.loads((SITE/'data/gallery-v5.json').read_text())
server=http.server.ThreadingHTTPServer(('127.0.0.1', 0), partial(http.server.SimpleHTTPRequestHandler, directory=str(SITE)))
thread=threading.Thread(target=server.serve_forever,daemon=True);thread.start()
URL=f'http://127.0.0.1:{server.server_port}'
try:
 with sync_playwright() as p:
  browser=p.chromium.launch(headless=True, executable_path='/usr/bin/chromium',args=['--no-sandbox','--disable-dev-shm-usage','--disable-gpu'])
  page=browser.new_page(viewport={'width':1280,'height':740},device_scale_factor=1, reduced_motion='no-preference')
  page.on('console',lambda msg:None)
  for scene in SCENES:
   slug=scene['id'];
   import os
   if not os.environ.get('FORCE_PREVIEW_REBUILD') and (SITE/'previews'/f'{slug}.mp4').exists() and (SITE/'previews'/f'{slug}.webp').exists(): continue
   link=f'{URL}/'+('templates/orbit/' if slug=='orbit' else f'demos/{slug}/')
   page_file=(SITE/'templates/orbit/index.html') if slug=='orbit' else (SITE/'demos'/slug/'index.html')
   page_html=page_file.read_text(encoding='utf-8')
   css_file=(SITE/'templates/orbit/styles.css') if slug=='orbit' else (SITE/'assets/demo.css')
   import re
   page_html=re.sub(r'<link[^>]*rel="stylesheet"[^>]*>', '<style>'+css_file.read_text(encoding='utf-8')+'</style>', page_html)
   page_html=re.sub(r'<script[^>]*src=[^>]*></script>', '', page_html)
   page.set_content(page_html,wait_until='domcontentloaded')
   page.wait_for_timeout(400)
   with tempfile.TemporaryDirectory() as frames:
    frames=Path(frames)
    for i in range(24):
     page.screenshot(path=str(frames/f'{i:03d}.png'),animations='allow',timeout=15000)
     if i==3:
      img=Image.open(frames/f'{i:03d}.png').convert('RGB')
      img.save(SITE/'previews'/f'{slug}.webp','WEBP',quality=84,method=5)
     page.wait_for_timeout(75)
    cmd=['ffmpeg','-hide_banner','-loglevel','error','-y','-framerate','12','-i',str(frames/'%03d.png'),'-c:v','libx264','-preset','veryfast','-crf','26','-pix_fmt','yuv420p','-movflags','+faststart','-an',str(SITE/'previews'/f'{slug}.mp4')]
    subprocess.run(cmd,check=True)
   print(f'{slug}: video={(SITE/"previews"/f"{slug}.mp4").stat().st_size//1024}KiB poster={(SITE/"previews"/f"{slug}.webp").stat().st_size//1024}KiB',flush=True)
  browser.close()
finally:
 server.shutdown()
