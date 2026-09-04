// Blog Article Reading Progress
// Tracks scroll position through [data-blog-content] and drives the width of the
// .reading-progress-fill bar. Mirrors progress-bar.js, but scoped to the blog
// template so the two article types stay independent.
(() => {
    const article = document.querySelector('[data-blog-content]');
    const progressBar = document.getElementById('blogProgressBar');

    if (!article || !progressBar) {
        return;
    }

    let ticking = false;

    function clamp(value, min, max) {
        return Math.min(Math.max(value, min), max);
    }

    function updateReadingProgress() {
        const sectionTop = article.getBoundingClientRect().top + window.scrollY;
        const sectionHeight = article.offsetHeight;
        const scrollStart = sectionTop;
        const desiredScrollEnd = Math.max(scrollStart + sectionHeight - window.innerHeight, scrollStart + 1);
        const maxScrollableY = Math.max(document.documentElement.scrollHeight - window.innerHeight, 0);
        const scrollEnd = Math.max(Math.min(desiredScrollEnd, maxScrollableY), scrollStart + 1);
        const currentScroll = window.scrollY || document.documentElement.scrollTop || 0;

        const progress = clamp(((currentScroll - scrollStart) / (scrollEnd - scrollStart)) * 100, 0, 100);

        progressBar.style.width = `${progress}%`;
        progressBar.setAttribute('aria-valuenow', String(Math.round(progress)));
    }

    function onScroll() {
        if (ticking) {
            return;
        }

        ticking = true;
        requestAnimationFrame(() => {
            updateReadingProgress();
            ticking = false;
        });
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', updateReadingProgress);
    window.addEventListener('load', updateReadingProgress);
    document.addEventListener('DOMContentLoaded', updateReadingProgress);

    updateReadingProgress();
})();
