export const templates = [
  {
    id: 'rift', name: 'Rift', category: 'Portfolio', tag: 'Kinetic type & ribbons',
    label: 'INDEPENDENT DESIGN PRACTICE', headline: 'Give good ideas a pulse.',
    description: 'Design, direction and digital experiences for a world in motion.', cta: 'Explore the work',
    background: '#21164b', accent: '#c8b2ff', technique: 'Layered SVG ribbons drift behind a high-contrast editorial hero.',
    sections: ['Art direction', 'Motion systems', 'Digital experiences']
  },
  {
    id: 'relay', name: 'Relay', category: 'SaaS', tag: 'Animated signal paths',
    label: 'BUILT FOR CONNECTED TEAMS', headline: 'Keep everything in sync.',
    description: 'Connect your tools, route the right signals, and see what’s moving in one place.', cta: 'See how it works',
    background: '#102c29', accent: '#a0efd0', technique: 'Animated dashes travel between labeled nodes on a network diagram.',
    sections: ['Connect your tools', 'Route your signals', 'See the full picture']
  },
  {
    id: 'serein', name: 'Serein', category: 'Lifestyle', tag: 'Soft geometric drift',
    label: 'OBJECTS FOR SLOWER LIVING', headline: 'Make space for stillness.',
    description: 'A small collection of considered objects for the everyday rituals you love.', cta: 'View the collection',
    background: '#f1c7a6', accent: '#832f41', technique: 'Sun and landscape layers drift gently across an editorial illustration.',
    sections: ['Morning ritual', 'The living room', 'At the table']
  }
];

const colorPattern = /^#[\da-f]{6}$/i;
const limits = { brand: 32, headline: 80, description: 160, cta: 32 };
const escape = value => String(value).replace(/[&<>"']/g, char => ({'&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;'}[char]));
export function templateFor(id) {
  return templates.find(template => template.id === id) ?? templates[0];
}
export function configFor(id, changes = {}) {
  const template = templateFor(id);
  const input = changes && typeof changes === 'object' ? changes : {};
  const defaults = { brand: template.name, headline: template.headline, description: template.description, cta: template.cta };
  const copy = Object.fromEntries(Object.entries(defaults).map(([key, value]) => [
    key, typeof input[key] === 'string' ? input[key].slice(0, limits[key]) : value
  ]));
  return {
    template: template.id, ...copy,
    background: colorPattern.test(input.background) ? input.background : template.background,
    accent: colorPattern.test(input.accent) ? input.accent : template.accent,
    speed: Number.isFinite(input.speed) ? Math.min(2, Math.max(.5, input.speed)) : 1,
    motion: ['ambient', 'enter', 'still'].includes(input.motion) ? input.motion : 'ambient'
  };
}

function darkText(color) {
  const values = color.slice(1).match(/.{2}/g).map(component => {
    const value = parseInt(component, 16) / 255;
    return value <= .04045 ? value / 12.92 : ((value + .055) / 1.055) ** 2.4;
  });
  return values[0] * .2126 + values[1] * .7152 + values[2] * .0722 > .179;
}

function riftArt() {
  const ribbons = Array.from({ length: 19 }, (_, index) => {
    const y = index * 15;
    const stroke = ['#f5cfac', '#f0a9d5', '#c093ff', '#8955fd'][Math.min(3, Math.floor(index / 5))];
    return '<path d="M-66 ' + (170+y) + ' C125 ' + (430-y) + ' 210 ' + (410-y) + ' 312 ' + (250+y*.1) + ' S532 ' + (40+y*.74) + ' 625 ' + (219+y) + '" stroke="' + stroke + '"/>';
  }).join('');
  return '<svg class="artwork rift-art" viewBox="0 0 560 530" preserveAspectRatio="xMidYMid slice" aria-hidden="true"><defs><pattern id="grid" width="25" height="25" patternUnits="userSpaceOnUse"><path d="M25 0H0V25" fill="none" stroke="#d7c6ff" stroke-opacity=".2"/></pattern><radialGradient id="light"><stop stop-color="#824fe9"/><stop offset="1" stop-color="#291b5e"/></radialGradient></defs><rect width="560" height="530" fill="url(#light)"/><rect width="560" height="530" fill="url(#grid)"/><circle cx="314" cy="269" r="190" fill="none" stroke="#ddcfff" stroke-opacity=".22"/><circle cx="314" cy="269" r="143" fill="none" stroke="#ddcfff" stroke-opacity=".18" stroke-dasharray="2 8"/><g class="flow" fill="none" stroke-width="2.6">' + ribbons + '</g><g fill="#f8ebff"><path d="M473 98v40m-20-20h40" stroke="#f8ebff"/><circle cx="120" cy="383" r="3"/><circle cx="380" cy="154" r="2"/><text x="24" y="496">RFT—001  /  MOTION STUDY</text><text x="424" y="50">+24.720°</text></g></svg>';
}

function relayArt() {
  const paths = ['M50 132H158Q180 132 180 154V245Q180 265 202 265H298','M58 389H158Q180 389 180 367V290Q180 265 202 265H298','M298 265H392Q414 265 414 243V157Q414 135 436 135H514','M298 265H392Q414 265 414 287V365Q414 388 436 388H514'];
  const wires = paths.map(path => '<path d="' + path + '"/>').join('');
  return '<svg class="artwork relay-art" viewBox="0 0 560 530" preserveAspectRatio="xMidYMid slice" aria-hidden="true"><defs><pattern id="dots" width="22" height="22" patternUnits="userSpaceOnUse"><circle cx="3" cy="3" r="1" fill="#9ae7b7" opacity=".32"/></pattern><radialGradient id="field"><stop stop-color="#246a52"/><stop offset="1" stop-color="#112e2a"/></radialGradient></defs><rect width="560" height="530" fill="url(#field)"/><rect width="560" height="530" fill="url(#dots)"/><g fill="none" stroke="#71b89f" stroke-width="2">' + wires + '</g><g class="signal" fill="none" stroke="#d7ff86" stroke-width="4" stroke-linecap="round" stroke-dasharray="13 150">' + wires + '</g><g fill="#153a31" stroke="#9fe8ca" stroke-width="2"><rect x="248" y="213" width="104" height="104" rx="20"/><rect x="33" y="111" width="42" height="42" rx="9"/><rect x="35" y="368" width="42" height="42" rx="9"/><rect x="494" y="114" width="42" height="42" rx="9"/><rect x="494" y="366" width="42" height="42" rx="9"/></g><path d="m308 232-29 37h20l-5 27 29-37h-20z" fill="#d7ff86"/><g fill="#cef7e5"><text x="36" y="97">INPUT A</text><text x="35" y="442">INPUT B</text><text x="461" y="99">OUTPUT A</text><text x="461" y="442">OUTPUT B</text><text x="207" y="479">SIGNAL PATH  /  ACTIVE</text></g></svg>';
}

function sereinArt() {
  return '<svg class="artwork serein-art" viewBox="0 0 560 530" preserveAspectRatio="xMidYMid slice" aria-hidden="true"><defs><linearGradient id="sky" x2="0" y2="1"><stop stop-color="#f5b795"/><stop offset="1" stop-color="#fbe4b8"/></linearGradient><pattern id="grain" width="9" height="8" patternUnits="userSpaceOnUse"><path d="M1 5h1m4-3h1m1 5h1" stroke="#572237" stroke-opacity=".16"/></pattern></defs><rect width="560" height="530" fill="#9b4751"/><path d="M83 450V271a197 197 0 1 1 394 0v179z" fill="url(#sky)"/><g class="sun"><circle cx="330" cy="221" r="66" fill="#f5a050"/><circle cx="330" cy="221" r="67" fill="url(#grain)"/></g><path d="M83 365q107-115 208-45t186 21v109H83z" fill="#cb7269"/><path d="M83 405q106-62 217-24t177-12v81H83z" fill="#873945"/><path d="M83 450V271a197 197 0 1 1 394 0v179z" fill="none" stroke="#ffdbad" stroke-width="2"/><rect width="560" height="530" fill="url(#grain)"/><path d="M34 26h492v478H34z" fill="none" stroke="#f5bd96" opacity=".5"/><g fill="#ffe3bf"><text x="50" y="52">SEREIN / EDITION 01</text><text x="390" y="482">SLOW LIVING STUDY</text></g></svg>';
}

const artwork = { rift: riftArt, relay: relayArt, serein: sereinArt };
const styles = [
  '*{box-sizing:border-box}html{scroll-behavior:smooth}body{margin:0;background:var(--bg);color:var(--fg);font-family:Arial,Helvetica,sans-serif}a{color:inherit;text-decoration:none}a:focus-visible{outline:2px solid var(--fg);outline-offset:4px}',
  '.wrap{width:min(1300px,calc(100% - 64px));margin:auto}.header{display:flex;align-items:center;justify-content:space-between;border-bottom:1px solid color-mix(in srgb,var(--fg) 25%,transparent);height:70px;gap:10px}.brand{font-size:22px;font-weight:900;letter-spacing:-.07em;overflow-wrap:anywhere}.header a:last-child{font:12px ui-monospace,monospace;white-space:nowrap}',
  '.hero{display:grid;grid-template-columns:1fr 1.15fr;gap:30px;align-items:center;min-height:448px;padding:22px 0}.hero>div{min-width:0}.hero p{font-size:clamp(13px,1.9vw,17px);line-height:1.45;max-width:330px;margin:15px 0 20px}.label,.index{font:700 11px ui-monospace,monospace;letter-spacing:.14em}.label{margin:0!important;font-size:11px!important;color:var(--detail)}h1,h2,h3,p{margin:0}h1{font-size:clamp(42px,7.3vw,112px);font-weight:800;line-height:.91;letter-spacing:-.085em;margin-top:12px;overflow-wrap:anywhere}.serein h1{font-family:Georgia,serif;font-weight:400;letter-spacing:-.075em}.cta{display:inline-block;background:var(--accent);color:var(--on-accent);border-radius:5px;padding:10px 13px;font-size:13px;font-weight:700;overflow-wrap:anywhere;max-width:100%}',
  '.art{min-width:0;overflow:hidden;border-radius:10px;aspect-ratio:1.12;max-height:570px;border:1px solid color-mix(in srgb,var(--fg) 23%,transparent)}.artwork{display:block;width:100%;height:100%}.artwork text{font:11px ui-monospace,monospace;letter-spacing:.11em}.flow,.sun{transform-box:fill-box;transform-origin:center}',
  '.ambient .flow{animation:flow var(--tempo) ease-in-out infinite alternate}.ambient .signal{animation:signal var(--tempo) linear infinite}.ambient .sun{animation:sun var(--tempo) ease-in-out infinite alternate}.enter .hero>div{animation:enter calc(var(--tempo) / 5) both ease-out}.enter .hero>div:nth-child(2){animation-delay:.1s}.paused *{animation-play-state:paused!important}',
  '@keyframes flow{from{transform:translate(-8px,-13px) rotate(-6deg) scale(1.05)}to{transform:translate(12px,18px) rotate(8deg) scale(1.13)}}@keyframes signal{to{stroke-dashoffset:-163}}@keyframes sun{from{transform:translateY(17px)}to{transform:translateY(-18px)}}@keyframes enter{from{transform:translateY(22px);opacity:.15}to{transform:none;opacity:1}}',
  '.details{padding:38px 0 54px;border-top:1px solid color-mix(in srgb,var(--fg) 25%,transparent)}.details h2{font-size:clamp(28px,5vw,56px);letter-spacing:-.075em;margin:8px 0 16px}.details-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:9px}.details article{padding:15px;border:1px solid color-mix(in srgb,var(--fg) 29%,transparent);border-radius:8px}.details h3{font-size:17px;margin-top:8px}.details p{font-size:13px;line-height:1.55;margin-top:7px}.foot{padding:15px 0;border-top:1px solid color-mix(in srgb,var(--fg) 25%,transparent);font-size:12px}.tile .header{height:56px}.tile .hero{min-height:0;height:484px;padding:16px 0}.tile .art{max-height:448px}.tile .details,.tile .foot{display:none}',
  '@media(max-width:650px){.wrap{width:calc(100% - 30px)}.header{height:48px}.brand{font-size:19px}.hero{grid-template-columns:1fr;min-height:auto;gap:17px;padding:21px 0}.hero p{margin:10px 0 13px}.art{max-height:300px}.details-grid{grid-template-columns:1fr}.details{padding-block:23px}}',
  '@media(prefers-reduced-motion:reduce){*,*::before,*::after{animation:none!important;scroll-behavior:auto!important}}'
].join('\n');

export function theme(config) {
  return {
    '--bg': config.background, '--accent': config.accent, '--fg': darkText(config.background) ? '#000000' : '#ffffff',
    '--on-accent': darkText(config.accent) ? '#000000' : '#ffffff', '--tempo': (7 / config.speed) + 's'
  };
}

export function renderPage(input, { tile = false, interactive = false } = {}) {
  const config = configFor(input.template, input);
  const template = templateFor(config.template);
  const variables = Object.entries(theme(config)).map(([key, value]) => key + ':' + value).join(';');
  const className = [template.id, config.motion, tile ? 'tile' : ''].join(' ');
  const brand = escape(config.brand || template.name);
  const details = template.sections.map((section, index) => '<article><span class="index">0' + (index + 1) + '</span><h3>' + escape(section) + '</h3></article>').join('');
  const previewScript = '<script>document.addEventListener("click",event=>{const link=event.target.closest("a[href^=\\"#\\"]");if(!link)return;event.preventDefault();if(link.hash)document.getElementById(link.hash.slice(1))?.scrollIntoView();else scrollTo(0,0)});addEventListener("message",event=>{if(event.source!==parent)return;const data=event.data;if(data?.type==="frameflux-pause")document.body.classList.toggle("paused",data.paused===true);if(data?.type!=="frameflux-update")return;for(const [key,value] of Object.entries(data.theme))document.documentElement.style.setProperty(key,value);for(const [key,value] of Object.entries(data.copy))document.querySelectorAll("[data-copy="+key+"]").forEach(node=>node.textContent=value);document.body.classList.remove("ambient","enter","still");document.body.classList.add(data.motion)});</script>';
  return '<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>' + brand + '</title><style>:root{' + variables + ';--detail:var(--fg)}' + styles + '</style></head><body class="' + className + '"><header class="header wrap"><a class="brand" data-copy="brand" href="#">' + brand + '</a><a href="#details">Explore ↘</a></header><main class="wrap"><section class="hero"><div><p class="label">' + template.label + '</p><h1 data-copy="headline">' + escape(config.headline) + '</h1><p data-copy="description">' + escape(config.description) + '</p><a class="cta" href="#details"><span data-copy="cta">' + escape(config.cta || template.cta) + '</span> ↗</a></div><div class="art">' + artwork[template.id]() + '</div></section><section class="details" id="details"><span class="index">01 / DISCOVER</span><h2 data-copy="cta">' + escape(config.cta || template.cta) + '</h2><div class="details-grid">' + details + '</div></section></main><footer class="foot wrap" data-copy="brand">' + brand + '</footer>' + (interactive ? previewScript : '') + '</body></html>';
}

export function buildPrompt(input) {
  const config = configFor(input.template, input);
  const template = templateFor(config.template);
  const motion = { ambient: 'a looping SVG animation', enter: 'a single entrance reveal', still: 'no animation' };
  return [
    'Build a responsive landing page using the FrameFlux ' + template.name + ' starter as its visual direction.',
    'Brand: ' + config.brand,
    'Headline: ' + config.headline,
    'Description: ' + config.description,
    'Primary button label: ' + config.cta,
    'Use ' + config.background + ' as the main background and ' + config.accent + ' as the accent. Use high-contrast text.',
    'Art direction: ' + template.technique + ' Use ' + motion[config.motion] + ' at ' + config.speed + '× speed and respect prefers-reduced-motion.',
    'Create sections for ' + template.sections.join(', ') + '. Stack the hero on narrow screens and use semantic markup and visible focus states.'
  ].join('\n');
}
