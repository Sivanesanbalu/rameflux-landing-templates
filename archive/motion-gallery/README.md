# FrameFlux

A motion-first gallery of eight original web demos with recorded MP4 previews and copyable AI build prompts.

Browse by category, search, or filter for the free Orbit template. Each card opens a live demo with desktop and phone widths. Orbit includes its full source ZIP.

## Run and validate

    python3 -m http.server 8080 --directory site
    python3 scripts/check_site.py
    python3 scripts/check_v5.py

Previews are recorded from the original live demos. To regenerate them, run scripts/render_previews.py with Playwright Chromium and ffmpeg installed.

The GitHub main branch deploys static files from site/ to the existing Cloudflare Worker.

Live: https://rameflux-landing-templates.apsiva69.workers.dev/
This release is archived outside the published site. Serve its site directory locally to view the original gallery.
