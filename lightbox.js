(function () {
    document.addEventListener('DOMContentLoaded', function () {
        var thumbnails = Array.prototype.slice.call(document.querySelectorAll('.gallery-img'));
        if (!thumbnails.length) return;

        var FALLBACK_HEX = '#4B095D';

        var lightboxMarkup = [
            '<div class="lightbox-overlay" id="galleryLightbox" aria-hidden="true">',
            '  <div class="lightbox-backdrop"></div>',
            '  <div class="lightbox-dialog">',
            '    <button type="button" class="lightbox-close" aria-label="Close lightbox">',
            '      <img src="imgs/close.svg" alt="" aria-hidden="true">',
            '    </button>',
            '    <button type="button" class="lightbox-nav lightbox-prev" aria-label="Previous image">',
            '      <img src="imgs/arrow-left.svg" alt="" aria-hidden="true">',
            '    </button>',
            '    <div class="lightbox-card" role="dialog" aria-modal="true" aria-labelledby="lightboxTitle" aria-describedby="lightboxDescription">',
            '      <div class="lightbox-media">',
            '        <div class="lightbox-media-frame">',
            '          <img class="lightbox-image" src="" alt="">',
            '        </div>',
            '      </div>',
            '      <div class="lightbox-info">',
            '        <div class="lightbox-text">',
            '          <h3 id="lightboxTitle" class="lightbox-title"></h3>',
            '          <div class="lightbox-field">',
            '            <p class="lightbox-label">Date Finished</p>',
            '            <p class="lightbox-date"></p>',
            '          </div>',
            '          <div class="lightbox-field">',
            '            <p class="lightbox-label">Description</p>',
            '            <p id="lightboxDescription" class="lightbox-description"></p>',
            '          </div>',
            '        </div>',
            '      </div>',
            '    </div>',
            '    <button type="button" class="lightbox-nav lightbox-next" aria-label="Next image">',
            '      <img src="imgs/arrow-right.svg" alt="" aria-hidden="true">',
            '    </button>',
            '  </div>',
            '</div>'
        ].join('');

        document.body.insertAdjacentHTML('beforeend', lightboxMarkup);

        var overlay = document.getElementById('galleryLightbox');
        var backdrop = overlay ? overlay.querySelector('.lightbox-backdrop') : null;
        var dialog = overlay ? overlay.querySelector('.lightbox-dialog') : null;
        var card = overlay ? overlay.querySelector('.lightbox-card') : null;
        var closeBtn = overlay ? overlay.querySelector('.lightbox-close') : null;
        var prevBtn = overlay ? overlay.querySelector('.lightbox-prev') : null;
        var nextBtn = overlay ? overlay.querySelector('.lightbox-next') : null;
        var imageEl = overlay ? overlay.querySelector('.lightbox-image') : null;
        var mediaFrame = overlay ? overlay.querySelector('.lightbox-media-frame') : null;
        var titleEl = overlay ? overlay.querySelector('.lightbox-title') : null;
        var dateEl = overlay ? overlay.querySelector('.lightbox-date') : null;
        var descriptionEl = overlay ? overlay.querySelector('.lightbox-description') : null;

        if (!overlay || !backdrop || !dialog || !card || !closeBtn || !prevBtn || !nextBtn || !imageEl || !mediaFrame || !titleEl || !dateEl || !descriptionEl) {
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
        var renderToken = 0;
        var colorCache = new Map();

        function wrapIndex(index) {
            return (index + galleryItems.length) % galleryItems.length;
        }

        function componentToHex(value) {
            var hex = value.toString(16);
            return hex.length === 1 ? '0' + hex : hex;
        }

        function rgbToHex(r, g, b) {
            return '#' + componentToHex(r) + componentToHex(g) + componentToHex(b);
        }

        function hexToRgba(hex, alpha) {
            var value = hex.replace('#', '');
            var r = parseInt(value.substring(0, 2), 16);
            var g = parseInt(value.substring(2, 4), 16);
            var b = parseInt(value.substring(4, 6), 16);
            return 'rgba(' + r + ', ' + g + ', ' + b + ', ' + alpha + ')';
        }

        /*Reads the image's pixels off an offscreen canvas and buckets them to
        find the most common color, similar to how Spotify derives album-art
        backgrounds. Falls back to FALLBACK_HEX if canvas readback is blocked
        (e.g. running the page directly from file:// without a local server).*/
        function analyzeImage(src) {
            if (colorCache.has(src)) {
                return Promise.resolve(colorCache.get(src));
            }

            return new Promise(function (resolve) {
                var img = new Image();
                img.crossOrigin = 'anonymous';

                img.onload = function () {
                    var hex = FALLBACK_HEX;

                    try {
                        var size = 48;
                        var canvas = document.createElement('canvas');
                        canvas.width = size;
                        canvas.height = size;
                        var ctx = canvas.getContext('2d');
                        ctx.drawImage(img, 0, 0, size, size);

                        var data = ctx.getImageData(0, 0, size, size).data;
                        var buckets = {};

                        for (var i = 0; i < data.length; i += 4) {
                            var alpha = data[i + 3];
                            if (alpha < 200) continue;

                            var r = data[i];
                            var g = data[i + 1];
                            var b = data[i + 2];
                            var key = (r >> 4) + ',' + (g >> 4) + ',' + (b >> 4);

                            if (!buckets[key]) {
                                buckets[key] = { r: 0, g: 0, b: 0, count: 0 };
                            }
                            buckets[key].r += r;
                            buckets[key].g += g;
                            buckets[key].b += b;
                            buckets[key].count += 1;
                        }

                        var best = null;
                        Object.keys(buckets).forEach(function (key) {
                            if (!best || buckets[key].count > best.count) {
                                best = buckets[key];
                            }
                        });

                        if (best) {
                            hex = rgbToHex(
                                Math.round(best.r / best.count),
                                Math.round(best.g / best.count),
                                Math.round(best.b / best.count)
                            );
                        }
                    } catch (err) {
                        hex = FALLBACK_HEX;
                    }

                    var result = { hex: hex };
                    colorCache.set(src, result);
                    resolve(result);
                };

                img.onerror = function () {
                    var result = { hex: FALLBACK_HEX };
                    colorCache.set(src, result);
                    resolve(result);
                };

                img.src = src;
            });
        }

        function render(index) {
            var safeIndex = wrapIndex(index);
            var item = galleryItems[safeIndex];
            if (!item) return;

            currentIndex = safeIndex;
            var token = ++renderToken;

            mediaFrame.classList.remove('is-zoomed');
            imageEl.style.transformOrigin = 'center center';

            imageEl.src = item.src;
            imageEl.alt = item.alt;
            titleEl.textContent = item.title;
            dateEl.textContent = item.date;
            descriptionEl.textContent = item.description;

            card.classList.add('is-loading');
            card.style.setProperty('--lightbox-dominant', FALLBACK_HEX);
            card.style.setProperty('--lightbox-dominant-tint', hexToRgba(FALLBACK_HEX, 0.8));

            analyzeImage(item.src).then(function (result) {
                if (token !== renderToken) return;

                card.classList.remove('is-loading');
                card.style.setProperty('--lightbox-dominant', result.hex);
                card.style.setProperty('--lightbox-dominant-tint', hexToRgba(result.hex, 0.8));
            });
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

        /*Hover-to-zoom: the image scales up around whatever point the cursor is
        over, clipped by lightbox-media-frame so it never spills past the
        existing 40px lightbox-media padding.*/
        function updateZoomOrigin(event) {
            var rect = mediaFrame.getBoundingClientRect();
            var xPercent = ((event.clientX - rect.left) / rect.width) * 100;
            var yPercent = ((event.clientY - rect.top) / rect.height) * 100;
            xPercent = Math.max(0, Math.min(100, xPercent));
            yPercent = Math.max(0, Math.min(100, yPercent));
            imageEl.style.transformOrigin = xPercent + '% ' + yPercent + '%';
        }

        mediaFrame.addEventListener('mouseenter', function (event) {
            updateZoomOrigin(event);
            mediaFrame.classList.add('is-zoomed');
        });

        mediaFrame.addEventListener('mousemove', updateZoomOrigin);

        mediaFrame.addEventListener('mouseleave', function () {
            mediaFrame.classList.remove('is-zoomed');
            imageEl.style.transformOrigin = 'center center';
        });

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
