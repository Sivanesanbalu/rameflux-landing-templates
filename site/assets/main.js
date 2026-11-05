'use strict';

const ORBIT_PROMPT_URL = '/data/orbit-prompt.txt';
const FALLBACK_PROMPT = 'Build an original responsive animated AI SaaS landing page called Orbit. Use midnight backgrounds, electric lime accents, accessible HTML/CSS/JS, animated orbital hero, feature grid, real section links, reduced-motion support and static Cloudflare Pages deployment. Deliver real working code.';
let orbitPrompt = FALLBACK_PROMPT;
let activePrompt = FALLBACK_PROMPT;
const promptText = document.querySelector('#promptText');
const lovableLink = document.querySelector('#lovableLink');
const toast = document.querySelector('#toast');
let toastTimer;

function showToast(message) {
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 4000);
}

async function copyText(value) {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(value);
      return true;
    }
    const input = document.createElement('textarea');
    input.value = value;
    input.style.position = 'fixed';
    input.style.left = '-9999px';
    document.body.appendChild(input);
    input.select();
    const copied = document.execCommand('copy');
    input.remove();
    return copied;
  } catch (error) {
    return false;
  }
}

async function loadPrompt() {
  try {
    const response = await fetch(ORBIT_PROMPT_URL);
    if (!response.ok) throw new Error(`Prompt request failed: ${response.status}`);
    orbitPrompt = (await response.text()).trim();
  } catch (error) {
    orbitPrompt = FALLBACK_PROMPT;
  }
  setActivePrompt(orbitPrompt, 'ORBIT / FULL LANDING PAGE');
}
function setActivePrompt(value, label) {
  activePrompt = value;
  promptText.textContent = value;
  const title = document.querySelector('#promptLabel');
  if (title) title.textContent = label;
  // The AI editor receives a prefilled prompt for the visitor to review.
  lovableLink.href = `https://lovable.dev/#prompt=${encodeURIComponent(value)}`;
}
loadPrompt();

document.querySelector('#copyPrompt').addEventListener('click', async () => {
  const copied = await copyText(activePrompt);
  showToast(copied ? 'Full motion prompt copied to clipboard.' : 'Clipboard unavailable. Select and copy the prompt text above.');
});

document.querySelector('#chatgptButton').addEventListener('click', async () => {
  // Open the browser window synchronously from the user gesture to avoid popup blocking.
  window.open('https://chatgpt.com/', '_blank', 'noopener,noreferrer');
  const copied = await copyText(activePrompt);
  showToast(copied ? 'Prompt copied — paste it into ChatGPT.' : 'ChatGPT opened. Copy the prompt manually from the box above.');
});

const dialog = document.querySelector('#previewDialog');
const frameContainer = document.querySelector('.dialog-content');
const desktopButton = document.querySelector('#desktopPreview');
const mobileButton = document.querySelector('#mobilePreview');
let lastPreviewTrigger = null;
function setViewport(isMobile) {
  frameContainer.classList.toggle('mobile', isMobile);
  mobileButton.setAttribute('aria-pressed', String(isMobile));
  desktopButton.setAttribute('aria-pressed', String(!isMobile));
}
function openPreview(event) {
  lastPreviewTrigger = event.currentTarget;
  setViewport(false);
  if (typeof dialog.showModal === 'function') dialog.showModal();
  else window.open('/templates/orbit/index.html', '_blank', 'noopener,noreferrer');
}
document.querySelector('#openPreview').addEventListener('click', openPreview);
document.querySelector('#openPreviewCard').addEventListener('click', openPreview);
document.querySelector('#closePreview').addEventListener('click', () => dialog.close());
desktopButton.addEventListener('click', () => setViewport(false));
mobileButton.addEventListener('click', () => setViewport(true));
dialog.addEventListener('click', event => { if (event.target === dialog) dialog.close(); });
dialog.addEventListener('close', () => lastPreviewTrigger?.focus());
document.querySelector('#year').textContent = String(new Date().getFullYear());

window.Frameflux = { setActivePrompt, copyText, showToast, openPreview, getOrbitPrompt: () => orbitPrompt };
