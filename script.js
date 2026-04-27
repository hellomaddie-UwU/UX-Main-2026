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

// Home Carousel Functionality
document.addEventListener('DOMContentLoaded', function () {
    const slider = document.querySelector('.cs2-slider');
    if (!slider) return;

    const track = slider.querySelector('.cs2-slider__track');
    const slides = track.querySelectorAll('.cs2-slider__slide');
    if (slides.length < 2) return;

    const wrapper = slider.closest('.featured-works-tablet-mobile');
    const prevBtn = wrapper && wrapper.querySelector('.cs2-slider__btn-prev');
    const nextBtn = wrapper && wrapper.querySelector('.cs2-slider__btn-next');
    const dotsWrap = wrapper && wrapper.querySelector('.cs2-slider__dots');

    let current = 0;
    let isTransitioning = false;
    const dots = [];

    // Init: hide all slides except the first.
    // The active slide stays in normal flow so the track has natural height.
    slides.forEach(function (slide, i) {
        if (i !== 0) {
            slide.style.display = 'none';
        }
    });

    function updateDots() {
        if (!dots.length) return;

        dots.forEach(function (dot, i) {
            const isActive = i === current;
            dot.classList.toggle('is-active', isActive);
            dot.setAttribute('aria-current', isActive ? 'true' : 'false');
        });
    }

    if (dotsWrap) {
        slides.forEach(function (_slide, i) {
            const dot = document.createElement('button');
            dot.type = 'button';
            dot.className = 'cs2-slider__dot';
            dot.setAttribute('aria-label', 'Go to slide ' + (i + 1));
            dot.addEventListener('click', function () {
                if (i === current) return;
                var dir = i > current ? 1 : -1;
                goTo(i, dir);
            });
            dotsWrap.appendChild(dot);
            dots.push(dot);
        });
        updateDots();
    }

    function goTo(index, dir) {
        if (isTransitioning || index === current) return;
        isTransitioning = true;
        var incoming = slides[index];
        var outgoing = slides[current];

        // Position incoming absolutely so it doesn't affect layout height,
        // then slide it in from the appropriate side.
        incoming.style.position = 'absolute';
        incoming.style.top = '0';
        incoming.style.left = '0';
        incoming.style.width = '100%';
        incoming.style.transition = 'none';
        incoming.style.transform = 'translateX(' + (dir * 100) + '%)';
        incoming.style.display = 'block';

        void incoming.offsetWidth;

        incoming.style.transition = 'transform 0.4s ease';
        outgoing.style.transition = 'transform 0.4s ease';

        incoming.style.transform = 'translateX(0)';
        outgoing.style.transform = 'translateX(' + (-dir * 100) + '%)';

        incoming.addEventListener('transitionend', function onEnd() {
            incoming.removeEventListener('transitionend', onEnd);

            // Promote incoming to normal flow so it provides track height.
            incoming.style.position = '';
            incoming.style.transform = '';
            incoming.style.transition = '';

            // Hide and reset outgoing.
            outgoing.style.display = 'none';
            outgoing.style.transform = '';
            outgoing.style.transition = '';

            current = index;
            updateDots();
            isTransitioning = false;
        });
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', function () {
            var prev = (current - 1 + slides.length) % slides.length;
            goTo(prev, -1);
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', function () {
            var next = (current + 1) % slides.length;
            goTo(next, 1);
        });
    }
});
