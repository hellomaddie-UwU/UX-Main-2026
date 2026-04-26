(function () {
    // Guard: only run on pages that have the desktop TOC
    var tocCol = document.querySelector('.toc-col');
    if (!tocCol) return;

    var heartWrapper = document.getElementById('toc-heart-wrapper');
    var tocRow = document.getElementById('toc-heart-row');
    var links = Array.from(document.querySelectorAll('#toc-links a'));

    if (!heartWrapper || !tocRow || links.length === 0) return;

    // Collect the section elements each TOC link points to
    var sections = links.map(function (link) {
        var href = link.getAttribute('href') || '';
        var id = href.split('#')[1];
        return id ? document.getElementById(id) : null;
    });

    function setActive(index) {
        links.forEach(function (link, i) {
            link.classList.toggle('is-active', i === index);
        });

        var targetLink = links[index];
        if (!targetLink) return;

        // Use getBoundingClientRect for reliable positioning inside a sticky container
        var rowRect = tocRow.getBoundingClientRect();
        var linkRect = targetLink.getBoundingClientRect();
        var offset = linkRect.top - rowRect.top;

        heartWrapper.style.transform = 'translateY(' + offset + 'px)';
    }

    // IntersectionObserver fires when a section enters the upper zone of the viewport
    var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                var id = entry.target.id;
                var index = sections.findIndex(function (s) {
                    return s !== null && s.id === id;
                });
                if (index !== -1) {
                    setActive(index);
                }
            }
        });
    }, {
        rootMargin: '-20% 0px -70% 0px'
    });

    sections.forEach(function (section) {
        if (section) observer.observe(section);
    });

    // Initialise heart to the first link on page load
    // Use rAF so layout is settled before reading getBoundingClientRect
    requestAnimationFrame(function () {
        setActive(0);
    });
})();
