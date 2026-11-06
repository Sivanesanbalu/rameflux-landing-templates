# Frameflux · Motion-first website gallery (v0.5)

**Original motion demos. Real video previews. Copyable AI build briefs.**

This is a Cloudflare-friendly static website. The homepage is a focused discovery gallery—not a traditional brochure landing page. It contains eight original site experiences; each design has its own responsive working HTML/CSS demo page, a locally recorded MP4 clip and a locally captured WebP poster. A custom prompt is available from each card. Orbit is the complete free source-code product, also downloadable as a ZIP.

## Real architecture

- **Original demos:** `/site/demos/<slug>/` and `/site/templates/orbit/`
- **Previews:** `/site/previews/<slug>.mp4` (H.264 silent looping videos) and `.webp` posters
- **Gallery data & prompts:** `/site/data/gallery-v5.json`
- **Frontend:** semantic HTML, CSS, vanilla JS, native `<video muted loop playsinline>` and `<dialog>`
- **Hosting:** Cloudflare Workers static assets or Cloudflare Pages, directory `site`; no backend required

The public MotionSites website uses video preview cards with poster images (some videos publicly hosted on Cloudflare R2). Frameflux implements the **same general production technique** using its own website designs and self-hosted content; no MotionSites artwork, videos, prompts, trademarks or page code are copied.

## Build & validate

`python3 scripts/check_site.py` 

`python3 scripts/check_v5.py`

Recreate preview clips using `python3 scripts/render_previews.py` (requires local Playwright Chromium and ffmpeg). On every future update, edit the demo and re-record the preview to keep what visitors see consistent with the actual product.

## Publish

GitHub `main` is connected to existing Cloudflare Worker; the existing public URL remains unchanged. Project is fully static with no framework compile step. Cloudflare build output directory `site`.

**Honesty:** all eight demos are actual live animated pages; only Orbit currently offers the source ZIP. Demo visuals are illustration-led concepts, not functional external products or live commercial analytics.
