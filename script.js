//nav service dropdown functionality
(function () {
    var trigger = document.getElementById('desktopServicesBtn');
    var dropdown = document.getElementById('desktopServicesDropdown');

    if (!trigger || !dropdown) return;

    function openDropdown() {
        dropdown.classList.add('dropdown-open');
        trigger.setAttribute('aria-expanded', 'true');
    }

    function closeDropdown() {
        dropdown.classList.remove('dropdown-open');
        trigger.setAttribute('aria-expanded', 'false');
    }

    function isOpen() {
        return dropdown.classList.contains('dropdown-open');
    }

    // Toggle on Services click
    trigger.addEventListener('click', function (e) {
        e.preventDefault();
        e.stopPropagation();
        isOpen() ? closeDropdown() : openDropdown();
    });

    // Click inside dropdown closes it
    dropdown.addEventListener('click', function () {
        closeDropdown();
    });

    // Click outside both trigger and dropdown closes it
    document.addEventListener('click', function (e) {
        if (!trigger.contains(e.target) && !dropdown.contains(e.target)) {
            closeDropdown();
        }
    });

    // Escape key closes it and returns focus to trigger
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && isOpen()) {
            closeDropdown();
            trigger.focus();
        }
    });
}());

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

// Featured work cards: fade + slide up into view on scroll (desktop/tablet)
(function () {
    var cards = document.querySelectorAll('.featured-works-desktop .reveal-card');
    if (!cards.length) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    if (!('IntersectionObserver' in window)) {
        cards.forEach(function (card) { card.classList.add('is-visible'); });
        return;
    }

    var observer = new IntersectionObserver(function (entries, obs) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                obs.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -10% 0px'
    });

    cards.forEach(function (card) { observer.observe(card); });
}());

// Dropdown Menu Functionality
const btn = document.getElementById('dropdownBtn');
const menu = document.getElementById('dropdownMenu');

if (btn && menu) {
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
}

// Current Passion Project: explanation card follows the mouse on hover
(function () {
    var containers = document.querySelectorAll('.cursor-coming-soon');
    if (!containers.length) return;

    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;

    containers.forEach(function (container) {
        var card = container.querySelector('.passion-prj-cursor-card');
        if (!card) return;

        container.addEventListener('mouseenter', function () {
            card.classList.add('is-active');
        });

        container.addEventListener('mousemove', function (e) {
            card.style.left = e.clientX + 'px';
            card.style.top = e.clientY + 'px';
        });

        container.addEventListener('mouseleave', function () {
            card.classList.remove('is-active');
        });
    });
}());
