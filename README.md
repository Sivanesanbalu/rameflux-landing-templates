# Frameflux — premium design inspiration and prompt gallery

**v0.3: Gallery-first redesign**. Cloudflare Workers static hosting with GitHub-triggered deployments.

## What's live

- Distinctive editorial grid of 12 original design concept previews (visual directions, not 12 fully coded sites).
- Filter by category, browse Featured / Popular / Recent, filter by free/premium, and search locally.
- Open a design dialog to read its creative brief, copy an AI prompt, or prefill the prompt in Lovable.
- One **real** complete free landing page: [Orbit](site/templates/orbit/index.html), with its working live preview, source ZIP and detailed prompt.
- Works without authentication, database or a build step. Gallery illustrations use original HTML and CSS compositions; selected editorial photographs are loaded from Unsplash. Refer to Unsplash's license and third-party rights guidance for photography use. Avoid using recognizable people or trademarks to imply endorsement.
- Accessible keyboard focus, native dialog, semantic links, responsive layouts, and reduced-motion support.

## Layout / deploy

The deploy root directory is `site/` and **does not require a build command**. On Cloudflare Workers Git-connected static assets, use `site` as the asset directory. Keep `main` as production branch.

To verify locally:

```sh
python3 scripts/package_orbit.py
python3 scripts/check_site.py
python3 -m http.server 8000 -d site
```

Open http://localhost:8000. The hosted app uses the same persistent URL:

https://rameflux-landing-templates.apsiva69.workers.dev/

## Important distinction

Only Orbit is currently offered as a fully built, downloadable free website. The gallery cards are *concept previews* for inspiration and AI prompts; do not represent them as independent, finished demos. New downloadable templates can be added in future releases.

## Files

- `site/index.html` — gallery homepage
- `site/assets/gallery-v3.css` — responsive gallery / original animated preview compositions
- `site/assets/gallery-v3.js` — filtering, sorting, search, prompt modals and card data
- `site/templates/orbit/` — complete free landing page template
- `site/downloads/orbit-template.zip` — free Orbit download
- `site/data/orbit-prompt.txt` — detailed Orbit creation prompt
- `scripts/check_site.py` — static checks
- `scripts/package_orbit.py` — rebuild free ZIP

## Brand / rights

Frameflux is independent and not affiliated with MotionSites. The design does not reuse their logo, images, copy or template cards. Referenced photographic images are used as editorial illustrative media under their respective licenses; validate rights and any necessary permissions before monetizing specific designs.
