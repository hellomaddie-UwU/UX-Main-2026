// Accordion Card Functionality
document.addEventListener('DOMContentLoaded', () => {
	const accordionCards = document.querySelectorAll('.accordion-card-active, .accordion-card-default');

	if (!accordionCards.length) {
		return;
	}

	const setCardActiveState = (card, isActive) => {
		card.classList.toggle('accordion-card-active', isActive);
		card.classList.toggle('accordion-card-default', !isActive);
	};

	accordionCards.forEach((card) => {
		const scenarioSection = card.querySelector('.accordion-scenario');
		const outcomeSection = card.querySelector('.accordion-outcome');

		const handleCardToggle = () => {
			const isCurrentlyActive = card.classList.contains('accordion-card-active');

			if (isCurrentlyActive) {
				setCardActiveState(card, false);
				return;
			}

			accordionCards.forEach((otherCard) => {
				setCardActiveState(otherCard, otherCard === card);
			});
		};

		if (scenarioSection) {
			scenarioSection.addEventListener('click', handleCardToggle);
		}

		if (outcomeSection) {
			outcomeSection.addEventListener('click', handleCardToggle);
		}
	});
});