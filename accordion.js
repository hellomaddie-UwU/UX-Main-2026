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

	const setSolutionVisibility = (activeCardId) => {
		const solutionId = activeCardId ? activeCardId.replace('scenario-', 'solution-') : null;
		document.querySelectorAll('.ICP-solution-content').forEach((el) => {
			el.style.display = el.id === solutionId ? 'block' : 'none';
		});
	};

	accordionCards.forEach((card) => {
		const scenarioSection = card.querySelector('.accordion-scenario');
		const outcomeSection = card.querySelector('.accordion-outcome');

		const handleCardToggle = () => {
			const isCurrentlyActive = card.classList.contains('accordion-card-active');

			if (isCurrentlyActive) {
				setCardActiveState(card, false);
				setSolutionVisibility(null);
				return;
			}

			accordionCards.forEach((otherCard) => {
				setCardActiveState(otherCard, otherCard === card);
			});

			setSolutionVisibility(card.id);
		};

		if (scenarioSection) {
			scenarioSection.addEventListener('click', handleCardToggle);
		}

		if (outcomeSection) {
			outcomeSection.addEventListener('click', handleCardToggle);
		}
	});

	// Set initial state: show solution matching the initially active card
	const initialActive = document.querySelector('.accordion-card-active');
	if (initialActive) {
		setSolutionVisibility(initialActive.id);
	}
});