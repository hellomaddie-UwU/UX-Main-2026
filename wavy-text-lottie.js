/**
 * Loads the "good design" scrolling text Lottie animation
 * into the #wavy-text-lottie container.
 */
(function() {
  if (typeof lottie === 'undefined') {
    console.warn('Lottie library not loaded. Skipping wavy text animation.');
    return;
  }

  const container = document.getElementById('wavy-text-lottie');
  if (!container) return;

  lottie.loadAnimation({
    container: container,
    renderer: 'svg',
    loop: true,
    autoplay: true,
    path: '/text-scroll.json'
  });
})();
