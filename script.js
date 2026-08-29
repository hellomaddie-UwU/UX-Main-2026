/* ───────────────────────────────────────────────
Table of Contents
1. Navigation > Service Dropdown
2. Table | Mobile Menu > Toggle Button
3. Home > Case Study Section > Case Study Cards: 
    [fade + slide up into view on scroll] Animation: Desktop | Tablet View
4. Mobile Menu > Dropdown Menu Functionality
───────────────────────────────────────────────*/

/* ───────────────────────────────────────────────
Navigation > Service Dropdown
───────────────────────────────────────────────*/
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


/* ───────────────────────────────────────────────
Table | Mobile Menu > Toggle Button
───────────────────────────────────────────────*/
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

/* ───────────────────────────────────────────────
Home > Case Study Section > Case Study Cards: 
    [fade + slide up into view on scroll] Animation: Desktop | Tablet View
───────────────────────────────────────────────*/
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


/* ───────────────────────────────────────────────
Mobile Menu > Dropdown Menu Functionality
───────────────────────────────────────────────*/
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

        container.addEventListener('mouseenter', function (e) {
            card.style.left = e.clientX + 'px';
            card.style.top = e.clientY + 'px';
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

// Tool icon tooltips: hover/focus a .tools-icon to see its tool name
(function () {
    var toolIcons = document.querySelectorAll('.tools-icon');
    if (!toolIcons.length) return;

    toolIcons.forEach(function (icon) {
        var img = icon.querySelector('img');
        if (!img || !img.alt) return;

        icon.classList.add('tooltip-wrap');
        if (!icon.hasAttribute('tabindex')) {
            icon.setAttribute('tabindex', '0');
        }

        var tooltip = document.createElement('span');
        tooltip.className = 'tooltip tooltip-top';
        tooltip.setAttribute('role', 'tooltip');
        tooltip.textContent = img.alt;

        icon.appendChild(tooltip);
    });
}());

// Modal dialog tabs: switch .tab-panel content via a .modal-tabs[role=tablist]
(function () {
    var tabButtons = document.querySelectorAll('.modal-tab[data-tab-target]');
    if (!tabButtons.length) return;

    tabButtons.forEach(function (btn) {
        btn.addEventListener('click', function () {
            var tablist = btn.closest('[role="tablist"]');
            var dialog = btn.closest('.modal-primary, .modal-secondary');
            if (!tablist || !dialog) return;

            tablist.querySelectorAll('.modal-tab').forEach(function (tab) {
                var isActive = tab === btn;
                tab.classList.toggle('is-active', isActive);
                tab.setAttribute('aria-selected', isActive ? 'true' : 'false');
                tab.setAttribute('tabindex', isActive ? '0' : '-1');
            });

            var targetId = btn.getAttribute('data-tab-target');
            dialog.querySelectorAll('.tab-panel').forEach(function (panel) {
                panel.hidden = panel.id !== targetId;
            });
        });
    });
}());
