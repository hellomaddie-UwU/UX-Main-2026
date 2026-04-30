document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('.cs-carousel').forEach(function (carousel) {
        const track = carousel.querySelector('.cs-carousel__track');
        if (!track) return;

        const slides = Array.from(track.querySelectorAll('.cs-carousel__slide'));
        if (slides.length < 2) return;

        // Fade mode — triggered by data-fade attribute on .cs-carousel
        if (carousel.dataset.fade !== undefined) {
            let current = 0;

            track.style.position = 'relative';
            slides.forEach(function (slide, i) {
                slide.style.transition = 'opacity 0.4s ease';
                if (i === 0) {
                    slide.style.opacity = '1';
                    slide.style.pointerEvents = '';
                } else {
                    slide.style.position = 'absolute';
                    slide.style.top = '0';
                    slide.style.left = '0';
                    slide.style.width = '100%';
                    slide.style.opacity = '0';
                    slide.style.pointerEvents = 'none';
                }
            });

            function fadeTo(index) {
                slides[current].style.opacity = '0';
                slides[current].style.pointerEvents = 'none';
                slides[current].style.position = 'absolute';
                current = (index + slides.length) % slides.length;
                slides[current].style.position = 'relative';
                slides[current].style.opacity = '1';
                slides[current].style.pointerEvents = '';
            }

            const prevBtn = carousel.querySelector('.cs-carousel__btn-prev');
            if (prevBtn) prevBtn.addEventListener('click', function () { fadeTo(current - 1); });

            const nextBtn = carousel.querySelector('.cs-carousel__btn-next');
            if (nextBtn) nextBtn.addEventListener('click', function () { fadeTo(current + 1); });

            return;
        }

        let isTransitioning = false;
        let direction = null;

        function getStepWidth() {
            const firstSlide = track.querySelector('.cs-carousel__slide');
            if (!firstSlide) return 0;
            const spacing = parseFloat(getComputedStyle(firstSlide).marginRight) || 0;
            return firstSlide.offsetWidth + spacing;
        }

        function resetTrackPosition() {
            track.style.transition = 'none';
            track.style.transform = 'translateX(0)';
            // Force reflow so the browser applies the reset before next animation.
            void track.offsetWidth;
            track.style.transition = 'transform 0.4s ease';
        }

        track.addEventListener('transitionend', function () {
            if (!isTransitioning) return;

            if (direction === 'next') {
                const first = track.querySelector('.cs-carousel__slide');
                if (first) track.appendChild(first);
                resetTrackPosition();
            }

            if (direction === 'prev') {
                resetTrackPosition();
            }

            isTransitioning = false;
            direction = null;
        });

        const prevBtn = carousel.querySelector('.cs-carousel__btn-prev');
        if (prevBtn) {
            prevBtn.addEventListener('click', function () {
                if (isTransitioning) return;

                const step = getStepWidth();
                const slides = track.querySelectorAll('.cs-carousel__slide');
                const last = slides[slides.length - 1];
                if (!last || !step) return;

                track.style.transition = 'none';
                track.prepend(last);
                track.style.transform = 'translateX(-' + step + 'px)';
                void track.offsetWidth;

                isTransitioning = true;
                direction = 'prev';
                track.style.transition = 'transform 0.4s ease';
                track.style.transform = 'translateX(0)';
            });
        }

        const nextBtn = carousel.querySelector('.cs-carousel__btn-next');
        if (nextBtn) {
            nextBtn.addEventListener('click', function () {
                if (isTransitioning) return;

                const step = getStepWidth();
                if (!step) return;

                isTransitioning = true;
                direction = 'next';
                track.style.transition = 'transform 0.4s ease';
                track.style.transform = 'translateX(-' + step + 'px)';
            });
        }
    });
});
