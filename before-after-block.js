document.addEventListener('DOMContentLoaded', function () {
	const compareBlocks = document.querySelectorAll('.compare');
	if (!compareBlocks.length) {
		return;
	}

	compareBlocks.forEach(function (compare) {
		const afterPanel = compare.querySelector('.after');
		const afterImage = afterPanel.querySelector('img');
		const input = compare.querySelector('input[type="range"]');

		if (!afterPanel || !input) {
			return;
		}

		let handle = compare.querySelector('.compare-handle');
		if (!handle) {
			handle = document.createElement('button');
			handle.type = 'button';
			handle.className = 'compare-handle';
			handle.setAttribute('aria-label', 'Drag to compare before and after');
			handle.innerHTML = '<span>&lsaquo;</span><span>&rsaquo;</span>';
			compare.appendChild(handle);
		}

		function syncPosition() {
			const min = Number(input.min) || 0;
			const max = Number(input.max) || 100;
			const parsedValue = Number(input.value);
			const safeValue = Number.isFinite(parsedValue) ? parsedValue : (min + max) / 2;
			const clampedValue = Math.min(max, Math.max(min, safeValue));
			const ratio = (clampedValue - min) / (max - min || 1);

			input.value = String(clampedValue);
			afterPanel.style.width = ratio * 100 + '%';

			if (afterImage) {
				afterImage.style.width = compare.clientWidth + 'px';
			}

			handle.style.left = ratio * 100 + '%';
		}

		function setFromClientX(clientX) {
			const rect = compare.getBoundingClientRect();
			const min = Number(input.min) || 0;
			const max = Number(input.max) || 100;
			const offset = Math.min(rect.width, Math.max(0, clientX - rect.left));
			const ratio = rect.width ? offset / rect.width : 0.5;
			const value = min + ratio * (max - min);

			input.value = String(Math.round(value));
			syncPosition();
		}

		let isDragging = false;

		handle.addEventListener('pointerdown', function (event) {
			event.preventDefault();
			isDragging = true;
			setFromClientX(event.clientX);
		});

		window.addEventListener('pointermove', function (event) {
			if (!isDragging) {
				return;
			}
			setFromClientX(event.clientX);
		});

		window.addEventListener('pointerup', function () {
			isDragging = false;
		});

		handle.addEventListener('keydown', function (event) {
			const step = Number(input.step) || 1;
			const current = Number(input.value) || 0;

			if (event.key === 'ArrowLeft') {
				event.preventDefault();
				input.value = String(current - step);
				syncPosition();
			}

			if (event.key === 'ArrowRight') {
				event.preventDefault();
				input.value = String(current + step);
				syncPosition();
			}
		});

		input.addEventListener('input', syncPosition);
		window.addEventListener('resize', syncPosition);
		syncPosition();
	});
});
