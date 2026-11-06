# FrameFlux

A Next.js and TypeScript design library with a white interface, category pages, featured picks, search, membership, and billing status.

The public library starts empty. Add each design to lib/catalog.ts when it is ready. Set featured to true for the Hot page. Motion concepts are listed as a category for still references. The public UI uses no animations or video.

Membership shows free access and a planned Plus tier. Billing is a public status view with inactive payments and no account or invoice integration.

## Run and validate

    npm ci
    npm run dev
    npm run build
    python3 scripts/check_site.py
    python3 scripts/check_v5.py

The production build exports static assets to out/. The existing Cloudflare Worker builds from GitHub main and uses wrangler.jsonc to publish the export. Archived demos are kept outside the public export.

Live: https://rameflux-landing-templates.apsiva69.workers.dev/
