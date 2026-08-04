(function () {
    document.addEventListener('DOMContentLoaded', function () {
        var overlay = document.getElementById('featureModal');
        var triggers = Array.prototype.slice.call(document.querySelectorAll('.feature-link')).filter(function (link) {
            return !link.closest('.invisible');
        });
        if (!overlay || !triggers.length) return;

        var features = triggers.map(function (link) {
            var card = link.closest('.v-stack');
            var titleEl = card ? card.querySelector('.fw-semibold') : null;
            var copyTemplate = card ? card.querySelector('.feature-modal-copy') : null;
            var copyContent = copyTemplate ? copyTemplate.content : null;
            var contextEl = copyContent ? copyContent.querySelector('.feature-modal-copy-context') : null;
            var flowEl = copyContent ? copyContent.querySelector('.feature-modal-copy-flow') : null;
            var imageEls = copyContent ? Array.prototype.slice.call(copyContent.querySelectorAll('.feature-modal-copy-images img')) : [];

            return {
                title: titleEl ? titleEl.textContent.trim() : '',
                context: contextEl ? contextEl.textContent.trim() : '',
                flow: flowEl ? flowEl.textContent.trim() : '',
                images: imageEls.map(function (img) {
                    return { src: img.getAttribute('src') || '', alt: img.getAttribute('alt') || '' };
                })
            };
        });

        var backdrop = overlay.querySelector('.cs-lightbox-backdrop');
        var closeBtn = overlay.querySelector('.feature-modal-close');
        var prevBtn = overlay.querySelector('.feature-modal-prev');
        var nextBtn = overlay.querySelector('.feature-modal-next');
        var eyebrowEl = overlay.querySelector('.feature-modal-eyebrow');
        var titleEl = overlay.querySelector('.feature-modal-title');
        var contextEl = overlay.querySelector('.feature-modal-context');
        var flowEl = overlay.querySelector('.feature-modal-flow');
        var imageEl = overlay.querySelector('.feature-modal-image');
        var dotsContainer = overlay.querySelector('.feature-modal-dots');

        var activeFeatureIndex = 0;
        var activeImageIndex = 0;
        var activeTrigger = null;
        var previousBodyOverflow = '';

        // Renders only this feature's own image set - never touches title/context/flow
        // or reaches into other features' images.
        function renderImage(imageIndex) {
            var feature = features[activeFeatureIndex];
            var image = feature.images[imageIndex];
            if (!image) return;
            activeImageIndex = imageIndex;

            imageEl.src = image.src;
            imageEl.alt = image.alt;

            Array.prototype.slice.call(dotsContainer.querySelectorAll('.dot')).forEach(function (dot, dotIndex) {
                dot.classList.toggle('is-active', dotIndex === imageIndex);
            });
        }

        function renderFeature(featureIndex) {
            var feature = features[featureIndex];
            if (!feature) return;
            activeFeatureIndex = featureIndex;

            eyebrowEl.textContent = 'FEATURE ' + (featureIndex + 1);
            titleEl.textContent = feature.title;
            contextEl.textContent = feature.context;
            flowEl.textContent = feature.flow;

            dotsContainer.innerHTML = feature.images.map(function () {
                return '<span class="dot"></span>';
            }).join('');

            renderImage(0);
        }

        function open(index) {
            activeTrigger = triggers[index];
            renderFeature(index);

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

        function goToNextImage() {
            var count = features[activeFeatureIndex].images.length;
            if (!count) return;
            renderImage((activeImageIndex + 1) % count);
        }

        function goToPrevImage() {
            var count = features[activeFeatureIndex].images.length;
            if (!count) return;
            renderImage((activeImageIndex - 1 + count) % count);
        }

        function goToNextFeature() {
            open((activeFeatureIndex + 1) % features.length);
        }

        function goToPrevFeature() {
            open((activeFeatureIndex - 1 + features.length) % features.length);
        }

        triggers.forEach(function (link, index) {
            link.addEventListener('click', function (event) {
                event.preventDefault();
                open(index);
            });
        });

        closeBtn.addEventListener('click', close);
        prevBtn.addEventListener('click', goToPrevImage);
        nextBtn.addEventListener('click', goToNextImage);

        dotsContainer.addEventListener('click', function (event) {
            var dot = event.target.closest('.dot');
            if (!dot) return;
            var dots = Array.prototype.slice.call(dotsContainer.querySelectorAll('.dot'));
            renderImage(dots.indexOf(dot));
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
                goToNextFeature();
                return;
            }

            if (event.key === 'ArrowLeft') {
                event.preventDefault();
                goToPrevFeature();
            }
        });
    });
}());
