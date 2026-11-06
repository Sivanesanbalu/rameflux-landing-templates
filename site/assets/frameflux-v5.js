'use strict';

const byId = id => document.getElementById(id);
const grid = byId('designGrid');
const categories = byId('categories');
const sorts = [...document.querySelectorAll('[data-sort]')];
const search = byId('searchInput');
const access = byId('accessFilter');
const dialog = byId('detailDialog');
const frame = byId('demoFrame');
const motionToggle = byId('motionToggle');
const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
const visibleVideos = new Set();

let designs = [];
let activeCategory = 'All';
let activeSort = 'featured';
let motionEnabled = !reducedMotion.matches && !navigator.connection?.saveData;
let selected;
let lastTrigger;
let toastTimer;

function syncVideo(video) {
  if (motionEnabled && !document.hidden && !dialog.open && visibleVideos.has(video)) {
    if (!video.hasAttribute('src')) video.src = video.dataset.src;
    video.play().catch(() => {});
  } else {
    video.pause();
  }
}

const observer = new IntersectionObserver(entries => {
  for (const { target, isIntersecting, intersectionRatio } of entries) {
    if (!target.isConnected) continue;
    if (isIntersecting && intersectionRatio >= .15) visibleVideos.add(target);
    else visibleVideos.delete(target);
    syncVideo(target);
  }
}, { threshold: .15 });

function setMotion(enabled) {
  motionEnabled = enabled;
  const action = enabled ? 'Pause' : 'Play';
  motionToggle.textContent = (enabled ? 'Ⅱ ' : '▷ ') + action;
  motionToggle.title = action + ' motion previews';
  motionToggle.setAttribute('aria-label', motionToggle.title);
  motionToggle.setAttribute('aria-pressed', String(!enabled));
  visibleVideos.forEach(syncVideo);
}

motionToggle.addEventListener('click', () => setMotion(!motionEnabled));
reducedMotion.addEventListener('change', event => setMotion(!event.matches && !navigator.connection?.saveData));
document.addEventListener('visibilitychange', () => visibleVideos.forEach(syncVideo));
setMotion(motionEnabled);

function demoUrl(id) {
  return id === 'orbit' ? '/templates/orbit/' : '/demos/' + encodeURIComponent(id) + '/';
}

function visibleDesigns() {
  const term = search.value.trim().toLowerCase();
  const items = designs.filter(item =>
    (activeCategory === 'All' || activeCategory === item.category || activeCategory === item.type) &&
    (access.value !== 'free' || item.id === 'orbit') &&
    [item.title, item.category, item.type, item.subtitle, item.detail].join(' ').toLowerCase().includes(term)
  );
  return items.sort(activeSort === 'name' ?
    (a, b) => a.title.localeCompare(b.title) :
    (a, b) => a.order - b.order);
}

function setPressed(buttons, key, value) {
  for (const button of buttons) button.setAttribute('aria-pressed', String(button.dataset[key] === value));
}

function setCategory(category) {
  activeCategory = category;
  setPressed(categories.querySelectorAll('button'), 'category', category);
  render();
}

async function copyText(text) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    const field = document.createElement('textarea');
    field.value = text;
    field.setAttribute('readonly', '');
    field.style.cssText = 'position:fixed;inset:0 auto auto -9999px';
    const focus = document.activeElement;
    (dialog.open ? dialog : document.body).append(field);
    field.select();
    try {
      return document.execCommand('copy');
    } catch {
      return false;
    } finally {
      field.remove();
      focus?.focus();
    }
  }
}

function toast(message) {
  byId('toast').textContent = message;
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => { byId('toast').textContent = ''; }, 3500);
}

function cardFor(item) {
  const card = byId('cardTemplate').content.firstElementChild.cloneNode(true);
  const media = card.querySelector('.design-media');
  const poster = card.querySelector('img');
  const video = card.querySelector('video');
  const copyButton = card.querySelector('.card-copy');
  poster.src = '/previews/' + item.id + '.webp';
  video.poster = poster.src;
  video.dataset.src = '/previews/' + item.id + '.mp4';
  video.muted = true;
  video.addEventListener('playing', () => media.classList.add('has-video'));
  card.querySelector('h3').textContent = item.title;
  card.querySelector('.card-caption p').textContent = item.id === 'orbit' ? 'SaaS · Free source' : item.type + ' · ' + item.category;
  media.setAttribute('aria-label', 'Open ' + item.title + ' preview');
  media.addEventListener('click', () => openDetails(item, media));
  copyButton.setAttribute('aria-label', 'Copy prompt for ' + item.title);
  copyButton.addEventListener('click', async () => {
    if (await copyText(item.prompt)) toast('Prompt copied for ' + item.title + '.');
    else {
      openDetails(item, copyButton);
      byId('detailStatus').textContent = 'Select the prompt text to copy it.';
    }
  });
  return card;
}

function galleryMessage(message) {
  const note = document.createElement('p');
  note.className = 'gallery-message';
  note.textContent = message;
  grid.replaceChildren(note);
}

function render() {
  for (const video of grid.querySelectorAll('video')) {
    observer.unobserve(video);
    visibleVideos.delete(video);
    video.pause();
  }
  const items = visibleDesigns();
  grid.replaceChildren(...items.map(cardFor));
  for (const video of grid.querySelectorAll('video')) observer.observe(video);
  byId('galleryCount').textContent = items.length + (items.length === 1 ? ' design' : ' designs');
  if (!items.length) galleryMessage('No designs match these filters.');
}

function setMobile(mobile) {
  frame.parentElement.classList.toggle('mobile', mobile);
  byId('mobilePreview').setAttribute('aria-pressed', String(mobile));
  byId('desktopPreview').setAttribute('aria-pressed', String(!mobile));
}

function openDetails(item, trigger) {
  selected = item;
  lastTrigger = trigger;
  const href = demoUrl(item.id);
  byId('detailTitle').textContent = item.title;
  byId('detailCategory').textContent = item.category;
  byId('detailDescription').textContent = item.detail;
  byId('detailPrompt').textContent = item.prompt;
  byId('detailStatus').textContent = '';
  byId('openDemo').href = href;
  byId('lovablePrompt').href = 'https://lovable.dev/#prompt=' + encodeURIComponent(item.prompt);
  byId('downloadOrbit').hidden = item.id !== 'orbit';
  frame.src = href;
  setMobile(false);
  dialog.showModal();
  visibleVideos.forEach(syncVideo);
}

byId('detailClose').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', event => { if (event.target === dialog) dialog.close(); });
dialog.addEventListener('close', () => {
  frame.removeAttribute('src');
  lastTrigger?.focus();
  visibleVideos.forEach(syncVideo);
});
byId('desktopPreview').addEventListener('click', () => setMobile(false));
byId('mobilePreview').addEventListener('click', () => setMobile(true));
byId('copyPrompt').addEventListener('click', async () => {
  byId('detailStatus').textContent = await copyText(selected.prompt) ?
    'Prompt copied.' : 'Select the prompt text to copy it.';
});

for (const button of categories.querySelectorAll('button')) {
  button.addEventListener('click', () => setCategory(button.dataset.category));
}
for (const link of document.querySelectorAll('[data-nav-filter]')) {
  link.addEventListener('click', () => setCategory(link.dataset.navFilter));
}
for (const button of sorts) {
  button.addEventListener('click', () => {
    activeSort = button.dataset.sort;
    setPressed(sorts, 'sort', activeSort);
    render();
  });
}
search.addEventListener('input', render);
access.addEventListener('change', render);
byId('searchToggle').addEventListener('click', () => {
  byId('searchRow').hidden = false;
  byId('gallery').scrollIntoView({ behavior: reducedMotion.matches ? 'instant' : 'smooth' });
  search.focus({ preventScroll: true });
});

fetch('/data/gallery-v5.json')
  .then(response => {
    if (!response.ok) throw new Error('Gallery data unavailable');
    return response.json();
  })
  .then(data => {
    designs = data;
    render();
  })
  .catch(() => {
    galleryMessage('The gallery could not load. Refresh to try again.');
  });
