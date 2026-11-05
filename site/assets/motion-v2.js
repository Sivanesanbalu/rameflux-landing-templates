'use strict';

/** Original Frameflux motion studies: these are design prompts, not hidden paid templates. */
const MOTION_STUDIES = {
  orbit: {
    title: 'Orbit — full landing page',
    label: 'ORBIT / FULL LANDING PAGE',
    description: 'A fully working animated landing page with downloadable HTML, CSS and JavaScript.',
    prompt: null
  },
  aurora: {
    title: 'Afterglow — animated background',
    label: 'AFTERGLOW / ANIMATED BACKGROUND',
    description: 'A dreamy, fluid, color-shifting aurora with a luminous horizon.',
    prompt: `Create an ORIGINAL animated background study called “Afterglow” for a high-end creative landing page. Art direction: deep indigo twilight with wide, soft lavender, pink and cyan aurora ribbons moving overhead, a glowing low horizon and a tiny star-like light source. The composition must feel cinematic rather than like generic gradients.\n\nDeliver an actual runnable HTML/CSS/JS page, not a still image. Use 3 independently animated conic-gradient layers with blur, screen blending and gently changing rotation, scale and position. Add a layered elliptical horizon, fine noise or subtle star specks, and large editorial type: “AFTER / GLOW.” The animation should loop seamlessly in 8–14 seconds with gentle easing.\n\nImplementation: static, responsive, CSS-first, no paid assets, no external video, optimized transforms and opacity. Respect prefers-reduced-motion, provide accessible contrast and a clean fallback. Keep all text editable. Add a short guide showing how to embed the background into a different landing page and how to change the color palette. Avoid reproducing another brand's copyrighted visual identity.`
  },
  kinetic: {
    title: 'Make Noise — kinetic typography',
    label: 'MAKE NOISE / KINETIC TYPOGRAPHY',
    description: 'A high-contrast editorial typography scene with choreographed motion.',
    prompt: `Create an ORIGINAL kinetic typography hero called “Make Noise”. The visual direction is a bold experimental design-studio campaign: vivid apricot/coral background (#ff8165), oversized dark plum condensed words, warm white contrast type, precise minimalist crosshair marks and subtle grid texture.\n\nTypography choreography: “MAKE” slides slowly toward the right; “NOISE.” moves in the opposite direction; an outlined line “MAKE WAVES.” oscillates independently below. Each phrase is a real semantic text element, not an image. Use different tempos and a seamless 5–7 second loop. The movement must remain smooth and legible, never flashy or flickery. Add a responsive hero CTA and a minimal navigation bar.\n\nDeliver full semantic HTML, modern CSS and minimal vanilla JS only if needed. Provide keyboard accessibility, strong text contrast, reduced-motion fallback, mobile breakpoints and a customization guide. Keep the whole result original, suitable for Cloudflare Pages. Do not rely on screenshots or copy another website.`
  },
  signal: {
    title: 'Signal — interactive radar',
    label: 'SIGNAL / INTERACTIVE FIELD',
    description: 'A futuristic radar field with a revolving beam and subtle pointer-responsive movement.',
    prompt: `Create an ORIGINAL interactive web hero called “Signal” for an experimental technology studio. The scene is a dark near-black and deep petrol-blue field with an extremely fine perspective grid, teal concentric radar rings, one elegant rotating conic-gradient sweep and several crisp luminous signal points. Include bold typography “FEEL THE FREQUENCY.” and small telemetry labels.\n\nMotion: radar beam rotates continuously in a gentle 5-second loop; the illuminated blips pulse asynchronously. On fine-pointer devices, the radar responds subtly to cursor position with parallax limited to a few pixels and restores on exit. No strobing, aggressive flashing or canvas-heavy effects. Use CSS gradients, border rings, opacity and transform, with JavaScript only for optional pointer effects.\n\nDeliver a real responsive HTML/CSS/JS implementation, not a mockup. Include a practical primary CTA, keyboard focus indicators, prefers-reduced-motion support and clearly annotated variables for color and speed. The site must be deployable as static content on Cloudflare and use no third-party protected artwork.`
  }
};

const studyDialog = document.querySelector('#studyDialog');
const studyDialogStage = document.querySelector('#studyDialogStage');
const studyDialogTitle = document.querySelector('#studyDialogTitle');
const studyDialogSummary = document.querySelector('#studyDialogSummary');
let activeStudyKey = 'aurora';
let lastStudyTrigger = null;

function promptFor(key) {
  return key === 'orbit' ? window.Frameflux.getOrbitPrompt() : MOTION_STUDIES[key]?.prompt;
}
function choosePrompt(key) {
  const study = MOTION_STUDIES[key];
  if (!study) return;
  window.Frameflux.setActivePrompt(promptFor(key), study.label);
}

for (const button of document.querySelectorAll('.motion-filter')) {
  button.addEventListener('click', () => {
    const filter = button.dataset.filter;
    for (const other of document.querySelectorAll('.motion-filter')) {
      const active = other === button;
      other.classList.toggle('is-active', active);
      other.setAttribute('aria-pressed', String(active));
    }
    for (const card of document.querySelectorAll('.motion-card')) {
      card.hidden = filter !== 'all' && card.dataset.category !== filter;
    }
  });
}

for (const button of document.querySelectorAll('[data-prompt-key]')) {
  button.addEventListener('click', async () => {
    const key = button.dataset.promptKey;
    choosePrompt(key);
    const copied = await window.Frameflux.copyText(promptFor(key));
    window.Frameflux.showToast(copied ? `${MOTION_STUDIES[key].title} prompt copied — paste into your AI editor.` : 'Prompt loaded below. Copy it manually from the prompt panel.');
  });
}

for (const button of document.querySelectorAll('[data-open-orbit]')) {
  button.addEventListener('click', event => window.Frameflux.openPreview(event));
}

for (const trigger of document.querySelectorAll('[data-study-preview]')) {
  trigger.addEventListener('click', () => {
    const key = trigger.dataset.studyPreview;
    const study = MOTION_STUDIES[key];
    if (!study) return;
    activeStudyKey = key;
    lastStudyTrigger = trigger;
    studyDialogTitle.textContent = study.title;
    studyDialogSummary.textContent = study.description + ' Copy its prompt or load it into the AI prompt panel.';
    studyDialogStage.replaceChildren(trigger.querySelector('.motion-scene').cloneNode(true));
    if (typeof studyDialog.showModal === 'function') studyDialog.showModal();
    else {
      choosePrompt(key);
      document.querySelector('#ai-prompt').scrollIntoView({behavior:'smooth'});
    }
  });
}

document.querySelector('#closeStudyDialog').addEventListener('click', () => studyDialog.close());
studyDialog.addEventListener('click', event => { if (event.target === studyDialog) studyDialog.close(); });
studyDialog.addEventListener('close', () => lastStudyTrigger?.focus());
document.querySelector('#studyCopyPrompt').addEventListener('click', async () => {
  choosePrompt(activeStudyKey);
  const copied = await window.Frameflux.copyText(promptFor(activeStudyKey));
  window.Frameflux.showToast(copied ? 'Motion prompt copied to clipboard.' : 'Motion prompt loaded below. Copy manually from the panel.');
});
document.querySelector('#studyUsePrompt').addEventListener('click', () => {
  choosePrompt(activeStudyKey);
  studyDialog.close();
  document.querySelector('#ai-prompt').scrollIntoView({behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth'});
  window.Frameflux.showToast('Prompt selected. Copy it or open your AI editor.');
});

// Optional minimal parallax; no tracking, no cursor replacement and no motion on touch devices.
if (window.matchMedia('(pointer:fine) and (prefers-reduced-motion: no-preference)').matches) {
  const hero = document.querySelector('.hero-v2');
  hero.addEventListener('pointermove', event => {
    const r = hero.getBoundingClientRect();
    hero.style.setProperty('--mx', `${((event.clientX-r.left)/r.width-.5)*30}px`);
    hero.style.setProperty('--my', `${((event.clientY-r.top)/r.height-.5)*30}px`);
  }, {passive:true});
  hero.addEventListener('pointerleave', () => {
    hero.style.setProperty('--mx','0px');
    hero.style.setProperty('--my','0px');
  });
}

// The gallery remains visible immediately; each card supplies its own continuous motion.
