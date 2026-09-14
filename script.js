/* ───────────────────────────────────────────────
Table of Contents
1. Global Settings
    1.A. 
2. Custom Settings

1. Navigation > Service Dropdown
2. Table | Mobile Menu > Toggle Button
3. Home > Case Study Section > Case Study Cards: 
    [fade + slide up into view on scroll] Animation: Desktop | Tablet View
4. Mobile Menu > Dropdown Menu Functionality
5. Current Passion Project Thumbnail: [cursor image] Desktop | Tablet View
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


/* ───────────────────────────────────────────────
Current Passion Project Thumbnail: [cursor image] Desktop | Tablet View
───────────────────────────────────────────────*/
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
// Exposed as window.toolIconTooltips so markup rendered later -- the project
// modal builds its tool icons on open -- can attach tooltips to its own icons.
(function () {
    function init(root) {
        var scope = root || document;
        var toolIcons = scope.querySelectorAll('.tools-icon');
        if (!toolIcons.length) return;

        Array.prototype.forEach.call(toolIcons, function (icon) {
            var img = icon.querySelector('img');
            if (!img || !img.alt) return;

            /*Already wired -- a re-render would otherwise stack duplicates*/
            if (icon.querySelector('.tooltip')) return;

            icon.classList.add('tooltip-wrap');
            if (!icon.hasAttribute('tabindex')) {
                icon.setAttribute('tabindex', '0');
            }

            var tooltip = document.createElement('span');
            tooltip.className = 'tooltip tooltip-top';
            tooltip.setAttribute('role', 'tooltip');
            tooltip.textContent = img.alt;

            icon.appendChild(tooltip);
            escapeClipping(icon, tooltip);
        });
    }

    /*A tooltip inside a scrolling or hidden ancestor gets clipped by it. That
    is an overflow clip, not a paint order problem, so no z-index escapes it --
    the tooltip has to stop being positioned by that ancestor. Switching it to
    position:fixed while it is shown does exactly that.*/
    function isClipped(el) {
        var node = el.parentElement;

        while (node && node !== document.body) {
            if (getComputedStyle(node).overflow !== 'visible') return true;
            node = node.parentElement;
        }

        return false;
    }

    /*transform, filter and perspective all make an ancestor the containing
    block for position:fixed descendants -- the tooltip would then be measured
    against that ancestor instead of the viewport, and clipped by it anyway.
    The swipe-up sheet is transformed, so this is a live case, not a hypothetical*/
    function hasFixedContainingBlock(el) {
        var node = el.parentElement;

        while (node && node !== document.body) {
            var style = getComputedStyle(node);

            if (style.transform !== 'none' ||
                style.filter !== 'none' ||
                style.perspective !== 'none') {
                return true;
            }

            node = node.parentElement;
        }

        return false;
    }

    function escapeClipping(icon, tooltip) {
        function show() {
            if (!isClipped(icon) || hasFixedContainingBlock(icon)) return;

            var rect = icon.getBoundingClientRect();

            /*Centred on the trigger and sitting 16px above it, matching what
            .tooltip-top does when it can position normally*/
            tooltip.style.position = 'fixed';
            tooltip.style.top = 'auto';
            tooltip.style.left = (rect.left + rect.width / 2) + 'px';
            tooltip.style.bottom = (window.innerHeight - rect.top + 16) + 'px';
        }

        function hide() {
            tooltip.style.position = '';
            tooltip.style.top = '';
            tooltip.style.left = '';
            tooltip.style.bottom = '';
        }

        icon.addEventListener('mouseenter', show);
        icon.addEventListener('focus', show);
        icon.addEventListener('mouseleave', hide);
        icon.addEventListener('blur', hide);
    }

    window.toolIconTooltips = {init: init};

    init();
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

/* ── Contact Modal ────────────────────────────────────────────────────────
   Opens the hero's "Hit Me Up" form as an overlay. Closes on the X, the
   mobile Back link, a click on the backdrop, or Escape.
   The modal form is a separate instance from the one in the contact section,
   so it carries its own IDs and its own submit handler; contact-form.js
   continues to own #contactForm untouched. */
(function () {
    var modal = document.getElementById('contactModal');
    if (!modal) return;

    var openers = document.querySelectorAll('[data-contact-modal-open]');
    var lastFocused = null;
    var previousBodyOverflow = '';

    function openModal(trigger) {
        /* Guard: opening while already open would overwrite previousBodyOverflow
           with 'hidden', and the page would stay locked after closing */
        if (modal.classList.contains('is-open')) return;

        lastFocused = trigger || document.activeElement;
        previousBodyOverflow = document.body.style.overflow;
        document.body.style.overflow = 'hidden';
        modal.classList.add('is-open');

        var firstField = modal.querySelector('input:not([type="hidden"]):not([tabindex="-1"]), select, textarea');
        if (firstField) firstField.focus();
    }

    function closeModal() {
        modal.classList.remove('is-open');
        document.body.style.overflow = previousBodyOverflow;
        if (lastFocused && typeof lastFocused.focus === 'function') lastFocused.focus();
    }

    openers.forEach(function (btn) {
        btn.addEventListener('click', function (event) {
            event.preventDefault();
            openModal(btn);
        });
    });

    modal.addEventListener('click', function (event) {
        var closer = event.target.closest('[data-contact-modal-close]');
        if (!closer) return;
        event.preventDefault();
        closeModal();
    });

    document.addEventListener('keydown', function (event) {
        if (event.key === 'Escape' && modal.classList.contains('is-open')) closeModal();
    });

    /* Submit handling — mirrors contact-form.js, scoped to the modal instance */
    var form = document.getElementById('contactFormModal');
    if (!form) return;

    var statusEl = document.getElementById('contactFormModalStatus');
    var submitButton = form.querySelector('button[type="submit"]');
    var pageUrlField = form.querySelector('input[name="page_url"]');

    if (pageUrlField) pageUrlField.value = window.location.href;

    function setStatus(message, type) {
        if (!statusEl) return;
        statusEl.hidden = false;
        statusEl.textContent = message;
        statusEl.classList.remove('text-success', 'text-danger', 'text-body');
        if (type === 'success') statusEl.classList.add('text-success');
        else if (type === 'error') statusEl.classList.add('text-danger');
        else statusEl.classList.add('text-body');
    }

    form.addEventListener('submit', async function (event) {
        event.preventDefault();

        if (!form.checkValidity()) {
            form.reportValidity();
            return;
        }

        if (submitButton) {
            submitButton.disabled = true;
            submitButton.textContent = 'Sending...';
        }
        setStatus('Sending your message...', 'pending');

        try {
            var response = await fetch(form.action, {
                method: form.method,
                body: new FormData(form),
                headers: { Accept: 'application/json' }
            });

            if (response.ok) {
                setStatus('Thank you. Your message has been sent successfully!', 'success');
                form.reset();
            } else {
                var message = 'Something went wrong. Please try again in a moment.';
                try {
                    var data = await response.json();
                    if (data && data.errors && data.errors.length > 0 && data.errors[0].message) {
                        message = data.errors[0].message;
                    } else if (data && data.error) {
                        /* Formspree reports configuration problems as a singular
                           "error" string (e.g. reCAPTCHA blocking AJAX). Those are
                           for us, not the visitor -- log it, keep the generic copy */
                        console.error('Formspree rejected the submission:', data.error);
                    }
                } catch (_error) {
                    // Keep the default message when no JSON error payload is present.
                }
                setStatus(message, 'error');
            }
        } catch (_error) {
            setStatus('Network issue detected. Please check your connection and try again.', 'error');
        } finally {
            if (submitButton) {
                submitButton.disabled = false;
                submitButton.textContent = 'Submit';
            }
        }
    });
}());
