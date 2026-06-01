/**
 * Lottie + ScrollTrigger Integration
 * Syncs loading.json animation to scroll position in Timeline Section
 * Animation plays forward/backward as user scrolls
 */

(function() {
  // Guard: Ensure required libraries are loaded
  if (typeof lottie === 'undefined' || typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
    console.warn('Lottie or GSAP libraries not loaded. Skipping lottie-scroll-trigger initialization.');
    return;
  }

  // Guard: Ensure container exists
  const container = document.getElementById('timeline-lottie');
  if (!container) {
    console.warn('Timeline lottie container not found. Skipping initialization.');
    return;
  }

  // Register ScrollTrigger plugin
  gsap.registerPlugin(ScrollTrigger);

  // Initialize Lottie animation
  const timelineAnimation = lottie.loadAnimation({
    container: container,
    renderer: 'svg',
    loop: false,
    autoplay: false,
    path: 'loading.json'
  });

  // Store animation state for scroll callback
  let animationLoaded = false;

  // Wait for animation to fully load before setting up scroll trigger
  timelineAnimation.addEventListener('DOMLoaded', () => {
    animationLoaded = true;
    const totalFrames = timelineAnimation.totalFrames;

    // Create scroll trigger that syncs to animation frames and pins the section
    ScrollTrigger.create({
      trigger: '#timeline-section',
      start: 'top top',
      end: '+=2000', // Extend animation over 2000px of scroll
      pin: '#timeline-pin-wrap', // Pin inner timeline wrapper so section container sizing remains untouched
      scrub: true, // Smooth scrubbing: animation speed matches scroll speed
      onUpdate: (self) => {
        // Map scroll progress (0 to 1) to animation frames
        const frame = self.progress * totalFrames;
        timelineAnimation.goToAndStop(frame, true);
      }
    });
  });
})();
