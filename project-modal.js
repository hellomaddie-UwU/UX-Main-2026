(function () {
    document.addEventListener('DOMContentLoaded', function () {
        var overlay = document.getElementById('projectModal');
        var triggers = Array.prototype.slice.call(document.querySelectorAll('.project-thumbnail-cta'));
        if (!overlay || !triggers.length) return;

        var projects = triggers.map(function (button) {
            var card = button.closest('.project-thumbnail');
            var tagsEl = card ? card.querySelector('.project-thumbnail-tags') : null;
            var titleEl = card ? card.querySelector('.project-thumbnail-title') : null;
            var logoEl = card ? card.querySelector('.project-thumbnail-logo') : null;
            var copyTemplate = card ? card.querySelector('.project-modal-copy') : null;
            var copyContent = copyTemplate ? copyTemplate.content : null;
            var contextEl = copyContent ? copyContent.querySelector('.project-modal-copy-context') : null;
            var resultsEl = copyContent ? copyContent.querySelector('.project-modal-copy-results') : null;
            var imageEls = copyContent ? Array.prototype.slice.call(copyContent.querySelectorAll('.project-modal-copy-images img')) : [];

            return {
                tagsHTML: tagsEl ? tagsEl.innerHTML : '',
                title: titleEl ? titleEl.textContent.trim() : '',
                logo: logoEl ? logoEl.textContent.trim() : '',
                context: contextEl ? contextEl.textContent.trim() : '',
                results: resultsEl ? resultsEl.textContent.trim() : '',
                images: imageEls.map(function (img) {
                    return { src: img.getAttribute('src') || '', alt: img.getAttribute('alt') || '' };
                })
            };
        });

        var backdrop = overlay.querySelector('.cs-lightbox-backdrop');
        var closeBtn = overlay.querySelector('.project-modal-close');
        var scrollEl = overlay.querySelector('.project-modal-scroll');
        var tagsEl = overlay.querySelector('.project-modal-tags');
        var titleEl = overlay.querySelector('.project-modal-title');
        var logoEl = overlay.querySelector('.project-modal-logo');
        var contextEl = overlay.querySelector('.project-modal-context');
        var resultsEl = overlay.querySelector('.project-modal-results');
        var imagesEl = overlay.querySelector('.project-modal-images');

        var activeProjectIndex = 0;
        var activeTrigger = null;
        var previousBodyOverflow = '';

        function renderProject(projectIndex) {
            var project = projects[projectIndex];
            if (!project) return;
            activeProjectIndex = projectIndex;

            tagsEl.innerHTML = project.tagsHTML;
            titleEl.textContent = project.title;
            logoEl.textContent = project.logo;
            contextEl.textContent = project.context;
            resultsEl.textContent = project.results;

            imagesEl.innerHTML = project.images.map(function (image) {
                return '<img class="project-modal-image" src="' + image.src + '" alt="' + image.alt + '">';
            }).join('');

            scrollEl.scrollTop = 0;
            imagesEl.scrollTop = 0;
        }

        function open(index) {
            activeTrigger = triggers[index];
            renderProject(index);

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

        function goToNextProject() {
            open((activeProjectIndex + 1) % projects.length);
        }

        function goToPrevProject() {
            open((activeProjectIndex - 1 + projects.length) % projects.length);
        }

        triggers.forEach(function (button, index) {
            button.addEventListener('click', function () {
                open(index);
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
                goToNextProject();
                return;
            }

            if (event.key === 'ArrowLeft') {
                event.preventDefault();
                goToPrevProject();
            }
        });
    });
}());
