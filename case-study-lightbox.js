(function () {
    document.addEventListener('DOMContentLoaded', function () {
        var selector = '.cs-carousel__track img, .indiv-case-study-img img, .discovery-accordion-panel img, .iteration-content img';
        var images = Array.prototype.slice.call(document.querySelectorAll(selector));
        if (!images.length) return;

        var overlayMarkup = [
            '<div class="cs-lightbox-overlay" id="csLightbox" aria-hidden="true">',
            '  <div class="cs-lightbox-backdrop"></div>',
            '  <div class="cs-lightbox-dialog" role="dialog" aria-modal="true" aria-label="Image preview">',
            '    <img class="cs-lightbox-image" src="" alt="">',
            '    <button type="button" class="cs-lightbox-close" aria-label="Close">',
            '      <img src="/imgs/close.svg" alt="" aria-hidden="true">',
            '    </button>',
            '  </div>',
            '</div>'
        ].join('');

        document.body.insertAdjacentHTML('beforeend', overlayMarkup);

        var overlay = document.getElementById('csLightbox');
        var backdrop = overlay.querySelector('.cs-lightbox-backdrop');
        var dialog = overlay.querySelector('.cs-lightbox-dialog');
        var closeBtn = overlay.querySelector('.cs-lightbox-close');
        var imageEl = overlay.querySelector('.cs-lightbox-image');

        var activeGroup = [];
        var activeIndex = 0;
        var activeTrigger = null;
        var previousBodyOverflow = '';

        function getGroup(img) {
            var track = img.closest('.cs-carousel__track');
            if (track) {
                return Array.prototype.slice.call(track.querySelectorAll('img'));
            }
            var panel = img.closest('.discovery-accordion-panel') || img.closest('.iteration-content');
            if (panel) {
                return Array.prototype.slice.call(panel.querySelectorAll('img'));
            }
            return [img];
        }

        function render(index) {
            var img = activeGroup[index];
            if (!img) return;
            activeIndex = index;
            imageEl.src = img.getAttribute('src') || '';
            imageEl.alt = img.getAttribute('alt') || '';
        }

        function open(img) {
            activeGroup = getGroup(img);
            activeIndex = activeGroup.indexOf(img);
            if (activeIndex < 0) activeIndex = 0;
            activeTrigger = img;

            render(activeIndex);

            previousBodyOverflow = document.body.style.overflow;
            document.body.style.overflow = 'hidden';
            overlay.classList.add('is-open');
            overlay.setAttribute('aria-hidden', 'false');
            closeBtn.focus();
        }

        function close() {
            overlay.classList.remove('is-open');
            overlay.setAttribute('aria-hidden', 'true');
            document.body.style.overflow = previousBodyOverflow;

            if (activeTrigger && typeof activeTrigger.focus === 'function') {
                activeTrigger.focus();
            }
        }

        function goToNext() {
            if (!activeGroup.length) return;
            render((activeIndex + 1) % activeGroup.length);
        }

        function goToPrev() {
            if (!activeGroup.length) return;
            render((activeIndex - 1 + activeGroup.length) % activeGroup.length);
        }

        images.forEach(function (img) {
            img.classList.add('cs-lightbox-trigger');
            img.setAttribute('tabindex', '0');
            img.setAttribute('role', 'button');
            img.setAttribute('aria-label', 'View larger image');

            img.addEventListener('click', function () {
                open(img);
            });

            img.addEventListener('keydown', function (event) {
                if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault();
                    open(img);
                }
            });
        });

        closeBtn.addEventListener('click', close);

        overlay.addEventListener('click', function (event) {
            if (event.target === overlay || event.target === backdrop) {
                close();
            }
        });

        document.addEventListener('keydown', function (event) {
            if (!overlay.classList.contains('is-open')) return;

            if (event.key === 'Escape') {
                event.preventDefault();
                close();
                return;
            }

            if (event.key === 'ArrowRight') {
                event.preventDefault();
                goToNext();
                return;
            }

            if (event.key === 'ArrowLeft') {
                event.preventDefault();
                goToPrev();
            }
        });
    });
}());
