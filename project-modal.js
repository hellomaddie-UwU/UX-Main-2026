(function () {
    document.addEventListener('DOMContentLoaded', function () {
        var overlay = document.getElementById('projectModal');
        var triggers = Array.prototype.slice.call(document.querySelectorAll('.project-thumbnail-cta, .past-project-cta'));
        if (!overlay || !triggers.length) return;

        var projects = triggers.map(function (button) {
            var card = button.closest('.project-thumbnail, .past-project-card');
            var tagsEl = card ? card.querySelector('.project-thumbnail-tags, .past-project-pills') : null;
            var titleEl = card ? card.querySelector('.project-thumbnail-title, .past-project-title') : null;
            var logoEl = card ? card.querySelector('.project-thumbnail-logo') : null;
            var copyTemplate = card ? card.querySelector('.project-modal-copy') : null;
            var copyContent = copyTemplate ? copyTemplate.content : null;
            var logoImgEl = copyContent ? copyContent.querySelector('.project-modal-copy-logo') : null;
            var toolEls = copyContent ? Array.prototype.slice.call(copyContent.querySelectorAll('.project-modal-copy-tools img')) : [];
            var contextEl = copyContent ? copyContent.querySelector('.project-modal-copy-context') : null;
            var behindEl = copyContent ? copyContent.querySelector('.project-modal-copy-behind') : null;
            var resultsEl = copyContent ? copyContent.querySelector('.project-modal-copy-results') : null;
            var contentEl = copyContent ? copyContent.querySelector('.project-modal-content') : null;

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
                /*Copied verbatim so the right column can be authored as ordinary
                markup -- headings, figures, info messages, placeholders*/
                content: contentEl ? contentEl.innerHTML.trim() : ''
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

            /*.tools-icon carries the dashed box and, once script.js has seen it,
            the name-on-hover tooltip*/
            toolsEl.innerHTML = project.tools.map(function (tool) {
                return '<li class="tools-icon"><img src="' + tool.src + '" alt="' + tool.alt + '"></li>';
            }).join('');

            contentEl.innerHTML = project.content;

            /*Tooltips are built at DOMContentLoaded, long before these icons
            exist, so they have to be attached again after every render*/
            if (window.toolIconTooltips) {
                window.toolIconTooltips.init(toolsEl);
            }

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

            /*Tags only get a real width once the modal is on screen, so the
            two-row fit has to be measured here rather than in renderProject*/
            if (window.catalogueWrapper) {
                window.catalogueWrapper.fit(tagsEl);
            }

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
