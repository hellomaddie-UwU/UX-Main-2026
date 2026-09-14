/**
 * Popup modal V3 -- the swipe-up sheet.
 *
 * Below BREAKPOINT the project modal stops being a centred dialog and becomes
 * a sheet that rests PEEK px below the top of the viewport. Dragging it up
 * expands it to full height; once expanded the content scrolls normally.
 *
 * It closes two ways, both from the brief:
 *   1. scrolled back to the top, then dragged down past CLOSE_DRAG
 *   2. tapping the strip above the sheet, which project-modal.js already
 *      handles as a backdrop click
 *
 * Named V3 because this UI is meant to spread to the other popup templates
 * over time -- the class names and the state machine are the contract.
 */
(function () {
    var BREAKPOINT = 992;
    var PEEK       = 120; /*resting offset, matches the CSS translateY*/
    var CLOSE_DRAG = 100; /*drag past the resting position by this to close*/
    var EXPAND_PULL = 40; /*pull up by this from rest to snap open*/

    document.addEventListener('DOMContentLoaded', function () {
        var overlay = document.getElementById('projectModal');
        if (!overlay) return;

        var dialog = overlay.querySelector('.project-modal-dialog');
        if (!dialog) return;

        var expanded = false;
        var dragging = false;
        var startY = 0;
        var offset = PEEK;

        function isSheet() {
            return window.matchMedia('(max-width: ' + BREAKPOINT + 'px)').matches;
        }

        function setOffset(value) {
            offset = value;
            dialog.style.transform = 'translateY(' + value + 'px)';
        }

        /*Back to the CSS-driven presentation -- inline transforms would
        otherwise survive into the desktop layout*/
        function clearInline() {
            dialog.style.transform = '';
            dialog.classList.remove('is-dragging');
        }

        function rest() {
            expanded = false;
            dialog.classList.remove('is-expanded');
            clearInline();
            offset = PEEK;
        }

        function expand() {
            expanded = true;
            dialog.classList.add('is-expanded');
            clearInline();
            offset = 0;
        }

        function close() {
            var closeBtn = overlay.querySelector('.project-modal-close');
            if (closeBtn) closeBtn.click();
        }

        function onTouchStart(event) {
            if (!isSheet() || event.touches.length !== 1) return;

            startY = event.touches[0].clientY;
            dragging = false;
        }

        function onTouchMove(event) {
            if (!isSheet() || event.touches.length !== 1) return;

            var delta = event.touches[0].clientY - startY;
            var atTop = dialog.scrollTop <= 0;

            /*Pulling up while the sheet is still resting raises the sheet
            rather than scrolling the content behind it*/
            var raising = !expanded && delta < 0;
            /*Pulling down only moves the sheet once the content has nothing
            left to scroll -- otherwise it is an ordinary scroll gesture*/
            var lowering = delta > 0 && atTop;

            if (!raising && !lowering) {
                if (dragging) {
                    dragging = false;
                    dialog.classList.remove('is-dragging');
                }
                return;
            }

            if (!dragging) {
                dragging = true;
                dialog.classList.add('is-dragging');
            }

            var next = (expanded ? 0 : PEEK) + delta;
            if (next < 0) next = 0;

            setOffset(next);
            event.preventDefault();
        }

        function onTouchEnd() {
            if (!isSheet() || !dragging) return;

            dragging = false;
            dialog.classList.remove('is-dragging');

            if (offset > PEEK + CLOSE_DRAG) {
                close();
                return;
            }

            if (offset <= PEEK - EXPAND_PULL) {
                expand();
                return;
            }

            rest();
        }

        dialog.addEventListener('touchstart', onTouchStart, {passive: true});
        dialog.addEventListener('touchmove', onTouchMove, {passive: false});
        dialog.addEventListener('touchend', onTouchEnd);
        dialog.addEventListener('touchcancel', onTouchEnd);

        /*Every open starts from the resting position, scrolled to the top*/
        var observer = new MutationObserver(function () {
            if (!overlay.classList.contains('is-open')) return;

            dialog.scrollTop = 0;
            rest();
        });

        observer.observe(overlay, {attributes: true, attributeFilter: ['class']});

        window.addEventListener('resize', function () {
            if (isSheet()) return;

            /*Desktop takes over -- drop anything the sheet left behind*/
            expanded = false;
            dialog.classList.remove('is-expanded');
            clearInline();
        });
    });
}());
