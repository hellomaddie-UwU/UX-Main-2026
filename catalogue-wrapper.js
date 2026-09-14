/**
 * Catalogue wrapper overflow.
 *
 * A .catalogue-wrapper holds [industry pills] | divider | [output-type pills]
 * and is allowed to wrap onto MAX_ROWS rows. Anything that would spill past
 * that budget is hidden, and a .tag-count chip is appended saying how many
 * pills were dropped.
 *
 * Wrappers are measured through a ResizeObserver rather than a resize
 * listener, because three of the places they appear start out with no width:
 * the carousel's inactive slides, the project modal while it is closed, and
 * any wrapper whose pills are still laid out in a fallback font. Each of
 * those gets its real width later, and the observer catches all of them.
 */
(function () {
    var MAX_ROWS = 2;

    /*Everything in the wrapper except the chip, which is ours to manage*/
    function itemsOf(wrapper) {
        return Array.prototype.slice.call(wrapper.children).filter(function (el) {
            return !el.classList.contains('tag-count');
        });
    }

    function isPill(el) {
        return el.classList.contains('pill');
    }

    function hiddenPillCount(items) {
        return items.filter(function (el) {
            return el.hidden && isPill(el);
        }).length;
    }

    /*Back to "everything visible, no chip" so a re-fit never inherits the
    previous pass's decisions -- this is also what cleans up the markup
    project-modal.js copies out of an already-fitted card*/
    function reset(wrapper) {
        var chip = wrapper.querySelector('.tag-count');
        if (chip) wrapper.removeChild(chip);

        itemsOf(wrapper).forEach(function (el) {
            el.hidden = false;
        });
    }

    /*Two items share a row when they share an offsetTop. Rounding absorbs the
    sub-pixel drift flex leaves behind at fractional zoom levels*/
    function rowsUsed(list) {
        var tops = [];

        list.forEach(function (el) {
            var top = Math.round(el.offsetTop / 4);
            if (tops.indexOf(top) === -1) tops.push(top);
        });

        return tops.length;
    }

    function fit(wrapper) {
        if (!wrapper) return;

        /*No width means nothing can be measured -- every item would report
        offsetTop 0 and read as a single row, which would wrongly clear the
        chip. Leave the current state alone until the observer says it has a
        box to work with*/
        if (!wrapper.getBoundingClientRect().width) return;

        reset(wrapper);

        var items = itemsOf(wrapper);
        if (!items.length) return;

        var visible = items.slice();
        if (rowsUsed(visible) <= MAX_ROWS) return;

        var chip = document.createElement('span');
        chip.className = 'tag-count';
        wrapper.appendChild(chip);

        /*Drop one item off the end at a time until what's left -- chip
        included, since it occupies a slot too -- fits the row budget*/
        while (visible.length) {
            visible.pop().hidden = true;
            chip.textContent = hiddenPillCount(items);

            if (rowsUsed(visible.concat([chip])) <= MAX_ROWS) break;
        }

        /*A divider left sitting at the end has nothing to divide*/
        while (visible.length && !isPill(visible[visible.length - 1])) {
            visible.pop().hidden = true;
        }

        var count = hiddenPillCount(items);

        /*Only dividers were dropped -- no pills are actually missing*/
        if (!count) {
            wrapper.removeChild(chip);
            return;
        }

        chip.textContent = count;

        var label = document.createElement('span');
        label.className = 'visually-hidden';
        label.textContent = ' more tags';
        chip.appendChild(label);
    }

    function wrappers() {
        return Array.prototype.slice.call(document.querySelectorAll('.catalogue-wrapper'));
    }

    function fitAll() {
        wrappers().forEach(fit);
    }

    window.catalogueWrapper = {fit: fit, fitAll: fitAll};

    document.addEventListener('DOMContentLoaded', function () {
        fitAll();

        if (typeof ResizeObserver === 'function') {
            /*Hiding pills changes a wrapper's height, which would re-notify
            the observer and loop. Only a width change can alter where the
            rows break, so that is the only change worth re-fitting on*/
            var lastWidth = new WeakMap();

            var observer = new ResizeObserver(function (entries) {
                entries.forEach(function (entry) {
                    var width = Math.round(entry.contentRect.width);
                    if (lastWidth.get(entry.target) === width) return;

                    lastWidth.set(entry.target, width);
                    fit(entry.target);
                });
            });

            wrappers().forEach(function (wrapper) {
                observer.observe(wrapper);
            });
            return;
        }

        var resizeTimer;
        window.addEventListener('resize', function () {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(fitAll, 150);
        });
    });
}());
