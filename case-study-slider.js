document.addEventListener('DOMContentLoaded', function () {
    var prefersReducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    document.querySelectorAll('[data-cs2-slider]').forEach(function (slider) {
        var slides = Array.from(slider.querySelectorAll('.cs2-slider__slide'));
        var dots = Array.from(slider.querySelectorAll('.cs2-slider__dot'));

        if (slides.length < 2) return;

        var interval = parseInt(slider.dataset.autoplay, 10) || 6000;
        var current = Math.max(slides.findIndex(function (slide) { return slide.classList.contains('is-active'); }), 0);
        var timer = null;

        function goTo(index) {
            slides[current].classList.remove('is-active');
            if (dots[current]) dots[current].classList.remove('is-active');
            if (dots[current]) dots[current].setAttribute('aria-selected', 'false');

            current = (index + slides.length) % slides.length;

            slides[current].classList.add('is-active');
            if (dots[current]) dots[current].classList.add('is-active');
            if (dots[current]) dots[current].setAttribute('aria-selected', 'true');
        }

        function next() {
            goTo(current + 1);
        }

        function start() {
            if (prefersReducedMotion) return;
            stop();
            timer = window.setInterval(next, interval);
        }

        function stop() {
            if (timer) {
                window.clearInterval(timer);
                timer = null;
            }
        }

        dots.forEach(function (dot, index) {
            dot.addEventListener('click', function () {
                goTo(index);
                start();
            });
        });

        slider.addEventListener('mouseenter', stop);
        slider.addEventListener('mouseleave', start);
        slider.addEventListener('focusin', stop);
        slider.addEventListener('focusout', start);
        slider.addEventListener('touchstart', stop, { passive: true });
        slider.addEventListener('touchend', start, { passive: true });

        start();
    });
});
