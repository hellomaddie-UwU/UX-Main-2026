/* ───────────────────────────────────────────────
About Me > Introduction, Tools & Employment
Dashed SVG lines connecting the three dialogs.

Hi and Tools sit together in the first viewport, so
rather than scrubbing with scroll (no real distance
to scrub over there), they play a fixed sequence the
moment Hi scrolls into view: Hi fades in -> 0.5s ->
line 1 draws in -> 0.5s -> Tools fades in.

Employment sits well below the fold, so on desktop
(993px+) line 2 and the Employment dialog are
scroll-scrubbed instead: they play forwards and
backwards in direct sync with scroll position as
you scroll down from Tools.

Below 993px both connector lines are hidden (see
about-us.css) and Employment falls back to the same
one-time fade-in as Hi and Tools.
───────────────────────────────────────────────*/
(function () {
    var wrapper          = document.querySelector('.intro-employment-wrapper');
    var hiDialog         = document.getElementById('introDialog');
    var toolsDialog      = document.getElementById('toolsDialog');
    var employmentDialog = document.getElementById('employmentDialog');
    var overlay          = document.getElementById('connectorOverlay');
    var path1            = document.getElementById('connectorPath1');
    var path2            = document.getElementById('connectorPath2');
    var maskPath1        = document.getElementById('connectorMaskPath1');
    var maskPath2        = document.getElementById('connectorMaskPath2');

    if (!wrapper || !hiDialog || !toolsDialog || !employmentDialog || !overlay ||
        !path1 || !path2 || !maskPath1 || !maskPath2) return;

    var DESKTOP_MIN_WIDTH = 993;
    var maskLengths       = {};
    var hasGSAP           = typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined';
    var scrubBuilt        = false;

    if (hasGSAP) gsap.registerPlugin(ScrollTrigger);

    function isDesktop() {
        return window.innerWidth >= DESKTOP_MIN_WIDTH;
    }

    function reduceMotion() {
        return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    }

    function rectRelativeTo(el, container) {
        var elRect = el.getBoundingClientRect();
        var containerRect = container.getBoundingClientRect();
        return {
            top:    elRect.top - containerRect.top,
            left:   elRect.left - containerRect.left,
            right:  elRect.right - containerRect.left,
            bottom: elRect.bottom - containerRect.top,
            width:  elRect.width,
            height: elRect.height
        };
    }

    function primeMask(maskPath) {
        var length = maskPath.getTotalLength();
        maskLengths[maskPath.id] = length;

        if (reduceMotion()) {
            maskPath.style.strokeDasharray  = 'none';
            maskPath.style.strokeDashoffset = 0;
        } else {
            maskPath.style.strokeDasharray  = length;
            maskPath.style.strokeDashoffset = length;
        }
    }

    function buildPaths() {
        if (!isDesktop()) return;

        var hi         = rectRelativeTo(hiDialog, wrapper);
        var tools      = rectRelativeTo(toolsDialog, wrapper);
        var employment = rectRelativeTo(employmentDialog, wrapper);

        overlay.setAttribute('width', Math.ceil(wrapper.scrollWidth));
        overlay.setAttribute('height', Math.ceil(wrapper.scrollHeight));

        // Path 1: Hi (right edge, just under the header) -> Tools (left edge,
        // also just under its header). Both use the same fixed offset since
        // the two headers are the same height — a proportional offset here
        // (e.g. tools.height * 0.3) would drift depending on how many rows
        // the tools icon grid wraps into.
        var y1    = hi.top + 250;
        var midX1 = hi.right + (tools.left - hi.right) / 2;
        var y2    = tools.top + 250;
        var d1    = 'M' + hi.right + ',' + y1 + ' H' + midX1 + ' V' + y2 + ' H' + tools.left;

        // Path 2: Tools (bottom edge, centered) -> Employment (top edge, centered)
        // Jog left soon after leaving Tools, rather than at the midpoint —
        // the vertical gap here can be large, and a 50/50 split left too
        // much empty space before the line visibly does anything.
        var x1   = tools.left + tools.width / 2;
        var y3   = tools.bottom;
        var midY = y3 + Math.min(48, (employment.top - y3) / 2);
        var x2   = employment.left + employment.width / 2;
        var d2   = 'M' + x1 + ',' + y3 + ' V' + midY + ' H' + x2 + ' V' + employment.top;

        path1.setAttribute('d', d1);
        path2.setAttribute('d', d2);
        maskPath1.setAttribute('d', d1);
        maskPath2.setAttribute('d', d2);

        primeMask(maskPath1);
        primeMask(maskPath2);

        if (hasGSAP) ScrollTrigger.refresh();
    }

    function drawMaskInstantly(maskPath) {
        maskPath.style.strokeDashoffset = 0;
    }

    // ── Hi -> (delay) -> line 1 -> (delay) -> Tools ──
    // A fixed sequence triggered once, the moment Hi scrolls into view.
    var INTRO_STEP_DELAY = 500;

    function runIntroSequence() {
        hiDialog.classList.add('is-visible');

        if (!hasGSAP || reduceMotion()) {
            drawMaskInstantly(maskPath1);
            toolsDialog.classList.add('is-visible');
            return;
        }

        window.setTimeout(function () {
            gsap.to(maskPath1, {
                strokeDashoffset: 0,
                duration: 1,
                ease: 'power2.out'
            });

            window.setTimeout(function () {
                toolsDialog.classList.add('is-visible');
            }, INTRO_STEP_DELAY);
        }, INTRO_STEP_DELAY);
    }

    function setupIntroSequence() {
        if (!('IntersectionObserver' in window)) {
            runIntroSequence();
            return;
        }

        var observer = new IntersectionObserver(function (entries, obs) {
            entries.forEach(function (entry) {
                if (!entry.isIntersecting) return;
                obs.unobserve(entry.target);
                runIntroSequence();
            });
        }, {threshold: 0.1, rootMargin: '0px 0px -10% 0px'});

        observer.observe(hiDialog);
    }

    // ── Line 2 + Employment: scroll-scrubbed on desktop ──
    function setupEmploymentScrub() {
        if (!hasGSAP || reduceMotion()) {
            employmentDialog.classList.add('is-visible');
            return;
        }

        if (scrubBuilt) return;
        scrubBuilt = true;

        var offsetY = parseFloat(getComputedStyle(employmentDialog)
            .getPropertyValue('--reveal-offset-y')) || 0;

        gsap.timeline({
            scrollTrigger: {
                trigger: employmentDialog,
                start:   'top bottom',
                end:     'center center',
                scrub:   true
            }
        })
        .fromTo(maskPath2, {
            strokeDashoffset: function () { return maskLengths[maskPath2.id]; }
        }, {
            strokeDashoffset: 0,
            ease: 'none',
            duration: 1
        })
        .fromTo(employmentDialog,
            {opacity: 0, y: offsetY},
            {opacity: 1, y: 0, ease: 'none', duration: 1});
    }

    // ── Employment: below the desktop breakpoint, connector lines are
    // hidden entirely, so it just fades in on its own like Hi and Tools. ──
    function setupEmploymentReveal() {
        if (isDesktop()) {
            setupEmploymentScrub();
            return;
        }

        if (!('IntersectionObserver' in window)) {
            employmentDialog.classList.add('is-visible');
            return;
        }

        var observer = new IntersectionObserver(function (entries, obs) {
            entries.forEach(function (entry) {
                if (!entry.isIntersecting) return;
                employmentDialog.classList.add('is-visible');
                obs.unobserve(entry.target);
            });
        }, {threshold: 0.1, rootMargin: '0px 0px -10% 0px'});

        observer.observe(employmentDialog);
    }

    var resizeTimeout;
    window.addEventListener('resize', function () {
        window.clearTimeout(resizeTimeout);
        resizeTimeout = window.setTimeout(buildPaths, 150);
    });

    buildPaths();
    window.addEventListener('load', buildPaths);
    setupIntroSequence();
    setupEmploymentReveal();
}());
