(function () {
    document.addEventListener('DOMContentLoaded', function () {
        var thumbnails = Array.prototype.slice.call(document.querySelectorAll('.gallery-img'));
        if (!thumbnails.length) return;

        var lightboxMarkup = [
            '<div class="lightbox-overlay" id="galleryLightbox" aria-hidden="true">',
            '  <div class="lightbox-dialog" role="dialog" aria-modal="true" aria-labelledby="lightboxTitle" aria-describedby="lightboxDescription">',
            '    <button type="button" class="lightbox-close" aria-label="Close lightbox">',
            '      <span aria-hidden="true">&times;</span>',
            '    </button>',
            '    <button type="button" class="lightbox-nav lightbox-prev" aria-label="Previous image">',
            '      <span aria-hidden="true">&#10094;</span>',
            '    </button>',
            '    <figure class="lightbox-figure">',
            '      <img class="lightbox-image" src="" alt="">',
            '      <figcaption class="lightbox-meta">',
            '        <h3 id="lightboxTitle" class="lightbox-title"></h3>',
            '        <p class="lightbox-date"></p>',
            '        <p id="lightboxDescription" class="lightbox-description"></p>',
            '      </figcaption>',
            '    </figure>',
            '    <button type="button" class="lightbox-nav lightbox-next" aria-label="Next image">',
            '      <span aria-hidden="true">&#10095;</span>',
            '    </button>',
            '  </div>',
            '</div>'
        ].join('');

        document.body.insertAdjacentHTML('beforeend', lightboxMarkup);

        var overlay = document.getElementById('galleryLightbox');
        var dialog = overlay ? overlay.querySelector('.lightbox-dialog') : null;
        var closeBtn = overlay ? overlay.querySelector('.lightbox-close') : null;
        var prevBtn = overlay ? overlay.querySelector('.lightbox-prev') : null;
        var nextBtn = overlay ? overlay.querySelector('.lightbox-next') : null;
        var imageEl = overlay ? overlay.querySelector('.lightbox-image') : null;
        var titleEl = overlay ? overlay.querySelector('.lightbox-title') : null;
        var dateEl = overlay ? overlay.querySelector('.lightbox-date') : null;
        var descriptionEl = overlay ? overlay.querySelector('.lightbox-description') : null;

        if (!overlay || !dialog || !closeBtn || !prevBtn || !nextBtn || !imageEl || !titleEl || !dateEl || !descriptionEl) {
            return;
        }

        var galleryItems = thumbnails.map(function (thumb) {
            var siblingCaption = thumb.nextElementSibling && thumb.nextElementSibling.tagName === 'P'
                ? thumb.nextElementSibling.textContent.trim()
                : '';

            return {
                src: thumb.getAttribute('src') || '',
                alt: thumb.getAttribute('alt') || siblingCaption || 'Gallery image',
                title: thumb.dataset.title || siblingCaption || 'Untitled',
                date: thumb.dataset.date || 'Date not specified',
                description: thumb.dataset.description || 'No description provided yet.',
                trigger: thumb
            };
        }).filter(function (item) {
            return item.src;
        });

        if (!galleryItems.length) return;

        var currentIndex = 0;
        var activeTrigger = null;
        var previousBodyOverflow = '';

        function wrapIndex(index) {
            return (index + galleryItems.length) % galleryItems.length;
        }

        function render(index) {
            var safeIndex = wrapIndex(index);
            var item = galleryItems[safeIndex];
            if (!item) return;

            currentIndex = safeIndex;
            imageEl.src = item.src;
            imageEl.alt = item.alt;
            titleEl.textContent = item.title;
            dateEl.textContent = item.date;
            descriptionEl.textContent = item.description;
        }

        function open(index, trigger) {
            render(index);
            activeTrigger = trigger || null;
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
            render(currentIndex + 1);
        }

        function goToPrev() {
            render(currentIndex - 1);
        }

        thumbnails.forEach(function (thumb, index) {
            thumb.setAttribute('tabindex', '0');
            thumb.setAttribute('role', 'button');
            thumb.setAttribute('aria-label', 'Open artwork: ' + (thumb.dataset.title || 'Gallery image'));

            thumb.addEventListener('click', function () {
                open(index, thumb);
            });

            thumb.addEventListener('keydown', function (event) {
                if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault();
                    open(index, thumb);
                }
            });
        });

        closeBtn.addEventListener('click', close);
        nextBtn.addEventListener('click', goToNext);
        prevBtn.addEventListener('click', goToPrev);

        overlay.addEventListener('click', function (event) {
            if (event.target === overlay) {
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
