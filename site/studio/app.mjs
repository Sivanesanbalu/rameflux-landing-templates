import { templates, templateFor, configFor, renderPage, buildPrompt, theme } from './templates.mjs';

const $ = id => document.getElementById(id);
const dialog = $('studio');
const preview = $('preview');
const key = 'frameflux-studio-v1';
const fields = ['brand', 'headline', 'description', 'cta', 'background', 'accent', 'speed', 'motion'];
let currentCategory = 'All';
let config = configFor('rift');
let frameTemplate;
let statusTimer;
let projects = {};
try {
  const saved = JSON.parse(localStorage.getItem(key) || '{}');
  if (saved && typeof saved === 'object') projects = saved;
} catch {}

function tell(message) {
  $('editor-status').textContent = message;
  clearTimeout(statusTimer);
  statusTimer = setTimeout(() => { $('editor-status').textContent = ''; }, 4500);
}

function save() {
  projects[config.template] = config;
  try {
    localStorage.setItem(key, JSON.stringify(projects));
    $('draft').textContent = 'Draft saved in this browser.';
  } catch {
    $('draft').textContent = 'Browser storage is unavailable.';
  }
}

function sendPreview() {
  const template = templateFor(config.template);
  preview.contentWindow?.postMessage({
    type: 'frameflux-update',
    copy: { brand: config.brand || template.name, headline: config.headline, description: config.description, cta: config.cta || template.cta },
    theme: theme(config), motion: config.motion
  }, '*');
}

function loadPreview() {
  frameTemplate = config.template;
  preview.srcdoc = renderPage(config, { interactive: true });
}

function syncForm() {
  $('template').value = config.template;
  for (const id of fields) $(id).value = config[id];
  $('speed-value').value = config.speed + '×';
  $('studio-title').textContent = 'Remix ' + templateFor(config.template).name;
  $('draft').textContent = projects[config.template] ? 'Draft saved in this browser.' : 'Edits save in this browser.';
}

function selectTemplate(id, changes = projects[id]) {
  config = configFor(id, changes);
  syncForm();
  loadPreview();
}

function openStudio(id, changes) {
  selectTemplate(id, changes);
  if (!dialog.open) dialog.showModal();
}

for (const template of templates) $('template').add(new Option(template.name, template.id));
$('template').addEventListener('change', event => selectTemplate(event.target.value));
$('open-studio').addEventListener('click', () => openStudio(config.template));
$('hero-remix').addEventListener('click', () => openStudio('rift'));
$('close').addEventListener('click', () => dialog.close());
dialog.addEventListener('close', () => { preview.removeAttribute('srcdoc'); frameTemplate = undefined; });
preview.addEventListener('load', () => { if (frameTemplate === config.template) sendPreview(); });
$('replay').addEventListener('click', loadPreview);
$('reset').addEventListener('click', () => { selectTemplate(config.template, {}); save(); tell('Template defaults restored.'); });

for (const id of fields) {
  $(id).addEventListener('input', event => {
    config = configFor(config.template, { ...config, [id]: id === 'speed' ? event.target.valueAsNumber : event.target.value });
    $('speed-value').value = config.speed + '×';
    sendPreview();
    save();
  });
}

for (const button of document.querySelectorAll('[data-size]')) {
  button.addEventListener('click', () => {
    for (const peer of document.querySelectorAll('[data-size]')) peer.setAttribute('aria-pressed', String(peer === button));
    preview.classList.toggle('phone', button.dataset.size === 'phone');
  });
}

async function copy(value, message) {
  try {
    await navigator.clipboard.writeText(value);
    tell(message);
  } catch {
    const fallback = document.createElement('textarea');
    fallback.value = value;
    fallback.setAttribute('aria-label', 'Text to copy');
    dialog.append(fallback);
    fallback.focus();
    fallback.select();
    const copied = document.execCommand('copy');
    if (copied) fallback.remove();
    else fallback.addEventListener('blur', () => fallback.remove(), { once: true });
    tell(copied ? message : 'Copy the selected text with your keyboard.');
  }
}

$('share').addEventListener('click', () => {
  const url = new URL(location.href);
  url.hash = 'remix=' + encodeURIComponent(JSON.stringify(config));
  copy(url.href, 'Remix link copied.');
});
$('prompt').addEventListener('click', () => copy(buildPrompt(config), 'AI prompt copied.'));
$('download').addEventListener('click', () => {
  const file = new Blob([renderPage(config)], { type: 'text/html;charset=utf-8' });
  const url = URL.createObjectURL(file);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'frameflux-' + config.template + '.html';
  link.click();
  setTimeout(() => URL.revokeObjectURL(url), 5000);
  tell('Standalone HTML exported.');
});

const resize = new ResizeObserver(entries => {
  for (const { target, contentRect } of entries) {
    const frame = target.querySelector('iframe');
    if (frame) frame.style.transform = 'scale(' + (contentRect.width / 960) + ')';
  }
});
const visibility = new IntersectionObserver(entries => {
  for (const entry of entries) {
    const state = entry.target.tileState;
    state.visible = entry.isIntersecting;
    state.update();
  }
}, { threshold: .05 });

function mountTile(container, id, manual = false) {
  const iframe = document.createElement('iframe');
  iframe.title = templateFor(id).name + ' motion preview';
  iframe.tabIndex = -1;
  iframe.setAttribute('aria-hidden', 'true');
  iframe.setAttribute('sandbox', 'allow-scripts');
  if (!manual) iframe.loading = 'lazy';
  const state = {
    visible: false, paused: false,
    update() {
      iframe.contentWindow?.postMessage({ type: 'frameflux-pause', paused: state.paused || !state.visible }, '*');
    }
  };
  container.tileState = state;
  iframe.addEventListener('load', state.update);
  iframe.srcdoc = renderPage(configFor(id), { tile: true, interactive: true });
  container.prepend(iframe);
  resize.observe(container);
  visibility.observe(container);
  return state;
}

const featured = mountTile($('hero-art'), 'rift', true);
$('hero-play').addEventListener('click', event => {
  featured.paused = !featured.paused;
  featured.update();
  event.target.textContent = featured.paused ? '▶' : 'Ⅱ';
  event.target.setAttribute('aria-label', featured.paused ? 'Play featured animation' : 'Pause featured animation');
});

function renderCards() {
  for (const tile of $('cards').querySelectorAll('.card-visual')) {
    resize.unobserve(tile);
    visibility.unobserve(tile);
  }
  const query = $('search').value.trim().toLowerCase();
  const visible = templates.filter(template => (
    (currentCategory === 'All' || template.category === currentCategory) &&
    [template.name, template.category, template.tag, template.description].join(' ').toLowerCase().includes(query)
  ));
  $('cards').replaceChildren();
  for (const template of visible) {
    const card = document.createElement('article');
    card.className = 'card';
    card.innerHTML = '<a class="card-visual" href="./demo.html?template=' + template.id + '" aria-label="Open ' + template.name + ' live demo"><span class="preview-tag">Live demo ↗</span></a><div class="card-meta"><div><h3>' + template.name + '</h3><p>' + template.category + ' · ' + template.tag + '</p></div><button class="button outline small" type="button" aria-label="Remix ' + template.name + '">Remix ↗</button></div>';
    card.querySelector('button').addEventListener('click', () => openStudio(template.id));
    $('cards').append(card);
    mountTile(card.querySelector('.card-visual'), template.id);
  }
  if (!visible.length) {
    const empty = document.createElement('p');
    empty.className = 'empty';
    empty.setAttribute('role', 'status');
    empty.textContent = 'No templates match. Try another search or category.';
    $('cards').append(empty);
  }
}

for (const category of ['All', ...new Set(templates.map(template => template.category))]) {
  const button = document.createElement('button');
  button.className = 'chip';
  button.type = 'button';
  button.textContent = category;
  button.setAttribute('aria-pressed', String(category === currentCategory));
  button.addEventListener('click', () => {
    currentCategory = category;
    for (const peer of $('categories').children) peer.setAttribute('aria-pressed', String(peer === button));
    renderCards();
  });
  $('categories').append(button);
}

function openLink() {
  const hash = location.hash;
  if (hash.startsWith('#remix=')) {
    try {
      const shared = JSON.parse(decodeURIComponent(hash.slice(7)));
      if (shared && templates.some(template => template.id === shared.template)) openStudio(shared.template, shared);
    } catch {}
  } else if (hash.startsWith('#studio=')) {
    openStudio(templateFor(hash.slice(8)).id);
  }
}

$('search').addEventListener('input', renderCards);
renderCards();
openLink();
window.addEventListener('hashchange', openLink);

const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
const videoVisibility = new IntersectionObserver(entries => {
  for (const entry of entries) {
    const video = entry.target;
    if (entry.isIntersecting && !reducedMotion.matches && video.dataset.paused !== 'true') playClip(video);
    if (!entry.isIntersecting) video.pause();
  }
}, { threshold: .15 });

function playClip(video) {
  if (!video.getAttribute('src')) video.src = video.dataset.video;
  video.play().catch(() => {});
}

for (const video of document.querySelectorAll('[data-video]')) {
  const button = video.nextElementSibling;
  const name = video.getAttribute('aria-label').replace(' animation preview', '');
  const label = () => {
    const action = video.paused ? 'Play' : 'Pause';
    button.textContent = action;
    button.setAttribute('aria-label', action + ' ' + name + ' preview');
  };
  button.addEventListener('click', () => {
    video.dataset.paused = String(!video.paused);
    if (video.paused) playClip(video);
    else video.pause();
  });
  video.addEventListener('play', label);
  video.addEventListener('pause', label);
  videoVisibility.observe(video);
}
