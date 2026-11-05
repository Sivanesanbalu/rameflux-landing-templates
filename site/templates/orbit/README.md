# Orbit — Free animated landing page

Orbit is an original responsive design demo for an imaginary AI productivity product. It is part of the Frameflux free starter drop. The page is **static** and does not connect to a real account system, live product, or backend.

## Run locally

From this directory, run:

```bash
python3 -m http.server 8080
```

Open `http://localhost:8080`. If using the full Frameflux repository, serve its `site` directory and open `/templates/orbit/index.html` instead.

## Customize

- Edit `index.html` for headlines, benefits, feature sections and links.
- Edit the CSS variables in `styles.css` for colors, then update your visual identity.
- `script.js` optionally plays the **original** `orbit-pulse.json` animation with Lottie-web. If the CDN is blocked, the CSS motion design still works.
- Replace demo UI values and imaginary product claims before presenting this as a real product.
- The CTA buttons are anchor navigation, not working sign-up or purchase flows.

## Host anywhere

Upload this folder to any static web host, including Cloudflare Pages, or use the entire Frameflux project with `site` as its output directory. No npm install or paid services needed for the static site.

## Accessibility

Uses semantic sections, visible focus styles, reduced-motion preferences and no required animation libraries. Test your own edited content and contrast before launching a client project.

## Licensing

The original source files in this ZIP are released under the MIT License in `LICENSE`. Fonts and the externally loaded Lottie-web library retain their respective third-party licenses.
