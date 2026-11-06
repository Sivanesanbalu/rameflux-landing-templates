# FrameFlux Studio

A motion template library with a live website editor and standalone HTML export.

- Studio includes three editable starters: Rift, Relay, and Serein.
- Edit copy, brand colors, animation style, and speed. Preview the result at desktop and phone widths.
- Drafts stay in the current browser. Remix links carry the selected template and settings in the URL fragment.
- Export produces a self-contained HTML file with inline CSS and SVG. Copy AI prompt produces a brief based on the current settings.
- The video gallery contains eight original demos with recorded, muted MP4 previews, posters, and prompts. Orbit includes a free source ZIP.

## Run locally

Serve the static site with Python 3.

    python3 -m http.server 8080 --directory site

## Verify

    python3 scripts/check_site.py
    python3 scripts/check_v5.py
    node --check site/studio/app.mjs
    node --check site/studio/templates.mjs

The video preview recording workflow is in scripts/render_previews.py and uses Playwright Chromium and ffmpeg.

## Deploy

The GitHub main branch builds on the existing Cloudflare Worker. The deployment serves static files from site/. No build step, database, or API keys are required.

Live: https://rameflux-landing-templates.apsiva69.workers.dev/
