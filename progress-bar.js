// Case Study Progress Bar Functionality
(() => {
    const caseStudyContent = document.querySelector('.case-study-content');
    const progressBar = document.getElementById('scrollProgressBar');

    if (!caseStudyContent || !progressBar) {
        return;
    }

    let ticking = false;

    function clamp(value, min, max) {
        return Math.min(Math.max(value, min), max);
    }

    function updateScrollProgress() {
        const sectionTop = caseStudyContent.getBoundingClientRect().top + window.scrollY;
        const sectionHeight = caseStudyContent.offsetHeight;
        const scrollStart = sectionTop;
        const desiredScrollEnd = Math.max(scrollStart + sectionHeight - window.innerHeight, scrollStart + 1);
        const maxScrollableY = Math.max(document.documentElement.scrollHeight - window.innerHeight, 0);
        const scrollEnd = Math.max(Math.min(desiredScrollEnd, maxScrollableY), scrollStart + 1);
        const currentScroll = window.scrollY || document.documentElement.scrollTop || 0;

        const progress = clamp(((currentScroll - scrollStart) / (scrollEnd - scrollStart)) * 100, 0, 100);
        const roundedProgress = Math.round(progress);

        progressBar.style.width = `${progress}%`;
        progressBar.setAttribute('aria-valuenow', String(roundedProgress));
    }

    function onScroll() {
        if (ticking) {
            return;
        }

        ticking = true;
        requestAnimationFrame(() => {
            updateScrollProgress();
            ticking = false;
        });
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', updateScrollProgress);
    window.addEventListener('load', updateScrollProgress);
    document.addEventListener('DOMContentLoaded', updateScrollProgress);

    updateScrollProgress();
})();