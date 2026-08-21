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
            var logoImgEl = copyContent ? copyContent.querySelector('.project-modal-copy-logo') : null;
            var toolEls = copyContent ? Array.prototype.slice.call(copyContent.querySelectorAll('.project-modal-copy-tools img')) : [];
            var contextEl = copyContent ? copyContent.querySelector('.project-modal-copy-context') : null;
            var behindEl = copyContent ? copyContent.querySelector('.project-modal-copy-behind') : null;
            var resultsEl = copyContent ? copyContent.querySelector('.project-modal-copy-results') : null;
            var contentEl = copyContent ? copyContent.querySelector('.project-modal-content') : null;
            var contentItems = contentEl ? Array.prototype.slice.call(contentEl.children).map(function (el) {
                if (el.tagName === 'IMG') {
                    return { type: 'image', src: el.getAttribute('src') || '', alt: el.getAttribute('alt') || '' };
                }
                var img = el.querySelector('img');
                if (img) {
                    return { type: 'image', src: img.getAttribute('src') || '', alt: img.getAttribute('alt') || '' };
                }
                return { type: 'label', text: el.textContent.trim() };
            }) : [];

            return {
                tagsHTML: tagsEl ? tagsEl.innerHTML : '',
                title: titleEl ? titleEl.textContent.trim() : '',
                logo: logoEl ? logoEl.textContent.trim() : '',
                logoSrc: logoImgEl ? (logoImgEl.getAttribute('src') || '') : '',
                logoAlt: logoImgEl ? (logoImgEl.getAttribute('alt') || '') : '',
                tools: toolEls.map(function (img) {
                    return { src: img.getAttribute('src') || '', alt: img.getAttribute('alt') || '' };
                }),
                context: contextEl ? contextEl.innerHTML.trim() : '',
                behind: behindEl ? behindEl.innerHTML.trim() : '',
                results: resultsEl ? resultsEl.innerHTML.trim() : '',
                content: contentItems
            };
        });

        var backdrop = overlay.querySelector('.cs-lightbox-backdrop');
        var closeBtn = overlay.querySelector('.project-modal-close');
        var scrollEl = overlay.querySelector('.project-modal-scroll');
        var tagsEl = overlay.querySelector('.project-modal-tags');
        var titleEl = overlay.querySelector('.project-modal-title');
        var logoEl = overlay.querySelector('.project-modal-logo');
        var toolsEl = overlay.querySelector('.project-modal-tools');
        var contextEl = overlay.querySelector('.project-modal-context');
        var behindEl = overlay.querySelector('.project-modal-behind');
        var resultsEl = overlay.querySelector('.project-modal-results');
        var contentEl = overlay.querySelector('.project-modal-content');

        var activeProjectIndex = 0;
        var activeTrigger = null;
        var previousBodyOverflow = '';

        function renderProject(projectIndex) {
            var project = projects[projectIndex];
            if (!project) return;
            activeProjectIndex = projectIndex;

            tagsEl.innerHTML = project.tagsHTML;
            titleEl.textContent = project.title;
            logoEl.src = project.logoSrc;
            logoEl.alt = project.logoAlt;
            contextEl.innerHTML = project.context;
            behindEl.innerHTML = project.behind;
            resultsEl.innerHTML = project.results;

            toolsEl.innerHTML = project.tools.map(function (tool) {
                return '<li><img src="' + tool.src + '" alt="' + tool.alt + '"></li>';
            }).join('');

            contentEl.innerHTML = project.content.map(function (item) {
                if (item.type === 'label') {
                    return '<p class="project-modal-image-label">' + item.text + '</p>';
                }
                return '<img class="project-modal-image" src="' + item.src + '" alt="' + item.alt + '">';
            }).join('');

            scrollEl.scrollTop = 0;
            contentEl.scrollTop = 0;
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
