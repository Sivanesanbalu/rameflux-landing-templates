# Frameflux — animated landing page marketplace (v0.1)

An original, static-first template marketplace. The first drop is **Orbit**, a completely free animated AI/SaaS landing page. Designed to deploy on **Cloudflare Pages** and to version every future update in GitHub.

## Features available today

- Responsive animated marketplace homepage (no account or server required)
- **Real live Orbit preview** embedded in the marketplace
- Full-size preview dialog with desktop/mobile sizing and an open-in-new-tab link
- Free source-code ZIP that contains the exact site shown in the preview
- Detailed build prompt displayed from `site/data/orbit-prompt.txt`
- **Build with Lovable** button (documented prompt-prefill URL; user reviews and sends)
- **Use in ChatGPT** button (copies prompt and opens ChatGPT for manual paste)
- Keyboard accessible controls, focus indicators and reduced-motion support
- No payment system, database, authentication, or analytics yet: nothing fake is advertised as real

## Directory map

```text
site/
  index.html                      Marketplace home
  assets/styles.css               Marketplace design
  assets/main.js                  Modal, prompt copy, AI links
  assets/favicon.svg
  data/orbit-prompt.txt           Reusable AI design prompt
  templates/orbit/               The actual free template + Lottie animation
  downloads/orbit-template.zip   Free source download (generated from template)
scripts/check_site.py             Link, JSON and ZIP smoke checks
.github/workflows/check.yml       GitHub Actions checks for every commit
```

## Run locally

```bash
cd frameflux-landing-templates
python3 -m http.server 8080 --directory site
```

Open http://localhost:8080 and test the two AI buttons and live preview. The optional Lottie effect needs external CDN access, but the CSS animation is always available.

## Deploy through Cloudflare Pages + GitHub

1. Create a new GitHub repository, e.g. `frameflux-landing-templates`, and push this project's files to the `main` branch.
2. Visit [Cloudflare Dashboard → Workers & Pages](https://dash.cloudflare.com/) and choose **Create application → Pages → Import an existing Git repository**.
3. Pick your GitHub repository and set:
   - **Framework preset:** None (plain static files)
   - **Build command:** leave empty (or `exit 0` if required)
   - **Build output directory:** `site`
   - **Production branch:** `main`
4. Deploy. Cloudflare will issue a unique `*.pages.dev` URL.
5. Each subsequent push to `main` triggers a Cloudflare Pages deployment when Git integration is enabled. Branches can receive preview deployments.

Cloudflare static Next.js export is also supported, but this MVP deliberately avoids a framework and paid backend while there is only one free template. Introduce Next.js/Workers and PostgreSQL when paid sales or account features genuinely need it.

## Keep the source ZIP up to date

```bash
python3 scripts/package_orbit.py
python3 scripts/check_site.py
node --check site/assets/main.js
node --check site/templates/orbit/script.js
```

`package_orbit.py` regenerates `site/downloads/orbit-template.zip` from the real template. Re-run it after every Orbit change and commit both template source and ZIP.

## GitHub first push (on your Mac)

Create the empty repo at https://github.com/new (don't auto-add README). In this folder:

```bash
git init -b main
git add .
git commit -m "feat: launch Frameflux with free Orbit template"
git remote add origin https://github.com/YOUR_USERNAME/frameflux-landing-templates.git
git push -u origin main
```

Replace `YOUR_USERNAME` with your GitHub account. On later updates, use `git add . && git commit -m "..." && git push`.

## Scope and legal notes

Frameflux and Orbit are original example brands, not related to MotionSites. The Orbit UI depicts **illustrative** activity only. Review brand-name availability before commercial launch. The Orbit template uses the MIT license; other marketplace assets are subject to the repository's own license. Avoid reselling third-party Lottie assets without appropriate permission. External fonts and the optional Lottie-web CDN require their own license/availability review.

## Roadmap

- [x] Original storefront and one free template
- [x] Responsive live preview and source ZIP
- [x] AI prompt handoff
- [x] Cloudflare Pages configuration instructions
- [ ] GitHub repository creation and first remote push
- [ ] Cloudflare-connected public deployment
- [ ] More templates, filters, detailed product pages
- [ ] Payment, licensing, accounts, purchases and order emails
