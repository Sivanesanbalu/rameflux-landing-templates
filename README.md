# FrameFlux

A static website design library. The public collection starts empty. Add each new design to the collection in site/index.html when it is ready.

## Run locally

    python3 -m http.server 8080 --directory site

## Validate

    python3 scripts/check_site.py
    python3 scripts/check_v5.py

The second command checks the prior motion gallery in archive/motion-gallery. Its original demos, recordings, and prompts are outside the published directory and can be reused for future entries.

GitHub main deploys the site/ directory to the existing Cloudflare Worker.

Live: https://rameflux-landing-templates.apsiva69.workers.dev/
