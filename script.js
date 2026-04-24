//mobile menu toggle
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const mobileMenu = document.querySelector('.mobile-menu');
const mobileMenuOverlay = document.querySelector('.mobile-menu-overlay');

const MOBILE_OVERLAY_MAX_WIDTH = 567;

function shouldUseOverlay() {
    return window.innerWidth <= MOBILE_OVERLAY_MAX_WIDTH;
}

function syncOverlayWithMenuState() {
    if (!mobileMenuToggle || !mobileMenu || !mobileMenuOverlay) {
        return;
    }

    if (!shouldUseOverlay()) {
        mobileMenuOverlay.classList.remove('is-open');
        return;
    }

    mobileMenuOverlay.classList.toggle('is-open', mobileMenu.classList.contains('is-open'));
}

function toggleMobileMenu() {
    if (!mobileMenuToggle || !mobileMenu || !mobileMenuOverlay) {
        return;
    }

    mobileMenuToggle.classList.toggle('is-active');
    mobileMenu.classList.toggle('is-open');
    syncOverlayWithMenuState();
}

if (mobileMenuToggle && mobileMenu && mobileMenuOverlay) {
    mobileMenuToggle.addEventListener('click', toggleMobileMenu);

    mobileMenuOverlay.addEventListener('click', () => {
        mobileMenuToggle.classList.remove('is-active');
        mobileMenu.classList.remove('is-open');
        mobileMenuOverlay.classList.remove('is-open');
    });

    window.addEventListener('resize', syncOverlayWithMenuState);
};

// Dropdown Menu Functionality
const btn = document.getElementById('dropdownBtn');
const menu = document.getElementById('dropdownMenu');
const arrow = btn.querySelector('.dropdown-arrow');

btn.addEventListener('click', (e) => {
    e.stopPropagation();
    menu.classList.toggle('is-open');
    arrow.classList.toggle('is-open');
});

document.addEventListener('click', () => {
    menu.classList.remove('is-open');
    arrow.classList.remove('is-open');
});

//Horizontal Scroll Gallery with GSAP and ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

window.addEventListener('load', () => {
    const horizontalSections = gsap.utils.toArray(".horiz-gallery-wrapper");

    horizontalSections.forEach((sec) => {
        const strip = sec.querySelector(".horiz-gallery-strip");

        gsap.to(strip, {
            x: () => -(strip.scrollWidth - window.innerWidth),
            ease: "none",
            scrollTrigger: {
                trigger: sec, // which element starts the effect
                pin: true, // locks the section in place while scrolling
                scrub: 1, // ties animation to scroll position (1 = slight lag/smoothness)
                start: "center center", // starts when top of section hits top of viewport
                end: () => `+=${strip.scrollWidth}`, // ends after scrolling the full width of the strip
                invalidateOnRefresh: true // recalculates values if window is resized
            }
        });
    });

    // Force ScrollTrigger to recalculate after load
    ScrollTrigger.refresh();

});
