'use strict';
// Orbit's core experience is fully functional without third-party JavaScript.
// Optional Lottie enhancement only loads when the library becomes available.
function startOptionalLottie() {
  const target = document.querySelector('#orbit-lottie');
  if (!target || !window.lottie || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  window.lottie.loadAnimation({
    container: target,
    renderer: 'svg',
    loop: true,
    autoplay: true,
    path: './orbit-pulse.json',
    rendererSettings: { preserveAspectRatio: 'xMidYMid meet' },
  });
}
if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', startOptionalLottie);
else startOptionalLottie();
