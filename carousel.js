document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('.cs-carousel').forEach(function (carousel) {
        const track = carousel.querySelector('.cs-carousel__track');
        if (!track) return;

        if (track.querySelectorAll('.cs-carousel__slide').length < 2) return;

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
